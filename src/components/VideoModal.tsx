"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX, Film, CheckCircle } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videoChapters = [
    {
      title: "Whispering Pines Championship Flyover",
      description: "Aerial 4K flyover of the 16th and 18th coastal sanctuary holes in Central Florida.",
      duration: "2:45",
      embedUrl: "https://www.youtube.com/embed/fD3q6-EfvL0?autoplay=1&mute=0&controls=1&rel=0",
    },
    {
      title: "Hammock Beach: Ocean Course Coastal Revival",
      description: "Jack Nicklaus Bear Claw closing holes along crashing Atlantic surf in Palm Coast.",
      duration: "3:15",
      embedUrl: "https://www.youtube.com/embed/1Bsqp_Y5Bso?autoplay=1&mute=0&controls=1&rel=0",
    },
    {
      title: "The Masters Protocol: Florida GCSAA Superintendents",
      description: "Pre-dawn turfgrass inspection, moisture refractometry, and greens conditioning.",
      duration: "4:10",
      embedUrl: "https://www.youtube.com/embed/l4e-0-q5F4s?autoplay=1&mute=0&controls=1&rel=0",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const current = videoChapters[selectedVideo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      {/* Same Modal Structure as Flipbook Edition */}
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#0A1F18] text-white shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden rounded-2xl font-sans">
        {/* Top Control Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-b border-[#BFA054]/30 px-4 sm:px-6 py-3.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <Film className="w-5 h-5 text-[#BFA054]" />
            <div>
              <span className="text-[10px] text-[#D4B568] uppercase tracking-wider font-semibold block">
                GOLF CENTRAL CINEMATIC REEL // 4K VIDEO DISPATCH
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-none">
                {current.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close video (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player & Spread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-[#BFA054]/30 shadow-2xl relative">
            <iframe
              key={current.embedUrl}
              src={current.embedUrl}
              title={current.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Chapters Strip (Identical to Flipbook Spread Selector) */}
          <div className="w-full max-w-4xl space-y-2">
            <div className="text-[11px] font-bold text-[#D4B568] uppercase tracking-wider flex items-center space-x-1.5">
              <span>Select Course Video Tour:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {videoChapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVideo(idx)}
                  className={`p-3 rounded-xl text-left text-xs transition-all border ${
                    selectedVideo === idx
                      ? "bg-[#BFA054] text-[#061710] border-[#BFA054] font-bold shadow-lg"
                      : "bg-[#06150F] text-white/80 hover:text-white border-[#BFA054]/20 hover:border-[#BFA054]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold line-clamp-1">{ch.title}</span>
                    <span className="text-[10px] opacity-75 font-semibold">{ch.duration}</span>
                  </div>
                  <p className="text-[11px] opacity-80 line-clamp-2">{ch.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar (Identical to Flipbook Modal) */}
        <div className="bg-[#06150F] border-t border-[#BFA054]/30 px-6 py-3 text-xs text-white/60 flex items-center justify-between font-sans shrink-0">
          <span>Golf Central Video Dispatches • Published in Lake Wales, FL Since 1999</span>
          <button onClick={onClose} className="hover:text-[#D4B568] transition-colors font-semibold">
            Close Reel [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
