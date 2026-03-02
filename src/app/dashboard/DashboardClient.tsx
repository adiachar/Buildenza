"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DashboardClient({ isPrime }: { isPrime: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleFakeBuy = async (plan: "monthly" | "yearly") => {
    setLoading(true)
    try {
      const res = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })

      if (res.ok) {
        alert(`Success! You have purchased the ${plan} premium plan.`)
        // Refresh the page so the server session reloads the new 'isPrime' status
        router.refresh()
      } else {
        alert("Payment failed.")
      }
    } catch (e) {
      console.error(e)
      alert("An error occurred during payment.")
    } finally {
      setLoading(false)
    }
  }

  if (isPrime) {
    return (
      <div className="p-8 mt-6 bg-green-50/50 border border-green-200 rounded-2xl">
        <h3 className="text-xl font-bold text-green-800 mb-2">🎉 You are a Premium Member</h3>
        <p className="text-green-700/80">You have full access to all Buildnza premium video generation courses.</p>
        <button
          onClick={() => router.push("/learn")}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm"
        >
          Go to Courses
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-black/90 text-center">Unlock Premium Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1 Month Plan */}
        <div className="relative p-6 rounded-2xl glass-card border border-black/10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-black/90 mb-1">1 Month</h3>
            <p className="text-sm text-black/60">Full access for 30 days</p>
          </div>
          <div className="text-4xl font-black mb-6">$5</div>
          <button
            onClick={() => handleFakeBuy("monthly")}
            disabled={loading}
            className="w-full px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Fake Buy for $5"}
          </button>
        </div>

        {/* 1 Year Plan */}
        <div className="relative p-6 rounded-2xl glass-card border-2 border-black/20 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-black/5">
          <div className="absolute -top-3 px-3 py-1 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Best Value
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-black/90 mb-1">1 Year</h3>
            <p className="text-sm text-black/60">Save $50 instantly</p>
          </div>
          <div className="text-4xl font-black mb-6">$10</div>
          <button
            onClick={() => handleFakeBuy("yearly")}
            disabled={loading}
            className="w-full px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Fake Buy for $10"}
          </button>
        </div>

      </div>
    </div>
  )
}
