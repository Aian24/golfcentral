"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Check, FileText, ArrowRight } from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";

export const NewsletterDispatch: React.FC = () => {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Digital Issue Alerts",
    "Course Architecture",
  ]);
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    "Digital Issue Alerts",
    "Course Architecture",
    "Agronomy & Superintendent Dispatch",
    "Resort Travel & Stay-and-Play",
    "Charity Tournaments & Military Golf",
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#C5A059", "#0A1F18", "#FFFFFF", "#D8B26E"],
      });
    } catch {
      // fallback if canvas-confetti is not loaded
    }

    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#06150F] text-white py-16 md:py-24 border-b border-[#C5A059]/30 relative overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: The Dispatch Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-xs tracking-widest text-[#D4B568] uppercase font-semibold">
              <Mail className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>THE FAIRWAY DISPATCH // PRIVATE EDITORIAL SUBSCRIPTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Curated Southern Golf, Straight to Your Inbox
            </h2>

            <p className="text-base text-white/80 font-sans max-w-xl leading-relaxed">
              Join over 28,000 Florida golf aficionados, club executives, course superintendents, and resort travelers. Receive early access to new digital issues, architecture critiques, and tournament invitationals.
            </p>

            {/* Topic Selectors */}
            <div className="space-y-2 pt-2">
              <div className="text-xs text-[#D4B568] uppercase tracking-wider font-semibold">
                Select Your Editorial Interests:
              </div>
              <div className="flex flex-wrap gap-2">
                {topics.map((top) => {
                  const isChecked = selectedTopics.includes(top);
                  return (
                    <button
                      key={top}
                      type="button"
                      onClick={() => toggleTopic(top)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 border rounded-lg font-semibold ${
                        isChecked
                          ? "bg-[#BFA054] text-[#0A1F18] border-[#BFA054] font-bold"
                          : "bg-[#0A1F18] text-white/70 border-white/20 hover:border-[#BFA054]"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3" />}
                      <span>{top}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Form */}
            {submitted ? (
              <div className="p-6 bg-[#0A1F18] border border-[#BFA054] text-white space-y-2 animate-fadeIn rounded-xl">
                <div className="flex items-center space-x-2 text-[#D4B568] font-bold text-lg">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Welcome to The Fairway Dispatch</span>
                </div>
                <p className="text-xs text-white/80 font-sans">
                  A verification dispatch has been sent to <span className="font-semibold text-[#D4B568]">{email}</span>. You will receive our Volume 27 Issue 6 digital companion in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-lg">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-[#BFA054] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs rounded-xl outline-none transition-all font-medium shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] font-bold text-xs uppercase tracking-widest transition-colors shrink-0 shadow-lg rounded-xl"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-white/40">
              Zero spam. Published weekly. You can update topic preferences or unsubscribe anytime.
            </p>
          </div>

          {/* Right Column: Advertising & Media Kit Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A1F18] border border-[#BFA054]/40 p-6 sm:p-8 space-y-4 shadow-xl rounded-2xl">
              <div className="text-[10px] text-[#D4B568] uppercase tracking-widest flex items-center space-x-1.5 font-bold">
                <FileText className="w-3.5 h-3.5 text-[#BFA054]" />
                <span>PARTNERS &amp; ADVERTISERS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Connect Your Brand to Florida&apos;s Discerning Golf Audience
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                Advertising with Golf Central Magazine offers unmatched access to private club members, resort travelers, golf course superintendents, and PGA professionals throughout Florida and the Southeast.
              </p>

              <div className="pt-2 space-y-2 text-xs text-white/80">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/50">Circulation:</span>
                  <span className="text-[#D4B568] font-semibold">Print &amp; Digital Worldwide</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/50">Frequency:</span>
                  <span>12 Volumes Annually</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/50">Ad Options:</span>
                  <span>Full-Page, Spreads, Digital Ezine</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://golfcentralmag.com/advertising/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-wider flex items-center justify-center space-x-1 transition-colors rounded-xl font-semibold"
                >
                  <span>Advertising Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://golfcentralmag.com/ad-spec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-transparent hover:bg-[#BFA054] text-[#D4B568] hover:text-[#0A1F18] border border-[#BFA054] text-xs uppercase tracking-wider flex items-center justify-center space-x-1 transition-colors rounded-xl font-semibold"
                >
                  <span>Ad Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
