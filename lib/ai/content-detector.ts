import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration Content Detector API
const CONTENT_DETECTOR_CONFIG = {
  host: 'ai-content-detector-ai-gpt.p.rapidapi.com',
  baseURL: 'https://ai-content-detector-ai-gpt.p.rapidapi.com',
  key: RAPID_API_KEY
};

// Interfaces
export interface ContentDetectionRequest {
  text: string;
}

export interface ContentDetectionResponse {
  success: boolean;
  isAI?: boolean;
  aiProbability?: number;
  humanProbability?: number;
  confidence?: number;
  details?: {
    model?: string;
    tokens?: number;
    analysis?: string;
  };
  error?: string;
}

export interface ContentAnalysisResult {
  text: string;
  aiScore: number;
  humanScore: number;
  confidence: number;
  recommendation: 'human' | 'ai' | 'mixed' | 'uncertain';
  details: string;
}

/**
 * 🔍 Détecter si un texte a été généré par IA
 * @param text Texte à analyser
 * @returns Résultat de l'analyse
 */
export async function detectAIContent(text: string): Promise<ContentDetectionResponse> {
  try {
    console.log(`🔍 Content Detector: Analyse de texte (${text.length} caractères)`);
    
    const requestData: ContentDetectionRequest = {
      text
    };
    
    const response = await axios.post(
      `${CONTENT_DETECTOR_CONFIG.baseURL}/api/detectText/`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': CONTENT_DETECTOR_CONFIG.key,
          'X-RapidAPI-Host': CONTENT_DETECTOR_CONFIG.host,
        },
        timeout: 30000
      }
    );
    
    const data = response.data;
    console.log(`✅ Content Detector: Analyse terminée`);
    
    return {
      success: true,
      isAI: data.isAI || false,
      aiProbability: data.aiProbability || 0,
      humanProbability: data.humanProbability || 0,
      confidence: data.confidence || 0,
      details: {
        model: data.model,
        tokens: data.tokens,
        analysis: data.analysis
      }
    };
    
  } catch (error: any) {
    console.error(`❌ Content Detector: Erreur`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 📊 Analyser un contenu et fournir des recommandations
 * @param text Texte à analyser
 * @returns Analyse détaillée avec recommandations
 */
export async function analyzeContent(text: string): Promise<ContentAnalysisResult> {
  const detection = await detectAIContent(text);
  
  if (!detection.success) {
    return {
      text,
      aiScore: 0,
      humanScore: 0,
      confidence: 0,
      recommendation: 'uncertain',
      details: 'Erreur lors de l\'analyse'
    };
  }
  
  const aiScore = detection.aiProbability || 0;
  const humanScore = detection.humanProbability || 0;
  const confidence = detection.confidence || 0;
  
  let recommendation: 'human' | 'ai' | 'mixed' | 'uncertain';
  let details: string;
  
  if (confidence < 0.5) {
    recommendation = 'uncertain';
    details = 'Confiance insuffisante pour déterminer l\'origine';
  } else if (aiScore > 0.8) {
    recommendation = 'ai';
    details = 'Contenu très probablement généré par IA';
  } else if (humanScore > 0.8) {
    recommendation = 'human';
    details = 'Contenu très probablement écrit par un humain';
  } else {
    recommendation = 'mixed';
    details = 'Contenu mixte ou modifié';
  }
  
  return {
    text,
    aiScore,
    humanScore,
    confidence,
    recommendation,
    details
  };
}

/**
 * 🛡️ Valider le contenu pour l'e-commerce
 * @param productDescription Description du produit
 * @param productTitle Titre du produit
 * @returns Validation du contenu
 */
export async function validateEcommerceContent(
  productDescription: string,
  productTitle: string
): Promise<{
  isValid: boolean;
  issues: string[];
  recommendations: string[];
  overallScore: number;
}> {
  const titleAnalysis = await analyzeContent(productTitle);
  const descriptionAnalysis = await analyzeContent(productDescription);
  
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Vérifier le titre
  if (titleAnalysis.recommendation === 'ai' && titleAnalysis.confidence > 0.7) {
    issues.push('Titre probablement généré par IA');
    recommendations.push('Réécrire le titre de manière plus naturelle');
  }
  
  // Vérifier la description
  if (descriptionAnalysis.recommendation === 'ai' && descriptionAnalysis.confidence > 0.7) {
    issues.push('Description probablement générée par IA');
    recommendations.push('Personnaliser la description avec des détails spécifiques');
  }
  
  // Calculer le score global
  const titleScore = titleAnalysis.recommendation === 'human' ? 1 : 0.5;
  const descriptionScore = descriptionAnalysis.recommendation === 'human' ? 1 : 0.5;
  const overallScore = (titleScore + descriptionScore) / 2;
  
  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
    overallScore
  };
}

/**
 * 📝 Analyser des avis clients
 * @param reviews Liste d'avis
 * @returns Analyse des avis
 */
export async function analyzeCustomerReviews(reviews: string[]): Promise<{
  totalReviews: number;
  aiGeneratedCount: number;
  humanWrittenCount: number;
  suspiciousReviews: string[];
  recommendations: string[];
}> {
  const analyses = await Promise.all(reviews.map(review => analyzeContent(review)));
  
  const aiGeneratedCount = analyses.filter(a => a.recommendation === 'ai').length;
  const humanWrittenCount = analyses.filter(a => a.recommendation === 'human').length;
  const suspiciousReviews = analyses
    .filter(a => a.recommendation === 'ai' && a.confidence > 0.8)
    .map(a => a.text);
  
  const recommendations: string[] = [];
  const aiPercentage = (aiGeneratedCount / reviews.length) * 100;
  
  if (aiPercentage > 30) {
    recommendations.push('Trop d\'avis semblent générés par IA - vérifier l\'authenticité');
  }
  
  if (suspiciousReviews.length > 0) {
    recommendations.push(`${suspiciousReviews.length} avis suspects détectés`);
  }
  
  return {
    totalReviews: reviews.length,
    aiGeneratedCount,
    humanWrittenCount,
    suspiciousReviews,
    recommendations
  };
}

/**
 * 📊 Obtenir des statistiques sur l'API Content Detector
 */
export function getContentDetectorStats() {
  return {
    name: 'AI Content Detector API',
    description: 'Détection de contenu généré par IA via RapidAPI',
    host: CONTENT_DETECTOR_CONFIG.host,
    features: [
      'Détection de contenu généré par IA',
      'Analyse de probabilité humaine vs IA',
      'Validation de contenu e-commerce',
      'Analyse d\'avis clients',
      'Recommandations d\'amélioration'
    ],
    supportedContentTypes: [
      'Descriptions de produits',
      'Avis clients',
      'Contenu marketing',
      'Articles de blog',
      'Textes généraux'
    ],
    accuracy: {
      aiDetection: '95%',
      humanDetection: '92%',
      confidenceThreshold: '0.7'
    },
    useCases: [
      'Validation de contenu e-commerce',
      'Modération d\'avis clients',
      'Qualité de contenu marketing',
      'Détection de spam IA',
      'Amélioration de contenu'
    ],
    rateLimits: {
      requestsPerMinute: 10,
      requestsPerHour: 100,
      maxTextLength: '5000 caractères',
      processingTime: '2-5 secondes'
    }
  };
}

// Export par défaut
export default {
  detectAIContent,
  analyzeContent,
  validateEcommerceContent,
  analyzeCustomerReviews,
  getContentDetectorStats
}; 