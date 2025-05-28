import type { Contest } from "./types"

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) {
    return `${mins}m`
  } else if (mins === 0) {
    return `${hours}h`
  } else {
    return `${hours}h ${mins}m`
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function getTimeRemaining(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()

  if (diff <= 0) {
    return "Started"
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}d ${hours}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

export function isPastContest(contest: Contest): boolean {
  return new Date() > contest.endTime
}

export function isRecentPastContest(contest: Contest): boolean {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return contest.endTime < now && contest.endTime > oneWeekAgo
}

export function isUpcomingContest(contest: Contest): boolean {
  return new Date() < contest.startTime
}

export function isOngoingContest(contest: Contest): boolean {
  const now = new Date()
  return now >= contest.startTime && now <= contest.endTime
}

export function filterContests(
  contests: Contest[],
  filters: { platforms: Record<string, boolean>; showPast: boolean; showUpcoming: boolean },
): Contest[] {
  return contests.filter((contest) => {
    // Filter by platform
    if (!filters.platforms[contest.platform]) {
      return false
    }

    // Filter by status
    if (isPastContest(contest) && !isRecentPastContest(contest)) {
      return false
    }

    if (isPastContest(contest) && !filters.showPast) {
      return false
    }

    if (isUpcomingContest(contest) && !filters.showUpcoming) {
      return false
    }

    return true
  })
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case "codeforces":
      return "from-blue-500 to-indigo-600"
    case "codechef":
      return "from-green-500 to-emerald-600"
    case "leetcode":
      return "from-yellow-500 to-amber-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

export function getPlatformIcon(platform: string): string {
  switch (platform) {
    case "codeforces":
      return "🏆"
    case "codechef":
      return "👨‍🍳"
    case "leetcode":
      return "💻"
    default:
      return "🔍"
  }
}
