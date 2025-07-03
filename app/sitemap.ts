import { MetadataRoute } from 'next'

// Configuration pour l'export statique
export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dlsolutions.com'
  
  // Pages principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions/selection/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formations/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/novacore/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/novacore/dl-style/`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/a-propos/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Pages de solutions sectorielles
  const sectorPages = [
    '/solutions/banque/',
    '/solutions/assurance/',
    '/solutions/immobilier/',
    '/solutions/hospitalier/',
    '/solutions/hospitality/',
    '/solutions/ia/',
    '/solutions/mobile/',
    '/solutions/trading/',
    '/solutions/facturation/',
    '/solutions/crm/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Pages de démonstrations
  const demoPages = [
    '/demo/dl-banque/',
    '/demo/dl-assurance/',
    '/demo/dl-immobilier/',
    '/demo/dl-restaurant/',
    '/demo/dl-marketing/',
    '/demo/dl-community-manager/',
    '/demo/dl-mining/',
    '/demo/dl-agriculture/',
    '/demo/dl-commerce/',
    '/demo/dl-business/',
    '/demo/dl-style/',
    '/demo/dl-travel/',
    '/demo/ezee-optimus/',
    '/demo/ezee-optimus/calendar/',
    '/demo/ezee-optimus/advanced-crm/',
    '/demo/ezee-optimus/governance/',
    '/demo/ezee-optimus/photo-verification/',
    '/demo/salesforce/',
    '/demo/dlsolutions-hub/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Pages de formations
  const formationPages = [
    '/formations/crm-gestion-client/',
    '/formations/intelligence-artificielle-pour-entreprises/',
    '/formations/marketing-digital-reseaux-sociaux/',
    '/formations/e-commerce-vente-en-ligne/',
    '/formations/creation-visuelle-design/',
    '/formations/televente-prospection/',
    '/formations/sav-excellence/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Pages NovaCore
  const novacorePages = [
    '/novacore/dl-banque/',
    '/novacore/dl-assurance/',
    '/novacore/dl-immobilier/',
    '/novacore/dl-hospital/',
    '/novacore/dl-hospitality/',
    '/novacore/dl-restaurant/',
    '/novacore/dl-community/',
    '/novacore/dl-community-manager/',
    '/novacore/dl-cursor/',
    '/novacore/dl-trading/',
    '/novacore/dl-travel/',
    '/novacore/dl-travel-vip/',
    '/novacore/dl-style/',
    '/novacore/dl-style/panier/',
    '/novacore/dl-style/checkout/',
    '/novacore/dl-style/produit/',
    '/novacore/dl-style/compte/',
    '/novacore/dl-style/support/',
    '/novacore/novaworld/',
    '/novacore/dashboard/',
    '/novacore/analytics/',
    '/novacore/crm-integrations/',
    '/novacore/video-editor/',
    '/novacore/workflows/',
    '/novacore/security/',
    '/novacore/settings/',
    '/novacore/users/',
    '/novacore/pricing/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Pages NovaWorld
  const novaworldPages = [
    '/novaworld/',
    '/novaworld/feed/',
    '/novaworld/network/',
    '/novaworld/jobs/',
    '/novaworld/companies/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Pages spécialisées
  const specialPages = [
    '/dl-bookmaker/',
    '/dl-drone/',
    '/dl-paris-sportif/',
    '/trading/',
    '/rendez-vous/',
    '/devis/',
    '/intranet/',
    '/intranet/admin/',
    '/intranet/rh/',
    '/admin/',
    '/admin/dashboard/',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...mainPages,
    ...sectorPages,
    ...demoPages,
    ...formationPages,
    ...novacorePages,
    ...novaworldPages,
    ...specialPages,
  ]
}
