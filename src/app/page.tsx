"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { PlayCircle, Video, Code, Box } from "lucide-react"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full text-center space-y-12"
      >
        <motion.div variants={item} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-black/10 text-sm mb-4 text-black/70 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            New: Learn 3D Video Generation
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-gray-400">
              Create AI Videos
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto font-light">
            Master the art of generative video, 3D animations, and prompt engineering in our interactive courses.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/api/auth/signin"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-all overflow-hidden w-full sm:w-auto shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            Start Learning <PlayCircle className="w-5 h-5" />
          </Link>
          <Link
            href="/learn"
            className="px-8 py-4 rounded-full glass text-black font-medium hover:bg-black/5 transition-colors border border-black/10 w-full sm:w-auto shadow-sm"
          >
            View Syllabus
          </Link>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 text-left">
          {[
            { title: "Generative Models", desc: "Understand Sora, Runway Gen-2, and Pika.", icon: <Video /> },
            { title: "3D Workflows", desc: "Integrate AI with Blender and Unreal Engine.", icon: <Box /> },
            { title: "Prompt Engineering", desc: "Write prompts that control camera and motion.", icon: <Code /> },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl glass-card relative group overflow-hidden border border-black/5 hover:border-black/10 text-black">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-black/90">{feature.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
