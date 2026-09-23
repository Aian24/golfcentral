"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Award, 
  Mail, 
  BookOpen, 
  CheckCircle, 
  RotateCw, 
  ArrowRight,
  ChevronRight,
  Users
} from "lucide-react";
import { STAFF_MEMBERS, StaffMember } from "@/data/editorialData";

interface FlipCardProps {
  member: StaffMember;
  index?: number;
}

const StaffFlipCard: React.FC<FlipCardProps> = ({ member, index = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="perspective-1000 w-full h-[400px] cursor-pointer group select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
          {/* Photo Container */}
          <div className="relative w-full h-52 bg-[#F3EFEA] overflow-hidden shrink-0">
            {!imgError && member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#134E36] to-[#0F3D2A] text-white p-4 text-center">
                <span className="text-3xl font-bold text-[#D8B045]">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
                <span className="text-xs text-white/80 mt-1 font-medium truncate max-w-full">{member.role}</span>
              </div>
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            {/* Top Badge (Single Clean Pill - Zero Wrapping) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#D8B045] text-[11px] font-bold tracking-wider uppercase border border-[#C59B27]/40 truncate max-w-[85%] whitespace-nowrap shadow-sm">
                {member.badge || member.category}
              </span>
            </div>

            {/* Bottom Photo Overlay Info (Single Line with Truncate) */}
            <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
              <h4 className="text-lg font-bold tracking-tight text-white drop-shadow-md truncate whitespace-nowrap">
                {member.name}
              </h4>
              <p className="text-xs text-[#E8C86D] font-medium drop-shadow truncate whitespace-nowrap">
                {member.role}
              </p>
            </div>
          </div>

          {/* Front Content Body */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white">
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-[#134E36] uppercase tracking-wider">
                Key Background &amp; Highlights:
              </div>
              <div className="space-y-1.5">
                {member.highlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#334155]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                    <span className="truncate whitespace-nowrap font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flip Action Indicator Button */}
            <div className="pt-2.5 border-t border-[#F3EFEA] flex items-center justify-between">
              <span className="text-xs font-bold text-[#134E36] flex items-center space-x-1.5 whitespace-nowrap group-hover:text-[#176043]">
                <RotateCw className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Tap to Read Full Bio</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EBF7EE] text-[#134E36] group-hover:bg-[#134E36] group-hover:text-white text-xs font-bold transition-colors flex items-center space-x-1 whitespace-nowrap">
                <span>Bio</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden bg-gradient-to-br from-[#0F3D2A] via-[#134E36] to-[#0B291D] text-white rounded-2xl p-5 shadow-xl border border-[#C59B27]/40 flex flex-col justify-between overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C59B27]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Back Header */}
          <div className="relative z-10 border-b border-white/10 pb-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27] text-[#0B291D] text-[10px] font-bold uppercase tracking-wider truncate whitespace-nowrap">
                {member.badge || "Editorial Team"}
              </span>
              <button 
                type="button"
                aria-label="Flip card back"
                className="text-xs text-white/70 hover:text-white flex items-center space-x-1 p-1 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                <RotateCw className="w-3 h-3 text-[#D8B045]" />
                <span className="text-[10px]">Flip Back</span>
              </button>
            </div>
            <h4 className="text-base font-bold text-white mt-1.5 tracking-tight truncate whitespace-nowrap">
              {member.name}
            </h4>
            <p className="text-xs text-[#D8B045] font-medium truncate whitespace-nowrap">
              {member.role}
            </p>
          </div>

          {/* Back Bio Body with Scrollbar */}
          <div className="relative z-10 my-2.5 flex-1 overflow-y-auto pr-1 space-y-2 text-xs text-white/90 leading-relaxed scrollbar-thin">
            {member.quote && (
              <p className="text-[11px] text-[#FAF4E5] italic bg-black/25 p-2 rounded-lg border-l-2 border-[#C59B27] leading-relaxed">
                &ldquo;{member.quote}&rdquo;
              </p>
            )}
            <p className="text-xs text-white/85 leading-relaxed">{member.bio}</p>
            
            <div className="pt-2 space-y-1">
              <div className="text-[10px] font-bold text-[#D8B045] uppercase tracking-wider">
                Key Credentials:
              </div>
              {member.highlights.map((h, i) => (
                <div key={i} className="flex items-center space-x-1.5 text-[11px] text-white/80">
                  <CheckCircle className="w-3 h-3 text-[#C59B27] shrink-0" />
                  <span className="truncate whitespace-nowrap">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Footer Actions */}
          <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow truncate whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Email {member.name.split(" ")[0]}</span>
              </a>
            ) : (
              <div className="text-[11px] text-white/60 italic truncate whitespace-nowrap">
                Golf Central Masthead
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0"
            >
              <span>Back</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const StaffSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "All Team (13)" },
    { id: "Leadership & Editorial", label: "Leadership & Editorial" },
    { id: "Writers & Travel", label: "Writers & Travel" },
    { id: "Agronomy & Turf", label: "Agronomy & Turf" },
    { id: "PGA & Legacy", label: "PGA & Legacy" },
  ];

  const filteredMembers = activeCategory === "All"
    ? STAFF_MEMBERS
    : STAFF_MEMBERS.filter(m => m.category === activeCategory);

  const founder = STAFF_MEMBERS[0];

  return (
    <section id="our-staff" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EBF7EE] border border-[#C2E7D3] text-[#134E36] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Users className="w-3.5 h-3.5 text-[#134E36]" />
            <span>About Us • Editorial Masthead</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            Meet the Editorial Team Behind Golf Central
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            For more than 25 years, Golf Central Magazine has been guided by visionary journalists, certified course superintendents, PGA professionals, former athletes, and military veterans dedicated to growing the great game across Florida and the Southeast.
          </p>
        </motion.div>

        {/* Founder & Publisher Spotlight Featured Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#0F3D2A] via-[#134E36] to-[#0B291D] text-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-[#C59B27]/30 mb-14 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Founder Headshot + Info */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-5 text-center sm:text-left lg:text-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#C59B27] shadow-2xl shrink-0 bg-[#0B291D]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C59B27] text-[#0B291D] text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Founder &amp; Publisher</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {founder.name}
                </h3>
                <p className="text-xs text-[#D8B045] font-medium mt-0.5">
                  Publisher • Founded in 1999
                </p>
                <a
                  href={`mailto:${founder.email}`}
                  className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D8B045]" />
                  <span>{founder.email}</span>
                </a>
              </div>
            </div>

            {/* Founder Story & Mission */}
            <div className="lg:col-span-8 space-y-4">
              <blockquote className="text-base sm:text-lg text-white/95 italic font-normal leading-relaxed border-l-3 border-[#C59B27] pl-4 my-2">
                &ldquo;Growing the great game of golf, giving young and beginner golfers a sense of comfort on the course. Publishing charity golf events, and giving sponsors the recognition they deserve for participating in tournaments that make a difference. Anything to support ANY military golf events and showing gratitude for the men and women dedicated to serving our country.&rdquo;
              </blockquote>
              
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Making golf fun, being a rebel visionary with a very traditional game, and assisting the PGA and GCSAA in getting consumers educated in the ONLY regional Golf Magazine to survive in the South since 1999.
              </p>

              {/* Milestones grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#D8B045]">27</div>
                  <div className="text-[11px] text-white/70">Annual Volumes</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#D8B045]">1999</div>
                  <div className="text-[11px] text-white/70">Founded Year</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#D8B045]">100%</div>
                  <div className="text-[11px] text-white/70">PGA &amp; GCSAA Partner</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#D8B045]">25+ Yrs</div>
                  <div className="text-[11px] text-white/70">Military Charity</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs & Count */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">
              Editorial Masthead &amp; Contributors
            </h3>
            <p className="text-xs text-[#64748B]">
              Hover or tap any card to flip and read complete biographical profiles and credentials.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#134E36] text-white shadow-md"
                    : "bg-white text-[#475569] hover:bg-[#EBF7EE] hover:text-[#134E36] border border-[#EAE3D9]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member, idx) => (
            <StaffFlipCard key={member.id} member={member} index={idx} />
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 p-6 rounded-2xl bg-white border border-[#EAE3D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF4E5] border border-[#F3DE9F] flex items-center justify-center text-[#C59B27] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">
                Interested in contributing or submitting editorial pitches?
              </h4>
              <p className="text-xs text-[#64748B]">
                Reach out to our Lake Wales editorial desk or send manuscripts directly to our team.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-[#134E36] hover:bg-[#176043] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0"
          >
            Contact Editorial Desk
          </a>
        </motion.div>

      </div>
    </section>
  );
};
