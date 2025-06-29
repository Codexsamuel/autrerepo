"use client";

import { useState, useEffect, useCallback } from 'react';
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
  Clock,
  ExternalLink,
  Download,
  Globe,
  BarChart3,
  Package,
  DollarSign,
  Flag,
  ShoppingBasket,
  Target,
  Percent,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { ScrapedProduct, ScrapingResult } from '@/lib/scraper/chinese-stores';
import { useCart, CartItem } from './cart-context';

export default function DLStylePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'updating'>('online');
  const [updateInterval, setUpdateInterval] = useState(30000); // 30 secondes par défaut
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Charger les données initiales
  useEffect(() => {
    loadInitialData();
  }, []);

  // Système de mise à jour automatique
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      console.log('🔄 Mise à jour automatique des données...');
      setConnectionStatus('updating');
      loadInitialData();
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, updateInterval]);

  // Vérification de la connexion
  useEffect(() => {
    const checkConnection = () => {
      setConnectionStatus(navigator.onLine ? 'online' : 'offline');
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      // Charger les statistiques
      const statsResponse = await fetch('/api/scraping/chinese-stores?action=stats');
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Charger les catégories
      const categoriesResponse = await fetch('/api/scraping/chinese-stores?action=categories');
      const categoriesData = await categoriesResponse.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }

      // Charger les sources
      const sourcesResponse = await fetch('/api/scraping/chinese-stores?action=sources');
      const sourcesData = await sourcesResponse.json();
      if (sourcesData.success) {
        setSources(sourcesData.data);
      }

      // Charger les pays
      const countriesResponse = await fetch('/api/scraping/chinese-stores?action=countries');
      const countriesData = await countriesResponse.json();
      if (countriesData.success) {
        setCountries(countriesData.data);
      }

      // Charger les produits
      await performScraping();
      
      setLastUpdate(new Date());
      setConnectionStatus('online');
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setConnectionStatus('offline');
    } finally {
      setLoading(false);
    }
  }, []);

  const performScraping = async () => {
    try {
      const response = await fetch(`/api/scraping/chinese-stores?query=${searchQuery}&category=${selectedCategory}&country=${selectedCountry}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data.products);
      }
    } catch (error) {
      console.error('Erreur lors du scraping:', error);
    }
  };

  // Effectuer le scraping quand les filtres changent
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performScraping();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, selectedSource, selectedCountry]);

  const filteredProducts = products.filter(product => {
    const matchesSource = selectedSource === 'all' || 
      product.source.toLowerCase().includes(selectedSource.toLowerCase());
    return matchesSource;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.sellingPrice - b.sellingPrice;
      case 'price-high':
        return b.sellingPrice - a.sellingPrice;
      case 'profit':
        return (b.sellingPrice - b.originalPrice) - (a.sellingPrice - a.originalPrice);
      case 'rating':
        return b.rating - a.rating;
      case 'sales':
        return b.sales - a.sales;
      default:
        return b.sales - a.sales; // popularity
    }
  });

  const getCartTotal = () => {
    return cart.reduce((total: number, item: CartItem) => total + (item.sellingPrice * (item.quantity || 1)), 0);
  };

  const getCartProfit = () => {
    return cart.reduce((total: number, item: CartItem) => total + ((item.sellingPrice - item.originalPrice) * (item.quantity || 1)), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getProfitMargin = (original: number, selling: number) => {
    return Math.round(((selling - original) / original) * 100);
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Chine': '🇨🇳',
      'Turquie': '🇹🇷',
      'Dubaï': '🇦🇪'
    };
    return flags[country] || '🌍';
  };

  const handleAddToCart = (product: ScrapedProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      sellingPrice: product.sellingPrice,
      originalPrice: product.originalPrice,
      profitMargin: product.profitMargin,
      source: product.source,
      country: product.country,
      quantity: 1
    });
  };

  const formatLastUpdate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header avec statut de connexion */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DL Trade - Scraping International</h1>
              <p className="text-gray-600 mt-2">
                Découvrez les meilleurs produits de Chine, Turquie et Dubaï avec marge de bénéfice de 40%
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Statut de connexion */}
              <div className="flex items-center space-x-2">
                {connectionStatus === 'online' && (
                  <div className="flex items-center text-green-600">
                    <Wifi className="w-4 h-4 mr-1" />
                    <span className="text-sm">En ligne</span>
                  </div>
                )}
                {connectionStatus === 'offline' && (
                  <div className="flex items-center text-red-600">
                    <WifiOff className="w-4 h-4 mr-1" />
                    <span className="text-sm">Hors ligne</span>
                  </div>
                )}
                {connectionStatus === 'updating' && (
                  <div className="flex items-center text-blue-600">
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    <span className="text-sm">Mise à jour...</span>
                  </div>
                )}
              </div>

              {/* Contrôles de mise à jour */}
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => setAutoRefresh(!autoRefresh)} 
                  variant={autoRefresh ? "default" : "outline"}
                  size="sm"
                >
                  {autoRefresh ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Auto
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Manuel
                    </>
                  )}
                </Button>
                
                <select 
                  value={updateInterval / 1000} 
                  onChange={(e) => setUpdateInterval(parseInt(e.target.value) * 1000)}
                  className="text-sm border rounded px-2 py-1"
                  disabled={!autoRefresh}
                >
                  <option value={15}>15s</option>
                  <option value={30}>30s</option>
                  <option value={60}>1min</option>
                  <option value={300}>5min</option>
                </select>
              </div>

              <Button onClick={loadInitialData} disabled={loading} variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Link href="/novacore/dl-style/panier">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="default">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Indicateur de dernière mise à jour */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Dernière mise à jour : {formatLastUpdate(lastUpdate)}</span>
              {autoRefresh && (
                <span>Prochaine mise à jour dans : {Math.ceil((updateInterval - (Date.now() - lastUpdate.getTime())) / 1000)}s</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>Produits en stock : {products.length}</span>
              <span>•</span>
              <span>Prix mis à jour en temps réel</span>
            </div>
          </div>

          {/* Statistiques */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Package className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Total Produits</p>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Globe className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Pays</p>
                      <p className="text-2xl font-bold">{stats.countries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Prix Moyen</p>
                      <p className="text-2xl font-bold">{formatPrice(stats.averageSellingPrice)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Marge Moyenne</p>
                      <p className="text-2xl font-bold">{stats.averageProfitMargin}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Mise à jour</p>
                      <p className="text-lg font-bold text-green-600">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Produits Scrapés</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="cart">Panier ({cart.length})</TabsTrigger>
            <TabsTrigger value="profit">Bénéfices</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Filtres */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Recherche
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Catégorie
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Toutes les catégories</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Pays
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Tous les pays</option>
                      {countries.map(country => (
                        <option key={country.id} value={country.id}>
                          {getCountryFlag(country.name)} {country.name} ({country.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Source
                    </label>
                    <select
                      value={selectedSource}
                      onChange={(e) => setSelectedSource(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Toutes les sources</option>
                      {sources.map(source => (
                        <option key={source.id} value={source.id}>
                          {source.name} ({source.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Trier par
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="popularity">Popularité</option>
                      <option value="price-low">Prix croissant</option>
                      <option value="price-high">Prix décroissant</option>
                      <option value="profit">Bénéfice</option>
                      <option value="rating">Note</option>
                      <option value="sales">Ventes</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produits */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Scraping en cours...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex space-x-1">
                        <Badge variant="secondary" className="bg-blue-600 text-white">
                          {product.source}
                        </Badge>
                        <Badge variant="outline" className="bg-white/90">
                          {getCountryFlag(product.country)}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive" className="bg-green-600">
                          +{product.profitMargin}%
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-t-lg" />
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">
                          {product.name}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAddToCart(product)}
                          className="flex-shrink-0"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">
                            {formatPrice(product.sellingPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Stock: {product.stock}</span>
                          <span>Ventes: {product.sales.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{product.shipping}</span>
                          <span>{product.delivery}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Ajouter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(product.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Pays</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {countries.map(country => (
                      <div key={country.id} className="flex items-center justify-between">
                        <span className="text-sm flex items-center">
                          {getCountryFlag(country.name)} {country.name}
                        </span>
                        <Badge variant="secondary">{country.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sources.map(source => (
                      <div key={source.id} className="flex items-center justify-between">
                        <span className="text-sm">{source.name}</span>
                        <Badge variant="secondary">{source.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
                <p className="text-gray-600">Ajoutez des produits pour commencer</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.source} • {item.country}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-sm font-medium text-green-600">
                                {formatPrice(item.sellingPrice)}
                              </p>
                              <p className="text-sm text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                +{item.profitMargin}%
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">Qté: {(item as any).quantity || 1}</span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Sous-total</h3>
                        <span className="text-xl font-bold text-green-600">
                          {formatPrice(getCartTotal())}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Bénéfice estimé</h3>
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(getCartProfit())}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Commander
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="profit" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Stratégie de Bénéfice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Marge de bénéfice</span>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        40%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Prix d'achat moyen</span>
                      <span className="font-bold">{stats ? formatPrice(stats.averageOriginalPrice) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Prix de vente moyen</span>
                      <span className="font-bold">{stats ? formatPrice(stats.averageSellingPrice) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Bénéfice total potentiel</span>
                      <span className="font-bold">{stats ? formatPrice(stats.totalProfit) : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Produits Rentables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sortedProducts
                      .sort((a, b) => (b.sellingPrice - b.originalPrice) - (a.sellingPrice - a.originalPrice))
                      .slice(0, 5)
                      .map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            <span className="text-sm font-medium">{product.name}</span>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            +{formatPrice(product.sellingPrice - product.originalPrice)}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 