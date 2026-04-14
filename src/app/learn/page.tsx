import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Lock, PlayCircle, Unlock, ArrowRight, ShieldCheck, Zap } from "lucide-react"

export default async function Learn() {
  console.log("Learn page accessed")
  const session = await getServerSession(authOptions)
  console.log("Learn page session check:", { hasSession: !!session, userEmail: session?.user?.email, isPrime: (session?.user as any)?.isPrime })
  const isPrime = Boolean((session?.user as any)?.isPrime)
  console.log("Learn page isPrime:", isPrime)

  const courses = [
    { 
      id: "construction-timelapse", 
      title: "The Cinematic AI Construction Video Masterclass", 
      duration: "Premium Inside", 
      type: "Hybrid",
      description: "Learn how to direct, generate, and upscale hyper-realistic cinematic shots into a cohesive storytelling montage from an empty lot to a luxury mansion.",
      theme: "from-blue-50 to-indigo-100/50",
      border: "hover:border-blue-300",
      iconColor: "text-blue-600"
    },
    { 
      id: "cinematic-video", 
      title: "AI Movie & Cinematic Video Generation", 
      duration: "Premium Inside", 
      type: "Hybrid",
      description: "Create short films and high-end storytelling visuals. Master scene consistency, temporal coherence, and dramatic camera movements.",
      theme: "from-purple-50 to-fuchsia-100/50",
      border: "hover:border-purple-300",
      iconColor: "text-purple-600"
    },
    { 
      id: "prompt-engineering", 
      title: "Prompt Engineering for AI Images & Videos", 
      duration: "Premium Inside", 
      type: "Hybrid",
      description: "Structure professional-level prompts—not copied. Control lighting, camera angles, and character consistency like a pro director.",
      theme: "from-emerald-50 to-teal-100/50",
      border: "hover:border-emerald-300",
      iconColor: "text-emerald-600"
    },
    { 
      id: "tools-workflows", 
      title: "AI Tools & Secret Workflows", 
      duration: "Premium Inside", 
      type: "Hybrid",
      description: "Discover the exact suite of tools top creators use to stitch images, upscale assets, and compile viral results.",
      theme: "from-orange-50 to-amber-100/50",
      border: "hover:border-orange-300",
      iconColor: "text-orange-600"
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-black space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-black/10">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-black/70 text-sm font-semibold tracking-wide">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Executive Curriculums
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">Masterclass Materials</h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Select a module below to begin learning. Discover how top creators stitch tools together to produce consistent, high-end AI visuals.
          </p>
        </div>
        
        {/* Premium Status Badge */}
        <div className="shrink-0 hidden md:block">
           {isPrime ? (
             <div className="flex items-center gap-3 px-6 py-4 bg-green-50 border border-green-200 rounded-2xl shadow-sm">
                <ShieldCheck className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-800 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-green-900 font-medium">Premium Active</p>
                </div>
             </div>
           ) : (
             <div className="flex flex-col gap-3 px-6 py-4 bg-white border border-black/10 rounded-2xl shadow-sm text-right">
                <div>
                  <p className="text-sm text-black/60 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-black font-medium flex items-center gap-2 justify-end"><Lock className="w-4 h-4 text-black/40"/> Free Tier</p>
                </div>
                <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-800 font-semibold underline decoration-blue-300 underline-offset-4">
                  Upgrade to Premium
                </Link>
             </div>
           )}
        </div>
      </div>

      {!isPrime && (
        <div className="md:hidden flex items-center justify-between p-4 bg-black/5 rounded-xl border border-black/10">
          <span className="font-semibold text-black/70 flex items-center gap-2"><Lock className="w-4 h-4"/> Free Tier</span>
          <Link href="/dashboard" className="text-sm text-blue-600 font-bold">Upgrade &rarr;</Link>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <Link href={`/learn/${course.id}`} key={course.id} className="group relative focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-3xl">
            <div className={`h-full flex flex-col justify-between p-8 rounded-3xl border border-black/5 bg-gradient-to-br transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden z-10 relative bg-white`}>
              
              {/* Subtle top background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none`}></div>

              <div className="relative z-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider border bg-white border-black/10 text-black/80 shadow-sm">
                    {course.type}
                  </span>
                  {isPrime ? (
                    <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Unlock className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-black/50 bg-black/5 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-black/5">
                      <Lock className="w-3 h-3" /> {course.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-black transition-colors">{course.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-800 transition-colors">
                  {course.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-black/5 group-hover:border-black/10 transition-colors">
                <div className={`flex items-center gap-2 font-bold ${course.iconColor}`}>
                  <PlayCircle className="w-6 h-6" /> 
                  <span className="group-hover:underline underline-offset-4 decoration-2">Enter Module</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
