import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Lock, PlayCircle } from "lucide-react"

export default async function Learn() {
  const session = await getServerSession(authOptions)

  const courses = [
    { id: "construction-timelapse", title: "AI Construction Timelapse Videos", duration: "Premium Inside", type: "Hybrid" },
    { id: "cinematic-video", title: "AI Movie & Cinematic Video Generation", duration: "Premium Inside", type: "Hybrid" },
    { id: "prompt-engineering", title: "Prompt Engineering for AI Images & Videos", duration: "Premium Inside", type: "Hybrid" },
    { id: "tools-workflows", title: "AI Tools & Workflows (Beginner to Advanced)", duration: "Premium Inside", type: "Hybrid" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-black">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-4">Learning Materials</h1>
        <p className="text-xl text-black/60">Below are the learning materials we provide. Learn how tools actually connect together to produce consistent, high-quality results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="glass-card p-6 flex flex-col justify-between h-48 group hover:border-black/20 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs rounded-full font-medium border bg-blue-50 text-blue-700 border-blue-200`}>
                  {course.type}
                </span>
                <span className="text-black/40 text-sm font-medium">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold">{course.title}</h3>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-black/5 pt-4">
              <Link href={`/learn/${course.id}`} className="flex items-center text-black hover:text-black/60 gap-2 transition-colors font-medium">
                <PlayCircle className="w-5 h-5" /> View Material
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
