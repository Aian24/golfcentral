"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Edit,
  Trash2,
  Archive,
  Star,
  Send,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { ExtendedMagazineIssue } from "@/lib/types";

interface IssueManagerTabProps {
  onOpenPublisherModal: () => void;
  onEditIssue: (issue: ExtendedMagazineIssue) => void;
  onInspectIssue: (issueNum: number) => void;
  onAddNewHistoricalIssue: () => void;
}

export const IssueManagerTab: React.FC<IssueManagerTabProps> = ({
  onOpenPublisherModal,
  onEditIssue,
  onInspectIssue,
  onAddNewHistoricalIssue,
}) => {
  const { issues, availableVolumes, setIssueLive, archiveIssue, deleteIssue } =
    useEditorialData();

  const [selectedVol, setSelectedVol] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "current" | "archived" | "draft">("all");

  const filteredIssues = issues.filter((issue) => {
    const matchesVol = selectedVol === "all" || issue.volume === selectedVol;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "current" && (issue.isCurrent || issue.status === "current")) ||
      (statusFilter === "archived" && !issue.isCurrent && issue.status !== "draft") ||
      (statusFilter === "draft" && issue.status === "draft");

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      issue.title.toLowerCase().includes(query) ||
      issue.theme.toLowerCase().includes(query) ||
      issue.date.toLowerCase().includes(query) ||
      `vol ${issue.volume}`.includes(query) ||
      `issue ${issue.issue}`.includes(query);

    return matchesVol && matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6 font-sans animate-fadeIn">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>25+ Years Historical Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Digital Magazine Shelf &amp; Archive Management
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Manage live editions, organize historical volumes, and customize digital flipbooks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onAddNewHistoricalIssue}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-[#D8B045]" />
            <span>Add Back-Issue</span>
          </button>

          <button
            onClick={onOpenPublisherModal}
            className="px-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            <span>Publish New Monthly Issue</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-4 space-y-4 shadow-lg">
        {/* Volume Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider mr-1 shrink-0">
            Volumes:
          </span>
          <button
            onClick={() => setSelectedVol("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              selectedVol === "all"
                ? "bg-[#C59B27] text-[#0B291D] shadow"
                : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            All Volumes ({issues.length})
          </button>
          {availableVolumes.map((vol) => (
            <button
              key={vol}
              onClick={() => setSelectedVol(vol)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                selectedVol === vol
                  ? "bg-[#C59B27] text-[#0B291D] shadow"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Volume {vol}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-white/10">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by issue title, theme, date, or number..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white placeholder-white/40 text-xs focus:border-[#C59B27] focus:outline-none"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5 pointer-events-none" />
          </div>

          <div className="sm:col-span-4 flex items-center space-x-2">
            <span className="text-xs text-white/60 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="current">Current Live Issue</option>
              <option value="archived">Archived Back Issues</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIssues.map((issue) => (
          <div
            key={`${issue.volume}-${issue.issue}`}
            className={`bg-[#0F3D2A] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
              issue.isCurrent
                ? "border-[#C59B27] ring-2 ring-[#C59B27]/40"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {/* Top Cover Section */}
            <div className="relative aspect-[3/4] w-full bg-[#071F16] overflow-hidden">
              {issue.coverImage ? (
                <Image
                  src={issue.coverImage}
                  alt={issue.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                  No Cover Image
                </div>
              )}

              {/* Status Badge */}
              {issue.isCurrent ? (
                <div className="absolute top-3 left-3 bg-[#C59B27] text-[#0B291D] font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Live Current Issue</span>
                </div>
              ) : (
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white/90 font-semibold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Archived
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">
                {issue.pageCount} Pages
              </div>
            </div>

            {/* Content & Actions */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-[#D8B045] uppercase tracking-wider mb-1">
                  Vol {issue.volume} • Issue {issue.issue} • {issue.date}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#D8B045] transition-colors leading-snug line-clamp-2">
                  {issue.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 line-clamp-2">{issue.theme}</p>
              </div>

              {/* Features List */}
              {issue.features && issue.features.length > 0 && (
                <div className="pt-2 border-t border-white/10 text-[11px] text-white/70 line-clamp-2">
                  <strong className="text-white/90">Features: </strong>
                  {issue.features.join(" • ")}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onEditIssue(issue)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#D8B045]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => onInspectIssue(issue.issue)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#D8B045]" />
                    <span>Preview</span>
                  </button>
                </div>

                {!issue.isCurrent && (
                  <button
                    onClick={() => setIssueLive(issue.volume, issue.issue)}
                    className="w-full py-2 rounded-xl bg-[#C59B27]/20 hover:bg-[#C59B27] text-[#D8B045] hover:text-[#0B291D] border border-[#C59B27]/40 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Promote to Live Edition</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-16 bg-[#0F3D2A] rounded-2xl border border-white/10 text-white/60 space-y-3">
          <BookOpen className="w-12 h-12 mx-auto text-white/30" />
          <p className="text-base font-semibold text-white">No issues found matching your filters</p>
          <p className="text-xs max-w-md mx-auto">
            Try adjusting your search terms or volume filters, or publish a new monthly edition.
          </p>
        </div>
      )}
    </div>
  );
};
