'use client';

import { getAdSenseClientId, isAdSenseConfigured } from '@/config/adsense';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

// Configuration Google AdSense Auto Ads
const ADSENSE_CLIENT_ID = getAdSenseClientId();

// Variable globale pour éviter les doublons
declare global {
  interface Window {
    adsbygoogle: any[];
    adSenseInitialized?: boolean;
  }
}

// Composant principal pour l'initialisation des Auto Ads (une seule fois par page)
export default function GoogleAutoAds() {
  const initialized = useRef(false);

  useEffect(() => {
    // Éviter les doublons d'initialisation
    if (typeof window !== 'undefined' && !window.adSenseInitialized && !initialized.current) {
      window.adSenseInitialized = true;
      initialized.current = true;
      
      // Initialiser AdSense une seule fois
      if (window.adsbygoogle) {
        window.adsbygoogle.push({
          google_ad_client: ADSENSE_CLIENT_ID,
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
      }
    }
  }, []);

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
    </>
  );
}

// Fonction utilitaire pour ajouter des publicités manuelles
function addManualAd(slot: string, format: string = "auto", responsive: boolean = true) {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    window.adsbygoogle.push({
      google_ad_client: ADSENSE_CLIENT_ID,
      google_ad_slot: slot,
      google_ad_format: format,
      google_full_width_responsive: responsive
    });
  }
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
  useEffect(() => {
    addManualAd(slot, format, responsive);
  }, [slot, format, responsive]);

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
    </div>
  );
}

// Composant pour les publicités dans le contenu (sans enable_page_level_ads)
export function GoogleInContentAd() {
  useEffect(() => {
    addManualAd("auto", "auto", true);
  }, []);

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
    </div>
  );
}

// Composant pour les publicités sidebar (sans enable_page_level_ads)
export function GoogleSidebarAd() {
  useEffect(() => {
    addManualAd("auto", "auto", false);
  }, []);

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
    </div>
  );
} 