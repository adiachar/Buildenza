import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="glass-card p-6 border border-white/10 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-2">Welcome back, {session.user?.name}</h2>
        <p className="text-white/50 mb-6">Manage your subscription and track progress.</p>

        {/* Mock Payment Flow for $5 Prime */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Prime Membership</h3>
            <p className="text-sm text-white/50">$5.00 / month</p>
          </div>
          <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
