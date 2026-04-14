import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { HomeContent } from "@/components/ui/HomeContent"

export default async function Home() {
  console.log("Home page accessed")
  const session = await getServerSession(authOptions)
  console.log("Home page session check:", { hasSession: !!session, userEmail: session?.user?.email, isPrime: (session?.user as any)?.isPrime })

  return <HomeContent isLoggedIn={!!session} />
}
