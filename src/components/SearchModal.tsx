"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Clock, BookOpen, Tag } from "lucide-react";
import { Article, ARTICLES } from "@/data/editorialData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? ARTICLES.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.author.name.toLowerCase().includes(q)
        );
      })
    : ARTICLES.slice(0, 5);

  const quickPills = [
    "Whispering Pines",
    "Hammock Beach",
    "Agronomy",
    "PGA HOPE",
    "Superintendents",
    "Baha Mar",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      {/* Same Modal Structure as Flipbook Edition */}
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#0A1F18] text-white shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden rounded-2xl font-sans">
        {/* Top Control Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-b border-[#BFA054]/30 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#BFA054] shrink-0" />
            <div className="overflow-hidden">
              <div className="text-[9px] sm:text-[10px] text-[#D4B568] uppercase tracking-wider font-semibold truncate">
                SEARCH GOLF CENTRAL ARCHIVES // DIGITAL INDEX
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-none truncate">
                Story, Resort, Architecture &amp; Agronomy Search
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            title="Close search (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Input & Search Area */}
        <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 shrink-0 bg-[#0A1F18] border-b border-white/10">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#BFA054] absolute left-3.5 sm:left-4" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories, resorts, agronomy..."
              className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-16 sm:pr-20 rounded-xl bg-white border-2 border-[#BFA054]/50 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs sm:text-sm outline-none transition-all font-medium shadow-xs"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 text-xs font-semibold text-white/50 hover:text-white px-2 py-1 rounded bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {/* Trending Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs scrollbar-none pt-1">
            <span className="text-[#D4B568] text-[11px] font-semibold uppercase tracking-wider shrink-0 flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>Trending:</span>
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="shrink-0 h-7 px-3 rounded-full bg-[#06150F] hover:bg-[#BFA054] hover:text-[#0A1F18] border border-white/10 text-white/80 text-xs font-medium transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="text-[11px] font-bold text-[#D4B568] uppercase tracking-wider px-1">
            {query.trim() ? `Search Results (${results.length})` : "Recommended Stories"}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-sm text-white/60">
              No matching stories found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-4 rounded-xl bg-[#06150F] border border-white/10 hover:border-[#BFA054] transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-[#D4B568] font-bold text-[11px] uppercase">
                      {art.category}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/60 text-[11px]">{art.readTime}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4B568] transition-colors leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs text-white/70 line-clamp-1">
                    {art.excerpt}
                  </p>
                </div>

                <div className="h-8 w-8 rounded-full bg-white/10 group-hover:bg-[#BFA054] group-hover:text-[#0A1F18] text-white flex items-center justify-center shrink-0 transition-colors mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Control Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-t border-[#BFA054]/30 px-6 py-3 flex items-center justify-between text-xs text-white/60 shrink-0">
          <span>Golf Central Magazine • Volume 27 Archive Search</span>
          <button onClick={onClose} className="hover:text-[#D4B568] font-semibold">
            Close Search [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
