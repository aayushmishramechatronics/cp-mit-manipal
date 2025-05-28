"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface YouTubeVideo {
  id: string
  title: string
  channelName: string
  thumbnailUrl: string
  category: "beginner" | "intermediate" | "advanced" | "tutorial"
}

// Curated list of competitive programming videos for beginners
const cpVideos: YouTubeVideo[] = [
  {
    id: "0IAPZzGSbME",
    title: "Introduction to Algorithms",
    channelName: "Abdul Bari",
    thumbnailUrl: "https://img.youtube.com/vi/0IAPZzGSbME/maxresdefault.jpg",
    category: "intermediate",
  },
  {
    id: "ayZppqJAUcc",
    title: "90 Days Roadmap",
    channelName: "takeUforward",
    thumbnailUrl: "https://img.youtube.com/vi/ayZppqJAUcc/maxresdefault.jpg",
    category: "beginner",
  },
  {
    id: "xAeiXy8-9Y8",
    title: "How to get Started CP",
    channelName: "Errichto Algorithms",
    thumbnailUrl: "https://img.youtube.com/vi/xAeiXy8-9Y8/maxresdefault.jpg",
    category: "beginner",
  },
  {
    id: "oBt53YbR9Kk",
    title: "Dynamic Programming - Learn to Solve Algorithmic Problems",
    channelName: "freeCodeCamp.org",
    thumbnailUrl: "https://img.youtube.com/vi/oBt53YbR9Kk/maxresdefault.jpg",
    category: "intermediate",
  },
  {
    id: "RBSGKlAvoiM",
    title: "Data Structures Easy to Advanced Course",
    channelName: "freeCodeCamp.org",
    thumbnailUrl: "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
    category: "beginner",
  },
  {
    id: "8hly31xKli0",
    title: "Algorithms and Data Structures Tutorial",
    channelName: "freeCodeCamp.org",
    thumbnailUrl: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
    category: "beginner",
  },
  {
    id: "g2uqg5H2Esg",
    title: "Newbie to Specialist",
    channelName: "TLE Eliminators",
    thumbnailUrl: "https://img.youtube.com/vi/g2uqg5H2Esg/maxresdefault.jpg",
    category: "beginner",
  },
]

// Duplicate the videos to create a seamless infinite effect
const allVideos = [...cpVideos, ...cpVideos]

export default function YouTubeCarousel() {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Calculate widths for animation
  useEffect(() => {
    if (carouselRef.current) {
      const updateWidths = () => {
        const container = carouselRef.current?.parentElement
        if (container) {
          setContainerWidth(container.offsetWidth)
          setCarouselWidth(carouselRef.current?.scrollWidth || 0)
        }
      }

      updateWidths()
      window.addEventListener("resize", updateWidths)

      return () => {
        window.removeEventListener("resize", updateWidths)
      }
    }
  }, [])

  // Calculate animation duration based on content width
  const animationDuration = carouselWidth * 0.02 // Adjust speed here

  // Handle manual navigation
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -containerWidth / 2 : containerWidth / 2
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Open YouTube video
  const openYouTubeVideo = (videoId: string) => {
    if (!isDragging) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
    }
  }

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner":
        return "bg-green-500 hover:bg-green-600"
      case "intermediate":
        return "bg-blue-500 hover:bg-blue-600"
      case "advanced":
        return "bg-purple-500 hover:bg-purple-600"
      case "tutorial":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sr-only">Scroll left</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sr-only">Scroll right</span>
      </Button>

      {/* Carousel Container */}
      <motion.div
        ref={carouselRef}
        className="flex gap-3 sm:gap-4 py-2 px-2 sm:px-4 overflow-x-auto scrollbar-hide"
        animate={
          isHovered || isDragging
            ? { x: 0 }
            : {
                x: [0, -carouselWidth / 2],
              }
        }
        transition={
          isHovered || isDragging
            ? { type: "tween" }
            : {
                duration: animationDuration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }
        }
        drag="x"
        dragConstraints={{ left: -carouselWidth + containerWidth, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 200)}
        style={{ touchAction: "pan-y" }}
      >
        {allVideos.map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] cursor-pointer group"
            onClick={() => openYouTubeVideo(video.id)}
          >
            <div className="rounded-lg overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={
                    video.thumbnailUrl ||
                    `/placeholder.svg?height=200&width=350&text=${encodeURIComponent(video.title) || "/placeholder.svg"}`
                  }
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center backdrop-blur-sm">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-2 sm:p-3 flex flex-col flex-grow">
                <Badge
                  className={cn(
                    "self-start mb-1 sm:mb-2 font-normal text-xs backdrop-blur-sm",
                    getCategoryColor(video.category),
                  )}
                >
                  {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                </Badge>
                <h3 className="font-medium text-white text-sm sm:text-base line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 mt-auto">{video.channelName}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
