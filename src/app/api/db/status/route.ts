import { NextResponse } from "next/server";
import { getNeonSql, isNeonConfigured, initNeonTables } from "@/lib/neonDb";

export async function GET() {
  if (!isNeonConfigured()) {
    return NextResponse.json({
      connected: false,
      provider: "local_json",
      message: "Neon PostgreSQL is not configured. Using local JSON store.",
    });
  }

  const sql = getNeonSql();
  if (!sql) {
    return NextResponse.json({
      connected: false,
      provider: "local_json",
      message: "Invalid DATABASE_URL configuration.",
    });
  }

  try {
    const timeResult = await sql`SELECT NOW() as current_time, current_database() as db_name;`;
    const initResult = await initNeonTables();
    const countResult = await sql`SELECT count(*)::int as issue_count FROM magazine_issues;`;

    return NextResponse.json({
      connected: true,
      provider: "neon_postgresql",
      database: timeResult[0]?.db_name,
      serverTime: timeResult[0]?.current_time,
      issueCount: countResult[0]?.issue_count,
      migration: initResult.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        provider: "neon_postgresql_error",
        error: error?.message || "Failed to connect to Neon PostgreSQL.",
      },
      { status: 500 }
    );
  }
}
