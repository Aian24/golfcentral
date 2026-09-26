import { NextResponse } from "next/server";
import { getStoreData, updateSiteSettings } from "@/lib/serverStore";

export async function GET() {
  try {
    const store = await getStoreData();
    return NextResponse.json({
      success: true,
      siteInfo: store.siteInfo,
      currentEdition: store.currentEdition,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get site info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { siteInfo = {}, currentEdition = {} } = body;

    const data = await updateSiteSettings(siteInfo, currentEdition);
    return NextResponse.json({
      success: true,
      message: "Site settings and edition info updated successfully",
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update site info" },
      { status: 500 }
    );
  }
}
