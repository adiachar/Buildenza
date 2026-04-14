import { NextResponse } from "next/server"
import { createClient, createAdminClient } from "@/lib/supabase/server"
import crypto from "crypto"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) throw new Error("Missing RAZORPAY_KEY_SECRET")

    // Verify Razorpay signature to confirm the payment is genuine
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex")

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 })
    }

    // Upgrade the user to Premium in our users table
    const admin = createAdminClient()
    const { error } = await admin
      .from("users")
      .update({ is_prime: true })
      .eq("email", user.email)

    if (error) throw error

    return NextResponse.json({ message: "Payment verified. Premium unlocked!", success: true })
  } catch (err: any) {
    console.error("Razorpay Verify Error:", err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
