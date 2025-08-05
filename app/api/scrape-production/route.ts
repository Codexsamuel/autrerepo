import { NextRequest, NextResponse } from 'next/server';
import { scrapeAllSources, scrapeSingleSource, getAllSourcesStats } from '@/lib/scraperMaster';

/**
 * 🚀 API de scraping production ready avec fallback automatique
 * 
 * GET /api/scrape-production?keyword=iphone&limit=20&sources=aliexpress,ebay
 * POST /api/scrape-production (avec body JSON)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sources = searchParams.get('sources')?.split(',').filter(Boolean) || [];
    const singleSource = searchParams.get('source');
    const stats = searchParams.get('stats') === 'true';

    // Retourner les statistiques des sources
    if (stats) {
      return NextResponse.json({
        success: true,
        data: getAllSourcesStats(),
        timestamp: new Date().toISOString()
      });
    }

    // Validation du mot-clé
    if (!keyword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Paramètre "keyword" requis',
          example: '/api/scrape-production?keyword=iphone&limit=20'
        },
        { status: 400 }
      );
    }

    console.log(`🚀 Scraping Production: "${keyword}" (limite: ${limit})`);

    let result;

    // Scraping d'une seule source
    if (singleSource) {
      const products = await scrapeSingleSource(keyword, singleSource, limit);
      result = {
        keyword,
        totalProducts: products.length,
        products,
        source: singleSource,
        timestamp: new Date().toISOString()
      };
    } else {
      // Scraping multi-sources
      result = await scrapeAllSources(keyword, limit, sources);
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API Scraping Production:', error);
    
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

/**
 * POST /api/scrape-production
 * Body: { "keyword": "iphone", "limit": 20, "sources": ["aliexpress", "ebay"] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, limit = 20, sources = [], source } = body;

    // Validation du mot-clé
    if (!keyword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Champ "keyword" requis dans le body',
          example: { "keyword": "iphone", "limit": 20, "sources": ["aliexpress", "ebay"] }
        },
        { status: 400 }
      );
    }

    console.log(`🚀 Scraping Production POST: "${keyword}" (limite: ${limit})`);

    let result;

    // Scraping d'une seule source
    if (source) {
      const products = await scrapeSingleSource(keyword, source, limit);
      result = {
        keyword,
        totalProducts: products.length,
        products,
        source,
        timestamp: new Date().toISOString()
      };
    } else {
      // Scraping multi-sources
      result = await scrapeAllSources(keyword, limit, sources);
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Erreur API Scraping Production POST:', error);
    
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