import ultraAIProductionService from '@/lib/ai/ultra-ai-production';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context, capabilities, model } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    // Traiter avec ULTRA AI
    const response = await ultraAIProductionService.processMessage({
      message,
      context,
      capabilities,
      model
    });

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
      model: response.model,
      capabilities: response.capabilities,
      confidence: response.confidence,
      processingTime: response.processingTime
    });

  } catch (error) {
    console.error('Erreur API ULTRA AI:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ULTRA AI 2025 API',
    version: '1.0.0',
    capabilities: [
      'multi-dimensional',
      'auto-learning',
      'self-modification',
      'hacking-mode',
      'code-generation',
      'predictive-analysis',
      'openai-integration',
      'gemini-integration'
    ],
    status: 'active',
    timestamp: new Date().toISOString()
  });
} 