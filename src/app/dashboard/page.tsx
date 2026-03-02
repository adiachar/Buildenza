import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-black">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="glass-card p-6 border border-black/5 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-2 text-black/90">Welcome back, {session.user?.name}</h2>
        <p className="text-black/60 mb-6">Manage your subscription and track progress.</p>

        {/* Mock Payment Flow for $5 Prime */}
        <div className="p-4 rounded-xl bg-black/5 border border-black/5 flex items-center justify-between shadow-inner">
          <div>
            <h3 className="font-medium text-black">Prime Membership</h3>
            <p className="text-sm text-black/50 font-medium">$5.00 / month</p>
          </div>
          <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors shadow-md">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
