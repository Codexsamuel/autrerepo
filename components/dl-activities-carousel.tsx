"use client";

import { Button } from "@/components/ui/button";
import { optimizeVideoUrl } from '@/lib/cloudinary-utils';
import { Building2, ChevronLeft, ChevronRight, Pause, Play, Shield, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const DLActivitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const activitiesItems = [
    {
      type: "video",
      url: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401814/WhatsApp_Video_2025-06-06_at_22.54.48_fudnfd.mp4", { quality: 'auto', format: 'mp4' }),
      thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
      title: "DL Solutions - Innovation & Excellence",
      description: "Découvrez nos activités de transformation digitale",
      category: "Corporate",
      icon: Building2
    },
    {
      type: "video", 
      url: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4", { quality: 'auto', format: 'mp4' }),
      thumbnail: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
      title: "Équipe DL Solutions en Action",
      description: "Notre équipe dédiée à l'excellence",
      category: "Équipe",
      icon: Users
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_23.18.58_oectju.jpg",
      title: "Sécurité & Surveillance",
      description: "Solutions de sécurité avancées",
      category: "Sécurité",
      icon: Shield
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
      title: "Technologies Innovantes",
      description: "Développement de solutions de pointe",
      category: "Innovation",
      icon: Zap
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401789/WhatsApp_Image_2025-06-06_at_23.21.14_wuakom.jpg",
      title: "Infrastructure & Développement",
      description: "Nos installations et équipements",
      category: "Infrastructure",
      icon: Building2
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activitiesItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, activitiesItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activitiesItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activitiesItems.length) % activitiesItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = activitiesItems[currentIndex];

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 z-0" />
      
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm"
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
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
            <div
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <currentItem.icon className="w-5 h-5 text-white" />
                </div>
                <span className="bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {currentItem.category}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3">{currentItem.title}</h3>
              <p className="text-xl opacity-90 max-w-2xl">{currentItem.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 z-20 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 z-20 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Play/Pause button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 z-20 backdrop-blur-sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {activitiesItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* DL Solutions Badge */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
          🏢 DL Solutions
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
};

export default DLActivitiesCarousel; 