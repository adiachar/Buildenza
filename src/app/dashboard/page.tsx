import { getServerSession } from "next-auth/next"
import { getAuthOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardClient } from "./DashboardClient"

export default async function Dashboard() {
  const session = await getServerSession(getAuthOptions())

  if (!session) {
    redirect("/auth/signin")
  }

  // Ensure isPrime is coerced to a boolean properly
  const isPrime = Boolean((session.user as any).isPrime)

  return (
    <div className="max-w-4xl mx-auto p-8 text-black">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="glass-card p-6 border border-black/5 rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black/90">Welcome back, {session.user?.name}</h2>
        <p className="text-black/60 mb-6">Manage your subscription and track progress.</p>

        {/* Render interactive subscription cards or premium success status */}
        <DashboardClient isPrime={isPrime} />
      </div>
    </div>
  )
}
