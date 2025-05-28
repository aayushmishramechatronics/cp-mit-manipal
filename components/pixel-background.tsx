"use client"

import { useEffect, useRef } from "react"

interface PixelBackgroundProps {
  color?: string
  density?: number
  className?: string
}

export default function PixelBackground({
  color = "rgba(255,255,255,0.1)",
  density = 15,
  className = "",
}: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx.scale(dpr, dpr)

      // Draw pixels
      const pixelSize = Math.max(2, Math.floor(width / density))
      const cols = Math.ceil(width / pixelSize)
      const rows = Math.ceil(height / pixelSize)

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.8) {
            ctx.fillStyle = color
            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize - 1, pixelSize - 1)
          }
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [color, density])

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />
}
