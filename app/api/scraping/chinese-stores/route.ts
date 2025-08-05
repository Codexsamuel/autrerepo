export const revalidate = false;
import { getScrapingStats } from '@/lib/scraper/chinese-stores';
import { Product } from '@/lib/scraper/multi-markets';
import { NextRequest, NextResponse } from 'next/server';

// Fonction pour convertir ScrapedProduct en Product
function convertToProduct(scrapedProduct: any): Product {
  // Fonction pour convertir le pays en market
  const getMarketFromCountry = (country: string): 'china' | 'dubai' | 'turkey' | 'cameroon' => {
    const countryMap: Record<string, 'china' | 'dubai' | 'turkey' | 'cameroon'> = {
      'Chine': 'china',
      'Dubaï': 'dubai',
      'Turquie': 'turkey',
      'Cameroun': 'cameroon',
      'France': 'china' // Utiliser 'china' comme valeur par défaut pour la France
    };
    return countryMap[country] || 'china';
  };

  return {
    id: scrapedProduct.id,
    name: scrapedProduct.name,
    description: scrapedProduct.description,
    originalPrice: scrapedProduct.originalPrice,
    sellingPrice: scrapedProduct.sellingPrice,
    currency: scrapedProduct.currency,
    images: [scrapedProduct.image], // Convertir image en images array
    category: scrapedProduct.category,
    market: getMarketFromCountry(scrapedProduct.country),
    supplier: {
      name: scrapedProduct.supplier,
      contact: '',
      location: scrapedProduct.country
    },
    specifications: scrapedProduct.specifications || {},
    shippingOptions: scrapedProduct.shippingOptions || {
      withCustoms: true,
      withTransport: true
    },
    stock: scrapedProduct.stock || 0,
    rating: scrapedProduct.rating || 0,
    reviews: scrapedProduct.reviews || 0,
    createdAt: new Date()
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const country = searchParams.get('country') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const sortBy = searchParams.get('sortBy') || 'relevance';

    // Gestion des différentes actions
    switch (action) {
      case 'stats':
        const stats = getScrapingStats();
        return NextResponse.json({
          success: true,
          data: stats
        });

      case 'categories':
        const categories = ['Véhicules', 'Électronique', 'Mode', 'Accessoires', 'Maison', 'Sport'];
        return NextResponse.json({
          success: true,
          data: categories
        });

      case 'sources':
        const sources = ['Chine', 'Dubaï', 'Turquie', 'Cameroun'];
        return NextResponse.json({
          success: true,
          data: sources
        });

      case 'countries':
        const countries = ['Chine', 'Dubaï', 'Turquie', 'Cameroun'];
        return NextResponse.json({
          success: true,
          data: countries
        });

      default:
        // Recherche de produits avec filtres
        let filteredProducts = getSampleProducts();

        // Filtre par recherche
        if (query) {
          filteredProducts = filteredProducts.filter(product =>
            product.name?.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Filtre par catégorie
        if (category) {
          filteredProducts = filteredProducts.filter(product =>
            product.category?.toLowerCase().includes(category.toLowerCase())
          );
        }

        // Filtre par pays
        if (country && country !== 'all') {
          filteredProducts = filteredProducts.filter(product =>
            product.country === country
          );
        }

        // Filtre par prix
        if (minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.sellingPrice >= minPrice
          );
        }

        if (maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.sellingPrice <= maxPrice
          );
        }

        // Tri
        switch (sortBy) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          default:
            // Tri par pertinence (par défaut)
            break;
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // Conversion en format Product
        const products = paginatedProducts.map(convertToProduct);

        return NextResponse.json({
          success: true,
          data: products,
          pagination: {
            page,
            limit,
            total: filteredProducts.length,
            totalPages: Math.ceil(filteredProducts.length / limit)
          },
          filters: {
            query,
            category,
            country,
            minPrice,
            maxPrice,
            sortBy
          }
        });
    }

  } catch (error) {
    console.error('Erreur API scraping chinese-stores:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Fonction pour générer des produits d'exemple
function getSampleProducts() {
  return [
    {
      id: '1',
      name: 'Voiture Électrique Tesla Model 3',
      description: 'Voiture électrique premium avec autonomie de 500km',
      originalPrice: 45000,
      sellingPrice: 42000,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      category: 'Véhicules',
      country: 'Chine',
      supplier: 'Tesla Motors',
      specifications: { 'Autonomie': '500km', 'Puissance': '350kW' },
      stock: 5,
      rating: 4.8,
      reviews: 1250,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone Apple dernière génération avec caméra pro',
      originalPrice: 1200,
      sellingPrice: 1100,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Électronique',
      country: 'Dubaï',
      supplier: 'Apple Store',
      specifications: { 'Écran': '6.7"', 'Stockage': '256GB' },
      stock: 25,
      rating: 4.9,
      reviews: 3200,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Sac à Main Louis Vuitton',
      description: 'Sac de luxe authentique en cuir premium',
      originalPrice: 2500,
      sellingPrice: 2200,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      category: 'Mode',
      country: 'France',
      supplier: 'Louis Vuitton',
      specifications: { 'Matériau': 'Cuir', 'Couleur': 'Marron' },
      stock: 3,
      rating: 4.7,
      reviews: 890,
      createdAt: new Date('2024-01-05')
    },
    {
      id: '4',
      name: 'Montre Rolex Submariner',
      description: 'Montre de luxe automatique étanche',
      originalPrice: 8500,
      sellingPrice: 7800,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
      category: 'Accessoires',
      country: 'Suisse',
      supplier: 'Rolex',
      specifications: { 'Mouvement': 'Automatique', 'Étanchéité': '300m' },
      stock: 1,
      rating: 4.9,
      reviews: 567,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '5',
      name: 'Ordinateur Portable MacBook Pro',
      description: 'Ordinateur portable professionnel Apple M2',
      originalPrice: 2000,
      sellingPrice: 1850,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Électronique',
      country: 'Chine',
      supplier: 'Apple',
      specifications: { 'Processeur': 'M2', 'RAM': '16GB' },
      stock: 12,
      rating: 4.8,
      reviews: 2100,
      createdAt: new Date('2024-01-12')
    },
    {
      id: '6',
      name: 'Vélo Électrique Premium',
      description: 'Vélo électrique urbain avec assistance pédalage',
      originalPrice: 1800,
      sellingPrice: 1650,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
      category: 'Véhicules',
      country: 'Turquie',
      supplier: 'E-Bike Pro',
      specifications: { 'Autonomie': '80km', 'Vitesse': '25km/h' },
      stock: 8,
      rating: 4.6,
      reviews: 445,
      createdAt: new Date('2024-01-08')
    }
  ];
} 