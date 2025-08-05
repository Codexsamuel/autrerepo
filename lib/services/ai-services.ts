import { chatWithChatGPT42 } from '@/lib/ai/chatgpt-42';
import { faceSwapWithUrls, enhancedFaceSwap } from '@/lib/ai/faceswap-api';
import { quickGhibliImage, generateProductGhibliImage } from '@/lib/ai/ghibli-generator';
import { validateEcommerceContent, analyzeCustomerReviews } from '@/lib/ai/content-detector';
import { scrapeAllSources } from '@/lib/scraperMaster';

// Interfaces pour les services IA
export interface AIService {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'image' | 'analysis' | 'scraping' | 'transformation';
  price: number; // Prix en EUR
  credits: number; // Crédits nécessaires
  features: string[];
  apiEndpoint: string;
  status: 'active' | 'beta' | 'premium';
}

export interface ServiceRequest {
  serviceId: string;
  userId: string;
  parameters: any;
  priority: 'low' | 'normal' | 'high';
}

export interface ServiceResponse {
  success: boolean;
  data?: any;
  serviceUsed: string;
  creditsConsumed: number;
  processingTime: number;
  error?: string;
}

// Catalogue des services IA disponibles
export const AI_SERVICES: AIService[] = [
  // Services de contenu
  {
    id: 'content-generation',
    name: 'Génération de Contenu IA',
    description: 'Génération automatique de descriptions produits, articles, et contenu marketing',
    category: 'content',
    price: 15,
    credits: 10,
    features: [
      'Descriptions produits optimisées SEO',
      'Articles de blog automatiques',
      'Contenu marketing personnalisé',
      'Traduction automatique multi-langues',
      'Suggestions de mots-clés'
    ],
    apiEndpoint: '/api/ai/chatgpt-42',
    status: 'active'
  },
  {
    id: 'content-validation',
    name: 'Validation de Contenu E-commerce',
    description: 'Détection de contenu généré par IA et validation de qualité',
    category: 'analysis',
    price: 8,
    credits: 5,
    features: [
      'Détection de contenu IA avec 95% de précision',
      'Validation de descriptions produits',
      'Analyse d\'avis clients',
      'Recommandations d\'amélioration',
      'Rapport de qualité détaillé'
    ],
    apiEndpoint: '/api/ai/advanced',
    status: 'active'
  },

  // Services d'images
  {
    id: 'ghibli-artwork',
    name: 'Génération d\'Art Style Ghibli',
    description: 'Création d\'images artistiques uniques style Studio Ghibli',
    category: 'image',
    price: 25,
    credits: 15,
    features: [
      '5 styles Ghibli différents',
      'Images produits stylisées',
      'Génération rapide et asynchrone',
      'Formats multiples (1:1, 16:9, etc.)',
      'Qualité haute définition'
    ],
    apiEndpoint: '/api/ai/advanced',
    status: 'premium'
  },
  {
    id: 'faceswap-pro',
    name: 'Face Swap Professionnel',
    description: 'Remplacement de visage et amélioration d\'images pour e-commerce',
    category: 'transformation',
    price: 20,
    credits: 12,
    features: [
      'Remplacement de visage réaliste',
      'Amélioration automatique d\'images',
      'Préservation d\'expression et d\'éclairage',
      'Qualité configurable',
      'Support base64 et URLs'
    ],
    apiEndpoint: '/api/ai/faceswap',
    status: 'active'
  },

  // Services d'analyse
  {
    id: 'market-analysis',
    name: 'Analyse de Marché IA',
    description: 'Analyse intelligente des tendances et opportunités de marché',
    category: 'analysis',
    price: 30,
    credits: 20,
    features: [
      'Analyse de sentiment des avis',
      'Détection de tendances produits',
      'Recommandations de prix',
      'Analyse de concurrence',
      'Rapports détaillés'
    ],
    apiEndpoint: '/api/ai/chatgpt-42',
    status: 'premium'
  },

  // Services de scraping
  {
    id: 'multi-source-scraping',
    name: 'Scraping Multi-Sources Premium',
    description: 'Récupération de données depuis 5 sources e-commerce avec fallback intelligent',
    category: 'scraping',
    price: 18,
    credits: 10,
    features: [
      '5 sources e-commerce (AliExpress, eBay, 1688, etc.)',
      'Fallback automatique en cas d\'erreur',
      'Calcul automatique de marges',
      'Normalisation des données',
      'Données 100% réelles'
    ],
    apiEndpoint: '/api/scrape-production',
    status: 'active'
  },
  {
    id: 'product-enrichment',
    name: 'Enrichissement de Produits IA',
    description: 'Amélioration automatique des fiches produits avec IA',
    category: 'content',
    price: 12,
    credits: 8,
    features: [
      'Génération de descriptions optimisées',
      'Suggestions de catégories',
      'Extraction de caractéristiques',
      'Optimisation SEO automatique',
      'Traduction automatique'
    ],
    apiEndpoint: '/api/ai/advanced',
    status: 'active'
  }
];

/**
 * 🚀 Exécuter un service IA
 * @param serviceId ID du service à exécuter
 * @param parameters Paramètres du service
 * @returns Résultat du service
 */
export async function executeAIService(
  serviceId: string,
  parameters: any
): Promise<ServiceResponse> {
  const startTime = Date.now();
  const service = AI_SERVICES.find(s => s.id === serviceId);
  
  if (!service) {
    return {
      success: false,
      serviceUsed: 'unknown',
      creditsConsumed: 0,
      processingTime: Date.now() - startTime,
      error: 'Service non trouvé'
    };
  }

  try {
    console.log(`🚀 Exécution service: ${service.name}`);
    
    let result: any;
    
    switch (serviceId) {
      case 'content-generation':
        result = await chatWithChatGPT42(
          parameters.prompt,
          parameters.systemPrompt || 'Tu es un expert en création de contenu e-commerce',
          parameters.options || {}
        );
        break;

      case 'content-validation':
        if (parameters.type === 'ecommerce') {
          result = await validateEcommerceContent(
            parameters.productDescription,
            parameters.productTitle
          );
        } else {
          result = await analyzeCustomerReviews(parameters.reviews || []);
        }
        break;

      case 'ghibli-artwork':
        if (parameters.type === 'product') {
          result = await generateProductGhibliImage(
            parameters.productName,
            parameters.category
          );
        } else {
          result = await quickGhibliImage(
            parameters.prompt,
            parameters.style_id || 2,
            parameters.size || '1-1'
          );
        }
        break;

      case 'faceswap-pro':
        if (parameters.enhanced) {
          result = await enhancedFaceSwap(
            parameters.sourceImageUrl,
            parameters.targetImageUrl,
            parameters.enhancementLevel || 3
          );
        } else {
          result = await faceSwapWithUrls(
            parameters.sourceImageUrl,
            parameters.targetImageUrl,
            parameters.options || {}
          );
        }
        break;

      case 'market-analysis':
        result = await chatWithChatGPT42(
          parameters.analysisPrompt,
          'Tu es un expert en analyse de marché e-commerce. Fournis des insights détaillés et des recommandations concrètes.',
          { model: 'gpt-4', max_tokens: 1000 }
        );
        break;

      case 'multi-source-scraping':
        result = await scrapeAllSources(
          parameters.keyword,
          parameters.limit || 20,
          parameters.sources || []
        );
        break;

      case 'product-enrichment':
        const enrichmentPrompt = `Enrichis cette fiche produit pour l'e-commerce:
          Titre: ${parameters.title}
          Description: ${parameters.description}
          Catégorie: ${parameters.category}
          
          Génère:
          1. Une description optimisée SEO
          2. Des caractéristiques techniques
          3. Des mots-clés pertinents
          4. Des suggestions de prix
          5. Des recommandations marketing`;
        
        result = await chatWithChatGPT42(
          enrichmentPrompt,
          'Tu es un expert en optimisation e-commerce',
          { model: 'gpt-4' }
        );
        break;

      default:
        throw new Error(`Service ${serviceId} non implémenté`);
    }

    const processingTime = Date.now() - startTime;
    
    console.log(`✅ Service ${service.name} exécuté avec succès (${processingTime}ms)`);
    
    return {
      success: true,
      data: result,
      serviceUsed: service.name,
      creditsConsumed: service.credits,
      processingTime
    };

  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    
    console.error(`❌ Erreur service ${service.name}:`, error.message);
    
    return {
      success: false,
      serviceUsed: service.name,
      creditsConsumed: 0,
      processingTime,
      error: error.message
    };
  }
}

/**
 * 📊 Obtenir les statistiques des services
 */
export function getServicesStats() {
  const totalServices = AI_SERVICES.length;
  const activeServices = AI_SERVICES.filter(s => s.status === 'active').length;
  const premiumServices = AI_SERVICES.filter(s => s.status === 'premium').length;
  const totalRevenue = AI_SERVICES.reduce((sum, service) => sum + service.price, 0);
  
  const categories = AI_SERVICES.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalServices,
    activeServices,
    premiumServices,
    totalRevenue,
    categories,
    services: AI_SERVICES.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category,
      price: s.price,
      status: s.status
    }))
  };
}

/**
 * 💰 Calculer le prix d'un service
 * @param serviceId ID du service
 * @param quantity Quantité (pour les services en lot)
 * @returns Prix calculé
 */
export function calculateServicePrice(serviceId: string, quantity: number = 1): number {
  const service = AI_SERVICES.find(s => s.id === serviceId);
  if (!service) return 0;
  
  // Prix de base
  let price = service.price;
  
  // Réduction pour les lots
  if (quantity >= 10) {
    price *= 0.8; // 20% de réduction
  } else if (quantity >= 5) {
    price *= 0.9; // 10% de réduction
  }
  
  return Math.round(price * quantity * 100) / 100;
}

/**
 * 🎯 Recommander des services selon le besoin
 * @param need Description du besoin
 * @returns Services recommandés
 */
export function recommendServices(need: string): AIService[] {
  const keywords = need.toLowerCase().split(' ');
  
  return AI_SERVICES.filter(service => {
    const serviceText = `${service.name} ${service.description} ${service.features.join(' ')}`.toLowerCase();
    return keywords.some(keyword => serviceText.includes(keyword));
  }).sort((a, b) => b.price - a.price); // Tri par prix décroissant
}

// Export par défaut
export default {
  AI_SERVICES,
  executeAIService,
  getServicesStats,
  calculateServicePrice,
  recommendServices
}; 