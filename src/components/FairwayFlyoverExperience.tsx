"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FairwayFlyoverExperienceProps {
  onExploreMagazine?: () => void;
  onOpenIssue?: (issueNum?: number) => void;
}

const TOTAL_FRAMES = 240;
const FRAME_PATH = (idx: number) =>
  `/flyover_webp/frame_${String(idx).padStart(3, "0")}.webp`;

interface StoryBeat {
  headline: string;
  subtitle: string;
}

const STORY_BEATS: StoryBeat[] = [
  {
    headline: "ALIGN WITH CONVICTION",
    subtitle: "Set Your Target & Commit",
  },
  {
    headline: "UNLEASH THE POWER",
    subtitle: "Pure Compression into the Morning Sky",
  },
  {
    headline: "SOAR DOWN THE LINE",
    subtitle: "Total Aerodynamic Flight",
  },
  {
    headline: "STICK THE LANDING",
    subtitle: "Precision on the Championship Green",
  },
  {
    headline: "PERFECTION ACHIEVED",
    subtitle: "Welcome to Golf Central Magazine",
  },
];

export const FairwayFlyoverExperience: React.FC<FairwayFlyoverExperienceProps> = ({
  onExploreMagazine,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // 1. Preload all 240 frames into memory
  useEffect(() => {
    let isMounted = true;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-performance canvas drawing with responsive aspect ratio cover
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Resize canvas to match display size with high DPI support
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        renderFrame(Math.round(currentFrameRef.current));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame, isReady]);

  // 3. Smooth Lerp Animation Loop (requestAnimationFrame)
  useEffect(() => {
    if (!isReady) return;

    let isRunning = true;

    const updateLoop = () => {
      if (!isRunning) return;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = current + diff * 0.16;
        const frameToDraw = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        renderFrame(frameToDraw);
      }

      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isReady, renderFrame]);

  // 4. Scroll position calculation (Pure scroll control)
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady]);

  const handleSkipToMagazine = () => {
    if (onExploreMagazine) {
      onExploreMagazine();
      return;
    }
    const heroEl = document.getElementById("magazine-hero");
    if (heroEl) {
      const navbarHeight = 70;
      const targetPosition =
        heroEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    } else {
      const container = containerRef.current;
      if (container) {
        window.scrollTo({
          top: container.offsetTop + container.offsetHeight,
          behavior: "smooth",
        });
      }
    }
  };

  // Compute active story beat from 5 key progress segments
  const beatIndex = Math.min(
    STORY_BEATS.length - 1,
    Math.floor(scrollProgress * STORY_BEATS.length)
  );
  const activeBeat = STORY_BEATS[beatIndex];

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#040C08]"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* Full Canvas Render Surface */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Subtle Dark Gradient Vignette for Readability */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#040C08]/70 via-[#040C08]/20 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#040C08]/85 via-[#040C08]/30 to-transparent pointer-events-none z-10" />

        {/* Minimalist Loading Overlay */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 bg-[#061710] flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#BFA054]/20 border-t-[#BFA054] animate-spin mb-4" />
              <div className="text-sm font-semibold tracking-wider text-[#D4B568] uppercase font-mono">
                Loading Cinematic Experience ({loadPercentage}%)
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTERED CLEAN MOTIVATIONAL LABELS (No Background Box, No Icons, No Step Badges) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 z-20 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBeat.headline}
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center max-w-3xl"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)] leading-tight">
                {activeBeat.headline}
              </h2>
              <p className="text-xs sm:text-base md:text-lg text-[#E5C97A] font-semibold tracking-widest uppercase mt-2.5 sm:mt-3 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                {activeBeat.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty spacer at top */}
        <div className="h-10" />

        {/* Bottom Bar: Scroll Control Only with Slim Progress Bar */}
        <div className="relative z-20 pb-6 px-6 max-w-7xl mx-auto w-full flex flex-col items-center pointer-events-auto">
          {/* Subtle Clean Scroll Prompt */}
          <button
            onClick={handleSkipToMagazine}
            className="flex flex-col items-center space-y-1 text-white/85 hover:text-[#D4B568] transition-colors mb-3 group"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100 drop-shadow-md">
              Scroll Down to Fly
            </span>
            <ChevronDown className="w-4 h-4 text-[#D4B568] animate-bounce" />
          </button>

          {/* Minimalist Slim Gold Progress Bar */}
          <div className="w-full max-w-md h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-lg">
            <div
              className="h-full bg-gradient-to-r from-[#BFA054] to-[#E5C97A] transition-all duration-75"
              style={{ width: `${Math.max(1, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairwayFlyoverExperience;
