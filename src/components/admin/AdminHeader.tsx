"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Send,
  BookOpen,
  FileText,
  Eye,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  PlusCircle,
  Radio,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";

export type AdminTab = "dashboard" | "publisher" | "issues" | "articles" | "inspector" | "settings";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublisherModal: () => void;
  onLogout: () => void;
  user: any;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenPublisherModal,
  onLogout,
  user,
}) => {
  const { currentEdition, siteInfo } = useEditorialData();

  const navItems: { id: AdminTab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "publisher", label: "Monthly Publisher", icon: Send },
    { id: "issues", label: "Issue Shelf & Archive", icon: BookOpen },
    { id: "articles", label: "Articles & Journal", icon: FileText },
    { id: "inspector", label: "Flipbook Previewer", icon: Eye },
    { id: "settings", label: "Site & Backups", icon: Settings },
  ];

  return (
    <header className="w-full bg-[#071F16] border-b border-[#C59B27]/30 text-white sticky top-0 z-40 shadow-xl font-sans">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-white/10 text-xs">
        {/* Left: Branding & Live Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-wide text-sm sm:text-base">
              GOLF CENTRAL
            </span>
            <span className="text-[#D8B045] font-semibold text-xs tracking-widest uppercase">
              EDITORIAL SUITE
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#134E36] border border-[#C59B27]/40 text-[11px] text-white">
            <Radio className="w-3 h-3 text-red-400 animate-pulse" />
            <span className="font-semibold text-[#D8B045]">
              LIVE NOW: Vol {currentEdition.volume} Issue {currentEdition.issue}
            </span>
            <span className="text-white/60">({currentEdition.season})</span>
          </div>
        </div>

        {/* Right: Quick CTA & Live Site & Logout */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenPublisherModal}
            className="px-3 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Publish Monthly Issue</span>
            <span className="sm:hidden">Publish</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <span className="hidden sm:inline">Live Website</span>
            <ExternalLink className="w-3 h-3 text-[#D8B045]" />
          </Link>

          <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-white/70 hover:text-red-300 border border-transparent hover:border-red-500/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#134E36] text-[#D8B045] border border-[#C59B27]/40 shadow-inner"
                    : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D8B045]" : "text-white/60"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
