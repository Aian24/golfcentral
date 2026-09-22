"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ExternalLink, Sparkles, Layers, ChevronRight } from "lucide-react";
import { MAGAZINE_ISSUES, MagazineIssue } from "@/data/editorialData";

interface IssueShelfProps {
  onOpenIssue: (issueNumber: number) => void;
}

export const IssueShelf: React.FC<IssueShelfProps> = ({ onOpenIssue }) => {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue>(MAGAZINE_ISSUES[0]);

  return (
    <section id="issues-archive" className="w-full bg-[#0D271F] text-white py-16 md:py-24 border-y border-[#C5A059]/30 relative overflow-hidden">
      {/* Decorative Gold Radiance */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#BFA054]/30 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-widest text-[#D4B568] uppercase mb-1 font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>THE DIGITAL NEWSSTAND // 27 VOLUMES STRONG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Magazine Archive &amp; Digital Editions
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/70 font-sans leading-relaxed">
            Every published issue of Golf Central Magazine is preserved in high-resolution interactive digital format. Flip through complete issues, feature spreads, and resort directories.
          </p>
        </div>

        {/* 3D Magazine Cover Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MAGAZINE_ISSUES.map((issue) => {
            const isCurrent = issue.volume === 27 && issue.issue === 6;
            return (
              <div
                key={`${issue.volume}-${issue.issue}`}
                className="group relative flex flex-col bg-[#0A1F18] border border-[#BFA054]/20 hover:border-[#BFA054] transition-all duration-300 transform hover:-translate-y-2 shadow-xl rounded-2xl overflow-hidden"
              >
                {/* 3D Cover Wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
                  <Image
                    src={issue.coverImage}
                    alt={`${issue.title} Cover`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {isCurrent && (
                      <span className="bg-[#BFA054] text-[#0A1F18] text-[10px] font-bold px-2 py-0.5 shadow-md uppercase tracking-wider rounded">
                        CURRENT ISSUE
                      </span>
                    )}
                    <span className="bg-black/75 backdrop-blur-sm text-[#D4B568] text-[10px] font-semibold px-2 py-0.5 border border-[#BFA054]/30 rounded">
                      VOL. {issue.volume} // NO. {issue.issue}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="bg-black/80 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {issue.pageCount} PAGES
                    </span>
                  </div>

                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-[#0A1F18]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center space-y-3">
                    <h4 className="text-lg font-bold text-white leading-snug">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-[#D4B568] font-semibold">{issue.date}</p>
                    <p className="text-xs text-white/80 line-clamp-3 italic">
                      &ldquo;{issue.editorNote}&rdquo;
                    </p>

                    <div className="pt-2 flex flex-col w-full space-y-2">
                      <button
                        onClick={() => onOpenIssue(issue.issue)}
                        className="w-full py-2 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors shadow rounded-lg"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Interactive Reader</span>
                      </button>

                      <a
                        href={issue.issuuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1 border border-white/20 transition-colors rounded-lg font-semibold"
                      >
                        <span>Full Screen on Issuu</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-4 flex flex-col justify-between flex-grow border-t border-[#BFA054]/20 bg-[#06150F]">
                  <div>
                    <div className="text-[11px] text-[#BFA054] uppercase tracking-wider mb-1 font-semibold">
                      {issue.date}
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight line-clamp-1 group-hover:text-[#D4B568] transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">
                      {issue.theme}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onOpenIssue(issue.issue)}
                      className="text-[#D4B568] group-hover:text-white font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <span>Explore Issue</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] text-white/40 font-semibold">EZINE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 25-Year Heritage Archive Banner */}
        <div className="mt-12 p-6 md:p-8 bg-[#0A1F18] border border-[#BFA054]/40 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs text-[#D4B568] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>OVER 25 YEARS OF PRESERVED GOLF HISTORY</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Looking for older volumes or vintage Florida tournament covers?
            </h3>
            <p className="text-sm text-white/70 max-w-2xl font-sans leading-relaxed">
              From Volume 1 in 1999 to our present Volume 27, our editorial vault contains coverage of historic Florida Open tournaments, course groundbreakings, and interviews with golf legends.
            </p>
          </div>

          <a
            href="https://golfcentralmag.com/issue-archive/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-transparent hover:bg-[#BFA054] text-[#D4B568] hover:text-[#0A1F18] border border-[#BFA054] text-xs uppercase tracking-widest transition-all duration-300 rounded-xl font-bold"
          >
            Access Full Issuu Archives &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
