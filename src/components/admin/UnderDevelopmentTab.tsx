"use client";

import React from "react";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  Clock,
  Layers,
  Send,
  Users,
  Megaphone,
  Ruler,
  Award,
  Sprout,
  Compass,
  HeartHandshake,
  Mail,
  CheckCircle2,
  Eye,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import { AdminTab } from "./AdminSidebar";

interface UnderDevelopmentTabProps {
  tabId: AdminTab;
  onNavigateTab: (tab: AdminTab) => void;
  onOpenPublisherModal: () => void;
}

const MODULE_DETAILS: Record<
  string,
  {
    title: string;
    description: string;
    icon: any;
    deliverables: string[];
    upcomingFeatures: string[];
  }
> = {
  issues_dev: {
    title: "Volume Archives & 25-Year Vault Repository",
    description:
      "Multi-decade digital archive shelf management, historical back-issue repository, volume categorization, and full-text search indexing across 25+ years of Golf Central Magazine editions.",
    icon: BookOpen,
    deliverables: [
      "25-year historical magazine catalog and volume organization (Vol 1 to Vol 27)",
      "Back-issue metadata indexer with high-resolution archive cover gallery",
      "Issue search by volume, publication date, editorial theme, and department keywords",
    ],
    upcomingFeatures: [
      "Batch PDF back-catalog uploader and automated OCR digitization",
      "Subscriber-only vintage issue download gateway & high-res print export",
    ],
  },
  dashboard_dev: {
    title: "Executive Analytics & Publication Dashboard",
    description:
      "High-level readership metrics, geographical audience breakdown, digital flipbook impressions, and monthly executive summaries.",
    icon: LayoutDashboard,
    deliverables: [
      "Digital readership & page-turn engagement metrics",
      "Regional audience analytics across Florida, Georgia, and Carolina golf clubs",
      "Print subscriber circulation and digital flipbook read completion rates",
    ],
    upcomingFeatures: [
      "Direct Google Analytics 4 integration",
      "Automated monthly executive PDF digest report",
    ],
  },
  articles_dev: {
    title: "Articles & Editorial Story Desk",
    description:
      "Manage all featured stories, lead column articles, categories, author credits, and rich editorial excerpts.",
    icon: Layers,
    deliverables: [
      "Create, edit, and publish rich markdown articles across all categories",
      "Assign lead stories to the homepage spotlight grid and hero carousels",
      "Upload high-res photography galleries and credit photojournalists",
    ],
    upcomingFeatures: ["AI-assisted headline & excerpt generation", "Scheduled article embargo dates"],
  },
  theme_dev: {
    title: "Theme & Visual Styling Customizer",
    description:
      "Complete control over luxury brand colors, typography, header styling, cards, and dynamic UI tokens.",
    icon: Layers,
    deliverables: [
      "Real-time color picker for Primary Emerald, Deep Forest, Champagne Gold, and Bronze accents",
      "Font selector for Playfair Display, Cinzel, Montserrat, and Cormorant Garamond",
      "Header bar color customizer, borders, glow effects, and card curvature",
    ],
    upcomingFeatures: ["Export & import custom seasonal color presets", "Live multi-device viewport preview"],
  },
  inspector_dev: {
    title: "Flipbook Simulator & Interactive Inspector",
    description:
      "Live interactive testing environment for digital flipbook embeds, Issuu readers, and mobile responsive reading.",
    icon: Eye,
    deliverables: [
      "Real-time Issuu digital reader iframe inspector with page-turn diagnostics",
      "Mobile portrait vs tablet landscape flipbook layout simulator",
      "Cover thumbnail generator and fast CDN link tester",
    ],
    upcomingFeatures: ["Offline PDF preflight packaging", "Reader heat-map analytics"],
  },
  settings_dev: {
    title: "Site Settings & Conditions Ticker Desk",
    description:
      "Configure global website contact information, social media links, SEO tags, and live turf condition ticker.",
    icon: Layers,
    deliverables: [
      "Live condition ticker editor (Turf grass variety, Stimpmeter green speed, Lake Wales weather)",
      "Global phone numbers, mailing address, and editorial contact emails",
      "Social media links (Facebook, Instagram, X/Twitter, LinkedIn, YouTube)",
    ],
    upcomingFeatures: ["Automated weather station NOAA sync", "Multi-language locale support"],
  },
  staff_dev: {
    title: "Editorial Staff & Masthead Management",
    description:
      "Full administrative control over the 25-year editorial masthead, writer biographies, awards, badges, and photo credentials.",
    icon: Users,
    deliverables: [
      "Add, edit, or reorder staff members (Publisher, Editor-in-Chief, Columnists, Greenkeepers)",
      "Upload high-resolution headshots and assign category badges (Leadership, Writers, Agronomy, PGA)",
      "Edit executive quotes, bio paragraphs, and career milestone bullet points",
    ],
    upcomingFeatures: ["Direct email inquiry routing", "Guest contributor guest-post invites"],
  },
  advertising_dev: {
    title: "Advertising & Media Kit Package Manager",
    description:
      "Configure digital and print advertising rates, full-page spread specifications, and media kit inquiry workflows.",
    icon: Megaphone,
    deliverables: [
      "Manage Ad Packages (Full Page Spread, 2-Page Editorial, 1/2 Page Horizontal, 1/4 Page Showcase)",
      "Set dimensions, bleed specifications, print reach, and digital readership metrics",
      "Export auto-generated PDF media kits with custom seasonal rate cards",
    ],
    upcomingFeatures: ["Direct advertiser lead CRM pipeline", "Stripe insertion order invoicing"],
  },
  adspec_dev: {
    title: "Ad Dimensions & Technical Spec Sheet",
    description:
      "Manage print mechanical requirements, PDF/X-1a compliance specs, CMYK profile guides, and digital click-through links.",
    icon: Ruler,
    deliverables: [
      "Interactive trim, bleed, and safe-zone interactive guide",
      "Dynamic ad specification calculator for brand agencies",
      "Artwork upload pre-flight validation check",
    ],
    upcomingFeatures: ["Automated 300 DPI resolution inspector", "Direct artwork approval portal"],
  },
  nomination_dev: {
    title: "Florida Golf Leader Nominations & Leaderboard",
    description:
      "Review incoming nominations for Superintendent of the Year, PGA Professional of the Year, and Military Veteran of the Year.",
    icon: Award,
    deliverables: [
      "Manage 4 Official Award Categories & submission forms",
      "Filter, score, and approve leader nominations from clubs across Florida",
      "Publish annual winners directly to the digital magazine and website",
    ],
    upcomingFeatures: ["Public voting ballot tallying", "Nomination certificate generator"],
  },
  agronomy_dev: {
    title: "Turf Agronomy & GCSAA Showcase Editor",
    description:
      "Curate the monthly agronomy spotlight, moisture probe data, sub-air systems, and superintendent protocols.",
    icon: Sprout,
    deliverables: [
      "Designate the active Agronomy Deep-Dive story for the homepage",
      "Manage live turf conditions (Stimpmeter speed, grass variety, humidity protocols)",
      "Collaborate with Florida GCSA greenkeeping editors",
    ],
    upcomingFeatures: ["Live weather API sync from Lake Wales station", "Turf disease diagnostic index"],
  },
  lifestyle_dev: {
    title: "Clubhouse Lifestyle & Artisan Craft Showcase",
    description:
      "Spotlight luxury clubhouse living, hand-stitched tour bags, bespoke clubmaking, and native bourbon craft.",
    icon: Compass,
    deliverables: [
      "Manage Civilion lifestyle brand partnerships and artisan gear reviews",
      "Curate product galleries and clickable luxury purchase links",
    ],
    upcomingFeatures: ["Interactive 3D product view", "Private club dining guide"],
  },
  philanthropy_dev: {
    title: "Military Veteran Philanthropy Desk",
    description:
      "Administer coverage for PGA HOPE, Folds of Honor, and annual Florida Military Golf Invitationals.",
    icon: HeartHandshake,
    deliverables: [
      "Feature charity tournament schedules and donor spotlights",
      "Showcase wounded warrior testimonials and photojournalism",
    ],
    upcomingFeatures: ["Tournament registration link builder", "Donation impact tracker"],
  },
  newsletter_dev: {
    title: "VIP Dispatch & Digital Subscriber List",
    description:
      "Manage readers subscribed to the monthly digital ezine dispatch and early release alerts.",
    icon: Mail,
    deliverables: [
      "View and export subscriber email list (.CSV / Excel)",
      "Broadcast monthly new edition launch announcements directly to readers",
    ],
    upcomingFeatures: ["Mailchimp & Constant Contact API sync", "Open rate analytics"],
  },
};

export const UnderDevelopmentTab: React.FC<UnderDevelopmentTabProps> = ({
  tabId,
  onNavigateTab,
  onOpenPublisherModal,
}) => {
  const details = MODULE_DETAILS[tabId] || {
    title: "Feature Module",
    description: "This management module is scheduled for Phase 2 rollout.",
    icon: Layers,
    deliverables: ["Full administrative management tools", "Live sync with website"],
    upcomingFeatures: ["Advanced analytics", "Automation"],
  };

  const Icon = details.icon;

  return (
    <div className="space-y-8 font-sans animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F3D2A] via-[#134E36] to-[#0F3D2A] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D8B045] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Phase 2 Editorial Module • Staged for Next Sprint</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#071F16] border border-[#C59B27]/50 flex items-center justify-center shadow-inner shrink-0">
              <Icon className="w-6 h-6 text-[#D8B045]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{details.title}</h2>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">{details.description}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-1">
            To ensure a seamless, focused launch for your client, this specific administrative module is staged in the Phase 2 milestone roadmap. The core monthly publishing cycle, digital archive management, story editor, and visual theme customizer are fully live and operational.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab("publisher")}
              className="px-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#D8B045] text-[#0B291D] font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Return to Monthly Magazine Desk
            </button>

            <button
              onClick={onOpenPublisherModal}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#D8B045]" />
              <span>Publish Monthly Issue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Blueprint / Feature Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Planned Core Tools */}
        <div className="bg-[#0F3D2A] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>Planned Administrative Tools (Phase 2)</span>
          </div>

          <ul className="space-y-3">
            {details.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs text-white/80">
                <span className="w-5 h-5 rounded-lg bg-[#071F16] border border-[#C59B27]/40 text-[#D8B045] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future Integrations */}
        <div className="bg-[#0F3D2A] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="text-xs font-bold text-[#D8B045] uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-3">
            <Layers className="w-4 h-4" />
            <span>Upcoming Automations &amp; Integrations</span>
          </div>

          <ul className="space-y-3">
            {details.upcomingFeatures.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#D8B045] shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
