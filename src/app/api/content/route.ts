import { NextResponse } from "next/server";
import { getStoreData, resetToDefaults, importData } from "@/lib/serverStore";

export async function GET() {
  try {
    const data = await getStoreData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error getting store data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch magazine content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.action === "reset") {
      const data = await resetToDefaults();
      return NextResponse.json({
        success: true,
        message: "Data reset to defaults.",
        data,
      });
    }

    if (body.action === "import" && body.importData) {
      const data = await importData(body.importData);
      return NextResponse.json({
        success: true,
        message: "Magazine data imported.",
        data,
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process content update" },
      { status: 500 }
    );
  }
}
