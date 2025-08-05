import { NextRequest, NextResponse } from 'next/server';
import {
  generateChatGPT42Response,
  chatWithChatGPT42,
  generateContentWithChatGPT42,
  analyzeTextWithChatGPT42,
  generateSuggestionsWithChatGPT42,
  getChatGPT42Stats,
  ChatGPT42Request
} from '@/lib/ai/chatgpt-42';

/**
 * 🤖 API ChatGPT-42 - Endpoint principal
 * 
 * GET /api/ai/chatgpt-42?action=stats
 * POST /api/ai/chatgpt-42
 * 
 * Body POST:
 * {
 *   "action": "chat" | "content" | "analyze" | "suggestions",
 *   "message": "Votre message",
 *   "systemPrompt": "Prompt système (optionnel)",
 *   "contentType": "article" | "email" | "social" | "code" | "creative",
 *   "analysisType": "sentiment" | "summary" | "keywords" | "tone" | "complexity",
 *   "suggestionType": "ideas" | "titles" | "topics" | "solutions" | "improvements",
 *   "count": 5,
 *   "model": "gpt-4",
 *   "temperature": 0.7,
 *   "max_tokens": 1000
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Retourner les statistiques de l'API
    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: getChatGPT42Stats(),
        timestamp: new Date().toISOString()
      });
    }

    // Action par défaut : statistiques
    return NextResponse.json({
      success: true,
      data: getChatGPT42Stats(),
      message: 'Utilisez POST pour les requêtes de génération',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API ChatGPT-42 GET:', error);
    
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
    const {
      action = 'chat',
      message,
      systemPrompt,
      contentType = 'creative',
      analysisType = 'summary',
      suggestionType = 'ideas',
      count = 5,
      model = 'gpt-4',
      temperature = 0.7,
      max_tokens = 1000,
      messages,
      ...otherOptions
    } = body;

    // Validation du message
    if (!message && !messages && action !== 'suggestions') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Paramètre "message" ou "messages" requis',
          example: {
            action: 'chat',
            message: 'Bonjour, comment allez-vous ?',
            model: 'gpt-4',
            temperature: 0.7
          },
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    console.log(`🤖 ChatGPT-42 API: Action "${action}"`);

    let result: any;

    switch (action) {
      case 'chat':
        // Conversation simple
        result = await chatWithChatGPT42(message, systemPrompt, {
          model,
          temperature,
          max_tokens
        });
        break;

      case 'generate':
        // Génération avec messages complets
        if (!messages) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "messages" requis pour l\'action "generate"',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await generateChatGPT42Response(messages, {
          model,
          temperature,
          max_tokens,
          ...otherOptions
        });
        break;

      case 'content':
        // Génération de contenu spécialisé
        result = await generateContentWithChatGPT42(message, contentType, {
          model,
          temperature,
          max_tokens
        });
        break;

      case 'analyze':
        // Analyse de texte
        result = await analyzeTextWithChatGPT42(message, analysisType, {
          model,
          temperature,
          max_tokens
        });
        break;

      case 'suggestions':
        // Génération de suggestions
        const context = message || body.context || '';
        if (!context) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "message" ou "context" requis pour l\'action "suggestions"',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        result = await generateSuggestionsWithChatGPT42(context, suggestionType, count, {
          model,
          temperature,
          max_tokens
        });
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: ['chat', 'generate', 'content', 'analyze', 'suggestions'],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      action,
      model,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API ChatGPT-42 POST:', error);
    
    const status = error?.response?.status || 500;
    const errorMessage = error?.response?.data?.error?.message || error.message || 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la génération',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}

/**
 * OPTIONS pour CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 