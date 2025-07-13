import { AdvancedIntelligenceService } from '@/lib/ai/advanced-intelligence-service';
import { NextRequest, NextResponse } from 'next/server';

const intelligenceService = new AdvancedIntelligenceService({
  enableOSINT: true,
  enableSocialMedia: true,
  enableTechnicalAnalysis: true,
  enableRiskAssessment: true,
  maxSources: 15,
  timeout: 45000
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

    console.log(`🔍 Analyse d'intelligence avancée: ${query}`);

    // Configuration personnalisée si fournie
    if (config) {
      Object.assign(intelligenceService, config);
    }

    // Analyse complète
    const analysis = await intelligenceService.comprehensiveAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        totalSources: analysis.osintData?.length || 0
      }
    });

  } catch (error) {
    console.error('Erreur Intelligence API:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse d\'intelligence',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const enableOSINT = searchParams.get('osint') !== 'false';
    const enableSocialMedia = searchParams.get('social') !== 'false';
    const enableTechnical = searchParams.get('technical') !== 'false';
    const enableRisk = searchParams.get('risk') !== 'false';

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Paramètre "q" (query) requis'
      }, { status: 400 });
    }

    console.log(`🔍 Analyse d'intelligence GET: ${query}`);

    // Configuration basée sur les paramètres
    const config = {
      enableOSINT,
      enableSocialMedia,
      enableTechnicalAnalysis: enableTechnical,
      enableRiskAssessment: enableRisk
    };

    Object.assign(intelligenceService, config);

    // Analyse complète
    const analysis = await intelligenceService.comprehensiveAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        totalSources: analysis.osintData?.length || 0,
        config
      }
    });

  } catch (error) {
    console.error('Erreur Intelligence API GET:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse d\'intelligence',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 