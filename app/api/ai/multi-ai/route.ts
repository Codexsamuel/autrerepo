import { MultiAIService } from '@/lib/ai/multi-ai-service';
import { NextRequest, NextResponse } from 'next/server';

const multiAIService = new MultiAIService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      modelId = 'gpt-4',
      darkMode = false,
      darkLevel = 'basic',
      customContext,
      maxTokens,
      temperature
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt requis' },
        { status: 400 }
      );
    }

    // Validation du modèle
    const availableModels = multiAIService.getAvailableModels();
    const modelExists = availableModels.some(model => model.id === modelId);
    
    if (!modelExists) {
      return NextResponse.json(
        { 
          error: `Modèle ${modelId} non trouvé`,
          availableModels: availableModels.map(m => ({ id: m.id, name: m.name, provider: m.provider }))
        },
        { status: 400 }
      );
    }

    // Générer la réponse
    const response = await multiAIService.generateResponse(prompt, modelId, {
      darkMode,
      darkLevel,
      customContext,
      maxTokens,
      temperature
    });

    return NextResponse.json({
      success: true,
      data: response,
      metadata: {
        model: response.model,
        provider: response.provider,
        isDarkMode: response.isDarkMode,
        confidence: response.confidence,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur Multi-AI API:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération de réponse',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'models':
        const models = multiAIService.getAvailableModels();
        return NextResponse.json({
          success: true,
          data: models
        });

      case 'dark-mode-status':
        const darkModeStatus = multiAIService.getDarkModeStatus();
        return NextResponse.json({
          success: true,
          data: darkModeStatus
        });

      case 'capabilities':
        const modelId = searchParams.get('modelId');
        if (!modelId) {
          return NextResponse.json(
            { error: 'modelId requis pour les capacités' },
            { status: 400 }
          );
        }
        const capabilities = await multiAIService.getModelCapabilities(modelId);
        return NextResponse.json({
          success: true,
          data: capabilities
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            availableActions: ['models', 'dark-mode-status', 'capabilities'],
            description: 'API Multi-AI pour différents modèles IA'
          }
        });
    }
  } catch (error) {
    console.error('Erreur Multi-AI API GET:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des informations',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, level } = body;

    switch (action) {
      case 'activate-dark-mode':
        await multiAIService.switchToDarkMode(level || 'basic');
        return NextResponse.json({
          success: true,
          message: `Mode Dark ${level || 'basic'} activé`,
          data: multiAIService.getDarkModeStatus()
        });

      case 'deactivate-dark-mode':
        await multiAIService.switchToNormalMode();
        return NextResponse.json({
          success: true,
          message: 'Mode Dark désactivé',
          data: multiAIService.getDarkModeStatus()
        });

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur Multi-AI API PUT:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la modification du mode',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 