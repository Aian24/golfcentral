"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Maximize,
  Minimize,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoIndex?: number;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  initialVideoIndex = 0,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(initialVideoIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoChapters = [
    {
      id: "whispering-pines",
      title: "Whispering Pines: Hole 3 Championship Sanctuary",
      description:
        "Actual course hole tour of Hole 3: tree-lined fairway corridors, sculpted coquina hazards, and elevated green approach.",
      duration: "0:45",
      videoSrc: "/videos/tour_whispering_pines.mp4",
      poster: "/images/coastal_golf_resort.jpg",
      course: "Whispering Pines Sanctuary",
      location: "Lake Wales, FL",
      tag: "Hole 3 Course Tour",
    },
    {
      id: "hammock-beach",
      title: "Hammock Beach: Hole 5 Oceanfront Challenge",
      description:
        "Authentic hole flyover of Hole 5: scenic dogleg right with coquina sand traps and undulating multi-tiered green complex.",
      duration: "0:35",
      videoSrc: "/videos/tour_hammock_beach.mp4",
      poster: "/images/hero_golf_championship.jpg",
      course: "Hammock Beach Resort",
      location: "Palm Coast, FL",
      tag: "Hole 5 Course Tour",
    },
    {
      id: "florida-links",
      title: "Florida Championship Links: Complete Course Tour",
      description:
        "Comprehensive on-course tour featuring tee-to-green flyovers, golfer fairway swings, putting greens, and clubhouse grounds.",
      duration: "1:15",
      videoSrc: "/videos/tour_golf_course.webm",
      poster: "/images/turf_agronomy_green.jpg",
      course: "Florida Championship Links",
      location: "Central Florida",
      tag: "Full Course Tour",
    },
  ];

  // Sync initial index if passed
  useEffect(() => {
    if (isOpen) {
      setSelectedVideo(initialVideoIndex);
      setIsPlaying(true);
    }
  }, [isOpen, initialVideoIndex]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, isMuted, isFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const current = videoChapters[selectedVideo];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#0F3D2A] text-white shadow-2xl border border-[#C59B27]/40 flex flex-col justify-between overflow-hidden rounded-2xl">
        {/* Top Control Bar */}
        <div className="bg-[#0B291D] border-b border-[#C59B27]/30 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between text-white shrink-0 gap-2">
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-[#D8B045] shrink-0">
              <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-[9px] sm:text-[10px] text-[#D8B045] uppercase tracking-wider font-bold truncate">
                  VIDEO TOUR // VOL 27
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold bg-[#C59B27] text-[#0B291D] shrink-0">
                  {current.tag}
                </span>
              </div>
              <h3 className="text-xs sm:text-base font-bold text-white leading-tight truncate">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close video (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video Player & Spread Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col items-center justify-between space-y-3 sm:space-y-4">
          {/* Main Video Viewport */}
          <div
            ref={playerContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-[#C59B27]/40 shadow-2xl relative group cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={current.videoSrc}
              poster={current.poster}
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Ambient vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Central Play/Pause Watermark Button when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#C59B27]/90 text-[#0B291D] flex items-center justify-center shadow-2xl transform scale-100 animate-pulse">
                  <Play className="w-7 h-7 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Top course info overlay */}
            <div
              className={`absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#C59B27]/30 text-[11px] sm:text-xs truncate max-w-[70%]">
                <span className="font-semibold text-white">{current.course}</span>
                <span className="text-white/60 text-[10px] sm:text-[11px] ml-1.5 hidden sm:inline">• {current.location}</span>
              </div>
              <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#C59B27]/90 text-[#0B291D] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
                HD 60FPS
              </div>
            </div>

            {/* Bottom Custom Player Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Scrubber Bar */}
              <div className="relative mb-2 flex items-center group/scrubber">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#C59B27] hover:h-2 transition-all"
                  style={{
                    background: `linear-gradient(to right, #C59B27 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
                  }}
                />
              </div>

              {/* Control Buttons Strip */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-1 sm:p-1.5 rounded-lg bg-[#C59B27] text-[#0B291D] hover:bg-[#D8B045] transition-colors cursor-pointer"
                    title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? "Unmute (M)" : "Mute (M)"}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8B045]" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-12 sm:w-20 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-[#C59B27]"
                    />
                  </div>

                  <span className="text-[10px] sm:text-[11px] text-white/70 font-mono hidden sm:inline">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-[10px] sm:text-[11px] text-[#D8B045] font-medium hidden md:inline">
                    Native HTML5 • Zero External Links
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Strip */}
          <div className="w-full max-w-4xl space-y-2 pt-2">
            <div className="text-[11px] font-bold text-[#D8B045] uppercase tracking-wider flex items-center justify-between">
              <span>Select Course Video Tour (Click to Play):</span>
              <span className="text-[10px] text-white/60 font-normal">
                {selectedVideo + 1} of {videoChapters.length} Tours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {videoChapters.map((ch, idx) => {
                const isSelected = selectedVideo === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedVideo(idx);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-xl text-left text-xs transition-all border relative overflow-hidden group flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#134E36] border-[#C59B27] shadow-lg ring-2 ring-[#C59B27]/50"
                        : "bg-[#0B291D] border-white/10 hover:border-[#C59B27]/50 text-white/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isSelected
                              ? "bg-[#C59B27] text-[#0B291D]"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {isSelected && isPlaying ? (
                            <Play className="w-3 h-3 fill-current animate-pulse" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span
                          className={`font-bold line-clamp-1 text-xs ${
                            isSelected ? "text-[#D8B045]" : "text-white"
                          }`}
                        >
                          {ch.title}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-75 font-mono shrink-0">
                        {ch.duration}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed mb-2">
                      {ch.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-white/10 text-[#D8B045]/90 font-medium">
                      <span>{ch.course}</span>
                      {isSelected ? (
                        <span className="flex items-center space-x-1 text-[#D8B045] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Now Playing</span>
                        </span>
                      ) : (
                        <span className="group-hover:text-white transition-colors">
                          Play Tour →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="bg-[#0B291D] border-t border-[#C59B27]/30 px-6 py-3 text-xs text-white/60 flex items-center justify-between font-sans shrink-0">
          <span>Golf Central Video Tours • Florida Sanctuary Series</span>
          <button
            onClick={onClose}
            className="text-[#D8B045] hover:text-white transition-colors font-semibold cursor-pointer"
          >
            Close Tour Reel [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
