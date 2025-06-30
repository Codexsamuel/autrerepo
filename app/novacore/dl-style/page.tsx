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
  CheckCircle,
  Euro,
  Coins
} from 'lucide-react';
import Link from 'next/link';
import { ScrapedProduct, ScrapingResult } from '@/lib/scraper/chinese-stores';
import { useCart, CartItem } from './cart-context';

// Types de devises
type Currency = 'EUR' | 'USD' | 'FCFA';

// Taux de change (à mettre à jour régulièrement)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
  FCFA: 655.957
};

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
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('EUR');
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

  // Conversion de devise
  const convertPrice = (price: number, fromCurrency: Currency = 'EUR', toCurrency: Currency = selectedCurrency) => {
    if (fromCurrency === toCurrency) return price;
    
    // Convertir d'abord en EUR, puis vers la devise cible
    const priceInEUR = fromCurrency === 'EUR' ? price : price / EXCHANGE_RATES[fromCurrency];
    return priceInEUR * EXCHANGE_RATES[toCurrency];
  };

  const formatPrice = (price: number, currency: Currency = selectedCurrency) => {
    const convertedPrice = convertPrice(price, 'EUR', currency);
    
    switch (currency) {
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(convertedPrice);
      case 'FCFA':
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'XAF'
        }).format(convertedPrice);
      default:
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        }).format(convertedPrice);
    }
  };

  const getCurrencyIcon = (currency: Currency) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-4 h-4" />;
      case 'FCFA':
        return <Coins className="w-4 h-4" />;
      default:
        return <Euro className="w-4 h-4" />;
    }
  };

  const getProfitMargin = (original: number, selling: number) => {
    return Math.round(((selling - original) / original) * 100);
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
              <h1 className="text-3xl font-bold text-gray-900">DL Style - Boutique Internationale</h1>
              <p className="text-gray-600 mt-2">
                Découvrez notre sélection de produits premium avec des prix compétitifs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Sélecteur de devise */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Devise:</span>
                <div className="flex border rounded-md overflow-hidden">
                  {(['EUR', 'USD', 'FCFA'] as Currency[]).map((currency) => (
                    <button
                      key={currency}
                      onClick={() => setSelectedCurrency(currency)}
                      className={`px-3 py-1 text-sm flex items-center space-x-1 transition-colors ${
                        selectedCurrency === currency
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {getCurrencyIcon(currency)}
                      <span>{currency}</span>
                    </button>
                  ))}
                </div>
              </div>

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
              <span>Produits disponibles : {products.length}</span>
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
                      <p className="text-sm text-gray-600">Catégories</p>
                      <p className="text-2xl font-bold">{stats.categories || categories.length}</p>
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
                      <p className="text-sm text-gray-600">Réduction Moyenne</p>
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
                      <p className="text-sm text-gray-600">Statut</p>
                      <p className="text-lg font-bold text-green-600">Actif</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="cart">Panier ({cart.length})</TabsTrigger>
            <TabsTrigger value="profit">Bénéfices</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Filtres */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      Fournisseur
                    </label>
                    <select
                      value={selectedSource}
                      onChange={(e) => setSelectedSource(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Tous les fournisseurs</option>
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
                      <option value="profit">Réduction</option>
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
                  <p className="text-gray-600">Chargement en cours...</p>
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
                          Premium
                        </Badge>
                        <Badge variant="outline" className="bg-white/90">
                          {product.source}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive" className="bg-green-600">
                          -{product.profitMargin}%
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Statistiques des Ventes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total des ventes</span>
                      <span className="font-bold">{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nombre de produits</span>
                      <span className="font-bold">{cart.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix moyen</span>
                      <span className="font-bold">
                        {cart.length > 0 ? formatPrice(getCartTotal() / cart.length) : formatPrice(0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Top Catégories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(0, 5).map((cat, index) => (
                      <div key={cat.id} className="flex justify-between items-center">
                        <span className="text-sm">{cat.name}</span>
                        <Badge variant="secondary">{cat.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
                  <p className="text-gray-600 mb-4">Ajoutez des produits pour commencer vos achats</p>
                  <Button onClick={() => setActiveTab('products')}>
                    Voir les produits
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Produits dans le panier</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-sm text-gray-600">{formatPrice(item.sellingPrice)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                disabled={(item.quantity || 1) <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity || 1}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              >
                                +
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé de la commande</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frais de livraison</span>
                          <span>Gratuit</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <Button className="w-full">
                          Procéder au paiement
                        </Button>
                        <Button variant="outline" className="w-full" onClick={clearCart}>
                          Vider le panier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Profit Tab */}
          <TabsContent value="profit" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Bénéfices Totaux
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(getCartProfit())}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Basé sur {cart.length} produits
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Percent className="w-5 h-5 mr-2" />
                    Marge Moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {cart.length > 0 
                      ? Math.round(cart.reduce((acc, item) => acc + item.profitMargin, 0) / cart.length)
                      : 0}%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Réduction moyenne
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Produits Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {cart.filter(item => item.profitMargin > 30).length}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Avec forte réduction
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 