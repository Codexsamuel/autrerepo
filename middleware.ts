import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Configuration des domaines
const PRIMARY_DOMAIN = 'dlsolutionssarl.tech'; // Domaine principal
const SECONDARY_DOMAIN = 'daveandlucesolutions.com'; // Domaine secondaire
const NETLIFY_DOMAIN = 'davyetlucie.netlify.app'; // Domaine Netlify

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  
  // Chemins exclus des redirections
  const excludedPaths = [
    '/api',
    '/_next',
    '/static',
    '/images',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ];
  
  // Vérifier si le chemin est exclu
  if (excludedPaths.some(path => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Rediriger daveandlucesolutions.com vers dlsolutionssarl.tech (domaine principal)
  if (hostname.includes(SECONDARY_DOMAIN)) {
    url.hostname = PRIMARY_DOMAIN;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301); // Redirection permanente
  }
  
  // Rediriger www.dlsolutionssarl.tech vers dlsolutionssarl.tech
  if (hostname.includes('www.' + PRIMARY_DOMAIN)) {
    url.hostname = PRIMARY_DOMAIN;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301); // Redirection permanente
  }
  
  // Pas de redirection pour le domaine principal et Netlify
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
