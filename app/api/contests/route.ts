import type { Contest } from "@/lib/types"
import { NextResponse } from "next/server"

// This would normally fetch from actual APIs, but for demo purposes we'll use mock data
export async function GET() {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

  // Generate some mock contests
  const contests: Contest[] = [
    // Past contests (within last week)
    {
      id: "cf-1",
      name: "Codeforces Round #835 (Div. 2)",
      platform: "codeforces",
      url: "https://codeforces.com/contests",
      startTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      duration: 120,
    },
    {
      id: "cc-1",
      name: "CodeChef Starters 68",
      platform: "codechef",
      url: "https://www.codechef.com/contests",
      startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      duration: 180,
    },
    {
      id: "lc-1",
      name: "LeetCode Weekly Contest 320",
      platform: "leetcode",
      url: "https://leetcode.com/contest/",
      startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
      duration: 90,
    },

    // Ongoing contests
    {
      id: "cf-2",
      name: "Codeforces Educational Round 150",
      platform: "codeforces",
      url: "https://codeforces.com/contests",
      startTime: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 1 * 60 * 60 * 1000),
      duration: 120,
    },

    // Upcoming contests
    {
      id: "lc-2",
      name: "LeetCode Biweekly Contest 95",
      platform: "leetcode",
      url: "https://leetcode.com/contest/",
      startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
      duration: 90,
    },
    {
      id: "cc-2",
      name: "CodeChef Long Challenge April",
      platform: "codechef",
      url: "https://www.codechef.com/contests",
      startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
      duration: 10 * 24 * 60,
    },
    {
      id: "cf-3",
      name: "Codeforces Round #836 (Div. 1)",
      platform: "codeforces",
      url: "https://codeforces.com/contests",
      startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      duration: 120,
    },
    {
      id: "lc-3",
      name: "LeetCode Weekly Contest 321",
      platform: "leetcode",
      url: "https://leetcode.com/contest/",
      startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
      duration: 90,
    },
    {
      id: "cc-3",
      name: "CodeChef Starters 69",
      platform: "codechef",
      url: "https://www.codechef.com/contests",
      startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      duration: 180,
    },
    {
      id: "cf-4",
      name: "Codeforces Round #837 (Div. 2)",
      platform: "codeforces",
      url: "https://codeforces.com/contests",
      startTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      duration: 120,
    },
  ]

  return NextResponse.json(contests)
}
