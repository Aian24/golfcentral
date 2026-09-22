"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle, Send, ArrowRight } from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";
import { CustomDropdown } from "@/components/CustomDropdown";

const NOMINATION_CATEGORIES = [
  "Golf Course Superintendent of the Year (GCSAA Affiliate)",
  "Florida Resort Course of the Year",
  "Military & Veteran Charity Tournament of the Year",
  "Rising Junior Golfer Phenom",
  "Clubhouse Gastronomy & 19th Hole Excellence",
];

export const NominationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nomineeName: "",
    golfCourse: "",
    category: "Golf Course Superintendent of the Year",
    nominatorName: "",
    nominatorEmail: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#BFA054", "#0A251A", "#FFFFFF", "#D4B568"],
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <section id="nomination" className="w-full bg-[#F8F9FA] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header - Aligned with form card */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A251A] text-[#D4B568] text-xs font-semibold uppercase tracking-wider">
            <span>Community Nominations • Volume 27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Nominate Your Favorite Golf Course, Superintendent, or Tournament
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Golf Central Magazine is built on celebrating the people who make golf unforgettable. Use our official nomination form to spotlight outstanding superintendents, premier courses, junior golfers, and life-changing military charity tournaments.
          </p>
        </div>

        {/* Form Card - Aligned with header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border border-gray-200 shadow-sm">
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
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#0A251A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#BFA054] hover:text-[#0A251A] transition-colors"
              >
                Submit Another Nomination
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-lg font-bold text-[#111827]">
                  Nominee Information
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Tell us who or what course you are nominating.
                </p>
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
                  Your Contact Information
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
                <span>Submit Nomination to Editorial Board</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
