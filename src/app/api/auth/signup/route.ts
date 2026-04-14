import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt-ts"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  console.log("Signup API called with request:", req.method, req.url)
  try {
    const body = await req.json()
    const { email, password, name } = body
    console.log("Signup request body parsed:", { email: email ? "provided" : "missing", password: password ? "provided" : "missing", name })

    if (!email || !password) {
      console.warn("Signup validation failed: missing email or password")
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    console.log("Checking for existing user with email:", email)
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.warn("Signup failed: user already exists for email:", email)
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      )
    }

    console.log("Hashing password for new user")
    // Hash the password using a 5-round threshold (reduces execution time below Cloudflare 50ms CPU limits)
    const hashedPassword = await hash(password, 5)

    console.log("Creating new user in database")
    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: hashedPassword,
        isPrime: false, // Explicitly false for new users
      },
    })

    console.log("User created successfully:", { id: newUser.id, email: newUser.email })
    return NextResponse.json(
      { message: "User created successfully", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error details:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    )
  }
}
