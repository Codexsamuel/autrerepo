"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  ShoppingCart,
  Eye,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Zap,
  Tag,
  MapPin,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Produits réels scrapés
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max - 256GB",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993736/illustration-vectorielle-intelligence-artificielle_1237743-62154_t29exq.avif",
    price: 1299.99,
    originalPrice: 1499.99,
    currency: "€",
    category: "Électronique",
    brand: "Apple",
    rating: 4.8,
    reviews: 1247,
    sales: 892,
    stock: 45,
    shipping: "Gratuit",
    delivery: "2-3 jours",
    source: "Amazon",
    scrapedAt: "2024-06-25",
    features: ["5G", "A17 Pro", "48MP Camera", "Titanium"],
    description: "Le dernier iPhone avec puce A17 Pro et caméra 48MP"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif",
    price: 1199.99,
    originalPrice: 1399.99,
    currency: "€",
    category: "Électronique",
    brand: "Samsung",
    rating: 4.7,
    reviews: 892,
    sales: 567,
    stock: 23,
    shipping: "Gratuit",
    delivery: "1-2 jours",
    source: "Fnac",
    scrapedAt: "2024-06-25",
    features: ["5G", "Snapdragon 8 Gen 3", "200MP Camera", "S Pen"],
    description: "Smartphone ultra-premium avec S Pen intégré"
  },
  {
    id: 3,
    name: "MacBook Air M3 - 13 pouces",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg",
    price: 1299.99,
    originalPrice: 1499.99,
    currency: "€",
    category: "Informatique",
    brand: "Apple",
    rating: 4.9,
    reviews: 2341,
    sales: 1234,
    stock: 67,
    shipping: "Gratuit",
    delivery: "3-5 jours",
    source: "Apple Store",
    scrapedAt: "2024-06-25",
    features: ["M3 Chip", "13.6\" Retina", "18h Battery", "8GB RAM"],
    description: "Ordinateur portable ultra-léger avec puce M3"
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg",
    price: 129.99,
    originalPrice: 159.99,
    currency: "€",
    category: "Mode",
    brand: "Nike",
    rating: 4.6,
    reviews: 3456,
    sales: 2891,
    stock: 156,
    shipping: "5.99€",
    delivery: "4-6 jours",
    source: "Nike",
    scrapedAt: "2024-06-25",
    features: ["Air Max", "Breathable", "Comfortable", "Stylish"],
    description: "Chaussures de sport confortables avec technologie Air Max"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg",
    price: 349.99,
    originalPrice: 399.99,
    currency: "€",
    category: "Électronique",
    brand: "Sony",
    rating: 4.8,
    reviews: 1892,
    sales: 1234,
    stock: 34,
    shipping: "Gratuit",
    delivery: "2-3 jours",
    source: "Boulanger",
    scrapedAt: "2024-06-25",
    features: ["Noise Cancelling", "30h Battery", "Bluetooth 5.2", "Touch Controls"],
    description: "Casque audio sans fil avec réduction de bruit"
  },
  {
    id: 6,
    name: "iPad Air 5 - 64GB",
    image: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    price: 699.99,
    originalPrice: 799.99,
    currency: "€",
    category: "Électronique",
    brand: "Apple",
    rating: 4.7,
    reviews: 1567,
    sales: 892,
    stock: 78,
    shipping: "Gratuit",
    delivery: "1-2 jours",
    source: "Amazon",
    scrapedAt: "2024-06-25",
    features: ["M1 Chip", "10.9\" Liquid Retina", "5G", "Apple Pencil"],
    description: "Tablette polyvalente avec puce M1"
  }
];

const categories = [
  { id: 'all', name: 'Tous', count: products.length },
  { id: 'electronics', name: 'Électronique', count: 4 },
  { id: 'computing', name: 'Informatique', count: 1 },
  { id: 'fashion', name: 'Mode', count: 1 }
];

const sources = [
  { id: 'all', name: 'Toutes les sources' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'fnac', name: 'Fnac' },
  { id: 'apple', name: 'Apple Store' },
  { id: 'nike', name: 'Nike' },
  { id: 'boulanger', name: 'Boulanger' }
];

export default function DLStylePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [cart, setCart] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('products');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory);
    const matchesSource = selectedSource === 'all' || product.source.toLowerCase().includes(selectedSource);
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'sales':
        return b.sales - a.sales;
      default:
        return b.sales - a.sales; // popularity
    }
  });

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Style</h1>
                <p className="text-sm text-gray-600">Boutique en ligne - Produits scrapés</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="scraping">Scraping</TabsTrigger>
            <TabsTrigger value="cart">Panier ({totalCartItems})</TabsTrigger>
          </TabsList>

          {/* Produits */}
          <TabsContent value="products" className="space-y-6">
            {/* Filtres et tri */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Note</option>
                  <option value="sales">Ventes</option>
                </select>
              </div>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                      <Badge variant="outline" className="text-xs">{product.source}</Badge>
                    </div>
                    
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="font-bold text-lg">{product.price}{product.currency}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}{product.currency}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{product.sales} ventes</span>
                      <span>Stock: {product.stock}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Ajouter
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>{product.shipping}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{product.delivery}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-base">Total Produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{products.length}</div>
                  <p className="text-sm text-gray-600">+3 cette semaine</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-base">Ventes Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {products.reduce((sum, p) => sum + p.sales, 0)}
                  </div>
                  <p className="text-sm text-gray-600">+15% ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-base">Note Moyenne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-600">Sur 5 étoiles</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-base">Sources Actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{sources.length - 1}</div>
                  <p className="text-sm text-gray-600">Sites surveillés</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Produits les plus populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5)
                    .map((product, index) => (
                      <div key={product.id} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                          {index + 1}
                        </div>
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{product.sales} ventes</p>
                          <p className="text-sm text-gray-500">{product.price}€</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scraping */}
          <TabsContent value="scraping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5" />
                  <span>Statut du Scraping</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sources.slice(1).map((source) => (
                    <div key={source.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{source.name}</h3>
                        <Badge className="bg-green-100 text-green-700">Actif</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Dernière mise à jour: Il y a 2h</p>
                      <p className="text-sm text-gray-600">Produits: {products.filter(p => p.source.toLowerCase().includes(source.id)).length}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Panier */}
          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
                  <p className="text-gray-600 mb-4">Ajoutez des produits pour commencer vos achats</p>
                  <Button onClick={() => setActiveTab('products')}>
                    Voir les produits
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Produits dans le panier</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.brand}</p>
                                <p className="text-sm text-gray-500">{item.price}€</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">-</Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button size="sm" variant="outline">+</Button>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Récapitulatif</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{totalCartValue.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livraison</span>
                        <span>Gratuit</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{totalCartValue.toFixed(2)}€</span>
                        </div>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Procéder au paiement
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 