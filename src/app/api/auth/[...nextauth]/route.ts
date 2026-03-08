import NextAuth from "next-auth"
import { getAuthOptions } from "@/lib/auth"
import { NextRequest } from "next/server"

const handler = async (req: NextRequest, context: any) => {
  return NextAuth(req, context, getAuthOptions())
}

export { handler as GET, handler as POST }
