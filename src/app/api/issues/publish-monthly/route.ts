import { NextResponse } from "next/server";
import { publishMonthlyIssue, ExtendedMagazineIssue } from "@/lib/serverStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      volume,
      issue,
      title,
      theme,
      date,
      pageCount,
      coverImage,
      issuuUrl,
      issuuEmbedUrl,
      features,
      editorNote,
      autoArchivePrevious = true,
      setAsCurrent = true,
    } = body;

    if (!volume || !issue || !title) {
      return NextResponse.json(
        { success: false, error: "Volume, Issue number, and Title are required." },
        { status: 400 }
      );
    }

    const newIssue: ExtendedMagazineIssue = {
      volume: Number(volume),
      issue: Number(issue),
      title: title || `Volume ${volume} Issue ${issue}`,
      theme: theme || "Monthly Feature Showcase",
      date: date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      pageCount: Number(pageCount) || 76,
      coverImage: coverImage || "/images/hero_golf_championship.jpg",
      issuuUrl: issuuUrl || "https://issuu.com/editorinchief",
      issuuEmbedUrl: issuuEmbedUrl || "",
      features: Array.isArray(features) && features.length > 0 ? features : ["New Monthly Features"],
      editorNote: editorNote || "",
      isCurrent: setAsCurrent,
      status: setAsCurrent ? "current" : "archived",
      createdAt: new Date().toISOString(),
    };

    const result = await publishMonthlyIssue(newIssue, autoArchivePrevious);
    return NextResponse.json({
      success: true,
      message: `🎉 Published Volume ${volume} Issue ${issue} (${newIssue.date}) as the New Active Edition! Previous edition was safely archived.`,
      issue: newIssue,
      data: result.data,
    });
  } catch (error: any) {
    console.error("Error in monthly publication:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to publish monthly issue" },
      { status: 500 }
    );
  }
}
