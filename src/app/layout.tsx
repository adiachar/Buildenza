import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { CursorTracker } from "@/components/ui/CursorTracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Buildenza | Learn AI Video Generation",
  description: "Create modern 3D AI videos. Learn how to generate AI videos.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#fafafa] text-black min-h-screen selection:bg-black/10 selection:text-black relative overflow-x-hidden`} suppressHydrationWarning>
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden w-full h-full pointer-events-none flex justify-center">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]"></div>
        </div>

        <Suspense fallback={null}>
          <CursorTracker />
        </Suspense>
        <Navbar />
        <main className="pt-24 min-h-[calc(100vh-64px)] pb-12 relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
