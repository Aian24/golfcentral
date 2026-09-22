"use client";

import React from "react";
import { CheckCircle, FileText, Download, AlertCircle } from "lucide-react";
import { ADVERTISING_PACKAGES, SITE_INFO } from "@/data/editorialData";

export const AdSpecSection: React.FC = () => {
  return (
    <section id="ad-spec" className="w-full bg-[#F8F9FA] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A251A] text-[#D4B568] text-xs font-semibold uppercase tracking-wider">
            <span>Production Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Print &amp; Digital Ad Specifications
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Ready to elevate your presence in the golfing world? Review our exact mechanical requirements, file formats, trim sizes, and submission guidelines for Volume 27.
          </p>
        </div>

        {/* Technical Guidelines Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm mb-12 space-y-6">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#111827]">
              Technical File Submission Requirements
            </h3>
            <span className="text-xs font-semibold text-[#BFA054]">
              High-Resolution Press Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-[#0A251A] uppercase">File Format</div>
              <div className="text-base font-bold text-[#111827]">PDF/X-1a : 2001</div>
              <p className="text-xs text-[#4B5563]">
                High-resolution, press-ready PDF with all fonts and high-res images embedded.
              </p>
            </div>

            <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-[#0A251A] uppercase">Color Mode</div>
              <div className="text-base font-bold text-[#111827]">CMYK Only (300 DPI)</div>
              <p className="text-xs text-[#4B5563]">
                No RGB, LAB, or Pantone Spot colors. All images must be converted to SWOP CMYK.
              </p>
            </div>

            <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-[#0A251A] uppercase">Bleed &amp; Safety</div>
              <div className="text-base font-bold text-[#111827]">0.125&quot; All Sides</div>
              <p className="text-xs text-[#4B5563]">
                Keep live text and crucial logos at least 0.375&quot; inside the trim line.
              </p>
            </div>
          </div>
        </div>

        {/* Dimension Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="p-6 bg-[#0A251A] text-white flex items-center justify-between">
            <h4 className="text-lg font-bold">Standard Advertisement Sizes</h4>
            <span className="text-xs text-[#D4B568]">Volume 27 Print Specs</span>
          </div>

          <div className="divide-y divide-gray-100 overflow-x-auto">
            {ADVERTISING_PACKAGES.map((pkg, idx) => (
              <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-[#111827]">{pkg.name}</div>
                  <div className="text-xs text-[#4B5563]">{pkg.placement}</div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-700">
                  <div>
                    <span className="text-gray-400 block font-semibold">TRIM SIZE</span>
                    <span className="font-bold text-[#0A251A]">{pkg.dimensions}</span>
                  </div>
                  {pkg.bleed && (
                    <div>
                      <span className="text-gray-400 block font-semibold">BLEED SIZE</span>
                      <span className="font-bold text-[#0A251A]">{pkg.bleed}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400 block font-semibold">RESOLUTION</span>
                    <span className="font-bold text-[#0A251A]">300 DPI CMYK</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Helpline */}
        <div className="mt-8 p-6 bg-[#0A251A] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-[#BFA054] shrink-0" />
            <span className="text-xs text-white/90">
              Need assistance pre-flighting your digital ad file or uploading your high-res artwork?
            </span>
          </div>
          <a
            href={`mailto:${SITE_INFO.email}?subject=Production%20Ad%20Spec%20Inquiry`}
            className="px-5 py-2.5 bg-[#BFA054] text-[#0A251A] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#9E7F3D] transition-colors shrink-0"
          >
            Contact Production Desk
          </a>
        </div>
      </div>
    </section>
  );
};
