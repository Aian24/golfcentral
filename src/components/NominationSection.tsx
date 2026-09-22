"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle,
  Check,
  Heart,
  ArrowRight,
  MapPin,
  UserCheck,
  X,
  Flame,
  HelpCircle,
} from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";
import { CustomDropdown } from "@/components/CustomDropdown";

const NOMINATION_CATEGORIES = [
  "Golf Course Superintendent of the Year (GCSAA Affiliate)",
  "Florida Resort Course of the Year",
  "Military & Veteran Charity Tournament of the Year",
  "Rising Junior Golfer Phenom",
  "Clubhouse Gastronomy & 19th Hole Excellence",
];

interface NomineeExample {
  id: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  category: string;
  categoryKey: string;
  image: string;
  initialVotes: number;
  badge: string;
  bio: string;
  highlight: string;
}

const FEATURED_NOMINEES: NomineeExample[] = [
  {
    id: "mark-henderson",
    name: "Mark Henderson, CGCS",
    title: "Head Certified Golf Course Superintendent",
    organization: "Oceanwoods Country Club",
    location: "Naples, FL",
    category: "Golf Course Superintendent of the Year (GCSAA Affiliate)",
    categoryKey: "superintendent",
    image: "/images/nominees/nominee_superintendent.jpg",
    initialVotes: 1248,
    badge: "GCSAA Affiliate Legend",
    bio: "Pioneered coastal salt-tolerant paspalum greens restoration and computerized sub-surface aeration after record Gulf storm surges.",
    highlight: "18-hole greens recovery in under 21 days with 0% turf loss.",
  },
  {
    id: "hammock-beach",
    name: "Hammock Beach: Ocean Course",
    title: "Jack Nicklaus Coastal Signature Course",
    organization: "Hammock Beach Golf Resort & Spa",
    location: "Palm Coast, FL",
    category: "Florida Resort Course of the Year",
    categoryKey: "resort",
    image: "/images/nominees/nominee_resort.jpg",
    initialVotes: 1185,
    badge: "Oceanfront Icon",
    bio: "Six breathtaking holes perched directly on the crashing Atlantic surf, hailed as Florida's most dramatic seaside championship test.",
    highlight: "Consecutive #1 ranking among Florida public coastal resorts.",
  },
  {
    id: "chloe-martinez",
    name: "Chloe Martinez (Age 16)",
    title: "State Junior Champion & USGA Qualifier",
    organization: "Florida Junior Tour / Lake Wales High",
    location: "Lake Wales, FL",
    category: "Rising Junior Golfer Phenom",
    categoryKey: "junior",
    image: "/images/nominees/nominee_junior.jpg",
    initialVotes: 942,
    badge: "Rising Phenom",
    bio: "Three-time Florida regional medalist with an average score of 69.4, leading junior golf clinics for underserved rural Florida youth.",
    highlight: "Youngest winner of the Central Florida Amateur Invitation.",
  },
  {
    id: "stars-stripes",
    name: "Stars & Stripes Patriot Invitational",
    title: "Annual Military & Veteran Charity Event",
    organization: "Sarasota Golf Club & Foundation",
    location: "Sarasota, FL",
    category: "Military & Veteran Charity Tournament of the Year",
    categoryKey: "military",
    image: "/images/nominees/nominee_military.jpg",
    initialVotes: 1410,
    badge: "Veteran Charity Champion",
    bio: "Raised over $480,000 for wounded veterans and adaptive golf programs, pairing combat heroes with PGA pros every Veterans Day.",
    highlight: "Over $1.8M gifted to wounded warrior adaptive mobility clinics.",
  },
  {
    id: "antoine-laurent",
    name: "Chef Antoine Laurent",
    title: "Executive Clubhouse Chef & Culinary Director",
    organization: "The Palmetto Club",
    location: "Vero Beach, FL",
    category: "Clubhouse Gastronomy & 19th Hole Excellence",
    categoryKey: "gastronomy",
    image: "/images/nominees/nominee_gastronomy.jpg",
    initialVotes: 875,
    badge: "19th Hole Master Chef",
    bio: "Elevated the 19th hole standard with pan-seared Gulf scallops, locally sourced pasture wagyu, and single-barrel Florida bourbon pairings.",
    highlight: "Awarded Best Private Club Culinary Program in South Florida.",
  },
];

const FILTER_TABS = [
  { label: "All Nominees", value: "all" },
  { label: "Superintendents", value: "superintendent" },
  { label: "Resort Courses", value: "resort" },
  { label: "Junior Phenoms", value: "junior" },
  { label: "Military Charities", value: "military" },
  { label: "Clubhouse Chefs", value: "gastronomy" },
];

export const NominationSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FEATURED_NOMINEES.forEach((n) => {
      initial[n.id] = n.initialVotes;
    });
    return initial;
  });
  const [votedList, setVotedList] = useState<string[]>([]);
  const [selectedNominee, setSelectedNominee] = useState<NomineeExample | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nomineeName: "",
    golfCourse: "",
    category: NOMINATION_CATEGORIES[0],
    nominatorName: "",
    nominatorEmail: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Filter nominees
  const filteredNominees =
    selectedFilter === "all"
      ? FEATURED_NOMINEES
      : FEATURED_NOMINEES.filter((n) => n.categoryKey === selectedFilter);

  // Cast vote for nominee
  const handleVoteNominee = (nominee: NomineeExample, e: React.MouseEvent) => {
    e.stopPropagation();

    const isAlreadyVoted = votedList.includes(nominee.id);

    if (!isAlreadyVoted) {
      setVotes((prev) => ({
        ...prev,
        [nominee.id]: (prev[nominee.id] || nominee.initialVotes) + 1,
      }));
      setVotedList((prev) => [...prev, nominee.id]);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#BFA054", "#0A251A", "#FFFFFF", "#D4B568"],
        });
      } catch {}
    }

    // Pre-populate ballot form and smooth scroll
    selectForBallot(nominee);
  };

  const selectForBallot = (nominee: NomineeExample) => {
    setSelectedNominee(nominee);
    setFormData((prev) => ({
      ...prev,
      nomineeName: nominee.name,
      golfCourse: nominee.organization,
      category: nominee.category,
      reason: prev.reason || `I am voting for ${nominee.name} because of their outstanding contribution to ${nominee.organization}: ${nominee.highlight}`,
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearSelected = () => {
    setSelectedNominee(null);
    setFormData({
      nomineeName: "",
      golfCourse: "",
      category: NOMINATION_CATEGORIES[0],
      nominatorName: "",
      nominatorEmail: "",
      reason: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#BFA054", "#0A251A", "#FFFFFF", "#D4B568"],
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <section id="nomination" className="w-full bg-[#F8F9FA] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A251A] text-[#D4B568] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Official Volume 27 Awards • Community Ballot</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Nominate &amp; Vote for Florida&apos;s Golf Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Every year, Golf Central Magazine spotlights the exceptional course superintendents, premier resorts, junior phenoms, and military charity tournaments that define Florida golf. Review the featured candidates below, cast your vote, or submit your own custom nomination!
          </p>
        </div>

        {/* ============================================================ */}
        {/* FEATURED NOMINEES SHOWCASE (PICTURES & NAMES EXAMPLES)       */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-[#BFA054]" />
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  Featured Candidates &amp; Nominee Examples
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Click <strong className="text-[#0A251A]">Vote Now</strong> on any candidate to support them and pre-fill your official endorsement ballot.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === tab.value
                      ? "bg-[#0A251A] text-[#D4B568] shadow-sm"
                      : "bg-white text-gray-600 hover:text-[#0A251A] hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nominee Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.map((nominee) => {
              const currentVotes = votes[nominee.id] || nominee.initialVotes;
              const hasVoted = votedList.includes(nominee.id);
              const isSelected = selectedNominee?.id === nominee.id;

              return (
                <div
                  key={nominee.id}
                  onClick={() => selectForBallot(nominee)}
                  className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    isSelected
                      ? "border-[#BFA054] ring-2 ring-[#BFA054]/40 shadow-lg"
                      : "border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Card Image & Overlay */}
                  <div>
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                      <Image
                        src={nominee.image}
                        alt={nominee.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-[#0A251A]/85 backdrop-blur-md text-[#D4B568] border border-[#BFA054]/40 text-[10px] font-bold tracking-wide uppercase">
                          {nominee.badge}
                        </span>

                        <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                          <Heart
                            className={`w-3 h-3 ${
                              hasVoted
                                ? "fill-red-500 text-red-500"
                                : "text-red-400"
                            }`}
                          />
                          <span>{currentVotes.toLocaleString()} Votes</span>
                        </span>
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                        <span className="text-[10px] text-[#D4B568] uppercase font-bold tracking-wider block line-clamp-1">
                          {nominee.category}
                        </span>
                        <h4 className="text-lg font-bold leading-tight drop-shadow-sm">
                          {nominee.name}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-[#0A251A] flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#BFA054] shrink-0" />
                          <span>{nominee.organization} • {nominee.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 font-medium">
                          {nominee.title}
                        </p>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {nominee.bio}
                      </p>

                      <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-[#2B8463]/20 text-[11px] text-[#0A251A] font-semibold flex items-start space-x-2">
                        <Award className="w-3.5 h-3.5 text-[#BFA054] shrink-0 mt-0.5" />
                        <span className="leading-snug">Key Highlight: {nominee.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-5 pt-0">
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={(e) => handleVoteNominee(nominee, e)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs ${
                          hasVoted
                            ? "bg-[#0A251A] text-[#D4B568] border border-[#BFA054]"
                            : "bg-[#BFA054] hover:bg-[#9E7F3D] text-[#061710]"
                        }`}
                      >
                        {hasVoted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Voted (+1)</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>Vote Now</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => selectForBallot(nominee)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1 border ${
                          isSelected
                            ? "bg-[#0A251A] text-white border-[#0A251A]"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <span>{isSelected ? "Selected" : "Endorse"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* OFFICIAL BALLOT / SUBMIT NOMINATION FORM                     */}
        {/* ============================================================ */}
        <div ref={formRef} className="w-full space-y-6 pt-6">
          {/* Active Pre-selected Nominee Banner */}
          {selectedNominee && (
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#0A251A] text-white border-2 border-[#BFA054] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center space-x-3.5">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#BFA054] shrink-0">
                  <Image
                    src={selectedNominee.image}
                    alt={selectedNominee.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-[#D4B568] uppercase tracking-wider">
                      Selected Candidate for Endorsement
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#BFA054] text-[#061710]">
                      Ballot Active
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {selectedNominee.name} — {selectedNominee.organization}
                  </h4>
                </div>
              </div>

              <button
                onClick={handleClearSelected}
                className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white/80 hover:text-white flex items-center space-x-1 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Nominate Someone Else</span>
              </button>
            </div>
          )}

          {/* Form Card - Full width matching cards grid above */}
          <div className="w-full bg-white rounded-3xl p-4 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <CheckCircle className="w-16 h-16 text-[#BFA054] mx-auto" />
                <h3 className="text-2xl font-bold text-[#111827]">
                  Nomination Submitted Successfully!
                </h3>
                <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                  Thank you for nominating <strong className="text-[#0A251A]">{formData.nomineeName}</strong> from <strong className="text-[#0A251A]">{formData.golfCourse}</strong>. Our editorial board reviews nominations each month for Volume 27 feature stories.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    handleClearSelected();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#0A251A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#BFA054] hover:text-[#0A251A] transition-colors"
                >
                  Submit Another Nomination
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-[#111827]">
                      {selectedNominee
                        ? `Official Endorsement Ballot for ${selectedNominee.name}`
                        : "Submit a Custom Nomination"}
                    </h4>
                    <p className="text-xs text-[#6B7280]">
                      {selectedNominee
                        ? "Confirm nominee information and add your personal endorsement below."
                        : "Nominate any Florida course, superintendent, junior golfer, or charity tournament."}
                    </p>
                  </div>
                  {selectedNominee && (
                    <button
                      type="button"
                      onClick={handleClearSelected}
                      className="text-xs text-[#BFA054] hover:text-[#0A251A] font-semibold underline text-left"
                    >
                      Clear / Blank Form
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                      Nominee&apos;s Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mark Henderson, CGCS"
                      value={formData.nomineeName}
                      onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                      Golf Course or Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Plantation Bay Golf Club"
                      value={formData.golfCourse}
                      onChange={(e) => setFormData({ ...formData, golfCourse: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                    Nomination Category *
                  </label>
                  <CustomDropdown
                    value={formData.category}
                    onChange={(val) => setFormData({ ...formData, category: val })}
                    options={NOMINATION_CATEGORIES}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                    Why Should They Be Featured? (Tell Their Story) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share details about their dedication, agronomy breakthroughs, community impact, or recent accomplishments..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium leading-relaxed shadow-xs"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-3">
                    Your Contact Information (Nominator)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.nominatorName}
                        onChange={(e) => setFormData({ ...formData, nominatorName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A251A] uppercase tracking-wider mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={formData.nominatorEmail}
                        onChange={(e) => setFormData({ ...formData, nominatorEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#0A251A]/20 hover:border-[#0A251A]/40 focus:border-[#0A251A] focus:ring-2 focus:ring-[#0A251A]/20 text-xs text-[#111827] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0A251A] hover:bg-[#BFA054] text-white hover:text-[#0A251A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>
                    {selectedNominee
                      ? `Cast Official Vote for ${selectedNominee.name}`
                      : "Submit Nomination to Editorial Board"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
