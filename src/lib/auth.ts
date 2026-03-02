import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            // For a real app, you would verify the password hash here before creating or returning
            // But for this mockup learning platform, we can auto-create if not exists
            // OR enforce actual signup.
            // Let's create a new user to make it easy to test:
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                emailVerified: new Date(),
                isPrime: false, // Default is false, they need to pay to upgrade
              }
            })
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              isPrime: newUser.isPrime,
            }
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isPrime: user.isPrime,
          }
        } catch (e) {
          console.error("Authorize error", e)
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
      if (session.user && token.sub) {
        (session.user as any).id = token.sub

        try {
          const user = await prisma.user.findUnique({
            where: { id: token.sub },
          })
          if (user) {
            (session.user as any).isPrime = user.isPrime
          }
        } catch (e) {
          console.error("Session callback error", e)
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
}
