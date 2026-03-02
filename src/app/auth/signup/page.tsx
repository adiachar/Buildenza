"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

import { useRouter } from "next/navigation"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        setErrorMsg(errorData.message || "Signup failed")
        return
      }

      // If signup is successful, log them in automatically
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (signInRes?.ok) {
        router.push("/")
      } else {
        setErrorMsg("Failed to auto-login. Please sign in.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      setErrorMsg("An unexpected error occurred.")
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-card p-10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-medium text-black hover:text-black/80 underline decoration-black/30 underline-offset-4">
              Sign in instead
            </Link>
          </p>
        </div>

        <form className="relative z-10 mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {errorMsg}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="sr-only" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm bg-white/50 backdrop-blur-md transition-colors"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm bg-white/50 backdrop-blur-md transition-colors"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-xl border border-black/10 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm bg-white/50 backdrop-blur-md transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-black py-3 px-4 text-sm font-semibold text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all shadow-lg shadow-black/20"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="relative z-10 mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#fcfcfd] px-2 text-gray-500 rounded-full">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white/50 backdrop-blur-md px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all shadow-sm"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
