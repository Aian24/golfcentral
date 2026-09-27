/**
 * Issuu URL & Embed Helper
 * Converts any standard Issuu document link or embed code into a valid,
 * iframe-embeddable reader URL and public publication URL.
 */

export function formatIssuuEmbedUrl(
  inputUrl?: string | null,
  fallbackEmbedUrl?: string | null
): string {
  const primary = (inputUrl || "").trim();
  const fallback = (fallbackEmbedUrl || "").trim();

  // If already an official e.issuu.com embed, return as-is
  if (primary.includes("e.issuu.com/embed.html") || primary.includes("e.issuu.com/anonymous-embed.html")) {
    return primary;
  }

  // Parse pattern: issuu.com/{username}/docs/{documentSlug}
  const primaryMatch = primary.match(/issuu\.com\/([^/]+)\/docs\/([^/?#]+)/i);
  if (primaryMatch) {
    const username = primaryMatch[1];
    const docSlug = primaryMatch[2];
    return `https://e.issuu.com/embed.html?d=${docSlug}&u=${username}`;
  }

  // Check fallback if primary didn't match
  if (fallback) {
    if (fallback.includes("e.issuu.com/embed.html") || fallback.includes("e.issuu.com/anonymous-embed.html")) {
      return fallback;
    }
    const fallbackMatch = fallback.match(/issuu\.com\/([^/]+)\/docs\/([^/?#]+)/i);
    if (fallbackMatch) {
      const username = fallbackMatch[1];
      const docSlug = fallbackMatch[2];
      return `https://e.issuu.com/embed.html?d=${docSlug}&u=${username}`;
    }
  }

  // Default fallback for Golf Central Magazine
  return "https://e.issuu.com/embed.html?d=golf_central_magazine_vol_27_issue_6_ezine&u=editorinchief";
}

export function formatIssuuPublicUrl(
  inputUrl?: string | null,
  fallbackUrl?: string | null
): string {
  const url = (inputUrl || fallbackUrl || "").trim();
  if (!url) return "https://issuu.com/editorinchief/docs/golf_central_magazine_vol_27_issue_6_ezine";

  // If it's an embed URL like e.issuu.com/embed.html?d=doc&u=user, extract public url
  if (url.includes("e.issuu.com")) {
    try {
      const parsed = new URL(url);
      const d = parsed.searchParams.get("d");
      const u = parsed.searchParams.get("u") || "editorinchief";
      if (d) {
        return `https://issuu.com/${u}/docs/${d}`;
      }
    } catch {
      // ignore
    }
  }

  return url;
}
