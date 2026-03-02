import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { CursorTracker } from "@/components/ui/CursorTracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AIVid | Learn AI Video Generation",
  description: "Create modern 3D AI videos. Learn how to generate AI videos.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white min-h-screen selection:bg-white/30 selection:text-white`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] via-black to-black"></div>
        <CursorTracker />
        <Navbar />
        <main className="pt-24 min-h-[calc(100vh-64px)] pb-12">
          {children}
        </main>
      </body>
    </html>
  )
}
