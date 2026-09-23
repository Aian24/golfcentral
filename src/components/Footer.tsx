"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  BookOpen,
  ExternalLink,
  Award,
  Compass,
  Building2,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenIssue: (issueNum?: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenIssue,
}) => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#0B291D] text-white border-t border-[#176043]">
      {/* Top Banner: Magazine Showcase & Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-b border-white/10 bg-[#0F3D2A]/70 py-6 sm:py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Heritage Badge */}
          <div className="flex items-center space-x-4">
            <div className="relative h-10 sm:h-12 w-40 sm:w-48">
              <Image
                src={SITE_INFO.officialLogo}
                alt="Golf Central Magazine"
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left"
              />
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
              <Image
                src={SITE_INFO.official25YearsBadge}
                alt="25 Years Badge"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[11px] font-bold text-[#D8B045] uppercase tracking-wider">
                Volume 27 • Issue 6
              </div>
              <div className="text-[11px] text-white/60">
                Florida&apos;s Voice of Golf Since 1999
              </div>
            </div>
          </div>

          {/* Quick Reader CTA & Back to Top */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => onOpenIssue(6)}
              className="px-5 py-2.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Digital Flipbook</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white hover:text-[#D8B045] transition-colors border border-white/10"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {/* Column 1: Editorial Headquarters & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#C59B27]" />
              <span>Editorial Headquarters</span>
            </div>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Golf Central Magazine has been published monthly by Terrie Purdum for over 25 years, serving golfers, course superintendents, and resort travelers across Florida and the Southeast.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                <MapPin className="w-4 h-4 text-[#D8B045] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-white/50 uppercase font-semibold">Address</div>
                  <div className="text-xs text-white/90 font-medium">{SITE_INFO.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="flex items-center space-x-2.5 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#C59B27]/50 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D8B045] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-white/50 uppercase font-semibold">Direct Desk</div>
                    <div className="text-xs text-white/90 font-medium truncate">{SITE_INFO.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="flex items-center space-x-2.5 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#C59B27]/50 hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D8B045] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-white/50 uppercase font-semibold">Email Desk</div>
                    <div className="text-xs text-white/90 font-medium truncate">{SITE_INFO.email}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Site Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#C59B27]" />
              <span>Publication</span>
            </div>

            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { label: "Home Showcase", tab: "home" },
                { label: "About Us (Our Staff)", tab: "staff" },
                { label: "Advertising & Media Kit", tab: "advertising" },
                { label: "Ad Technical Specifications", tab: "adspec" },
                { label: "Tournament & Course Nominations", tab: "nomination" },
                { label: "Contact Editorial Board", tab: "contact" },
                { label: "Fairway Dispatch Newsletter", tab: "newsletter" },
              ].map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => onNavigateTab(item.tab)}
                    className="hover:text-[#D8B045] flex items-center space-x-2 transition-colors group text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C59B27] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Digital Magazine Archive (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#C59B27]" />
              <span>Digital Archive</span>
            </div>

            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { label: "Vol 27 • Issue 6 (Current)", num: 6 },
                { label: "Vol 27 • Issue 4", num: 4 },
                { label: "Vol 27 • Issue 3 (Plantation)", num: 3 },
                { label: "Vol 27 • Issue 2 (Hammock)", num: 2 },
                { label: "Vol 27 • Issue 1 (Rumbling)", num: 1 },
              ].map((iss) => (
                <li key={iss.num}>
                  <button
                    onClick={() => onOpenIssue(iss.num)}
                    className="hover:text-[#D8B045] flex items-center space-x-2 transition-colors group text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C59B27] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    <span>{iss.label}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="https://golfcentralmag.com/issue-archive/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D8B045] hover:underline inline-flex items-center space-x-1.5 font-semibold"
                >
                  <span>25-Year Issuu Vault</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Industry Affiliations & Credentials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>Industry Affiliates</span>
            </div>

            <p className="text-xs text-white/75 leading-relaxed">
              Proud official media partners supporting professional agronomy, resort tourism, and military veteran charity foundations across Florida.
            </p>

            {/* Affiliate Badge Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/85 flex items-center space-x-1.5">
                <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
                <span>PGA of America</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/85 flex items-center space-x-1.5">
                <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
                <span>GCSAA Affiliate</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/85 flex items-center space-x-1.5">
                <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
                <span>Florida Golf Trail</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/85 flex items-center space-x-1.5">
                <ShieldCheck className="w-3 h-3 text-[#D8B045]" />
                <span>Folds of Honor</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-[#D8B045] font-semibold flex items-center justify-between">
              <span>ISSN 1530-8960</span>
              <span className="text-white/60">Vol. XXVII • 12 Editions/Yr</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-[#071F15] border-t border-white/10 py-5 text-xs text-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Golf Central Magazine. All rights reserved. 4313 Berwick Dr., Lake Wales, FL 33859.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://golfcentralmag.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D8B045] transition-colors"
            >
              Official Web Portal
            </a>
            <span>•</span>
            <a
              href="https://golfcentralmag.com/advertising/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D8B045] transition-colors"
            >
              Advertising Terms
            </a>
            <span>•</span>
            <button
              onClick={() => onNavigateTab("staff")}
              className="hover:text-[#D8B045] transition-colors"
            >
              Masthead
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
