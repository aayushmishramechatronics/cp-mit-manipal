export interface Contest {
  id: string
  name: string
  platform: "codeforces" | "codechef" | "leetcode"
  url: string
  startTime: Date
  endTime: Date
  duration: number // in minutes
}

export interface ContestFilters {
  platforms: {
    codeforces: boolean
    codechef: boolean
    leetcode: boolean
  }
  showPast: boolean
  showUpcoming: boolean
}
