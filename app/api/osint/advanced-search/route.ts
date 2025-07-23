export const revalidate = false;
import { AdvancedOSINTService } from '@/lib/osint/advanced-osint-service';
import { NextRequest, NextResponse } from 'next/server';

const osintService = new AdvancedOSINTService({
  maxDepth: 5,
  timeout: 15000,
  useProxy: false
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, sources, depth, includeSentiment } = body;

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query requise'
      }, { status: 400 });
    }

    console.log(`🔍 Recherche OSINT avancée: ${query}`);

    // Recherche multi-sources
    const results = await osintService.deepWebSearch(query, sources);

    // Analyse de sentiment si demandée
    let sentimentAnalysis = null;
    if (includeSentiment && results.length > 0) {
      sentimentAnalysis = await osintService.analyzeSentiment(results);
    }

    // Statistiques du cache
    const cacheStats = osintService.getCacheStats();

    return NextResponse.json({
      success: true,
      data: {
        query,
        results,
        totalSources: results.length,
        sentimentAnalysis,
        cacheStats,
        searchTime: new Date().toISOString(),
        metadata: {
          sources: sources || 'default',
          depth: depth || 3,
          includeSentiment: includeSentiment || false
        }
      }
    });

  } catch (error) {
    console.error('Erreur OSINT API:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la recherche OSINT',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const sources = searchParams.get('sources')?.split(',');
    const includeSentiment = searchParams.get('sentiment') === 'true';

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Paramètre "q" (query) requis'
      }, { status: 400 });
    }

    console.log(`🔍 Recherche OSINT GET: ${query}`);

    // Recherche multi-sources
    const results = await osintService.deepWebSearch(query, sources);

    // Analyse de sentiment si demandée
    let sentimentAnalysis = null;
    if (includeSentiment && results.length > 0) {
      sentimentAnalysis = await osintService.analyzeSentiment(results);
    }

    return NextResponse.json({
      success: true,
      data: {
        query,
        results,
        totalSources: results.length,
        sentimentAnalysis,
        searchTime: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur OSINT API GET:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la recherche OSINT',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 