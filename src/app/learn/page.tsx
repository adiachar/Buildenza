import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import { Lock, PlayCircle } from "lucide-react"

export default async function Learn() {
  const session = await getServerSession(authOptions)

  const courses = [
    { id: 1, title: "Intro to Gen-2", duration: "45 min", type: "Free" },
    { id: 2, title: "Sora Architecture", duration: "1.5 hrs", type: "Prime" },
    { id: 3, title: "3D Blender Workflows", duration: "3 hrs", type: "Prime" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4">Course Catalog</h1>
        <p className="text-xl text-white/50">Explore cutting-edge AI video generation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="glass-card p-6 flex flex-col justify-between h-48 group hover:border-white/20 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${course.type === 'Free' ? 'bg-white/10 text-white' : 'bg-green-500/20 text-green-400'}`}>
                  {course.type}
                </span>
                <span className="text-white/30 text-sm">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold">{course.title}</h3>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
              {course.type === 'Prime' && !(session?.user as any)?.isPrime ? (
                <div className="flex items-center text-white/40 gap-2">
                  <Lock className="w-4 h-4" /> Locked
                </div>
              ) : (
                <Link href={`/learn/${course.id}`} className="flex items-center text-white hover:text-white/70 gap-2 transition-colors">
                  <PlayCircle className="w-5 h-5" /> Start Course
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
