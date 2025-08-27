export const dynamic = "force-static";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    moodData: [],
    journalEntries: [],
    cbtExercises: [],
    currentMood: 4,
    stressLevel: 3,
    anxietyLevel: 2
  });
}