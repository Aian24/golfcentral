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
      {/* Main Clean Modern Navbar (No top telemetry strip) */}
      <nav
        className={`w-full bg-[#0A251A] text-white transition-all duration-300 shadow-md ${
          scrolled ? "py-2.5 shadow-xl" : "py-3 md:py-4"
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
                  className="object-contain object-left group-hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Official 25th Anniversary Badge */}
              <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                <Image
                  src={SITE_INFO.official25YearsBadge}
                  alt="25th Anniversary"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Center: Modern Navigation Links with Glowing Active Line */}
            <div className="hidden lg:flex items-center space-x-1 sm:space-x-1.5">
              {navLinks.map((item) => {
                const isActive = activeTab === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => onNavigateTab(item.value)}
                    className={`relative h-10 px-3 py-2 flex items-center justify-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#D4B568] font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-[#D4B568] rounded-full shadow-[0_0_10px_#D4B568,0_0_5px_#BFA054] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Search & Action Buttons with Identical Heights (h-10 / 40px) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
              <button
                onClick={onOpenSearch}
                className="h-9 sm:h-10 px-2.5 sm:px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-2 transition-colors border border-white/15 whitespace-nowrap cursor-pointer"
                title="Search stories and archives"
              >
                <Search className="w-4 h-4 text-[#BFA054]" />
                <span className="hidden sm:inline">Search...</span>
              </button>

              <button
                onClick={() => onOpenIssue(6)}
                className="hidden sm:flex h-9 sm:h-10 px-4 rounded-xl bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A251A] font-bold text-xs uppercase tracking-wider items-center space-x-1.5 transition-all transform hover:-translate-y-0.5 shadow-md whitespace-nowrap cursor-pointer"
              >
                <span>Read Issue 6</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger (Identical h-9/h-10) */}
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
          <div className="w-full max-w-xs bg-[#0A251A] text-white h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-white/10">
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
                        ? "bg-[#BFA054] text-[#0A251A]"
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
                  className="w-full h-11 bg-[#BFA054] text-[#0A251A] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Volume 27 Issue 6</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-1.5">
              <div className="font-semibold text-[#D4B568]">Lake Wales, FL Headquarters</div>
              <div>Phone: {SITE_INFO.phone}</div>
              <div>Email: {SITE_INFO.email}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
