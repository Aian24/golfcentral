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
  }, [isOpen, isPlaying, isMuted]);

  // Auto-play when chapter changes
  useEffect(() => {
    if (videoRef.current && isOpen) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [selectedVideo, isOpen]);

  // Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const current = videoChapters[selectedVideo];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn font-sans">
      <div className="relative w-full max-w-5xl h-full sm:h-[92vh] bg-[#071912] text-white shadow-2xl border border-[#BFA054]/40 flex flex-col justify-between overflow-hidden rounded-2xl">
        {/* Top Control Bar */}
        <div className="bg-[#05130D] border-b border-[#BFA054]/30 px-4 sm:px-6 py-3.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#BFA054]/20 border border-[#BFA054]/40 flex items-center justify-center text-[#D4B568]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-[#D4B568] uppercase tracking-widest font-bold">
                  GOLF CENTRAL CINEMATIC VIDEO TOUR // VOLUME 27
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#BFA054] text-[#061710]">
                  {current.tag}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close video (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player & Spread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-between space-y-4">
          {/* Main Video Viewport */}
          <div
            ref={playerContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-[#BFA054]/40 shadow-2xl relative group cursor-pointer"
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#BFA054]/90 text-[#061710] flex items-center justify-center shadow-2xl transform scale-100 animate-pulse">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Top course info overlay */}
            <div
              className={`absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#BFA054]/30 text-xs">
                <span className="font-semibold text-white">{current.course}</span>
                <span className="text-white/60 text-[11px] ml-1.5">• {current.location}</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#BFA054]/90 text-[#061710] text-[10px] font-bold tracking-wider uppercase">
                HD 60FPS
              </div>
            </div>

            {/* Bottom Luxury Custom Player Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Scrubber Bar */}
              <div className="relative mb-2.5 flex items-center group/scrubber">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#BFA054] hover:h-2 transition-all"
                  style={{
                    background: `linear-gradient(to right, #BFA054 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
                  }}
                />
              </div>

              {/* Control Buttons Strip */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-[#BFA054] text-[#061710] hover:bg-[#D4B568] transition-colors"
                    title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
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
                    className="p-1 text-white/70 hover:text-white transition-colors"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white/80 hover:text-white transition-colors"
                      title={isMuted ? "Unmute (M)" : "Mute (M)"}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#D4B568]" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 sm:w-20 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-[#BFA054]"
                    />
                  </div>

                  <span className="text-[11px] text-white/70 font-mono hidden sm:inline">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[11px] text-[#D4B568] font-medium hidden md:inline">
                    Native HTML5 • Zero External Links
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 text-white/80 hover:text-white transition-colors"
                    title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4" />
                    ) : (
                      <Maximize className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Strip */}
          <div className="w-full max-w-4xl space-y-2 pt-2">
            <div className="text-[11px] font-bold text-[#D4B568] uppercase tracking-wider flex items-center justify-between">
              <span>Select Course Video Tour (Click to Play):</span>
              <span className="text-[10px] text-white/50 font-normal">
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
                    className={`p-3 rounded-xl text-left text-xs transition-all border relative overflow-hidden group flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0E3324] border-[#BFA054] shadow-lg ring-2 ring-[#BFA054]/50"
                        : "bg-[#05130D] border-white/10 hover:border-[#BFA054]/50 text-white/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isSelected
                              ? "bg-[#BFA054] text-[#061710]"
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
                            isSelected ? "text-[#D4B568]" : "text-white"
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

                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-white/10 text-[#D4B568]/80 font-medium">
                      <span>{ch.course}</span>
                      {isSelected ? (
                        <span className="flex items-center space-x-1 text-[#D4B568] font-bold">
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
        <div className="bg-[#05130D] border-t border-[#BFA054]/30 px-6 py-3 text-xs text-white/60 flex items-center justify-between font-sans shrink-0">
          <span>Golf Central Video Tours • Florida Sanctuary Series</span>
          <button
            onClick={onClose}
            className="text-[#D4B568] hover:text-white transition-colors font-semibold"
          >
            Close Tour Reel [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
