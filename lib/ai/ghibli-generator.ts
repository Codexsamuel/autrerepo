import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration Ghibli API
const GHIBLI_CONFIG = {
  host: 'ghibli-image-generator-api-open-ai-4o-image-generation-free.p.rapidapi.com',
  baseURL: 'https://ghibli-image-generator-api-open-ai-4o-image-generation-free.p.rapidapi.com',
  key: RAPID_API_KEY
};

// Interfaces
export interface GhibliGenerateRequest {
  prompt: string;
  filesUrl?: string[];
  size?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  style_id?: number;
}

export interface GhibliQuickRequest {
  prompt: string;
  style_id?: number;
  size?: '1-1' | '16-9' | '9-16' | '4-3' | '3-4';
}

export interface GhibliResponse {
  success: boolean;
  taskId?: string;
  imageUrl?: string;
  status?: string;
  error?: string;
}

/**
 * 🎨 Générer une image style Studio Ghibli
 * @param prompt Description de l'image
 * @param filesUrl URLs des images sources (optionnel)
 * @param size Taille de l'image
 * @returns Réponse avec taskId ou imageUrl
 */
export async function generateGhibliImage(
  prompt: string,
  filesUrl?: string[],
  size: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' = '1:1'
): Promise<GhibliResponse> {
  try {
    console.log(`🎨 Ghibli: Génération d'image - "${prompt}"`);
    
    const requestData: GhibliGenerateRequest = {
      prompt,
      filesUrl,
      size
    };
    
    const response = await axios.post(
      `${GHIBLI_CONFIG.baseURL}/aaaaaaaaaaaaaaaaaiimagegenerator/ghibli/generate.php`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': GHIBLI_CONFIG.key,
          'X-RapidAPI-Host': GHIBLI_CONFIG.host,
        },
        timeout: 60000
      }
    );
    
    console.log(`✅ Ghibli: Image générée avec succès`);
    return {
      success: true,
      taskId: response.data.taskId,
      status: response.data.status
    };
    
  } catch (error: any) {
    console.error(`❌ Ghibli Generate: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * ⚡ Génération rapide style Ghibli
 * @param prompt Description de l'image
 * @param style_id ID du style (1-5)
 * @param size Taille de l'image
 * @returns Image générée directement
 */
export async function quickGhibliImage(
  prompt: string,
  style_id: number = 2,
  size: '1-1' | '16-9' | '9-16' | '4-3' | '3-4' = '1-1'
): Promise<GhibliResponse> {
  try {
    console.log(`⚡ Ghibli Quick: Génération rapide - "${prompt}"`);
    
    const requestData: GhibliQuickRequest = {
      prompt,
      style_id,
      size
    };
    
    const response = await axios.post(
      `${GHIBLI_CONFIG.baseURL}/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': GHIBLI_CONFIG.key,
          'X-RapidAPI-Host': GHIBLI_CONFIG.host,
        },
        timeout: 60000
      }
    );
    
    console.log(`✅ Ghibli Quick: Image générée directement`);
    return {
      success: true,
      imageUrl: response.data.imageUrl,
      status: 'completed'
    };
    
  } catch (error: any) {
    console.error(`❌ Ghibli Quick: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 📋 Vérifier le statut d'une génération
 * @param taskId ID de la tâche
 * @returns Statut et URL de l'image si terminée
 */
export async function checkGhibliStatus(taskId: string): Promise<GhibliResponse> {
  try {
    console.log(`📋 Ghibli: Vérification statut - ${taskId}`);
    
    const response = await axios.get(
      `${GHIBLI_CONFIG.baseURL}/aaaaaaaaaaaaaaaaaiimagegenerator/ghibli/get.php?taskId=${taskId}`,
      {
        headers: {
          'X-RapidAPI-Key': GHIBLI_CONFIG.key,
          'X-RapidAPI-Host': GHIBLI_CONFIG.host,
        },
        timeout: 30000
      }
    );
    
    const status = response.data.status;
    console.log(`📋 Ghibli: Statut - ${status}`);
    
    return {
      success: true,
      status,
      imageUrl: status === 'completed' ? response.data.imageUrl : undefined
    };
    
  } catch (error: any) {
    console.error(`❌ Ghibli Status: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🛍️ Générer une image produit style Ghibli
 * @param productName Nom du produit
 * @param category Catégorie du produit
 * @returns Image produit stylisée
 */
export async function generateProductGhibliImage(
  productName: string,
  category: string
): Promise<GhibliResponse> {
  const prompt = `Create a beautiful Studio Ghibli style illustration of a ${productName} in the ${category} category. The image should be whimsical, magical, and appealing for e-commerce. Soft colors, dreamy atmosphere, and high quality for product display.`;
  
  return await quickGhibliImage(prompt, 2, '1-1');
}

/**
 * 📊 Obtenir des statistiques sur l'API Ghibli
 */
export function getGhibliStats() {
  return {
    name: 'Studio Ghibli Image Generator API',
    description: 'Génération d\'images dans le style Studio Ghibli via RapidAPI',
    host: GHIBLI_CONFIG.host,
    features: [
      'Génération d\'images style Studio Ghibli',
      'Transformation d\'images existantes',
      'Génération rapide avec styles prédéfinis',
      'Support de multiples tailles d\'image',
      'Génération asynchrone avec suivi de statut'
    ],
    supportedSizes: {
      generate: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      quick: ['1-1', '16-9', '9-16', '4-3', '3-4']
    },
    supportedStyles: [
      { id: 1, name: 'Classic Ghibli' },
      { id: 2, name: 'Modern Ghibli' },
      { id: 3, name: 'Fantasy Ghibli' },
      { id: 4, name: 'Nature Ghibli' },
      { id: 5, name: 'Urban Ghibli' }
    ],
    useCases: [
      'Création d\'images produits stylisées',
      'Contenu marketing artistique',
      'Illustrations pour e-commerce',
      'Design de produits uniques',
      'Contenu social media créatif'
    ],
    rateLimits: {
      requestsPerMinute: 5,
      requestsPerHour: 50,
      maxImageSize: '10MB',
      maxProcessingTime: '120s'
    }
  };
}

// Export par défaut
export default {
  generateGhibliImage,
  quickGhibliImage,
  checkGhibliStatus,
  generateProductGhibliImage,
  getGhibliStats
}; 