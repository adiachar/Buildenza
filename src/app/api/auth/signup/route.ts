import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

/**
 * Called after Supabase auth.signUp to seed a row in public.users for is_prime tracking.
 * Only creates the row if it doesn't already exist (idempotent).
 */
export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()
    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 })

    const admin = createAdminClient()

    // Check if user already exists in our table
    const { data: existing } = await admin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 })
    }

    const { error } = await admin.from("users").insert({
      email,
      name: name || email.split("@")[0],
      password: "", // Supabase handles auth — no password stored here
      is_prime: false,
    })

    if (error) throw error

    return NextResponse.json({ message: "User profile created" }, { status: 201 })
  } catch (error) {
    console.error("Signup profile creation error:", error)
    return NextResponse.json(
      { message: "Failed to create user profile" },
      { status: 500 }
    )
  }
}
