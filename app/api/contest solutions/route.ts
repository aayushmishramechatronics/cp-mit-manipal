import type { Contest } from "@/lib/types"
import { findContestSolutions } from "@/lib/youtube-service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { contest } = await request.json()

    // Convert string dates back to Date objects
    const processedContest: Contest = {
      ...contest,
      startTime: new Date(contest.startTime),
      endTime: new Date(contest.endTime),
    }

    const solutions = await findContestSolutions(processedContest)

    return NextResponse.json({ solutions })
  } catch (error) {
    console.error("Error fetching contest solutions:", error)
    return NextResponse.json({ error: "Failed to fetch solutions" }, { status: 500 })
  }
}
