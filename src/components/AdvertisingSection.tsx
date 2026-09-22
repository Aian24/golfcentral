"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, CheckCircle, ArrowRight, Download, Send } from "lucide-react";
import { ADVERTISING_PACKAGES, SITE_INFO } from "@/data/editorialData";
import { CustomDropdown } from "@/components/CustomDropdown";

const AD_PACKAGE_OPTIONS = [
  "Full Page Premium Spread",
  "Two-Page Editorial Spread",
  "1/2 Page Horizontal",
  "1/4 Page Directory",
  "Digital Ezine Only",
];

export const AdvertisingSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    packageChoice: "Full Page Premium Spread",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="advertising" className="w-full bg-white py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A251A] text-[#D4B568] text-xs font-semibold uppercase tracking-wider">
            <span>Official Media Kit &amp; Advertising</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Connect Your Brand to Passionate Golfers &amp; Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Are you looking for ways to connect your brand, product, or services to golf lovers and professionals? Advertising with Golf Central Magazine offers a unique opportunity to showcase your brand to a captivating audience passionate about golf.
          </p>
        </div>

        {/* 3-Step Process (Exact from Live Site) */}
        <div className="mb-16">
          <div className="text-xs font-bold text-[#BFA054] uppercase tracking-wider mb-6">
            HERE&apos;S HOW IT WORKS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-gray-200 relative">
              <div className="w-10 h-10 rounded-xl bg-[#0A251A] text-[#D4B568] font-bold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-[#111827] mb-2">CONTACT</h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Reach out to our advertising team to discuss your needs and secure your ad space across upcoming Volume 27 issues.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-gray-200 relative">
              <div className="w-10 h-10 rounded-xl bg-[#0A251A] text-[#D4B568] font-bold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-[#111827] mb-2">PAY</h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Finalize payment for your advertisement placement according to the agreed terms and selected print or digital schedule.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-gray-200 relative">
              <div className="w-10 h-10 rounded-xl bg-[#0A251A] text-[#D4B568] font-bold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-[#111827] mb-2">PUBLISH</h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Once payment is received, your advertisement will be published in our magazine, reaching our dedicated audience of golf enthusiasts.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Packages Grid */}
        <div className="mb-16">
          <div className="text-xs font-bold text-[#BFA054] uppercase tracking-wider mb-6">
            2025/2026 PRINT &amp; DIGITAL PACKAGES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVERTISING_PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "bg-[#0A251A] text-white border-[#BFA054] shadow-lg"
                    : "bg-[#F8F9FA] text-[#111827] border-gray-200"
                }`}
              >
                <div className="space-y-3">
                  {pkg.popular && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#BFA054] text-[#0A251A] text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-lg font-bold">{pkg.name}</h4>
                  <div className="text-xs space-y-1 opacity-85">
                    <div><strong>Trim:</strong> {pkg.dimensions}</div>
                    {pkg.bleed && <div><strong>Bleed:</strong> {pkg.bleed}</div>}
                    <div><strong>Format:</strong> {pkg.format}</div>
                  </div>
                  <p className="text-xs opacity-75 pt-2 border-t border-current/10">
                    {pkg.placement}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-current/15 text-xs opacity-80">
                  {pkg.reach}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form & Real Image */}
        <div className="bg-[#0A251A] text-white rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/ad_side_image.webp"
                  alt="Golf Central Magazine Advertising"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-white/70 space-y-1">
                <p><strong>Circulation:</strong> 35,000+ Print copies across private clubs, pro shops, resort suites + global digital readership.</p>
                <p><strong>Frequency:</strong> Monthly editions with special seasonal guides.</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 bg-white/10 rounded-2xl border border-[#BFA054] space-y-3 text-center">
                  <CheckCircle className="w-12 h-12 text-[#BFA054] mx-auto" />
                  <h4 className="text-2xl font-bold">Inquiry Received</h4>
                  <p className="text-sm text-white/80">
                    Thank you, {formData.name}. Our advertising director will contact you at <span className="text-[#D4B568]">{formData.email}</span> within 24 hours with our complete 2025/2026 Media Kit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Reserve Ad Space or Request Media Kit
                    </h3>
                    <p className="text-xs text-white/70">
                      Reach out directly to Terrie Purdum and our advertising desk in Lake Wales, FL.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Business Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Company / Brand / Golf Resort"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
                    />
                    <CustomDropdown
                      value={formData.packageChoice}
                      onChange={(val) => setFormData({ ...formData, packageChoice: val })}
                      options={AD_PACKAGE_OPTIONS}
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Tell us about your campaign objectives or requested issue dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#BFA054]/40 hover:border-[#BFA054] focus:border-[#D4B568] focus:ring-2 focus:ring-[#BFA054]/30 text-[#111827] placeholder-gray-400 text-xs outline-none transition-all font-medium leading-relaxed shadow-xs"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#BFA054] hover:bg-[#9E7F3D] text-[#0A251A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Submit Advertising Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
