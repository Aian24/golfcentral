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
  publisher: { title: "Monthly Magazine Changes", category: "Active Monthly System" },
  issues: { title: "Volume Archives & Vault", category: "Active Monthly System" },
  issues_dev: { title: "Volume Archives & 25-Yr Vault", category: "Phase 2 Preview" },
  dashboard_dev: { title: "Executive Analytics Dashboard", category: "Phase 2 Preview" },
  articles_dev: { title: "Articles & Editorial Story Desk", category: "Phase 2 Preview" },
  theme_dev: { title: "Theme & Visual Styling Customizer", category: "Phase 2 Preview" },
  inspector_dev: { title: "Digital Flipbook Simulator", category: "Phase 2 Preview" },
  settings_dev: { title: "Site Settings & Backups", category: "Phase 2 Preview" },
  staff_dev: { title: "Editorial Staff & Masthead", category: "Phase 2 Preview" },
  advertising_dev: { title: "Advertising Media Kit Desk", category: "Phase 2 Preview" },
  adspec_dev: { title: "Ad Dimensions & Specifications", category: "Phase 2 Preview" },
  nomination_dev: { title: "Golf Leader Nominations", category: "Phase 2 Preview" },
  agronomy_dev: { title: "Turf Agronomy Showcase", category: "Phase 2 Preview" },
  lifestyle_dev: { title: "Clubhouse Lifestyle & Craft", category: "Phase 2 Preview" },
  philanthropy_dev: { title: "Military Honors & Philanthropy", category: "Phase 2 Preview" },
  newsletter_dev: { title: "VIP Newsletter Subscribers", category: "Phase 2 Preview" },
};

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  activeTab,
  onOpenPublisherModal,
  onToggleMobileSidebar,
}) => {
  const { currentEdition } = useEditorialData();
  const [dbStatus, setDbStatus] = React.useState<{ connected: boolean; provider: string } | null>(null);

  React.useEffect(() => {
    fetch("/api/db/status")
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch(() => setDbStatus({ connected: false, provider: "local_json" }));
  }, []);

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
            <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-semibold truncate">
              <span>EDITORIAL SUITE</span>
              <ChevronRight className="w-3 h-3 text-[#D8B045]" />
              <span className="text-[#D8B045]">{info.category}</span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
              {info.title}
            </h1>
          </div>
        </div>

        {/* Right: Live Edition Pill, DB Status, & Primary Action */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* DB Indicator */}
          <div
            title={
              dbStatus?.connected
                ? "Connected to Neon Serverless PostgreSQL"
                : "Using Local File Store. Add DATABASE_URL to .env.local to activate Neon Postgres."
            }
            className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
              dbStatus?.connected
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                : "bg-[#0F3D2A] border-white/20 text-white/70"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus?.connected ? "bg-emerald-400 animate-pulse" : "bg-[#D8B045]"
              }`}
            />
            <span>{dbStatus?.connected ? "Neon Postgres" : "Local Store (Neon Ready)"}</span>
          </div>

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
