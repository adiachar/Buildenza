"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"

export function CursorTracker() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Reset loader when path or query changes (navigation complete)
    setIsLoading(false)
  }, [pathname, searchParams])

  useEffect(() => {
    setMounted(true)
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      const button = target.closest('button')
      
      if ((link && link.href && !link.href.includes('#')) || (button && button.type === 'submit')) {
        // It's a navigation or submission click
        setIsLoading(true)
        // Fallback to reset loader if navigation fails or is extremely fast
        setTimeout(() => setIsLoading(false), 5000)
      } else {
        // Just a regular click, show short animation pulse
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 400)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          scale: isLoading ? 0.8 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      >
        <div className={`w-full h-full rounded-full backdrop-blur-[2px] transition-all duration-300 ${isLoading ? 'border-2 border-dashed border-black animate-spin bg-transparent' : 'border border-solid border-black/50 bg-black/5'}`} />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-black pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30, mass: 0.1 }}
      />
    </>
  )
}
