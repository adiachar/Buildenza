import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Lock, Unlock, CheckCircle2 } from "lucide-react"

export default async function ConstructionTimelapse() {
  const session = await getServerSession(authOptions)
  const isPremium = (session?.user as any)?.isPrime || false

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-black space-y-16">
      {/* Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium">
          Hybrid Course
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          AI Construction Timelapse Videos
        </h1>
        <p className="text-xl md:text-2xl text-black/60 font-light max-w-2xl">
          (From Empty Land to Finished Megastructure) <br />
          Learn how creators generate hyper-realistic construction progress videos using AI — even without real footage.
        </p>
      </div>

      {/* Free Content Section */}
      <div className="glass-card p-8 md:p-12 space-y-10">
        <div className="space-y-4 border-b border-black/10 pb-8">
          <h2 className="text-3xl font-bold">Complete Step-by-Step Process</h2>
          <p className="text-lg text-black/70">
            This is not a shortcut tutorial. This is the real workflow used to create high-performing AI construction timelapse videos.
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black/90">Step 1: Concept & Timeline Planning</h3>
            <ul className="list-disc list-inside text-black/70 space-y-2 ml-2">
              <li>Decide the structure (foundation → floors → exterior → final render)</li>
              <li>Break the build into logical construction phases</li>
              <li>Maintain visual continuity across stages</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black/90">Step 2: Prompt Engineering for Each Phase</h3>
            <p className="text-black/70 italic text-sm">One weak prompt = broken video sequence</p>
            <ul className="list-disc list-inside text-black/70 space-y-2 ml-2">
              <li>Environment consistency</li>
              <li>Camera angle stability</li>
              <li>Lighting progression</li>
              <li>Material realism</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black/90">Step 3: AI Image Generation</h3>
            <ul className="list-disc list-inside text-black/70 space-y-2 ml-2">
              <li>Generate multiple variations per phase</li>
              <li>Select images that maintain: Same perspective, Scale accuracy, Architectural continuity</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black/90">Step 4: AI Video Generation</h3>
            <ul className="list-disc list-inside text-black/70 space-y-2 ml-2">
              <li>Convert images into smooth motion sequences</li>
              <li>Control motion speed, depth, and camera movement</li>
              <li>Fix common AI artifacts before final output</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black/90">Step 5: Timelapse Assembly & Editing</h3>
            <ul className="list-disc list-inside text-black/70 space-y-2 ml-2">
              <li>Arrange sequences into a logical build flow</li>
              <li>Add transitions, pacing, and cinematic timing</li>
              <li>Final polish for social media or YouTube</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl border border-black/10 bg-black/5">
        <h2 className="text-2xl font-bold mb-4">The Truth Most Creators Won’t Tell You</h2>
        <p className="text-black/80 space-y-2">
          <span className="block mb-2 font-medium">It may look easy.</span>
          <span className="block mb-4">But creating these kinds of AI videos is extremely difficult if you don’t know:</span>
          <ul className="list-disc list-inside ml-2 space-y-1 mb-4">
            <li>How to engineer prompts correctly</li>
            <li>How to maintain consistency across images and videos</li>
            <li>How to control AI instead of letting AI control you</li>
          </ul>
          <span className="block font-medium text-red-600/80">Without proper prompt engineering, results are random, broken, and unusable.</span>
        </p>
      </div>

      {/* Premium Gated Section */}
      <div className={`relative rounded-3xl overflow-hidden border ${isPremium ? 'border-green-200 bg-green-50' : 'border-black/10 bg-white/50 glass'} p-8 md:p-12 shadow-xl`}>
        {!isPremium && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
            <Lock className="w-12 h-12 mb-4 text-black/40" />
            <h3 className="text-3xl font-black mb-4">Join Buildnza Premium</h3>
            <p className="text-lg text-black/70 mb-8 max-w-md">
              Unlock the exact prompts, tools, and secret methods used by top creators for just $5.
            </p>
            <Link href="/auth/signup" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
              Unlock Everything for $5
            </Link>
          </div>
        )}

        <div className={!isPremium ? 'opacity-30 pointer-events-none filter blur-[2px]' : ''}>
          <div className="flex items-center gap-3 mb-8 border-b border-black/10 pb-6">
            <Unlock className="w-6 h-6 text-green-600" />
            <h2 className="text-3xl font-bold text-green-900">Premium Material Unlocked</h2>
          </div>

          <h3 className="text-2xl font-bold mb-6">Here’s the Advantage You Get with Buildnza</h3>
          <p className="mb-6 text-black/70 font-medium">I’ve already done the hardest part for you.</p>

          <div className="space-y-4 mb-10">
            {[
              "Professionally engineered prompts for AI construction & cinematic videos",
              "A proven workflow that actually works",
              "A secret method to use Google Gemini & Google Flow effectively — for FREE!",
              "Step-by-step guidance on using these prompts correctly",
              "A complete walkthrough on how to access Google AI Pro for FREE!"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <span className="text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          <p className="text-black/60 italic border-l-4 border-black/20 pl-4 py-2 bg-black/5 rounded-r-lg">
            This information is never shared openly — and it’s the biggest secret hidden by most creators in this niche.
          </p>
        </div>
      </div>
    </div>
  )
}