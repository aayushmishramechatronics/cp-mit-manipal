"use client"

import { useState, useEffect } from "react"
import { Menu, Home, Code2, Sun, Moon, Trophy, Calendar, Youtube, ExternalLink, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import UserProfileSidebar from "@/components/user-profile-sidebar"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    // Force a re-render of the entire page to ensure all components update
    document.documentElement.classList.toggle("dark", theme !== "dark")
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 right-0 z-50 p-3 sm:p-4 flex items-center justify-end gap-2">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md"></div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md"></div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md"></div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 right-0 z-50 p-2 sm:p-3 md:p-4 flex items-center justify-end gap-1.5 sm:gap-2">
      <UserProfileSidebar />

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors duration-300 min-h-[40px] min-w-[40px]"
      >
        {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 min-h-[40px] min-w-[40px]"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 sm:w-40 bg-white/10 backdrop-blur-md border-white/20">
          <DropdownMenuItem onClick={() => scrollToSection("home")} className="text-white hover:bg-white/20">
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("videos")} className="text-white hover:bg-white/20">
            <Youtube className="mr-2 h-4 w-4" />
            <span>Videos</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("blogs")} className="text-white hover:bg-white/20">
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>Blogs</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("platforms")} className="text-white hover:bg-white/20">
            <Code2 className="mr-2 h-4 w-4" />
            <span>CP Platforms</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("contests")} className="text-white hover:bg-white/20">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Contests</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("leaderboard")} className="text-white hover:bg-white/20">
            <Trophy className="mr-2 h-4 w-4" />
            <span>Leaderboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scrollToSection("faq")} className="text-white hover:bg-white/20">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>FAQ</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
