// Configuration Google AdSense
export const ADSENSE_CONFIG = {
  // Remplace par ton ID AdSense réel depuis ton compte Google AdSense
  CLIENT_ID: 'ca-pub-7781413449967091', // ID AdSense de daveandlucesolutions.com
  
  // Configuration Auto Ads
  AUTO_ADS: {
    enabled: true,
    overlays: {
      bottom: true,
      top: false,
      left: false,
      right: false
    },
    pageLevelAds: true,
    inArticleAds: true,
    inFeedAds: true,
    matchedContent: true,
    anchorAds: true,
    vignetteAds: true
  },
  
  // Configuration des couleurs
  COLORS: {
    background: 'FFFFFF',
    border: 'CCCCCC',
    link: '0000FF',
    text: '000000',
    url: '008000'
  },
  
  // Formats de publicités supportés
  FORMATS: ['auto', 'text', 'image', 'video'],
  
  // Responsive design
  RESPONSIVE: true,
  
  // Test mode (désactiver en production)
  TEST_MODE: false
}

// Fonction pour obtenir l'ID client
export function getAdSenseClientId(): string {
  if (ADSENSE_CONFIG.TEST_MODE) {
    return 'ca-pub-0000000000000000' // ID de test
  }
  return ADSENSE_CONFIG.CLIENT_ID
}

// Fonction pour vérifier si AdSense est configuré
export function isAdSenseConfigured(): boolean {
  return ADSENSE_CONFIG.CLIENT_ID !== 'ca-pub-XXXXXXXXXXXXXXX'
} 