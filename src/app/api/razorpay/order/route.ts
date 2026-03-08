import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getAuthOptions } from "@/lib/auth"
import Razorpay from "razorpay"

// Force dynamic so Next.js doesn't try to evaluate this route at build time
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(getAuthOptions())

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        // Initialize Razorpay inside the handler (not at module level)
        // so env vars are available at request time, not build time
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID as string,
            key_secret: process.env.RAZORPAY_KEY_SECRET as string,
        })

        const body = await req.json()
        const { plan } = body

        // Monthly is $5 (500 cents), Yearly is $10 (1000 cents)
        const amount = plan === "yearly" ? 1000 : 500
        const currency = "USD"

        const options = {
            amount: amount,
            currency,
            receipt: `receipt_${(session.user as any).id}_${plan}`,
            notes: {
                userId: (session.user as any).id,
                plan,
            }
        }

        const order = await razorpay.orders.create(options)

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (err: any) {
        console.error("Razorpay Order Error:", err)
        return NextResponse.json({ message: err.message }, { status: err.statusCode || 500 })
    }
}
