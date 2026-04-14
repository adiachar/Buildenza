import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { userService } from "@/lib/userService"

export async function POST(req: Request) {
    console.log("Stripe webhook received")
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string
    console.log("Webhook headers:", { hasSignature: !!signature, bodyLength: body.length })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16" as any,
    })

    let event: Stripe.Event

    try {
        console.log("Constructing Stripe event")
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        )
        console.log("Stripe event constructed:", event.type, event.id)
    } catch (error: any) {
        console.error("Stripe webhook construction error:", {
            error: error.message,
            signature: signature ? "provided" : "missing",
            webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? "provided" : "missing",
            timestamp: new Date().toISOString()
        })
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        console.log("Processing checkout.session.completed event")
        const session = event.data.object as Stripe.Checkout.Session

        const userId = session?.metadata?.userId
        console.log("Session metadata:", { userId, customerEmail: session.customer_email })

        if (userId) {
            try {
                console.log("Updating user premium status for userId:", userId)
                await userService.update(userId, {
                    isPrime: true,
                })
                console.log("User premium status updated successfully for userId:", userId)
            } catch (updateError: any) {
                console.error("Failed to update user premium status:", {
                    error: updateError.message,
                    userId,
                    timestamp: new Date().toISOString()
                })
                return new NextResponse("Database update failed", { status: 500 })
            }
        } else {
            console.warn("No userId in session metadata")
        }
    } else {
        console.log("Unhandled event type:", event.type)
    }

    return new NextResponse("OK", { status: 200 })
}
