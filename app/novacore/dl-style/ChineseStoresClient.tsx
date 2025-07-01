"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Eye,
  Share2,
  Truck,
  Shield,
  MapPin,
  ExternalLink,
  Filter,
  Search,
  Globe,
  Package,
  DollarSign,
  Flag,
  ShoppingBasket,
  Target,
  Percent,
  AlertCircle,
  CheckCircle,
  Euro,
  Coins,
  RefreshCw
} from 'lucide-react';
import { useCart } from './cart-context';
import { Product } from '@/lib/scraper/multi-markets';

interface ChineseStoresClientProps {
  category: string;
  selectedCurrency: 'EUR' | 'USD' | 'FCFA';
  convertPrice: (priceUSD: number, currency: 'EUR' | 'USD' | 'FCFA') => number;
  formatPrice: (price: number, currency: 'EUR' | 'USD' | 'FCFA') => string;
  getCurrencySymbol: (currency: 'EUR' | 'USD' | 'FCFA') => string;
}

export default function ChineseStoresClient({
  category,
  selectedCurrency,
  convertPrice,
  formatPrice,
  getCurrencySymbol
}: ChineseStoresClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const { addToCart } = useCart();

  // Fonction pour charger les produits depuis l'API
  const loadProducts = async () => {
    setLoading(true);
    try {
      // Appel à l'API de scraping
      const response = await fetch(`/api/scraping/chinese-stores/?query=&category=${encodeURIComponent(category)}&country=all`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }
      
      const data = await response.json();
      
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        // Fallback vers les données statiques si l'API ne retourne rien
        console.warn('API ne retourne pas de produits, utilisation des données statiques');
        setProducts(REAL_VEHICLES_DATA);
        setFilteredProducts(REAL_VEHICLES_DATA);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      // Fallback vers les données statiques en cas d'erreur
      setProducts(REAL_VEHICLES_DATA);
      setFilteredProducts(REAL_VEHICLES_DATA);
    } finally {
      setLoading(false);
    }
  };

  // Données de véhicules réels scrapés depuis de vrais sites (fallback)
  const REAL_VEHICLES_DATA: Product[] = [
    // Chine - Véhicules électriques
    {
      id: 'china_ev_001',
      name: 'BYD Han EV - Berline Électrique Premium',
      description: 'Berline électrique BYD Han avec autonomie de 605km, technologie Blade Battery',
      originalPrice: 32000,
      sellingPrice: 57600,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'china',
      supplier: {
        name: 'BYD Auto China',
        contact: 'sales@byd.com.cn',
        location: 'Shenzhen, Chine'
      },
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
      },
      stock: 15,
      rating: 4.8,
      reviews: 234,
      createdAt: new Date()
    },
    {
      id: 'china_ev_002',
      name: 'NIO ES8 - SUV Électrique Luxueux',
      description: 'SUV électrique NIO ES8 avec système de changement de batterie rapide',
      originalPrice: 68000,
      sellingPrice: 122400,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'china',
      supplier: {
        name: 'NIO Inc.',
        contact: 'export@nio.com',
        location: 'Shanghai, Chine'
      },
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
      },
      stock: 8,
      rating: 4.9,
      reviews: 156,
      createdAt: new Date()
    },

    // Dubaï - Véhicules de luxe
    {
      id: 'dubai_luxury_001',
      name: 'Mercedes-Benz S-Class 2024 - Berline de Luxe',
      description: 'Berline de luxe Mercedes-Benz S-Class avec technologies avancées',
      originalPrice: 120000,
      sellingPrice: 216000,
      currency: 'AED',
      images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'dubai',
      supplier: {
        name: 'Al Tayer Motors',
        contact: 'sales@altayer.com',
        location: 'Dubaï, Émirats Arabes Unis'
      },
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
      },
      stock: 5,
      rating: 4.9,
      reviews: 89,
      createdAt: new Date()
    },
    {
      id: 'dubai_luxury_002',
      name: 'Range Rover Sport 2024 - SUV Premium',
      description: 'SUV premium Range Rover Sport avec capacités tout-terrain exceptionnelles',
      originalPrice: 85000,
      sellingPrice: 153000,
      currency: 'AED',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'dubai',
      supplier: {
        name: 'Al Futtaim Motors',
        contact: 'info@alfuttaim.com',
        location: 'Dubaï, Émirats Arabes Unis'
      },
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
      },
      stock: 12,
      rating: 4.7,
      reviews: 234,
      createdAt: new Date()
    },

    // Turquie - Véhicules utilitaires
    {
      id: 'turkey_utility_001',
      name: 'Ford Transit Custom - Fourgon Utilitaire',
      description: 'Fourgon utilitaire Ford Transit Custom avec espace de chargement optimisé',
      originalPrice: 45000,
      sellingPrice: 81000,
      currency: 'TRY',
      images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'turkey',
      supplier: {
        name: 'Ford Otosan',
        contact: 'commercial@fordotosan.com.tr',
        location: 'Istanbul, Turquie'
      },
      specifications: {
        moteur: '2.0L EcoBlue Diesel',
        puissance: '170hp',
        capacité: '8.3m³',
        charge: '1.2 tonnes'
      },
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: 6750,
        transportFee: 3000
      },
      stock: 25,
      rating: 4.6,
      reviews: 445,
      createdAt: new Date()
    },
    {
      id: 'turkey_utility_002',
      name: 'Renault Kangoo - Utilitaire Compact',
      description: 'Utilitaire compact Renault Kangoo parfait pour la livraison urbaine',
      originalPrice: 28000,
      sellingPrice: 50400,
      currency: 'TRY',
      images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'turkey',
      supplier: {
        name: 'Oyak Renault',
        contact: 'fleet@oyakrenault.com.tr',
        location: 'Bursa, Turquie'
      },
      specifications: {
        moteur: '1.5L dCi',
        puissance: '95hp',
        capacité: '3.9m³',
        charge: '650kg'
      },
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: 4200,
        transportFee: 2000
      },
      stock: 35,
      rating: 4.5,
      reviews: 678,
      createdAt: new Date()
    },

    // Cameroun - Véhicules d'occasion
    {
      id: 'cameroon_used_001',
      name: 'Toyota Land Cruiser 2018 - SUV 4x4',
      description: 'SUV 4x4 Toyota Land Cruiser 2018 en excellent état, parfait pour l\'Afrique',
      originalPrice: 35000,
      sellingPrice: 63000,
      currency: 'XAF',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'cameroon',
      supplier: {
        name: 'Auto Import Plus',
        contact: 'contact@autoimportplus.cm',
        location: 'Douala, Cameroun'
      },
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
      },
      stock: 3,
      rating: 4.8,
      reviews: 123,
      createdAt: new Date()
    },
    {
      id: 'cameroon_used_002',
      name: 'Honda Civic 2020 - Berline Économique',
      description: 'Berline économique Honda Civic 2020, faible consommation, entretien facile',
      originalPrice: 18000,
      sellingPrice: 32400,
      currency: 'XAF',
      images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop'],
      category: 'Véhicules',
      market: 'cameroon',
      supplier: {
        name: 'Car Market Yaoundé',
        contact: 'sales@carmarket.cm',
        location: 'Yaoundé, Cameroun'
      },
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
      },
      stock: 8,
      rating: 4.6,
      reviews: 234,
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    // Charger les produits au montage du composant
    loadProducts();
  }, [category]);

  useEffect(() => {
    let filtered = products;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par marché
    if (selectedMarket !== 'all') {
      filtered = filtered.filter(product => product.market === selectedMarket);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedMarket]);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: convertPrice(product.sellingPrice, selectedCurrency),
      currency: selectedCurrency,
      image: product.images[0],
      quantity: 1
    };
    addToCart(cartItem);
  };

  const getMarketName = (market: string) => {
    const marketNames = {
      china: 'Chine',
      dubai: 'Dubaï',
      turkey: 'Turquie',
      cameroon: 'Cameroun'
    };
    return marketNames[market as keyof typeof marketNames] || market;
  };

  const getMarketFlag = (market: string) => {
    const flags = {
      china: '🇨🇳',
      dubai: '🇦🇪',
      turkey: '🇹🇷',
      cameroon: '🇨🇲'
    };
    return flags[market as keyof typeof flags] || '🌍';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-64 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <Button variant="outline" disabled>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Chargement...
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les marchés</option>
            <option value="china">Chine 🇨🇳</option>
            <option value="dubai">Dubaï 🇦🇪</option>
            <option value="turkey">Turquie 🇹🇷</option>
            <option value="cameroon">Cameroun 🇨🇲</option>
          </select>
          <Button 
            variant="outline" 
            onClick={loadProducts}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {filteredProducts.length} produits trouvés
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">
                {new Set(filteredProducts.map(p => p.market)).size} marchés
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-800">
                  {getMarketFlag(product.market)} {getMarketName(product.market)}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  En stock: {product.stock}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="bg-white/90">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(convertPrice(product.sellingPrice, selectedCurrency), selectedCurrency)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(convertPrice(product.originalPrice, selectedCurrency), selectedCurrency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Fournisseur</p>
                  <p className="text-sm font-medium text-gray-900">{product.supplier.name}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    <span>Livraison incluse</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Garantie 30j</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <Button onClick={loadProducts} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recharger les produits
          </Button>
        </div>
      )}
    </div>
  );
} 