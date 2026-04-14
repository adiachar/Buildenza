"use client"
import Link from "next/link"
import { PlayCircle, Video, Code, Box } from "lucide-react"

export function HomeContent({ isLoggedIn }: { isLoggedIn: boolean }) {
    const startLearningAction = isLoggedIn ? "/learn" : "/api/auth/signin"

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-in fade-in duration-700 slide-in-from-bottom-8">
            <div className="max-w-4xl w-full text-center space-y-12">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/10 text-sm md:text-base mb-4 text-black/80 font-medium shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                        Learn How Viral AI Videos Are Really Built — Not Just Posted
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-gray-400">
                            Buildenza
                        </span>
                        <br />
                        <span className="text-4xl md:text-6xl text-black/80">
                            The Essence of Building
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed">
                        From AI-powered construction timelapses to cinematic AI movie scenes, you&apos;ll learn how creators actually build these videos step by step, using the right tools, prompts, and workflows that most people never talk about.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link
                        href={startLearningAction}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 text-left">
                    {[
                        { title: "Construction Timelapses", desc: "Generate hyper-realistic progress videos using AI.", icon: <Video /> },
                        { title: "Cinematic Video Gen", desc: "Create short films and storytelling visuals.", icon: <Box /> },
                        { title: "Prompt Engineering", desc: "Structure professional-level prompts — not copied.", icon: <Code /> },
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl glass-card relative group overflow-hidden border border-black/5 hover:border-black/10 text-black shadow-sm transition-all hover:shadow-md">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-black/90">{feature.title}</h3>
                            <p className="text-black/60 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
