import { getServerSession } from "next-auth/next"
import { getAuthOptions } from "@/lib/auth"
import { HomeContent } from "@/components/ui/HomeContent"

export default async function Home() {
  const session = await getServerSession(getAuthOptions())

  return <HomeContent isLoggedIn={!!session} />
}
