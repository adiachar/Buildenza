import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials (Dev Only)",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        try {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                emailVerified: new Date(),
                isPrime: false,
              }
            })
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
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        if (user) {
          (session.user as any).isPrime = user.isPrime
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
