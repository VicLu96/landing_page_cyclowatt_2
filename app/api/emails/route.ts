import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const EMAILS_DIR = path.join(process.cwd(), "data")
const EMAILS_FILE = path.join(EMAILS_DIR, "analytics.json")

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] ===== EMAIL API CALLED =====")
    console.log("[v0] CURRENT WORKING DIRECTORY:", process.cwd())
    console.log("[v0] EMAILS_DIR:", EMAILS_DIR)
    console.log("[v0] EMAILS_FILE:", EMAILS_FILE)
    console.log("[v0] File exists before processing:", existsSync(EMAILS_FILE))

    const requestBody = await request.json()
    console.log("[v0] FULL REQUEST BODY:", JSON.stringify(requestBody, null, 2))

    const { email, timeSpentSeconds } = requestBody

    console.log("[v0] Extracted email:", email)
    console.log("[v0] Extracted timeSpentSeconds:", timeSpentSeconds, "type:", typeof timeSpentSeconds)
    console.log("[v0] timeSpentSeconds is valid number:", !isNaN(Number(timeSpentSeconds)))

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    console.log("[v0] Checking if directory exists:", EMAILS_DIR, "exists:", existsSync(EMAILS_DIR))
    if (!existsSync(EMAILS_DIR)) {
      await mkdir(EMAILS_DIR, { recursive: true })
      console.log("[v0] Created directory:", EMAILS_DIR)
    }

    let emails = []
    console.log("[v0] Checking if file exists:", EMAILS_FILE, "exists:", existsSync(EMAILS_FILE))
    if (existsSync(EMAILS_FILE)) {
      try {
        const fileContent = await readFile(EMAILS_FILE, "utf-8")
        emails = JSON.parse(fileContent)
        console.log("[v0] Loaded", emails.length, "existing emails")
        console.log("[v0] Sample of existing data:", emails.slice(-2))
      } catch (parseError) {
        console.log("[v0] Starting with fresh file due to parse error:", parseError)
        emails = []
      }
    }

    const timeSeconds = Number(timeSpentSeconds) || 0
    const timeMinutes = timeSeconds > 0 ? Math.round((timeSeconds / 60) * 10) / 10 : 0

    console.log("[v0] Time conversion - original:", timeSpentSeconds, "converted:", timeSeconds)
    console.log("[v0] Time validation - seconds > 0:", timeSeconds > 0, "minutes calculated:", timeMinutes)

    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
      timeSpentSeconds: timeSeconds,
      timeSpentMinutes: timeMinutes,
    }

    console.log("[v0] ===== NEW ENTRY CREATED =====")
    console.log("[v0] NEW ENTRY:", JSON.stringify(newEntry, null, 2))
    console.log("[v0] Entry has timeSpentSeconds:", "timeSpentSeconds" in newEntry)
    console.log("[v0] Entry has timeSpentMinutes:", "timeSpentMinutes" in newEntry)
    console.log("[v0] timeSpentSeconds value:", newEntry.timeSpentSeconds)
    console.log("[v0] timeSpentMinutes value:", newEntry.timeSpentMinutes)

    emails.push(newEntry)

    const jsonData = JSON.stringify(emails, null, 2)
    console.log("[v0] ===== WRITING TO FILE =====")
    console.log("[v0] Writing to file:", EMAILS_FILE)
    console.log("[v0] Data being written (last entry):", JSON.stringify(emails[emails.length - 1], null, 2))

    await writeFile(EMAILS_FILE, jsonData, { encoding: "utf-8" })

    console.log("[v0] ===== FILE WRITTEN SUCCESSFULLY =====")
    console.log("[v0] FILE PATH:", EMAILS_FILE)
    console.log("[v0] TOTAL ENTRIES NOW:", emails.length)

    try {
      const savedContent = await readFile(EMAILS_FILE, "utf-8")
      const savedData = JSON.parse(savedContent)
      const lastSaved = savedData[savedData.length - 1]

      console.log("[v0] ===== VERIFICATION =====")
      console.log("[v0] File read back successfully")
      console.log("[v0] Total entries in file:", savedData.length)
      console.log("[v0] Last saved entry:", JSON.stringify(lastSaved, null, 2))
      console.log("[v0] Last entry has email:", "email" in lastSaved)
      console.log("[v0] Last entry has timestamp:", "timestamp" in lastSaved)
      console.log("[v0] Last entry has timeSpentSeconds:", "timeSpentSeconds" in lastSaved)
      console.log("[v0] Last entry has timeSpentMinutes:", "timeSpentMinutes" in lastSaved)
      console.log("[v0] timeSpentSeconds value in file:", lastSaved.timeSpentSeconds)
      console.log("[v0] timeSpentMinutes value in file:", lastSaved.timeSpentMinutes)
    } catch (verifyError) {
      console.log("[v0] ERROR during verification:", verifyError)
    }

    return NextResponse.json({
      success: true,
      message: "Email saved successfully",
      filePath: EMAILS_FILE,
      timeSpent: `${timeSeconds}s (${timeMinutes}m)`,
      debug: {
        timeSpentSeconds: timeSeconds,
        timeSpentMinutes: timeMinutes,
        hasTimeData: timeSeconds > 0,
      },
    })
  } catch (error) {
    console.error("[v0] ===== ERROR =====", error)
    return NextResponse.json(
      { error: "Failed to save email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
