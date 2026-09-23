"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, BookOpen, Menu, X, ArrowRight } from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";

interface NavbarProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenIssue: (issueNum?: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigateTab,
  onOpenSearch,
  onOpenIssue,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", value: "home" },
    { label: "About Us", value: "staff" },
    { label: "Advertising", value: "advertising" },
    { label: "Ad Spec", value: "adspec" },
    { label: "Nomination", value: "nomination" },
    { label: "Issue Archive", value: "archive" },
    { label: "Contact Us", value: "contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Clean Modern Navbar with Fairway Green & Champagne Gold Accent */}
      <nav
        className={`w-full bg-[#0F3D2A] text-white transition-all duration-300 shadow-md border-b border-[#176043] ${
          scrolled ? "py-2.5 shadow-xl bg-[#0F3D2A]/95 backdrop-blur-md" : "py-3 md:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Official Brand & 25 Years Badge */}
            <div
              onClick={() => onNavigateTab("home")}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none shrink-0 group"
            >
              {/* Crisp Official Logo Container */}
              <div className="relative h-9 sm:h-12 w-32 sm:w-48">
                <Image
                  src={SITE_INFO.officialLogo}
                  alt="Golf Central Magazine"
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, 192px"
                  className="object-contain object-left group-hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Official 25th Anniversary Badge */}
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                <Image
                  src={SITE_INFO.official25YearsBadge}
                  alt="25th Anniversary"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Center: Modern Navigation Links with Glowing Champagne Active Line */}
            <div className="hidden lg:flex items-center space-x-1 sm:space-x-1.5">
              {navLinks.map((item) => {
                const isActive = activeTab === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => onNavigateTab(item.value)}
                    className={`relative h-10 px-3.5 py-2 flex items-center justify-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer rounded-lg hover:bg-white/5 ${
                      isActive
                        ? "text-[#D8B045] font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-2 right-2 h-[2.5px] bg-[#D8B045] rounded-full shadow-[0_0_8px_#D8B045,0_0_4px_#C59B27]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Search & Action Buttons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
              <button
                onClick={onOpenSearch}
                className="h-9 sm:h-10 px-2.5 sm:px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-2 transition-colors border border-white/15 whitespace-nowrap cursor-pointer"
                title="Search stories and archives"
              >
                <Search className="w-4 h-4 text-[#D8B045]" />
                <span className="hidden sm:inline">Search...</span>
              </button>

              <button
                onClick={() => onOpenIssue(6)}
                className="hidden sm:flex h-9 sm:h-10 px-4 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider items-center space-x-1.5 transition-all transform hover:-translate-y-0.5 shadow-md whitespace-nowrap cursor-pointer"
              >
                <span>Read Issue 6</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-xs bg-[#0F3D2A] text-white h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-[#176043]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="relative h-10 w-36">
                  <Image
                    src={SITE_INFO.officialLogo}
                    alt="Golf Central"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-9 w-9 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {navLinks.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      onNavigateTab(item.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left h-11 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center ${
                      activeTab === item.value
                        ? "bg-[#C59B27] text-[#0B291D]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    onOpenIssue(6);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full h-11 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 shadow"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Volume 27 Issue 6</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-1.5">
              <div className="font-semibold text-[#D8B045]">Lake Wales, FL Headquarters</div>
              <div>Phone: {SITE_INFO.phone}</div>
              <div>Email: {SITE_INFO.email}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
