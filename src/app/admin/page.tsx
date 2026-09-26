"use client";

import React, { useState, useEffect } from "react";
import { AdminAuthModal } from "@/components/admin/AdminAuthModal";
import { AdminSidebar, AdminTab } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { MonthlyPublisherTab } from "@/components/admin/MonthlyPublisherTab";
import { IssueManagerTab } from "@/components/admin/IssueManagerTab";
import { UnderDevelopmentTab } from "@/components/admin/UnderDevelopmentTab";
import { MonthlyPublisherModal } from "@/components/admin/MonthlyPublisherModal";
import { IssueEditModal } from "@/components/admin/IssueEditModal";
import { ArticleEditModal } from "@/components/admin/ArticleEditModal";
import { ExtendedMagazineIssue } from "@/lib/types";
import { Article } from "@/data/editorialData";
import { CheckCircle2, Sparkles, X } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("publisher");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [isPublisherOpen, setIsPublisherOpen] = useState<boolean>(false);
  const [editingIssue, setEditingIssue] = useState<ExtendedMagazineIssue | null>(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [inspectedIssueNumber, setInspectedIssueNumber] = useState<number | undefined>(undefined);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("gcm_admin_auth") === "true";
    const storedUser = sessionStorage.getItem("gcm_admin_user");
    if (isAuth && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gcm_admin_auth");
    sessionStorage.removeItem("gcm_admin_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleInspectIssue = (issueNum: number) => {
    setInspectedIssueNumber(issueNum);
    setActiveTab("inspector_dev");
  };

  const handleAddNewHistoricalIssue = () => {
    setEditingIssue({
      volume: 25,
      issue: 1,
      title: "Volume 25 Issue 1",
      theme: "Historical Back-Issue Feature",
      date: "January 2022",
      pageCount: 72,
      coverImage: "/images/hero_golf_championship.jpg",
      issuuUrl: "https://issuu.com/editorinchief",
      issuuEmbedUrl: "",
      features: ["Historical Feature Story", "Resort Showcase"],
      isCurrent: false,
      status: "archived",
    });
    setIsIssueModalOpen(true);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#071F16] flex items-center justify-center text-white font-sans">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#D8B045] font-bold">
            Verifying Editorial Session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminAuthModal
        onLoginSuccess={(loggedInUser) => {
          setIsAuthenticated(true);
          setUser(loggedInUser);
        }}
      />
    );
  }

  const isUnderDev = activeTab.endsWith("_dev");

  return (
    <div className="min-h-screen bg-[#071F16] text-[#F8F9FA] flex font-sans selection:bg-[#C59B27] selection:text-[#0B291D]">
      {/* Left Fixed Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenPublisherModal={() => setIsPublisherOpen(true)}
        onLogout={handleLogout}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        user={user}
      />

      {/* Main Content Area (offset by 72 (18rem) on large screens) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <AdminTopBar
          activeTab={activeTab}
          onOpenPublisherModal={() => setIsPublisherOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic Main Workspace Tab */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {activeTab === "publisher" && (
            <MonthlyPublisherTab
              onOpenPublisherModal={() => setIsPublisherOpen(true)}
              onEditIssue={(iss) => {
                setEditingIssue(iss);
                setIsIssueModalOpen(true);
              }}
              onNavigateToVault={() => setActiveTab("issues")}
            />
          )}

          {activeTab === "issues" && (
            <IssueManagerTab
              onOpenPublisherModal={() => setIsPublisherOpen(true)}
              onEditIssue={(iss) => {
                setEditingIssue(iss);
                setIsIssueModalOpen(true);
              }}
              onInspectIssue={handleInspectIssue}
              onAddNewHistoricalIssue={handleAddNewHistoricalIssue}
            />
          )}

          {/* Under Development Staged Modules */}
          {isUnderDev && (
            <UnderDevelopmentTab
              tabId={activeTab}
              onNavigateTab={setActiveTab}
              onOpenPublisherModal={() => setIsPublisherOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#134E36] border border-[#C59B27] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-[#D8B045] shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Monthly Publisher Modal */}
      <MonthlyPublisherModal
        isOpen={isPublisherOpen}
        onClose={() => setIsPublisherOpen(false)}
        onSuccess={triggerToast}
      />

      {/* Issue Edit Modal */}
      <IssueEditModal
        issue={editingIssue}
        isOpen={isIssueModalOpen}
        onClose={() => {
          setIsIssueModalOpen(false);
          setEditingIssue(null);
        }}
        onSuccess={triggerToast}
      />

      {/* Article Edit Modal */}
      <ArticleEditModal
        article={editingArticle}
        isOpen={isArticleModalOpen}
        onClose={() => {
          setIsArticleModalOpen(false);
          setEditingArticle(null);
        }}
        onSuccess={triggerToast}
      />
    </div>
  );
}
