"use client";

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  fallbackImage?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function VideoPlayer({
  src,
  fallbackImage,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className = "",
  onLoad,
  onError
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    setIsPlaying(autoPlay);
    setIsMuted(muted);
  }, [autoPlay, muted]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Si erreur et fallback disponible, afficher l'image
  if (hasError && fallbackImage) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <img
          src={fallbackImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="text-white text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p className="text-sm">Chargement...</p>
          </div>
        </div>
      )}

      {/* Vidéo */}
      <video
        src={src}
        autoPlay={isPlaying}
        loop={loop}
        muted={isMuted}
        playsInline={playsInline}
        className="w-full h-full object-cover"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
} 