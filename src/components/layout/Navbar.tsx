import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { getAuthOptions } from "@/lib/auth"

export async function Navbar() {
  const session = await getServerSession(getAuthOptions())

  return (
    <nav className="fixed top-0 w-full z-40 glass border-b border-black/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-gradient flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center border border-black/10">
            <div className="w-2 h-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
          </div>
          Buildnza
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-black/70">
          <Link href="/learn" className="hover:text-black transition-colors">
            Learn
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-black transition-colors">
                Dashboard
              </Link>
              <Link href="/api/auth/signout" className="px-4 py-2 rounded-full glass hover:bg-black/5 transition-colors text-black shadow-sm">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hover:text-black transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
