interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  country?: string;
}

interface EbayProduct {
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
  sellerFeedback: number;
  condition: string;
  shipping: string;
  location: string;
  bids?: number;
  timeLeft?: string;
  specifications: Record<string, string>;
  tags: string[];
  url: string;
  platform: 'ebay';
  scrapedAt: string;
}

// Mock data for eBay products across all categories
const ebayProducts: Record<string, EbayProduct[]> = {
  vehicles: [
    {
      id: 'ebay_veh_001',
      title: 'Scooter électrique Xiaomi Mi Electric Scooter 1S',
      price: 299.99,
      originalPrice: 399.99,
      currency: 'EUR',
      image: '/products/ebay/xiaomi-scooter-1s.jpg',
      images: [
        '/products/ebay/xiaomi-scooter-1s-1.jpg',
        '/products/ebay/xiaomi-scooter-1s-2.jpg'
      ],
      description: 'Scooter électrique Xiaomi Mi Electric Scooter 1S en excellent état',
      brand: 'Xiaomi',
      category: 'vehicles',
      subcategory: 'electric-scooters',
      rating: 4.5,
      reviews: 234,
      seller: 'tech_seller_2023',
      sellerRating: 4.8,
      sellerFeedback: 98.5,
      condition: 'Occasion - Excellent état',
      shipping: 'Livraison gratuite',
      location: 'Paris, France',
      specifications: {
        'Autonomie': '30km',
        'Vitesse max': '25km/h',
        'Poids': '12.5kg',
        'Temps de charge': '5h',
        'Puissance moteur': '250W'
      },
      tags: ['scooter', 'électrique', 'xiaomi', 'occasion'],
      url: 'https://www.ebay.fr/xiaomi-scooter-1s',
      platform: 'ebay',
      scrapedAt: new Date().toISOString()
    }
  ],
  furniture: [
    {
      id: 'ebay_furn_001',
      title: 'Canapé vintage années 70 en cuir',
      price: 450.00,
      originalPrice: 650.00,
      currency: 'EUR',
      image: '/products/ebay/vintage-leather-sofa.jpg',
      images: [
        '/products/ebay/vintage-leather-sofa-1.jpg',
        '/products/ebay/vintage-leather-sofa-2.jpg'
      ],
      description: 'Canapé vintage années 70 en cuir authentique, pièce unique',
      brand: 'Vintage',
      category: 'furniture',
      subcategory: 'sofas',
      rating: 4.7,
      reviews: 89,
      seller: 'vintage_collector',
      sellerRating: 4.9,
      sellerFeedback: 99.2,
      condition: 'Occasion - Bon état',
      shipping: 'Livraison 50€',
      location: 'Lyon, France',
      specifications: {
        'Dimensions': '180x85x75cm',
        'Matériau': 'Cuir authentique',
        'Style': 'Vintage années 70',
        'Couleur': 'Marron',
        'État': 'Bon état'
      },
      tags: ['canapé', 'vintage', 'cuir', 'années 70'],
      url: 'https://www.ebay.fr/canape-vintage-cuir-70s',
      platform: 'ebay',
      scrapedAt: new Date().toISOString()
    }
  ],
  electronics: [
    {
      id: 'ebay_elec_001',
      title: 'iPhone 14 Pro 256GB Deep Purple',
      price: 899.99,
      originalPrice: 1199.99,
      currency: 'EUR',
      image: '/products/ebay/iphone-14-pro.jpg',
      images: [
        '/products/ebay/iphone-14-pro-1.jpg',
        '/products/ebay/iphone-14-pro-2.jpg',
        '/products/ebay/iphone-14-pro-3.jpg'
      ],
      description: 'iPhone 14 Pro 256GB Deep Purple, comme neuf avec garantie',
      brand: 'Apple',
      category: 'electronics',
      subcategory: 'smartphones',
      rating: 4.8,
      reviews: 567,
      seller: 'mobile_expert',
      sellerRating: 4.9,
      sellerFeedback: 99.8,
      condition: 'Occasion - Comme neuf',
      shipping: 'Livraison gratuite',
      location: 'Marseille, France',
      specifications: {
        'Écran': '6.1" Super Retina XDR',
        'Processeur': 'A16 Bionic',
        'RAM': '6GB',
        'Stockage': '256GB',
        'Appareil photo': '48MP + 12MP + 12MP'
      },
      tags: ['iphone', 'apple', '14 pro', 'deep purple'],
      url: 'https://www.ebay.fr/iphone-14-pro-256gb',
      platform: 'ebay',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'ebay_men_001',
      title: 'Costume Tom Ford en laine italienne',
      price: 299.99,
      originalPrice: 899.99,
      currency: 'EUR',
      image: '/products/ebay/tom-ford-suit.jpg',
      images: [
        '/products/ebay/tom-ford-suit-1.jpg',
        '/products/ebay/tom-ford-suit-2.jpg'
      ],
      description: 'Costume Tom Ford en laine italienne, taille 42R, excellent état',
      brand: 'Tom Ford',
      category: 'men-clothing',
      subcategory: 'suits',
      rating: 4.6,
      reviews: 123,
      seller: 'luxury_fashion',
      sellerRating: 4.8,
      sellerFeedback: 98.9,
      condition: 'Occasion - Excellent état',
      shipping: 'Livraison 15€',
      location: 'Nice, France',
      specifications: {
        'Matériau': 'Laine italienne 100%',
        'Taille': '42R',
        'Couleur': 'Charcoal',
        'Marque': 'Tom Ford',
        'État': 'Excellent état'
      },
      tags: ['costume', 'tom ford', 'laine italienne', 'luxe'],
      url: 'https://www.ebay.fr/costume-tom-ford-italien',
      platform: 'ebay',
      scrapedAt: new Date().toISOString()
    }
  ],
  'women-clothing': [
    {
      id: 'ebay_women_001',
      title: 'Robe Chanel vintage années 90',
      price: 1200.00,
      originalPrice: 2500.00,
      currency: 'EUR',
      image: '/products/ebay/chanel-vintage-dress.jpg',
      images: [
        '/products/ebay/chanel-vintage-dress-1.jpg',
        '/products/ebay/chanel-vintage-dress-2.jpg'
      ],
      description: 'Robe Chanel vintage années 90, pièce collector en excellent état',
      brand: 'Chanel',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.9,
      reviews: 45,
      seller: 'luxury_collector',
      sellerRating: 4.9,
      sellerFeedback: 99.5,
      condition: 'Occasion - Excellent état',
      shipping: 'Livraison 25€',
      location: 'Bordeaux, France',
      specifications: {
        'Matériau': 'Soie 100%',
        'Taille': 'FR 38',
        'Couleur': 'Noir',
        'Marque': 'Chanel',
        'Période': 'Années 90'
      },
      tags: ['robe', 'chanel', 'vintage', 'collector'],
      url: 'https://www.ebay.fr/robe-chanel-vintage-90s',
      platform: 'ebay',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeEbay(options: ScrapingOptions): Promise<EbayProduct[]> {
  const { category, query, limit = 20, minPrice, maxPrice, sortBy, country = 'FR' } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));

    let products = ebayProducts[category] || [];

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
      price: product.price + (Math.random() - 0.5) * 25, // ±12.5 price variation
      rating: product.rating ? product.rating + (Math.random() - 0.5) * 0.1 : undefined,
      reviews: product.reviews ? Math.floor(product.reviews + (Math.random() - 0.5) * 20) : undefined,
      scrapedAt: new Date().toISOString()
    }));

    return products;

  } catch (error) {
    console.error('eBay scraping error:', error);
    return [];
  }
} 