"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Filter, Layers, ArrowRight } from "lucide-react";
import { EXACT_ISSUES, MagazineIssue, SITE_INFO } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

interface ArchiveSectionProps {
  onOpenIssue: (issueNum: number) => void;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ onOpenIssue }) => {
  const { issues, availableVolumes, currentIssue } = useEditorialData();
  const [selectedVol, setSelectedVol] = useState<number>(currentIssue?.volume || 27);

  const filteredIssues = issues.filter((i) => i.volume === selectedVol);
  const activeVolumeToDisplay = availableVolumes.includes(selectedVol)
    ? selectedVol
    : availableVolumes[0] || 27;

  return (
    <section id="archive" className="w-full bg-[#0F3D2A] text-white py-16 md:py-24 border-b border-[#176043]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27] text-[#0B291D] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#0B291D]" />
              <span>25+ Years Preserved Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Complete Digital Magazine Archive
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl">
              Browse every published volume and issue of Golf Central Magazine. Explore high-resolution digital print replicas, cover stories, and resort features.
            </p>
          </div>

          {/* Dynamic Volume Filter Selector */}
          <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0 overflow-x-auto max-w-full">
            {availableVolumes.map((vol) => (
              <button
                key={vol}
                onClick={() => setSelectedVol(vol)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedVol === vol
                    ? "bg-[#C59B27] text-[#0B291D] shadow"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Volume {vol}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredIssues.map((issue, idx) => (
            <motion.div
              key={`${issue.volume}-${issue.issue}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.08, ease: "easeOut" }}
              className="bg-[#134E36] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C59B27] transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenIssue(issue.issue)}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#0B291D] cursor-pointer"
              >
                <Image
                  src={issue.coverImage}
                  alt={`${issue.title} Cover`}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {issue.isCurrent && (
                  <div className="absolute top-3 left-3 bg-[#C59B27] text-[#0B291D] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Current Edition
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white/90 text-[10px] font-medium px-2 py-0.5 rounded">
                  {issue.pageCount} Pages
                </div>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#D8B045] uppercase tracking-wider mb-1">
                    {issue.date} • Vol {issue.volume} No {issue.issue}
                  </div>
                  <h4
                    onClick={() => onOpenIssue(issue.issue)}
                    className="text-base font-bold text-white group-hover:text-[#D8B045] transition-colors leading-snug cursor-pointer"
                  >
                    {issue.title}
                  </h4>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">
                    {issue.theme}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                  <button
                    onClick={() => onOpenIssue(issue.issue)}
                    className="w-full py-2.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Flipbook Reader</span>
                  </button>

                  <a
                    href={issue.issuuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-white/5 hover:bg-white/15 text-white/80 text-[11px] rounded-xl flex items-center justify-center space-x-1 transition-colors"
                  >
                    <span>Issuu External</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vintage Issuu Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 p-6 sm:p-8 bg-[#134E36] rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">
              Looking for Older Archives (Volumes 1 through 25)?
            </h4>
            <p className="text-xs text-white/80">
              Access hundreds of digitized back issues from 1999 to 2023 on our official Issuu portal.
            </p>
          </div>
          <a
            href="https://golfcentralmag.com/issue-archive/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-[#C59B27] text-white hover:text-[#0B291D] border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow"
          >
            Open Full 25-Year Vault &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
};
