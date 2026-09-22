"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, ChevronLeft, ChevronRight, BookOpen, Layers, CheckCircle } from "lucide-react";
import { MAGAZINE_ISSUES, MagazineIssue } from "@/data/editorialData";

interface IssueReaderModalProps {
  issueNumber: number | null;
  onClose: () => void;
  onSelectIssue: (issueNum: number) => void;
}

export const IssueReaderModal: React.FC<IssueReaderModalProps> = ({
  issueNumber,
  onClose,
  onSelectIssue,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!issueNumber) return null;

  const currentIssue =
    MAGAZINE_ISSUES.find((i) => i.issue === issueNumber) || MAGAZINE_ISSUES[0];

  const handleNextPage = () => {
    if (currentPage < currentIssue.pageCount) {
      setCurrentPage((prev) => Math.min(prev + 2, currentIssue.pageCount));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => Math.max(prev - 2, 1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#0A1F18] text-white shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden rounded-2xl font-sans">
        {/* Top Control Bar */}
        <div className="bg-[#06150F] border-b border-[#BFA054]/30 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-[#BFA054]" />
            <div>
              <div className="text-[10px] text-[#D4B568] uppercase tracking-wider font-semibold">
                DIGITAL REPLICA VIEWER // VOL. {currentIssue.volume} ISSUE {currentIssue.issue}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-none">
                {currentIssue.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={currentIssue.issuuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] text-xs font-bold uppercase tracking-wider transition-colors rounded-lg"
            >
              <span>Open on Issuu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close issue viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Virtual Spread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center relative">
          {/* Issue Spread Mockup */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#0D271F] border border-[#BFA054]/30 p-4 sm:p-6 shadow-2xl rounded-xl">
            {/* Magazine Cover / Current Page Spread */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] w-64 sm:w-72 shadow-2xl border-2 border-[#BFA054]/60 overflow-hidden rounded-lg transform hover:scale-[1.02] transition-transform">
                <Image
                  src={currentIssue.coverImage}
                  alt={currentIssue.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-[#D4B568] rounded">
                  PAGE {currentPage} OF {currentIssue.pageCount}
                </div>
              </div>
            </div>

            {/* Table of Contents & Feature Spreads */}
            <div className="md:col-span-7 space-y-4">
              <div className="border-b border-[#BFA054]/30 pb-3">
                <span className="text-[10px] font-semibold text-[#D4B568] uppercase tracking-widest">
                  TABLE OF CONTENTS &amp; FEATURES
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentIssue.theme}
                </h4>
                <p className="text-xs text-white/70 italic mt-1 leading-relaxed">
                  &ldquo;{currentIssue.editorNote}&rdquo;
                </p>
              </div>

              <div className="space-y-2.5">
                {currentIssue.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2.5 text-xs text-white/90 p-2.5 bg-black/30 border border-white/5 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-[#BFA054] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">{feat}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Page Navigator Controls */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#BFA054]/20 text-xs">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded text-white flex items-center font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-[11px] pr-1">Prev</span>
                  </button>
                  <span className="text-white/70 font-medium">
                    Pages {currentPage}–{Math.min(currentPage + 1, currentIssue.pageCount)}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= currentIssue.pageCount}
                    className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded text-white flex items-center font-semibold"
                  >
                    <span className="text-[11px] pl-1">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href={currentIssue.issuuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4B568] hover:underline flex items-center space-x-1 font-semibold text-xs"
                >
                  <span>Launch 3D Issuu Flipbook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Issue Switcher Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#D4B568] tracking-wider uppercase shrink-0 flex items-center space-x-1.5 mr-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Switch Volume 27 Issue:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {MAGAZINE_ISSUES.map((iss) => (
                <button
                  key={iss.issue}
                  onClick={() => {
                    onSelectIssue(iss.issue);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                    iss.issue === currentIssue.issue
                      ? "bg-[#BFA054] text-[#0A1F18] font-bold shadow-md"
                      : "bg-[#06150F] text-white/75 hover:text-white border border-[#BFA054]/30 hover:border-[#BFA054]/60"
                  }`}
                >
                  Issue {iss.issue} ({iss.date})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#06150F] border-t border-[#BFA054]/30 px-6 py-3 flex items-center justify-between text-xs text-white/60 shrink-0 font-sans">
          <span>Golf Central Magazine • Published in Lake Wales, FL Since 1999</span>
          <button onClick={onClose} className="hover:text-[#D4B568] transition-colors font-semibold">
            Close Viewer [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
