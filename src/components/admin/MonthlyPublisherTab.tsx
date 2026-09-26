"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Send,
  BookOpen,
  Archive,
  Radio,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  Upload,
  ExternalLink,
  Edit3,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { ExtendedMagazineIssue } from "@/lib/types";

interface MonthlyPublisherTabProps {
  onOpenPublisherModal: () => void;
  onEditIssue: (issue: ExtendedMagazineIssue) => void;
  onNavigateToVault: () => void;
}

export const MonthlyPublisherTab: React.FC<MonthlyPublisherTabProps> = ({
  onOpenPublisherModal,
  onEditIssue,
  onNavigateToVault,
}) => {
  const { currentEdition, currentIssue, issues, availableVolumes } = useEditorialData();
  const archivedIssues = issues.filter((i) => !i.isCurrent);

  const currentFeatures = currentIssue?.features || [
    "Florida Championship Preview",
    "Streamsong Resort Masterclass",
    "Turf Agronomy Summer Protocols",
    "Bespoke Clubmaking & Crafts",
  ];

  return (
    <div className="space-y-8 font-sans animate-fadeIn">
      {/* Top Banner: Active Monthly Magazine System */}
      <div className="bg-gradient-to-r from-[#0F3D2A] via-[#134E36] to-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Active Monthly Magazine Publishing &amp; Archiving Desk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Monthly Magazine Management
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Golf Central Magazine updates every month with new digital flipbooks, cover art, and featured stories.
              When you publish a new issue, the currently live edition is automatically archived and preserved in the searchable digital vault.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPublisherModal}
                className="px-6 py-3.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-sm uppercase tracking-wider flex items-center space-x-2 shadow-xl transition-transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Launch Monthly Publishing Wizard</span>
              </button>

              <button
                onClick={onNavigateToVault}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#D8B045]" />
                <span>Browse All {issues.length} Volume Archives</span>
              </button>
            </div>
          </div>

          {/* Right: Roll-over Status Widget */}
          <div className="lg:col-span-4 bg-[#071F16]/90 backdrop-blur-md rounded-2xl p-5 border border-[#C59B27]/30 space-y-4 shadow-xl">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Publishing Status</span>
              <Radio className="w-3 h-3 text-red-400 animate-pulse" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0F3D2A] border border-[#C59B27]/40 space-y-1">
                <div className="text-white/60 text-[10px] uppercase font-semibold">
                  Currently Live on Website
                </div>
                <div className="font-extrabold text-white text-sm">
                  Vol {currentIssue?.volume} • Issue {currentIssue?.issue}
                </div>
                <div className="text-[#D8B045] text-xs">{currentIssue?.date}</div>
              </div>

              <div className="text-center text-[11px] text-white/50 py-0.5">
                ↓ Auto-archives into vault on next release ↓
              </div>

              <div className="p-3 rounded-xl bg-[#134E36]/60 border border-[#C59B27]/40 flex items-center justify-between">
                <div>
                  <div className="text-[#D8B045] text-[10px] uppercase font-bold">
                    Next Month Scheduled
                  </div>
                  <div className="font-bold text-white">
                    Vol {currentIssue?.volume} Issue {currentIssue ? currentIssue.issue + 1 : 7}
                  </div>
                </div>
                <button
                  onClick={onOpenPublisherModal}
                  className="px-3 py-1.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-[10px] uppercase rounded-lg shadow"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Live Magazine Spotlight & Quick Monthly Roll-over Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left: Current Live Magazine Cover & Details (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F3D2A] border border-[#C59B27]/30 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Active Live Cover Edition
                </h3>
              </div>
              <span className="text-xs font-bold text-[#D8B045] bg-[#071F16] px-3 py-1 rounded-full border border-[#C59B27]/30">
                Vol {currentIssue?.volume} • Issue {currentIssue?.issue}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Cover Thumbnail */}
              <div className="sm:col-span-5 relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#C59B27]/50 shadow-2xl bg-[#071F16] group">
                {currentIssue?.coverImage && (
                  <Image
                    src={currentIssue.coverImage}
                    alt={currentIssue.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                )}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">
                  {currentIssue?.pageCount} Pages
                </div>
              </div>

              {/* Details */}
              <div className="sm:col-span-7 space-y-3">
                <div>
                  <div className="text-xs font-bold text-[#D8B045] uppercase">
                    {currentIssue?.date}
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {currentIssue?.title}
                  </h4>
                  <p className="text-xs text-white/70 italic mt-0.5">{currentIssue?.theme}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] uppercase font-bold text-white/60 tracking-wider">
                    Stories Highlighted in this Issue
                  </div>
                  <ul className="space-y-1 text-xs text-white/80">
                    {currentFeatures.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-[#D8B045] font-bold shrink-0">•</span>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentIssue?.editorNote && (
                  <div className="p-3 rounded-xl bg-[#071F16] border border-white/10 text-xs text-white/70 italic">
                    &quot;{currentIssue.editorNote}&quot;
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => currentIssue && onEditIssue(currentIssue)}
                className="px-4 py-2 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Live Details</span>
              </button>

              <button
                onClick={onOpenPublisherModal}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#D8B045]" />
                <span>Publish Next Issue</span>
              </button>
            </div>

            {currentIssue?.issuuUrl && (
              <a
                href={currentIssue.issuuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white flex items-center space-x-1 transition-colors"
              >
                <span>Read Digital Flipbook</span>
                <ExternalLink className="w-3 h-3 text-[#D8B045]" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Next Month Publishing Roll-Over Guide (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-2">
              <div className="flex items-center space-x-2 min-w-0">
                <Calendar className="w-4 h-4 text-[#D8B045] shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap truncate">
                  Monthly Roll-Over Guide
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-[#D8B045] bg-[#071F16] px-2.5 py-1 rounded-full border border-white/10 shrink-0 whitespace-nowrap">
                1-Click Auto
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="font-bold text-white">Enter New Month Information</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    Set Volume, Issue number, month/year, cover title, and Issuu digital flipbook URL.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="font-bold text-white">Upload New Month Cover Photo</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    High-resolution portrait cover image (JPG/PNG). Instant live thumbnail preview.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div className="font-bold text-white">Click Publish &amp; Go Live</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    The previous issue (Vol {currentIssue?.volume} Issue {currentIssue?.issue}) automatically moves to the digital archive vault.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <button
              onClick={onOpenPublisherModal}
              className="w-full py-3.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Open Monthly Publisher Wizard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical Volume Archive Preview Shelf */}
      <div className="bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Permanent Volume Archive Vault ({issues.length} Issues)
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              All previously published monthly issues are automatically saved here for readers to browse.
            </p>
          </div>

          <button
            onClick={onNavigateToVault}
            className="text-xs font-bold text-[#D8B045] hover:text-white flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open Complete Issue Archive Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {issues.slice(0, 4).map((issue) => (
            <div
              key={`${issue.volume}-${issue.issue}`}
              className="bg-[#071F16] border border-white/10 hover:border-[#C59B27] rounded-2xl overflow-hidden transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[3/4] w-full bg-[#04120D] overflow-hidden">
                {issue.coverImage && (
                  <Image
                    src={issue.coverImage}
                    alt={issue.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                )}
                {issue.isCurrent ? (
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#C59B27] text-[#0B291D] font-bold text-[10px] uppercase shadow">
                    Live Active
                  </div>
                ) : (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold">
                    Archived
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
                  {issue.pageCount} pgs
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#D8B045] font-semibold uppercase">
                    Vol {issue.volume} • Issue {issue.issue} • {issue.date}
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#D8B045] transition-colors">
                    {issue.title}
                  </h4>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1">{issue.theme}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onEditIssue(issue)}
                    className="text-[#D8B045] hover:text-white font-semibold"
                  >
                    Edit
                  </button>
                  {issue.issuuUrl && (
                    <a
                      href={issue.issuuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white font-medium flex items-center space-x-1"
                    >
                      <span>Flipbook</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
