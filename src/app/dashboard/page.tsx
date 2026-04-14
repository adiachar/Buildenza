import { createClient, createAdminClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardClient } from "./DashboardClient"

export default async function Dashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Fetch isPrime from our users table
  let isPrime = false
  if (user.email) {
    const admin = createAdminClient()
    const { data } = await admin
      .from("users")
      .select("is_prime")
      .eq("email", user.email)
      .maybeSingle()
    isPrime = data?.is_prime ?? false
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "there"

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">Member Portal</h1>
        <p className="text-xl text-gray-500 font-light flex items-center gap-2">
          Manage your subscription and premium access.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 text-sm font-bold uppercase tracking-widest mb-4">
            Account Status
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{displayName}</span>
          </h2>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <DashboardClient isPrime={isPrime} />
          </div>
        </div>
      </div>
    </div>
  )
}
