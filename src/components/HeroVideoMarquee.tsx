"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ArrowRight, BookOpen, Clock, Film } from "lucide-react";
import { Article, SITE_INFO } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

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
  const { currentEdition, currentIssue, siteInfo } = useEditorialData();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative w-full bg-[#0F3D2A] text-white overflow-hidden py-10 sm:py-14 md:py-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#29976A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sub-Header Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-6 p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] sm:text-xs"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/90">
            <span className="font-bold text-[#D8B045]">
              Volume {currentEdition.volume} • Issue {currentEdition.issue}
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/80 hidden md:inline">{siteInfo.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <a href={`tel:${siteInfo.phone}`} className="text-white/80 hover:text-white transition-colors">
              {siteInfo.phone}
            </a>
            <span className="text-white/30">|</span>
            <button
              onClick={() => onOpenIssue(currentEdition.issue)}
              className="text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Digital Flipbook</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onOpenVideoModal}
              className="text-white hover:text-[#D8B045] font-semibold flex items-center space-x-1 transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Video Tour</span>
            </button>
          </div>
        </motion.div>

        {/* Main Grid: Modern Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Visual Frame (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col justify-between"
          >
            <div className="relative group w-full h-[440px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B291D]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2A] via-[#0F3D2A]/30 to-black/30 pointer-events-none" />

                  {/* Controls on playing hero video */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-30 gap-2">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#0F3D2A]/90 backdrop-blur-md text-[#D8B045] text-[10px] sm:text-xs font-bold border border-[#C59B27]/40 flex items-center space-x-1.5 shadow-lg shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="hidden sm:inline">Live Golf Course Tour • Whispering Pines Hole 3</span>
                      <span className="sm:hidden">Live Golf Tour</span>
                    </span>

                    <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1.5 sm:p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#D8B045] border border-white/20 transition-colors"
                        title={isMuted ? "Unmute Tour Audio" : "Mute Audio"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-white/70" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#D8B045]" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingVideo(false);
                        }}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#D8B045] border border-white/20 text-[11px] sm:text-xs font-semibold flex items-center space-x-1 transition-colors"
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
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#C59B27] text-[#0B291D] hover:bg-[#D8B045] text-[11px] sm:text-xs font-bold flex items-center space-x-1 transition-colors shadow-lg"
                        title="Open full cinematic theatre reel"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>3 Tours</span>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2A] via-[#0F3D2A]/40 to-transparent pointer-events-none" />

                  {/* Top Bar on Hero Image */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold border border-white/20">
                      {leadArticle.category}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[#D8B045] text-[11px] sm:text-xs font-medium border border-[#C59B27]/40 hover:bg-[#C59B27] hover:text-[#0B291D] transition-all"
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
                        <Film className="w-3.5 h-3.5 text-[#D8B045]" />
                        <span>Theatre Reel</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom Modern Title & Content Card */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-10 z-20 space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3 text-[11px] sm:text-xs text-white/80">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#D8B045]" />
                    <span>{leadArticle.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>By {leadArticle.author.name}</span>
                </div>

                <h2
                  onClick={() => onReadArticle(leadArticle)}
                  className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight sm:leading-snug hover:text-[#D8B045] transition-colors cursor-pointer line-clamp-2"
                >
                  {leadArticle.title}
                </h2>

                <p className="text-xs sm:text-base text-white/85 font-normal line-clamp-2 max-w-2xl">
                  {leadArticle.excerpt}
                </p>

                {/* Modern CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <button
                    onClick={() => onReadArticle(leadArticle)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenIssue(6)}
                    className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#D8B045]" />
                    <span>Open Flipbook Edition</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Modern Dispatches (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col justify-between space-y-4"
          >
            <div className="bg-[#134E36] rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Editor&apos;s Dispatches
                  </h3>
                  <span className="text-xs text-[#D8B045] font-medium">Issue 6</span>
                </div>

                <div className="space-y-4 divide-y divide-white/10">
                  {trendingArticles.slice(0, 3).map((art, idx) => (
                    <motion.div
                      key={art.id}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                      onClick={() => onReadArticle(art)}
                      className="pt-4 first:pt-0 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2 text-[11px] text-[#D8B045] font-medium mb-1">
                        <span>0{idx + 1}</span>
                        <span>•</span>
                        <span>{art.category}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#D8B045] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-white/70">
                        <span>{art.author.name}</span>
                        <span>{art.readTime}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Digital Magazine Replica Card */}
              <div className="mt-6 pt-4 border-t border-white/10 bg-[#0F3D2A]/60 -mx-6 -mb-6 p-5 rounded-b-2xl flex items-center space-x-4">
                <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden border border-[#C59B27]/40 shadow-md">
                  <Image
                    src={currentIssue?.coverImage || "/images/cover_v27_i6.jpg"}
                    alt={`Vol ${currentEdition.volume} Issue ${currentEdition.issue} cover`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#D8B045]">
                    NEW VOLUME {currentEdition.volume} ISSUE {currentEdition.issue}
                  </div>
                  <div className="text-xs text-white font-medium">
                    Read the complete digital replica
                  </div>
                  <button
                    onClick={() => onOpenIssue(currentEdition.issue)}
                    className="mt-1 text-xs text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <span>Launch Flipbook</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
