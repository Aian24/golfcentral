import { neon } from "@neondatabase/serverless";
import { MagazineStoreData, ExtendedMagazineIssue } from "./types";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "magazine-data.json");

export function getNeonSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  return neon(connectionString);
}

export function isNeonConfigured(): boolean {
  return !!process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("postgres");
}

/**
 * Automatically creates all tables in Neon PostgreSQL if they don't exist yet,
 * and seeds them with the initial magazine data if empty.
 */
export async function initNeonTables(): Promise<{ success: boolean; message: string }> {
  const sql = getNeonSql();
  if (!sql) {
    return { success: false, message: "DATABASE_URL environment variable is not set." };
  }

  try {
    // 1. Create Issues Table
    await sql`
      CREATE TABLE IF NOT EXISTS magazine_issues (
        id SERIAL PRIMARY KEY,
        volume INTEGER NOT NULL,
        issue INTEGER NOT NULL,
        title TEXT NOT NULL,
        theme TEXT DEFAULT '',
        date TEXT NOT NULL,
        page_count INTEGER DEFAULT 68,
        cover_image TEXT NOT NULL,
        issuu_url TEXT DEFAULT '',
        issuu_embed_url TEXT DEFAULT '',
        features JSONB DEFAULT '[]'::jsonb,
        editor_note TEXT DEFAULT '',
        is_current BOOLEAN DEFAULT false,
        status TEXT DEFAULT 'archived',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(volume, issue)
      );
    `;

    // 2. Create Site Info Table
    await sql`
      CREATE TABLE IF NOT EXISTS site_info (
        id SERIAL PRIMARY KEY,
        phone TEXT DEFAULT '',
        email TEXT DEFAULT '',
        address TEXT DEFAULT '',
        turf_variety TEXT DEFAULT 'TifEagle Bermuda Grass',
        green_speed TEXT DEFAULT 'Stimpmeter 11.5',
        weather_location TEXT DEFAULT 'Lake Wales, FL 78°F Sunny',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Create Theme Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS theme_settings (
        id SERIAL PRIMARY KEY,
        settings JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if issues table needs initial seed data
    const existingIssues = await sql`SELECT count(*)::int as count FROM magazine_issues;`;
    if (existingIssues[0]?.count === 0) {
      try {
        const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const json: MagazineStoreData = JSON.parse(raw);

        for (const iss of json.issues) {
          await sql`
            INSERT INTO magazine_issues (
              volume, issue, title, theme, date, page_count, cover_image,
              issuu_url, issuu_embed_url, features, editor_note, is_current, status
            ) VALUES (
              ${iss.volume},
              ${iss.issue},
              ${iss.title},
              ${iss.theme || ""},
              ${iss.date},
              ${iss.pageCount || 68},
              ${iss.coverImage},
              ${iss.issuuUrl || ""},
              ${iss.issuuEmbedUrl || ""},
              ${JSON.stringify(iss.features || [])}::jsonb,
              ${iss.editorNote || ""},
              ${iss.isCurrent},
              ${iss.status}
            )
            ON CONFLICT (volume, issue) DO NOTHING;
          `;
        }

        // Seed site info
        await sql`
          INSERT INTO site_info (phone, email, address, turf_variety, green_speed, weather_location)
          VALUES (
            ${json.siteInfo.phone || ""},
            ${json.siteInfo.email || ""},
            ${json.siteInfo.location || ""},
            ${json.currentEdition.conditions || ""},
            ${json.currentEdition.temperature || ""},
            ${json.currentEdition.location || ""}
          );
        `;

        // Seed theme settings
        await sql`
          INSERT INTO theme_settings (settings)
          VALUES (${JSON.stringify(json.themeSettings)}::jsonb);
        `;
      } catch (err) {
        console.warn("Could not seed Neon from JSON file:", err);
      }
    }

    return { success: true, message: "Neon tables initialized and verified successfully." };
  } catch (error: any) {
    console.error("Neon initialization error:", error);
    return { success: false, message: error?.message || "Failed to initialize Neon tables." };
  }
}
