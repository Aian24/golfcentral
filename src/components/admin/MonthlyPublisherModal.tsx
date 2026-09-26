"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Send,
  Upload,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Calendar,
  Image as ImageIcon,
  Loader2,
  Archive,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";

interface MonthlyPublisherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const MonthlyPublisherModal: React.FC<MonthlyPublisherModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { currentIssue, currentEdition, publishMonthlyIssue } = useEditorialData();

  const [volume, setVolume] = useState<number>(currentIssue?.volume || 27);
  const [issue, setIssue] = useState<number>((currentIssue?.issue || 6) + 1);
  const [title, setTitle] = useState<string>(`Volume ${volume} Issue ${issue}`);
  const [theme, setTheme] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(84);
  const [coverImage, setCoverImage] = useState<string>("/images/hero_golf_championship.jpg");
  const [issuuUrl, setIssuuUrl] = useState<string>("");
  const [issuuEmbedUrl, setIssuuEmbedUrl] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([
    "Championship Course Spotlight: Modern Seaside Architecture",
    "Turf Agronomy: Florida Greenkeeper Summer Protocol",
    "Luxury Golf Resorts: Caribbean Island Escapes",
    "Lifestyle & Clubhouse: Artisan Leather & Modern Craft",
  ]);
  const [editorNote, setEditorNote] = useState<string>(
    "Welcome to the newest edition of Golf Central Magazine. In this issue, we explore championship course architecture, tournament agronomy, and luxury golf escapes across Florida and the Southeast."
  );
  const [autoArchivePrevious, setAutoArchivePrevious] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize smart defaults when modal opens
  useEffect(() => {
    if (isOpen && currentIssue) {
      const nextIssue = currentIssue.issue >= 12 ? 1 : currentIssue.issue + 1;
      const nextVol = currentIssue.issue >= 12 ? currentIssue.volume + 1 : currentIssue.volume;
      setVolume(nextVol);
      setIssue(nextIssue);
      setTitle(`Volume ${nextVol} Issue ${nextIssue}`);

      // Suggest current next month
      const now = new Date();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const nextMonthName = monthNames[(now.getMonth() + 1) % 12];
      const year = now.getFullYear();
      setDate(`${nextMonthName} ${year}`);
      setTheme(`${nextMonthName} Championship & Luxury Showcase`);
      setIssuuUrl("https://issuu.com/editorinchief");
      setIssuuEmbedUrl("");
    }
  }, [isOpen, currentIssue]);

  if (!isOpen) return null;

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setCoverImage(data.url);
      } else {
        setError(data.error || "Failed to upload cover image.");
      }
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await publishMonthlyIssue(
        {
          volume: Number(volume),
          issue: Number(issue),
          title,
          theme,
          date,
          pageCount: Number(pageCount),
          coverImage,
          issuuUrl,
          issuuEmbedUrl: issuuEmbedUrl || issuuUrl,
          features: features.filter((f) => f.trim() !== ""),
          editorNote,
          isCurrent: true,
          status: "current",
        },
        autoArchivePrevious
      );

      if (res.success) {
        if (onSuccess) onSuccess(res.message);
        onClose();
      } else {
        setError(res.message || "Failed to publish monthly issue.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto font-sans animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0B291D] border border-[#C59B27]/40 text-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="bg-[#071F16] border-b border-[#C59B27]/30 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#134E36] border border-[#C59B27]/40 flex items-center justify-center">
              <Send className="w-5 h-5 text-[#D8B045]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#D8B045] tracking-widest">
                MONTHLY PUBLISHING WORKFLOW
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Publish New Monthly Magazine Edition
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/50 flex items-start space-x-3 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Roll-over & Archiving Notice */}
          <div className="p-4 rounded-2xl bg-[#134E36]/60 border border-[#C59B27]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D8B045]">
                <Archive className="w-4 h-4" />
                <span>Automated Monthly Archiving</span>
              </div>
              <p className="text-xs text-white/80">
                Publishing this new edition will set it as the live digital magazine on the homepage, while automatically archiving{" "}
                <strong className="text-white">
                  Volume {currentIssue?.volume} Issue {currentIssue?.issue}
                </strong>{" "}
                into the complete historical archive.
              </p>
            </div>

            <label className="flex items-center space-x-2 shrink-0 cursor-pointer bg-black/40 px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold">
              <input
                type="checkbox"
                checked={autoArchivePrevious}
                onChange={(e) => setAutoArchivePrevious(e.target.checked)}
                className="w-4 h-4 rounded text-[#C59B27] focus:ring-[#C59B27] bg-[#071F16]"
              />
              <span>Auto-Archive Active Issue</span>
            </label>
          </div>

          {/* Grid: Details & Cover Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Col: Issue Info (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Volume #
                  </label>
                  <input
                    type="number"
                    value={volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setVolume(v);
                      setTitle(`Volume ${v} Issue ${issue}`);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Issue #
                  </label>
                  <input
                    type="number"
                    value={issue}
                    onChange={(e) => {
                      const iss = Number(e.target.value);
                      setIssue(iss);
                      setTitle(`Volume ${volume} Issue ${iss}`);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Publication Month / Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. July 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Edition Headline Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Volume 27 Issue 7"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Issue Theme / Cover Feature Subtitle
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g. Mid-Summer Championship & Coastal Architecture"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                  required
                />
              </div>

              {/* Digital Flipbook Links */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Issuu Digital Flipbook Links</span>
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1">
                    Issuu Publication URL
                  </label>
                  <input
                    type="url"
                    value={issuuUrl}
                    onChange={(e) => setIssuuUrl(e.target.value)}
                    placeholder="https://issuu.com/editorinchief/docs/golf_central_mag_..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1">
                    Issuu Direct Embed URL (Optional / Auto-generated)
                  </label>
                  <input
                    type="url"
                    value={issuuEmbedUrl}
                    onChange={(e) => setIssuuEmbedUrl(e.target.value)}
                    placeholder="https://e.issuu.com/embed.html?d=...&u=editorinchief"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Cover Image & Preview (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">
                Magazine Cover Image
              </label>

              {/* Visual Cover Preview */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#C59B27]/40 bg-[#071F16] shadow-xl group">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt="New Issue Cover Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/40 p-4 text-center">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">No Cover Image Selected</span>
                  </div>
                )}

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#C59B27] text-[#0B291D] font-bold text-[10px] uppercase">
                  Vol {volume} No {issue}
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px]">
                  {pageCount} Pages
                </div>
              </div>

              {/* Upload Input & Preset select */}
              <div className="space-y-2">
                <label className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-2 cursor-pointer border border-white/20 transition-colors">
                  {uploadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 text-[#D8B045]" />
                  )}
                  <span>{uploadingImage ? "Uploading Cover..." : "Upload Cover Image File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Or enter Image Path / URL"
                  className="w-full px-3 py-1.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Featured Stories Checklist */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Cover &amp; Issue Story Highlights (Top 4 Features)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-[#134E36] border border-[#C59B27]/30 text-[#D8B045] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature story highlight ${idx + 1}...`}
                    className="w-full px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Editor Note */}
          <div>
            <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
              Editor-in-Chief Letter / Introductory Note
            </label>
            <textarea
              rows={3}
              value={editorNote}
              onChange={(e) => setEditorNote(e.target.value)}
              placeholder="A message from the publisher..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="bg-[#071F16] border-t border-[#C59B27]/30 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-white/70">
            Publishing Volume {volume} Issue {issue} • {date}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing &amp; Archiving...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Live Edition Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
