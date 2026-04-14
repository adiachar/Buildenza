import { createClient, createAdminClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * OAuth callback — Supabase calls this after Google sign-in.
 * Exchange the auth code for a session, then ensure the user exists in our users table.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/learn"

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Ensure user exists in our public.users table (for is_prime tracking)
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        const admin = createAdminClient()
        const { data: existing } = await admin
          .from("users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle()

        if (!existing) {
          await admin.from("users").insert({
            email: user.email,
            name: user.user_metadata?.full_name || user.email.split("@")[0],
            password: "", // OAuth users have no password
            is_prime: false,
          })
        }
      }
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(new URL("/auth/signin?error=oauth", requestUrl.origin))
}
