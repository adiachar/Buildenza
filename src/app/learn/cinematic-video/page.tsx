import Link from "next/link"
import { Lock } from "lucide-react"

export default function CinematicVideo() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium mb-8">
        Coming Soon
      </div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
        AI Movie & Cinematic Video Generation
      </h1>
      <p className="text-xl md:text-2xl text-black/60 font-light max-w-2xl mx-auto">
        Create short films, cinematic shots, and storytelling visuals using AI image-to-video workflows.
      </p>

      <div className="mt-16 p-12 glass-card rounded-3xl border border-black/10 flex flex-col items-center justify-center space-y-6">
        <Lock className="w-16 h-16 text-black/20" />
        <h2 className="text-3xl font-bold">Premium Content</h2>
        <p className="text-lg text-black/60 max-w-md">
          This material is currently being structured. It will be available soon as part of the Buildenza Premium Subscription.
        </p>
        <Link href="/auth/signup" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg mt-8 inline-block">
          Join Buildenza Premium for $5
        </Link>
      </div>
    </div>
  )
}