"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Send,
  PlusCircle,
  ExternalLink,
  Radio,
  ChevronRight,
} from "lucide-react";
import { AdminTab } from "./AdminSidebar";
import { useEditorialData } from "@/context/EditorialDataContext";

interface AdminTopBarProps {
  activeTab: AdminTab;
  onOpenPublisherModal: () => void;
  onToggleMobileSidebar: () => void;
}

const TAB_TITLES: Record<AdminTab, { title: string; category: string }> = {
  publisher: { title: "Monthly Issues", category: "Active Workspace" },
  issues: { title: "Volume Archives", category: "Active Workspace" },
  about_dev: { title: "About Us", category: "Phase 2 Preview" },
  issues_dev: { title: "Volume Archives", category: "Phase 2 Preview" },
  dashboard_dev: { title: "Dashboard", category: "Phase 2 Preview" },
  articles_dev: { title: "Articles Desk", category: "Phase 2 Preview" },
  theme_dev: { title: "Theme Studio", category: "Phase 2 Preview" },
  inspector_dev: { title: "Flipbook Reader", category: "Phase 2 Preview" },
  settings_dev: { title: "Site Settings", category: "Phase 2 Preview" },
  advertising_dev: { title: "Media Kit", category: "Phase 2 Preview" },
  adspec_dev: { title: "Ad Specs", category: "Phase 2 Preview" },
  nomination_dev: { title: "Nominations", category: "Phase 2 Preview" },
  agronomy_dev: { title: "Turf Agronomy", category: "Phase 2 Preview" },
  lifestyle_dev: { title: "Lifestyle", category: "Phase 2 Preview" },
  philanthropy_dev: { title: "Military Honors", category: "Phase 2 Preview" },
  newsletter_dev: { title: "Subscribers", category: "Phase 2 Preview" },
};

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  activeTab,
  onOpenPublisherModal,
  onToggleMobileSidebar,
}) => {
  const { currentEdition } = useEditorialData();

  const info = TAB_TITLES[activeTab] || { title: "Dashboard", category: "Admin" };

  return (
    <header className="w-full bg-[#071F16]/90 backdrop-blur-md border-b border-[#C59B27]/30 text-white sticky top-0 z-30 font-sans shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Breadcrumb */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold tracking-tight truncate">
              <span className="text-white/50 text-[10px] sm:text-xs font-semibold uppercase tracking-wider shrink-0">
                EDITORIAL SUITE
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D8B045] shrink-0" />
              <h1 className="text-xs sm:text-sm font-bold text-[#D8B045] uppercase tracking-wider truncate">
                {info.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Live Edition Pill & Primary Action */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0F3D2A] border border-[#C59B27]/40 text-xs">
            <Radio className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
            <span className="font-bold text-[#D8B045]">
              Vol {currentEdition.volume} Issue {currentEdition.issue}
            </span>
          </div>

          <button
            onClick={onOpenPublisherModal}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md transform hover:-translate-y-0.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Publish Monthly Issue</span>
            <span className="sm:hidden">Publish</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden md:flex px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold items-center space-x-1.5 transition-colors shrink-0"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D8B045]" />
          </Link>
        </div>
      </div>
    </header>
  );
};
