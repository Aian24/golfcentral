"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Send,
  BookOpen,
  FileText,
  Palette,
  Eye,
  Settings,
  Users,
  Megaphone,
  Ruler,
  Award,
  Sprout,
  Compass,
  HeartHandshake,
  Mail,
  Bot,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldCheck,
  Radio,
  X,
  ChevronRight,
  Lock,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";

export type AdminTab =
  | "publisher"
  | "issues"
  | "dashboard_dev"
  | "articles_dev"
  | "theme_dev"
  | "inspector_dev"
  | "settings_dev"
  | "staff_dev"
  | "advertising_dev"
  | "adspec_dev"
  | "nomination_dev"
  | "agronomy_dev"
  | "lifestyle_dev"
  | "philanthropy_dev"
  | "newsletter_dev"
  | "ai_dev";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublisherModal: () => void;
  onLogout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  user: any;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenPublisherModal,
  onLogout,
  isOpenMobile,
  onCloseMobile,
  user,
}) => {
  const { currentEdition, siteInfo } = useEditorialData();

  // Active Monthly Magazine Management Navigation ONLY
  const activeMonthlyNav = [
    {
      id: "publisher",
      label: "Monthly Magazine Changes",
      icon: Send,
      badge: "Active",
      highlight: true,
    },
    {
      id: "issues",
      label: "Volume Archives & Vault",
      icon: BookOpen,
      badge: "25+ Yrs",
      highlight: true,
    },
  ];

  // All Other Modules Marked as Under Development
  const underDevNav = [
    { id: "dashboard_dev", label: "Executive Dashboard", icon: LayoutDashboard, badge: "Under Dev" },
    { id: "articles_dev", label: "Articles & Journal Desk", icon: FileText, badge: "Under Dev" },
    { id: "theme_dev", label: "Theme & Visual Styling", icon: Palette, badge: "Under Dev" },
    { id: "inspector_dev", label: "Flipbook Simulator", icon: Eye, badge: "Under Dev" },
    { id: "settings_dev", label: "Site Settings & Tickers", icon: Settings, badge: "Under Dev" },
    { id: "staff_dev", label: "Editorial Staff & Masthead", icon: Users, badge: "Under Dev" },
    { id: "advertising_dev", label: "Advertising Media Kit", icon: Megaphone, badge: "Under Dev" },
    { id: "adspec_dev", label: "Ad Dimensions & Specs", icon: Ruler, badge: "Under Dev" },
    { id: "nomination_dev", label: "Leader Nominations", icon: Award, badge: "Under Dev" },
    { id: "agronomy_dev", label: "Turf Agronomy Feature", icon: Sprout, badge: "Under Dev" },
    { id: "lifestyle_dev", label: "Lifestyle & Craft", icon: Compass, badge: "Under Dev" },
    { id: "philanthropy_dev", label: "Military Honors Desk", icon: HeartHandshake, badge: "Under Dev" },
    { id: "newsletter_dev", label: "VIP Newsletter Subscribers", icon: Mail, badge: "Under Dev" },
    { id: "ai_dev", label: "AI Concierge Assistant", icon: Bot, badge: "Under Dev" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-fadeIn"
        />
      )}

      {/* Left Fixed Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#071F16] border-r border-[#C59B27]/30 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out font-sans shadow-2xl ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F3D2A] border border-[#C59B27]/50 flex items-center justify-center shadow-inner shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D8B045]" />
              </div>
              <div>
                <div className="text-sm font-extrabold tracking-wider text-white">
                  GOLF CENTRAL
                </div>
                <div className="text-[10px] uppercase font-bold text-[#D8B045] tracking-widest">
                  EDITORIAL SUITE
                </div>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Live Edition Indicator */}
          <div className="mt-4 p-2.5 rounded-xl bg-[#0F3D2A]/80 border border-[#C59B27]/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Radio className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
              <div>
                <div className="text-[10px] uppercase text-white/60 font-semibold">Current Live Issue</div>
                <div className="font-bold text-[#D8B045]">
                  Vol {currentEdition.volume} • Issue {currentEdition.issue}
                </div>
              </div>
            </div>
            <button
              onClick={onOpenPublisherModal}
              className="px-2 py-1 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-[10px] uppercase rounded-lg shadow"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Scrollable Nav Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Section 1: Active Monthly Magazine Management */}
          <div className="space-y-1.5">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#D8B045] flex items-center space-x-1.5 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Active Monthly System</span>
            </div>
            {activeMonthlyNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id as AdminTab);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 group ${
                    isActive
                      ? "bg-[#134E36] text-[#D8B045] border border-[#C59B27]/40 shadow-inner font-bold"
                      : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#D8B045]" : "text-white/60 group-hover:text-white"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isActive
                          ? "bg-[#C59B27] text-[#0B291D]"
                          : "bg-[#C59B27]/20 text-[#D8B045] border border-[#C59B27]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 2: All Other Pages (Marked Under Development) */}
          <div className="space-y-1 pt-3 border-t border-white/10">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center justify-between">
              <span>Staged Features</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">
                Under Dev
              </span>
            </div>
            {underDevNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id as AdminTab);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors group ${
                    isActive
                      ? "bg-[#134E36]/80 text-[#D8B045] border border-[#C59B27]/30 font-bold"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 shrink-0" />
                    <span className="truncate text-[11px]">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-semibold text-white/40 px-1.5 py-0.5 rounded bg-black/40 border border-white/10 shrink-0">
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#04120D] shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C59B27] text-[#0B291D] font-bold text-xs flex items-center justify-center">
                TP
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {user?.username || "Terrie Purdum"}
                </div>
                <div className="text-[10px] text-[#D8B045] truncate">Publisher &amp; Superadmin</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/40 text-white/60 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-white/70 hover:text-white flex items-center space-x-1 transition-colors text-[11px]"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3 text-[#D8B045]" />
            </Link>

            <span className="text-[10px] text-white/40">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
