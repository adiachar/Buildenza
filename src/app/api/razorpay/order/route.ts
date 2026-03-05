import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
})

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { plan } = body

        // Monthly is $5, Yearly is $10. Razorpay expects the smallest currency unit.
        // For USD, 500 cents = $5. For INR, 500 paise = 5 INR.
        const amount = plan === "yearly" ? 1000 : 500
        const currency = "USD"

        const options = {
            amount: amount, // Amount in smallest currency unit
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
