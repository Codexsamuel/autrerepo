interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

interface AlibabaProduct {
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
  location: string;
  shipping: string;
  minOrder: number;
  stock: number;
  tags: string[];
  specifications: Record<string, string>;
  url: string;
  platform: 'alibaba';
  scrapedAt: string;
}

// Mock data for Alibaba products across all categories
const alibabaProducts: Record<string, AlibabaProduct[]> = {
  vehicles: [
    {
      id: 'alb_veh_001',
      title: 'Voiture électrique compacte 4 places',
      price: 8500,
      originalPrice: 12000,
      currency: 'USD',
      image: '/products/alibaba/electric-car.jpg',
      images: [
        '/products/alibaba/electric-car-1.jpg',
        '/products/alibaba/electric-car-2.jpg',
        '/products/alibaba/electric-car-3.jpg'
      ],
      description: 'Voiture électrique compacte moderne avec autonomie de 300km, idéale pour la ville',
      brand: 'GreenDrive',
      category: 'vehicles',
      subcategory: 'electric-cars',
      rating: 4.6,
      reviews: 234,
      seller: 'GreenDrive Motors Co.',
      sellerRating: 4.8,
      location: 'Shenzhen, China',
      shipping: 'FOB Shenzhen',
      minOrder: 1,
      stock: 50,
      tags: ['électrique', 'compacte', '4 places', 'autonomie 300km'],
      specifications: {
        'Autonomie': '300km',
        'Puissance': '80kW',
        'Vitesse max': '120km/h',
        'Temps de charge': '6h',
        'Garantie': '3 ans'
      },
      url: 'https://www.alibaba.com/product-detail/electric-car-compact',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'alb_veh_002',
      title: 'Scooter électrique pliable',
      price: 450,
      originalPrice: 650,
      currency: 'USD',
      image: '/products/alibaba/electric-scooter.jpg',
      images: [
        '/products/alibaba/electric-scooter-1.jpg',
        '/products/alibaba/electric-scooter-2.jpg'
      ],
      description: 'Scooter électrique pliable avec autonomie de 50km, parfait pour les trajets urbains',
      brand: 'UrbanRide',
      category: 'vehicles',
      subcategory: 'electric-scooters',
      rating: 4.4,
      reviews: 567,
      seller: 'Urban Mobility Solutions',
      sellerRating: 4.7,
      location: 'Guangzhou, China',
      shipping: 'FOB Guangzhou',
      minOrder: 10,
      stock: 200,
      tags: ['pliable', 'électrique', 'urbain', 'autonomie 50km'],
      specifications: {
        'Autonomie': '50km',
        'Vitesse max': '25km/h',
        'Poids': '12kg',
        'Temps de charge': '4h',
        'Garantie': '1 an'
      },
      url: 'https://www.alibaba.com/product-detail/electric-scooter-foldable',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    }
  ],
  furniture: [
    {
      id: 'alb_furn_001',
      title: 'Canapé moderne 3 places en cuir synthétique',
      price: 280,
      originalPrice: 420,
      currency: 'USD',
      image: '/products/alibaba/leather-sofa.jpg',
      images: [
        '/products/alibaba/leather-sofa-1.jpg',
        '/products/alibaba/leather-sofa-2.jpg',
        '/products/alibaba/leather-sofa-3.jpg'
      ],
      description: 'Canapé moderne 3 places en cuir synthétique de haute qualité, design contemporain',
      brand: 'ModernHome',
      category: 'furniture',
      subcategory: 'sofas',
      rating: 4.5,
      reviews: 189,
      seller: 'Modern Home Furniture Co.',
      sellerRating: 4.6,
      location: 'Foshan, China',
      shipping: 'FOB Foshan',
      minOrder: 5,
      stock: 100,
      tags: ['canapé', 'cuir', 'moderne', '3 places'],
      specifications: {
        'Dimensions': '200x85x75cm',
        'Matériau': 'Cuir synthétique',
        'Couleurs': 'Noir, Marron, Gris',
        'Garantie': '2 ans',
        'Assemblage': 'Pré-assemblé'
      },
      url: 'https://www.alibaba.com/product-detail/leather-sofa-modern',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'alb_furn_002',
      title: 'Table de salle à manger extensible en bois massif',
      price: 320,
      originalPrice: 480,
      currency: 'USD',
      image: '/products/alibaba/dining-table.jpg',
      images: [
        '/products/alibaba/dining-table-1.jpg',
        '/products/alibaba/dining-table-2.jpg'
      ],
      description: 'Table de salle à manger extensible en bois massif, 6-8 personnes',
      brand: 'WoodCraft',
      category: 'furniture',
      subcategory: 'dining-tables',
      rating: 4.7,
      reviews: 234,
      seller: 'WoodCraft Furniture Ltd.',
      sellerRating: 4.8,
      location: 'Dongguan, China',
      shipping: 'FOB Dongguan',
      minOrder: 3,
      stock: 75,
      tags: ['table', 'bois massif', 'extensible', 'salle à manger'],
      specifications: {
        'Dimensions': '180x90x75cm (extensible à 240cm)',
        'Matériau': 'Bois massif',
        'Capacité': '6-8 personnes',
        'Garantie': '3 ans',
        'Finition': 'Naturel'
      },
      url: 'https://www.alibaba.com/product-detail/dining-table-wood',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'alb_men_001',
      title: 'Costume homme 3 pièces en laine',
      price: 85,
      originalPrice: 150,
      currency: 'USD',
      image: '/products/alibaba/men-suit.jpg',
      images: [
        '/products/alibaba/men-suit-1.jpg',
        '/products/alibaba/men-suit-2.jpg',
        '/products/alibaba/men-suit-3.jpg'
      ],
      description: 'Costume homme 3 pièces en laine de qualité, coupe moderne et élégante',
      brand: 'EliteStyle',
      category: 'men-clothing',
      subcategory: 'suits',
      rating: 4.6,
      reviews: 456,
      seller: 'Elite Fashion Garments',
      sellerRating: 4.7,
      location: 'Hangzhou, China',
      shipping: 'FOB Hangzhou',
      minOrder: 20,
      stock: 500,
      tags: ['costume', 'laine', '3 pièces', 'élégant'],
      specifications: {
        'Matériau': 'Laine 100%',
        'Tailles': 'S, M, L, XL, XXL',
        'Couleurs': 'Noir, Bleu marine, Gris',
        'Entretien': 'Lavage à sec',
        'Garantie': '1 an'
      },
      url: 'https://www.alibaba.com/product-detail/men-suit-wool',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'alb_men_002',
      title: 'T-shirt premium en coton bio',
      price: 8.5,
      originalPrice: 15,
      currency: 'USD',
      image: '/products/alibaba/men-tshirt.jpg',
      images: [
        '/products/alibaba/men-tshirt-1.jpg',
        '/products/alibaba/men-tshirt-2.jpg'
      ],
      description: 'T-shirt premium en coton bio, coupe régulière, confortable et durable',
      brand: 'EcoWear',
      category: 'men-clothing',
      subcategory: 'tshirts',
      rating: 4.4,
      reviews: 789,
      seller: 'EcoWear Textiles',
      sellerRating: 4.5,
      location: 'Shaoxing, China',
      shipping: 'FOB Shaoxing',
      minOrder: 100,
      stock: 2000,
      tags: ['t-shirt', 'coton bio', 'premium', 'confortable'],
      specifications: {
        'Matériau': 'Coton bio 100%',
        'Grammage': '180g/m²',
        'Tailles': 'S, M, L, XL, XXL',
        'Couleurs': 'Blanc, Noir, Gris, Bleu',
        'Entretien': 'Machine 30°C'
      },
      url: 'https://www.alibaba.com/product-detail/men-tshirt-cotton',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    }
  ],
  'women-clothing': [
    {
      id: 'alb_women_001',
      title: 'Robe cocktail élégante en soie',
      price: 45,
      originalPrice: 80,
      currency: 'USD',
      image: '/products/alibaba/women-dress.jpg',
      images: [
        '/products/alibaba/women-dress-1.jpg',
        '/products/alibaba/women-dress-2.jpg',
        '/products/alibaba/women-dress-3.jpg'
      ],
      description: 'Robe cocktail élégante en soie naturelle, design sophistiqué et féminin',
      brand: 'SilkElegance',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.8,
      reviews: 345,
      seller: 'SilkElegance Fashion',
      sellerRating: 4.9,
      location: 'Suzhou, China',
      shipping: 'FOB Suzhou',
      minOrder: 15,
      stock: 300,
      tags: ['robe', 'soie', 'cocktail', 'élégante'],
      specifications: {
        'Matériau': 'Soie 100%',
        'Tailles': 'XS, S, M, L, XL',
        'Couleurs': 'Rouge, Noir, Bleu, Rose',
        'Entretien': 'Lavage à la main',
        'Garantie': '1 an'
      },
      url: 'https://www.alibaba.com/product-detail/women-dress-silk',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'alb_women_002',
      title: 'Blouse professionnelle en polyester',
      price: 12,
      originalPrice: 22,
      currency: 'USD',
      image: '/products/alibaba/women-blouse.jpg',
      images: [
        '/products/alibaba/women-blouse-1.jpg',
        '/products/alibaba/women-blouse-2.jpg'
      ],
      description: 'Blouse professionnelle en polyester de qualité, coupe moderne et confortable',
      brand: 'OfficeStyle',
      category: 'women-clothing',
      subcategory: 'blouses',
      rating: 4.3,
      reviews: 567,
      seller: 'OfficeStyle Garments',
      sellerRating: 4.4,
      location: 'Ningbo, China',
      shipping: 'FOB Ningbo',
      minOrder: 50,
      stock: 800,
      tags: ['blouse', 'professionnelle', 'polyester', 'moderne'],
      specifications: {
        'Matériau': 'Polyester 95%, Élasthanne 5%',
        'Tailles': 'XS, S, M, L, XL, XXL',
        'Couleurs': 'Blanc, Bleu, Rose, Gris',
        'Entretien': 'Machine 30°C',
        'Garantie': '6 mois'
      },
      url: 'https://www.alibaba.com/product-detail/women-blouse-polyester',
      platform: 'alibaba',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeAlibaba(options: ScrapingOptions): Promise<AlibabaProduct[]> {
  const { category, query, limit = 20, minPrice, maxPrice, sortBy } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let products = alibabaProducts[category] || [];

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
      price: product.price + (Math.random() - 0.5) * 10, // ±5 price variation
      rating: product.rating ? product.rating + (Math.random() - 0.5) * 0.2 : undefined,
      reviews: product.reviews ? Math.floor(product.reviews + (Math.random() - 0.5) * 50) : undefined,
      scrapedAt: new Date().toISOString()
    }));

    return products;

  } catch (error) {
    console.error('Alibaba scraping error:', error);
    return [];
  }
} 