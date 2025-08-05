import { createClient } from '@supabase/supabase-js';
import { ScrapedProduct } from './scraper';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour Supabase
export interface SupabaseProduct {
  id: string;
  external_id: string;
  title: string;
  title_fr?: string;
  price: string;
  original_price?: string;
  price_eur?: number;
  price_usd?: number;
  price_fcfa?: number;
  image_url: string;
  product_url: string;
  source: string;
  rating?: number;
  reviews_count?: number;
  seller?: string;
  location?: string;
  shipping_info?: string;
  availability?: string;
  description?: string;
  description_fr?: string;
  category?: string;
  tags?: string[];
  profit_margin?: number;
  selling_price?: number;
  created_at: string;
  updated_at: string;
  last_scraped: string;
  is_active: boolean;
}

// Fonction pour traduire le texte avec Google Translate API
async function translateText(text: string, targetLang: string = 'fr'): Promise<string> {
  try {
    const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';
    
    const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': RAPID_API_KEY,
      },
      body: `q=${encodeURIComponent(text)}&target=${targetLang}&source=auto`
    });

    const data = await response.json();
    return data.data?.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error('Erreur traduction:', error);
    return text; // Retourner le texte original en cas d'erreur
  }
}

// Fonction pour normaliser les prix
function normalizePrice(price: string): number {
  if (!price) return 0;
  
  // Extraire les chiffres du prix
  const numericPrice = price.replace(/[^\d.,]/g, '').replace(',', '.');
  return parseFloat(numericPrice) || 0;
}

// Fonction pour calculer les prix dans différentes devises
function calculatePrices(price: string, source: string): {
  price_eur: number;
  price_usd: number;
  price_fcfa: number;
} {
  const basePrice = normalizePrice(price);
  
  // Taux de change approximatifs (à mettre à jour régulièrement)
  const exchangeRates = {
    EUR: 1,
    USD: 1.08,
    CNY: 7.8,
    FCFA: 655.957
  };

  // Conversion selon la source
  let priceInEUR = basePrice;
  
  if (source.toLowerCase().includes('taobao') || source.toLowerCase().includes('1688')) {
    // Prix en CNY
    priceInEUR = basePrice / exchangeRates.CNY;
  } else if (source.toLowerCase().includes('ebay')) {
    // Prix en USD
    priceInEUR = basePrice / exchangeRates.USD;
  }

  return {
    price_eur: Math.round(priceInEUR * 100) / 100,
    price_usd: Math.round(priceInEUR * exchangeRates.USD * 100) / 100,
    price_fcfa: Math.round(priceInEUR * exchangeRates.FCFA * 100) / 100
  };
}

// Fonction pour calculer la marge bénéficiaire
function calculateProfitMargin(source: string, basePrice: number): number {
  const margins = {
    'AliExpress': 0.25, // 25%
    'eBay': 0.20,       // 20%
    'Taobao': 0.30,     // 30%
    '1688': 0.35,       // 35%
    'Google Shopping': 0.15, // 15%
    'default': 0.20     // 20% par défaut
  };

  const margin = margins[source as keyof typeof margins] || margins.default;
  return Math.round(basePrice * margin * 100) / 100;
}

// Fonction pour sauvegarder un produit dans Supabase
export async function saveProductToSupabase(product: ScrapedProduct): Promise<SupabaseProduct | null> {
  try {
    // Traduire le titre et la description
    const [titleFr, descriptionFr] = await Promise.all([
      translateText(product.title),
      product.description ? translateText(product.description) : Promise.resolve('')
    ]);

    // Calculer les prix
    const prices = calculatePrices(product.price, product.source);
    const profitMargin = calculateProfitMargin(product.source, prices.price_eur);
    const sellingPrice = prices.price_eur + profitMargin;

    const supabaseProduct: Omit<SupabaseProduct, 'id' | 'created_at' | 'updated_at'> = {
      external_id: product.id,
      title: product.title,
      title_fr: titleFr,
      price: product.price,
      original_price: product.originalPrice,
      price_eur: prices.price_eur,
      price_usd: prices.price_usd,
      price_fcfa: prices.price_fcfa,
      image_url: product.image,
      product_url: product.url,
      source: product.source,
      rating: product.rating,
      reviews_count: product.reviews,
      seller: product.seller,
      location: product.location,
      shipping_info: product.shipping,
      availability: product.availability,
      description: product.description,
      description_fr: descriptionFr,
      category: product.category,
      tags: product.tags,
      profit_margin: profitMargin,
      selling_price: sellingPrice,
      last_scraped: new Date().toISOString(),
      is_active: true
    };

    // Vérifier si le produit existe déjà
    const { data: existingProduct } = await supabase
      .from('scraped_products')
      .select('id')
      .eq('external_id', product.id)
      .eq('source', product.source)
      .single();

    if (existingProduct) {
      // Mettre à jour le produit existant
      const { data, error } = await supabase
        .from('scraped_products')
        .update({
          ...supabaseProduct,
          updated_at: new Date().toISOString(),
          last_scraped: new Date().toISOString()
        })
        .eq('id', existingProduct.id)
        .select()
        .single();

      if (error) {
        console.error('Erreur mise à jour produit:', error);
        return null;
      }

      return data;
    } else {
      // Insérer un nouveau produit
      const { data, error } = await supabase
        .from('scraped_products')
        .insert({
          ...supabaseProduct,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur insertion produit:', error);
        return null;
      }

      return data;
    }
  } catch (error) {
    console.error('Erreur sauvegarde produit:', error);
    return null;
  }
}

// Fonction pour sauvegarder plusieurs produits
export async function saveProductsToSupabase(products: ScrapedProduct[]): Promise<{
  saved: number;
  updated: number;
  errors: number;
  total: number;
}> {
  let saved = 0;
  let updated = 0;
  let errors = 0;

  for (const product of products) {
    try {
      const result = await saveProductToSupabase(product);
      if (result) {
        if (result.created_at === result.updated_at) {
          saved++;
        } else {
          updated++;
        }
      } else {
        errors++;
      }
    } catch (error) {
      console.error('Erreur traitement produit:', error);
      errors++;
    }
  }

  return {
    saved,
    updated,
    errors,
    total: products.length
  };
}

// Fonction pour récupérer les produits depuis Supabase
export async function getProductsFromSupabase(options: {
  source?: string;
  category?: string;
  limit?: number;
  offset?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
} = {}): Promise<{
  products: SupabaseProduct[];
  total: number;
  error?: string;
}> {
  try {
    let query = supabase
      .from('scraped_products')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Filtres
    if (options.source) {
      query = query.eq('source', options.source);
    }
    if (options.category) {
      query = query.eq('category', options.category);
    }
    if (options.minPrice) {
      query = query.gte('price_eur', options.minPrice);
    }
    if (options.maxPrice) {
      query = query.lte('price_eur', options.maxPrice);
    }
    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,title_fr.ilike.%${options.search}%`);
    }

    // Tri par date de mise à jour
    query = query.order('updated_at', { ascending: false });

    // Pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Erreur récupération produits:', error);
      return { products: [], total: 0, error: error.message };
    }

    return {
      products: data || [],
      total: count || 0
    };
  } catch (error) {
    console.error('Erreur récupération produits:', error);
    return { products: [], total: 0, error: 'Erreur serveur' };
  }
}

// Fonction pour obtenir les statistiques
export async function getScrapingStats(): Promise<{
  totalProducts: number;
  productsBySource: { [key: string]: number };
  lastUpdate: string;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('scraped_products')
      .select('source, updated_at')
      .eq('is_active', true);

    if (error) {
      console.error('Erreur statistiques:', error);
      return { totalProducts: 0, productsBySource: {}, lastUpdate: '', error: error.message };
    }

    const productsBySource: { [key: string]: number } = {};
    let lastUpdate = '';

    data?.forEach(product => {
      productsBySource[product.source] = (productsBySource[product.source] || 0) + 1;
      if (!lastUpdate || product.updated_at > lastUpdate) {
        lastUpdate = product.updated_at;
      }
    });

    return {
      totalProducts: data?.length || 0,
      productsBySource,
      lastUpdate
    };
  } catch (error) {
    console.error('Erreur statistiques:', error);
    return { totalProducts: 0, productsBySource: {}, lastUpdate: '', error: 'Erreur serveur' };
  }
} 