"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp, BookOpen, ExternalLink } from "lucide-react";
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
    <footer className="w-full bg-[#0F3D2A] text-white border-t border-[#176043]">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-b border-white/10 py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-48">
              <Image
                src={SITE_INFO.officialLogo}
                alt="Golf Central Magazine"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-10 w-10">
              <Image
                src={SITE_INFO.official25YearsBadge}
                alt="25 Years Badge"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenIssue(6)}
              className="px-5 py-2.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2 shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Issue 6 Digital Edition</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Col 1 & 2: Editorial Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              EDITORIAL HEADQUARTERS
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm">
              Golf Central Magazine has been published monthly by Terrie Purdum for over 25 years, serving golfers, course superintendents, and resort travelers across Florida and the Southeast.
            </p>

            <div className="space-y-2.5 text-xs text-white/80 pt-2">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>{SITE_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href={`tel:${SITE_INFO.phone}`} className="hover:text-[#D8B045] transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-[#D8B045] transition-colors">
                  {SITE_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Main Site Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              PUBLICATION
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onNavigateTab("home")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("staff")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  About Us (Our Staff)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("advertising")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Advertising &amp; Media Kit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("adspec")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Ad Technical Specifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("nomination")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Tournament &amp; Course Nominations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("contact")}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Contact Editorial Board
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Digital Archive */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              DIGITAL ARCHIVE
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onOpenIssue(6)}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Volume 27 Issue 6 (Current)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenIssue(4)}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Volume 27 Issue 4
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenIssue(3)}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Volume 27 Issue 3 (Plantation Bay)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenIssue(2)}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Volume 27 Issue 2 (Hammock Beach)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenIssue(1)}
                  className="hover:text-[#D8B045] transition-colors"
                >
                  Volume 27 Issue 1 (Rumbling Bald)
                </button>
              </li>
              <li>
                <a
                  href="https://golfcentralmag.com/issue-archive/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D8B045] hover:underline inline-flex items-center space-x-1 pt-1"
                >
                  <span>Issuu 25-Year Vault</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Affiliations */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
              INDUSTRY AFFILIATES
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Proud media partners with the PGA of America, GCSAA (Golf Course Superintendents Association of America), Florida Golf Trail, and military veteran charity foundations.
            </p>
            <div className="pt-2 text-xs text-[#D8B045]">
              ISSN 1530-8960 • Vol. XXVII
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0B291D] border-t border-white/5 py-5 text-center text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            &copy; {new Date().getFullYear()} Golf Central Magazine. All rights reserved. 4313 Berwick Dr., Lake Wales, FL 33859.
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://golfcentralmag.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Official Portal
            </a>
            <span>•</span>
            <a href="https://golfcentralmag.com/advertising/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Advertising Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
