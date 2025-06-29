import { NextRequest, NextResponse } from 'next/server';
import { realEstateMonitoringService } from '@/lib/services/real-estate-monitoring';

export async function activityTracker(request: NextRequest) {
  const response = NextResponse.next();

  try {
    // Extraire les informations de l'utilisateur
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const pathname = request.nextUrl.pathname;

    // Détecter le type d'appareil
    const deviceInfo = detectDevice(userAgent);
    
    // Obtenir la localisation (simulée pour l'exemple)
    const location = await getLocationFromIP(ipAddress);

    // Identifier les actions critiques
    const criticalActions = [
      '/api/properties/update',
      '/api/properties/delete',
      '/api/payments/process',
      '/api/contracts/sign',
      '/api/admin/',
      '/api/users/'
    ];

    const isCriticalAction = criticalActions.some(action => pathname.includes(action));

    // Créer l'activité
    const propertyId = extractPropertyId(pathname);
    
    // Ne tracker que si on a un propertyId valide ou une action critique
    if (propertyId || isCriticalAction) {
      const activity = {
        propertyId: propertyId || 'system',
        type: determineActivityType(pathname),
        userId: extractUserId(request),
        userRole: extractUserRole(request),
        action: pathname,
        details: {
          method: request.method,
          referer,
          userAgent,
          ipAddress,
          timestamp: new Date().toISOString()
        },
        ipAddress,
        userAgent,
        location,
        deviceInfo
      };

      // Enregistrer l'activité si elle est pertinente
      if (shouldTrackActivity(pathname, isCriticalAction)) {
        await realEstateMonitoringService.logActivity(activity);
      }
    }

  } catch (error) {
    console.error('❌ Erreur tracking activité:', error);
  }

  return response;
}

function detectDevice(userAgent: string) {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/.test(userAgent);
  
  let type: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (isTablet) type = 'tablet';
  else if (isMobile) type = 'mobile';

  const os = extractOS(userAgent);
  const browser = extractBrowser(userAgent);
  const screenResolution = '1920x1080'; // Simulé

  return {
    type,
    os,
    browser,
    screenResolution
  };
}

function extractOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function extractBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

async function getLocationFromIP(ip: string) {
  // Simulation de géolocalisation
  // En production, utiliser un service comme MaxMind ou IP2Location
  return {
    latitude: 48.8566,
    longitude: 2.3522,
    city: 'Paris',
    country: 'France'
  };
}

function extractPropertyId(pathname: string): string | null {
  const match = pathname.match(/\/properties\/([^\/]+)/);
  return match ? match[1] : null;
}

function extractUserId(request: NextRequest): string {
  // Extraire l'ID utilisateur depuis les headers ou cookies
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    // Décoder le token JWT et extraire l'ID utilisateur
    return 'user_123'; // Simulé
  }
  return 'anonymous';
}

function extractUserRole(request: NextRequest): 'agent' | 'client' | 'admin' | 'manager' {
  // Déterminer le rôle utilisateur
  const pathname = request.nextUrl.pathname;
  
  if (pathname.includes('/admin/')) return 'admin';
  if (pathname.includes('/agent/')) return 'agent';
  if (pathname.includes('/client/')) return 'client';
  if (pathname.includes('/manager/')) return 'manager';
  
  return 'client';
}

function determineActivityType(pathname: string): 'viewing' | 'offer' | 'payment' | 'contract' | 'maintenance' | 'alert' {
  if (pathname.includes('/properties/')) return 'viewing';
  if (pathname.includes('/payments/')) return 'payment';
  if (pathname.includes('/contracts/')) return 'contract';
  if (pathname.includes('/admin/')) return 'alert';
  if (pathname.includes('/api/')) return 'alert';
  
  return 'viewing';
}

function shouldTrackActivity(pathname: string, isCriticalAction: boolean): boolean {
  // Toujours tracker les actions critiques
  if (isCriticalAction) return true;
  
  // Tracker les pages importantes
  const importantPages = [
    '/properties/',
    '/admin/',
    '/payments/',
    '/contracts/',
    '/api/'
  ];
  
  return importantPages.some(page => pathname.includes(page));
}

export default activityTracker; 