"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Save,
  Upload,
  BookOpen,
  Sparkles,
  AlertCircle,
  Layers,
  Image as ImageIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import { ExtendedMagazineIssue } from "@/lib/types";
import { useEditorialData } from "@/context/EditorialDataContext";

interface IssueEditModalProps {
  issue: ExtendedMagazineIssue | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const IssueEditModal: React.FC<IssueEditModalProps> = ({
  issue,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { updateIssue, deleteIssue, setIssueLive } = useEditorialData();

  const [formData, setFormData] = useState<ExtendedMagazineIssue | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (issue) {
      setFormData({ ...issue });
    }
  }, [issue]);

  if (!isOpen || !formData) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => (prev ? { ...prev, coverImage: data.url } : null));
      } else {
        setError(data.error || "Failed to upload cover image.");
      }
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFeatureChange = (index: number, val: string) => {
    if (!formData) return;
    const feats = [...formData.features];
    feats[index] = val;
    setFormData({ ...formData, features: feats });
  };

  const handleAddFeature = () => {
    if (!formData) return;
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const handleRemoveFeature = (index: number) => {
    if (!formData) return;
    const feats = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: feats });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    setError(null);

    try {
      const res = await updateIssue(formData);
      if (res.success) {
        if (onSuccess) onSuccess(`Saved changes to ${formData.title}`);
        onClose();
      } else {
        setError(res.message || "Failed to save changes.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData) return;
    if (
      window.confirm(
        `Are you sure you want to permanently delete Volume ${formData.volume} Issue ${formData.issue}?`
      )
    ) {
      await deleteIssue(formData.volume, formData.issue);
      if (onSuccess) onSuccess(`Deleted Volume ${formData.volume} Issue ${formData.issue}`);
      onClose();
    }
  };

  const handleMakeLive = async () => {
    if (!formData) return;
    await setIssueLive(formData.volume, formData.issue);
    if (onSuccess)
      onSuccess(
        `Volume ${formData.volume} Issue ${formData.issue} is now the Live Current Edition!`
      );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto font-sans animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0B291D] border border-[#C59B27]/40 text-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div className="bg-[#071F16] border-b border-[#C59B27]/30 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#134E36] border border-[#C59B27]/40 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#D8B045]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#D8B045] tracking-widest">
                MAGAZINE ISSUE EDITOR
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Edit {formData.title} ({formData.date})
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!formData.isCurrent && (
              <button
                type="button"
                onClick={handleMakeLive}
                className="px-3 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs transition-colors"
              >
                Promote to Live Edition
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-red-900/40 border border-red-500/50 flex items-start space-x-3 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Info */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Volume #
                  </label>
                  <input
                    type="number"
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: Number(e.target.value) })
                    }
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
                    value={formData.issue}
                    onChange={(e) =>
                      setFormData({ ...formData, issue: Number(e.target.value) })
                    }
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
                    value={formData.pageCount}
                    onChange={(e) =>
                      setFormData({ ...formData, pageCount: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Publication Date / Month
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Issue Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Issue Theme / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-sm focus:border-[#C59B27] focus:outline-none"
                  required
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <div className="flex items-center space-x-3">
                  {(["current", "archived", "draft"] as const).map((st) => (
                    <label
                      key={st}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer border transition-colors ${
                        formData.status === st
                          ? "bg-[#C59B27] text-[#0B291D] border-[#C59B27]"
                          : "bg-[#071F16] text-white/70 border-white/20 hover:border-white/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueStatus"
                        value={st}
                        checked={formData.status === st}
                        onChange={() => setFormData({ ...formData, status: st, isCurrent: st === "current" })}
                        className="hidden"
                      />
                      <span>{st === "current" ? "Live Current" : st}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Issuu Links */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] text-white/70 mb-1">
                    Issuu Publication URL
                  </label>
                  <input
                    type="url"
                    value={formData.issuuUrl}
                    onChange={(e) => setFormData({ ...formData, issuuUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-white/70 mb-1">
                    Issuu Direct Embed URL (for embedded iframe flipbook)
                  </label>
                  <input
                    type="url"
                    value={formData.issuuEmbedUrl}
                    onChange={(e) => setFormData({ ...formData, issuuEmbedUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right: Cover Image */}
            <div className="md:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">
                Cover Image
              </label>

              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#C59B27]/40 bg-[#071F16] shadow-xl">
                {formData.coverImage ? (
                  <Image
                    src={formData.coverImage}
                    alt={formData.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/40 p-4 text-center">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-xs">No Cover Image</span>
                  </div>
                )}
              </div>

              <label className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center space-x-2 cursor-pointer border border-white/20 transition-colors">
                {uploadingImage ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-[#D8B045]" />
                )}
                <span>{uploadingImage ? "Uploading..." : "Upload New Cover"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="Image path or URL"
                className="w-full px-3 py-1.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feature Story Highlights ({formData.features?.length || 0})</span>
              </div>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-[#D8B045] hover:text-white font-semibold"
              >
                + Add Feature Bullet
              </button>
            </div>

            <div className="space-y-2">
              {formData.features?.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-[#134E36] text-[#D8B045] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-900/50 text-white/50 hover:text-red-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-[#071F16] border-t border-[#C59B27]/30 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Issue</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
