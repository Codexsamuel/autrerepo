"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pause, Play, Video, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface EventVideo {
  title: string;
  video: string;
  description?: string;
}

interface EventVideoCarouselProps {
  videos: EventVideo[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function EventVideoCarousel({
  videos,
  className,
  autoPlay = true,
  interval = 8000
}: EventVideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, videos.length]);

  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          if (isPlaying) {
            video.play().catch(() => {
              // Handle autoplay restrictions
              setIsPlaying(false);
            });
          } else {
            video.pause();
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div 
      className={cn("relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-black/20 z-0" />
      
      {/* Main video container */}
      <div className="relative z-10 h-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
            >
              <source src={video.video} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
            
            {/* Enhanced overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-20 max-w-4xl mx-auto px-6">
            <div className="bg-black/30 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Video className="w-8 h-8 mr-3 text-purple-400" />
                <span className="text-lg font-medium text-purple-300">Événement Professionnel</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                {currentVideo.title}
              </h2>
              <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
                {currentVideo.description || "Couverture professionnelle avec drone et équipements HD"}
              </p>
              
              {/* Video controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 z-30 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 z-30 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Enhanced Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-4 h-4 rounded-full transition-all duration-300 shadow-lg",
              index === currentIndex
                ? "bg-white scale-125 shadow-white/50"
                : "bg-white/60 hover:bg-white/80 hover:scale-110"
            )}
            aria-label={`Vidéo ${index + 1}`}
          />
        ))}
      </div>

      {/* Video counter */}
      <div className="absolute top-6 right-6 z-30">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {videos.length}
          </span>
        </div>
      </div>
    </div>
  );
} 