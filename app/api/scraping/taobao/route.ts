import { taobaoService } from '@/lib/scraper/taobao-rapidapi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = decodeURIComponent(searchParams.get('query') || '');
    const category = decodeURIComponent(searchParams.get('category') || '');
    const country = decodeURIComponent(searchParams.get('country') || '');
    const limit = parseInt(searchParams.get('limit') || '50');
    const imageUrl = searchParams.get('imageUrl');
    const isbn = searchParams.get('isbn');
    const shopId = searchParams.get('shopId');
    
    console.log('🚀 API TaoBao/Tmall Scraping - Paramètres:', { query, category, country, limit });

    // Actions spéciales
    if (action === 'stats') {
      const endpoints = taobaoService.getAvailableEndpoints();
      
      return NextResponse.json({
        success: true,
        data: {
          service: 'TaoBao/Tmall RapidAPI',
          endpoints,
          totalEndpoints: endpoints.length,
          status: 'taobao_api_ready',
          message: 'API TaoBao/Tmall configurée via RapidAPI'
        }
      });
    }

    if (action === 'endpoints') {
      const endpoints = taobaoService.getAvailableEndpoints();
      return NextResponse.json({
        success: true,
        data: endpoints
      });
    }

    if (action === 'test') {
      // Test de connexion à l'API TaoBao/Tmall
      const testResults = await Promise.allSettled([
        taobaoService.searchAllTaoBao('test', 'Vêtements', 5),
        taobaoService.searchAllTaoBao('test', 'Électronique', 5)
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

    // Recherche par image
    if (imageUrl) {
      console.log(`🔍 Recherche par image TaoBao/Tmall: ${imageUrl}`);
      const products = await taobaoService.searchByImage(imageUrl);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        query: 'image_search',
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    // Recherche par ISBN
    if (isbn) {
      console.log(`🔍 Recherche par ISBN TaoBao/Tmall: ${isbn}`);
      const products = await taobaoService.searchByISBN(isbn);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        query: 'isbn_search',
        isbn,
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    // Recherche dans une boutique spécifique
    if (shopId) {
      console.log(`🔍 Recherche boutique TaoBao/Tmall: ${shopId}`);
      const products = await taobaoService.searchInShop(shopId, query, limit);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        query,
        shopId,
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    // Recherche générale de produits
    console.log(`🔍 Recherche TaoBao/Tmall: "${query}" - Catégorie: "${category}"`);
    
    const result = await taobaoService.searchAllTaoBao(query, category, limit);
    
    console.log(`✅ TaoBao/Tmall scraping terminé: ${result.products.length} produits trouvés`);

    return NextResponse.json({
      success: true,
      data: result.products,
      stats: result.stats,
      total: result.products.length,
      query,
      category,
      country,
      timestamp: new Date().toISOString(),
      source: 'taobao_rapidapi'
    });

  } catch (error) {
    console.error('❌ Erreur API TaoBao/Tmall scraping:', error);
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
    const { productId, action, imageUrl, isbn, shopId, query } = body;

    if (action === 'search-by-image' && imageUrl) {
      console.log(`🔍 Recherche par image TaoBao/Tmall: ${imageUrl}`);
      const products = await taobaoService.searchByImage(imageUrl);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    if (action === 'search-by-isbn' && isbn) {
      console.log(`🔍 Recherche par ISBN TaoBao/Tmall: ${isbn}`);
      const products = await taobaoService.searchByISBN(isbn);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    if (action === 'search-in-shop' && shopId) {
      console.log(`🔍 Recherche boutique TaoBao/Tmall: ${shopId}`);
      const products = await taobaoService.searchInShop(shopId, query || '', 50);
      
      return NextResponse.json({
        success: true,
        data: products,
        total: products.length,
        shopId,
        query,
        timestamp: new Date().toISOString(),
        source: 'taobao_rapidapi'
      });
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'productId requis' },
        { status: 400 }
      );
    }

    console.log(`🔍 Détails produit TaoBao/Tmall: ${productId}`);
    
    const product = await taobaoService.getProductDetails(productId);
    
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
      source: 'taobao_rapidapi'
    });

  } catch (error) {
    console.error('❌ Erreur détails produit TaoBao/Tmall:', error);
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