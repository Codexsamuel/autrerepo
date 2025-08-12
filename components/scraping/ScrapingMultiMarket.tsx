'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    BarChart3,
    Clock,
    Database,
    Download,
    Globe,
    Play,
    Pause,
    RotateCcw,
    Settings,
    ShoppingCart,
    Target,
    TrendingUp,
    Truck,
    Zap,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Eye
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  brand?: string;
  category: string;
  rating?: number;
  reviews?: number;
  platform: string;
  scrapedAt: string;
}

interface ScrapingResult {
  platform: string;
  category: string;
  totalResults: number;
  products: Product[];
  timestamp: string;
}

export default function ScrapingMultiMarket() {
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const [results, setResults] = useState<ScrapingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("vehicles");

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const platforms = [
    { value: "all", label: "Toutes les plateformes", icon: Globe, color: "bg-gradient-to-r from-blue-500 to-purple-500" },
    { value: "alibaba", label: "Alibaba", icon: TrendingUp, color: "bg-orange-500" },
    { value: "shein", label: "Shein", icon: Zap, color: "bg-pink-500" },
    { value: "cdiscount", label: "Cdiscount", icon: ShoppingCart, color: "bg-blue-500" },
    { value: "amazon", label: "Amazon", icon: Globe, color: "bg-yellow-500" },
    { value: "ebay", label: "eBay", icon: Clock, color: "bg-red-500" },
    { value: "aliexpress", label: "AliExpress", icon: TrendingUp, color: "bg-green-500" }
  ];

  const categories = [
    { value: "vehicles", label: "Véhicules", icon: Truck, color: "bg-blue-100 text-blue-800" },
    { value: "furniture", label: "Meubles", icon: Settings, color: "bg-green-100 text-green-800" },
    { value: "electronics", label: "Électronique", icon: BarChart3, color: "bg-purple-100 text-purple-800" },
    { value: "men-clothing", label: "Vêtements Homme", icon: TrendingUp, color: "bg-indigo-100 text-indigo-800" },
    { value: "women-clothing", label: "Vêtements Femme", icon: Zap, color: "bg-pink-100 text-pink-800" },
    { value: "accessories", label: "Accessoires", icon: Database, color: "bg-orange-100 text-orange-800" }
  ];

  const stats = [
    { label: 'Plateformes supportées', value: '7', icon: Globe, color: 'text-blue-600' },
    { label: 'Produits scrapés', value: '2.5M+', icon: Database, color: 'text-green-600' },
    { label: 'Mise à jour quotidienne', value: '24h', icon: Clock, color: 'text-purple-600' },
    { label: 'Précision des données', value: '99.8%', icon: Target, color: 'text-orange-600' }
  ];

  const recentScrapes = [
    {
      id: 1,
      platform: 'Amazon',
      category: 'Électronique',
      products: 1247,
      status: 'completed',
      date: '2024-01-15',
      duration: '2h 34m',
      color: 'bg-green-500'
    },
    {
      id: 2,
      platform: 'eBay',
      category: 'Mode',
      products: 892,
      status: 'completed',
      date: '2024-01-14',
      duration: '1h 45m',
      color: 'bg-green-500'
    },
    {
      id: 3,
      platform: 'Alibaba',
      category: 'Maison',
      products: 2156,
      status: 'running',
      date: '2024-01-15',
      duration: '45m',
      color: 'bg-yellow-500'
    }
  ];

  const startScraping = async () => {
    setIsScraping(true);
    setScrapingProgress(0);
    setError(null);
    setResults(null);

    try {
      // Simuler le progrès du scraping
      const progressInterval = setInterval(() => {
        setScrapingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 3000));

      clearInterval(progressInterval);
      setScrapingProgress(100);

      // Données simulées pour la démonstration
      const mockResults: ScrapingResult = {
        platform: selectedPlatform,
        category: selectedCategory,
        totalResults: Math.floor(Math.random() * 1000) + 100,
        products: [
          {
            id: '1',
            title: 'iPhone 15 Pro Max - 256GB',
            price: 1299,
            originalPrice: 1499,
            currency: 'EUR',
            description: 'Le dernier iPhone avec puce A17 Pro et appareil photo 48MP',
            brand: 'Apple',
            category: 'Electronics',
            rating: 4.8,
            reviews: 1247,
            platform: 'amazon',
            scrapedAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'MacBook Pro M3 - 14"',
            price: 1999,
            currency: 'EUR',
            description: 'Ordinateur portable professionnel avec puce M3',
            brand: 'Apple',
            category: 'Electronics',
            rating: 4.9,
            reviews: 892,
            platform: 'amazon',
            scrapedAt: new Date().toISOString()
          }
        ],
        timestamp: new Date().toISOString()
      };

      setResults(mockResults);

      // Reset progress after a delay
      setTimeout(() => setScrapingProgress(0), 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setScrapingProgress(0);
    } finally {
      setIsScraping(false);
    }
  };

  const exportResults = () => {
    if (!results) return;

    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scraping-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement du module de scraping...</h2>
          <p className="text-gray-500">Initialisation des composants de collecte de données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Database className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Scraping Multi-Market</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">
              API de collecte de données produits depuis les principales plateformes e-commerce
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Tester l'API
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Plateformes supportées */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Plateformes supportées
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.value} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl group-hover:scale-110 transition-transform`}>
                    <platform.icon />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{platform.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interface de scraping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contrôles */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Settings className="w-6 h-6 mr-3" />
                Configuration du scraping
              </CardTitle>
              <CardDescription>
                Configurez vos paramètres de collecte de données
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Plateforme
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={startScraping}
                  disabled={isScraping}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isScraping ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      En cours...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Démarrer
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={isScraping}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {isScraping && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Progression</span>
                    <span>{Math.round(scrapingProgress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scrapingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Résultats en temps réel */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <BarChart3 className="w-6 h-6 mr-3" />
                Résultats en temps réel
              </CardTitle>
              <CardDescription>
                Suivez l'avancement de vos collectes de données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScrapes.map((scrape) => (
                  <div key={scrape.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(scrape.status)}
                      <div>
                        <h4 className="font-medium text-slate-800">{scrape.platform}</h4>
                        <p className="text-sm text-slate-600">{scrape.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-800">{scrape.products} produits</div>
                      <div className="text-sm text-slate-600">{scrape.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résultats du scraping */}
        {results && (
          <div className="mb-16">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      <Database className="w-6 h-6 mr-3" />
                      Résultats du scraping
                    </CardTitle>
                    <CardDescription>
                      {results.totalResults} produits trouvés sur {results.platform}
                    </CardDescription>
                  </div>
                  <Button onClick={exportResults} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.products.map((product) => (
                    <div key={product.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {product.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-2">{product.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                            <span className="font-medium text-green-600">{product.price} {product.currency}</span>
                            {product.originalPrice && (
                              <span className="line-through">{product.originalPrice} {product.currency}</span>
                            )}
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {product.reviews} avis
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {product.platform}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à collecter vos données ?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Commencez dès maintenant avec notre API de scraping multi-market
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Voir les tarifs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 