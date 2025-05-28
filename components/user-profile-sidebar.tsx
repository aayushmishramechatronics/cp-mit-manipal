"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Settings, LogOut, Bell, BookOpen, Award, X, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function UserProfileSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  // Mock user data
  const user = {
    name: "Aayush Mishra",
    username: "aayushcodes",
    email: "aayush4.mitmpl2023@learner.manipal.edu",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 1842,
    badge: "Specialist",
    branch: "Mechatronics",
    year: "2nd Year",
    problemsSolved: 153,
    contestsParticipated: 19,
    globalRank: 7583,
    collegeRank: 4,
    recentActivity: [
      { type: "contest", name: "Codeforces Round #835", date: "2 days ago", result: "+48" },
      { type: "problem", name: "Minimum Path Sum", date: "3 days ago", platform: "LeetCode" },
      { type: "contest", name: "CodeChef Starters 68", date: "1 week ago", result: "+22" },
    ],
    skills: [
      { name: "Dynamic Programming", level: 85 },
      { name: "Graph Algorithms", level: 72 },
      { name: "Data Structures", level: 90 },
      { name: "String Algorithms", level: 65 },
      { name: "Mathematics", level: 78 },
    ],
    social: {
      github: "https://github.com/aayushmishra2030",
      linkedin: "https://linkedin.com/in/aayush-anil-mishra-508abb280/",
      twitter: "https://twitter.com/AayushMish53880",
    },
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Grandmaster":
        return "bg-red-500"
      case "Master":
        return "bg-orange-500"
      case "Expert":
        return "bg-purple-500"
      case "Specialist":
        return "bg-blue-500"
      case "Pupil":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      {/* Profile Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-white/10 min-h-[40px] min-w-[40px]"
      >
        <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        <span className="sr-only">User Profile</span>
      </Button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 to-black border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-3 sm:p-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-white">Profile</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white min-h-[40px] min-w-[40px]"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <Separator className="bg-white/10" />

            {/* User Info */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-white/60">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getBadgeColor(user.badge)}>{user.badge}</Badge>
                    <span className="text-white/80 text-sm">{user.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">{user.problemsSolved}</p>
                  <p className="text-xs text-white/60">Problems Solved</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">{user.contestsParticipated}</p>
                  <p className="text-xs text-white/60">Contests Participated</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">College Rank</span>
                  <span className="text-sm font-medium text-white">{user.collegeRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Global Rank</span>
                  <span className="text-sm font-medium text-white">{user.globalRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Branch</span>
                  <span className="text-sm font-medium text-white">{user.branch}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Year</span>
                  <span className="text-sm font-medium text-white">{user.year}</span>
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              {/* Skills */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Skills</h4>
                <div className="space-y-4">
                  {user.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">{skill.name}</span>
                        <span className="text-xs font-medium text-white/60">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5 bg-white/10" indicatorClassName="bg-indigo-500" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              {/* Recent Activity */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-white">{activity.name}</p>
                          <p className="text-xs text-white/60">
                            {activity.type === "contest" ? "Contest" : "Problem"} • {activity.date}
                          </p>
                        </div>
                        {activity.type === "contest" && (
                          <span
                            className={`text-sm font-medium ${activity.result.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                          >
                            {activity.result}
                          </span>
                        )}
                        {activity.type === "problem" && (
                          <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                            Solved
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Connect</h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full border-white/10 text-white hover:text-white hover:bg-white/10"
                  >
                    <a href={user.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full border-white/10 text-white hover:text-white hover:bg-white/10"
                  >
                    <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full border-white/10 text-white hover:text-white hover:bg-white/10"
                  >
                    <a href={user.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">X</span>
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10 text-white hover:text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10 text-white hover:text-white hover:bg-white/10"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10 text-white hover:text-white hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>My Submissions</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10 text-white hover:text-white hover:bg-white/10"
                >
                  <Award className="h-4 w-4" />
                  <span>Achievements</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/10 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
