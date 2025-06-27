/**
 * Utilitaires pour la gestion des liens Cloudinary
 */

export interface CloudinaryVideoConfig {
  cloudName: string
  version: string
  publicId: string
  format?: string
  transformations?: string[]
}

/**
 * Génère un lien Cloudinary optimisé pour les vidéos
 */
export function generateCloudinaryVideoUrl(config: CloudinaryVideoConfig): string {
  const { cloudName, version, publicId, format = 'mp4', transformations = [] } = config
  
  const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload`
  const transformString = transformations.length > 0 ? `/${transformations.join('/')}` : ''
  
  return `${baseUrl}${transformString}/v${version}/${publicId}.${format}`
}

/**
 * Génère un lien Cloudinary optimisé pour les images
 */
export function generateCloudinaryImageUrl(config: Omit<CloudinaryVideoConfig, 'format'> & { format?: string }): string {
  const { cloudName, version, publicId, format = 'jpg', transformations = [] } = config
  
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  const transformString = transformations.length > 0 ? `/${transformations.join('/')}` : ''
  
  return `${baseUrl}${transformString}/v${version}/${publicId}.${format}`
}

/**
 * Extrait les informations d'un lien Cloudinary existant
 */
export function parseCloudinaryUrl(url: string): CloudinaryVideoConfig | null {
  try {
    const regex = /https:\/\/res\.cloudinary\.com\/([^\/]+)\/(video|image)\/upload(?:\/([^\/]+))?\/v(\d+)\/([^\.]+)\.([^\/]+)/
    const match = url.match(regex)
    
    if (!match) return null
    
    const [, cloudName, resourceType, transformations, version, publicId, format] = match
    
    return {
      cloudName,
      version,
      publicId,
      format,
      transformations: transformations ? transformations.split('/') : []
    }
  } catch (error) {
    console.error('Erreur lors du parsing de l\'URL Cloudinary:', error)
    return null
  }
}

/**
 * Optimise un lien Cloudinary pour le streaming vidéo
 */
export function optimizeVideoUrl(url: string, options: {
  quality?: 'auto' | 'low' | 'medium' | 'high'
  format?: 'mp4' | 'webm'
  bitrate?: number
} = {}): string {
  const config = parseCloudinaryUrl(url)
  if (!config) return url
  
  const { quality = 'auto', format = 'mp4', bitrate } = options
  const transformations = [...(config.transformations || [])]
  
  // Ajouter les optimisations
  if (quality !== 'auto') {
    transformations.push(`q_${quality}`)
  }
  
  if (bitrate) {
    transformations.push(`br_${bitrate}`)
  }
  
  // Optimisations pour le streaming
  transformations.push('f_auto', 'fl_progressive')
  
  return generateCloudinaryVideoUrl({
    ...config,
    format,
    transformations
  })
}

/**
 * Vérifie si une URL Cloudinary est valide
 */
export function isValidCloudinaryUrl(url: string): boolean {
  return parseCloudinaryUrl(url) !== null
}

/**
 * Génère un lien de thumbnail pour une vidéo Cloudinary
 */
export function generateVideoThumbnail(url: string, options: {
  width?: number
  height?: number
  crop?: 'fill' | 'scale' | 'fit'
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west'
} = {}): string {
  const config = parseCloudinaryUrl(url)
  if (!config) return url
  
  const { width = 500, height = 300, crop = 'fill', gravity = 'auto' } = options
  
  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    'f_auto'
  ]
  
  return generateCloudinaryImageUrl({
    ...config,
    format: 'jpg',
    transformations
  })
} 