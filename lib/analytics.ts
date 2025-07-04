// Configuration Google Analytics et outils de tracking SEO

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Configuration Google Analytics 4
export const GA_CONFIG = {
  measurementId: GA_TRACKING_ID,
  debugMode: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
};

// Événements personnalisés pour le tracking
export const GA_EVENTS = {
  // Événements de navigation
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  
  // Événements de conversion
  FORM_SUBMIT: 'form_submit',
  CONTACT_CLICK: 'contact_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  
  // Événements de contenu
  VIDEO_PLAY: 'video_play',
  DOWNLOAD: 'file_download',
  SCROLL_DEPTH: 'scroll_depth',
  
  // Événements e-commerce
  ADD_TO_CART: 'add_to_cart',
  PURCHASE: 'purchase',
  VIEW_ITEM: 'view_item',
  
  // Événements formations
  COURSE_VIEW: 'course_view',
  COURSE_ENROLL: 'course_enroll',
  COURSE_COMPLETE: 'course_complete',
  
  // Événements solutions
  SOLUTION_VIEW: 'solution_view',
  DEMO_REQUEST: 'demo_request',
  PRICING_VIEW: 'pricing_view',
};

// Configuration des conversions
export const CONVERSION_GOALS = {
  CONTACT_FORM: 'contact_form_submit',
  PHONE_CALL: 'phone_call',
  EMAIL_CONTACT: 'email_contact',
  COURSE_ENROLLMENT: 'course_enrollment',
  DEMO_REQUEST: 'demo_request',
  PURCHASE: 'purchase',
};

// Configuration Search Console
export const SEARCH_CONSOLE_CONFIG = {
  siteUrl: 'https://dlsolutions.com',
  sitemapUrl: 'https://dlsolutions.com/sitemap.xml',
  robotsUrl: 'https://dlsolutions.com/robots.txt',
};

// Configuration des mots-clés cibles
export const TARGET_KEYWORDS = {
  primary: [
    'DL Solutions',
    'CRM Cameroun',
    'ERP Cameroun',
    'boutique internationale',
    'formations professionnelles'
  ],
  secondary: [
    'solutions bancaires',
    'assurance Cameroun',
    'immobilier Cameroun',
    'santé Cameroun',
    'hôtellerie Cameroun'
  ],
  longTail: [
    'livraison Cameroun',
    'école de police',
    'bureaux Cameroun',
    'solutions digitales Cameroun',
    'formation en ligne Cameroun'
  ]
};

// Configuration des métriques SEO
export const SEO_METRICS = {
  // Métriques de performance
  LCP_THRESHOLD: 2.5, // Largest Contentful Paint (secondes)
  FID_THRESHOLD: 100, // First Input Delay (millisecondes)
  CLS_THRESHOLD: 0.1, // Cumulative Layout Shift
  
  // Métriques de contenu
  MIN_CONTENT_LENGTH: 300, // mots minimum par page
  OPTIMAL_TITLE_LENGTH: 60, // caractères
  OPTIMAL_DESCRIPTION_LENGTH: 160, // caractères
  
  // Métriques de liens
  MAX_INTERNAL_LINKS: 100, // liens internes par page
  MIN_EXTERNAL_LINKS: 1, // liens externes minimum
};

// Fonction pour initialiser Google Analytics
export function initGA() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'user_type',
        'custom_parameter_2': 'page_category',
      },
    });
  }
}

// Fonction pour tracker les événements
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters,
    });
  }
}

// Fonction pour tracker les conversions
export function trackConversion(goalId: string, value: number = 0) {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: goalId,
    value: value,
  });
}

// Fonction pour tracker les pages vues
export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 