"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle, ArrowRight, Download, Send, BookOpen } from "lucide-react";
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
    <section id="advertising" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE3D9]">
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
            <BookOpen className="w-3.5 h-3.5 text-[#134E36]" />
            <span>Official Media Kit &amp; Advertising</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            Connect Your Brand to Passionate Golfers &amp; Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Are you looking for ways to connect your brand, product, or services to golf lovers and professionals? Advertising with Golf Central Magazine offers a unique opportunity to showcase your brand to a captivating audience passionate about golf.
          </p>
        </motion.div>

        {/* 3-Step Process */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-[#C59B27] uppercase tracking-wider mb-6"
          >
            HERE&apos;S HOW IT WORKS
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "CONTACT",
                text: "Reach out to our advertising team to discuss your needs and secure your ad space across upcoming Volume 27 issues.",
              },
              {
                step: "02",
                title: "PAY",
                text: "Finalize payment for your advertisement placement according to the agreed terms and selected print or digital schedule.",
              },
              {
                step: "03",
                title: "PUBLISH",
                text: "Once payment is received, your advertisement will be published in our magazine, reaching our dedicated audience of golf enthusiasts.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm relative"
              >
                <div className="w-10 h-10 rounded-xl bg-[#134E36] text-[#D8B045] font-bold flex items-center justify-center text-sm mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ad Packages Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-[#C59B27] uppercase tracking-wider mb-6"
          >
            2025/2026 PRINT &amp; DIGITAL PACKAGES
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVERTISING_PACKAGES.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.08, ease: "easeOut" }}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? "bg-[#134E36] text-white border-[#C59B27] shadow-xl"
                    : "bg-white text-[#0F172A] border-[#EAE3D9] shadow-sm hover:shadow-md"
                }`}
              >
                <div className="space-y-3">
                  {pkg.popular && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C59B27] text-[#0B291D] text-[10px] font-bold uppercase tracking-wider">
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Inquiry Form & Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#0F3D2A] via-[#134E36] to-[#0B291D] text-white rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl border border-[#C59B27]/30"
        >
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
                <div className="p-8 bg-white/10 rounded-2xl border border-[#C59B27] space-y-3 text-center">
                  <CheckCircle className="w-12 h-12 text-[#C59B27] mx-auto" />
                  <h4 className="text-2xl font-bold">Inquiry Received</h4>
                  <p className="text-sm text-white/85">
                    Thank you, {formData.name}. Our advertising director will contact you at <span className="text-[#D8B045]">{formData.email}</span> within 24 hours with our complete 2025/2026 Media Kit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Reserve Ad Space or Request Media Kit
                    </h3>
                    <p className="text-xs text-white/75">
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
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#C59B27]/40 hover:border-[#C59B27] focus:border-[#D8B045] focus:ring-2 focus:ring-[#C59B27]/30 text-[#0F172A] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Business Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#C59B27]/40 hover:border-[#C59B27] focus:border-[#D8B045] focus:ring-2 focus:ring-[#C59B27]/30 text-[#0F172A] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Company / Brand / Golf Resort"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white border-2 border-[#C59B27]/40 hover:border-[#C59B27] focus:border-[#D8B045] focus:ring-2 focus:ring-[#C59B27]/30 text-[#0F172A] placeholder-gray-400 text-xs outline-none transition-all font-medium shadow-xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#C59B27]/40 hover:border-[#C59B27] focus:border-[#D8B045] focus:ring-2 focus:ring-[#C59B27]/30 text-[#0F172A] placeholder-gray-400 text-xs outline-none transition-all font-medium leading-relaxed shadow-xs"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Submit Advertising Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
