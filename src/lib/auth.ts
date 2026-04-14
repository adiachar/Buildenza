import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcrypt-ts"
import { userService } from "./userService"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials authorize called with email:", credentials?.email ? "provided" : "missing")
        if (!credentials?.email || !credentials?.password) {
          console.warn("Authorize failed: missing credentials")
          return null
        }

        try {
          console.log("Looking up user in database for email:", credentials.email)
          const user = await userService.findUnique({ email: credentials.email })

          if (!user) {
            console.warn("Authorize failed: user not found for email:", credentials.email)
            return null
          }

          console.log("Comparing passwords for user:", user.id)
          const passwordsMatch = await compare(credentials.password, user.password)

          if (!passwordsMatch) {
            console.warn("Authorize failed: password mismatch for user:", user.id)
            return null
          }

          console.log("Credentials authorize successful for user:", user.id)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isPrime: user.isPrime,
          }
        } catch (e) {
          console.error("Authorize error details:", {
            error: e instanceof Error ? e.message : String(e),
            stack: e instanceof Error ? e.stack : undefined,
            email: credentials.email,
            timestamp: new Date().toISOString()
          })
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback called for token sub:", token.sub)
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
        ;(session.user as any).isPrime = token.isPrime
        console.log("Session updated with user data:", { id: token.sub, isPrime: token.isPrime })
      } else {
        console.warn("Session callback: missing session.user or token.sub")
      }
      return session
    },
    async jwt({ token, user }) {
      console.log("JWT callback called", { hasUser: !!user, tokenSub: token.sub })
      if (user) {
        token.sub = user.id
        token.isPrime = (user as any).isPrime
        console.log("JWT token updated with user data:", { sub: user.id, isPrime: (user as any).isPrime })
      }
      return token
    }
  },
}
