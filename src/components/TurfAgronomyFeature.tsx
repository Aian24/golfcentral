"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Droplets, Wind, ShieldCheck } from "lucide-react";
import { Article } from "@/data/editorialData";

interface TurfAgronomyFeatureProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export const TurfAgronomyFeature: React.FC<TurfAgronomyFeatureProps> = ({
  article,
  onReadArticle,
}) => {
  return (
    <section className="w-full bg-[#0F3D2A] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#176043]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#29976A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4"
        >
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-widest text-[#D8B045] uppercase mb-1 font-semibold">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>GCSAA AGRONOMY &amp; TURFGRASS PARTNERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              The Keepers of the Green
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/80 font-sans leading-relaxed">
            Golf Central Magazine was founded on a bedrock commitment to golf course superintendents. We celebrate the biological science, water conservation, and craftsmanship that makes championship golf possible.
          </p>
        </motion.div>

        {/* Split Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Left / Center (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative group overflow-hidden border border-[#C59B27]/40 shadow-2xl bg-[#0B291D] rounded-2xl">
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2A] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/75 backdrop-blur-md border border-[#C59B27]/30 rounded-xl">
                  <div className="text-[10px] text-[#D8B045] uppercase tracking-wider mb-1 font-semibold">
                    GCSAA FIELD SPOTLIGHT // LAKE WALES &amp; ORMOND BEACH
                  </div>
                  <p className="text-xs text-white/90 italic leading-relaxed">
                    &ldquo;{article.imageCaption}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text & Science Telemetry (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs text-[#D8B045] uppercase tracking-widest font-bold">
                FEATURED AGRONOMY DISPATCH
              </span>
              <h3
                onClick={() => onReadArticle(article)}
                className="text-2xl sm:text-3xl font-bold text-white hover:text-[#D8B045] transition-colors leading-tight cursor-pointer"
              >
                {article.title}
              </h3>
              <p className="text-sm text-white/85 leading-relaxed font-sans">
                {article.excerpt}
              </p>
            </div>

            {/* Agronomic Science Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-[#0B291D] border border-white/10 rounded-xl shadow-sm">
                <Droplets className="w-4 h-4 text-[#D8B045] mb-1.5" />
                <div className="text-[10px] text-white/60 uppercase font-semibold">Hydrology</div>
                <div className="text-xs font-bold text-white">14-18% VWC</div>
                <div className="text-[10px] text-white/70">Moisture Control</div>
              </div>

              <div className="p-3.5 bg-[#0B291D] border border-white/10 rounded-xl shadow-sm">
                <Wind className="w-4 h-4 text-[#D8B045] mb-1.5" />
                <div className="text-[10px] text-white/60 uppercase font-semibold">Sub-Air</div>
                <div className="text-xs font-bold text-white">12.5 Stimpmeter</div>
                <div className="text-[10px] text-white/70">Root Oxygenation</div>
              </div>

              <div className="p-3.5 bg-[#0B291D] border border-white/10 rounded-xl shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#D8B045] mb-1.5" />
                <div className="text-[10px] text-white/60 uppercase font-semibold">Turf Variety</div>
                <div className="text-xs font-bold text-white">TifEagle &amp; TifTuf</div>
                <div className="text-[10px] text-white/70">-38% Water Usage</div>
              </div>
            </div>

            {/* Read Article Trigger */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={() => onReadArticle(article)}
                className="px-6 py-3 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors shadow-lg rounded-xl"
              >
                <span>Read Agronomy Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#D8B045] font-medium">
                By {article.author.name}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
