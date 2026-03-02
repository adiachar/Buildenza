import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="fixed top-0 w-full z-40 glass border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-gradient flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"></div>
          </div>
          AIVid
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="/learn" className="hover:text-white transition-colors">
            Learn
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/api/auth/signout" className="px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors text-white">
                Sign Out
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin" className="px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
