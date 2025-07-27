'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  fallbackSrc = '/images/placeholder.jpg',
  priority = false,
  fill = false,
  sizes
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Si c'est une image SVG locale, utiliser une balise img normale
  if (src.startsWith('/') && src.endsWith('.svg')) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'animate-pulse' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${isLoading ? 'animate-pulse' : ''}`}
        priority={priority}
        fill={fill}
        sizes={sizes}
        onError={handleError}
        onLoad={handleLoad}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
} 