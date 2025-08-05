import { NextRequest, NextResponse } from 'next/server';
import { performFaceSwap, checkImageCompatibility, enhanceProductImage } from '@/lib/ai/deepfake-faceswap';

export async function GET() {
  return NextResponse.json({
    name: 'Deepfake Face Swap API',
    description: 'API pour échange de visages ultra-réaliste avec IA avancée',
    version: '1.0.0',
    endpoints: [
      '/api/ai/deepfake-faceswap - POST: Face swap général',
      '/api/ai/deepfake-faceswap/check - POST: Vérification compatibilité',
      '/api/ai/deepfake-faceswap/enhance - POST: Amélioration produit'
    ],
    features: [
      'Échange de visages ultra-réaliste',
      'Préservation des expressions',
      'Qualité cinématographique',
      'Vérification de compatibilité',
      'Amélioration d\'images produits'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceImage, targetImage, options, action } = body;

    if (!sourceImage || !targetImage) {
      return NextResponse.json(
        { error: 'Les paramètres "sourceImage" et "targetImage" sont requis' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'check':
        result = await checkImageCompatibility(sourceImage);
        break;
      case 'enhance':
        result = await enhanceProductImage(sourceImage, body.productType || 'produit');
        break;
      default:
        result = await performFaceSwap({
          sourceImage,
          targetImage,
          options: options || {}
        });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Deepfake Face Swap API Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du face swap' },
      { status: 500 }
    );
  }
} 