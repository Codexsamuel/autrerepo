'use client';

import { getAdSenseClientId, isAdSenseConfigured } from '@/config/adsense';
import { useEffect } from 'react';

interface ContentAdProps {
  position?: 'top' | 'middle' | 'bottom';
  className?: string;
}

// Fonction utilitaire pour ajouter des publicités
function addContentAd() {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    window.adsbygoogle.push({
      google_ad_client: getAdSenseClientId(),
      google_ad_slot: "auto",
      google_ad_format: "auto",
      google_full_width_responsive: true
    });
  }
}

export default function ContentAd({ position = 'middle', className = '' }: ContentAdProps) {
  useEffect(() => {
    addContentAd();
  }, []);

  if (!isAdSenseConfigured()) {
    return null;
  }

  return (
    <div className={`ad-container my-8 text-center ${className}`}>
      <div className="ad-label text-xs text-gray-500 mb-2">
        Publicité
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={getAdSenseClientId()}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
    </div>
  );
}

// Composant pour les publicités sidebar
export function SidebarAd() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({
        google_ad_client: getAdSenseClientId(),
        google_ad_slot: "auto",
        google_ad_format: "auto",
        google_full_width_responsive: false
      });
    }
  }, []);

  if (!isAdSenseConfigured()) {
    return null;
  }

  return (
    <div className="ad-container sticky top-4 bg-white p-4 rounded-lg shadow-sm border">
      <div className="ad-label text-xs text-gray-500 mb-2">
        Publicité
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={getAdSenseClientId()}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="false"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
    </div>
  );
}

// Composant pour les publicités en fin d'article
export function ArticleEndAd() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({
        google_ad_client: getAdSenseClientId(),
        google_ad_slot: "auto",
        google_ad_format: "auto",
        google_full_width_responsive: true
      });
    }
  }, []);

  if (!isAdSenseConfigured()) {
    return null;
  }

  return (
    <div className="ad-container my-12 text-center bg-gray-50 p-6 rounded-lg">
      <div className="ad-label text-xs text-gray-500 mb-4">
        Publicité
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={getAdSenseClientId()}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
    </div>
  );
} 