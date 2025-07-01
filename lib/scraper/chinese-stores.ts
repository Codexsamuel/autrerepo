import puppeteer, { Browser, ElementHandle } from 'puppeteer';
import * as cheerio from 'cheerio';

export interface ScrapedProduct {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  sellingPrice: number;
  currency: string;
  image: string;
  category: string;
  country: string;
  supplier: string;
  rating: number;
  reviews: number;
  stock: number;
  specifications: Record<string, any>;
  shippingOptions: {
    withCustoms: boolean;
    withTransport: boolean;
    customsFee?: number;
    transportFee?: number;
  };
}

// Base de données complète avec TOUS les produits pour TOUS les marchés
const COMPLETE_PRODUCTS_DATABASE: ScrapedProduct[] = [
  // ===== VÉHICULES =====
  
  // Chine - Véhicules électriques
  {
    id: 'china_ev_001',
    name: 'BYD Han EV - Berline Électrique Premium',
    description: 'Berline électrique BYD Han avec autonomie de 605km, technologie Blade Battery',
    originalPrice: 32000,
    sellingPrice: 57600,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Chine',
    supplier: 'BYD Auto China',
    rating: 4.8,
    reviews: 234,
    stock: 15,
    specifications: {
      autonomie: '605km',
      puissance: '222kW',
      acceleration: '3.9s (0-100km/h)',
      batterie: '77.4kWh Blade Battery'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 4800,
      transportFee: 2500
    }
  },
  {
    id: 'china_ev_002',
    name: 'NIO ES8 - SUV Électrique Luxueux',
    description: 'SUV électrique NIO ES8 avec système de changement de batterie rapide',
    originalPrice: 68000,
    sellingPrice: 122400,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Chine',
    supplier: 'NIO Inc.',
    rating: 4.9,
    reviews: 156,
    stock: 8,
    specifications: {
      autonomie: '580km',
      puissance: '400kW',
      acceleration: '4.9s (0-100km/h)',
      batterie: '100kWh'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 10200,
      transportFee: 3500
    }
  },
  {
    id: 'china_ev_003',
    name: 'XPeng P7 - Berline Électrique Sportive',
    description: 'Berline électrique XPeng P7 avec design futuriste et technologies avancées',
    originalPrice: 45000,
    sellingPrice: 81000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Chine',
    supplier: 'XPeng Motors',
    rating: 4.7,
    reviews: 189,
    stock: 12,
    specifications: {
      autonomie: '706km',
      puissance: '316kW',
      acceleration: '4.3s (0-100km/h)',
      batterie: '80.9kWh'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 6750,
      transportFee: 2800
    }
  },

  // Dubaï - Véhicules de luxe
  {
    id: 'dubai_luxury_001',
    name: 'Mercedes-Benz S-Class 2024 - Berline de Luxe',
    description: 'Berline de luxe Mercedes-Benz S-Class avec technologies avancées',
    originalPrice: 120000,
    sellingPrice: 216000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Dubaï',
    supplier: 'Al Tayer Motors',
    rating: 4.9,
    reviews: 89,
    stock: 5,
    specifications: {
      moteur: '3.0L I6 Turbo',
      puissance: '367hp',
      transmission: '9G-TRONIC',
      intérieur: 'Cuir Nappa'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 18000,
      transportFee: 5000
    }
  },
  {
    id: 'dubai_luxury_002',
    name: 'Range Rover Sport 2024 - SUV Premium',
    description: 'SUV premium Range Rover Sport avec capacités tout-terrain exceptionnelles',
    originalPrice: 85000,
    sellingPrice: 153000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Dubaï',
    supplier: 'Al Futtaim Motors',
    rating: 4.7,
    reviews: 234,
    stock: 12,
    specifications: {
      moteur: '3.0L I6 Mild Hybrid',
      puissance: '400hp',
      transmission: '8-speed Automatic',
      traction: '4WD Terrain Response 2'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 12750,
      transportFee: 4000
    }
  },
  {
    id: 'dubai_luxury_003',
    name: 'Bentley Continental GT - Coupé de Luxe',
    description: 'Coupé de luxe Bentley Continental GT avec finitions artisanales',
    originalPrice: 200000,
    sellingPrice: 360000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Dubaï',
    supplier: 'Bentley Dubai',
    rating: 4.9,
    reviews: 67,
    stock: 3,
    specifications: {
      moteur: '4.0L V8 Twin-Turbo',
      puissance: '542hp',
      transmission: '8-speed Automatic',
      intérieur: 'Cuir Mulliner'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 30000,
      transportFee: 8000
    }
  },

  // Cameroun - Véhicules d'occasion
  {
    id: 'cameroon_used_001',
    name: 'Toyota Land Cruiser 2018 - SUV 4x4',
    description: 'SUV 4x4 Toyota Land Cruiser 2018 en excellent état, parfait pour l\'Afrique',
    originalPrice: 35000,
    sellingPrice: 63000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Cameroun',
    supplier: 'Auto Import Plus',
    rating: 4.8,
    reviews: 123,
    stock: 3,
    specifications: {
      moteur: '4.5L V8 Diesel',
      puissance: '272hp',
      transmission: '6-speed Automatic',
      kilométrage: '85,000km'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 5250,
      transportFee: 1500
    }
  },
  {
    id: 'cameroon_used_002',
    name: 'Honda Civic 2020 - Berline Économique',
    description: 'Berline économique Honda Civic 2020, faible consommation, entretien facile',
    originalPrice: 18000,
    sellingPrice: 32400,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Cameroun',
    supplier: 'Car Market Yaoundé',
    rating: 4.6,
    reviews: 234,
    stock: 8,
    specifications: {
      moteur: '1.8L i-VTEC',
      puissance: '140hp',
      transmission: 'CVT',
      kilométrage: '45,000km'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 2700,
      transportFee: 800
    }
  },

  // France - Véhicules français
  {
    id: 'france_car_001',
    name: 'Peugeot 508 - Berline Française',
    description: 'Berline française Peugeot 508 avec design élégant et technologies innovantes',
    originalPrice: 45000,
    sellingPrice: 81000,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'France',
    supplier: 'Peugeot France',
    rating: 4.5,
    reviews: 456,
    stock: 25,
    specifications: {
      moteur: '1.6L PureTech',
      puissance: '180hp',
      transmission: '8-speed Automatic',
      consommation: '5.2L/100km'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 6750,
      transportFee: 3000
    }
  },

  // ===== TECHNOLOGIE =====
  
  // Chine - Smartphones
  {
    id: 'china_tech_001',
    name: 'Huawei Mate 60 Pro - Smartphone Premium',
    description: 'Smartphone premium Huawei Mate 60 Pro avec appareil photo Leica',
    originalPrice: 1200,
    sellingPrice: 2160,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'Chine',
    supplier: 'Huawei Technologies',
    rating: 4.8,
    reviews: 1234,
    stock: 150,
    specifications: {
      écran: '6.82" OLED',
      processeur: 'Kirin 9000S',
      ram: '12GB',
      stockage: '512GB',
      caméra: '50MP + 48MP + 64MP'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 180,
      transportFee: 50
    }
  },
  {
    id: 'china_tech_002',
    name: 'Xiaomi 14 Ultra - Smartphone Pro',
    description: 'Smartphone professionnel Xiaomi 14 Ultra avec système photo avancé',
    originalPrice: 1000,
    sellingPrice: 1800,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'Chine',
    supplier: 'Xiaomi Corporation',
    rating: 4.7,
    reviews: 987,
    stock: 200,
    specifications: {
      écran: '6.73" AMOLED',
      processeur: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      stockage: '1TB',
      caméra: '50MP + 50MP + 50MP + 50MP'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 150,
      transportFee: 45
    }
  },

  // Dubaï - Électronique de luxe
  {
    id: 'dubai_tech_001',
    name: 'iPhone 15 Pro Max - Smartphone Luxe',
    description: 'Smartphone de luxe iPhone 15 Pro Max avec titane et caméra pro',
    originalPrice: 1200,
    sellingPrice: 2160,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'Dubaï',
    supplier: 'Apple Store Dubai',
    rating: 4.9,
    reviews: 567,
    stock: 80,
    specifications: {
      écran: '6.7" Super Retina XDR',
      processeur: 'A17 Pro',
      ram: '8GB',
      stockage: '1TB',
      caméra: '48MP + 12MP + 12MP'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 180,
      transportFee: 60
    }
  },

  // France - Technologie française
  {
    id: 'france_tech_001',
    name: 'Orange Sanza - Smartphone Français',
    description: 'Smartphone français Orange Sanza avec services intégrés',
    originalPrice: 400,
    sellingPrice: 720,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'France',
    supplier: 'Orange France',
    rating: 4.3,
    reviews: 234,
    stock: 100,
    specifications: {
      écran: '6.1" LCD',
      processeur: 'MediaTek Dimensity',
      ram: '6GB',
      stockage: '128GB',
      caméra: '48MP + 8MP + 2MP'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 60,
      transportFee: 30
    }
  },

  // ===== VÊTEMENTS =====
  
  // Chine - Mode
  {
    id: 'china_fashion_001',
    name: 'Robe de Soirée Chinoise Traditionnelle',
    description: 'Robe de soirée traditionnelle chinoise en soie avec broderies dorées',
    originalPrice: 200,
    sellingPrice: 360,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Vêtements',
    country: 'Chine',
    supplier: 'Silk Road Fashion',
    rating: 4.6,
    reviews: 456,
    stock: 50,
    specifications: {
      matériau: 'Soie 100%',
      taille: 'S, M, L, XL',
      couleur: 'Rouge, Or, Noir',
      style: 'Traditionnel chinois'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 30,
      transportFee: 20
    }
  },

  // Dubaï - Mode de luxe
  {
    id: 'dubai_fashion_001',
    name: 'Abaya de Luxe avec Broderies',
    description: 'Abaya de luxe avec broderies dorées et perles, parfaite pour les occasions spéciales',
    originalPrice: 500,
    sellingPrice: 900,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Vêtements',
    country: 'Dubaï',
    supplier: 'Dubai Luxury Fashion',
    rating: 4.8,
    reviews: 234,
    stock: 30,
    specifications: {
      matériau: 'Crêpe de soie',
      taille: 'One Size',
      couleur: 'Noir avec doré',
      style: 'Abaya traditionnelle'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 75,
      transportFee: 40
    }
  },

  // France - Haute couture
  {
    id: 'france_fashion_001',
    name: 'Robe Chanel - Haute Couture',
    description: 'Robe de haute couture Chanel avec finitions artisanales',
    originalPrice: 5000,
    sellingPrice: 9000,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Vêtements',
    country: 'France',
    supplier: 'Chanel Paris',
    rating: 4.9,
    reviews: 89,
    stock: 5,
    specifications: {
      matériau: 'Tweed de laine',
      taille: 'Sur mesure',
      couleur: 'Noir et blanc',
      style: 'Haute couture française'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 750,
      transportFee: 200
    }
  },

  // ===== ACCESSOIRES =====
  
  // Chine - Accessoires
  {
    id: 'china_accessory_001',
    name: 'Sac à Main en Cuir Authentique',
    description: 'Sac à main en cuir authentique avec fermeture dorée',
    originalPrice: 150,
    sellingPrice: 270,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    category: 'Accessoires',
    country: 'Chine',
    supplier: 'Leather Craft China',
    rating: 4.5,
    reviews: 678,
    stock: 100,
    specifications: {
      matériau: 'Cuir véritable',
      dimensions: '30x20x10cm',
      couleur: 'Marron, Noir, Beige',
      style: 'Classique'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 22,
      transportFee: 25
    }
  },

  // Dubaï - Accessoires de luxe
  {
    id: 'dubai_accessory_001',
    name: 'Montre Rolex Datejust - Luxe',
    description: 'Montre de luxe Rolex Datejust avec bracelet en or',
    originalPrice: 15000,
    sellingPrice: 27000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    category: 'Accessoires',
    country: 'Dubaï',
    supplier: 'Rolex Dubai',
    rating: 4.9,
    reviews: 45,
    stock: 3,
    specifications: {
      matériau: 'Or 18k',
      mouvement: 'Automatique',
      diamètre: '36mm',
      étanchéité: '100m'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 2250,
      transportFee: 500
    }
  },

  // France - Accessoires français
  {
    id: 'france_accessory_001',
    name: 'Sac Louis Vuitton - Iconique',
    description: 'Sac iconique Louis Vuitton avec monogramme signature',
    originalPrice: 2000,
    sellingPrice: 3600,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    category: 'Accessoires',
    country: 'France',
    supplier: 'Louis Vuitton Paris',
    rating: 4.8,
    reviews: 234,
    stock: 15,
    specifications: {
      matériau: 'Canvas LV',
      dimensions: '32x25x12cm',
      couleur: 'Monogramme',
      style: 'Iconique français'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 300,
      transportFee: 150
    }
  }
];

// Ajouter plus de produits pour chaque catégorie
const ADDITIONAL_PRODUCTS: ScrapedProduct[] = [
  // Plus de véhicules
  {
    id: 'china_ev_004',
    name: 'Wuling Hongguang Mini EV - Voiture Urbaine',
    description: 'Voiture électrique urbaine compacte et économique',
    originalPrice: 5000,
    sellingPrice: 9000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Chine',
    supplier: 'Wuling Motors',
    rating: 4.4,
    reviews: 1234,
    stock: 200,
    specifications: {
      autonomie: '170km',
      puissance: '20kW',
      vitesse: '100km/h max',
      batterie: '13.8kWh'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 750,
      transportFee: 1200
    }
  },
  {
    id: 'dubai_luxury_004',
    name: 'Lamborghini Huracán - Supercar',
    description: 'Supercar Lamborghini Huracán avec performance exceptionnelle',
    originalPrice: 250000,
    sellingPrice: 450000,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=400&fit=crop',
    category: 'Véhicules',
    country: 'Dubaï',
    supplier: 'Lamborghini Dubai',
    rating: 4.9,
    reviews: 23,
    stock: 2,
    specifications: {
      moteur: '5.2L V10',
      puissance: '610hp',
      acceleration: '3.2s (0-100km/h)',
      vitesse: '325km/h'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 37500,
      transportFee: 10000
    }
  },

  // Plus de technologie
  {
    id: 'china_tech_003',
    name: 'DJI Mavic 3 Pro - Drone Professionnel',
    description: 'Drone professionnel DJI Mavic 3 Pro avec caméra 4K',
    originalPrice: 2000,
    sellingPrice: 3600,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'Chine',
    supplier: 'DJI Technology',
    rating: 4.8,
    reviews: 567,
    stock: 80,
    specifications: {
      caméra: '4K/60fps',
      autonomie: '46 minutes',
      portée: '15km',
      poids: '958g'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 300,
      transportFee: 100
    }
  },
  {
    id: 'france_tech_002',
    name: 'Parrot Anafi - Drone Français',
    description: 'Drone français Parrot Anafi avec technologie innovante',
    originalPrice: 700,
    sellingPrice: 1260,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop',
    category: 'Technologie',
    country: 'France',
    supplier: 'Parrot SA',
    rating: 4.6,
    reviews: 234,
    stock: 120,
    specifications: {
      caméra: '4K HDR',
      autonomie: '25 minutes',
      portée: '4km',
      poids: '320g'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 105,
      transportFee: 60
    }
  },

  // Plus de vêtements
  {
    id: 'china_fashion_002',
    name: 'Costume Traditionnel Chinois - Hanfu',
    description: 'Costume traditionnel chinois Hanfu en soie avec broderies',
    originalPrice: 300,
    sellingPrice: 540,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Vêtements',
    country: 'Chine',
    supplier: 'Traditional Hanfu',
    rating: 4.7,
    reviews: 345,
    stock: 40,
    specifications: {
      matériau: 'Soie 100%',
      taille: 'S, M, L, XL',
      couleur: 'Bleu, Rouge, Vert',
      style: 'Hanfu traditionnel'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 45,
      transportFee: 30
    }
  },
  {
    id: 'dubai_fashion_002',
    name: 'Kandura Traditionnelle - Vêtement Local',
    description: 'Kandura traditionnelle des Émirats avec finitions dorées',
    originalPrice: 400,
    sellingPrice: 720,
    currency: 'AED',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Vêtements',
    country: 'Dubaï',
    supplier: 'Emirates Traditional',
    rating: 4.8,
    reviews: 178,
    stock: 25,
    specifications: {
      matériau: 'Coton premium',
      taille: 'Sur mesure',
      couleur: 'Blanc, Beige',
      style: 'Kandura traditionnelle'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 60,
      transportFee: 35
    }
  },

  // Plus d'accessoires
  {
    id: 'china_accessory_002',
    name: 'Éventail Chinois en Soie - Accessoire Traditionnel',
    description: 'Éventail traditionnel chinois en soie avec peinture à la main',
    originalPrice: 50,
    sellingPrice: 90,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    category: 'Accessoires',
    country: 'Chine',
    supplier: 'Traditional Crafts',
    rating: 4.5,
    reviews: 234,
    stock: 150,
    specifications: {
      matériau: 'Soie et bambou',
      dimensions: '25cm de diamètre',
      couleur: 'Multiples motifs',
      style: 'Traditionnel chinois'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 7,
      transportFee: 15
    }
  },
  {
    id: 'france_accessory_002',
    name: 'Parfum Chanel N°5 - Iconique',
    description: 'Parfum iconique Chanel N°5, symbole de la haute couture française',
    originalPrice: 150,
    sellingPrice: 270,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    category: 'Accessoires',
    country: 'France',
    supplier: 'Chanel Parfums',
    rating: 4.9,
    reviews: 1234,
    stock: 200,
    specifications: {
      volume: '100ml',
      concentration: 'Eau de Parfum',
      famille: 'Floral-Aldéhyde',
      style: 'Iconique français'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 22,
      transportFee: 25
    }
  }
];

// Combiner toutes les données
const ALL_PRODUCTS = [...COMPLETE_PRODUCTS_DATABASE, ...ADDITIONAL_PRODUCTS];

export async function scrapeChineseStores(
  query: string = '',
  category: string = 'all',
  country: string = 'all'
): Promise<{ products: ScrapedProduct[]; stats: any }> {
  
  // Simuler un délai de scraping
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  let filteredProducts = ALL_PRODUCTS;
  
  // Filtrer par catégorie
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Filtrer par pays
  if (country && country !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.country.toLowerCase().includes(country.toLowerCase())
    );
  }
  
  // Filtrer par recherche
  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Statistiques
  const stats = {
    totalProducts: ALL_PRODUCTS.length,
    filteredProducts: filteredProducts.length,
    categories: [...new Set(ALL_PRODUCTS.map(p => p.category))],
    countries: [...new Set(ALL_PRODUCTS.map(p => p.country))],
    averagePrice: ALL_PRODUCTS.reduce((sum, p) => sum + p.sellingPrice, 0) / ALL_PRODUCTS.length,
    averageRating: ALL_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / ALL_PRODUCTS.length
  };
  
  return {
    products: filteredProducts,
    stats
  };
}

export function getCategories(): string[] {
  return [...new Set(ALL_PRODUCTS.map(p => p.category))];
}

export function getSources(): string[] {
  return [...new Set(ALL_PRODUCTS.map(p => p.supplier))];
}

export function getCountries(): string[] {
  return [...new Set(ALL_PRODUCTS.map(p => p.country))];
}

export function getScrapingStats(): any {
  const categories = getCategories();
  const countries = getCountries();
  
  return {
    totalProducts: ALL_PRODUCTS.length,
    categories: categories.map(cat => ({
      name: cat,
      count: ALL_PRODUCTS.filter(p => p.category === cat).length
    })),
    countries: countries.map(country => ({
      name: country,
      count: ALL_PRODUCTS.filter(p => p.country === country).length
    })),
    averagePrice: ALL_PRODUCTS.reduce((sum, p) => sum + p.sellingPrice, 0) / ALL_PRODUCTS.length,
    averageRating: ALL_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / ALL_PRODUCTS.length,
    totalSuppliers: getSources().length
  };
} 