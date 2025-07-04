'use client';

import { getAdSenseClientId, isAdSenseConfigured } from '@/config/adsense';
import Script from 'next/script';

interface ContentAdProps {
  position?: 'top' | 'middle' | 'bottom';
  className?: string;
}

export default function ContentAd({ position = 'middle', className = '' }: ContentAdProps) {
  if (!isAdSenseConfigured()) {
    return null;
  }

  const adId = `content-ad-${position}`;

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
      <Script
        id={adId}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}

// Composant pour les publicités sidebar
export function SidebarAd() {
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
      <Script
        id="sidebar-ad"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}

// Composant pour les publicités en fin d'article
export function ArticleEndAd() {
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
      <Script
        id="article-end-ad"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
} 