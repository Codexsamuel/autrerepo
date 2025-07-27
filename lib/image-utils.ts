import { generateCloudinaryImageUrl, parseCloudinaryUrl } from './cloudinary-utils';

export interface ImageConfig {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}

export interface VideoConfig {
  src: string;
  poster?: string;
  fallbackPoster?: string;
  quality?: number;
  format?: 'mp4' | 'webm';
}

/**
 * Vérifie si une URL d'image est valide
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // URLs locales
  if (url.startsWith('/')) return true;
  
  // URLs Cloudinary
  if (url.includes('cloudinary.com')) return true;
  
  // URLs externes valides
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Optimise une URL d'image avec Cloudinary
 */
export function getOptimizedImageUrl(config: ImageConfig): string {
  const { src, quality = 80, format = 'auto' } = config;
  
  if (!isValidImageUrl(src)) {
    return config.fallbackSrc || '/images/placeholder.jpg';
  }
  
  // Si c'est déjà une URL Cloudinary, l'optimiser
  if (src.includes('cloudinary.com')) {
    const cloudinaryConfig = parseCloudinaryUrl(src);
    if (cloudinaryConfig) {
      const transformations = [`q_${quality}`, `f_${format}`];
      return generateCloudinaryImageUrl({
        ...cloudinaryConfig,
        format: format === 'auto' ? 'jpg' : format,
        transformations
      });
    }
  }
  
  // Si c'est une URL locale, la retourner telle quelle
  if (src.startsWith('/')) {
    return src;
  }
  
  return src;
}

/**
 * Génère une image de placeholder pour les drones
 */
export function getDronePlaceholder(type: 'sentinel' | 'atlas' | 'prototype' | 'fpv' = 'sentinel'): string {
  const placeholders = {
    sentinel: '/images/drones/sentinel-x1.svg',
    atlas: '/images/drones/atlas-x1.svg',
    prototype: '/images/drones/prototype-advanced.svg',
    fpv: '/images/drones/fpv-kamikaze.svg'
  };
  
  return placeholders[type] || '/images/drone-placeholder.svg';
}

/**
 * Gère les erreurs d'images avec fallback
 */
export function handleImageError(
  originalSrc: string,
  fallbackSrc?: string,
  onError?: (src: string) => void
): string {
  const finalFallback = fallbackSrc || '/images/placeholder.jpg';
  
  if (onError) {
    onError(originalSrc);
  }
  
  return finalFallback;
}

/**
 * Préteste le chargement d'une image
 */
export function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isValidImageUrl(src)) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Préteste le chargement d'une vidéo
 */
export function preloadVideo(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    
    const video = document.createElement('video');
    video.onloadeddata = () => resolve(true);
    video.onerror = () => resolve(false);
    video.src = src;
    video.load();
  });
}

/**
 * Génère un hash simple pour le cache
 */
export function generateImageHash(src: string): string {
  let hash = 0;
  for (let i = 0; i < src.length; i++) {
    const char = src.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
} 