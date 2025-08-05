import { NextRequest, NextResponse } from 'next/server';

// Types pour la gestion des prix
interface PricingConfig {
  baseCurrency: string;
  targetCurrency: string;
  profitMargin: number; // Pourcentage de marge (ex: 0.5 = 50%)
  minProfit: number; // Marge minimale en devise cible
  maxProfit: number; // Marge maximale en devise cible
  exchangeRates: Record<string, number>;
}

interface ProductPricing {
  originalPrice: number;
  originalCurrency: string;
  sellingPrice: number;
  sellingCurrency: string;
  profitMargin: number;
  profitAmount: number;
  exchangeRate: number;
  source: string; // Source du produit (shein, amazon, etc.)
}

// Configuration des marges par source
const PROFIT_MARGINS: Record<string, number> = {
  'shein': 0.5,        // 50% de marge sur Shein
  'amazon': 0.3,       // 30% de marge sur Amazon
  'taobao': 0.4,       // 40% de marge sur Taobao
  '1688': 0.35,        // 35% de marge sur 1688
  'ebay': 0.25,        // 25% de marge sur eBay
  'aliexpress': 0.45,  // 45% de marge sur AliExpress
  'chinese-stores': 0.4, // 40% de marge sur stores chinoises
  'default': 0.35      // Marge par défaut
};

// Taux de change (à mettre à jour régulièrement)
const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1.0,
  'EUR': 0.85,
  'FCFA': 550.0,
  'CNY': 6.5,
  'GBP': 0.73,
  'JPY': 110.0,
  'CAD': 1.25,
  'AUD': 1.35
};

// Marges minimales et maximales par devise
const MARGIN_LIMITS: Record<string, { min: number; max: number }> = {
  'USD': { min: 5, max: 100 },
  'EUR': { min: 4, max: 85 },
  'FCFA': { min: 2500, max: 50000 },
  'CNY': { min: 30, max: 650 }
};

// Fonction pour calculer le prix de vente avec marge
function calculateSellingPrice(
  originalPrice: number,
  originalCurrency: string,
  targetCurrency: string,
  source: string
): ProductPricing {
  // Obtenir la marge pour cette source
  const profitMargin = PROFIT_MARGINS[source] || PROFIT_MARGINS.default;
  
  // Convertir le prix original en devise cible
  const exchangeRate = EXCHANGE_RATES[targetCurrency] / EXCHANGE_RATES[originalCurrency];
  const convertedPrice = originalPrice * exchangeRate;
  
  // Calculer la marge bénéficiaire
  const profitAmount = Math.max(
    convertedPrice * profitMargin,
    MARGIN_LIMITS[targetCurrency]?.min || 5
  );
  
  // Limiter la marge maximale
  const maxProfit = MARGIN_LIMITS[targetCurrency]?.max || 100;
  const finalProfitAmount = Math.min(profitAmount, maxProfit);
  
  // Prix de vente final
  const sellingPrice = convertedPrice + finalProfitAmount;
  
  return {
    originalPrice,
    originalCurrency,
    sellingPrice: Math.round(sellingPrice * 100) / 100, // Arrondir à 2 décimales
    sellingCurrency: targetCurrency,
    profitMargin,
    profitAmount: Math.round(finalProfitAmount * 100) / 100,
    exchangeRate,
    source
  };
}

// Fonction pour masquer les informations sensibles (admin uniquement)
function maskPricingForCustomer(pricing: ProductPricing): Omit<ProductPricing, 'originalPrice' | 'originalCurrency' | 'profitMargin' | 'profitAmount' | 'source'> {
  return {
    sellingPrice: pricing.sellingPrice,
    sellingCurrency: pricing.sellingCurrency,
    exchangeRate: pricing.exchangeRate
  };
}

// Fonction pour obtenir les informations complètes (admin uniquement)
function getFullPricingInfo(pricing: ProductPricing): ProductPricing & { 
  isAdmin: boolean;
  markupPercentage: number;
} {
  const markupPercentage = ((pricing.sellingPrice - pricing.originalPrice * pricing.exchangeRate) / (pricing.originalPrice * pricing.exchangeRate)) * 100;
  
  return {
    ...pricing,
    isAdmin: true,
    markupPercentage: Math.round(markupPercentage * 100) / 100
  };
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const originalPrice = parseFloat(searchParams.get('price') || '0');
    const originalCurrency = searchParams.get('currency') || 'USD';
    const targetCurrency = searchParams.get('targetCurrency') || 'EUR';
    const source = searchParams.get('source') || 'default';
    const isAdmin = searchParams.get('admin') === 'true';

    // Action: calculer le prix de vente
    if (action === 'calculate' || !action) {
      if (originalPrice <= 0) {
        return NextResponse.json({
          success: false,
          message: 'Le prix original doit être supérieur à 0'
        }, { status: 400 });
      }

      const pricing = calculateSellingPrice(originalPrice, originalCurrency, targetCurrency, source);

      // Retourner les informations selon le rôle
      if (isAdmin) {
        return NextResponse.json({
          success: true,
          data: getFullPricingInfo(pricing)
        });
      } else {
        return NextResponse.json({
          success: true,
          data: maskPricingForCustomer(pricing)
        });
      }
    }

    // Action: obtenir les marges par source
    if (action === 'margins') {
      if (!isAdmin) {
        return NextResponse.json({
          success: false,
          message: 'Accès non autorisé'
        }, { status: 403 });
      }

      return NextResponse.json({
        success: true,
        data: PROFIT_MARGINS
      });
    }

    // Action: obtenir les taux de change
    if (action === 'rates') {
      return NextResponse.json({
        success: true,
        data: EXCHANGE_RATES
      });
    }

    // Action: obtenir les limites de marge
    if (action === 'limits') {
      if (!isAdmin) {
        return NextResponse.json({
          success: false,
          message: 'Accès non autorisé'
        }, { status: 403 });
      }

      return NextResponse.json({
        success: true,
        data: MARGIN_LIMITS
      });
    }

    // Action: statistiques
    if (action === 'stats') {
      const stats = {
        supportedCurrencies: Object.keys(EXCHANGE_RATES),
        supportedSources: Object.keys(PROFIT_MARGINS),
        totalSources: Object.keys(PROFIT_MARGINS).length,
        totalCurrencies: Object.keys(EXCHANGE_RATES).length,
        averageMargin: Object.values(PROFIT_MARGINS).reduce((a, b) => a + b, 0) / Object.values(PROFIT_MARGINS).length
      };

      return NextResponse.json({
        success: true,
        data: stats
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });

  } catch (error) {
    console.error('Erreur API Pricing:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors du calcul des prix',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Route POST pour les calculs en lot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products, targetCurrency, isAdmin = false } = body;

    if (!Array.isArray(products)) {
      return NextResponse.json({
        success: false,
        message: 'Le paramètre products doit être un tableau'
      }, { status: 400 });
    }

    const results = products.map((product: any) => {
      const pricing = calculateSellingPrice(
        product.price,
        product.currency,
        targetCurrency,
        product.source
      );

      if (isAdmin) {
        return getFullPricingInfo(pricing);
      } else {
        return maskPricingForCustomer(pricing);
      }
    });

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Erreur API Pricing POST:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors du calcul des prix en lot',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 