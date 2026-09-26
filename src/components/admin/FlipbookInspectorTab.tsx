"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  ExternalLink,
  Layers,
  Maximize2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { CustomDropdown } from "@/components/CustomDropdown";

interface FlipbookInspectorTabProps {
  initialIssueNum?: number;
}

export const FlipbookInspectorTab: React.FC<FlipbookInspectorTabProps> = ({
  initialIssueNum,
}) => {
  const { issues, currentIssue } = useEditorialData();

  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number>(
    initialIssueNum || currentIssue?.issue || 6
  );
  const [iframeKey, setIframeKey] = useState<number>(0);

  const active = issues.find((i) => i.issue === selectedIssueNumber) || issues[0];

  return (
    <div className="space-y-6 font-sans animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Live Issuu Flipbook Reader Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Digital Replica Inspector &amp; Test Frame
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Test and verify how readers experience any issue&apos;s digital print replica on the live website.
          </p>
        </div>

        {/* Issue Selector Dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-white/80 uppercase shrink-0">Select Issue:</label>
          <div className="w-64">
            <CustomDropdown
              value={selectedIssueNumber}
              onChange={(val) => {
                setSelectedIssueNumber(Number(val));
                setIframeKey((prev) => prev + 1);
              }}
              options={issues.map((iss) => ({
                value: iss.issue,
                label: `${iss.isCurrent ? "★ LIVE: " : ""}Vol ${iss.volume} Issue ${iss.issue} (${iss.date})`,
              }))}
              variant="gold"
              size="sm"
            />
          </div>

          <button
            onClick={() => setIframeKey((prev) => prev + 1)}
            title="Reload Embed"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-[#D8B045]" />
          </button>
        </div>
      </div>

      {/* Main Inspector Container */}
      <div className="bg-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Inspector Top Bar */}
        <div className="bg-[#071F16] border-b border-white/10 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white">
              {active.title}: {active.theme}
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[#D8B045] font-semibold">{active.pageCount} High-Res Pages</span>
          </div>

          <div className="flex items-center space-x-3">
            {active.issuuUrl && (
              <a
                href={active.issuuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
              >
                <span>Issuu Direct View</span>
                <ExternalLink className="w-3 h-3 text-[#D8B045]" />
              </a>
            )}
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="relative w-full h-[620px] bg-black">
          {active.issuuEmbedUrl ? (
            <iframe
              key={iframeKey}
              src={active.issuuEmbedUrl}
              title={`${active.title} Flipbook`}
              className="w-full h-full border-0"
              allowFullScreen
              allow="clipboard-write"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/70 space-y-4">
              <BookOpen className="w-16 h-16 text-[#D8B045]/60" />
              <div>
                <h3 className="text-lg font-bold text-white">No Direct Embed URL Configured</h3>
                <p className="text-xs max-w-md mt-1">
                  You can provide an Issuu embed URL in the issue editor (e.g.{" "}
                  <code>https://e.issuu.com/embed.html?d=...</code>) or readers will be directed to the official Issuu publication.
                </p>
              </div>
              {active.issuuUrl && (
                <a
                  href={active.issuuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#C59B27] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
                >
                  <span>Open Issuu Publication &rarr;</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
