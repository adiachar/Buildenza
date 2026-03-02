import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials (Dev Only)",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        // Mocking user authorization since DB is failing due to DNS/network in sandbox
        return {
          id: "1",
          name: credentials.email.split('@')[0],
          email: credentials.email,
          isPrime: true,
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
        // Mocking prime status
        ;(session.user as any).isPrime = true
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
