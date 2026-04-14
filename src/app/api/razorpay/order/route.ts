import { NextResponse } from "next/server"
import { createClient, createAdminClient } from "@/lib/supabase/server"
import Razorpay from "razorpay"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    })

    const { plan } = await req.json()

    // Monthly = ₹499, Yearly = ₹999 (in paise — smallest Indian currency unit)
    const amount = plan === "yearly" ? 99900 : 49900
    const currency = "INR"

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `rcpt_${user.email.replace(/[^a-z0-9]/gi, "").substring(0, 30)}`,
      notes: {
        email: user.email,
        plan,
      },
    })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      name: user.user_metadata?.full_name || user.email.split("@")[0],
      email: user.email,
    })
  } catch (err: any) {
    console.error("Razorpay Order Error:", err)
    const errorMessage = err.error?.description || err.message || "Unknown Razorpay Error"
    return NextResponse.json({ message: errorMessage }, { status: err.statusCode || 500 })
  }
}
