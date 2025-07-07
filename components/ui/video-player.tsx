"use client";

import { cn } from '@/lib/utils';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  onPlay,
  onPause
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoClick = () => {
    if (controls) {
      togglePlay();
    }
  };

  return (
    <div 
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        onClick={handleVideoClick}
      >
        <source src={src} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      {/* Controls overlay */}
      {controls && (isHovered || !isPlaying) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2 border border-white/20">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Play indicator for non-controls mode */}
      {!controls && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
    </div>
  );
} 