import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcrypt-ts"
import { userService } from "./userService"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await userService.findUnique({ email: credentials.email })
          if (!user) return null

          const passwordsMatch = await compare(credentials.password, user.password)
          if (!passwordsMatch) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isPrime: user.isPrime,
          }
        } catch (e) {
          console.error("Authorize error:", e instanceof Error ? e.message : String(e))
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
    // Runs when any provider (Google, Credentials) signs in
    async signIn({ user, account }) {
      // Only run DB logic for Google OAuth
      if (account?.provider === "google") {
        try {
          const existing = await userService.findUnique({ email: user.email! })
          if (!existing) {
            // First-time Google user — create them in database (no password needed)
            const newUser = await userService.createGoogleUser({
              email: user.email!,
              name: user.name || user.email!.split("@")[0],
            })
            // Attach DB id and isPrime to user object so JWT callback picks it up
            user.id = newUser.id
            ;(user as any).isPrime = newUser.isPrime
          } else {
            // Returning Google user — attach their DB data
            user.id = existing.id
            ;(user as any).isPrime = existing.isPrime
          }
        } catch (e) {
          console.error("Google signIn DB error:", e instanceof Error ? e.message : String(e))
          return false // Block sign-in if DB fails
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.isPrime = (user as any).isPrime
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
        ;(session.user as any).isPrime = token.isPrime
      }
      return session
    },

    // Ensure Google users are redirected to /learn after sign-in
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url.startsWith(baseUrl)) return url
      return `${baseUrl}/learn`
    },
  },
}
