import {
    analyzeDataWithAIQuery2,
    generateContentWithAIQuery2,
    getAIQuery2Stats,
    intelligentSearchWithAIQuery2,
    makeAIQuery2
} from '@/lib/ai/ai-query2';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 🤖 API AI Query 2 - Requêtes IA avancées
 * 
 * GET /api/ai/ai-query2?action=stats
 * POST /api/ai/ai-query2
 * 
 * Actions POST:
 * - query: Requête IA simple
 * - analyze: Analyse de données
 * - generate: Génération de contenu
 * - search: Recherche intelligente
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: getAIQuery2Stats(),
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'API AI Query 2 - Requêtes IA avancées',
      availableActions: ['query', 'analyze', 'generate', 'search'],
      example: {
        query: 'POST /api/ai/ai-query2 - {"action": "query", "query": "Explique-moi l\'IA"}',
        analyze: 'POST /api/ai/ai-query2 - {"action": "analyze", "data": {...}, "type": "trends"}',
        generate: 'POST /api/ai/ai-query2 - {"action": "generate", "prompt": "...", "type": "article"}',
        search: 'POST /api/ai/ai-query2 - {"action": "search", "query": "...", "context": "..."}'
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
    const { action, query, context, options, data, analysisType, prompt, contentType, searchQuery, searchContext } = body;

    console.log(`🤖 AI Query 2: Action "${action}"`);

    let result: any;

    switch (action) {
      case 'query':
        if (!query) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "query" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await makeAIQuery2(query, context, options);
        break;

      case 'analyze':
        if (!data || !analysisType) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètres "data" et "analysisType" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await analyzeDataWithAIQuery2(data, analysisType);
        break;

      case 'generate':
        if (!prompt || !contentType) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètres "prompt" et "contentType" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await generateContentWithAIQuery2(prompt, contentType);
        break;

      case 'search':
        if (!searchQuery) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "searchQuery" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await intelligentSearchWithAIQuery2(searchQuery, searchContext);
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: ['query', 'analyze', 'generate', 'search'],
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
    console.error('❌ Erreur API AI Query 2:', error);
    
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