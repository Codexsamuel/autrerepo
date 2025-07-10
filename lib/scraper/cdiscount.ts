interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  country?: string;
}

interface CdiscountProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  brand?: string;
  category: string;
  subcategory?: string;
  rating?: number;
  reviews?: number;
  seller: string;
  sellerRating?: number;
  availability: string;
  delivery: string;
  warranty?: string;
  specifications: Record<string, string>;
  tags: string[];
  url: string;
  platform: 'cdiscount';
  scrapedAt: string;
}

// Mock data for Cdiscount products across all categories
const cdiscountProducts: Record<string, CdiscountProduct[]> = {
  vehicles: [
    {
      id: 'cd_veh_001',
      title: 'Scooter électrique Xiaomi Mi Electric Scooter Pro 2',
      price: 449.99,
      originalPrice: 599.99,
      currency: 'EUR',
      image: '/products/cdiscount/xiaomi-scooter.jpg',
      images: [
        '/products/cdiscount/xiaomi-scooter-1.jpg',
        '/products/cdiscount/xiaomi-scooter-2.jpg',
        '/products/cdiscount/xiaomi-scooter-3.jpg'
      ],
      description: 'Scooter électrique Xiaomi Mi Electric Scooter Pro 2 avec autonomie de 45km et vitesse max de 25km/h',
      brand: 'Xiaomi',
      category: 'vehicles',
      subcategory: 'electric-scooters',
      rating: 4.6,
      reviews: 1247,
      seller: 'Cdiscount',
      sellerRating: 4.8,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 24h',
      warranty: '2 ans',
      specifications: {
        'Autonomie': '45km',
        'Vitesse max': '25km/h',
        'Poids': '14.2kg',
        'Temps de charge': '8h',
        'Puissance moteur': '300W'
      },
      tags: ['scooter', 'électrique', 'xiaomi', 'urbain'],
      url: 'https://www.cdiscount.com/scooter-electrique-xiaomi',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'cd_veh_002',
      title: 'Vélo électrique pliable E-TWOW',
      price: 1299.99,
      originalPrice: 1599.99,
      currency: 'EUR',
      image: '/products/cdiscount/etwow-bike.jpg',
      images: [
        '/products/cdiscount/etwow-bike-1.jpg',
        '/products/cdiscount/etwow-bike-2.jpg'
      ],
      description: 'Vélo électrique pliable E-TWOW avec autonomie de 60km et design compact',
      brand: 'E-TWOW',
      category: 'vehicles',
      subcategory: 'electric-bikes',
      rating: 4.4,
      reviews: 567,
      seller: 'Cdiscount',
      sellerRating: 4.7,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '2 ans',
      specifications: {
        'Autonomie': '60km',
        'Vitesse max': '25km/h',
        'Poids': '12kg',
        'Temps de charge': '4h',
        'Puissance moteur': '250W'
      },
      tags: ['vélo', 'électrique', 'pliable', 'compact'],
      url: 'https://www.cdiscount.com/velo-electrique-etwow',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    }
  ],
  furniture: [
    {
      id: 'cd_furn_001',
      title: 'Canapé convertible 3 places avec matelas',
      price: 299.99,
      originalPrice: 449.99,
      currency: 'EUR',
      image: '/products/cdiscount/convertible-sofa.jpg',
      images: [
        '/products/cdiscount/convertible-sofa-1.jpg',
        '/products/cdiscount/convertible-sofa-2.jpg',
        '/products/cdiscount/convertible-sofa-3.jpg'
      ],
      description: 'Canapé convertible 3 places avec matelas intégré, parfait pour les petits espaces',
      brand: 'Maisons du Monde',
      category: 'furniture',
      subcategory: 'sofas',
      rating: 4.3,
      reviews: 892,
      seller: 'Cdiscount',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 72h',
      warranty: '2 ans',
      specifications: {
        'Dimensions': '200x85x75cm',
        'Matériau': 'Tissu polyester',
        'Couleurs': 'Gris, Bleu, Beige',
        'Matelas': 'Inclus',
        'Assemblage': 'Pré-assemblé'
      },
      tags: ['canapé', 'convertible', 'matelas', '3 places'],
      url: 'https://www.cdiscount.com/canape-convertible-3-places',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'cd_furn_002',
      title: 'Table de salle à manger 6 personnes en chêne',
      price: 399.99,
      originalPrice: 599.99,
      currency: 'EUR',
      image: '/products/cdiscount/oak-dining-table.jpg',
      images: [
        '/products/cdiscount/oak-dining-table-1.jpg',
        '/products/cdiscount/oak-dining-table-2.jpg'
      ],
      description: 'Table de salle à manger 6 personnes en chêne massif, design traditionnel',
      brand: 'But',
      category: 'furniture',
      subcategory: 'dining-tables',
      rating: 4.5,
      reviews: 456,
      seller: 'Cdiscount',
      sellerRating: 4.7,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 72h',
      warranty: '3 ans',
      specifications: {
        'Dimensions': '180x90x75cm',
        'Matériau': 'Chêne massif',
        'Capacité': '6 personnes',
        'Garantie': '3 ans',
        'Finition': 'Naturel'
      },
      tags: ['table', 'chêne', 'salle à manger', '6 personnes'],
      url: 'https://www.cdiscount.com/table-salle-manger-chene',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    }
  ],
  electronics: [
    {
      id: 'cd_elec_001',
      title: 'Smartphone Samsung Galaxy A54 5G 128GB',
      price: 349.99,
      originalPrice: 449.99,
      currency: 'EUR',
      image: '/products/cdiscount/samsung-a54.jpg',
      images: [
        '/products/cdiscount/samsung-a54-1.jpg',
        '/products/cdiscount/samsung-a54-2.jpg',
        '/products/cdiscount/samsung-a54-3.jpg'
      ],
      description: 'Smartphone Samsung Galaxy A54 5G avec écran 6.4", appareil photo 50MP et 128GB de stockage',
      brand: 'Samsung',
      category: 'electronics',
      subcategory: 'smartphones',
      rating: 4.7,
      reviews: 2341,
      seller: 'Cdiscount',
      sellerRating: 4.8,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 24h',
      warranty: '2 ans',
      specifications: {
        'Écran': '6.4" Super AMOLED',
        'Processeur': 'Exynos 1380',
        'RAM': '8GB',
        'Stockage': '128GB',
        'Appareil photo': '50MP + 12MP + 5MP'
      },
      tags: ['smartphone', 'samsung', '5g', '128gb'],
      url: 'https://www.cdiscount.com/samsung-galaxy-a54-5g',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'cd_elec_002',
      title: 'Ordinateur portable HP Pavilion 15.6"',
      price: 599.99,
      originalPrice: 799.99,
      currency: 'EUR',
      image: '/products/cdiscount/hp-pavilion.jpg',
      images: [
        '/products/cdiscount/hp-pavilion-1.jpg',
        '/products/cdiscount/hp-pavilion-2.jpg'
      ],
      description: 'Ordinateur portable HP Pavilion 15.6" avec processeur Intel i5 et 512GB SSD',
      brand: 'HP',
      category: 'electronics',
      subcategory: 'laptops',
      rating: 4.4,
      reviews: 678,
      seller: 'Cdiscount',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '2 ans',
      specifications: {
        'Écran': '15.6" Full HD',
        'Processeur': 'Intel Core i5-1235U',
        'RAM': '8GB DDR4',
        'Stockage': '512GB SSD',
        'Système': 'Windows 11'
      },
      tags: ['ordinateur', 'hp', 'intel i5', '512gb'],
      url: 'https://www.cdiscount.com/hp-pavilion-15-6',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'cd_men_001',
      title: 'Costume homme 2 pièces en laine',
      price: 89.99,
      originalPrice: 149.99,
      currency: 'EUR',
      image: '/products/cdiscount/men-suit.jpg',
      images: [
        '/products/cdiscount/men-suit-1.jpg',
        '/products/cdiscount/men-suit-2.jpg',
        '/products/cdiscount/men-suit-3.jpg'
      ],
      description: 'Costume homme 2 pièces en laine de qualité, coupe moderne et élégante',
      brand: 'Devred',
      category: 'men-clothing',
      subcategory: 'suits',
      rating: 4.2,
      reviews: 345,
      seller: 'Cdiscount',
      sellerRating: 4.5,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '1 an',
      specifications: {
        'Matériau': 'Laine 100%',
        'Tailles': 'S, M, L, XL, XXL',
        'Couleurs': 'Noir, Bleu marine, Gris',
        'Entretien': 'Lavage à sec',
        'Garantie': '1 an'
      },
      tags: ['costume', 'laine', '2 pièces', 'élégant'],
      url: 'https://www.cdiscount.com/costume-homme-laine',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'cd_men_002',
      title: 'T-shirt basique en coton bio',
      price: 14.99,
      originalPrice: 24.99,
      currency: 'EUR',
      image: '/products/cdiscount/men-tshirt.jpg',
      images: [
        '/products/cdiscount/men-tshirt-1.jpg',
        '/products/cdiscount/men-tshirt-2.jpg'
      ],
      description: 'T-shirt basique en coton bio, coupe régulière et confortable',
      brand: 'Kiabi',
      category: 'men-clothing',
      subcategory: 'tshirts',
      rating: 4.0,
      reviews: 567,
      seller: 'Cdiscount',
      sellerRating: 4.3,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '6 mois',
      specifications: {
        'Matériau': 'Coton bio 100%',
        'Grammage': '180g/m²',
        'Tailles': 'S, M, L, XL, XXL',
        'Couleurs': 'Blanc, Noir, Gris, Bleu',
        'Entretien': 'Machine 30°C'
      },
      tags: ['t-shirt', 'basique', 'coton bio', 'confortable'],
      url: 'https://www.cdiscount.com/tshirt-homme-coton-bio',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    }
  ],
  'women-clothing': [
    {
      id: 'cd_women_001',
      title: 'Robe cocktail élégante en soie',
      price: 59.99,
      originalPrice: 99.99,
      currency: 'EUR',
      image: '/products/cdiscount/women-dress.jpg',
      images: [
        '/products/cdiscount/women-dress-1.jpg',
        '/products/cdiscount/women-dress-2.jpg',
        '/products/cdiscount/women-dress-3.jpg'
      ],
      description: 'Robe cocktail élégante en soie naturelle, design sophistiqué et féminin',
      brand: 'Promod',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.5,
      reviews: 234,
      seller: 'Cdiscount',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '1 an',
      specifications: {
        'Matériau': 'Soie 100%',
        'Tailles': 'XS, S, M, L, XL',
        'Couleurs': 'Rouge, Noir, Bleu, Rose',
        'Entretien': 'Lavage à la main',
        'Garantie': '1 an'
      },
      tags: ['robe', 'soie', 'cocktail', 'élégante'],
      url: 'https://www.cdiscount.com/robe-cocktail-soie',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'cd_women_002',
      title: 'Jean slim fit stretch',
      price: 39.99,
      originalPrice: 69.99,
      currency: 'EUR',
      image: '/products/cdiscount/women-jeans.jpg',
      images: [
        '/products/cdiscount/women-jeans-1.jpg',
        '/products/cdiscount/women-jeans-2.jpg'
      ],
      description: 'Jean slim fit avec stretch, coupe moderne et confortable',
      brand: 'Camaieu',
      category: 'women-clothing',
      subcategory: 'jeans',
      rating: 4.3,
      reviews: 456,
      seller: 'Cdiscount',
      sellerRating: 4.4,
      availability: 'En stock',
      delivery: 'Livraison gratuite sous 48h',
      warranty: '6 mois',
      specifications: {
        'Matériau': 'Denim 98%, Élasthanne 2%',
        'Tailles': '36, 38, 40, 42, 44',
        'Couleurs': 'Bleu foncé, Bleu clair, Noir, Gris',
        'Entretien': 'Machine 30°C',
        'Garantie': '6 mois'
      },
      tags: ['jean', 'slim fit', 'stretch', 'moderne'],
      url: 'https://www.cdiscount.com/jean-femme-slim-stretch',
      platform: 'cdiscount',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeCdiscount(options: ScrapingOptions): Promise<CdiscountProduct[]> {
  const { category, query, limit = 20, minPrice, maxPrice, sortBy, country = 'FR' } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1800));

    let products = cdiscountProducts[category] || [];

    // Filter by query if provided
    if (query) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by price range
    if (minPrice !== undefined) {
      products = products.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      products = products.filter(product => product.price <= maxPrice);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        // Default: relevance (keep original order)
        break;
    }

    // Limit results
    products = products.slice(0, limit);

    // Add some randomization to simulate real scraping
    products = products.map(product => ({
      ...product,
      price: product.price + (Math.random() - 0.5) * 15, // ±7.5 price variation
      rating: product.rating ? product.rating + (Math.random() - 0.5) * 0.15 : undefined,
      reviews: product.reviews ? Math.floor(product.reviews + (Math.random() - 0.5) * 30) : undefined,
      scrapedAt: new Date().toISOString()
    }));

    return products;

  } catch (error) {
    console.error('Cdiscount scraping error:', error);
    return [];
  }
} 