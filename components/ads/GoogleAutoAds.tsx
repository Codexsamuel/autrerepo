'use client';

import { getAdSenseClientId, isAdSenseConfigured } from '@/config/adsense';
import Script from 'next/script';

// Configuration Google AdSense Auto Ads
const ADSENSE_CLIENT_ID = getAdSenseClientId();

// Composant principal pour l'initialisation des Auto Ads (une seule fois par page)
export default function GoogleAutoAds() {
  // Ne pas afficher les pubs si AdSense n'est pas configuré
  if (!isAdSenseConfigured()) {
    console.warn('Google AdSense not configured. Please update config/adsense.ts with your client ID.');
    return null;
  }

  return (
    <>
      {/* Script principal Google AdSense */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        async
      />
      
      {/* Configuration Auto Ads avec enable_page_level_ads (UNE SEULE FOIS) */}
      <Script
        id="google-auto-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${ADSENSE_CLIENT_ID}",
              enable_page_level_ads: true,
              overlays: {bottom: true},
              page_level_pubvars: {
                google_ad_format: "auto",
                google_ad_type: "text,image",
                google_color_bg: "FFFFFF",
                google_color_border: "CCCCCC",
                google_color_link: "0000FF",
                google_color_text: "000000",
                google_color_url: "008000"
              }
            });
          `,
        }}
      />
    </>
  );
}

// Composant pour les publicités manuelles (sans enable_page_level_ads)
export function GoogleManualAd({ 
  slot, 
  format = "auto", 
  responsive = true 
}: { 
  slot: string; 
  format?: string; 
  responsive?: boolean; 
}) {
  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      <Script
        id={`adsbygoogle-${slot}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}

// Composant pour les publicités dans le contenu (sans enable_page_level_ads)
export function GoogleInContentAd() {
  return (
    <div className="ad-container my-8 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script
        id="adsbygoogle-incontent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}

// Composant pour les publicités sidebar (sans enable_page_level_ads)
export function GoogleSidebarAd() {
  return (
    <div className="ad-container sticky top-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
      <Script
        id="adsbygoogle-sidebar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
} 