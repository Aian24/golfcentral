"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle, Send, Clock, ArrowRight } from "lucide-react";
import { SITE_INFO } from "@/data/editorialData";
import { CustomDropdown } from "@/components/CustomDropdown";

const CONTACT_SUBJECTS = [
  "Editorial Story Pitch",
  "Advertising & Media Kit Inquiry",
  "Tournament or Charity Event Coverage",
  "Superintendent & Agronomy Feature",
  "Print Subscription Question",
  "General Inquiries",
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-b border-[#EAE3D9]">
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
            <Mail className="w-3.5 h-3.5 text-[#134E36]" />
            <span>Official Contact Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            Get in Touch with Golf Central Magazine
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Have an editorial story tip, advertising inquiry, subscription question, or tournament sponsorship proposal? Reach out to Terrie Purdum and our editorial team in Lake Wales, Florida.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Cards & Headquarters (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-gradient-to-br from-[#0F3D2A] via-[#134E36] to-[#0B291D] text-white rounded-3xl p-5 sm:p-8 shadow-xl space-y-6 border border-[#C59B27]/30">
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Headquarters Information
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#D8B045] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
                      Physical Address
                    </div>
                    <div className="font-medium text-white/90 mt-0.5">
                      {SITE_INFO.location}
                    </div>
                    <div className="text-xs text-white/70">Central Florida Ridge Corridor</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#D8B045] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
                      Direct Phone
                    </div>
                    <a
                      href={`tel:${SITE_INFO.phone}`}
                      className="font-medium text-white/90 hover:text-[#D8B045] mt-0.5 block transition-colors"
                    >
                      {SITE_INFO.phone}
                    </a>
                    <div className="text-xs text-white/70">Mon–Fri 8:30 AM – 5:30 PM EST</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#D8B045] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider">
                      Email Desk
                    </div>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="font-medium text-white/90 hover:text-[#D8B045] mt-0.5 block transition-colors"
                    >
                      {SITE_INFO.email}
                    </a>
                    <div className="text-xs text-white/70">Inquiries answered within 24h</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-white/70">
                Publisher: Terrie Purdum • Established in 1999 • Florida &amp; Southeast
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-[#EAE3D9] shadow-sm flex flex-col justify-between"
          >
            {submitted ? (
              <div className="my-auto text-center py-12 space-y-4 animate-fadeIn">
                <CheckCircle className="w-16 h-16 text-[#C59B27] mx-auto" />
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Message Sent to Editorial Desk
                </h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#134E36]">{formData.name}</strong>. Your message regarding &ldquo;{formData.subject}&rdquo; has been forwarded directly to Terrie Purdum and our editorial staff.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#134E36] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#176043] transition-colors shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#EAE3D9] pb-3">
                  <h4 className="text-xl font-bold text-[#0F172A]">
                    Send a Direct Message
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    All submissions are reviewed directly by Golf Central staff.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#134E36] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#134E36]/20 hover:border-[#134E36]/40 focus:border-[#134E36] focus:ring-2 focus:ring-[#134E36]/20 text-xs text-[#0F172A] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#134E36] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#134E36]/20 hover:border-[#134E36]/40 focus:border-[#134E36] focus:ring-2 focus:ring-[#134E36]/20 text-xs text-[#0F172A] placeholder-gray-400 outline-none transition-all font-medium shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#134E36] uppercase tracking-wider mb-1.5">
                    Subject / Topic *
                  </label>
                  <CustomDropdown
                    value={formData.subject}
                    onChange={(val) => setFormData({ ...formData, subject: val })}
                    options={CONTACT_SUBJECTS}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#134E36] uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your inquiry, club, or request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#134E36]/20 hover:border-[#134E36]/40 focus:border-[#134E36] focus:ring-2 focus:ring-[#134E36]/20 text-xs text-[#0F172A] placeholder-gray-400 outline-none transition-all font-medium leading-relaxed shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#134E36] hover:bg-[#176043] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
