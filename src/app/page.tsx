"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { FairwayFlyoverExperience } from "@/components/FairwayFlyoverExperience";
import { HeroVideoMarquee } from "@/components/HeroVideoMarquee";
import { FilterableStoryGrid } from "@/components/FilterableStoryGrid";
import { TurfAgronomyFeature } from "@/components/TurfAgronomyFeature";
import { LifestyleShowcase } from "@/components/LifestyleShowcase";
import { PhilanthropySection } from "@/components/PhilanthropySection";
import { StaffSection } from "@/components/StaffSection";
import { AdvertisingSection } from "@/components/AdvertisingSection";
import { AdSpecSection } from "@/components/AdSpecSection";
import { NominationSection } from "@/components/NominationSection";
import { ArchiveSection } from "@/components/ArchiveSection";
import { ContactSection } from "@/components/ContactSection";
import { NewsletterDispatch } from "@/components/NewsletterDispatch";
import { Footer } from "@/components/Footer";
import { ArticleReaderModal } from "@/components/ArticleReaderModal";
import { IssueReaderModal } from "@/components/IssueReaderModal";
import { SearchModal } from "@/components/SearchModal";
import { VideoModal } from "@/components/VideoModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AiChatAssistant } from "@/components/AiChatAssistant";
import { Article } from "@/data/editorialData";
import { useEditorialData } from "@/context/EditorialDataContext";

export default function Home() {
  const { articles, currentEdition, currentIssue } = useEditorialData();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const leadArticle = articles.find((a) => a.leadStory) || articles[0];
  const trendingArticles = articles.filter((a) => a.trending && a.id !== leadArticle?.id);
  const agronomyArticle =
    articles.find((a) => a.id === "art-2" || a.category === "Course Architecture & Turf") ||
    articles[1] ||
    leadArticle;
  const lifestyleArticle =
    articles.find((a) => a.id === "art-4" || a.category === "Lifestyle & Gear") ||
    articles[3] ||
    leadArticle;
  const philanthropyArticle =
    articles.find((a) => a.id === "art-5" || a.category === "Philanthropy & Military") ||
    articles[4] ||
    leadArticle;

  const isScrollingRef = React.useRef(false);

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    isScrollingRef.current = true;

    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        const navbarHeight = 80;
        const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }

    // Release scroll lock after smooth animation completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);
  };

  // Active tab scroll-spy: updates glowing active tab line as user scrolls
  React.useEffect(() => {
    const navSections = [
      { id: "contact", tab: "contact" },
      { id: "archive", tab: "archive" },
      { id: "nomination", tab: "nomination" },
      { id: "adspec", tab: "adspec" },
      { id: "advertising", tab: "advertising" },
      { id: "staff", tab: "staff" },
      { id: "home", tab: "home" },
    ];

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // 1. Bottom of page check
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      if (isAtBottom) {
        setActiveTab("contact");
        return;
      }

      // 2. Top of page check
      if (window.scrollY < 250) {
        setActiveTab("home");
        return;
      }

      // 3. Scan sections from bottom to top
      const scrollOffset = 180;
      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollOffset) {
            setActiveTab(section.tab);
            break;
          }
        }
      }
    };

    const handleUserInteraction = () => {
      isScrollingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
    };
  }, []);

  const handleReadArticleBySlug = (slug: string) => {
    const art = articles.find((a: Article) => a.slug === slug);
    if (art) setSelectedArticle(art);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111827] font-sans antialiased">
      {/* Modern Clean Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigateTab={handleNavigateTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenIssue={(num = 6) => setSelectedIssueNumber(num)}
      />

      <main className="flex-1">
        {/* Home & Editorial Content */}
        <div id="home">
          {/* AI Fairway Flyover Scrollytelling Experience */}
          <FairwayFlyoverExperience
            onExploreMagazine={() => {
              const el = document.getElementById("magazine-hero");
              if (el) {
                const navbarHeight = 70;
                const targetPosition =
                  el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }
            }}
            onOpenIssue={(num = 6) => setSelectedIssueNumber(num)}
          />

          <div id="magazine-hero">
            <HeroVideoMarquee
              leadArticle={leadArticle}
              trendingArticles={trendingArticles}
              onReadArticle={(art) => setSelectedArticle(art)}
              onOpenIssue={(num = 6) => setSelectedIssueNumber(num)}
              onOpenVideoModal={() => setIsVideoOpen(true)}
            />
          </div>

          {/* Filterable Editorial Journal Grid */}
          <div id="journal">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <FilterableStoryGrid
                onReadArticle={(art) => setSelectedArticle(art)}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </motion.div>
          </div>

          {/* Turfgrass & Course Agronomy Feature */}
          <div id="agronomy">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <TurfAgronomyFeature
                article={agronomyArticle}
                onReadArticle={(art) => setSelectedArticle(art)}
              />
            </motion.div>
          </div>

          {/* Clubhouse Lifestyle & Craft */}
          <div id="lifestyle">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <LifestyleShowcase
                article={lifestyleArticle}
                onReadArticle={(art) => setSelectedArticle(art)}
              />
            </motion.div>
          </div>

          {/* Military Veterans & Philanthropy Feature */}
          <div id="philanthropy">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <PhilanthropySection
                article={philanthropyArticle}
                onReadArticle={(art) => setSelectedArticle(art)}
              />
            </motion.div>
          </div>
        </div>

        {/* About Us / Masthead */}
        <div id="staff">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <StaffSection />
          </motion.div>
        </div>

        {/* Advertising Section */}
        <div id="advertising">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AdvertisingSection />
          </motion.div>
        </div>

        {/* Ad Specifications Section */}
        <div id="adspec">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AdSpecSection />
          </motion.div>
        </div>

        {/* Nomination Section */}
        <div id="nomination">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <NominationSection />
          </motion.div>
        </div>

        {/* Complete Digital Archive */}
        <div id="archive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ArchiveSection
              onOpenIssue={(num) => setSelectedIssueNumber(num)}
            />
          </motion.div>
        </div>

        {/* Contact Desk */}
        <div id="contact">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ContactSection />
          </motion.div>
        </div>

        {/* VIP Newsletter */}
        <div id="newsletter">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <NewsletterDispatch />
          </motion.div>
        </div>
      </main>

      {/* Modern Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenIssue={(num = 6) => setSelectedIssueNumber(num)}
      />

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />

      {/* Modern AI Golf Concierge Assistant */}
      <AiChatAssistant
        onOpenIssue={(num) => setSelectedIssueNumber(num)}
        onNavigateTab={handleNavigateTab}
        onReadArticle={handleReadArticleBySlug}
      />

      {/* Interactive Article Reading Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onOpenIssue={(num = 6) => {
          setSelectedArticle(null);
          setSelectedIssueNumber(num);
        }}
      />

      {/* Interactive Digital Flipbook Reader */}
      <IssueReaderModal
        issueNumber={selectedIssueNumber}
        onClose={() => setSelectedIssueNumber(null)}
        onSelectIssue={(num) => setSelectedIssueNumber(num)}
      />

      {/* Clean Modern Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Cinematic Golf Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
