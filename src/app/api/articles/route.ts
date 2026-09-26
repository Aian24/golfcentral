import { NextResponse } from "next/server";
import { getStoreData, saveArticle, deleteArticle } from "@/lib/serverStore";
import { Article } from "@/data/editorialData";

export async function GET() {
  try {
    const store = await getStoreData();
    return NextResponse.json({
      success: true,
      articles: store.articles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const article: Article = await request.json();
    if (!article.title || !article.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    if (!article.id) {
      article.id = `art-${Date.now()}`;
    }

    const data = await saveArticle(article);
    return NextResponse.json({
      success: true,
      message: `Article "${article.title}" saved successfully`,
      data,
      article,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save article" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Article ID is required" },
        { status: 400 }
      );
    }

    const data = await deleteArticle(id);
    return NextResponse.json({
      success: true,
      message: `Article deleted successfully`,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
