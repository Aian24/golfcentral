"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, ArrowRight, BookOpen, Clock, Film } from "lucide-react";
import { Article, SITE_INFO } from "@/data/editorialData";

interface HeroVideoMarqueeProps {
  leadArticle: Article;
  trendingArticles: Article[];
  onReadArticle: (article: Article) => void;
  onOpenIssue: (issueNum?: number) => void;
  onOpenVideoModal: () => void;
}

export const HeroVideoMarquee: React.FC<HeroVideoMarqueeProps> = ({
  leadArticle,
  trendingArticles,
  onReadArticle,
  onOpenIssue,
  onOpenVideoModal,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative w-full bg-[#061710] text-white overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2B8463]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sub-Header Ticker (relocated from top) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/90">
            <span className="font-bold text-[#BFA054]">Volume 27 • Issue 6</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/80 hidden md:inline">{SITE_INFO.tagline}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <a href={`tel:${SITE_INFO.phone}`} className="text-white/80 hover:text-white transition-colors">
              {SITE_INFO.phone}
            </a>
            <span className="text-white/30">|</span>
            <button
              onClick={() => onOpenIssue(6)}
              className="text-[#D4B568] hover:text-white font-semibold flex items-center space-x-1 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Digital Flipbook</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onOpenVideoModal}
              className="text-white hover:text-[#D4B568] font-semibold flex items-center space-x-1 transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>Video Tour</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Modern Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Frame (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative group w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              {/* Image / Video Layer */}
              {isPlayingVideo ? (
                <div className="relative w-full h-full">
                  <video
                    src="/videos/tour_whispering_pines.mp4"
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061710] via-[#061710]/30 to-black/30 pointer-events-none" />

                  {/* Controls on playing hero video */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
                    <span className="px-3 py-1.5 rounded-full bg-[#0A251A]/85 backdrop-blur-md text-[#D4B568] text-xs font-bold border border-[#BFA054]/40 flex items-center space-x-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>Live Golf Course Tour • Whispering Pines Hole 3</span>
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#D4B568] border border-white/20 transition-colors"
                        title={isMuted ? "Unmute Tour Audio" : "Mute Audio"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-white/70" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#D4B568]" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingVideo(false);
                        }}
                        className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#D4B568] border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                        title="Pause video preview"
                      >
                        <Pause className="w-3 h-3 fill-current" />
                        <span>Pause</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenVideoModal();
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#BFA054] text-[#061710] hover:bg-[#D4B568] text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-lg"
                        title="Open full cinematic theatre reel"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>All 3 Tours</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    src={leadArticle.coverImage}
                    alt={leadArticle.title}
                    fill
                    priority
                    className="object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />

                  {/* Gradient Scrim for crystal clear readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061710] via-[#061710]/40 to-transparent pointer-events-none" />

                  {/* Top Bar on Hero Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                      {leadArticle.category}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[#D4B568] text-xs font-medium border border-[#BFA054]/40 hover:bg-[#BFA054] hover:text-[#061710] transition-all"
                        title="Play video tour directly in banner"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Video Tour</span>
                      </button>

                      <button
                        onClick={onOpenVideoModal}
                        className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 hover:bg-white/20 transition-all"
                        title="Open full theatre reel modal"
                      >
                        <Film className="w-3.5 h-3.5 text-[#BFA054]" />
                        <span>Theatre Reel</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom Modern Title & Content Card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-20 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-white/80">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#BFA054]" />
                    <span>{leadArticle.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>By {leadArticle.author.name}</span>
                </div>

                <h2
                  onClick={() => onReadArticle(leadArticle)}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight sm:leading-snug hover:text-[#D4B568] transition-colors cursor-pointer"
                >
                  {leadArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-white/80 font-normal line-clamp-2 max-w-2xl">
                  {leadArticle.excerpt}
                </p>

                {/* Modern CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onReadArticle(leadArticle)}
                    className="px-6 py-3 rounded-xl bg-[#BFA054] hover:bg-[#9E7F3D] text-[#061710] font-bold text-sm flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenIssue(6)}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-sm font-medium flex items-center space-x-2 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#D4B568]" />
                    <span>Open Flipbook Edition</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Modern Dispatches (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-[#0A251A] rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Editor&apos;s Dispatches
                  </h3>
                  <span className="text-xs text-[#D4B568] font-medium">Issue 6</span>
                </div>

                <div className="space-y-4 divide-y divide-white/10">
                  {trendingArticles.slice(0, 3).map((art, idx) => (
                    <div
                      key={art.id}
                      onClick={() => onReadArticle(art)}
                      className="pt-4 first:pt-0 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2 text-[11px] text-[#D4B568] font-medium mb-1">
                        <span>0{idx + 1}</span>
                        <span>•</span>
                        <span>{art.category}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#D4B568] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-white/50">
                        <span>{art.author.name}</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Magazine Replica Card */}
              <div className="mt-6 pt-4 border-t border-white/10 bg-black/20 -mx-6 -mb-6 p-5 rounded-b-2xl flex items-center space-x-4">
                <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden border border-[#BFA054]/40 shadow-md">
                  <Image
                    src="/images/cover_v27_i6.jpg"
                    alt="Vol 27 cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#D4B568]">
                    NEW VOLUME 27 ISSUE 6
                  </div>
                  <div className="text-xs text-white font-medium">
                    Read the complete digital replica
                  </div>
                  <button
                    onClick={() => onOpenIssue(6)}
                    className="mt-1 text-xs text-[#BFA054] hover:text-white font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <span>Launch Flipbook</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
