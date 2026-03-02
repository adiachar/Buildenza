import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // If it's a learn route, require a valid token (must be logged in)
        if (req.nextUrl.pathname.startsWith('/learn') || req.nextUrl.pathname.startsWith('/dashboard')) {
          return token !== null
        }
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/learn/:path*', '/dashboard/:path*']
}
