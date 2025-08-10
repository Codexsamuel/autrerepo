"use client";

import { heroCarouselConfig, type HeroMediaItem } from '@/app/config/hero-carousel';
import { AlertCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './button';

const mediaItems: HeroMediaItem[] = heroCarouselConfig;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mediaErrors, setMediaErrors] = useState<Set<string>>(new Set());
  const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMediaError = (mediaId: string) => {
    setMediaErrors(prev => new Set(prev).add(mediaId));
  };

  const handleMediaLoad = (mediaId: string) => {
    setLoadedMedia(prev => new Set(prev).add(mediaId));
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const currentMedia = mediaItems[currentIndex];
  const hasError = mediaErrors.has(currentMedia.id);
  const isLoading = !loadedMedia.has(currentMedia.id) && !hasError;

  // Filter out media with errors
  const validMediaItems = mediaItems.filter(item => !mediaErrors.has(item.id));

  if (validMediaItems.length === 0) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-bold mb-2">Erreur de chargement</h1>
          <p className="text-gray-300">Impossible de charger les médias du carrousel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {validMediaItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => handleMediaLoad(item.id)}
                onError={() => handleMediaError(item.id)}
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                autoPlay={index === currentIndex}
                muted
                loop
                playsInline
                onLoadStart={() => handleMediaLoad(item.id)}
                onError={() => handleMediaError(item.id)}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {currentMedia.title || 'DL Solutions'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delay">
            Transformez votre vision en réalité digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Découvrir nos services
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {validMediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Navigation */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 text-white text-sm font-medium">
        {currentIndex + 1} / {validMediaItems.length}
      </div>

      {/* Error indicator */}
      {hasError && (
        <div className="absolute top-8 left-8 z-20 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Erreur média
        </div>
      )}
    </div>
  );
} 