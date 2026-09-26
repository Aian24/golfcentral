import { NextResponse } from "next/server";
import {
  getStoreData,
  publishMonthlyIssue,
  setIssueStatus,
  deleteIssue,
  ExtendedMagazineIssue,
} from "@/lib/serverStore";

export async function GET() {
  try {
    const store = await getStoreData();
    return NextResponse.json({
      success: true,
      issues: store.issues,
      currentEdition: store.currentEdition,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const issueData: ExtendedMagazineIssue = await request.json();
    if (!issueData.volume || !issueData.issue || !issueData.title) {
      return NextResponse.json(
        { success: false, error: "Volume, Issue number, and Title are required" },
        { status: 400 }
      );
    }

    const autoArchive = issueData.isCurrent !== false;
    const result = await publishMonthlyIssue(issueData, autoArchive);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save issue" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { volume, issue, status, action } = body;

    if (!volume || !issue) {
      return NextResponse.json(
        { success: false, error: "Volume and Issue number are required" },
        { status: 400 }
      );
    }

    if (action === "setStatus" && status) {
      const data = await setIssueStatus(volume, issue, status);
      return NextResponse.json({
        success: true,
        message: `Updated Volume ${volume} Issue ${issue} status to ${status}`,
        data,
      });
    }

    if (action === "setLive") {
      const data = await setIssueStatus(volume, issue, "current");
      return NextResponse.json({
        success: true,
        message: `Volume ${volume} Issue ${issue} is now the Live Current Edition`,
        data,
      });
    }

    if (action === "archive") {
      const data = await setIssueStatus(volume, issue, "archived");
      return NextResponse.json({
        success: true,
        message: `Volume ${volume} Issue ${issue} has been moved to Archive`,
        data,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update issue status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const volume = parseInt(searchParams.get("volume") || "0", 10);
    const issue = parseInt(searchParams.get("issue") || "0", 10);

    if (!volume || !issue) {
      return NextResponse.json(
        { success: false, error: "Volume and Issue number required" },
        { status: 400 }
      );
    }

    const data = await deleteIssue(volume, issue);
    return NextResponse.json({
      success: true,
      message: `Deleted Volume ${volume} Issue ${issue}`,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete issue" },
      { status: 500 }
    );
  }
}
