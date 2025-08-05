import { generateContentWithAIQuery2, makeAIQuery2 } from '@/lib/ai/ai-query2';
import { quickGhibliImage } from '@/lib/ai/ghibli-generator';

export interface PresentationSlide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  slideType: 'title' | 'agenda' | 'problem' | 'solution' | 'features' | 'pricing' | 'testimonials' | 'cta';
  layout: 'title' | 'content' | 'image-text' | 'two-column' | 'stats';
}

export interface PresentationRequest {
  topic: string;
  audience: 'clients' | 'investisseurs' | 'partenaires' | 'équipe';
  tone: 'professionnel' | 'inspirant' | 'commercial' | 'technique';
  slidesCount: number;
  includeImages: boolean;
  companyInfo?: {
    name: string;
    logo?: string;
    industry: string;
    targetMarket: string;
  };
  customData?: any;
}

export interface PresentationResponse {
  success: boolean;
  data?: {
    presentation: {
      title: string;
      slides: PresentationSlide[];
      totalSlides: number;
      estimatedDuration: number;
      targetAudience: string;
      tone: string;
    };
    metadata: {
      generatedAt: string;
      processingTime: number;
      imagesGenerated: number;
      aiQueries: number;
    };
  };
  error?: string;
}

/**
 * 🎯 Générer une présentation commerciale complète
 */
export async function generateCommercialPresentation(
  request: PresentationRequest
): Promise<PresentationResponse> {
  const startTime = Date.now();
  
  try {
    console.log(`🎯 Génération présentation: "${request.topic}" pour ${request.audience}`);

    // 1. Générer la structure de la présentation
    const structure = await generatePresentationStructure(request);
    
    // 2. Générer le contenu pour chaque slide
    const slides = await generateSlidesContent(structure, request);
    
    // 3. Générer les images si demandé
    if (request.includeImages) {
      await generateSlidesImages(slides, request);
    }

    const processingTime = Date.now() - startTime;

    return {
      success: true,
      data: {
        presentation: {
          title: request.topic,
          slides,
          totalSlides: slides.length,
          estimatedDuration: slides.length * 2, // 2 minutes par slide
          targetAudience: request.audience,
          tone: request.tone
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          processingTime,
          imagesGenerated: slides.filter(s => s.imageUrl).length,
          aiQueries: slides.length + (request.includeImages ? slides.length : 0)
        }
      }
    };

  } catch (error: any) {
    console.error('❌ Erreur génération présentation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 📋 Générer la structure de la présentation
 */
async function generatePresentationStructure(request: PresentationRequest): Promise<string[]> {
  const prompt = `Crée une structure de présentation commerciale pour "${request.topic}" avec ${request.slidesCount} slides.
  
  Audience: ${request.audience}
  Ton: ${request.tone}
  Industrie: ${request.companyInfo?.industry || 'Technologie'}
  
  Génère uniquement les titres des slides, un par ligne, sans numérotation.`;

  const response = await makeAIQuery2({
    query: prompt,
    type: 'general',
    options: {
      language: 'fr',
      tone: 'professional',
      length: 'medium',
      format: 'text'
    }
  });
  
  if (!response.success || !response.data?.result) {
    throw new Error('Impossible de générer la structure de la présentation');
  }

  const slides = response.data.result
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .slice(0, request.slidesCount);

  return slides;
}

/**
 * 📝 Générer le contenu pour chaque slide
 */
async function generateSlidesContent(slideTitles: string[], request: PresentationRequest): Promise<PresentationSlide[]> {
  const slides: PresentationSlide[] = [];

  for (let i = 0; i < slideTitles.length; i++) {
    const title = slideTitles[i];
    const slideType = determineSlideType(title, i);
    const layout = determineSlideLayout(slideType);

    // Générer le contenu de la slide
    const contentPrompt = `Crée le contenu pour cette slide de présentation:
    
    Titre: ${title}
    Type: ${slideType}
    Audience: ${request.audience}
    Ton: ${request.tone}
    Entreprise: ${request.companyInfo?.name || 'DL Solutions'}
    
    Génère un contenu structuré et engageant pour cette slide.`;

    const contentResponse = await generateContentWithAIQuery2(contentPrompt, 'text');
    
    const slide: PresentationSlide = {
      id: `slide-${i + 1}`,
      title,
      content: contentResponse || 'Contenu à personnaliser',
      slideType,
      layout
    };

    slides.push(slide);
  }

  return slides;
}

/**
 * 🎨 Générer les images pour les slides
 */
async function generateSlidesImages(slides: PresentationSlide[], request: PresentationRequest): Promise<void> {
  for (const slide of slides) {
    if (slide.slideType === 'title' || slide.slideType === 'cta') {
      continue; // Pas d'image pour ces slides
    }

    try {
      const imagePrompt = generateImagePrompt(slide, request);
      const imageResponse = await quickGhibliImage(imagePrompt, 2, '16-9');
      
      if (imageResponse.success && imageResponse.imageUrl) {
        slide.imageUrl = imageResponse.imageUrl;
      }
    } catch (error) {
      console.log(`⚠️ Impossible de générer l'image pour la slide: ${slide.title}`);
    }
  }
}

/**
 * 🎯 Déterminer le type de slide
 */
function determineSlideType(title: string, index: number): PresentationSlide['slideType'] {
  const titleLower = title.toLowerCase();
  
  if (index === 0) return 'title';
  if (titleLower.includes('agenda') || titleLower.includes('plan')) return 'agenda';
  if (titleLower.includes('problème') || titleLower.includes('défi')) return 'problem';
  if (titleLower.includes('solution') || titleLower.includes('résultat')) return 'solution';
  if (titleLower.includes('fonctionnalité') || titleLower.includes('avantage')) return 'features';
  if (titleLower.includes('prix') || titleLower.includes('tarif')) return 'pricing';
  if (titleLower.includes('témoignage') || titleLower.includes('client')) return 'testimonials';
  if (titleLower.includes('contact') || titleLower.includes('action')) return 'cta';
  
  return 'features';
}

/**
 * 📐 Déterminer la mise en page de la slide
 */
function determineSlideLayout(slideType: PresentationSlide['slideType']): PresentationSlide['layout'] {
  switch (slideType) {
    case 'title':
      return 'title';
    case 'agenda':
      return 'content';
    case 'problem':
    case 'solution':
      return 'image-text';
    case 'features':
      return 'two-column';
    case 'pricing':
    case 'testimonials':
      return 'stats';
    case 'cta':
      return 'title';
    default:
      return 'content';
  }
}

/**
 * 🎨 Générer le prompt pour l'image
 */
function generateImagePrompt(slide: PresentationSlide, request: PresentationRequest): string {
  const basePrompt = `Création d'une image professionnelle pour une présentation commerciale sur ${request.topic}`;
  
  switch (slide.slideType) {
    case 'problem':
      return `${basePrompt}, illustrant un problème ou défi dans l'industrie ${request.companyInfo?.industry || 'technologique'}, style professionnel et moderne`;
    case 'solution':
      return `${basePrompt}, montrant une solution innovante et technologique, style futuriste et professionnel`;
    case 'features':
      return `${basePrompt}, illustrant les fonctionnalités et avantages de ${request.companyInfo?.name || 'DL Solutions'}, style moderne et épuré`;
    case 'pricing':
      return `${basePrompt}, représentant la valeur et les bénéfices, style commercial et attractif`;
    case 'testimonials':
      return `${basePrompt}, illustrant la satisfaction client et la confiance, style chaleureux et professionnel`;
    default:
      return `${basePrompt}, style professionnel et moderne pour ${slide.title}`;
  }
}

/**
 * 📊 Générer des statistiques pour les slides
 */
export async function generatePresentationStats(data: any): Promise<{
  totalSlides: number;
  estimatedDuration: number;
  complexity: 'simple' | 'medium' | 'complex';
  targetAudience: string;
  recommendedActions: string[];
}> {
  const totalSlides = data.slides?.length || 0;
  const estimatedDuration = totalSlides * 2;
  
  let complexity: 'simple' | 'medium' | 'complex' = 'medium';
  if (totalSlides <= 5) complexity = 'simple';
  if (totalSlides >= 10) complexity = 'complex';

  const recommendedActions = [
    'Personnaliser les données avec vos chiffres réels',
    'Ajouter votre logo et couleurs corporate',
    'Inclure des témoignages clients authentiques',
    'Préparer des exemples concrets pour chaque slide'
  ];

  return {
    totalSlides,
    estimatedDuration,
    complexity,
    targetAudience: data.audience || 'Général',
    recommendedActions
  };
}

/**
 * 📈 Obtenir les statistiques du générateur
 */
export function getPresentationGeneratorStats() {
  return {
    name: 'Générateur de Présentation Commerciale NovaIA',
    description: 'Création automatique de présentations commerciales professionnelles avec IA',
    capabilities: [
      'Génération de structure automatique',
      'Contenu IA personnalisé',
      'Images générées automatiquement',
      'Mise en page professionnelle',
      'Export PowerPoint',
      'Templates multiples'
    ],
    slideTypes: ['title', 'agenda', 'problem', 'solution', 'features', 'pricing', 'testimonials', 'cta'],
    layouts: ['title', 'content', 'image-text', 'two-column', 'stats'],
    audiences: ['clients', 'investisseurs', 'partenaires', 'équipe'],
    tones: ['professionnel', 'inspirant', 'commercial', 'technique'],
    pricing: {
      perPresentation: 15,
      currency: 'EUR'
    }
  };
}

export default {
  generateCommercialPresentation,
  generatePresentationStats,
  getPresentationGeneratorStats
}; 