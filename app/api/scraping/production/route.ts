export const revalidate = false;
import { productionScraper } from '@/lib/scraper/production-scraper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = decodeURIComponent(searchParams.get('query') || '');
    const category = decodeURIComponent(searchParams.get('category') || '');
    const country = decodeURIComponent(searchParams.get('country') || '');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    console.log('🚀 API Production Scraping - Paramètres:', { query, category, country, limit });

    // Actions spéciales
    if (action === 'stats') {
      const concessionnaires = productionScraper.getAvailableConcessionnaires();
      const categories = productionScraper.getAvailableCategories();
      
      return NextResponse.json({
        success: true,
        data: {
          concessionnaires,
          categories,
          totalConcessionnaires: concessionnaires.length,
          totalCategories: categories.length,
          status: 'production_ready'
        }
      });
    }

    if (action === 'concessionnaires') {
      const concessionnaires = productionScraper.getAvailableConcessionnaires();
      return NextResponse.json({
        success: true,
        data: concessionnaires
      });
    }

    if (action === 'categories') {
      const categories = productionScraper.getAvailableCategories();
      return NextResponse.json({
        success: true,
        data: categories
      });
    }

    if (action === 'test') {
      // Test de connexion aux concessionnaires
      const testResults = await Promise.allSettled([
        productionScraper.searchAllConcessionnaires('test', 'Vêtements', 5),
        productionScraper.searchAllConcessionnaires('test', 'Électronique', 5)
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

    // Recherche de produits en production
    console.log(`🔍 Recherche production: "${query}" - Catégorie: "${category}"`);
    
    const result = await productionScraper.searchAllConcessionnaires(query, category, limit);
    
    console.log(`✅ Production scraping terminé: ${result.products.length} produits trouvés`);

    return NextResponse.json({
      success: true,
      data: result.products,
      stats: result.stats,
      total: result.products.length,
      query,
      category,
      country,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur API production scraping:', error);
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
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'productId requis' },
        { status: 400 }
      );
    }

    console.log(`🔍 Détails produit production: ${productId}`);
    
    const product = await productionScraper.getProductDetails(productId);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur détails produit production:', error);
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