"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Volume2, Clock, Compass } from "lucide-react";
import { Article, CURRENT_EDITION } from "@/data/editorialData";

interface HeroMarqueeProps {
  leadArticle: Article;
  trendingArticles: Article[];
  onReadArticle: (article: Article) => void;
  onOpenIssue: (issueNum?: number) => void;
}

export const HeroMarquee: React.FC<HeroMarqueeProps> = ({
  leadArticle,
  trendingArticles,
  onReadArticle,
  onOpenIssue,
}) => {
  return (
    <section className="relative w-full bg-[#0A1F18] text-white overflow-hidden">
      {/* Background cinematic aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F18] via-[#0A1F18]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-20">
        {/* Editorial Sub-header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#C5A059]/20 pb-4">
          <div className="flex items-center space-x-3 text-xs font-sans">
            <span className="text-[#D8B26E] font-bold">Volume 27 • Issue 6</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">The Voice of Golf in Florida &amp; The Southeast Since 1999</span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-sans text-white/60">
            <a href="tel:863-875-6863" className="hover:text-[#D8B26E] transition-colors">
              863-875-6863
            </a>
            <span>|</span>
            <button
              onClick={() => onOpenIssue(CURRENT_EDITION.issue)}
              className="text-[#D8B26E] hover:underline"
            >
              Digital Flipbook
            </button>
          </div>
        </div>

        {/* Hero Article Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative group overflow-hidden border border-[#C5A059]/40 shadow-2xl bg-black">
              {/* Cinematic Image Frame */}
              <div className="relative h-[420px] sm:h-[500px] md:h-[580px] w-full">
                <Image
                  src={leadArticle.coverImage}
                  alt={leadArticle.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F18] via-[#0A1F18]/40 to-transparent" />

                {/* Overlaid Bottom Title Card on Image for dramatic magazine cover feel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#D8B26E] font-semibold">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 border border-[#C5A059]/40 text-white">
                      {leadArticle.category.toUpperCase()}
                    </span>
                    <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{leadArticle.readTime}</span>
                    </span>
                    {leadArticle.audioDuration && (
                      <span className="hidden sm:flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 text-emerald-300">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen ({leadArticle.audioDuration})</span>
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => onReadArticle(leadArticle)}
                    className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight sm:leading-none hover:text-[#D8B26E] transition-colors cursor-pointer"
                  >
                    {leadArticle.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl font-sans line-clamp-2 sm:line-clamp-3">
                    {leadArticle.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => onReadArticle(leadArticle)}
                      className="px-6 py-3 bg-[#C5A059] hover:bg-[#AA8437] text-[#0A1F18] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-all transform hover:translate-x-1 shadow-lg"
                    >
                      <span>Read Feature Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenIssue(CURRENT_EDITION.issue)}
                      className="px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-medium text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#D8B26E]" />
                      <span>Open Issue 6</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trending Dispatches & Editorial Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 font-sans">
            <div className="border border-[#C5A059]/20 bg-[#0D271F]/80 backdrop-blur-md p-6 relative">
              <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3 mb-4">
                <span className="text-xs uppercase tracking-widest text-[#D8B26E] font-semibold flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span>Editor&apos;s Dispatches</span>
                </span>
                <span className="text-[10px] text-white/50">LATEST</span>
              </div>

              <div className="divide-y divide-white/10 space-y-4">
                {trendingArticles.slice(0, 3).map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => onReadArticle(art)}
                    className="pt-4 first:pt-0 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-[10px] text-[#D8B26E] mb-1">
                      <span>0{idx + 1}</span>
                      <span>//</span>
                      <span className="uppercase text-white/60">{art.category}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D8B26E] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-white/50">
                      <span>{art.author.name}</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Volume 27 Digital Shelf Callout */}
              <div className="mt-6 pt-5 border-t border-[#C5A059]/30 bg-black/20 -mx-6 -mb-6 p-6">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-16 shrink-0 border border-[#C5A059]/40 shadow-md">
                    <Image
                      src="/images/mag_cover_vol27_6.jpg"
                      alt="Vol 27 cover thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#D8B26E] tracking-wider">
                      DIGITAL REPLICA EDITION
                    </div>
                    <div className="text-xs font-bold text-white">
                      Vol. 27 Issue 6 is now live
                    </div>
                    <button
                      onClick={() => onOpenIssue(CURRENT_EDITION.issue)}
                      className="text-xs text-[#C5A059] hover:underline font-semibold mt-0.5 inline-block"
                    >
                      Flip through pages &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
