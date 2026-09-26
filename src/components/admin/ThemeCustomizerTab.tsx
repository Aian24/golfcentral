"use client";

import React, { useState } from "react";
import {
  Palette,
  Type,
  Maximize2,
  Save,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Eye,
  Layers,
  Layout,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useEditorialData } from "@/context/EditorialDataContext";
import { ThemeSettingsData, DEFAULT_THEME_SETTINGS } from "@/lib/types";
import { CustomDropdown } from "@/components/CustomDropdown";

const HEADING_STYLE_OPTIONS = [
  { value: "normal", label: "Standard Title Case" },
  { value: "uppercase", label: "UPPERCASE (All Caps)" },
  { value: "italic", label: "Italicized Luxury Editorial" },
  { value: "serif", label: "Classic Regal Serif" },
];

const LETTER_SPACING_OPTIONS = [
  { value: "tight", label: "Tight (Compact Impact)" },
  { value: "normal", label: "Normal (Balanced)" },
  { value: "wide", label: "Wide (Spacious Modern)" },
  { value: "luxury", label: "Luxury Tracking (0.15em Spaced)" },
];

const HEADER_HEIGHT_OPTIONS = [
  { value: "compact", label: "Compact (64px)" },
  { value: "standard", label: "Standard (76px)" },
  { value: "luxury", label: "Luxury Tall (88px)" },
];

interface ThemeCustomizerTabProps {
  onSuccess?: (msg: string) => void;
}

const COLOR_PRESETS = [
  {
    name: "Augusta Masters Green & Champagne Gold (Signature)",
    theme: {
      primaryColor: "#0F3D2A",
      forestDark: "#071F16",
      accentGold: "#C59B27",
      accentGoldLight: "#D8B045",
      headerBg: "#0F3D2A",
      navbarBg: "#0F3D2A",
      footerBg: "#0B291D",
      bodyBg: "#FAF8F5",
      textPrimary: "#0F172A",
      textMuted: "#64748B",
    },
  },
  {
    name: "Emerald Night & Royal Gold (High Contrast)",
    theme: {
      primaryColor: "#0B291D",
      forestDark: "#05160E",
      accentGold: "#D8B045",
      accentGoldLight: "#F3DE9F",
      headerBg: "#071F16",
      navbarBg: "#071F16",
      footerBg: "#04120D",
      bodyBg: "#F4F7F4",
      textPrimary: "#071F16",
      textMuted: "#4B6358",
    },
  },
  {
    name: "Pinehurst Heritage & Classic Bronze",
    theme: {
      primaryColor: "#1B3B2B",
      forestDark: "#102319",
      accentGold: "#B8860B",
      accentGoldLight: "#DAA520",
      headerBg: "#142D21",
      navbarBg: "#142D21",
      footerBg: "#0D1E15",
      bodyBg: "#FBF9F4",
      textPrimary: "#1A202C",
      textMuted: "#718096",
    },
  },
  {
    name: "Pebble Beach Coastal Cypress & Sand",
    theme: {
      primaryColor: "#134E36",
      forestDark: "#0A291D",
      accentGold: "#C59B27",
      accentGoldLight: "#E8C86D",
      headerBg: "#134E36",
      navbarBg: "#134E36",
      footerBg: "#0A291D",
      bodyBg: "#FAF7F2",
      textPrimary: "#111827",
      textMuted: "#6B7280",
    },
  },
];

const FONT_HEADING_OPTIONS = [
  { label: "Playfair Display (Editorial Luxury Serif)", value: "Playfair Display" },
  { label: "Cormorant Garamond (High-Fashion Elegant Serif)", value: "Cormorant Garamond" },
  { label: "Plus Jakarta Sans (Modern Executive Sans)", value: "Plus Jakarta Sans" },
  { label: "Cinzel (Regal Classic Roman Serif)", value: "Cinzel" },
  { label: "Outfit (Clean Architectural Sans)", value: "Outfit" },
  { label: "Montserrat (Bold Geometric Sans)", value: "Montserrat" },
];

const FONT_BODY_OPTIONS = [
  { label: "Plus Jakarta Sans (Crisp & Readable)", value: "Plus Jakarta Sans" },
  { label: "Inter (Universal Modern Sans)", value: "Inter" },
  { label: "Roboto (Classic Modern Sans)", value: "Roboto" },
  { label: "System Sans-Serif (Native UI)", value: "sans-serif" },
];

export const ThemeCustomizerTab: React.FC<ThemeCustomizerTabProps> = ({ onSuccess }) => {
  const { themeSettings, updateThemeSettings } = useEditorialData();

  const [form, setForm] = useState<ThemeSettingsData>({
    ...DEFAULT_THEME_SETTINGS,
    ...(themeSettings || {}),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"colors" | "typography" | "sizes" | "header">("colors");

  const handlePresetSelect = (preset: typeof COLOR_PRESETS[0]) => {
    setForm((prev) => ({
      ...prev,
      ...preset.theme,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateThemeSettings(form);
      if (res.success) {
        if (onSuccess) onSuccess(res.message);
      } else {
        alert(res.message);
      }
    } catch {
      alert("Failed to save theme settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all theme customizations back to default Golf Central Magazine branding?")) {
      setForm({ ...DEFAULT_THEME_SETTINGS });
    }
  };

  return (
    <div className="space-y-8 font-sans animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Design System Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Theme &amp; Visual Styling Customizer
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Tailor the palette, typography, font sizes, header/navbar colors, and visual tokens across the website in real time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Applying..." : "Apply & Save Theme"}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: "colors", label: "Colors & Palette", icon: Palette },
          { id: "typography", label: "Typography & Fonts", icon: Type },
          { id: "sizes", label: "Font Sizes & Scale", icon: Maximize2 },
          { id: "header", label: "Header & Navbar Styling", icon: Layout },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#C59B27] text-[#0B291D] shadow"
                  : "bg-[#0F3D2A] text-white/70 hover:text-white hover:bg-[#134E36]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Grid: Controls (7 cols) + Live Component Sandbox (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TAB 1: COLORS & PALETTE */}
          {activeSubTab === "colors" && (
            <div className="space-y-6">
              {/* Presets */}
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>One-Click Curated Color Themes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className="p-3 rounded-xl bg-[#071F16] hover:bg-[#134E36] border border-white/10 hover:border-[#C59B27]/50 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="text-xs font-semibold text-white truncate mr-2">
                        {preset.name}
                      </div>
                      <div className="flex items-center space-x-1 shrink-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.theme.primaryColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.theme.accentGold }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.theme.bodyBg }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Greens & Dark Shades */}
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Brand Greens &amp; Dark Backgrounds
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Primary Fairway Green
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.primaryColor}
                        onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.primaryColor}
                        onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:border-[#C59B27] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Deep Forest Background
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.forestDark}
                        onChange={(e) => setForm({ ...form, forestDark: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.forestDark}
                        onChange={(e) => setForm({ ...form, forestDark: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:border-[#C59B27] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Champagne Golds */}
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Champagne Gold Accents
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Champagne Gold (Main Accent)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.accentGold}
                        onChange={(e) => setForm({ ...form, accentGold: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.accentGold}
                        onChange={(e) => setForm({ ...form, accentGold: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:border-[#C59B27] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Light Gold (Highlights &amp; Badges)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.accentGoldLight}
                        onChange={(e) => setForm({ ...form, accentGoldLight: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.accentGoldLight}
                        onChange={(e) => setForm({ ...form, accentGoldLight: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:border-[#C59B27] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Surface & Body Colors */}
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Body Background &amp; Typography Colors
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/80 mb-1">
                      Body Canvas Background
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={form.bodyBg}
                        onChange={(e) => setForm({ ...form, bodyBg: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.bodyBg}
                        onChange={(e) => setForm({ ...form, bodyBg: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/80 mb-1">
                      Headings &amp; Text Primary
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={form.textPrimary}
                        onChange={(e) => setForm({ ...form, textPrimary: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.textPrimary}
                        onChange={(e) => setForm({ ...form, textPrimary: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/80 mb-1">
                      Muted Subtitle Text
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={form.textMuted}
                        onChange={(e) => setForm({ ...form, textMuted: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.textMuted}
                        onChange={(e) => setForm({ ...form, textMuted: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY & FONTS */}
          {activeSubTab === "typography" && (
            <div className="space-y-6">
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Headings &amp; Title Typography
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    Heading Font Family
                  </label>
                  <CustomDropdown
                    value={form.fontHeading}
                    onChange={(val) => setForm({ ...form, fontHeading: val })}
                    options={FONT_HEADING_OPTIONS}
                    variant="dark"
                    size="sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Heading Style Variant
                    </label>
                    <CustomDropdown
                      value={form.headingStyle}
                      onChange={(val) => setForm({ ...form, headingStyle: val as any })}
                      options={HEADING_STYLE_OPTIONS}
                      variant="dark"
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Letter Spacing (Tracking)
                    </label>
                    <CustomDropdown
                      value={form.letterSpacing}
                      onChange={(val) => setForm({ ...form, letterSpacing: val as any })}
                      options={LETTER_SPACING_OPTIONS}
                      variant="dark"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Body Text &amp; Article Paragraphs
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    Body Font Family
                  </label>
                  <CustomDropdown
                    value={form.fontBody}
                    onChange={(val) => setForm({ ...form, fontBody: val })}
                    options={FONT_BODY_OPTIONS}
                    variant="dark"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FONT SIZES & SCALE */}
          {activeSubTab === "sizes" && (
            <div className="space-y-6">
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-5">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Global Typography Scale &amp; Sizing
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>Base Body Font Size</span>
                    <span className="text-[#D8B045] font-bold">{form.baseFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={19}
                    step={1}
                    value={form.baseFontSize}
                    onChange={(e) => setForm({ ...form, baseFontSize: Number(e.target.value) })}
                    className="w-full accent-[#C59B27]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>14px (Compact)</span>
                    <span>16px (Standard)</span>
                    <span>19px (Large Editorial)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>Heading Scale Multiplier</span>
                    <span className="text-[#D8B045] font-bold">{form.headingScale}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.9}
                    max={1.3}
                    step={0.05}
                    value={form.headingScale}
                    onChange={(e) => setForm({ ...form, headingScale: Number(e.target.value) })}
                    className="w-full accent-[#C59B27]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>0.9x (Subtle)</span>
                    <span>1.0x (Balanced)</span>
                    <span>1.3x (Cinematic Large)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    Card &amp; UI Corner Radius
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: "sharp", label: "Sharp (4px)" },
                        { id: "modern", label: "Modern (12px)" },
                        { id: "luxury", label: "Luxury (20px)" },
                        { id: "pill", label: "Pill (Full)" },
                      ] as const
                    ).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setForm({ ...form, borderRadius: r.id })}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center border transition-colors ${
                          form.borderRadius === r.id
                            ? "bg-[#C59B27] text-[#0B291D] border-[#C59B27] font-bold"
                            : "bg-[#071F16] text-white/70 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HEADER & NAVBAR */}
          {activeSubTab === "header" && (
            <div className="space-y-6">
              <div className="bg-[#0F3D2A] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Header &amp; Navbar Color &amp; Height
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Navbar Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.navbarBg}
                        onChange={(e) => setForm({ ...form, navbarBg: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.navbarBg}
                        onChange={(e) => setForm({ ...form, navbarBg: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Footer Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={form.footerBg}
                        onChange={(e) => setForm({ ...form, footerBg: e.target.value })}
                        className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.footerBg}
                        onChange={(e) => setForm({ ...form, footerBg: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#071F16] border border-white/20 text-white text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Header Bar Height
                    </label>
                    <CustomDropdown
                      value={form.headerHeight}
                      onChange={(val) => setForm({ ...form, headerHeight: val as any })}
                      options={HEADER_HEIGHT_OPTIONS}
                      variant="dark"
                      size="sm"
                    />
                  </div>

                  <div className="flex flex-col justify-end space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={form.headerBlur}
                        onChange={(e) => setForm({ ...form, headerBlur: e.target.checked })}
                        className="w-4 h-4 rounded text-[#C59B27]"
                      />
                      <span>Glassmorphism Blur Overlay</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={form.headerSticky}
                        onChange={(e) => setForm({ ...form, headerSticky: e.target.checked })}
                        className="w-4 h-4 rounded text-[#C59B27]"
                      />
                      <span>Sticky Navigation on Scroll</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Component Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Real-Time Component Sandbox</span>
            </div>
            <span className="text-[10px] text-white/50">Simulated Canvas</span>
          </div>

          {/* Interactive Mock Container */}
          <div
            className="rounded-3xl border border-[#C59B27]/40 overflow-hidden shadow-2xl transition-all"
            style={{ backgroundColor: form.bodyBg }}
          >
            {/* Mock Header */}
            <div
              className="p-3.5 flex items-center justify-between border-b transition-colors"
              style={{
                backgroundColor: form.navbarBg,
                borderColor: `${form.accentGold}33`,
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-xs tracking-wider">
                  GOLF CENTRAL
                </span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: form.accentGold, color: form.forestDark }}
                >
                  25 YRS
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[10px] font-semibold text-white/80">
                <span style={{ color: form.accentGoldLight }}>Home</span>
                <span>Archive</span>
                <button
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all shadow"
                  style={{ backgroundColor: form.accentGold, color: form.forestDark }}
                >
                  Read Issue
                </button>
              </div>
            </div>

            {/* Mock Hero Story Card */}
            <div className="p-4 space-y-3">
              <div
                className="p-4 rounded-2xl transition-all shadow-md relative overflow-hidden"
                style={{
                  backgroundColor: form.primaryColor,
                  color: "#ffffff",
                  fontFamily: form.fontHeading,
                }}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span
                    className="px-2 py-0.5 rounded-full font-bold uppercase"
                    style={{ backgroundColor: `${form.accentGold}33`, color: form.accentGoldLight }}
                  >
                    Cover Story // Architecture
                  </span>
                  <span className="text-white/60">6 min read</span>
                </div>

                <h3
                  className={`text-base font-bold leading-tight ${
                    form.headingStyle === "uppercase"
                      ? "uppercase"
                      : form.headingStyle === "italic"
                      ? "italic"
                      : ""
                  }`}
                  style={{
                    letterSpacing:
                      form.letterSpacing === "luxury"
                        ? "0.15em"
                        : form.letterSpacing === "wide"
                        ? "0.08em"
                        : form.letterSpacing === "tight"
                        ? "-0.03em"
                        : "normal",
                  }}
                >
                  The Architecture of Whispering Pines: Designing Florida&apos;s Coastal Sanctuary
                </h3>

                <p
                  className="text-xs text-white/80 mt-2 line-clamp-2"
                  style={{ fontFamily: form.fontBody }}
                >
                  How master architects are harmonizing unforgiving water hazards, native pine scrub, and velvet Bermuda turf into an unforgettable test.
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                  <span className="text-white/60">By Terrie Purdum</span>
                  <span style={{ color: form.accentGoldLight }} className="font-bold flex items-center space-x-1">
                    <span>Read Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Mock Secondary Journal Item */}
              <div
                className="p-3.5 rounded-2xl bg-white border border-black/5 shadow-sm space-y-1.5"
                style={{ color: form.textPrimary }}
              >
                <div
                  className="text-[10px] font-bold uppercase"
                  style={{ color: form.accentGold }}
                >
                  Agronomy // Florida Greens
                </div>
                <h4
                  className="text-xs font-bold leading-snug"
                  style={{ fontFamily: form.fontHeading }}
                >
                  The Masters Protocol: What Florida Greenkeepers Learn from Augusta
                </h4>
                <p
                  className="text-[11px] line-clamp-2"
                  style={{ color: form.textMuted, fontFamily: form.fontBody }}
                >
                  Inside the high-precision science, sub-air systems, and soil biology that maintain championship putting greens.
                </p>
              </div>
            </div>

            {/* Mock Footer Banner */}
            <div
              className="p-3 text-center text-[10px] text-white/70 border-t"
              style={{
                backgroundColor: form.footerBg,
                borderColor: `${form.accentGold}22`,
              }}
            >
              <span>&copy; Golf Central Magazine • The Voice of Golf Since 1999</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0F3D2A] border border-white/10 text-center">
            <p className="text-[11px] text-white/70">
              Click <strong className="text-[#D8B045]">&quot;Apply &amp; Save Theme&quot;</strong> to inject these custom styles across the public website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
