"use client";

import React from "react";
import { Award, Mail, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { STAFF_MEMBERS, SITE_INFO } from "@/data/editorialData";

export const StaffSection: React.FC = () => {
  return (
    <section id="our-staff" className="w-full bg-[#F8F9FA] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A251A] text-[#D4B568] text-xs font-semibold uppercase tracking-wider">
            <span>About Us • Editorial Masthead</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Meet the Editorial Team Behind Golf Central
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            For more than 25 years, Golf Central Magazine has been guided by visionary journalists, certified course superintendents, former professional athletes, and military veterans dedicated to growing the great game across Florida and the Southeast.
          </p>
        </div>

        {/* Founder & Publisher Spotlight */}
        <div className="bg-[#0A251A] text-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border border-white/10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#BFA054] text-[#0A251A] text-xs font-bold uppercase tracking-wider">
                <span>Founder &amp; Publisher</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Terrie Purdum
              </h3>
              <p className="text-xs sm:text-sm text-[#D4B568] font-medium">
                Publisher &amp; Editor-in-Chief • Founded in 1999
              </p>
              <blockquote className="text-base sm:text-lg text-white/90 italic font-normal leading-relaxed border-l-2 border-[#BFA054] pl-4 my-3">
                &ldquo;Growing the great game of golf, giving young and beginner golfers a sense of comfort on the course. Publishing charity golf events, and giving sponsors the recognition they deserve. Anything to support ANY military golf events and showing gratitude for the men and women dedicated to serving our country.&rdquo;
              </blockquote>
              <p className="text-sm text-white/80 leading-relaxed">
                Making golf fun, being a rebel visionary with a very traditional game, and assisting the PGA and GCSAA in getting consumers educated across Florida and beyond.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-[#D4B568] uppercase tracking-wider">
                Publishing Milestones
              </div>
              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#BFA054] shrink-0" />
                  <span>27 Annual Volumes Published</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#BFA054] shrink-0" />
                  <span>Florida &amp; Southeast Distribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#BFA054] shrink-0" />
                  <span>PGA &amp; GCSAA Media Affiliate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#BFA054] shrink-0" />
                  <span>Over 25 Years of Veteran Support</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-white/60">
                HQ: Lake Wales, Florida • Call: 863-875-6863
              </div>
            </div>
          </div>
        </div>

        {/* Staff Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAFF_MEMBERS.slice(1).map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#111827] text-xs font-semibold">
                    {member.badge}
                  </span>
                  <span className="text-xs text-[#BFA054] font-medium">Masthead</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#111827]">
                    {member.name}
                  </h4>
                  <p className="text-xs font-medium text-[#BFA054] mt-0.5">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-6">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 space-y-1.5">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Key Credentials:
                </div>
                {member.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFA054]"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
