interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

interface SheinProduct {
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
  sizes: string[];
  colors: string[];
  material: string;
  care: string;
  tags: string[];
  url: string;
  platform: 'shein';
  scrapedAt: string;
}

// Mock data for Shein products
const sheinProducts: Record<string, SheinProduct[]> = {
  'women-clothing': [
    {
      id: 'shein_women_001',
      title: 'Robe d\'été fleurie avec fentes latérales',
      price: 25.99,
      originalPrice: 45.99,
      currency: 'EUR',
      image: '/products/shein/floral-dress.jpg',
      images: [
        '/products/shein/floral-dress-1.jpg',
        '/products/shein/floral-dress-2.jpg',
        '/products/shein/floral-dress-3.jpg',
        '/products/shein/floral-dress-4.jpg'
      ],
      description: 'Robe d\'été élégante avec motif floral, fentes latérales et coupe ajustée',
      brand: 'SHEIN',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.3,
      reviews: 1247,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Bleu floral', 'Rose floral', 'Vert floral'],
      material: 'Polyester 95%, Élasthanne 5%',
      care: 'Lavage machine 30°C, Ne pas repasser',
      tags: ['robe', 'été', 'floral', 'fentes', 'ajustée'],
      url: 'https://www.shein.com/floral-dress-summer',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_women_002',
      title: 'Blouse chemise en coton avec col',
      price: 18.99,
      originalPrice: 32.99,
      currency: 'EUR',
      image: '/products/shein/cotton-blouse.jpg',
      images: [
        '/products/shein/cotton-blouse-1.jpg',
        '/products/shein/cotton-blouse-2.jpg',
        '/products/shein/cotton-blouse-3.jpg'
      ],
      description: 'Blouse chemise en coton de qualité, col classique et coupe régulière',
      brand: 'SHEIN',
      category: 'women-clothing',
      subcategory: 'blouses',
      rating: 4.1,
      reviews: 892,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blanc', 'Bleu clair', 'Rose poudré', 'Gris'],
      material: 'Coton 100%',
      care: 'Lavage machine 30°C, Repassage à température moyenne',
      tags: ['blouse', 'coton', 'col', 'professionnelle'],
      url: 'https://www.shein.com/cotton-blouse-collar',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_women_003',
      title: 'Jean mom fit haute taille',
      price: 32.99,
      originalPrice: 55.99,
      currency: 'EUR',
      image: '/products/shein/mom-jeans.jpg',
      images: [
        '/products/shein/mom-jeans-1.jpg',
        '/products/shein/mom-jeans-2.jpg',
        '/products/shein/mom-jeans-3.jpg'
      ],
      description: 'Jean mom fit haute taille, coupe rétro et confortable',
      brand: 'SHEIN',
      category: 'women-clothing',
      subcategory: 'jeans',
      rating: 4.5,
      reviews: 1567,
      sizes: ['25', '26', '27', '28', '29', '30', '31', '32'],
      colors: ['Bleu clair', 'Bleu foncé', 'Noir'],
      material: 'Denim 98%, Élasthanne 2%',
      care: 'Lavage machine 30°C, Ne pas repasser',
      tags: ['jean', 'mom fit', 'haute taille', 'rétro'],
      url: 'https://www.shein.com/mom-jeans-high-waist',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_women_004',
      title: 'T-shirt basique en coton bio',
      price: 12.99,
      originalPrice: 19.99,
      currency: 'EUR',
      image: '/products/shein/basic-tshirt.jpg',
      images: [
        '/products/shein/basic-tshirt-1.jpg',
        '/products/shein/basic-tshirt-2.jpg'
      ],
      description: 'T-shirt basique en coton bio, coupe régulière et confortable',
      brand: 'SHEIN',
      category: 'women-clothing',
      subcategory: 'tshirts',
      rating: 4.2,
      reviews: 2341,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blanc', 'Noir', 'Gris', 'Rose', 'Bleu'],
      material: 'Coton bio 100%',
      care: 'Lavage machine 30°C, Repassage à température moyenne',
      tags: ['t-shirt', 'basique', 'coton bio', 'confortable'],
      url: 'https://www.shein.com/basic-tshirt-cotton',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'shein_men_001',
      title: 'T-shirt graphique avec motif',
      price: 15.99,
      originalPrice: 28.99,
      currency: 'EUR',
      image: '/products/shein/graphic-tshirt.jpg',
      images: [
        '/products/shein/graphic-tshirt-1.jpg',
        '/products/shein/graphic-tshirt-2.jpg',
        '/products/shein/graphic-tshirt-3.jpg'
      ],
      description: 'T-shirt graphique avec motif tendance, coupe régulière et confortable',
      brand: 'SHEIN',
      category: 'men-clothing',
      subcategory: 'tshirts',
      rating: 4.0,
      reviews: 678,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blanc', 'Noir', 'Gris', 'Bleu'],
      material: 'Coton 100%',
      care: 'Lavage machine 30°C, Repassage à température moyenne',
      tags: ['t-shirt', 'graphique', 'motif', 'tendance'],
      url: 'https://www.shein.com/graphic-tshirt-pattern',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_men_002',
      title: 'Chemise en lin avec poches',
      price: 28.99,
      originalPrice: 45.99,
      currency: 'EUR',
      image: '/products/shein/lin-shirt.jpg',
      images: [
        '/products/shein/lin-shirt-1.jpg',
        '/products/shein/lin-shirt-2.jpg',
        '/products/shein/lin-shirt-3.jpg'
      ],
      description: 'Chemise en lin naturel avec poches, parfaite pour l\'été',
      brand: 'SHEIN',
      category: 'men-clothing',
      subcategory: 'shirts',
      rating: 4.4,
      reviews: 445,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Beige', 'Blanc', 'Bleu clair', 'Vert sauge'],
      material: 'Lin 100%',
      care: 'Lavage machine 30°C, Repassage à température moyenne',
      tags: ['chemise', 'lin', 'poches', 'été'],
      url: 'https://www.shein.com/lin-shirt-pockets',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_men_003',
      title: 'Jean slim fit stretch',
      price: 35.99,
      originalPrice: 59.99,
      currency: 'EUR',
      image: '/products/shein/slim-jeans.jpg',
      images: [
        '/products/shein/slim-jeans-1.jpg',
        '/products/shein/slim-jeans-2.jpg'
      ],
      description: 'Jean slim fit avec stretch, coupe moderne et confortable',
      brand: 'SHEIN',
      category: 'men-clothing',
      subcategory: 'jeans',
      rating: 4.3,
      reviews: 789,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Bleu foncé', 'Bleu clair', 'Noir', 'Gris'],
      material: 'Denim 98%, Élasthanne 2%',
      care: 'Lavage machine 30°C, Ne pas repasser',
      tags: ['jean', 'slim fit', 'stretch', 'moderne'],
      url: 'https://www.shein.com/slim-jeans-stretch',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_men_004',
      title: 'Polo en coton piqué',
      price: 22.99,
      originalPrice: 38.99,
      currency: 'EUR',
      image: '/products/shein/polo-shirt.jpg',
      images: [
        '/products/shein/polo-shirt-1.jpg',
        '/products/shein/polo-shirt-2.jpg'
      ],
      description: 'Polo en coton piqué, col classique et coupe régulière',
      brand: 'SHEIN',
      category: 'men-clothing',
      subcategory: 'polos',
      rating: 4.1,
      reviews: 567,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blanc', 'Noir', 'Bleu marine', 'Rouge', 'Vert'],
      material: 'Coton piqué 100%',
      care: 'Lavage machine 30°C, Repassage à température moyenne',
      tags: ['polo', 'coton piqué', 'col', 'classique'],
      url: 'https://www.shein.com/polo-shirt-cotton',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    }
  ],
  'accessories': [
    {
      id: 'shein_acc_001',
      title: 'Sac à main en cuir synthétique',
      price: 24.99,
      originalPrice: 42.99,
      currency: 'EUR',
      image: '/products/shein/leather-bag.jpg',
      images: [
        '/products/shein/leather-bag-1.jpg',
        '/products/shein/leather-bag-2.jpg',
        '/products/shein/leather-bag-3.jpg'
      ],
      description: 'Sac à main en cuir synthétique, design élégant et pratique',
      brand: 'SHEIN',
      category: 'accessories',
      subcategory: 'bags',
      rating: 4.2,
      reviews: 456,
      sizes: ['One Size'],
      colors: ['Noir', 'Marron', 'Beige', 'Bleu'],
      material: 'Cuir synthétique',
      care: 'Nettoyage à sec',
      tags: ['sac', 'cuir', 'élégant', 'pratique'],
      url: 'https://www.shein.com/leather-bag-elegant',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'shein_acc_002',
      title: 'Ceinture en cuir avec boucle dorée',
      price: 12.99,
      originalPrice: 22.99,
      currency: 'EUR',
      image: '/products/shein/leather-belt.jpg',
      images: [
        '/products/shein/leather-belt-1.jpg',
        '/products/shein/leather-belt-2.jpg'
      ],
      description: 'Ceinture en cuir avec boucle dorée, style classique',
      brand: 'SHEIN',
      category: 'accessories',
      subcategory: 'belts',
      rating: 4.0,
      reviews: 234,
      sizes: ['S/M', 'L/XL'],
      colors: ['Marron', 'Noir'],
      material: 'Cuir 100%',
      care: 'Nettoyage à sec',
      tags: ['ceinture', 'cuir', 'boucle dorée', 'classique'],
      url: 'https://www.shein.com/leather-belt-gold-buckle',
      platform: 'shein',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeShein(options: ScrapingOptions): Promise<SheinProduct[]> {
  const { category, query, limit = 20, minPrice, maxPrice, sortBy } = options;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));

    let products = sheinProducts[category] || [];

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
      price: product.price + (Math.random() - 0.5) * 5, // ±2.5 price variation
      rating: product.rating ? product.rating + (Math.random() - 0.5) * 0.1 : undefined,
      reviews: product.reviews ? Math.floor(product.reviews + (Math.random() - 0.5) * 20) : undefined,
      scrapedAt: new Date().toISOString()
    }));

    return products;

  } catch (error) {
    console.error('Shein scraping error:', error);
    return [];
  }
} 