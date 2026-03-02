import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { plan } = await req.json()

    // Mock payment successful logic, upgrade user status
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isPrime: true },
    })

    return NextResponse.json({ message: "Successfully upgraded to Premium!" }, { status: 200 })
  } catch (error) {
    console.error("Upgrade error:", error)
    return NextResponse.json({ message: "Failed to upgrade" }, { status: 500 })
  }
}
