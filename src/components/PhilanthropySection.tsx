"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Flag, Award, Send } from "lucide-react";
import { Article } from "@/data/editorialData";

interface PhilanthropySectionProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export const PhilanthropySection: React.FC<PhilanthropySectionProps> = ({
  article,
  onReadArticle,
}) => {
  return (
    <section className="w-full bg-[#0A1F18] text-white py-16 md:py-24 border-b border-[#C5A059]/30 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#BFA054]/30 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-widest text-[#D4B568] uppercase mb-1 font-semibold">
              <Flag className="w-4 h-4 text-[#BFA054]" />
              <span>COMMUNITY &amp; MILITARY HONORS // EST. 1999</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Giving Back to Those Who Served
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/70 font-sans leading-relaxed">
            For 25+ years, Golf Central Magazine has championed charity tournaments and military veteran golf programs. We believe the game possesses a unique power to heal, inspire, and unite.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Photography Left (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden border border-[#BFA054]/40 shadow-2xl bg-black rounded-xl">
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F18] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/75 backdrop-blur-md border border-[#BFA054]/30 rounded-lg">
                  <div className="text-[10px] text-[#D4B568] uppercase tracking-wider mb-1 font-semibold">
                    FLORIDA MILITARY INVITATIONAL // PGA HOPE PARTNERSHIP
                  </div>
                  <p className="text-xs text-white/90 italic leading-relaxed">
                    &ldquo;Out on the course, the noise of combat and trauma finally goes quiet. Golf gave me my life back.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Charity Submission Right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-[#BFA054] uppercase tracking-widest font-bold">
                PUBLISHER&apos;S MISSION FEATURE
              </span>
              <h3
                onClick={() => onReadArticle(article)}
                className="text-2xl sm:text-3xl font-bold text-white hover:text-[#D4B568] transition-colors leading-tight cursor-pointer"
              >
                {article.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {article.excerpt}
              </p>
            </div>

            {/* Pillar initiatives */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3.5 bg-[#06150F] border border-[#BFA054]/25 rounded-xl">
                <div className="p-2 bg-[#0A1F18] text-[#BFA054] rounded-lg">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    PGA HOPE (Helping Our Patriots Everywhere)
                  </div>
                  <div className="text-xs text-white/60 font-sans mt-0.5 leading-relaxed">
                    Free 6-to-8 week golf developmental program led by PGA professionals for wounded and disabled service members.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-[#06150F] border border-[#BFA054]/25 rounded-xl">
                <div className="p-2 bg-[#0A1F18] text-[#BFA054] rounded-lg">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Folds of Honor &amp; Florida Charity Invitationals
                  </div>
                  <div className="text-xs text-white/60 font-sans mt-0.5 leading-relaxed">
                    Educational scholarships for children and spouses of fallen and disabled American military heroes.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onReadArticle(article)}
                className="px-6 py-3 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A1F18] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors shadow-lg rounded-xl"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://golfcentralmag.com/nomination-page/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors rounded-xl font-semibold"
              >
                <Send className="w-3.5 h-3.5 text-[#D4B568]" />
                <span>Submit Tournament</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
