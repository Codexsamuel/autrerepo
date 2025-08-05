import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration FaceSwap API
const FACESWAP_CONFIG = {
  host: 'faceswap-image-transformation-api.p.rapidapi.com',
  baseURL: 'https://faceswap-image-transformation-api.p.rapidapi.com',
  key: RAPID_API_KEY
};

// Interfaces pour les requêtes et réponses
export interface FaceSwapRequest {
  source_image_url?: string;
  target_image_url?: string;
  source_image_base64?: string;
  target_image_base64?: string;
  enhancement_level?: number;
  preserve_expression?: boolean;
  preserve_lighting?: boolean;
  output_format?: 'jpg' | 'png' | 'webp';
  quality?: number;
}

export interface FaceSwapResponse {
  success: boolean;
  result_url?: string;
  result_base64?: string;
  processing_time?: number;
  error?: string;
}

export interface FaceSwapError {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

/**
 * 🔧 Fonction utilitaire pour faire des requêtes à FaceSwap API
 * @param endpoint Endpoint à appeler
 * @param data Données à envoyer
 * @param method Méthode HTTP (POST par défaut)
 * @returns Réponse de l'API
 */
export async function makeFaceSwapRequest(
  endpoint: string,
  data: any,
  method: 'GET' | 'POST' = 'POST'
): Promise<any> {
  try {
    const url = `${FACESWAP_CONFIG.baseURL}${endpoint}`;
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': FACESWAP_CONFIG.key,
        'X-RapidAPI-Host': FACESWAP_CONFIG.host,
      },
      data: method === 'POST' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      timeout: 60000 // 60 secondes pour le traitement d'image
    };

    const response = await axios(config);
    return response.data;
    
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.message || 'Erreur inconnue';
    
    console.error(`❌ FaceSwap API (${endpoint}): ${status ? `HTTP ${status}` : message}`);
    
    // Remonter l'erreur pour gestion
    throw error;
  }
}

/**
 * 🔄 Face Swap avec URLs d'images
 * @param sourceImageUrl URL de l'image source (visage à copier)
 * @param targetImageUrl URL de l'image cible (visage à remplacer)
 * @param options Options de traitement
 * @returns URL de l'image résultante
 */
export async function faceSwapWithUrls(
  sourceImageUrl: string,
  targetImageUrl: string,
  options: {
    enhancement_level?: number;
    preserve_expression?: boolean;
    preserve_lighting?: boolean;
    output_format?: 'jpg' | 'png' | 'webp';
    quality?: number;
  } = {}
): Promise<FaceSwapResponse> {
  try {
    console.log(`🔄 FaceSwap: Traitement avec URLs`);
    
    const requestData: FaceSwapRequest = {
      source_image_url: sourceImageUrl,
      target_image_url: targetImageUrl,
      enhancement_level: options.enhancement_level || 1,
      preserve_expression: options.preserve_expression || true,
      preserve_lighting: options.preserve_lighting || true,
      output_format: options.output_format || 'jpg',
      quality: options.quality || 90
    };
    
    const response = await makeFaceSwapRequest('/faceswap', requestData);
    
    console.log(`✅ FaceSwap: Traitement terminé`);
    return {
      success: true,
      result_url: response.result_url,
      processing_time: response.processing_time
    };
    
  } catch (error: any) {
    console.error(`❌ FaceSwap URLs: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🔄 Face Swap avec images en base64
 * @param sourceImageBase64 Image source en base64
 * @param targetImageBase64 Image cible en base64
 * @param options Options de traitement
 * @returns Image résultante en base64
 */
export async function faceSwapWithBase64(
  sourceImageBase64: string,
  targetImageBase64: string,
  options: {
    enhancement_level?: number;
    preserve_expression?: boolean;
    preserve_lighting?: boolean;
    output_format?: 'jpg' | 'png' | 'webp';
    quality?: number;
  } = {}
): Promise<FaceSwapResponse> {
  try {
    console.log(`🔄 FaceSwap: Traitement avec base64`);
    
    const requestData: FaceSwapRequest = {
      source_image_base64: sourceImageBase64,
      target_image_base64: targetImageBase64,
      enhancement_level: options.enhancement_level || 1,
      preserve_expression: options.preserve_expression || true,
      preserve_lighting: options.preserve_lighting || true,
      output_format: options.output_format || 'jpg',
      quality: options.quality || 90
    };
    
    const response = await makeFaceSwapRequest('/faceswap', requestData);
    
    console.log(`✅ FaceSwap: Traitement terminé`);
    return {
      success: true,
      result_base64: response.result_base64,
      processing_time: response.processing_time
    };
    
  } catch (error: any) {
    console.error(`❌ FaceSwap Base64: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🎭 Face Swap pour produits (remplacement de visage modèle)
 * @param productImageUrl URL de l'image produit
 * @param modelFaceUrl URL du visage modèle
 * @param options Options de traitement
 * @returns URL de l'image produit avec visage remplacé
 */
export async function faceSwapProduct(
  productImageUrl: string,
  modelFaceUrl: string,
  options: {
    enhancement_level?: number;
    preserve_expression?: boolean;
    preserve_lighting?: boolean;
    output_format?: 'jpg' | 'png' | 'webp';
    quality?: number;
  } = {}
): Promise<FaceSwapResponse> {
  try {
    console.log(`🛍️ FaceSwap Produit: Remplacement visage modèle`);
    
    // Utiliser l'image produit comme cible et le visage modèle comme source
    const requestData: FaceSwapRequest = {
      source_image_url: modelFaceUrl,
      target_image_url: productImageUrl,
      enhancement_level: options.enhancement_level || 2, // Niveau plus élevé pour les produits
      preserve_expression: options.preserve_expression || false, // Ne pas préserver l'expression pour les produits
      preserve_lighting: options.preserve_lighting || true,
      output_format: options.output_format || 'jpg',
      quality: options.quality || 95 // Qualité élevée pour les produits
    };
    
    const response = await makeFaceSwapRequest('/faceswap', requestData);
    
    console.log(`✅ FaceSwap Produit: Visage remplacé`);
    return {
      success: true,
      result_url: response.result_url,
      processing_time: response.processing_time
    };
    
  } catch (error: any) {
    console.error(`❌ FaceSwap Produit: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🎨 Face Swap avec amélioration automatique
 * @param sourceImageUrl URL de l'image source
 * @param targetImageUrl URL de l'image cible
 * @param enhancementLevel Niveau d'amélioration (1-5)
 * @returns Image améliorée
 */
export async function enhancedFaceSwap(
  sourceImageUrl: string,
  targetImageUrl: string,
  enhancementLevel: number = 3
): Promise<FaceSwapResponse> {
  try {
    console.log(`🎨 FaceSwap Amélioré: Niveau ${enhancementLevel}`);
    
    const requestData: FaceSwapRequest = {
      source_image_url: sourceImageUrl,
      target_image_url: targetImageUrl,
      enhancement_level: Math.max(1, Math.min(5, enhancementLevel)), // Limiter entre 1 et 5
      preserve_expression: true,
      preserve_lighting: true,
      output_format: 'jpg',
      quality: 95
    };
    
    const response = await makeFaceSwapRequest('/faceswap', requestData);
    
    console.log(`✅ FaceSwap Amélioré: Traitement terminé`);
    return {
      success: true,
      result_url: response.result_url,
      processing_time: response.processing_time
    };
    
  } catch (error: any) {
    console.error(`❌ FaceSwap Amélioré: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🔍 Vérifier la compatibilité des images pour Face Swap
 * @param imageUrl URL de l'image à vérifier
 * @returns Informations sur la compatibilité
 */
export async function checkImageCompatibility(imageUrl: string): Promise<{
  compatible: boolean;
  hasFace: boolean;
  faceCount: number;
  imageQuality: 'low' | 'medium' | 'high';
  recommendations: string[];
}> {
  try {
    console.log(`🔍 Vérification compatibilité: ${imageUrl}`);
    
    // Simulation de vérification (dans un vrai système, on utiliserait une API de détection de visage)
    const response = await makeFaceSwapRequest('/analyze', { image_url: imageUrl });
    
    return {
      compatible: response.compatible || false,
      hasFace: response.has_face || false,
      faceCount: response.face_count || 0,
      imageQuality: response.quality || 'medium',
      recommendations: response.recommendations || []
    };
    
  } catch (error: any) {
    console.error(`❌ Vérification compatibilité: Erreur`, error.message);
    return {
      compatible: false,
      hasFace: false,
      faceCount: 0,
      imageQuality: 'low',
      recommendations: ['Erreur lors de la vérification']
    };
  }
}

/**
 * 📊 Obtenir des statistiques sur l'API FaceSwap
 */
export function getFaceSwapStats() {
  return {
    name: 'FaceSwap Image Transformation API',
    description: 'API de transformation d\'images avec remplacement de visage via RapidAPI',
    host: FACESWAP_CONFIG.host,
    features: [
      'Remplacement de visage avec URLs',
      'Remplacement de visage avec base64',
      'Amélioration automatique d\'image',
      'Préservation d\'expression et d\'éclairage',
      'Formats de sortie multiples (JPG, PNG, WebP)',
      'Qualité configurable',
      'Vérification de compatibilité'
    ],
    supportedFormats: {
      input: ['jpg', 'jpeg', 'png', 'webp'],
      output: ['jpg', 'png', 'webp']
    },
    supportedOperations: [
      'faceSwapWithUrls',
      'faceSwapWithBase64',
      'faceSwapProduct',
      'enhancedFaceSwap',
      'checkImageCompatibility'
    ],
    rateLimits: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      maxImageSize: '10MB',
      maxProcessingTime: '60s'
    },
    useCases: [
      'Remplacement de visage dans les photos',
      'Amélioration de produits e-commerce',
      'Création de contenu marketing',
      'Personnalisation d\'avatars',
      'Protection de la vie privée'
    ]
  };
}

// Export par défaut pour compatibilité
export default {
  faceSwapWithUrls,
  faceSwapWithBase64,
  faceSwapProduct,
  enhancedFaceSwap,
  checkImageCompatibility,
  getFaceSwapStats
}; 