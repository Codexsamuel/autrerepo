import { NextRequest, NextResponse } from 'next/server';
import { scrapeAliExpress, scrapeEbay, scrapeTaobao, scrape1688, scrapeGoogleShopping } from '@/lib/scraper';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const source = searchParams.get('source') || 'all';
  const limit = parseInt(searchParams.get('limit') || '20');

  if (!keyword) {
    return NextResponse.json(
      { error: 'Paramètre "keyword" requis' },
      { status: 400 }
    );
  }

  try {
    let results: any = {};

    // Scraping selon la source demandée
    if (source === 'all' || source === 'aliexpress') {
      try {
        results.aliExpress = await scrapeAliExpress(keyword, limit);
      } catch (error) {
        console.error('Erreur AliExpress:', error);
        results.aliExpress = { error: 'Erreur AliExpress', data: [] };
      }
    }

    if (source === 'all' || source === 'ebay') {
      try {
        results.ebay = await scrapeEbay(keyword, limit);
      } catch (error) {
        console.error('Erreur eBay:', error);
        results.ebay = { error: 'Erreur eBay', data: [] };
      }
    }

    if (source === 'all' || source === 'taobao') {
      try {
        results.taobao = await scrapeTaobao(keyword, limit);
      } catch (error) {
        console.error('Erreur Taobao:', error);
        results.taobao = { error: 'Erreur Taobao', data: [] };
      }
    }

    if (source === 'all' || source === '1688') {
      try {
        results['1688'] = await scrape1688(keyword, limit);
      } catch (error) {
        console.error('Erreur 1688:', error);
        results['1688'] = { error: 'Erreur 1688', data: [] };
      }
    }

    if (source === 'all' || source === 'google') {
      try {
        results.googleShopping = await scrapeGoogleShopping(keyword, limit);
      } catch (error) {
        console.error('Erreur Google Shopping:', error);
        results.googleShopping = { error: 'Erreur Google Shopping', data: [] };
      }
    }

    // Statistiques
    const stats = {
      keyword,
      sources: Object.keys(results).length,
      totalProducts: Object.values(results).reduce((acc: number, source: any) => {
        return acc + (source.data?.length || 0);
      }, 0),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: results,
      stats
    });

  } catch (error) {
    console.error('Erreur scraping:', error);
    return NextResponse.json(
      { error: 'Erreur lors du scraping', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, sources = ['all'], limit = 20 } = body;

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

    return GET(new NextRequest(url.toString()));
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur parsing JSON' },
      { status: 400 }
    );
  }
} 