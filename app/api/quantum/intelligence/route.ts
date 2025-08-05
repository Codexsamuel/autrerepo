import { QuantumIntelligenceService } from '@/lib/ai/quantum-intelligence-service';
import { NextRequest, NextResponse } from 'next/server';

const quantumService = new QuantumIntelligenceService({
  enableQuantumSimulation: true,
  enablePredictiveAI: true,
  enableMarketForecasting: true,
  enableRiskPrediction: true,
  simulationDepth: 2000,
  predictionHorizon: 90
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, config } = body;

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query requise'
      }, { status: 400 });
    }

    console.log(`🌌 Analyse quantique POST: ${query}`);

    // Configuration personnalisée si fournie
    if (config) {
      Object.assign(quantumService, config);
    }

    // Analyse quantique complète
    const analysis = await quantumService.quantumAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        quantumEntanglement: analysis.quantumEntanglement,
        quantumAdvantage: analysis.quantumSimulation?.quantumAdvantage || 0
      }
    });

  } catch (error) {
    console.error('Erreur Quantum Intelligence API:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse quantique',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const enableQuantum = searchParams.get('quantum') !== 'false';
    const enablePredictive = searchParams.get('predictive') !== 'false';
    const enableMarket = searchParams.get('market') !== 'false';
    const enableRisk = searchParams.get('risk') !== 'false';
    const depth = parseInt(searchParams.get('depth') || '2000');

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Paramètre "q" (query) requis'
      }, { status: 400 });
    }

    console.log(`🌌 Analyse quantique GET: ${query}`);

    // Configuration basée sur les paramètres
    const config = {
      enableQuantumSimulation: enableQuantum,
      enablePredictiveAI: enablePredictive,
      enableMarketForecasting: enableMarket,
      enableRiskPrediction: enableRisk,
      simulationDepth: depth
    };

    Object.assign(quantumService, config);

    // Analyse quantique complète
    const analysis = await quantumService.quantumAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        quantumEntanglement: analysis.quantumEntanglement,
        quantumAdvantage: analysis.quantumSimulation?.quantumAdvantage || 0,
        config
      }
    });

  } catch (error) {
    console.error('Erreur Quantum Intelligence API GET:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse quantique',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 