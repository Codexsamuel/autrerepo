import { VisitorTrackingDB } from '@/lib/database/visitor-tracking';
import { NextRequest, NextResponse } from 'next/server';

// Configuration du Business Profile ID
const BUSINESS_PROFILE_ID = '14485140012634952843';

// Fonction pour détecter le type d'appareil
function detectDevice(userAgent: string): 'mobile' | 'desktop' | 'tablet' {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i;
  
  if (tabletRegex.test(userAgent)) return 'tablet';
  if (mobileRegex.test(userAgent)) return 'mobile';
  return 'desktop';
}

// Fonction pour détecter la source de trafic
function detectSource(request: NextRequest): 'search' | 'maps' | 'direct' | 'social' | 'referral' {
  const referer = request.headers.get('referer');
  const userAgent = request.headers.get('user-agent') || '';
  
  if (!referer) return 'direct';
  
  const refererUrl = new URL(referer);
  const hostname = refererUrl.hostname.toLowerCase();
  
  // Google Search
  if (hostname.includes('google.com') && refererUrl.searchParams.has('q')) {
    return 'search';
  }
  
  // Google Maps
  if (hostname.includes('google.com') && refererUrl.pathname.includes('maps')) {
    return 'maps';
  }
  
  // Réseaux sociaux
  const socialDomains = [
    'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
    'youtube.com', 'tiktok.com', 'snapchat.com'
  ];
  
  if (socialDomains.some(domain => hostname.includes(domain))) {
    return 'social';
  }
  
  // Autres sites (référence)
  return 'referral';
}

// Fonction pour obtenir la géolocalisation approximative
async function getLocationFromIP(ip: string): Promise<{
  city: string;
  region: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}> {
  try {
    // Utiliser un service de géolocalisation IP (exemple avec ipapi.co)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    return {
      city: data.city || 'Inconnu',
      region: data.region || 'Inconnu',
      country: data.country_name || 'Inconnu',
      coordinates: data.latitude && data.longitude 
        ? { lat: data.latitude, lng: data.longitude }
        : undefined
    };
  } catch (error) {
    console.error('Erreur lors de la géolocalisation:', error);
    return {
      city: 'Inconnu',
      region: 'Inconnu',
      country: 'Inconnu'
    };
  }
}

// Fonction pour extraire la requête de recherche Google
function extractSearchQuery(request: NextRequest): string | undefined {
  const referer = request.headers.get('referer');
  if (!referer) return undefined;
  
  try {
    const refererUrl = new URL(referer);
    if (refererUrl.hostname.includes('google.com')) {
      return refererUrl.searchParams.get('q') || undefined;
    }
  } catch (error) {
    console.error('Erreur lors de l\'extraction de la requête:', error);
  }
  
  return undefined;
}

// Fonction pour générer un ID de visiteur basé sur l'IP et l'User-Agent
function generateVisitorId(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Créer un hash simple basé sur l'IP et l'User-Agent
  const hash = btoa(`${ip}-${userAgent}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  return `visitor_${hash}`;
}

// Fonction pour tracker une page vue
async function trackPageView(request: NextRequest, response: NextResponse): Promise<void> {
  try {
    const url = request.nextUrl;
    const pathname = url.pathname;
    
    // Ignorer les ressources statiques et les API
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/static/') ||
      pathname.includes('.') // Fichiers avec extensions
    ) {
      return;
    }
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer');
    
    // Générer les IDs
    const visitorId = generateVisitorId(request);
    const sessionId = VisitorTrackingDB.generateSessionId();
    
    // Détecter les informations du visiteur
    const device = detectDevice(userAgent);
    const source = detectSource(request);
    const searchQuery = extractSearchQuery(request);
    const location = await getLocationFromIP(ip);
    
    // Vérifier si c'est un visiteur retournant
    const isReturning = await VisitorTrackingDB.isReturningVisitor(visitorId, BUSINESS_PROFILE_ID);
    
    // Créer la session
    const session = {
      session_id: sessionId,
      visitor_id: visitorId,
      timestamp: new Date().toISOString(),
      source,
      action: 'view' as const,
      location,
      device,
      session_duration: 0, // Sera mis à jour plus tard
      pages_viewed: [pathname],
      search_query: searchQuery,
      user_agent: userAgent,
      ip_address: ip,
      is_returning: isReturning,
      business_profile_id: BUSINESS_PROFILE_ID
    };
    
    // Enregistrer la session de manière asynchrone (ne pas bloquer la réponse)
    VisitorTrackingDB.recordSession(session).catch(error => {
      console.error('Erreur lors du tracking de la page:', error);
    });
    
    // Ajouter des headers pour le tracking côté client
    response.headers.set('X-Visitor-ID', visitorId);
    response.headers.set('X-Session-ID', sessionId);
    
  } catch (error) {
    console.error('Erreur lors du tracking:', error);
  }
}

// Fonction pour tracker une action (clic, appel, etc.)
export async function trackAction(
  request: NextRequest,
  action: 'click' | 'call' | 'direction' | 'website_visit'
): Promise<void> {
  try {
    const visitorId = request.headers.get('x-visitor-id');
    const sessionId = request.headers.get('x-session-id');
    
    if (!visitorId || !sessionId) {
      console.warn('IDs de visiteur manquants pour le tracking d\'action');
      return;
    }
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer');
    const location = await getLocationFromIP(ip);
    
    const session = {
      session_id: sessionId,
      visitor_id: visitorId,
      timestamp: new Date().toISOString(),
      source: detectSource(request),
      action,
      location,
      device: detectDevice(userAgent),
      session_duration: 0,
      pages_viewed: [],
      user_agent: userAgent,
      ip_address: ip,
      is_returning: false,
      business_profile_id: BUSINESS_PROFILE_ID
    };
    
    await VisitorTrackingDB.recordSession(session);
    
  } catch (error) {
    console.error('Erreur lors du tracking d\'action:', error);
  }
}

// Middleware principal
export async function visitorTrackerMiddleware(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  // Tracker la page vue
  await trackPageView(request, response);
  
  return response;
}

// Fonction pour mettre à jour la durée de session
export async function updateSessionDuration(
  sessionId: string,
  duration: number
): Promise<void> {
  try {
    // Cette fonction mettrait à jour la durée de session dans la base de données
    // Pour l'instant, on utilise une approche simplifiée
    console.log(`Session ${sessionId} mise à jour avec une durée de ${duration}s`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la durée:', error);
  }
}

// Script pour initialiser le tracking côté client
export const CLIENT_TRACKING_SCRIPT = `
(function() {
  'use strict';
  
  // Récupérer les IDs depuis les headers
  const visitorId = document.querySelector('meta[name="visitor-id"]')?.content;
  const sessionId = document.querySelector('meta[name="session-id"]')?.content;
  
  if (!visitorId || !sessionId) {
    console.warn('IDs de tracking manquants');
    return;
  }
  
  let sessionStartTime = Date.now();
  let isPageVisible = true;
  
  // Tracker la visibilité de la page
  document.addEventListener('visibilitychange', function() {
    isPageVisible = !document.hidden;
  });
  
  // Tracker les clics sur les liens externes
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.href;
    if (!href) return;
    
    // Détecter le type d'action
    let action = 'click';
    if (href.startsWith('tel:')) action = 'call';
    else if (href.startsWith('mailto:')) action = 'call';
    else if (href.includes('maps.google.com') || href.includes('google.com/maps')) action = 'direction';
    else if (href.startsWith('http') && !href.includes(window.location.hostname)) action = 'website_visit';
    
    // Envoyer l'action au serveur
    fetch('/api/tracking/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Visitor-ID': visitorId,
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({
        action: action,
        url: href,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  });
  
  // Envoyer la durée de session avant de quitter
  window.addEventListener('beforeunload', function() {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    
    // Utiliser sendBeacon pour une transmission fiable
    const data = new FormData();
    data.append('action', 'session_end');
    data.append('duration', duration.toString());
    data.append('visitor_id', visitorId);
    data.append('session_id', sessionId);
    
    navigator.sendBeacon('/api/tracking/session-end', data);
  });
  
  // Tracker les changements de page (SPA)
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(function() {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      
      // Envoyer le changement de page
      fetch('/api/tracking/page-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Visitor-ID': visitorId,
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({
          path: currentPath,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('Tracking client initialisé');
})();
`; 