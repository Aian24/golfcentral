"use client";

import React, { useState } from "react";
import {
  Settings,
  Save,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { SiteInfoData, CurrentEditionData } from "@/lib/types";

interface SiteSettingsTabProps {
  onSuccess?: (msg: string) => void;
}

export const SiteSettingsTab: React.FC<SiteSettingsTabProps> = ({ onSuccess }) => {
  const {
    siteInfo,
    currentEdition,
    updateSiteSettings,
    resetToDefaults,
    importStoreData,
    issues,
    articles,
  } = useEditorialData();

  const [siteForm, setSiteForm] = useState<SiteInfoData>({ ...siteInfo });
  const [editionForm, setEditionForm] = useState<CurrentEditionData>({ ...currentEdition });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSettings(siteForm, editionForm);
      setSaveSuccess(true);
      if (onSuccess) onSuccess("Site settings & live edition banner updated successfully!");
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert("Failed to update site settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportBackup = () => {
    const fullBackup = {
      siteInfo: siteForm,
      currentEdition: editionForm,
      issues,
      articles,
      exportedAt: new Date().toISOString(),
      platform: "Golf Central Magazine Editorial System",
    };

    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `golf_central_mag_backup_${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (onSuccess) onSuccess("JSON Data Backup downloaded successfully!");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.issues && Array.isArray(parsed.issues)) {
          await importStoreData(parsed);
          if (onSuccess) onSuccess("Successfully restored magazine data from backup JSON!");
        } else {
          alert("Invalid backup JSON format: Missing issues array.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data back to original factory defaults? All custom changes will be replaced."
      )
    ) {
      await resetToDefaults();
      if (onSuccess) onSuccess("Successfully reset data to factory defaults.");
    }
  };

  return (
    <div className="space-y-8 font-sans animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System Configuration &amp; Backups</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Site Settings, Tickers &amp; Database Backups
        </h2>
        <p className="text-xs sm:text-sm text-white/70 mt-1">
          Customize live site branding, update the weather and turf ticker, and export JSON backups.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-500/50 flex items-center space-x-3 text-xs text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved and synchronized with live website!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Live Edition & Ticker Info Card */}
        <div className="bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D8B045]" />
              <span>Homepage Header &amp; Conditions Ticker</span>
            </h3>
            <span className="text-xs text-[#D8B045]">Live Frontend Elements</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Edition Season Subtitle
              </label>
              <input
                type="text"
                value={editionForm.season}
                onChange={(e) => setEditionForm({ ...editionForm, season: e.target.value })}
                placeholder="e.g. Summer Luxury Edition"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Magazine Tagline
              </label>
              <input
                type="text"
                value={siteForm.tagline}
                onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
                placeholder="The Voice of Golf in Florida & The Southeast Since 1999"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Live Temperature Ticker
              </label>
              <input
                type="text"
                value={editionForm.temperature}
                onChange={(e) => setEditionForm({ ...editionForm, temperature: e.target.value })}
                placeholder="e.g. 78°F"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Course &amp; Green Conditions Ticker
              </label>
              <input
                type="text"
                value={editionForm.conditions}
                onChange={(e) => setEditionForm({ ...editionForm, conditions: e.target.value })}
                placeholder="e.g. Clear • Bermuda Greens Rolling at 12.5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact & Publication Info Card */}
        <div className="bg-[#0F3D2A] border border-white/15 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Building className="w-4 h-4 text-[#D8B045]" />
              <span>Publisher Contact &amp; Headquarters</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={siteForm.phone}
                onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                placeholder="863-875-6863"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Editorial Email
              </label>
              <input
                type="email"
                value={siteForm.email}
                onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                placeholder="info@golfcentralmag.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                Office Location Address
              </label>
              <input
                type="text"
                value={siteForm.location}
                onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
                placeholder="4313 Berwick Dr. Lake Wales, FL 33859"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs focus:border-[#C59B27] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Settings..." : "Save Site Settings"}</span>
          </button>
        </div>
      </form>

      {/* Database Backup & Restore Station */}
      <div className="bg-[#071F16] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider mb-1">
            Data Safety &amp; Portability
          </div>
          <h3 className="text-xl font-bold text-white">Database Backup &amp; Recovery Desk</h3>
          <p className="text-xs text-white/70 mt-1">
            Safely download backups of all magazine issues and articles, restore from files, or reset to original factory state.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Export */}
          <div className="p-5 rounded-2xl bg-[#0F3D2A] border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-sm font-bold text-white">Export Full JSON Backup</div>
              <p className="text-xs text-white/70 mt-1">
                Download a complete standalone JSON archive of all issues, articles, and settings.
              </p>
            </div>
            <button
              onClick={handleExportBackup}
              className="w-full py-2.5 bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-5 rounded-2xl bg-[#0F3D2A] border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-sm font-bold text-white">Restore from JSON</div>
              <p className="text-xs text-white/70 mt-1">
                Upload a previous JSON backup file to instantly restore all issues and articles.
              </p>
            </div>
            <label className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              <Upload className="w-4 h-4 text-[#D8B045]" />
              <span>Upload Backup File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset */}
          <div className="p-5 rounded-2xl bg-[#0F3D2A] border border-red-500/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-sm font-bold text-red-300">Factory Reset</div>
              <p className="text-xs text-white/70 mt-1">
                Revert all issues, articles, and site settings back to original clean defaults.
              </p>
            </div>
            <button
              onClick={handleResetDefaults}
              className="w-full py-2.5 bg-red-900/40 hover:bg-red-900 text-red-200 border border-red-500/40 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
