import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { HomeContent } from "@/components/ui/HomeContent"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return <HomeContent isLoggedIn={!!session} />
}
