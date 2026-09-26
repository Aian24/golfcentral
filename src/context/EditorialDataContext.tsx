"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  SITE_INFO,
  CURRENT_EDITION,
  EXACT_ISSUES,
  ARTICLES,
  MagazineIssue,
  Article,
} from "@/data/editorialData";
import {
  ExtendedMagazineIssue,
  SiteInfoData,
  CurrentEditionData,
  ThemeSettingsData,
  DEFAULT_THEME_SETTINGS,
  MagazineStoreData,
} from "@/lib/types";

interface EditorialContextType {
  siteInfo: SiteInfoData;
  currentEdition: CurrentEditionData;
  themeSettings: ThemeSettingsData;
  issues: ExtendedMagazineIssue[];
  articles: Article[];
  currentIssue: ExtendedMagazineIssue;
  activeVolume: number;
  availableVolumes: number[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  publishMonthlyIssue: (
    issue: Partial<ExtendedMagazineIssue>,
    autoArchivePrevious?: boolean
  ) => Promise<{ success: boolean; message: string }>;
  updateIssue: (issue: ExtendedMagazineIssue) => Promise<{ success: boolean; message: string }>;
  setIssueLive: (volume: number, issue: number) => Promise<void>;
  archiveIssue: (volume: number, issue: number) => Promise<void>;
  deleteIssue: (volume: number, issue: number) => Promise<void>;
  saveArticle: (article: Article) => Promise<{ success: boolean; message: string }>;
  deleteArticle: (id: string) => Promise<void>;
  updateSiteSettings: (
    siteInfo: Partial<SiteInfoData>,
    currentEdition?: Partial<CurrentEditionData>
  ) => Promise<void>;
  updateThemeSettings: (theme: Partial<ThemeSettingsData>) => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => Promise<void>;
  importStoreData: (data: MagazineStoreData) => Promise<void>;
}

const EditorialDataContext = createContext<EditorialContextType | undefined>(undefined);

const initialIssues: ExtendedMagazineIssue[] = EXACT_ISSUES.map((issue, index) => ({
  ...issue,
  isCurrent: index === 0,
  status: index === 0 ? "current" : "archived",
}));

export const EditorialDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoData>({ ...SITE_INFO });
  const [currentEdition, setCurrentEdition] = useState<CurrentEditionData>({ ...CURRENT_EDITION });
  const [themeSettings, setThemeSettings] = useState<ThemeSettingsData>({ ...DEFAULT_THEME_SETTINGS });
  const [issues, setIssues] = useState<ExtendedMagazineIssue[]>(initialIssues);
  const [articles, setArticles] = useState<Article[]>([...ARTICLES]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Apply CSS custom properties whenever themeSettings changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--primary-brand", themeSettings.primaryColor);
      root.style.setProperty("--accent-gold", themeSettings.accentGold);
      root.style.setProperty("--accent-gold-light", themeSettings.accentGoldLight);
      root.style.setProperty("--header-bg", themeSettings.headerBg);
      root.style.setProperty("--navbar-bg", themeSettings.navbarBg);
      root.style.setProperty("--footer-bg", themeSettings.footerBg);
      root.style.setProperty("--surface-bg", themeSettings.bodyBg);
      root.style.setProperty("--text-primary", themeSettings.textPrimary);
      root.style.setProperty("--text-muted", themeSettings.textMuted);
      root.style.setProperty("--base-font-size", `${themeSettings.baseFontSize}px`);
    }
  }, [themeSettings]);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.siteInfo) setSiteInfo(json.data.siteInfo);
          if (json.data.currentEdition) setCurrentEdition(json.data.currentEdition);
          if (json.data.themeSettings) setThemeSettings(json.data.themeSettings);
          if (json.data.issues && json.data.issues.length > 0) setIssues(json.data.issues);
          if (json.data.articles && json.data.articles.length > 0) setArticles(json.data.articles);
        }
      }
    } catch (err) {
      console.warn("Could not fetch server content, using local fallback state", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Determine current active issue
  const currentIssue = useMemo(() => {
    const foundCurrent = issues.find((i) => i.isCurrent || i.status === "current");
    return foundCurrent || issues[0] || initialIssues[0];
  }, [issues]);

  const activeVolume = currentIssue ? currentIssue.volume : 27;

  // List of distinct volumes in descending order
  const availableVolumes = useMemo(() => {
    const volSet = new Set(issues.map((i) => i.volume));
    return Array.from(volSet).sort((a, b) => b - a);
  }, [issues]);

  const publishMonthlyIssue = async (
    newIssueData: Partial<ExtendedMagazineIssue>,
    autoArchivePrevious: boolean = true
  ) => {
    try {
      const res = await fetch("/api/issues/publish-monthly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIssueData, autoArchivePrevious, setAsCurrent: true }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error || "Failed to publish monthly issue" };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to publish monthly issue" };
    }
  };

  const updateIssue = async (issueData: ExtendedMagazineIssue) => {
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueData),
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
        return { success: true, message: data.message || "Issue saved successfully" };
      }
      return { success: false, message: data.error || "Failed to update issue" };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to update issue" };
    }
  };

  const setIssueLive = async (volume: number, issue: number) => {
    try {
      await fetch("/api/issues", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volume, issue, action: "setLive" }),
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to set issue live", err);
    }
  };

  const archiveIssue = async (volume: number, issue: number) => {
    try {
      await fetch("/api/issues", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volume, issue, action: "archive" }),
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to archive issue", err);
    }
  };

  const deleteIssue = async (volume: number, issue: number) => {
    try {
      await fetch(`/api/issues?volume=${volume}&issue=${issue}`, {
        method: "DELETE",
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to delete issue", err);
    }
  };

  const saveArticle = async (article: Article) => {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error || "Failed to save article" };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to save article" };
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await fetch(`/api/articles?id=${id}`, {
        method: "DELETE",
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to delete article", err);
    }
  };

  const updateSiteSettings = async (
    newSiteInfo: Partial<SiteInfoData>,
    newCurrentEdition?: Partial<CurrentEditionData>
  ) => {
    try {
      await fetch("/api/site-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteInfo: newSiteInfo,
          currentEdition: newCurrentEdition,
        }),
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to update site settings", err);
    }
  };

  const updateThemeSettings = async (theme: Partial<ThemeSettingsData>) => {
    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.theme) setThemeSettings(data.theme);
        return { success: true, message: data.message || "Theme applied successfully" };
      }
      return { success: false, message: data.error || "Failed to save theme" };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to save theme" };
    }
  };

  const resetToDefaults = async () => {
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to reset defaults", err);
    }
  };

  const importStoreData = async (data: MagazineStoreData) => {
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import", importData: data }),
      });
      await refreshData();
    } catch (err) {
      console.error("Failed to import data", err);
    }
  };

  return (
    <EditorialDataContext.Provider
      value={{
        siteInfo,
        currentEdition,
        themeSettings,
        issues,
        articles,
        currentIssue,
        activeVolume,
        availableVolumes,
        isLoading,
        refreshData,
        publishMonthlyIssue,
        updateIssue,
        setIssueLive,
        archiveIssue,
        deleteIssue,
        saveArticle,
        deleteArticle,
        updateSiteSettings,
        updateThemeSettings,
        resetToDefaults,
        importStoreData,
      }}
    >
      {children}
    </EditorialDataContext.Provider>
  );
};

export const useEditorialData = () => {
  const context = useContext(EditorialDataContext);
  if (!context) {
    throw new Error("useEditorialData must be used within an EditorialDataProvider");
  }
  return context;
};
