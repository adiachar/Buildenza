import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

// Force dynamic so Next.js doesn't evaluate this route at build time
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

        const secret = process.env.RAZORPAY_KEY_SECRET

        if (!secret) throw new Error("Missing RAZORPAY_KEY_SECRET")

        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 })
        }

        // Upgrade the user to Premium
        const userId = (session.user as any).id

        await prisma.user.update({
            where: { id: userId },
            data: { isPrime: true },
        })

        return NextResponse.json({ message: "Payment verified successfully", success: true })
    } catch (err: any) {
        console.error("Razorpay Verify Error:", err)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}
