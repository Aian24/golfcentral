"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Download, AlertCircle } from "lucide-react";
import { ADVERTISING_PACKAGES, SITE_INFO } from "@/data/editorialData";

export const AdSpecSection: React.FC = () => {
  return (
    <section id="adspec" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EBF7EE] border border-[#C2E7D3] text-[#134E36] text-xs font-bold uppercase tracking-wider shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#134E36]" />
            <span>Production Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            Print &amp; Digital Ad Specifications
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Ready to elevate your presence in the golfing world? Review our exact mechanical requirements, file formats, trim sizes, and submission guidelines for Volume 27.
          </p>
        </motion.div>

        {/* Technical Guidelines Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D9] shadow-sm mb-12 space-y-6"
        >
          <div className="border-b border-[#EAE3D9] pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F172A]">
              Technical File Submission Requirements
            </h3>
            <span className="text-xs font-semibold text-[#C59B27]">
              High-Resolution Press Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2"
            >
              <div className="text-xs font-bold text-[#134E36] uppercase">File Format</div>
              <div className="text-base font-bold text-[#0F172A]">PDF/X-1a : 2001</div>
              <p className="text-xs text-[#475569]">
                High-resolution, press-ready PDF with all fonts and high-res images embedded.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2"
            >
              <div className="text-xs font-bold text-[#134E36] uppercase">Color Mode</div>
              <div className="text-base font-bold text-[#0F172A]">CMYK Only (300 DPI)</div>
              <p className="text-xs text-[#475569]">
                No RGB, LAB, or Pantone Spot colors. All images must be converted to SWOP CMYK.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2"
            >
              <div className="text-xs font-bold text-[#134E36] uppercase">Bleed &amp; Safety</div>
              <div className="text-base font-bold text-[#0F172A]">0.125&quot; All Sides</div>
              <p className="text-xs text-[#475569]">
                Keep live text and crucial logos at least 0.375&quot; inside the trim line.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Dimension Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="bg-white rounded-3xl overflow-hidden border border-[#EAE3D9] shadow-sm"
        >
          <div className="p-6 bg-[#134E36] text-white flex items-center justify-between">
            <h4 className="text-lg font-bold">Standard Advertisement Sizes</h4>
            <span className="text-xs text-[#D8B045]">Volume 27 Print Specs</span>
          </div>

          <div className="divide-y divide-[#EAE3D9] overflow-x-auto">
            {ADVERTISING_PACKAGES.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: "easeOut" }}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#0F172A]">{pkg.name}</div>
                  <div className="text-xs text-[#475569]">{pkg.placement}</div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-700">
                  <div>
                    <span className="text-gray-400 block font-semibold">TRIM SIZE</span>
                    <span className="font-bold text-[#134E36]">{pkg.dimensions}</span>
                  </div>
                  {pkg.bleed && (
                    <div>
                      <span className="text-gray-400 block font-semibold">BLEED SIZE</span>
                      <span className="font-bold text-[#134E36]">{pkg.bleed}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400 block font-semibold">RESOLUTION</span>
                    <span className="font-bold text-[#134E36]">300 DPI CMYK</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submission Helpline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8 p-6 bg-gradient-to-br from-[#0F3D2A] to-[#134E36] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C59B27]/30"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-[#D8B045] shrink-0" />
            <span className="text-xs text-white/90">
              Need assistance pre-flighting your digital ad file or uploading your high-res artwork?
            </span>
          </div>
          <a
            href={`mailto:${SITE_INFO.email}?subject=Production%20Ad%20Spec%20Inquiry`}
            className="px-5 py-2.5 bg-[#C59B27] text-[#0B291D] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#D8B045] transition-colors shrink-0 shadow"
          >
            Contact Production Desk
          </a>
        </motion.div>
      </div>
    </section>
  );
};
