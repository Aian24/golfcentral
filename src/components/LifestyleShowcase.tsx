"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Wine, Watch, Compass } from "lucide-react";
import { Article } from "@/data/editorialData";

interface LifestyleShowcaseProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export const LifestyleShowcase: React.FC<LifestyleShowcaseProps> = ({
  article,
  onReadArticle,
}) => {
  return (
    <section className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#BFA054]/30 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-widest text-[#BFA054] uppercase mb-1 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>THE 19TH HOLE // LUXURY STYLE &amp; HERITAGE GEAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#0A1F18] tracking-tight">
              Craft, Style &amp; Clubhouse Living
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#485462] font-sans leading-relaxed">
            Golf transcends the scorecard. We curate the timeless leatherwork, precision-forged clubmaking, fine spirits, and sartorial excellence defining modern golf culture.
          </p>
        </div>

        {/* 2-Column Luxury Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & Curation Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <span className="text-xs text-[#BFA054] uppercase tracking-widest font-bold">
                CURATED FEATURE
              </span>
              <h3
                onClick={() => onReadArticle(article)}
                className="text-2xl sm:text-3xl font-bold text-[#0A1F18] hover:text-[#17493A] transition-colors leading-tight cursor-pointer"
              >
                {article.title}
              </h3>
              <p className="text-base text-[#485462] leading-relaxed font-sans">
                {article.excerpt}
              </p>
            </div>

            {/* Lifestyle Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 p-3.5 bg-white border border-[#EAE4D6] rounded-xl shadow-sm">
                <div className="p-2 bg-[#FAF8F5] text-[#BFA054] rounded-lg">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A1F18]">
                    Heirloom Leather &amp; Hand-Forged Irons
                  </div>
                  <div className="text-xs text-[#657485] font-sans mt-0.5 leading-relaxed">
                    Why players from Palm Beach to Naples are choosing vegetable-tanned steer hide and buttery Japanese carbon steel.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-white border border-[#EAE4D6] rounded-xl shadow-sm">
                <div className="p-2 bg-[#FAF8F5] text-[#BFA054] rounded-lg">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A1F18]">
                    The 19th Hole Cocktail Renaissance
                  </div>
                  <div className="text-xs text-[#657485] font-sans mt-0.5 leading-relaxed">
                    Smoked Florida citrus Old Fashioneds and single-estate mezcals rewriting clubhouse gastronomy.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 bg-white border border-[#EAE4D6] rounded-xl shadow-sm">
                <div className="p-2 bg-[#FAF8F5] text-[#BFA054] rounded-lg">
                  <Watch className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A1F18]">
                    Sartorial Performance Apparel
                  </div>
                  <div className="text-xs text-[#657485] font-sans mt-0.5 leading-relaxed">
                    Civilion Brand and modern luxury labels marrying Italian wool performance blends with tailored silhouettes.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onReadArticle(article)}
                className="px-6 py-3 bg-[#0A1F18] hover:bg-[#123429] text-white font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors shadow rounded-xl"
              >
                <span>Read Style Report</span>
                <ArrowRight className="w-4 h-4 text-[#BFA054]" />
              </button>
            </div>
          </div>

          {/* Photographic Spread Right (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative group overflow-hidden border border-[#EAE4D6] shadow-xl bg-white p-2 rounded-2xl">
              <div className="relative h-[340px] sm:h-[440px] md:h-[500px] w-full overflow-hidden rounded-xl">
                <Image
                  src={article.coverImage}
                  alt="Golf Lifestyle and Gear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#EAE4D6] flex items-center justify-between">
                <span className="text-[11px] text-[#657485] italic font-medium">
                  Photography: Hand-stitched heirloom bag, forged blades, vintage chronograph &amp; clubhouse bourbon
                </span>
                <span className="text-[10px] text-[#BFA054] font-bold uppercase tracking-wider">
                  ISSUE 6 EDITORIAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
