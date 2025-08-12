'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Search, 
  Filter,
  RefreshCw,
  Truck,
  Shield,
  Globe,
  CreditCard,
  Package,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  Minus,
  Eye,
  Share2,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  isHot: boolean;
  isOnSale: boolean;
  discount?: number;
  shipping: {
    free: boolean;
    cost: number;
    estimatedDays: string;
  };
  origin: string;
  warranty: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function DLStylePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popularity');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Produits simulés
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'iPhone 15 Pro Max',
          category: 'Électronique',
          subcategory: 'Smartphones',
          brand: 'Apple',
          price: 850000,
          originalPrice: 950000,
          currency: 'FCFA',
          image: '/products/iphone-15-pro-max.jpg',
          description: 'Le dernier iPhone avec puce A17 Pro, appareil photo 48MP et design en titane',
          features: ['Écran 6.7" Super Retina XDR', 'Puce A17 Pro', 'Appareil photo 48MP', 'Titanium'],
          rating: 4.8,
          reviews: 1247,
          stock: 15,
          isNew: true,
          isHot: true,
          isOnSale: true,
          discount: 10,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '7-10 jours'
          },
          origin: 'USA',
          warranty: '1 an Apple'
        },
        {
          id: '2',
          name: 'BMW X5 2024',
          category: 'Automobile',
          subcategory: 'SUV',
          brand: 'BMW',
          price: 45000000,
          currency: 'FCFA',
          image: '/products/bmw-x5-2024.jpg',
          description: 'SUV de luxe allemand avec technologie de pointe et confort premium',
          features: ['Moteur 3.0L TwinPower', 'xDrive intelligent', 'iDrive 8.0', 'Confort premium'],
          rating: 4.9,
          reviews: 89,
          stock: 3,
          isNew: true,
          isHot: false,
          isOnSale: false,
          shipping: {
            free: false,
            cost: 2500000,
            estimatedDays: '15-20 jours'
          },
          origin: 'Allemagne',
          warranty: '3 ans BMW'
        },
        {
          id: '3',
          name: 'Rolex Submariner',
          category: 'Luxe',
          subcategory: 'Montres',
          brand: 'Rolex',
          price: 12500000,
          currency: 'FCFA',
          image: '/products/rolex-submariner.jpg',
          description: 'Montre de plongée légendaire, symbole de luxe et de précision',
          features: ['Étanche 300m', 'Mouvement automatique', 'Bracelet Oyster', 'Lunette rotative'],
          rating: 4.9,
          reviews: 234,
          stock: 2,
          isNew: false,
          isHot: true,
          isOnSale: false,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '10-15 jours'
          },
          origin: 'Suisse',
          warranty: '5 ans Rolex'
        },
        {
          id: '4',
          name: 'MacBook Pro M3',
          category: 'Électronique',
          subcategory: 'Ordinateurs',
          brand: 'Apple',
          price: 1200000,
          currency: 'FCFA',
          image: '/products/macbook-pro-m3.jpg',
          description: 'Ordinateur portable professionnel avec puce M3 et écran Liquid Retina',
          features: ['Puce M3', 'Écran 14" Liquid Retina', '16GB RAM', '512GB SSD'],
          rating: 4.7,
          reviews: 567,
          stock: 8,
          isNew: true,
          isHot: false,
          isOnSale: false,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '7-10 jours'
          },
          origin: 'USA',
          warranty: '1 an Apple'
        },
        {
          id: '5',
          name: 'Sac Louis Vuitton Neverfull',
          category: 'Mode',
          subcategory: 'Sacs',
          brand: 'Louis Vuitton',
          price: 850000,
          currency: 'FCFA',
          image: '/products/lv-neverfull.jpg',
          description: 'Sac iconique en toile Monogram avec cuir naturel',
          features: ['Toile Monogram', 'Cuir naturel', 'Doublure textile', 'Fermeture à cordon'],
          rating: 4.6,
          reviews: 189,
          stock: 12,
          isNew: false,
          isHot: true,
          isOnSale: false,
          shipping: {
            free: true,
            cost: 0,
            estimatedDays: '10-15 jours'
          },
          origin: 'France',
          warranty: 'Authenticité garantie'
        },
        {
          id: '6',
          name: 'PlayStation 5',
          category: 'Gaming',
          subcategory: 'Consoles',
          brand: 'Sony',
          price: 450000,
          originalPrice: 500000,
          currency: 'FCFA',
          image: '/products/ps5.jpg',
          description: 'Console de nouvelle génération avec graphismes 4K et SSD ultra-rapide',
          features: ['4K 120fps', 'SSD 825GB', 'DualSense', 'Compatibilité PS4'],
          rating: 4.8,
          reviews: 892,
          stock: 25,
          isNew: false,
          isHot: true,
          isOnSale: true,
          discount: 10,
          shipping: {
            free: false,
            cost: 15000,
            estimatedDays: '5-8 jours'
          },
          origin: 'Japon',
          warranty: '2 ans Sony'
        }
      ];

      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filtrer et trier les produits
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
    });

    // Trier les produits
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedSubcategory, sortBy, priceRange]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const categories = ['Électronique', 'Automobile', 'Luxe', 'Mode', 'Gaming'];
  const subcategories = {
    'Électronique': ['Smartphones', 'Ordinateurs', 'Tablettes', 'Accessoires'],
    'Automobile': ['SUV', 'Berlines', 'Sport', 'Électrique'],
    'Luxe': ['Montres', 'Bijoux', 'Accessoires'],
    'Mode': ['Sacs', 'Vêtements', 'Chaussures'],
    'Gaming': ['Consoles', 'Jeux', 'Accessoires']
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement de la boutique...</h2>
          <p className="text-gray-500">Récupération des produits internationaux</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Globe className="w-10 h-10 mr-3" />
              DL Style
            </h1>
            <p className="text-xl mb-6">Boutique Internationale - Produits Premium du Monde Entier</p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher des produits, marques, catégories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-0 focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filtres et tri */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('all');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {selectedCategory !== 'all' && (
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Toutes les sous-catégories</option>
                {subcategories[selectedCategory as keyof typeof subcategories]?.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </select>
            )}
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="popularity">Popularité</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Note</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Filtres de prix */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold mb-3">Fourchette de prix (FCFA)</h3>
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-32"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-32"
              />
            </div>
          </div>
        )}

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white text-lg font-bold text-center px-4">{product.name}</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isNew && (
                    <Badge className="bg-blue-600 text-white">Nouveau</Badge>
                  )}
                  {product.isHot && (
                    <Badge className="bg-red-600 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Chaud
                    </Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-green-600 text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                
                {/* Actions rapides */}
                <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Caractéristiques :</p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className="font-semibold">{product.stock} disponible(s)</p>
                  </div>
                  <div className="text-right">
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} {product.currency}
                      </p>
                    )}
                    <p className="text-xl font-bold text-purple-600">
                      {product.price.toLocaleString()} {product.currency}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? 'Rupture' : 'Ajouter au panier'}
                  </Button>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Truck className="w-3 h-3 mr-1" />
                      {product.shipping.free ? 'Livraison gratuite' : `${product.shipping.cost.toLocaleString()} FCFA`}
                    </span>
                    <span className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      {product.warranty}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Panier flottant */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{cart.length} article(s)</span>
                  </div>
                  <span className="text-gray-600">Total: {getCartTotal().toLocaleString()} FCFA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    Voir le panier
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Commander
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Nos Services Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Truck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison au Cameroun en 7-15 jours ouvrables avec suivi en temps réel
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dédouanement Inclus</h3>
              <p className="text-gray-600">
                Gestion complète des formalités douanières et administratives
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <CheckCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantie Qualité</h3>
              <p className="text-gray-600">
                30 jours de garantie sur tous les produits avec support client 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour vos achats ?</h2>
            <p className="text-xl mb-6">Nos experts en shopping international sont là pour vous accompagner</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Phone className="w-4 h-4 mr-2" />
                +237 XXX XXX XXX
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Mail className="w-4 h-4 mr-2" />
                style@dlsolutionssarl.tech
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 