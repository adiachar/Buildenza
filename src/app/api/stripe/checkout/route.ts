import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: "2023-10-16" as any,
        })

        const body = await req.json()
        const { plan } = body

        // Monthly is $5 (500 cents), Yearly is $10 (1000 cents)
        const price = plan === "yearly" ? 1000 : 500

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

        return NextResponse.json({ url: checkoutSession.url })
    } catch (error: any) {
        console.error("[STRIPE_CHECKOUT]", error)
        return new NextResponse(error.message || "Internal Error", { status: 500 })
    }
}
