"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Clock, Bookmark, Share2, Play, Pause, Volume2, Check, ArrowRight, BookOpen } from "lucide-react";
import { Article, ARTICLES, SITE_INFO } from "@/data/editorialData";

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenIssue: (issueNum?: number) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  onOpenIssue,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setIsPlayingAudio(false);
  }, [article]);

  if (!article) return null;

  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.featured)
  ).slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Same Modal Structure as Flipbook Edition */}
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#0A1F18] text-white shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden rounded-2xl font-sans">
        {/* Top Control Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-b border-[#BFA054]/30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#BFA054] shrink-0" />
            <div className="overflow-hidden">
              <div className="text-[9px] sm:text-[10px] text-[#D4B568] uppercase tracking-wider font-semibold truncate">
                DIGITAL ARTICLE READER // {article.category}
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-none truncate">
                {article.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
                isBookmarked
                  ? "bg-[#BFA054] text-[#0A1F18]"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Bookmark story"
            >
              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Share article link"
            >
              {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-0.5"
              title="Close reader (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
            {/* Header Meta */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#D4B568] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <span>{article.departmentTag}</span>
              </div>

              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                {article.subtitle}
              </p>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#BFA054] text-[#0A1F18] font-bold flex items-center justify-center text-xs">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{article.author.name}</span>
                    <span className="text-white/60 text-[11px]">{article.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span>{article.publishedDate}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-[#D4B568]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Narration Bar */}
            {article.audioDuration && (
              <div className="p-4 bg-[#06150F] rounded-2xl border border-[#BFA054]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="p-3 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] rounded-full transition-colors shrink-0"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs text-[#D4B568] font-bold uppercase flex items-center space-x-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Narration</span>
                    </div>
                    <div className="text-xs text-white/70">
                      {isPlayingAudio ? "Playing audio..." : `Duration: ${article.audioDuration}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center text-xs">
                  <span className="text-white/40">SPEED:</span>
                  {(["1x", "1.25x", "1.5x"] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setAudioSpeed(spd)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                        audioSpeed === spd
                          ? "bg-[#BFA054] text-[#0A1F18]"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hero Image */}
            <div className="space-y-2">
              <div className="relative h-[280px] sm:h-[380px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <p className="text-xs text-white/60 italic text-center sm:text-left">
                {article.imageCaption}
              </p>
            </div>

            {/* Story Content */}
            <div className="space-y-5 text-white/90 leading-relaxed text-sm sm:text-base font-normal">
              {article.content.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {article.content.pullQuote && (
                <div className="p-6 rounded-2xl bg-[#06150F] border-l-4 border-[#BFA054] border-y border-r border-white/10 my-6 space-y-2">
                  <p className="text-base sm:text-lg italic text-white font-medium">
                    &ldquo;{article.content.pullQuote.quote}&rdquo;
                  </p>
                  <p className="text-xs text-[#D4B568] font-bold uppercase tracking-wider">
                    — {article.content.pullQuote.attribution}
                  </p>
                </div>
              )}

              {article.content.subheading && (
                <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">
                  {article.content.subheading}
                </h3>
              )}

              {article.content.secondaryParagraphs?.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-white/80">{p}</p>
              ))}
            </div>

            {/* Jump to Issue Flipbook Banner */}
            <div className="p-6 bg-[#06150F] rounded-2xl border border-[#BFA054]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-[#BFA054] shrink-0" />
                <div>
                  <div className="text-xs text-[#D4B568] font-semibold uppercase">
                    Featured in Volume 27 Issue 6
                  </div>
                  <div className="text-sm font-bold text-white">
                    Read the complete digital replica magazine
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenIssue(6);
                }}
                className="px-5 py-2.5 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
              >
                Open Flipbook Edition
              </button>
            </div>

            {/* Related Articles */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                Related Stories in Golf Central
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 rounded-xl bg-[#06150F] border border-white/10 hover:border-[#BFA054] cursor-pointer transition-all hover:shadow-md space-y-2"
                  >
                    <div className="text-[10px] font-bold text-[#D4B568] uppercase">
                      {rel.category}
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-white hover:text-[#D4B568] transition-colors line-clamp-2">
                      {rel.title}
                    </h5>
                    <div className="text-[11px] text-white/50">{rel.readTime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-t border-[#BFA054]/30 px-6 py-3 flex items-center justify-between text-xs text-white/60 shrink-0">
          <span>Golf Central Magazine • Published in Lake Wales, FL Since 1999</span>
          <button onClick={onClose} className="hover:text-[#D4B568] font-semibold">
            Close Reader [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
