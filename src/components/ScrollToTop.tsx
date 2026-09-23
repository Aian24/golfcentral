"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-[#134E36] hover:bg-[#C59B27] text-white hover:text-[#0B291D] shadow-xl border border-white/20 transition-all transform hover:-translate-y-1 animate-fadeIn flex items-center justify-center cursor-pointer"
      title="Scroll to top of page"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
};
