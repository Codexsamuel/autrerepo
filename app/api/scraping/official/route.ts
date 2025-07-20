import { officialAPIService } from '@/lib/scraper/alibaba-official-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = decodeURIComponent(searchParams.get('query') || '');
    const category = decodeURIComponent(searchParams.get('category') || '');
    const country = decodeURIComponent(searchParams.get('country') || '');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    console.log('🚀 API Official Scraping - Paramètres:', { query, category, country, limit });

    // Actions spéciales
    if (action === 'stats') {
      const apis = officialAPIService.getAvailableAPIs();
      
      return NextResponse.json({
        success: true,
        data: {
          apis,
          totalAPIs: apis.length,
          status: 'official_apis_ready',
          message: 'APIs officielles Alibaba/Lazada configurées'
        }
      });
    }

    if (action === 'apis') {
      const apis = officialAPIService.getAvailableAPIs();
      return NextResponse.json({
        success: true,
        data: apis
      });
    }

    if (action === 'refresh-tokens') {
      await officialAPIService.refreshAllTokens();
      return NextResponse.json({
        success: true,
        message: 'Tokens rafraîchis avec succès'
      });
    }

    if (action === 'test') {
      // Test de connexion aux APIs officielles
      const testResults = await Promise.allSettled([
        officialAPIService.searchAllOfficialAPIs('test', 'Vêtements', 5),
        officialAPIService.searchAllOfficialAPIs('test', 'Électronique', 5)
      ]);

      return NextResponse.json({
        success: true,
        data: {
          testResults: testResults.map((result, index) => ({
            test: index === 0 ? 'Vêtements' : 'Électronique',
            status: result.status,
            products: result.status === 'fulfilled' ? result.value.products.length : 0,
            error: result.status === 'rejected' ? result.reason.message : null
          }))
        }
      });
    }

    // Recherche de produits avec APIs officielles
    console.log(`🔍 Recherche APIs officielles: "${query}" - Catégorie: "${category}"`);
    
    const result = await officialAPIService.searchAllOfficialAPIs(query, category, limit);
    
    console.log(`✅ Official APIs scraping terminé: ${result.products.length} produits trouvés`);

    return NextResponse.json({
      success: true,
      data: result.products,
      stats: result.stats,
      total: result.products.length,
      query,
      category,
      country,
      timestamp: new Date().toISOString(),
      source: 'official_apis'
    });

  } catch (error) {
    console.error('❌ Erreur API official scraping:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur interne du serveur',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, action } = body;

    if (action === 'refresh-tokens') {
      await officialAPIService.refreshAllTokens();
      return NextResponse.json({
        success: true,
        message: 'Tokens rafraîchis avec succès',
        timestamp: new Date().toISOString()
      });
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'productId requis' },
        { status: 400 }
      );
    }

    console.log(`🔍 Détails produit APIs officielles: ${productId}`);
    
    const product = await officialAPIService.getProductDetails(productId);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      timestamp: new Date().toISOString(),
      source: 'official_apis'
    });

  } catch (error) {
    console.error('❌ Erreur détails produit APIs officielles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur interne du serveur',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 