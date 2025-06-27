"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoCarouselProps {
  videos: {
    src: string;
    alt: string;
    overlay?: string;
  }[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function VideoCarousel({
  videos,
  className,
  autoPlay = true,
  interval = 5000
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
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
          video.play().catch(() => {
            // Handle autoplay restrictions
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
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
            muted
            loop
            playsInline
            onClick={handleVideoClick}
          >
            <source src={video.src} type="video/mp4" />
            {video.alt}
          </video>
          
          {/* Enhanced overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          
          {/* Additional overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Video overlay text if provided */}
          {video.overlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center z-10 bg-black/30 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/20">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                  {video.overlay}
                </h2>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Enhanced Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
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

      {/* Enhanced Play/Pause indicator */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleVideoClick}
          className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 hover:scale-110"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
} 