"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, Volume2, Share2, Check } from "lucide-react";
import { Article, ARTICLES } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

interface FilterableStoryGridProps {
  onReadArticle: (article: Article) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const FilterableStoryGrid: React.FC<FilterableStoryGridProps> = ({
  onReadArticle,
  activeCategory,
  onSelectCategory,
}) => {
  const { articles, currentEdition } = useEditorialData();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "Course Architecture & Turf",
    "Luxury Travel & Resorts",
    "Tour & Competition",
    "Lifestyle & Gear",
    "Philanthropy & Military",
  ];

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}#${article.slug}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="editorial-grid" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6 mb-12 font-sans"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C59B27]/30 pb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C59B27] font-bold mb-1">
                CURATED EDITORIAL DISPATCHES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight">
                The Journal &amp; Stories
              </h2>
            </div>
            <div className="text-xs font-semibold text-[#64748B]">
              SHOWING {filteredArticles.length} STORIES // VOLUME {currentEdition.volume} ARCHIVE
            </div>
          </div>

          {/* Filter Pills (Clean Wrapping) */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 rounded-lg font-semibold ${
                    isActive
                      ? "bg-[#134E36] text-white shadow-sm font-bold"
                      : "bg-white text-[#475569] hover:text-[#134E36] hover:bg-[#EBF7EE] border border-[#EAE3D9]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 font-sans">
          {/* Main Column: Featured Large Article + Secondary Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {filteredArticles.slice(0, 1).map((art) => {
              const isBookmarked = bookmarkedIds.includes(art.id);
              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  onClick={() => onReadArticle(art)}
                  className="group bg-white border border-[#EAE3D9] hover:border-[#134E36] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl"
                >
                  <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden bg-[#0F3D2A]">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-[#0F3D2A]/90 backdrop-blur-sm text-[#D8B045] text-[11px] font-bold tracking-widest uppercase border border-[#C59B27]/40 rounded-md">
                        {art.departmentTag}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                      <button
                        onClick={(e) => toggleBookmark(art.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isBookmarked
                            ? "bg-[#C59B27] text-[#0B291D]"
                            : "bg-black/50 text-white hover:bg-black/80"
                        }`}
                        title="Bookmark Story"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={(e) => handleShare(art, e)}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                        title="Share Story"
                      >
                        {copiedId === art.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center space-x-3 text-xs text-[#64748B]">
                      <span className="text-[#C59B27] font-bold">{art.category}</span>
                      <span>•</span>
                      <span>{art.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{art.readTime}</span>
                      </span>
                      {art.audioDuration && (
                        <span className="hidden sm:flex items-center space-x-1 text-[#134E36] font-semibold">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{art.audioDuration}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] group-hover:text-[#134E36] transition-colors leading-tight">
                      {art.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-sans line-clamp-3">
                      {art.excerpt}
                    </p>

                    <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-[#134E36] text-[#D8B045] font-bold flex items-center justify-center text-xs">
                          {art.author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F172A] font-sans">
                            {art.author.name}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {art.author.role}
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#C59B27] group-hover:translate-x-1 transition-transform">
                        <span>Read Story</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {/* 2-Column Split for Next 2 Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.slice(1, 3).map((art, idx) => {
                const isBookmarked = bookmarkedIds.includes(art.id);
                return (
                  <motion.article
                    key={art.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                    onClick={() => onReadArticle(art)}
                    className="group bg-white border border-[#EAE3D9] hover:border-[#134E36] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between rounded-xl overflow-hidden"
                  >
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-[#0F3D2A]">
                        <Image
                          src={art.coverImage}
                          alt={art.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 35vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 bg-[#0F3D2A]/90 text-[#D8B045] text-[10px] font-bold tracking-wider uppercase rounded">
                            {art.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={(e) => toggleBookmark(art.id, e)}
                            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                              isBookmarked
                                ? "bg-[#C59B27] text-[#0B291D]"
                                : "bg-black/50 text-white"
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-[11px] text-[#64748B]">
                          {art.publishedDate} • {art.readTime}
                        </div>
                        <h4 className="text-lg font-bold text-[#0F172A] group-hover:text-[#134E36] transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#C59B27]">
                      <span className="text-[#64748B] font-sans">{art.author.name}</span>
                      <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform font-bold">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Digest & Vertical Story Stack (4 cols) */}
          <div className="lg:col-span-4 space-y-8 font-sans">
            {/* Terrie Purdum Publisher Welcome Note */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#134E36] text-white p-6 sm:p-7 border border-[#C59B27]/40 relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="text-[10px] uppercase tracking-widest text-[#D8B045] mb-2 font-bold">
                FROM THE PUBLISHER // EST. 1999
              </div>
              <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                &ldquo;Growing the Great Game in Florida&rdquo;
              </h4>
              <p className="text-xs text-white/85 leading-relaxed font-sans mb-4">
                For over a quarter century, Golf Central Magazine has championed beginner golfers, celebrated the unsung heroes of golf course agronomy, and supported our nation&apos;s military heroes through life-changing charity tournaments.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs">
                <span className="text-[#D8B045] font-bold">Terrie Purdum</span>
                <span className="text-white/70">Publisher &amp; Founder</span>
              </div>
            </motion.div>

            {/* Vertical Articles Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-white border border-[#EAE3D9] p-6 space-y-6 rounded-2xl shadow-sm"
            >
              <div className="border-b border-[#EAE3D9] pb-3 flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-[#0F172A] font-bold">
                  Recent Dispatches
                </h4>
                <span className="text-[10px] text-[#C59B27] font-bold">ARCHIVE</span>
              </div>

              <div className="divide-y divide-[#EAE3D9] space-y-4">
                {filteredArticles.slice(3).map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => onReadArticle(art)}
                    className="pt-4 first:pt-0 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-[10px] text-[#C59B27] mb-1">
                      <span className="font-bold">#{idx + 4}</span>
                      <span>//</span>
                      <span className="text-[#64748B] uppercase">{art.category}</span>
                    </div>
                    <h5 className="text-sm font-bold text-[#0F172A] group-hover:text-[#134E36] transition-colors leading-snug">
                      {art.title}
                    </h5>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-[#94A3B8]">
                      <span>{art.publishedDate}</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Nomination CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-[#FAF4E5] border border-[#F3DE9F] p-6 space-y-3 rounded-2xl"
            >
              <div className="text-[10px] text-[#C59B27] uppercase tracking-wider font-bold">
                COMMUNITY NOMINATIONS
              </div>
              <h4 className="text-lg font-bold text-[#0F172A]">
                Nominate a Florida Course, Superintendent, or Charity
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed">
                Know a course superintendent performing agronomic miracles or a military charity tournament deserving recognition? Submit your nomination for Volume 27 consideration.
              </p>
              <a
                href="#nomination"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#134E36] hover:text-[#176043] uppercase tracking-wider pt-1 transition-colors"
              >
                <span>Submit Nomination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
