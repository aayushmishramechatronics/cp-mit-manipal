"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CounterProps {
  end: number
  duration?: number
  label?: string
}

export default function CounterAnimation({ end, duration = 2, label = "Total" }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 min-w-[140px] sm:min-w-[160px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-lg"
      >
        {count.toLocaleString()}+
      </motion.div>
      <div className="text-xs sm:text-sm md:text-base text-white/80 mt-1 text-center font-medium leading-tight">
        {label}
      </div>
    </div>
  )
}
