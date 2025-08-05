import { NextRequest, NextResponse } from 'next/server';
import { generateGhibliImage, quickGhibliImage, checkGhibliStatus, getGhibliStats } from '@/lib/ai/ghibli-generator';
import { detectAIContent, analyzeContent, validateEcommerceContent, getContentDetectorStats } from '@/lib/ai/content-detector';
import { faceSwapWithUrls, getFaceSwapStats } from '@/lib/ai/faceswap-api';

/**
 * 🚀 API IA Avancée - Endpoint unifié pour toutes les fonctionnalités IA
 * 
 * GET /api/ai/advanced?action=stats
 * POST /api/ai/advanced
 * 
 * Actions supportées:
 * - ghibli-generate: Génération d'image style Ghibli
 * - ghibli-quick: Génération rapide Ghibli
 * - ghibli-status: Vérifier statut génération
 * - content-detect: Détection de contenu IA
 * - content-analyze: Analyse détaillée de contenu
 * - content-validate: Validation contenu e-commerce
 * - faceswap: Face swap d'images
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: {
          ghibli: getGhibliStats(),
          contentDetector: getContentDetectorStats(),
          faceSwap: getFaceSwapStats(),
          timestamp: new Date().toISOString()
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'API IA Avancée - Utilisez POST pour les actions',
      availableActions: [
        'ghibli-generate',
        'ghibli-quick', 
        'ghibli-status',
        'content-detect',
        'content-analyze',
        'content-validate',
        'faceswap'
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    console.log(`🚀 IA Avancée: Action "${action}"`);

    let result: any;

    switch (action) {
      case 'ghibli-generate':
        // Génération d'image style Ghibli
        result = await generateGhibliImage(
          params.prompt,
          params.filesUrl,
          params.size || '1:1'
        );
        break;

      case 'ghibli-quick':
        // Génération rapide Ghibli
        result = await quickGhibliImage(
          params.prompt,
          params.style_id || 2,
          params.size || '1-1'
        );
        break;

      case 'ghibli-status':
        // Vérifier statut génération
        if (!params.taskId) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "taskId" requis pour ghibli-status',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await checkGhibliStatus(params.taskId);
        break;

      case 'content-detect':
        // Détection de contenu IA
        if (!params.text) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "text" requis pour content-detect',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await detectAIContent(params.text);
        break;

      case 'content-analyze':
        // Analyse détaillée de contenu
        if (!params.text) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "text" requis pour content-analyze',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await analyzeContent(params.text);
        break;

      case 'content-validate':
        // Validation contenu e-commerce
        if (!params.productDescription || !params.productTitle) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètres "productDescription" et "productTitle" requis pour content-validate',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await validateEcommerceContent(params.productDescription, params.productTitle);
        break;

      case 'faceswap':
        // Face swap d'images
        if (!params.sourceImageUrl || !params.targetImageUrl) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètres "sourceImageUrl" et "targetImageUrl" requis pour faceswap',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await faceSwapWithUrls(
          params.sourceImageUrl,
          params.targetImageUrl,
          {
            enhancement_level: params.enhancement_level || 1,
            preserve_expression: params.preserve_expression !== false,
            preserve_lighting: params.preserve_lighting !== false,
            output_format: params.output_format || 'jpg',
            quality: params.quality || 90
          }
        );
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: [
              'ghibli-generate',
              'ghibli-quick',
              'ghibli-status',
              'content-detect',
              'content-analyze',
              'content-validate',
              'faceswap'
            ],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      data: result,
      action,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API IA Avancée:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors du traitement',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 