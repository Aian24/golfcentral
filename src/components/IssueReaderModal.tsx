"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  BookOpen,
  Layers,
  CheckCircle,
  List,
  Sparkles,
  Loader2,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { MAGAZINE_ISSUES, MagazineIssue } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

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
  const { issues } = useEditorialData();
  const [activeTab, setActiveTab] = useState<"flipbook" | "features">("flipbook");
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const issueScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset loading state when issue changes
  useEffect(() => {
    setIframeLoading(true);
  }, [issueNumber]);

  if (!issueNumber) return null;

  const currentIssue =
    issues.find((i) => i.issue === issueNumber) || issues[0] || MAGAZINE_ISSUES[0];

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(currentIssue.issuuUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleScrollLeft = () => {
    if (issueScrollRef.current) {
      issueScrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (issueScrollRef.current) {
      issueScrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl h-full max-h-[96vh] bg-[#0B291D] text-white shadow-2xl border border-[#C59B27]/40 flex flex-col justify-between overflow-hidden rounded-2xl font-sans">
        {/* Top Control Bar */}
        <div className="bg-[#071F16] border-b border-[#C59B27]/30 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shrink-0 gap-3">
          {/* Left: Issue Info */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#134E36] border border-[#C59B27]/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-[#D8B045]" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-[#D8B045] uppercase tracking-wider font-semibold truncate flex items-center space-x-1.5">
                <span>DIGITAL FLIPBOOK</span>
                <span>•</span>
                <span>VOL. {currentIssue.volume} ISSUE {currentIssue.issue}</span>
                <span>•</span>
                <span className="hidden sm:inline">{currentIssue.date}</span>
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-tight truncate">
                {currentIssue.title}: {currentIssue.theme}
              </h3>
            </div>
          </div>

          {/* Center: View Switcher Tabs */}
          <div className="hidden md:flex items-center bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("flipbook")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "flipbook"
                  ? "bg-[#C59B27] text-[#0B291D] shadow-sm font-bold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Flipbook</span>
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "features"
                  ? "bg-[#C59B27] text-[#0B291D] shadow-sm font-bold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table of Contents</span>
            </button>
          </div>

          {/* Right: Direct Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={currentIssue.issuuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#C59B27] to-[#D8B045] hover:from-[#B38A20] hover:to-[#C59B27] text-[#0B291D] text-xs font-extrabold uppercase tracking-wider transition-all duration-200 rounded-xl shadow-md transform hover:scale-105"
              title="Open full magazine directly on Issuu.com in a new tab"
            >
              <span>Open on Issuu</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Copy issue link"
            >
              <Share2 className="w-4 h-4 text-white/80" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              title="Close viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Bar */}
        <div className="md:hidden flex items-center justify-around bg-[#0A291C] px-3 py-1.5 border-b border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab("flipbook")}
            className={`flex-1 py-1.5 text-xs font-semibold text-center rounded-lg transition-colors ${
              activeTab === "flipbook"
                ? "bg-[#C59B27] text-[#0B291D] font-bold"
                : "text-white/70"
            }`}
          >
            Interactive Flipbook
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`flex-1 py-1.5 text-xs font-semibold text-center rounded-lg transition-colors ${
              activeTab === "features"
                ? "bg-[#C59B27] text-[#0B291D] font-bold"
                : "text-white/70"
            }`}
          >
            Table of Contents
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#071F16] relative overflow-hidden">
          {activeTab === "flipbook" ? (
            /* Interactive Issuu Flipbook View */
            <div className="w-full h-full flex flex-col relative min-h-0">
              {/* Flipbook Header Subtitle Bar */}
              <div className="bg-[#0A291C] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs text-white/80 shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-[11px] sm:text-xs">
                    Live Digital Replica: Click or drag to turn pages, double click to zoom
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="text-[#D8B045] font-semibold">
                    {currentIssue.pageCount} Pages Total
                  </span>
                  <a
                    href={currentIssue.issuuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center space-x-1 text-[#D8B045] hover:underline font-semibold"
                  >
                    <span>Full Screen Issuu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Issuu Embed Iframe Container */}
              <div className="flex-1 w-full h-full relative bg-black/60 min-h-0">
                {iframeLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#071F16]/90 backdrop-blur-sm space-y-3">
                    <Loader2 className="w-8 h-8 text-[#D8B045] animate-spin" />
                    <p className="text-xs text-[#D8B045] font-semibold tracking-wide">
                      Loading Interactive Issuu Reader...
                    </p>
                    <a
                      href={currentIssue.issuuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/70 hover:text-white underline pt-2"
                    >
                      Taking too long? Open directly on Issuu &rarr;
                    </a>
                  </div>
                )}

                <iframe
                  src={currentIssue.issuuEmbedUrl}
                  title={`${currentIssue.title} - Digital Flipbook`}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          ) : (
            /* Table of Contents & Feature Overview View */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#134E36] border border-[#C59B27]/30 p-4 sm:p-6 shadow-2xl rounded-2xl">
                {/* Magazine Cover */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div
                    onClick={() => setActiveTab("flipbook")}
                    className="group relative aspect-[3/4] w-64 sm:w-72 shadow-2xl border-2 border-[#C59B27]/60 overflow-hidden rounded-xl cursor-pointer transform hover:scale-[1.02] transition-transform"
                  >
                    <Image
                      src={currentIssue.coverImage}
                      alt={currentIssue.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-[#0B291D]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <BookOpen className="w-8 h-8 text-[#D8B045] mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Click to Open Flipbook
                      </span>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-0.5 text-[10px] font-semibold text-[#D8B045] rounded-full">
                      {currentIssue.pageCount} PAGES
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("flipbook")}
                    className="mt-4 w-64 sm:w-72 py-2 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Launch Flipbook Reader</span>
                  </button>
                </div>

                {/* Table of Contents & Features */}
                <div className="md:col-span-7 space-y-4">
                  <div className="border-b border-[#C59B27]/30 pb-3">
                    <span className="text-[10px] font-semibold text-[#D8B045] uppercase tracking-widest flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-[#C59B27]" />
                      <span>TABLE OF CONTENTS &amp; FEATURES</span>
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {currentIssue.theme}
                    </h4>
                    {currentIssue.editorNote && (
                      <p className="text-xs text-white/80 italic mt-1.5 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
                        &ldquo;{currentIssue.editorNote}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {currentIssue.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2.5 text-xs text-white/90 p-2.5 bg-black/30 border border-white/5 rounded-xl hover:border-[#C59B27]/40 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                        <span className="font-semibold text-white leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#C59B27]/20 text-xs">
                    <button
                      onClick={() => setActiveTab("flipbook")}
                      className="text-[#D8B045] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>Read Complete Edition (Flipbook Mode) &rarr;</span>
                    </button>

                    <a
                      href={currentIssue.issuuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white flex items-center space-x-1 font-medium text-xs"
                    >
                      <span>Issuu Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Quick Issue Switcher Bar */}
        <div className="bg-[#071F16] border-t border-[#C59B27]/25 px-3 sm:px-6 py-2.5 shrink-0 flex flex-col space-y-2">
          {/* Issue Pills Row with Smooth Scroll Arrows + Flex Wrap */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleScrollLeft}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#D8B045] transition-colors shrink-0 md:hidden"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={issueScrollRef}
              className="flex-1 flex flex-wrap sm:flex-nowrap sm:overflow-x-auto items-center gap-1.5 sm:gap-2 py-0.5 scrollbar-thin scrollbar-thumb-[#C59B27]/40"
            >
              <span className="text-[10px] font-bold text-[#D8B045] tracking-wider uppercase shrink-0 flex items-center space-x-1 mr-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Issues:</span>
              </span>

              {issues.map((iss) => {
                const isActive =
                  iss.issue === currentIssue.issue && iss.volume === currentIssue.volume;
                return (
                  <button
                    key={`${iss.volume}-${iss.issue}`}
                    onClick={() => {
                      onSelectIssue(iss.issue);
                      setIframeLoading(true);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center space-x-1 ${
                      isActive
                        ? "bg-[#C59B27] text-[#0B291D] font-extrabold shadow-md scale-102"
                        : "bg-[#134E36] text-white/80 hover:text-white hover:bg-[#176043] border border-[#C59B27]/30 hover:border-[#C59B27]/60"
                    }`}
                  >
                    <span>
                      Vol {iss.volume} #{iss.issue} ({iss.date})
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleScrollRight}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#D8B045] transition-colors shrink-0 md:hidden"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Status / Meta Sub-row */}
          <div className="flex items-center justify-between text-[11px] text-white/60 pt-1 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <span>Golf Central Magazine • Est. 1999</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-white/40">Official Issuu Digital Publication</span>
            </div>

            <div className="flex items-center space-x-4">
              {copiedLink && (
                <span className="text-emerald-400 font-semibold animate-pulse">
                  Link copied to clipboard!
                </span>
              )}
              <button
                onClick={onClose}
                className="hover:text-[#D8B045] transition-colors font-semibold text-xs"
              >
                Close Viewer [Esc]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
