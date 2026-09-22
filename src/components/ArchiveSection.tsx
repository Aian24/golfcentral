"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ExternalLink, Filter, Layers, ArrowRight } from "lucide-react";
import { EXACT_ISSUES, MagazineIssue, SITE_INFO } from "@/data/editorialData";

interface ArchiveSectionProps {
  onOpenIssue: (issueNum: number) => void;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ onOpenIssue }) => {
  const [selectedVol, setSelectedVol] = useState<number>(27);

  const filteredIssues = EXACT_ISSUES.filter((i) => i.volume === selectedVol);

  return (
    <section id="issue-archive" className="w-full bg-[#061710] text-white py-16 md:py-24 border-b border-[#BFA054]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#BFA054] text-[#061710] text-xs font-bold uppercase tracking-wider">
              <span>25+ Years Preserved Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Complete Digital Magazine Archive
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl">
              Browse every published volume and issue of Golf Central Magazine. Explore high-resolution digital print replicas, cover stories, and resort features.
            </p>
          </div>

          {/* Volume Filter Selector */}
          <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setSelectedVol(27)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                selectedVol === 27
                  ? "bg-[#BFA054] text-[#061710]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Volume 27 (2024)
            </button>
            <button
              onClick={() => setSelectedVol(26)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                selectedVol === 26
                  ? "bg-[#BFA054] text-[#061710]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Volume 26 (2023)
            </button>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredIssues.map((issue) => (
            <div
              key={`${issue.volume}-${issue.issue}`}
              className="bg-[#0A251A] rounded-2xl overflow-hidden border border-white/10 hover:border-[#BFA054] transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenIssue(issue.issue)}
                className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 cursor-pointer"
              >
                <Image
                  src={issue.coverImage}
                  alt={`${issue.title} Cover`}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {issue.volume === 27 && issue.issue === 6 && (
                  <div className="absolute top-3 left-3 bg-[#BFA054] text-[#061710] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Current Edition
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white/90 text-[10px] font-medium px-2 py-0.5 rounded">
                  {issue.pageCount} Pages
                </div>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#D4B568] uppercase tracking-wider mb-1">
                    {issue.date} • Vol {issue.volume} No {issue.issue}
                  </div>
                  <h4
                    onClick={() => onOpenIssue(issue.issue)}
                    className="text-base font-bold text-white group-hover:text-[#D4B568] transition-colors leading-snug cursor-pointer"
                  >
                    {issue.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2">
                    {issue.theme}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                  <button
                    onClick={() => onOpenIssue(issue.issue)}
                    className="w-full py-2 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#061710] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Flipbook Reader</span>
                  </button>

                  <a
                    href={issue.issuuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-white/5 hover:bg-white/15 text-white/80 text-[11px] rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  >
                    <span>Issuu External</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vintage Issuu Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#0A251A] rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">
              Looking for Older Archives (Volumes 1 through 25)?
            </h4>
            <p className="text-xs text-white/70">
              Access hundreds of digitized back issues from 1999 to 2023 on our official Issuu portal.
            </p>
          </div>
          <a
            href="https://golfcentralmag.com/issue-archive/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-[#BFA054] text-white hover:text-[#061710] border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Open Full 25-Year Vault &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
