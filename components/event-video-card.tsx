"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pause, Play, Video, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface EventVideoCardProps {
  title: string;
  video: string;
  description?: string;
  className?: string;
}

export function EventVideoCard({ title, video, description, className }: EventVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className={cn(
        "group bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm shadow-xl",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <video
          className="w-full h-full object-cover"
          autoPlay={isPlaying}
          muted={isMuted}
          loop
          playsInline
          onClick={togglePlay}
        >
          <source src={video} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        
        {/* Video icon overlay */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full p-2 border border-white/20">
          <Video className="w-4 h-4 text-white" />
        </div>

        {/* Controls overlay */}
        {(isHovered || !isPlaying) && (
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

        {/* Play indicator for paused state */}
        {!isPlaying && !isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">{title}</h3>
      <p className="text-white/90 text-sm drop-shadow-sm">
        {description || "Couverture professionnelle avec drone et équipements HD"}
      </p>
    </div>
  );
} 