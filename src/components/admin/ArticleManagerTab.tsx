"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Plus,
  Search,
  Star,
  Flame,
  Sparkles,
  Edit,
  Trash2,
  Clock,
  User,
  Check,
} from "lucide-react";
import { Article } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

interface ArticleManagerTabProps {
  onAddNewArticle: () => void;
  onEditArticle: (article: Article) => void;
}

const CATEGORIES = [
  "All",
  "Course Architecture & Turf",
  "Luxury Travel & Resorts",
  "Tour & Competition",
  "Lifestyle & Gear",
  "Philanthropy & Military",
];

export const ArticleManagerTab: React.FC<ArticleManagerTabProps> = ({
  onAddNewArticle,
  onEditArticle,
}) => {
  const { articles, saveArticle, deleteArticle } = useEditorialData();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      art.title.toLowerCase().includes(query) ||
      art.author.name.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query) ||
      art.departmentTag.toLowerCase().includes(query);

    return matchesCat && matchesQuery;
  });

  const handleToggleLeadStory = async (art: Article) => {
    await saveArticle({ ...art, leadStory: !art.leadStory });
  };

  const handleToggleTrending = async (art: Article) => {
    await saveArticle({ ...art, trending: !art.trending });
  };

  const handleDelete = async (art: Article) => {
    if (window.confirm(`Are you sure you want to delete "${art.title}"?`)) {
      await deleteArticle(art.id);
    }
  };

  return (
    <div className="space-y-6 font-sans animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Editorial Journal Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Articles &amp; Journal Dispatches
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Publish stories, designate the homepage lead story, and tag trending content.
          </p>
        </div>

        <button
          onClick={onAddNewArticle}
          className="px-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-4 space-y-4 shadow-lg">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider mr-1 shrink-0">
            Departments:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#C59B27] text-[#0B291D] shadow"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative pt-2 border-t border-white/10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories by headline, author, or keywords..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-xs focus:border-[#C59B27] focus:outline-none"
          />
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-4 pointer-events-none" />
        </div>
      </div>

      {/* Articles List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className={`bg-[#0F3D2A] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
              art.leadStory
                ? "border-[#C59B27] ring-2 ring-[#C59B27]/40"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {/* Image & Badges */}
            <div className="relative aspect-[16/10] w-full bg-[#071F16] overflow-hidden">
              {art.coverImage ? (
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                  No Image
                </div>
              )}

              <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                {art.leadStory && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27] text-[#0B291D] font-black text-[10px] uppercase shadow flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Hero Lead Story</span>
                  </span>
                )}
                {art.trending && (
                  <span className="px-2 py-0.5 rounded-full bg-orange-600/90 text-white font-bold text-[10px] uppercase shadow flex items-center space-x-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Trending</span>
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] flex items-center space-x-1">
                <Clock className="w-3 h-3 text-[#D8B045]" />
                <span>{art.readTime}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#D8B045] uppercase tracking-wider mb-1">
                  {art.departmentTag} • {art.publishedDate}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#D8B045] transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-white/70 mt-2 line-clamp-2">{art.excerpt}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>By {art.author.name}</span>
                <span className="text-[11px]">{art.content.paragraphs.length} Paragraphs</span>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onEditArticle(art)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#D8B045]" />
                    <span>Edit Story</span>
                  </button>

                  <button
                    onClick={() => handleDelete(art)}
                    className="py-2 px-3 rounded-xl bg-red-900/30 hover:bg-red-900 text-red-200 text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleLeadStory(art)}
                    className={`w-1/2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors flex items-center justify-center space-x-1 ${
                      art.leadStory
                        ? "bg-[#C59B27] text-[#0B291D]"
                        : "bg-white/5 hover:bg-white/10 text-white/70"
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    <span>{art.leadStory ? "Active Lead" : "Make Lead"}</span>
                  </button>

                  <button
                    onClick={() => handleToggleTrending(art)}
                    className={`w-1/2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors flex items-center justify-center space-x-1 ${
                      art.trending
                        ? "bg-orange-600 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white/70"
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>{art.trending ? "Trending" : "Set Trending"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
