"use client"

import { useEffect, useState } from "react"
import type { Contest, ContestFilters } from "@/lib/types"
import {
  filterContests,
  formatDate,
  formatDuration,
  getPlatformColor,
  getPlatformIcon,
  getTimeRemaining,
  isOngoingContest,
  isPastContest,
  isUpcomingContest,
} from "@/lib/contest-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Calendar, Clock, ExternalLink, Filter, RefreshCw } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Menu, MenuItem } from "@/components/ui/navbar-menu"

export default function ContestTracker() {
  const { theme } = useTheme()
  const [contests, setContests] = useState<Contest[]>([])
  const [filteredContests, setFilteredContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [filters, setFilters] = useState<ContestFilters>({
    platforms: {
      codeforces: true,
      codechef: true,
      leetcode: true,
    },
    showPast: true,
    showUpcoming: true,
  })
  const [activeTab, setActiveTab] = useState<string | null>("all")
  const [timeNow, setTimeNow] = useState(new Date())
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  // Fetch contests
  const fetchContests = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/contests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validate that data is an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API")
      }

      // Convert string dates to Date objects
      const processedData = data.map((contest: any) => ({
        ...contest,
        startTime: new Date(contest.startTime),
        endTime: new Date(contest.endTime),
      }))

      setContests(processedData)
    } catch (err) {
      console.error("Error fetching contests:", err)
      setError("Failed to load contests. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Load bookmarks from localStorage
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      const savedBookmarks = localStorage.getItem("contestBookmarks")
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks))
        } catch (err) {
          console.error("Error parsing bookmarks:", err)
          setBookmarks([])
        }
      }
    }

    fetchContests()

    // Update time every minute for countdown
    const interval = setInterval(() => {
      setTimeNow(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Apply filters when contests or filters change
  useEffect(() => {
    if (contests.length > 0) {
      let filtered = filterContests(contests, filters)

      if (activeTab === "bookmarked") {
        filtered = filtered.filter((contest) => bookmarks.includes(contest.id))
      } else if (activeTab === "ongoing") {
        filtered = filtered.filter((contest) => isOngoingContest(contest))
      } else if (activeTab === "upcoming") {
        filtered = filtered.filter((contest) => isUpcomingContest(contest))
      } else if (activeTab === "past") {
        filtered = filtered.filter((contest) => isPastContest(contest))
      }

      // Apply platform filter
      if (selectedPlatform !== "all") {
        filtered = filtered.filter((contest) => contest.platform === selectedPlatform)
      }

      setFilteredContests(filtered)
    }
  }, [contests, filters, bookmarks, activeTab, timeNow, selectedPlatform])

  // Toggle bookmark
  const toggleBookmark = (contestId: string) => {
    const newBookmarks = bookmarks.includes(contestId)
      ? bookmarks.filter((id) => id !== contestId)
      : [...bookmarks, contestId]

    setBookmarks(newBookmarks)

    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("contestBookmarks", JSON.stringify(newBookmarks))
      } catch (err) {
        console.error("Error saving bookmarks:", err)
      }
    }
  }

  // Get available platforms based on active tab
  const getAvailablePlatforms = () => {
    if (!contests.length) return []

    let relevantContests = contests

    if (activeTab === "ongoing") {
      relevantContests = contests.filter((contest) => isOngoingContest(contest))
    } else if (activeTab === "upcoming") {
      relevantContests = contests.filter((contest) => isUpcomingContest(contest))
    } else if (activeTab === "bookmarked") {
      relevantContests = contests.filter((contest) => bookmarks.includes(contest.id))
    } else if (activeTab === "past") {
      relevantContests = contests.filter((contest) => isPastContest(contest))
    }

    const platforms = [...new Set(relevantContests.map((contest) => contest.platform))]
    return platforms.sort()
  }

  // Toggle platform filter
  const togglePlatformFilter = (platform: keyof typeof filters.platforms) => {
    setFilters({
      ...filters,
      platforms: {
        ...filters.platforms,
        [platform]: !filters.platforms[platform],
      },
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      platforms: {
        codeforces: true,
        codechef: true,
        leetcode: true,
      },
      showPast: true,
      showUpcoming: true,
    })
    setSelectedPlatform("all")
  }

  return (
    <Card className="w-full border-0 shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl text-white">Contest Tracker</CardTitle>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Filter className="h-4 w-4" />
                  <span className="inline">Filter</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-md border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Filter Contests</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Select which Platforms and Contest Types to Display
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Platforms</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="codeforces"
                          checked={filters.platforms.codeforces}
                          onCheckedChange={() => togglePlatformFilter("codeforces")}
                        />
                        <Label htmlFor="codeforces" className="text-white/80">
                          Codeforces
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="codechef"
                          checked={filters.platforms.codechef}
                          onCheckedChange={() => togglePlatformFilter("codechef")}
                        />
                        <Label htmlFor="codechef" className="text-white/80">
                          CodeChef
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leetcode"
                          checked={filters.platforms.leetcode}
                          onCheckedChange={() => togglePlatformFilter("leetcode")}
                        />
                        <Label htmlFor="leetcode" className="text-white/80">
                          LeetCode
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Contest Status</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="upcoming"
                          checked={filters.showUpcoming}
                          onCheckedChange={() => setFilters({ ...filters, showUpcoming: !filters.showUpcoming })}
                        />
                        <Label htmlFor="upcoming" className="text-white/80">
                          Upcoming
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="past"
                          checked={filters.showPast}
                          onCheckedChange={() => setFilters({ ...filters, showPast: !filters.showPast })}
                        />
                        <Label htmlFor="past" className="text-white/80">
                          Past (Last Week)
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => setFilterDialogOpen(false)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              className="gap-1 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={fetchContests}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="inline">Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-4">
          <Menu
            setActive={setActiveTab}
            availablePlatforms={getAvailablePlatforms()}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            getPlatformIcon={getPlatformIcon}
          >
            <MenuItem setActive={setActiveTab} active={activeTab} item="all">
              All
            </MenuItem>
            <MenuItem setActive={setActiveTab} active={activeTab} item="ongoing">
              Ongoing
            </MenuItem>
            <MenuItem setActive={setActiveTab} active={activeTab} item="upcoming">
              Upcoming
            </MenuItem>
            <MenuItem setActive={setActiveTab} active={activeTab} item="past">
              Past
            </MenuItem>
            <MenuItem setActive={setActiveTab} active={activeTab} item="bookmarked">
              Saved
            </MenuItem>
          </Menu>
        </div>

        <ContestList
          contests={filteredContests}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          loading={loading}
          error={error}
          theme={theme}
          activeTab={activeTab}
          selectedPlatform={selectedPlatform}
        />
      </CardContent>
    </Card>
  )
}

interface ContestListProps {
  contests: Contest[]
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  loading: boolean
  error: string | null
  theme?: string | undefined
  activeTab?: string | null
  selectedPlatform?: string
  emptyMessage?: string
}

function ContestList({
  contests,
  bookmarks,
  toggleBookmark,
  loading,
  error,
  theme,
  activeTab,
  selectedPlatform = "all",
  emptyMessage,
}: ContestListProps) {
  // Set default empty message based on active tab
  const getEmptyMessage = () => {
    if (emptyMessage) return emptyMessage

    const platformText = selectedPlatform !== "all" ? ` for ${selectedPlatform}` : ""

    switch (activeTab) {
      case "bookmarked":
        return `No Bookmarked Contests${platformText}. Add Contests to your Bookmarks to See them Here.`
      case "ongoing":
        return `No Ongoing Contests${platformText} at the moment.`
      case "upcoming":
        return `No Upcoming Contests${platformText} found.`
      case "past":
        return `No Past Contests${platformText} found.`
      default:
        return `No Contests Found${platformText} Matching Your Filters.`
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 bg-white/20" />
                <Skeleton className="h-4 w-32 bg-white/20" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-6 w-24 bg-white/20" />
              <Skeleton className="h-6 w-24 bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Button
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (contests.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-white/70">{getEmptyMessage()}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2 -mx-1 px-1">
      {contests.map((contest) => (
        <ContestCard
          key={contest.id}
          contest={contest}
          isBookmarked={bookmarks.includes(contest.id)}
          toggleBookmark={toggleBookmark}
          theme={theme}
        />
      ))}
    </div>
  )
}

interface ContestCardProps {
  contest: Contest
  isBookmarked: boolean
  toggleBookmark: (id: string) => void
  theme?: string | undefined
}

function ContestCard({ contest, isBookmarked, toggleBookmark, theme }: ContestCardProps) {
  const isPast = isPastContest(contest)
  const isOngoing = isOngoingContest(contest)

  return (
    <div
      className={cn(
        "p-3 sm:p-4 rounded-lg transition-all backdrop-blur-sm border border-white/20",
        isOngoing ? "bg-white/15" : "bg-white/10",
        "hover:bg-white/20",
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={cn(
                "bg-gradient-to-r font-normal text-xs backdrop-blur-sm",
                getPlatformColor(contest.platform),
              )}
            >
              {getPlatformIcon(contest.platform)} {contest.platform}
            </Badge>
            {isOngoing && (
              <Badge
                variant="outline"
                className="bg-green-500/20 text-green-400 border-green-500/30 text-xs backdrop-blur-sm"
              >
                Live
              </Badge>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-medium mt-1 text-white line-clamp-2">{contest.name}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full p-1 h-auto backdrop-blur-sm",
            isBookmarked ? "text-yellow-400" : "text-white/60 hover:text-white",
          )}
          onClick={() => toggleBookmark(contest.id)}
        >
          <Bookmark className={cn("h-5 w-5", isBookmarked ? "fill-current" : "")} />
          <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Bookmark contest"}</span>
        </Button>
      </div>

      <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/80">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{formatDate(contest.startTime)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{formatDuration(contest.duration)}</span>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex justify-between items-center">
        <div>
          {!isPast && (
            <div className="text-xs sm:text-sm">
              <span className="text-white/70">{isOngoing ? "Ends in: " : "Starts in: "}</span>
              <span className={cn("font-medium", isOngoing ? "text-red-400" : "text-green-400")}>
                {getTimeRemaining(isOngoing ? contest.endTime : contest.startTime)}
              </span>
            </div>
          )}
        </div>
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Visit <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
