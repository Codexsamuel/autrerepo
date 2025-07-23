export const revalidate = false;
import { scrapeAliExpress } from '@/lib/scraper/aliexpress';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour l'export statique, retourner des données statiques
    const products = await scrapeAliExpress({ category: "", query: "smartphone" });
    const limitedProducts = products.slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        products: limitedProducts,
        total: limitedProducts.length,
        message: 'Données de produits (mode statique)'
      }
    });

  } catch (error) {
    console.error('Erreur API scraping products:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 