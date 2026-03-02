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
    <div className="max-w-7xl mx-auto px-6 py-12 text-black">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4">Course Catalog</h1>
        <p className="text-xl text-black/60">Explore cutting-edge AI video generation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="glass-card p-6 flex flex-col justify-between h-48 group hover:border-black/20 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs rounded-full font-medium border ${course.type === 'Free' ? 'bg-black/5 text-black border-black/10' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  {course.type}
                </span>
                <span className="text-black/40 text-sm font-medium">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold">{course.title}</h3>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-black/5 pt-4">
              {course.type === 'Prime' && !(session?.user as any)?.isPrime ? (
                <div className="flex items-center text-black/40 gap-2">
                  <Lock className="w-4 h-4" /> Locked
                </div>
              ) : (
                <Link href={`/learn/${course.id}`} className="flex items-center text-black hover:text-black/60 gap-2 transition-colors font-medium">
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
