"use client";

import { Button } from "@/components/ui/button";
import { optimizeVideoUrl } from '@/lib/cloudinary-utils';
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import ImageWithFallback from './ImageWithFallback';

const DroneCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const mediaItems = [
    {
      type: "video",
      url: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401814/WhatsApp_Video_2025-06-06_at_22.54.48_fudnfd.mp4", { quality: 'auto', format: 'mp4' }),
      thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
      title: "Démonstration de vol DL Drone",
      description: "Test de vol en conditions réelles"
    },
    {
      type: "video", 
      url: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4", { quality: 'auto', format: 'mp4' }),
      thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
      title: "Capacités de surveillance",
      description: "Test des systèmes de détection"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_23.18.58_oectju.jpg",
      title: "Vue aérienne HD",
      description: "Qualité d'image 4K exceptionnelle"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
      title: "Contrôle de vol",
      description: "Interface de pilotage avancée"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_23.21.14_wuakom.jpg",
      title: "Système de propulsion",
      description: "Moteurs haute performance"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, mediaItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0" />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Media container */}
        <div className="relative w-full h-full">
          {currentItem.type === "video" ? (
            <div className="relative w-full h-full">
              <video
                src={currentItem.url}
                poster={currentItem.thumbnail}
                className="w-full h-full object-cover"
                autoPlay={isVideoPlaying}
                muted={!isVideoPlaying}
                loop
                playsInline
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              />
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <ImageWithFallback
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover"
              fallbackSrc="/images/drone-placeholder.svg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">{currentItem.title}</h3>
            <p className="text-xl opacity-90">{currentItem.description}</p>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DroneCarousel; 