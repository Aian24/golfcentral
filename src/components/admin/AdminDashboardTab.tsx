"use client";

import React from "react";
import Image from "next/image";
import {
  Send,
  BookOpen,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle2,
  Archive,
  Radio,
  Calendar,
  FileCheck,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { AdminTab } from "./AdminSidebar";

interface AdminDashboardTabProps {
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublisherModal: () => void;
  onEditIssue: (issue: any) => void;
  onEditArticle?: (article: any) => void;
  onInspectIssue: (issueNum: number) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  onSelectTab,
  onOpenPublisherModal,
  onEditIssue,
  onInspectIssue,
}) => {
  const { currentEdition, currentIssue, issues, availableVolumes } = useEditorialData();

  const archivedIssuesCount = issues.filter((i) => !i.isCurrent).length;
  const currentFeatures = currentIssue?.features || [
    "Florida Championship Preview",
    "Streamsong Resort Masterclass",
    "Turf Agronomy Summer Protocols",
    "Bespoke Clubmaking & Crafts",
  ];

  return (
    <div className="space-y-8 font-sans animate-fadeIn">
      {/* Top Welcome & Monthly Magazine Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Active Live Issue */}
        <div className="bg-[#0F3D2A] border border-[#C59B27]/40 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C59B27]/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-[#D8B045] font-bold uppercase tracking-wider mb-2">
              <span className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Live Active Edition</span>
              </span>
              <span>Vol {currentEdition.volume}</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Issue {currentEdition.issue}
            </h3>
            <p className="text-xs text-white/80 mt-1 line-clamp-1">{currentEdition.season}</p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-white/60">{currentIssue?.date}</span>
            <button
              onClick={() => onEditIssue(currentIssue)}
              className="text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1"
            >
              <span>Edit Live Issue</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Digital Archive Vault */}
        <div className="bg-[#0F3D2A] border border-white/15 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#D8B045] font-bold uppercase tracking-wider mb-2">
              <span>Archive Vault</span>
              <Layers className="w-4 h-4 text-[#D8B045]" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {issues.length} Issues
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Across {availableVolumes.length} Volumes ({archivedIssuesCount} Archived)
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-white/60">Historical Back-Issues</span>
            <button
              onClick={() => onSelectTab("issues")}
              className="text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1"
            >
              <span>Browse Vault</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Monthly Highlights */}
        <div className="bg-[#0F3D2A] border border-white/15 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#D8B045] font-bold uppercase tracking-wider mb-2">
              <span>Monthly Stories</span>
              <FileCheck className="w-4 h-4 text-[#D8B045]" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {currentFeatures.length} Featured
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Cover stories in Vol {currentEdition.volume} Issue {currentEdition.issue}
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-white/60">{currentIssue?.pageCount || 68} Pages</span>
            <button
              onClick={() => onEditIssue(currentIssue)}
              className="text-[#D8B045] hover:text-white font-semibold flex items-center space-x-1"
            >
              <span>View Features</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Next Month Release */}
        <div className="bg-gradient-to-br from-[#134E36] to-[#0B291D] border border-[#C59B27]/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#D8B045] font-bold uppercase tracking-wider mb-2">
              <span>Next Release</span>
              <Calendar className="w-4 h-4 text-[#D8B045]" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Vol {currentEdition.volume} Issue {currentEdition.issue + 1}
            </h3>
            <p className="text-xs text-white/80 mt-1">Ready for monthly roll-over</p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4">
            <button
              onClick={onOpenPublisherModal}
              className="w-full py-2 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Next Issue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Section: Monthly Publishing & Archiving Workflow Banner */}
      <div className="bg-gradient-to-r from-[#0F3D2A] via-[#134E36] to-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider">
              <Archive className="w-3.5 h-3.5" />
              <span>Monthly Content Cycle &amp; Auto-Archiving</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Monthly Magazine Publishing Suite
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Golf Central Magazine updates every month with new digital flipbooks, cover photography, and resort features.
              When you publish a new issue, the currently active edition is automatically archived and preserved in the searchable digital vault.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPublisherModal}
                className="px-6 py-3 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-sm uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Launch Monthly Publishing Wizard</span>
              </button>

              <button
                onClick={() => onSelectTab("issues")}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#D8B045]" />
                <span>Browse All Volume Archives ({issues.length})</span>
              </button>
            </div>
          </div>

          {/* Right: Monthly Transition Status */}
          <div className="lg:col-span-4 bg-[#071F16]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 space-y-4">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider border-b border-white/10 pb-2">
              Monthly Roll-Over Status
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-white/60 text-[10px] uppercase">Current Live Edition</div>
                  <div className="font-bold text-white">
                    Vol {currentIssue?.volume} Issue {currentIssue?.issue}
                  </div>
                  <div className="text-white/70 text-[11px]">{currentIssue?.date}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#C59B27] text-[#0B291D] font-bold text-[10px] uppercase">
                  Live Active
                </span>
              </div>

              <div className="flex items-center justify-center text-white/50 text-[11px] py-0.5">
                <span>↓ Auto-migrates to Archive on Publish ↓</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#134E36]/50 border border-[#C59B27]/40">
                <div>
                  <div className="text-[#D8B045] text-[10px] uppercase font-bold">
                    Next Monthly Release
                  </div>
                  <div className="font-bold text-white">
                    Vol {currentIssue?.volume} Issue {currentIssue ? currentIssue.issue + 1 : 7}
                  </div>
                  <div className="text-white/70 text-[11px]">Next Month Ready</div>
                </div>
                <button
                  onClick={onOpenPublisherModal}
                  className="px-2.5 py-1 rounded-full bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-[10px] uppercase transition-colors"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Live Issue Spotlight & Next Month Publishing Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left: Live Active Edition Spotlight (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F3D2A] border border-[#C59B27]/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Current Live Digital Magazine
                </h3>
              </div>
              <span className="text-xs font-bold text-[#D8B045] bg-[#071F16] px-3 py-1 rounded-full border border-[#C59B27]/30">
                Vol {currentIssue?.volume} • Issue {currentIssue?.issue}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              {/* Cover Image */}
              <div className="sm:col-span-5 relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#C59B27]/40 shadow-xl bg-[#071F16] group">
                {currentIssue?.coverImage && (
                  <Image
                    src={currentIssue.coverImage}
                    alt={currentIssue.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                )}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
                  {currentIssue?.pageCount} Pages
                </div>
              </div>

              {/* Details & Features */}
              <div className="sm:col-span-7 space-y-3">
                <div>
                  <div className="text-xs font-bold text-[#D8B045] uppercase">
                    {currentIssue?.date}
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {currentIssue?.title}: {currentIssue?.theme}
                  </h4>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] uppercase font-bold text-white/60 tracking-wider">
                    Featured Stories in This Issue
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
                onClick={() => onEditIssue(currentIssue)}
                className="px-4 py-2 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Edit Live Issue
              </button>

              <button
                onClick={() => onOpenPublisherModal()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#D8B045]" />
                <span>Roll Over to Next Month</span>
              </button>
            </div>

            {currentIssue?.issuuUrl && (
              <a
                href={currentIssue.issuuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white flex items-center space-x-1 transition-colors"
              >
                <span>Issuu Live Link</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Next Monthly Release Preparation & Auto-Archive Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#D8B045]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Monthly Publishing Steps
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#D8B045] bg-[#071F16] px-2.5 py-1 rounded-full border border-white/10">
                Monthly Cycle
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div className="font-bold text-white">Upload New Month Cover Image</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    High-res portrait format (PNG/JPG) for the digital flipbook cover.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div className="font-bold text-white">Set Volume, Issue &amp; Flipbook Link</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    Enter publication date, theme title, and Issuu flipbook URL.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[#071F16] border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-[#C59B27] text-[#0B291D] font-black text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div className="font-bold text-white">1-Click Publish &amp; Auto-Archive</div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    Live site updates immediately; past edition is archived automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <button
              onClick={onOpenPublisherModal}
              className="w-full py-3 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish New Month&apos;s Edition</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Issues Shelf in Archive */}
      <div className="bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Recent Digital Issues in Archive Vault
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              Showing active &amp; archived issues. Readers can browse all historical volumes on the live site.
            </p>
          </div>

          <button
            onClick={() => onSelectTab("issues")}
            className="text-xs font-bold text-[#D8B045] hover:text-white flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open Complete Issue Archive Vault ({issues.length})</span>
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
                  <button
                    onClick={() => onInspectIssue(issue.issue)}
                    className="text-white/70 hover:text-white font-medium"
                  >
                    Preview Reader
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

