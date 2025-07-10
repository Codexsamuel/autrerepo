interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  country?: string;
}

interface AmazonProduct {
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
  prime: boolean;
  warranty?: string;
  specifications: Record<string, string>;
  tags: string[];
  url: string;
  platform: 'amazon';
  scrapedAt: string;
}

// Mock data for Amazon products across all categories
const amazonProducts: Record<string, AmazonProduct[]> = {
  vehicles: [
    {
      id: 'amz_veh_001',
      title: 'Segway Ninebot MAX G30P Scooter électrique',
      price: 799.99,
      originalPrice: 999.99,
      currency: 'EUR',
      image: '/products/amazon/segway-scooter.jpg',
      images: [
        '/products/amazon/segway-scooter-1.jpg',
        '/products/amazon/segway-scooter-2.jpg',
        '/products/amazon/segway-scooter-3.jpg'
      ],
      description: 'Scooter électrique Segway Ninebot MAX G30P avec autonomie de 65km et vitesse max de 30km/h',
      brand: 'Segway',
      category: 'vehicles',
      subcategory: 'electric-scooters',
      rating: 4.7,
      reviews: 2847,
      seller: 'Amazon',
      sellerRating: 4.9,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '2 ans',
      specifications: {
        'Autonomie': '65km',
        'Vitesse max': '30km/h',
        'Poids': '19.1kg',
        'Temps de charge': '6h',
        'Puissance moteur': '350W'
      },
      tags: ['scooter', 'électrique', 'segway', 'urbain'],
      url: 'https://www.amazon.fr/segway-ninebot-max-g30p',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    }
  ],
  furniture: [
    {
      id: 'amz_furn_001',
      title: 'Canapé convertible 2 places avec matelas',
      price: 249.99,
      originalPrice: 399.99,
      currency: 'EUR',
      image: '/products/amazon/convertible-sofa.jpg',
      images: [
        '/products/amazon/convertible-sofa-1.jpg',
        '/products/amazon/convertible-sofa-2.jpg'
      ],
      description: 'Canapé convertible 2 places avec matelas intégré, parfait pour les petits espaces',
      brand: 'Amazon Basics',
      category: 'furniture',
      subcategory: 'sofas',
      rating: 4.2,
      reviews: 1247,
      seller: 'Amazon',
      sellerRating: 4.8,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '2 ans',
      specifications: {
        'Dimensions': '180x85x75cm',
        'Matériau': 'Tissu polyester',
        'Couleurs': 'Gris, Bleu, Beige',
        'Matelas': 'Inclus',
        'Assemblage': 'Pré-assemblé'
      },
      tags: ['canapé', 'convertible', 'matelas', '2 places'],
      url: 'https://www.amazon.fr/canape-convertible-2-places',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    }
  ],
  electronics: [
    {
      id: 'amz_elec_001',
      title: 'iPhone 15 Pro 128GB Titanium',
      price: 1149.99,
      originalPrice: 1299.99,
      currency: 'EUR',
      image: '/products/amazon/iphone-15-pro.jpg',
      images: [
        '/products/amazon/iphone-15-pro-1.jpg',
        '/products/amazon/iphone-15-pro-2.jpg',
        '/products/amazon/iphone-15-pro-3.jpg'
      ],
      description: 'iPhone 15 Pro 128GB en titane avec puce A17 Pro et appareil photo professionnel',
      brand: 'Apple',
      category: 'electronics',
      subcategory: 'smartphones',
      rating: 4.8,
      reviews: 3456,
      seller: 'Amazon',
      sellerRating: 4.9,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '2 ans',
      specifications: {
        'Écran': '6.1" Super Retina XDR',
        'Processeur': 'A17 Pro',
        'RAM': '8GB',
        'Stockage': '128GB',
        'Appareil photo': '48MP + 12MP + 12MP'
      },
      tags: ['iphone', 'apple', 'pro', 'titanium'],
      url: 'https://www.amazon.fr/iphone-15-pro-128gb',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'amz_elec_002',
      title: 'MacBook Air M2 13.6" 256GB',
      price: 1199.99,
      originalPrice: 1399.99,
      currency: 'EUR',
      image: '/products/amazon/macbook-air-m2.jpg',
      images: [
        '/products/amazon/macbook-air-m2-1.jpg',
        '/products/amazon/macbook-air-m2-2.jpg'
      ],
      description: 'MacBook Air M2 13.6" avec puce M2, 256GB SSD et 18h d\'autonomie',
      brand: 'Apple',
      category: 'electronics',
      subcategory: 'laptops',
      rating: 4.9,
      reviews: 2341,
      seller: 'Amazon',
      sellerRating: 4.9,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '2 ans',
      specifications: {
        'Écran': '13.6" Liquid Retina',
        'Processeur': 'M2',
        'RAM': '8GB',
        'Stockage': '256GB SSD',
        'Système': 'macOS Ventura'
      },
      tags: ['macbook', 'apple', 'm2', 'air'],
      url: 'https://www.amazon.fr/macbook-air-m2-13-6',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'amz_men_001',
      title: 'Costume homme 3 pièces en laine',
      price: 129.99,
      originalPrice: 199.99,
      currency: 'EUR',
      image: '/products/amazon/men-suit.jpg',
      images: [
        '/products/amazon/men-suit-1.jpg',
        '/products/amazon/men-suit-2.jpg',
        '/products/amazon/men-suit-3.jpg'
      ],
      description: 'Costume homme 3 pièces en laine de qualité, coupe moderne et élégante',
      brand: 'Amazon Essentials',
      category: 'men-clothing',
      subcategory: 'suits',
      rating: 4.3,
      reviews: 567,
      seller: 'Amazon',
      sellerRating: 4.7,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '1 an',
      specifications: {
        'Matériau': 'Laine 100%',
        'Tailles': 'S, M, L, XL, XXL',
        'Couleurs': 'Noir, Bleu marine, Gris',
        'Entretien': 'Lavage à sec',
        'Garantie': '1 an'
      },
      tags: ['costume', 'laine', '3 pièces', 'élégant'],
      url: 'https://www.amazon.fr/costume-homme-3-pieces',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    }
  ],
  'women-clothing': [
    {
      id: 'amz_women_001',
      title: 'Robe cocktail élégante en soie',
      price: 89.99,
      originalPrice: 149.99,
      currency: 'EUR',
      image: '/products/amazon/women-dress.jpg',
      images: [
        '/products/amazon/women-dress-1.jpg',
        '/products/amazon/women-dress-2.jpg',
        '/products/amazon/women-dress-3.jpg'
      ],
      description: 'Robe cocktail élégante en soie naturelle, design sophistiqué et féminin',
      brand: 'Amazon Essentials',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.4,
      reviews: 345,
      seller: 'Amazon',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison gratuite demain',
      prime: true,
      warranty: '1 an',
      specifications: {
        'Matériau': 'Soie 100%',
        'Tailles': 'XS, S, M, L, XL',
        'Couleurs': 'Rouge, Noir, Bleu, Rose',
        'Entretien': 'Lavage à la main',
        'Garantie': '1 an'
      },
      tags: ['robe', 'soie', 'cocktail', 'élégante'],
      url: 'https://www.amazon.fr/robe-cocktail-soie',
      platform: 'amazon',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeAmazon(options: ScrapingOptions): Promise<AmazonProduct[]> {
  const { category, query, limit = 20, minPrice, maxPrice, sortBy, country = 'FR' } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let products = amazonProducts[category] || [];

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
      price: product.price + (Math.random() - 0.5) * 20, // ±10 price variation
      rating: product.rating ? product.rating + (Math.random() - 0.5) * 0.1 : undefined,
      reviews: product.reviews ? Math.floor(product.reviews + (Math.random() - 0.5) * 50) : undefined,
      scrapedAt: new Date().toISOString()
    }));

    return products;

  } catch (error) {
    console.error('Amazon scraping error:', error);
    return [];
  }
} 