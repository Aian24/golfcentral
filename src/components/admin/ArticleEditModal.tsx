"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Save,
  Upload,
  FileText,
  Sparkles,
  AlertCircle,
  Star,
  Flame,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";
import { Article } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

interface ArticleEditModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

const CATEGORIES: Article["category"][] = [
  "Course Architecture & Turf",
  "Luxury Travel & Resorts",
  "Tour & Competition",
  "Lifestyle & Gear",
  "Philanthropy & Military",
];

export const ArticleEditModal: React.FC<ArticleEditModalProps> = ({
  article,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { saveArticle, deleteArticle } = useEditorialData();

  const [formData, setFormData] = useState<Article>({
    id: `art-${Date.now()}`,
    slug: "",
    title: "",
    subtitle: "",
    category: "Course Architecture & Turf",
    departmentTag: "COVER STORY // ARCHITECTURE",
    author: { name: "Terrie Purdum", role: "Publisher & Founder" },
    publishedDate: "June 2024",
    readTime: "5 min read",
    coverImage: "/images/hero_golf_championship.jpg",
    imageCaption: "",
    excerpt: "",
    leadStory: false,
    trending: false,
    featured: true,
    content: {
      paragraphs: [""],
      pullQuote: { quote: "", attribution: "" },
      subheading: "",
      secondaryParagraphs: [""],
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (article) {
      setFormData({ ...article });
    } else {
      setFormData({
        id: `art-${Date.now()}`,
        slug: "",
        title: "",
        subtitle: "",
        category: "Course Architecture & Turf",
        departmentTag: "DEPARTMENT // FEATURE",
        author: { name: "Terrie Purdum", role: "Publisher & Founder" },
        publishedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        readTime: "5 min read",
        coverImage: "/images/hero_golf_championship.jpg",
        imageCaption: "",
        excerpt: "",
        leadStory: false,
        trending: false,
        featured: true,
        content: {
          paragraphs: [""],
          pullQuote: { quote: "", attribution: "" },
        },
      });
    }
  }, [article, isOpen]);

  if (!isOpen) return null;

  const handleSlugGenerate = (titleText: string) => {
    const slug = titleText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, title: titleText, slug }));
  };

  const handleParagraphChange = (idx: number, text: string) => {
    const paras = [...formData.content.paragraphs];
    paras[idx] = text;
    setFormData({
      ...formData,
      content: { ...formData.content, paragraphs: paras },
    });
  };

  const handleAddParagraph = () => {
    setFormData({
      ...formData,
      content: { ...formData.content, paragraphs: [...formData.content.paragraphs, ""] },
    });
  };

  const handleRemoveParagraph = (idx: number) => {
    const paras = formData.content.paragraphs.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      content: { ...formData.content, paragraphs: paras.length ? paras : [""] },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      } else {
        setError(data.error || "Image upload failed.");
      }
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      setError("Title and slug are required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const res = await saveArticle(formData);
      if (res.success) {
        if (onSuccess) onSuccess(`Article "${formData.title}" saved successfully!`);
        onClose();
      } else {
        setError(res.message || "Failed to save article.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      article &&
      window.confirm(`Are you sure you want to delete article "${formData.title}"?`)
    ) {
      await deleteArticle(article.id);
      if (onSuccess) onSuccess(`Deleted article "${formData.title}"`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto font-sans animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0B291D] border border-[#C59B27]/40 text-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div className="bg-[#071F16] border-b border-[#C59B27]/30 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#134E36] border border-[#C59B27]/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#D8B045]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#D8B045] tracking-widest">
                EDITORIAL ARTICLE DESK
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {article ? `Edit: ${article.title}` : "Create New Editorial Article"}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/50 flex items-start space-x-3 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Promotion Toggles */}
          <div className="p-4 rounded-2xl bg-[#134E36]/60 border border-[#C59B27]/30 flex flex-wrap items-center gap-4">
            <label className="flex items-center space-x-2 cursor-pointer bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-semibold">
              <input
                type="checkbox"
                checked={formData.leadStory || false}
                onChange={(e) => setFormData({ ...formData, leadStory: e.target.checked })}
                className="w-4 h-4 rounded text-[#C59B27] focus:ring-[#C59B27]"
              />
              <Star className="w-3.5 h-3.5 text-[#D8B045]" />
              <span>Homepage Hero Lead Story</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-semibold">
              <input
                type="checkbox"
                checked={formData.trending || false}
                onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                className="w-4 h-4 rounded text-[#C59B27] focus:ring-[#C59B27]"
              />
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Trending Dispatch</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-semibold">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#C59B27] focus:ring-[#C59B27]"
              />
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Featured in Journal</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Metadata & Excerpt */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleSlugGenerate(e.target.value)}
                  placeholder="e.g. The Architecture of Whispering Pines..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Subtitle / Deck
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="A compelling one-sentence premise..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Department Tag
                  </label>
                  <input
                    type="text"
                    value={formData.departmentTag}
                    onChange={(e) => setFormData({ ...formData, departmentTag: e.target.value })}
                    placeholder="e.g. COVER STORY // ARCHITECTURE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formData.author.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...formData.author, role: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Published Date
                  </label>
                  <input
                    type="text"
                    value={formData.publishedDate}
                    onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Excerpt / Journal Lead Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary displayed on homepage cards..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Cover Image */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">
                Article Featured Image
              </label>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C59B27]/40 bg-[#071F16] shadow-xl">
                {formData.coverImage ? (
                  <Image
                    src={formData.coverImage}
                    alt={formData.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/40 p-4 text-center">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>

              <label className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-2 cursor-pointer border border-white/20 transition-colors">
                {uploadingImage ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-[#D8B045]" />
                )}
                <span>{uploadingImage ? "Uploading..." : "Upload Story Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="Image path or URL"
                className="w-full px-3 py-1.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />

              <div>
                <label className="block text-[11px] text-white/70 mb-1">Photo Caption</label>
                <input
                  type="text"
                  value={formData.imageCaption || ""}
                  onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                  placeholder="Caption for article reader..."
                  className="w-full px-3 py-1.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Full Article Content */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Article Paragraphs &amp; Editorial Body</span>
              </div>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="text-xs text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.content.paragraphs.map((p, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-[#134E36] text-[#D8B045] font-bold text-xs flex items-center justify-center shrink-0 mt-2">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    placeholder={`Paragraph ${idx + 1}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                  {formData.content.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(idx)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/50 text-white/50 hover:text-red-300 mt-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="p-4 rounded-2xl bg-[#071F16] border border-[#C59B27]/30 space-y-3">
              <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
                Featured Pull Quote
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={formData.content.pullQuote?.quote || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: {
                          ...formData.content,
                          pullQuote: {
                            quote: e.target.value,
                            attribution: formData.content.pullQuote?.attribution || "",
                          },
                        },
                      })
                    }
                    placeholder="Pull quote snippet..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0B291D] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={formData.content.pullQuote?.attribution || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: {
                          ...formData.content,
                          pullQuote: {
                            quote: formData.content.pullQuote?.quote || "",
                            attribution: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Attribution (e.g. Rees Jones)"
                    className="w-full px-3 py-2 rounded-xl bg-[#0B291D] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-[#071F16] border-t border-[#C59B27]/30 px-6 py-4 flex items-center justify-between shrink-0">
          {article ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Story</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Story...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{article ? "Save Story" : "Create Article"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
