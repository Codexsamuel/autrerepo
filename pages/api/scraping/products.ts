import { NextApiRequest, NextApiResponse } from 'next';

// Données simulées pour les produits DL Style
const products = [
  {
    id: 1,
    name: "BYD Han EV - Berline Électrique Premium",
    description: "Berline électrique BYD Han avec autonomie de 605km, technologie Blade Battery",
    price: 53333.33,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.8,
    reviews: 234,
    stock: 15,
    image: "/images/products/byd-han.jpg"
  },
  {
    id: 2,
    name: "NIO ES8 - SUV Électrique Luxueux",
    description: "SUV électrique NIO ES8 avec système de changement de batterie rapide",
    price: 113333.33,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.9,
    reviews: 156,
    stock: 8,
    image: "/images/products/nio-es8.jpg"
  },
  {
    id: 3,
    name: "XPeng P7 - Berline Électrique Sportive",
    description: "Berline électrique XPeng P7 avec design futuriste et technologies avancées",
    price: 75000.00,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.7,
    reviews: 189,
    stock: 12,
    image: "/images/products/xpeng-p7.jpg"
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class 2024 - Berline de Luxe",
    description: "Berline de luxe Mercedes-Benz S-Class avec technologies avancées",
    price: 200000.00,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.9,
    reviews: 89,
    stock: 5,
    image: "/images/products/mercedes-s-class.jpg"
  },
  {
    id: 5,
    name: "Range Rover Sport 2024 - SUV Premium",
    description: "SUV premium Range Rover Sport avec capacités tout-terrain exceptionnelles",
    price: 141666.67,
    currency: "EUR",
    country: "🇨🇳 Chine",
    category: "Véhicules",
    rating: 4.7,
    reviews: 234,
    stock: 12,
    image: "/images/products/range-rover-sport.jpg"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { category, country, search } = req.query;
    
    let filteredProducts = [...products];
    
    // Filtrage par catégorie
    if (category && category !== 'Tous les pays') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toString().toLowerCase()
      );
    }
    
    // Filtrage par pays
    if (country && country !== 'Tous les pays') {
      filteredProducts = filteredProducts.filter(product => 
        product.country.includes(country.toString())
      );
    }
    
    // Recherche par nom
    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(search.toString().toLowerCase()) ||
        product.description.toLowerCase().includes(search.toString().toLowerCase())
      );
    }
    
    res.status(200).json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
} 