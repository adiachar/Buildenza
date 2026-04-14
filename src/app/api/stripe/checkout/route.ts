import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    console.log("Stripe checkout API called")
    try {
        console.log("Getting server session")
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            console.warn("Stripe checkout: unauthorized - no session or email")
            return new NextResponse("Unauthorized", { status: 401 })
        }

        console.log("Initializing Stripe with secret key:", process.env.STRIPE_SECRET_KEY ? "provided" : "missing")
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2023-10-16" as any,
        })

        const body = await req.json()
        const { plan } = body
        console.log("Checkout request body:", { plan })

        // Monthly is $5 (500 cents), Yearly is $10 (1000 cents)
        const price = plan === "yearly" ? 1000 : 500
        console.log("Calculated price:", price, "for plan:", plan)

        console.log("Creating Stripe checkout session for user:", session.user.email)
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            customer_email: session.user.email,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: `Buildenza Premium - ${plan === "yearly" ? "Yearly" : "Monthly"}`,
                            description: "Unlock all Premium AI construction workflows and master prompts.",
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment", // or "subscription" if using recurring plans in Stripe dashboard
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?canceled=true`,
            metadata: {
                userId: (session.user as any).id,
                plan: plan,
            },
        })

        console.log("Stripe checkout session created:", checkoutSession.id)
        return NextResponse.json({ url: checkoutSession.url })
    } catch (error: any) {
        console.error("Stripe checkout error details:", {
            error: error.message || String(error),
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: req.url
        })
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
