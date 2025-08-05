import { NextRequest, NextResponse } from 'next/server';
import { 
  generateCommercialPresentation, 
  generatePresentationStats,
  getPresentationGeneratorStats 
} from '@/lib/services/presentation-generator';

/**
 * 🎯 API Générateur de Présentation Commerciale NovaIA
 * 
 * GET /api/presentation/generate?action=stats
 * POST /api/presentation/generate
 * 
 * Actions POST:
 * - generate: Générer une présentation complète
 * - stats: Analyser une présentation existante
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: getPresentationGeneratorStats(),
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'API Générateur de Présentation Commerciale NovaIA',
      availableActions: ['generate', 'stats'],
      example: {
        generate: `POST /api/presentation/generate - {
          "topic": "DL Solutions - Plateforme IA Avancée",
          "audience": "investisseurs",
          "tone": "professionnel",
          "slidesCount": 8,
          "includeImages": true,
          "companyInfo": {
            "name": "DL Solutions",
            "industry": "Intelligence Artificielle",
            "targetMarket": "Entreprises et startups"
          }
        }`
      },
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

    console.log(`🎯 Générateur Présentation: Action "${action}"`);

    let result: any;

    switch (action) {
      case 'generate':
        const {
          topic,
          audience = 'clients',
          tone = 'professionnel',
          slidesCount = 8,
          includeImages = true,
          companyInfo,
          customData
        } = params;

        if (!topic) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "topic" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        result = await generateCommercialPresentation({
          topic,
          audience,
          tone,
          slidesCount: Math.min(Math.max(slidesCount, 3), 15), // Entre 3 et 15 slides
          includeImages,
          companyInfo,
          customData
        });
        break;

      case 'stats':
        if (!params.presentation) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "presentation" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        result = await generatePresentationStats(params.presentation);
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: ['generate', 'stats'],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      data: result.data,
      error: result.error,
      action,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API Générateur Présentation:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la génération',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 