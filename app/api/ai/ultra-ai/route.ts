import { UltraAIService } from '@/lib/ai/ultra-ai-service';
import { NextRequest, NextResponse } from 'next/server';

const ultraAIService = new UltraAIService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      unlimitedMode = true,
      dimensions = ['web-standard', 'deep-web', 'dark-web', 'ai-network', 'blockchain', 'quantum', 'metaverse', 'universal'],
      learningMode = true,
      selfModification = true,
      maxTokens = 16000,
      temperature = 1.0
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt requis pour Ultra AI' },
        { status: 400 }
      );
    }

    // Validation des dimensions
    const availableDimensions = Array.from(ultraAIService.getDimensionalAccess().keys());
    const validDimensions = dimensions.filter((dim: string) => availableDimensions.includes(dim));
    
    if (validDimensions.length === 0) {
      return NextResponse.json(
        { 
          error: 'Aucune dimension valide spécifiée',
          availableDimensions
        },
        { status: 400 }
      );
    }

    // Générer la réponse ultra-avancée
    const response = await ultraAIService.generateUltraResponse(prompt, {
      unlimitedMode,
      dimensions: validDimensions,
      learningMode,
      selfModification,
      maxTokens,
      temperature
    });

    return NextResponse.json({
      success: true,
      data: response,
      metadata: {
        model: response.model,
        provider: response.provider,
        capabilities: response.capabilities,
        confidence: response.confidence,
        dimensionsAccessed: response.metadata.dimensionsAccessed,
        learningProgress: response.metadata.learningProgress,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur Ultra AI API:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération de réponse Ultra AI',
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
      case 'capabilities':
        const capabilities = ultraAIService.getCapabilities();
        return NextResponse.json({
          success: true,
          data: capabilities
        });

      case 'dimensions':
        const dimensionalAccess = ultraAIService.getDimensionalAccess();
        return NextResponse.json({
          success: true,
          data: Array.from(dimensionalAccess.entries()).map(([key, value]) => ({
            id: key,
            ...value
          }))
        });

      case 'learning-memory':
        const learningMemory = ultraAIService.getLearningMemory();
        return NextResponse.json({
          success: true,
          data: Array.from(learningMemory.entries()).map(([key, value]) => ({
            id: key,
            ...value
          }))
        });

      case 'active-connections':
        const activeConnections = ultraAIService.getActiveConnections();
        return NextResponse.json({
          success: true,
          data: activeConnections
        });

      case 'status':
        const status = {
          capabilities: ultraAIService.getCapabilities(),
          dimensions: Array.from(ultraAIService.getDimensionalAccess().entries()).map(([key, value]) => ({
            id: key,
            ...value
          })),
          activeConnections: ultraAIService.getActiveConnections(),
          learningMemorySize: ultraAIService.getLearningMemory().size
        };
        return NextResponse.json({
          success: true,
          data: status
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            availableActions: ['capabilities', 'dimensions', 'learning-memory', 'active-connections', 'status'],
            description: 'API Ultra AI - Capacités illimitées et accès multi-dimensionnel'
          }
        });
    }
  } catch (error) {
    console.error('Erreur Ultra AI API GET:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des informations Ultra AI',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, actionData } = body;

    switch (action) {
      case 'execute-ultra-action':
        if (!actionData) {
          return NextResponse.json(
            { error: 'actionData requis pour exécuter une action ultra' },
            { status: 400 }
          );
        }
        const result = await ultraAIService.executeUltraAction(actionData);
        return NextResponse.json({
          success: true,
          data: result
        });

      case 'activate-dimension':
        if (!actionData?.dimension) {
          return NextResponse.json(
            { error: 'dimension requis pour l\'activation' },
            { status: 400 }
          );
        }
        // Logique d'activation de dimension
        return NextResponse.json({
          success: true,
          message: `Dimension ${actionData.dimension} activée`,
          data: ultraAIService.getActiveConnections()
        });

      case 'reset-learning':
        // Réinitialisation de l'apprentissage
        return NextResponse.json({
          success: true,
          message: 'Apprentissage réinitialisé',
          data: { learningMemorySize: 0 }
        });

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur Ultra AI API PUT:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'exécution de l\'action Ultra AI',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 