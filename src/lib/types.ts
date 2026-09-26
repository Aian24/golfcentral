import {
  MagazineIssue,
  Article,
  StaffMember,
  ADVERTISING_PACKAGES,
} from "@/data/editorialData";

export interface ExtendedMagazineIssue extends MagazineIssue {
  isCurrent?: boolean;
  status?: "current" | "archived" | "draft";
  archivedAt?: string;
  createdAt?: string;
}

export interface SiteInfoData {
  name: string;
  established: number;
  volume: number;
  activeIssue: number;
  season: string;
  location: string;
  phone: string;
  email: string;
  tagline: string;
  officialLogo: string;
  official25YearsBadge: string;
}

export interface CurrentEditionData {
  volume: number;
  issue: number;
  season: string;
  tagline: string;
  location: string;
  temperature: string;
  conditions: string;
}

export interface ThemeSettingsData {
  primaryColor: string;
  forestDark: string;
  accentGold: string;
  accentGoldLight: string;
  headerBg: string;
  navbarBg: string;
  footerBg: string;
  bodyBg: string;
  textPrimary: string;
  textMuted: string;
  fontHeading: string;
  fontBody: string;
  headingStyle: "normal" | "uppercase" | "italic" | "serif";
  letterSpacing: "tight" | "normal" | "wide" | "luxury";
  baseFontSize: number;
  headingScale: number;
  borderRadius: "sharp" | "modern" | "luxury" | "pill";
  headerHeight: "compact" | "standard" | "luxury";
  headerBlur: boolean;
  headerSticky: boolean;
}

export const DEFAULT_THEME_SETTINGS: ThemeSettingsData = {
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
  fontHeading: "Plus Jakarta Sans",
  fontBody: "Plus Jakarta Sans",
  headingStyle: "normal",
  letterSpacing: "normal",
  baseFontSize: 16,
  headingScale: 1.0,
  borderRadius: "luxury",
  headerHeight: "standard",
  headerBlur: true,
  headerSticky: true,
};

export interface MagazineStoreData {
  siteInfo: SiteInfoData;
  currentEdition: CurrentEditionData;
  themeSettings?: ThemeSettingsData;
  issues: ExtendedMagazineIssue[];
  articles: Article[];
  staff: StaffMember[];
  advertisingPackages: typeof ADVERTISING_PACKAGES;
  lastUpdated: string;
}
