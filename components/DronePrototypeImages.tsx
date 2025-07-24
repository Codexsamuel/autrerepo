"use client";

import { useState } from 'react';

interface DronePrototypeImagesProps {
  images: string[];
  titles: string[];
  descriptions: string[];
}

export default function DronePrototypeImages({ images, titles, descriptions }: DronePrototypeImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const getFallbackImage = (index: number) => {
    // Images par défaut pour les drones
    const fallbackImages = [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTAxODI3Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiMzNDM0MzQiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI2MCIgZmlsbD0iIzQ1NDU0NSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBmaWxsPSIjNTY1NjU2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTUwIEwyNDAgMTUwIE0yMDAgMTEwIEwyMDAgMTkwIiBzdHJva2U9IiM2NzY3NjciIHN0cm9rZS13aWR0aD0iNCIvPgo8dGV4dCB4PSIyMDAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2VudGluZWwgWDEmIzE3NzsgLSBEcm9uZSBUYWN0aXF1ZTwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTAxODI3Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0MzQzNCIvPgo8cmVjdCB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNDU0NTQ1Ii8+CjxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiM1NjU2NTYiLz4KPHBhdGggZD0iTTE2MCAxNTAgTDI0MCAxNTAgTTIwMCAxMTAgTDIwMCAxOTAiIHN0cm9rZT0iIzY3Njc2NyIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BdGxhcyBYMSAtIERyb25lIEluZHVzdHJpZWw8L3RleHQ+Cjwvc3ZnPg==',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTAxODI3Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDEwMCAyNTAsMTUwIDIwMCwyMDAgMTUwLDE1MCIgZmlsbD0iIzM0MzQzNCIvPgo8cG9seWdvbiBwb2ludHM9IjIwMCwxMjAgMjMwLDE1MCAyMDAsMTgwIDE3MCwxNTAiIGZpbGw9IiM0NTQ1NDUiLz4KPHBhdGggZD0iTTE2MCAxNTAgTDI0MCAxNTAgTTIwMCAxMTAgTDIwMCAxOTAiIHN0cm9rZT0iIzY3Njc2NyIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm90b3R5cGUgQXZhw6luY8OpPC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTAxODI3Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0MzQzNCIvPgo8cmVjdCB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNDU0NTQ1Ii8+CjxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiM1NjU2NTYiLz4KPHBhdGggZD0iTTE2MCAxNTAgTDI0MCAxNTAgTTIwMCAxMTAgTDIwMCAxOTAiIHN0cm9rZT0iIzY3Njc2NyIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ETF9GUFYgVGFjdGljYWwgVjEgLSBEcm9uZSBLYW1pa2F6ZTwvdGV4dD4KPC9zdmc+'
    ];
    return fallbackImages[index] || fallbackImages[0];
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        <div className="relative h-96 md:h-[500px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={imageErrors.has(index) ? getFallbackImage(index) : image}
                alt={`Drone prototype ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{titles[index]}</h3>
                <p className="text-lg opacity-90">{descriptions[index]}</p>
                {imageErrors.has(index) && (
                  <p className="text-sm opacity-70 mt-2">🖼️ Image 3D en cours de génération...</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 