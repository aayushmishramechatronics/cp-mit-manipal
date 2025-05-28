"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  excerpt: string
  imageUrl: string
  url: string
  category: "beginner" | "intermediate" | "advanced" | "tutorial" | "interview"
}

// Curated list of competitive programming blog posts
const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Approach Dynamic Programming Problems",
    author: "Errichto",
    date: "May 15, 2024",
    excerpt: "a comprehensive guide to understanding and solving Dynamic Programming Problems efficiently.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://codeforces.com/blog/entry/67679",
    category: "intermediate",
  },
  {
    id: "blog-2",
    title: "Binary Search: Beyond the Basics",
    author: "tourist",
    date: "June 3, 2025",
    excerpt: "learn Advanced Binary Search Techniques that can be applied to a wide range of problems.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://codeforces.com/blog/entry/9901",
    category: "intermediate",
  },
  {
    id: "blog-3",
    title: "Competitive Programming Roadmap for Beginners",
    author: "Striver",
    date: "February 22, 2025",
    excerpt: "a step-by-step guide for beginners to get started with Competitive Programming.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://takeuforward.org/interviews/strivers-cp-sheet/",
    category: "beginner",
  },
  {
    id: "blog-4",
    title: "Graph Algorithms Every Competitive Programmer Should Know",
    author: "SecondThread",
    date: "July 10, 2024",
    excerpt: "a comprehensive overview of essential Graph Algorithms with implementation examples.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://codeforces.com/blog/entry/16221",
    category: "advanced",
  },
  {
    id: "blog-5",
    title: "How I Prepared for Google Interviews",
    author: "Rachit Jain",
    date: "August 5, 2024",
    excerpt: "my journey and strategies for cracking Google's Coding Interviews using Competitive Programming.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://www.linkedin.com/pulse/how-i-prepared-google-interviews-rachit-jain/",
    category: "interview",
  },
  {
    id: "blog-6",
    title: "Understanding Time and Space Complexity",
    author: "Pepcoding",
    date: "March 18, 2025",
    excerpt: "a detailed explanation of how to Analyze and Optimize your Algorithms for better performance.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/",
    category: "beginner",
  },
  {
    id: "blog-7",
    title: "Segment Trees Made Easy",
    author: "William Lin",
    date: "September 12, 2023",
    excerpt: "a simplified approach to understanding and implementing Segment Trees for Range Queries.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://codeforces.com/blog/entry/18051",
    category: "intermediate",
  },
  {
    id: "blog-8",
    title: "The Art of Debugging in Competitive Programming",
    author: "Errichto",
    date: "October 3, 2023",
    excerpt: "effective strategies for finding and Fixing Bugs Quickly during Contests.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://codeforces.com/blog/entry/67679",
    category: "tutorial",
  },
  {
    id: "blog-9",
    title: "Advanced String Algorithms",
    author: "tourist",
    date: "November 7, 2023",
    excerpt: "Deep dive into KMP, Z-algorithm, and Suffix Arrays for Efficient String Processing.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://cp-algorithms.com/string/prefix-function.html",
    category: "advanced",
  },
  {
    id: "blog-10",
    title: "How to Balance CP with College Studies",
    author: "Striver",
    date: "December 1, 2023",
    excerpt: "practical tips for managing competitive programming alongside academic responsibilities.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "https://takeuforward.org/interviews/strivers-cp-sheet/",
    category: "tutorial",
  },
]

// Duplicate the posts to create a seamless infinite effect
const allPosts = [...blogPosts, ...blogPosts]

export default function BlogPostCarousel() {
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
  const animationDuration = carouselWidth * 0.025 // Adjust speed here

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

  // Open blog post
  const openBlogPost = (url: string) => {
    if (!isDragging) {
      window.open(url, "_blank")
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
      case "interview":
        return "bg-pink-500 hover:bg-pink-600"
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
        <span className="sr-only">Scroll Left</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sr-only">Scroll Right</span>
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
        {allPosts.map((post, index) => (
          <div
            key={`${post.id}-${index}`}
            className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[350px] cursor-pointer group"
            onClick={() => openBlogPost(post.url)}
          >
            <div className="rounded-lg overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
              {/* Blog Info */}
              <div className="p-3 sm:p-5 flex flex-col flex-grow relative z-10">
                <Badge
                  className={cn(
                    "self-start mb-2 sm:mb-3 font-normal text-xs backdrop-blur-sm",
                    getCategoryColor(post.category),
                  )}
                >
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </Badge>

                <h3 className="font-bold text-white text-base sm:text-lg line-clamp-2 mb-2 group-hover:underline">
                  {post.title}
                </h3>

                <p className="text-white/80 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>

                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="mt-2 sm:mt-3 flex items-center text-white text-xs sm:text-sm font-medium">
                  <span>Read More</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
