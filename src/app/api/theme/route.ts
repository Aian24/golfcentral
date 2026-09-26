import { NextResponse } from "next/server";
import { getStoreData, updateThemeSettings, DEFAULT_THEME_SETTINGS } from "@/lib/serverStore";

export async function GET() {
  try {
    const store = await getStoreData();
    return NextResponse.json({
      success: true,
      theme: store.themeSettings || DEFAULT_THEME_SETTINGS,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get theme settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { theme = {} } = body;

    const data = await updateThemeSettings(theme);
    return NextResponse.json({
      success: true,
      message: "Theme and visual customizations applied successfully",
      theme: data.themeSettings,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update theme" },
      { status: 500 }
    );
  }
}
