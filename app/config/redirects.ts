/**
 * Configuration des redirections pour éviter les boucles infinies
 */

export const redirectConfig = {
  // Domaines autorisés (pas de redirection)
  allowedHosts: [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'netlify.app',
    'vercel.app',
    'dlsolutionssarl.tech' // Domaine principal
  ],
  
  // Domaines à rediriger vers le principal
  redirectToPrimary: [
    'daveandlucesolutions.com',
    'www.daveandlucesolutions.com',
    'www.dlsolutionssarl.tech'
  ],
  
  // Domaine principal
  primaryDomain: 'dlsolutionssarl.tech',
  
  // Chemins exclus des redirections
  excludedPaths: [
    '/api',
    '/_next',
    '/static',
    '/images',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ]
};

/**
 * Vérifie si un hostname est autorisé (pas de redirection)
 */
export function isAllowedHost(hostname: string): boolean {
  return redirectConfig.allowedHosts.some(host => 
    hostname.includes(host)
  );
}

/**
 * Vérifie si un hostname doit être redirigé
 */
export function shouldRedirect(hostname: string): boolean {
  return redirectConfig.redirectToPrimary.some(host => 
    hostname.includes(host)
  );
}

/**
 * Obtient le domaine de destination pour une redirection
 */
export function getRedirectDestination(hostname: string): string | null {
  if (shouldRedirect(hostname)) {
    return `https://${redirectConfig.primaryDomain}`;
  }
  return null;
} 