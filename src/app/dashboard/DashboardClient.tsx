"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Star, Zap, PlayCircle } from "lucide-react"

export function DashboardClient({ isPrime }: { isPrime: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [justUpgraded, setJustUpgraded] = useState(false)

  const triggerCelebration = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleFakeBuy = async (plan: "monthly" | "yearly") => {
    setLoading(true)
    try {
      const res = await initializeRazorpay()

      if (!res) {
        alert("Razorpay SDK Failed to load")
        return
      }

      // Create Order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      })
      const orderData = await orderRes.json()

      if (!orderData.id) {
        alert(orderData.message || "Something went wrong")
        return
      }

      // Initialize Checkout Modal
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Buildnza",
        description: plan === "yearly" ? "Premium Yearly Access" : "Premium Monthly Access",
        order_id: orderData.id,
        theme: {
          color: "#000000",
        },
        handler: async function (response: any) {
          try {
            // Verify Payment
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              setJustUpgraded(true)
              triggerCelebration()
              setTimeout(() => {
                router.refresh()
              }, 3500)
            } else {
              alert("Payment verification failed!")
            }
          } catch (error) {
            console.error("Verification error:", error)
          }
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed: " + response.error.description)
      })
      rzp.open()

    } catch (e) {
      console.error(e)
      alert("An error occurred during payment.")
    } finally {
      setLoading(false)
    }
  }

  if (isPrime || justUpgraded) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden p-10 mt-6 bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200/50 rounded-3xl shadow-2xl glass-card flex flex-col items-center text-center"
        >
          {justUpgraded && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"
            />
          )}
          <div className="w-20 h-20 mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
            <Star className="w-10 h-10 text-white fill-white" />
          </div>
          <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-900 mb-4">
            {justUpgraded ? "Welcome to Premium!" : "You are a Premium Member"}
          </h3>
          <p className="text-lg text-green-800/80 mb-8 max-w-md">
            {justUpgraded
              ? "Your payment was successful. You now have full access to all Buildnza premium video generation courses and secret workflows."
              : "You have full access to all Buildnza premium video generation courses. Keep building!"}
          </p>
          <button
            onClick={() => router.push("/learn")}
            className="group relative px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-black/20 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            Start Learning <PlayCircle className="w-5 h-5" />
          </button>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="mt-8 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
          Unlock Premium Access
        </h2>
        <p className="text-lg text-gray-600">Choose the plan that best fits your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* 1 Month Plan */}
        <div className="relative p-8 rounded-3xl glass-card border border-black/5 hover:border-black/20 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white/40 backdrop-blur-xl">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
            <p className="text-gray-500 h-10">Full access to all premium modules for 30 days.</p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-black tracking-tighter text-gray-900">$5</span>
            <span className="text-gray-500 font-medium ml-2">/month</span>
          </div>

          <ul className="space-y-4 mb-8 flex-grow">
            {["Complete AI Video Workflows", "Premium Prompt Engineering", "Access to New Updates", "Cancel Anytime"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleFakeBuy("monthly")}
            disabled={loading}
            className="w-full px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors shadow-lg shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? "Processing..." : "Select Monthly Plan"}
          </button>
        </div>

        {/* 1 Year Plan - Highlighted */}
        <div className="relative p-8 rounded-3xl border border-yellow-500/30 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2 bg-gradient-to-b from-white to-yellow-50/50 backdrop-blur-xl z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-3xl pointer-events-none"></div>

          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <div className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-bold rounded-full uppercase tracking-wider shadow-lg shadow-yellow-500/30 flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-white" /> Most Popular
            </div>
          </div>

          <div className="mb-8 mt-2 relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Yearly</h3>
            <p className="text-gray-500 h-10">Commit to mastering AI video and save big.</p>
          </div>
          <div className="mb-8 relative z-10">
            <span className="text-5xl font-black tracking-tighter text-gray-900">$10</span>
            <span className="text-gray-500 font-medium ml-2">/year</span>
            <div className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
              Save $50 annually
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-grow relative z-10">
            {["Everything in Monthly", "Priority Email Support", "1-on-1 Workflow Review", "Secret VIP Discord Access"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-yellow-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleFakeBuy("yearly")}
            disabled={loading}
            className="relative z-10 w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-2xl font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-xl shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            Select Yearly Plan
          </button>
        </div>

      </div>
    </div>
  )
}
