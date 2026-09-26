import fs from "fs/promises";
import path from "path";
import {
  SITE_INFO,
  CURRENT_EDITION,
  EXACT_ISSUES,
  ARTICLES,
  STAFF_MEMBERS,
  ADVERTISING_PACKAGES,
  Article,
} from "../data/editorialData";
import {
  ExtendedMagazineIssue,
  SiteInfoData,
  CurrentEditionData,
  ThemeSettingsData,
  DEFAULT_THEME_SETTINGS,
  MagazineStoreData,
} from "./types";
import { getNeonSql, isNeonConfigured, initNeonTables } from "./neonDb";

export * from "./types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "magazine-data.json");

export function getDefaultData(): MagazineStoreData {
  const issuesWithStatus: ExtendedMagazineIssue[] = EXACT_ISSUES.map((issue, index) => ({
    ...issue,
    isCurrent: index === 0,
    status: index === 0 ? "current" : "archived",
  }));

  return {
    siteInfo: { ...SITE_INFO },
    currentEdition: { ...CURRENT_EDITION },
    themeSettings: { ...DEFAULT_THEME_SETTINGS },
    issues: issuesWithStatus,
    articles: [...ARTICLES],
    staff: [...STAFF_MEMBERS],
    advertisingPackages: [...ADVERTISING_PACKAGES],
    lastUpdated: new Date().toISOString(),
  };
}

export async function getStoreData(): Promise<MagazineStoreData> {
  // 1. Try Neon PostgreSQL if configured
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await initNeonTables();

        const dbIssues = await sql`
          SELECT 
            volume,
            issue,
            title,
            theme,
            date,
            page_count as "pageCount",
            cover_image as "coverImage",
            issuu_url as "issuuUrl",
            issuu_embed_url as "issuuEmbedUrl",
            features,
            editor_note as "editorNote",
            is_current as "isCurrent",
            status
          FROM magazine_issues
          ORDER BY volume DESC, issue DESC;
        `;

        const dbSiteInfo = await sql`SELECT * FROM site_info LIMIT 1;`;
        const dbTheme = await sql`SELECT settings FROM theme_settings LIMIT 1;`;

        if (dbIssues && dbIssues.length > 0) {
          const currentIss = dbIssues.find((i: any) => i.isCurrent) || dbIssues[0];
          const fileFallback = await getFileStoreData();

          return {
            siteInfo: {
              ...fileFallback.siteInfo,
              volume: currentIss.volume,
              activeIssue: currentIss.issue,
              season: currentIss.theme || currentIss.date,
              phone: dbSiteInfo[0]?.phone || fileFallback.siteInfo.phone,
              email: dbSiteInfo[0]?.email || fileFallback.siteInfo.email,
              location: dbSiteInfo[0]?.address || fileFallback.siteInfo.location,
            },
            currentEdition: {
              ...fileFallback.currentEdition,
              volume: currentIss.volume,
              issue: currentIss.issue,
              season: currentIss.theme || currentIss.date,
              conditions: dbSiteInfo[0]?.turf_variety || fileFallback.currentEdition.conditions,
              temperature: dbSiteInfo[0]?.green_speed || fileFallback.currentEdition.temperature,
              location: dbSiteInfo[0]?.weather_location || fileFallback.currentEdition.location,
            },
            themeSettings: (dbTheme[0]?.settings as ThemeSettingsData) || fileFallback.themeSettings || DEFAULT_THEME_SETTINGS,
            issues: dbIssues as unknown as ExtendedMagazineIssue[],
            articles: fileFallback.articles,
            staff: fileFallback.staff,
            advertisingPackages: fileFallback.advertisingPackages,
            lastUpdated: new Date().toISOString(),
          };
        }
      } catch (neonErr) {
        console.warn("Neon query failed, falling back to local store:", neonErr);
      }
    }
  }

  // 2. Fallback to Local JSON store
  return getFileStoreData();
}

async function getFileStoreData(): Promise<MagazineStoreData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    return data as MagazineStoreData;
  } catch {
    const defaultData = getDefaultData();
    await saveFileStoreData(defaultData);
    return defaultData;
  }
}

async function saveFileStoreData(data: MagazineStoreData): Promise<void> {
  data.lastUpdated = new Date().toISOString();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function saveStoreData(data: MagazineStoreData): Promise<void> {
  // Always update local file
  await saveFileStoreData(data);
}

export async function publishMonthlyIssue(
  newIssue: ExtendedMagazineIssue,
  autoArchivePrevious: boolean = true
): Promise<{ success: boolean; data: MagazineStoreData; message: string }> {
  // 1. If Neon is connected, execute SQL update
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await initNeonTables();

        if (autoArchivePrevious || newIssue.isCurrent) {
          await sql`
            UPDATE magazine_issues 
            SET is_current = false, status = 'archived', updated_at = NOW()
            WHERE is_current = true;
          `;
        }

        await sql`
          INSERT INTO magazine_issues (
            volume, issue, title, theme, date, page_count, cover_image,
            issuu_url, issuu_embed_url, features, editor_note, is_current, status, updated_at
          ) VALUES (
            ${newIssue.volume},
            ${newIssue.issue},
            ${newIssue.title},
            ${newIssue.theme || ""},
            ${newIssue.date},
            ${newIssue.pageCount || 68},
            ${newIssue.coverImage},
            ${newIssue.issuuUrl || ""},
            ${newIssue.issuuEmbedUrl || ""},
            ${JSON.stringify(newIssue.features || [])}::jsonb,
            ${newIssue.editorNote || ""},
            ${true},
            ${"current"},
            NOW()
          )
          ON CONFLICT (volume, issue) DO UPDATE SET
            title = EXCLUDED.title,
            theme = EXCLUDED.theme,
            date = EXCLUDED.date,
            page_count = EXCLUDED.page_count,
            cover_image = EXCLUDED.cover_image,
            issuu_url = EXCLUDED.issuu_url,
            issuu_embed_url = EXCLUDED.issuu_embed_url,
            features = EXCLUDED.features,
            editor_note = EXCLUDED.editor_note,
            is_current = true,
            status = 'current',
            updated_at = NOW();
        `;
      } catch (err) {
        console.error("Neon publishMonthlyIssue error:", err);
      }
    }
  }

  // 2. Also keep local JSON in sync
  const store = await getFileStoreData();

  if (autoArchivePrevious || newIssue.isCurrent) {
    store.issues = store.issues.map((iss) => {
      if (iss.isCurrent || (iss.volume === newIssue.volume && iss.issue === newIssue.issue)) {
        return {
          ...iss,
          isCurrent: false,
          status: "archived",
          archivedAt: iss.isCurrent ? new Date().toISOString() : iss.archivedAt,
        };
      }
      return iss;
    });
    newIssue.isCurrent = true;
    newIssue.status = "current";
  }

  store.issues = store.issues.filter(
    (iss) => !(iss.volume === newIssue.volume && iss.issue === newIssue.issue)
  );

  store.issues.unshift({
    ...newIssue,
    createdAt: newIssue.createdAt || new Date().toISOString(),
  });

  store.issues.sort((a, b) => {
    if (b.volume !== a.volume) return b.volume - a.volume;
    return b.issue - a.issue;
  });

  if (newIssue.isCurrent) {
    store.siteInfo.volume = newIssue.volume;
    store.siteInfo.activeIssue = newIssue.issue;
    store.siteInfo.season = newIssue.theme;
    store.currentEdition.volume = newIssue.volume;
    store.currentEdition.issue = newIssue.issue;
    store.currentEdition.season = newIssue.theme;
  }

  await saveFileStoreData(store);

  const finalStore = await getStoreData();

  return {
    success: true,
    data: finalStore,
    message: `Successfully published Volume ${newIssue.volume} Issue ${newIssue.issue} (${newIssue.title})!`,
  };
}

export async function setIssueStatus(
  volume: number,
  issue: number,
  status: "current" | "archived" | "draft"
): Promise<MagazineStoreData> {
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        if (status === "current") {
          await sql`UPDATE magazine_issues SET is_current = false, status = 'archived' WHERE is_current = true;`;
          await sql`UPDATE magazine_issues SET is_current = true, status = 'current' WHERE volume = ${volume} AND issue = ${issue};`;
        } else {
          await sql`UPDATE magazine_issues SET is_current = false, status = ${status} WHERE volume = ${volume} AND issue = ${issue};`;
        }
      } catch (err) {
        console.error("Neon setIssueStatus error:", err);
      }
    }
  }

  const store = await getFileStoreData();
  if (status === "current") {
    store.issues = store.issues.map((iss) => {
      if (iss.volume === volume && iss.issue === issue) {
        return { ...iss, isCurrent: true, status: "current" };
      }
      return {
        ...iss,
        isCurrent: false,
        status: iss.status === "draft" ? "draft" : "archived",
        archivedAt: iss.isCurrent ? new Date().toISOString() : iss.archivedAt,
      };
    });

    const active = store.issues.find((i) => i.volume === volume && i.issue === issue);
    if (active) {
      store.siteInfo.volume = active.volume;
      store.siteInfo.activeIssue = active.issue;
      store.siteInfo.season = active.theme;
      store.currentEdition.volume = active.volume;
      store.currentEdition.issue = active.issue;
      store.currentEdition.season = active.theme;
    }
  } else {
    store.issues = store.issues.map((iss) => {
      if (iss.volume === volume && iss.issue === issue) {
        return {
          ...iss,
          isCurrent: false,
          status,
          archivedAt: status === "archived" ? new Date().toISOString() : undefined,
        };
      }
      return iss;
    });
  }

  await saveFileStoreData(store);
  return getStoreData();
}

export async function deleteIssue(volume: number, issue: number): Promise<MagazineStoreData> {
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await sql`DELETE FROM magazine_issues WHERE volume = ${volume} AND issue = ${issue};`;
      } catch (err) {
        console.error("Neon deleteIssue error:", err);
      }
    }
  }

  const store = await getFileStoreData();
  store.issues = store.issues.filter((iss) => !(iss.volume === volume && iss.issue === issue));

  const hasCurrent = store.issues.some((i) => i.isCurrent);
  if (!hasCurrent && store.issues.length > 0) {
    store.issues[0].isCurrent = true;
    store.issues[0].status = "current";
    store.siteInfo.volume = store.issues[0].volume;
    store.siteInfo.activeIssue = store.issues[0].issue;
    store.siteInfo.season = store.issues[0].theme;
    store.currentEdition.volume = store.issues[0].volume;
    store.currentEdition.issue = store.issues[0].issue;
    store.currentEdition.season = store.issues[0].theme;
  }

  await saveFileStoreData(store);
  return getStoreData();
}

export async function saveArticle(article: Article): Promise<MagazineStoreData> {
  const store = await getFileStoreData();
  const existingIndex = store.articles.findIndex((a) => a.id === article.id);

  if (existingIndex >= 0) {
    store.articles[existingIndex] = article;
  } else {
    store.articles.unshift(article);
  }

  if (article.leadStory) {
    store.articles = store.articles.map((a) => ({
      ...a,
      leadStory: a.id === article.id,
    }));
  }

  await saveFileStoreData(store);
  return getStoreData();
}

export async function deleteArticle(articleId: string): Promise<MagazineStoreData> {
  const store = await getFileStoreData();
  store.articles = store.articles.filter((a) => a.id !== articleId);
  await saveFileStoreData(store);
  return getStoreData();
}

export async function updateSiteSettings(
  siteInfo: Partial<SiteInfoData>,
  currentEdition: Partial<CurrentEditionData>
): Promise<MagazineStoreData> {
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await sql`
          UPDATE site_info SET
            phone = COALESCE(${siteInfo.phone || null}, phone),
            email = COALESCE(${siteInfo.email || null}, email),
            address = COALESCE(${siteInfo.location || null}, address),
            turf_variety = COALESCE(${currentEdition.conditions || null}, turf_variety),
            green_speed = COALESCE(${currentEdition.temperature || null}, green_speed),
            weather_location = COALESCE(${currentEdition.location || null}, weather_location),
            updated_at = NOW();
        `;
      } catch (err) {
        console.error("Neon updateSiteSettings error:", err);
      }
    }
  }

  const store = await getFileStoreData();
  store.siteInfo = { ...store.siteInfo, ...siteInfo };
  store.currentEdition = { ...store.currentEdition, ...currentEdition };
  await saveFileStoreData(store);
  return getStoreData();
}

export async function updateThemeSettings(
  theme: Partial<ThemeSettingsData>
): Promise<MagazineStoreData> {
  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await sql`UPDATE theme_settings SET settings = ${JSON.stringify(theme)}::jsonb, updated_at = NOW();`;
      } catch (err) {
        console.error("Neon updateThemeSettings error:", err);
      }
    }
  }

  const store = await getFileStoreData();
  store.themeSettings = {
    ...(store.themeSettings || DEFAULT_THEME_SETTINGS),
    ...theme,
  };
  await saveFileStoreData(store);
  return getStoreData();
}

export async function resetToDefaults(): Promise<MagazineStoreData> {
  const defaultData = getDefaultData();
  await saveFileStoreData(defaultData);
  return defaultData;
}

export async function importData(importedData: MagazineStoreData): Promise<MagazineStoreData> {
  if (!importedData.issues || !Array.isArray(importedData.issues)) {
    throw new Error("Invalid magazine data format: issues array missing.");
  }
  await saveFileStoreData(importedData);
  return importedData;
}
