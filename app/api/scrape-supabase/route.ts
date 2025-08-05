import { scrape1688, scrapeAliExpress, scrapeEbay, scrapeGoogleShopping, scrapeTaobao } from '@/lib/scraper';
import { getProductsFromSupabase, getScrapingStats, saveProductsToSupabase } from '@/lib/supabase-scraper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const keyword = searchParams.get('keyword');
  const source = searchParams.get('source') || 'all';
  const limit = parseInt(searchParams.get('limit') || '20');
  const saveToDb = searchParams.get('save') === 'true';

  try {
    // Action: stats - Obtenir les statistiques Supabase
    if (action === 'stats') {
      const stats = await getScrapingStats();
      return NextResponse.json({
        success: true,
        data: stats
      });
    }

    // Action: get - Récupérer les produits depuis Supabase
    if (action === 'get') {
      const options = {
        source: searchParams.get('source') || undefined,
        category: searchParams.get('category') || undefined,
        limit: parseInt(searchParams.get('limit') || '20'),
        offset: parseInt(searchParams.get('offset') || '0'),
        minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
        maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
        search: searchParams.get('search') || undefined
      };

      const result = await getProductsFromSupabase(options);
      
      return NextResponse.json({
        success: !result.error,
        data: result.products,
        stats: {
          total: result.total,
          returned: result.products.length,
          offset: options.offset,
          limit: options.limit
        },
        error: result.error
      });
    }

    // Action par défaut: scrape - Scraper et sauvegarder
    if (!keyword) {
      return NextResponse.json(
        { error: 'Paramètre "keyword" requis pour le scraping' },
        { status: 400 }
      );
    }

    let results: any = {};
    let allProducts: any[] = [];

    // Scraping selon la source demandée
    if (source === 'all' || source === 'aliexpress') {
      try {
        const aliResult = await scrapeAliExpress(keyword, limit);
        results.aliExpress = aliResult;
        allProducts.push(...aliResult.data.map(p => ({ ...p, source: 'AliExpress' })));
      } catch (error) {
        console.error('Erreur AliExpress:', error);
        results.aliExpress = { error: 'Erreur AliExpress', data: [] };
      }
    }

    if (source === 'all' || source === 'ebay') {
      try {
        const ebayResult = await scrapeEbay(keyword, limit);
        results.ebay = ebayResult;
        allProducts.push(...ebayResult.data.map(p => ({ ...p, source: 'eBay' })));
      } catch (error) {
        console.error('Erreur eBay:', error);
        results.ebay = { error: 'Erreur eBay', data: [] };
      }
    }

    if (source === 'all' || source === 'taobao') {
      try {
        const taobaoResult = await scrapeTaobao(keyword, limit);
        results.taobao = taobaoResult;
        allProducts.push(...taobaoResult.data.map(p => ({ ...p, source: 'Taobao' })));
      } catch (error) {
        console.error('Erreur Taobao:', error);
        results.taobao = { error: 'Erreur Taobao', data: [] };
      }
    }

    if (source === 'all' || source === '1688') {
      try {
        const result1688 = await scrape1688(keyword, limit);
        results['1688'] = result1688;
        allProducts.push(...result1688.data.map(p => ({ ...p, source: '1688' })));
      } catch (error) {
        console.error('Erreur 1688:', error);
        results['1688'] = { error: 'Erreur 1688', data: [] };
      }
    }

    if (source === 'all' || source === 'google') {
      try {
        const googleResult = await scrapeGoogleShopping(keyword, limit);
        results.googleShopping = googleResult;
        allProducts.push(...googleResult.data.map(p => ({ ...p, source: 'Google Shopping' })));
      } catch (error) {
        console.error('Erreur Google Shopping:', error);
        results.googleShopping = { error: 'Erreur Google Shopping', data: [] };
      }
    }

    // Sauvegarder dans Supabase si demandé
    let supabaseResult = null;
    if (saveToDb && allProducts.length > 0) {
      try {
        supabaseResult = await saveProductsToSupabase(allProducts);
        console.log(`✅ ${supabaseResult.saved} produits sauvegardés, ${supabaseResult.updated} mis à jour`);
      } catch (error) {
        console.error('Erreur sauvegarde Supabase:', error);
        supabaseResult = { error: 'Erreur sauvegarde', saved: 0, updated: 0, errors: allProducts.length, total: allProducts.length };
      }
    }

    // Statistiques
    const stats = {
      keyword,
      sources: Object.keys(results).length,
      totalProducts: allProducts.length,
      timestamp: new Date().toISOString(),
      supabase: supabaseResult
    };

    return NextResponse.json({
      success: true,
      data: results,
      stats,
      supabase: supabaseResult
    });

  } catch (error) {
    console.error('Erreur scraping Supabase:', error);
    return NextResponse.json(
      { error: 'Erreur lors du scraping', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, sources = ['all'], limit = 20, saveToDb = true } = body;

    if (!keyword) {
      return NextResponse.json(
        { error: 'Paramètre "keyword" requis dans le body' },
        { status: 400 }
      );
    }

    // Utiliser la même logique que GET
    const url = new URL(request.url);
    url.searchParams.set('keyword', keyword);
    if (sources.length === 1 && sources[0] !== 'all') {
      url.searchParams.set('source', sources[0]);
    }
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('save', saveToDb.toString());

    return GET(new NextRequest(url.toString()));
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur parsing JSON' },
      { status: 400 }
    );
  }
} 