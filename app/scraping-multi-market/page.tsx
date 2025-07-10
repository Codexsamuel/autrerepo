"use client";
import AdvancedSEO from '@/components/AdvancedSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    BarChart3,
    Clock,
    Database,
    Download,
    FileText,
    Globe,
    Pause,
    Play,
    RotateCcw,
    Settings,
    ShoppingCart,
    Target,
    TrendingUp,
    Truck,
    Zap
} from "lucide-react";
import { useState } from "react";

interface Product {
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
  seller?: string;
  sellerRating?: number;
  location?: string;
  shipping?: string;
  minOrder?: number;
  stock?: number;
  tags: string[];
  specifications?: Record<string, string>;
  url: string;
  platform: string;
  scrapedAt: string;
}

interface ScrapingResult {
  platform: string;
  category: string;
  query?: string;
  totalResults: number;
  products: Product[];
  timestamp: string;
  metadata: {
    scrapedFrom: string[];
    filters: any;
  };
}

export default function MultiMarketScrapingPage() {
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const [results, setResults] = useState<ScrapingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("vehicles");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [limit, setLimit] = useState(20);
  const [country, setCountry] = useState("FR");

  const platforms = [
    { value: "all", label: "Toutes les plateformes", icon: Globe },
    { value: "alibaba", label: "Alibaba", icon: TrendingUp },
    { value: "shein", label: "Shein", icon: Zap },
    { value: "cdiscount", label: "Cdiscount", icon: ShoppingCart },
    { value: "amazon", label: "Amazon", icon: Globe },
    { value: "ebay", label: "eBay", icon: Clock },
    { value: "aliexpress", label: "AliExpress", icon: TrendingUp }
  ];

  const categories = [
    { value: "vehicles", label: "Véhicules", icon: Truck },
    { value: "furniture", label: "Meubles", icon: Settings },
    { value: "electronics", label: "Électronique", icon: BarChart3 },
    { value: "men-clothing", label: "Vêtements Homme", icon: FileText },
    { value: "women-clothing", label: "Vêtements Femme", icon: FileText },
    { value: "accessories", label: "Accessoires", icon: Database }
  ];

  const sortOptions = [
    { value: "relevance", label: "Pertinence" },
    { value: "price-low", label: "Prix croissant" },
    { value: "price-high", label: "Prix décroissant" },
    { value: "rating", label: "Note" },
    { value: "reviews", label: "Avis" }
  ];

  const countries = [
    { value: "FR", label: "France" },
    { value: "US", label: "États-Unis" },
    { value: "UK", label: "Royaume-Uni" },
    { value: "DE", label: "Allemagne" },
    { value: "IT", label: "Italie" },
    { value: "ES", label: "Espagne" }
  ];

  const stats = [
    { label: 'Plateformes supportées', value: '6', icon: Globe },
    { label: 'Produits scrapés', value: '2.5M+', icon: Database },
    { label: 'Mise à jour quotidienne', value: '24h', icon: Clock },
    { label: 'Précision des données', value: '99.8%', icon: Target }
  ];

  const recentScrapes = [
    {
      id: 1,
      platform: 'Amazon',
      category: 'Électronique',
      products: 1247,
      status: 'completed',
      date: '2024-01-15',
      duration: '2h 34m'
    },
    {
      id: 2,
      platform: 'eBay',
      category: 'Mode',
      products: 892,
      status: 'completed',
      date: '2024-01-14',
      duration: '1h 45m'
    },
    {
      id: 3,
      platform: 'Alibaba',
      category: 'Maison',
      products: 2156,
      status: 'running',
      date: '2024-01-15',
      duration: '45m'
    }
  ];

  const startScraping = async () => {
    setIsScraping(true);
    setScrapingProgress(0);
    setError(null);
    setResults(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setScrapingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const response = await fetch('/api/scraping/multi-market', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          category: selectedCategory,
          query: searchQuery || undefined,
          limit,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sortBy,
          country
        }),
      });

      clearInterval(progressInterval);
      setScrapingProgress(100);

      if (!response.ok) {
        throw new Error('Erreur lors du scraping');
      }

      const data = await response.json();
      setResults(data.data);

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

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      alibaba: 'bg-orange-500',
      shein: 'bg-pink-500',
      cdiscount: 'bg-blue-500',
      amazon: 'bg-yellow-500',
      ebay: 'bg-red-500',
      aliexpress: 'bg-green-500'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, any> = {
      alibaba: TrendingUp,
      shein: Zap,
      cdiscount: ShoppingCart,
      amazon: Globe,
      ebay: Clock,
      aliexpress: TrendingUp
    };
    return icons[platform] || Globe;
  };

  return (
    <>
      <AdvancedSEO
        title="Scraping Multi-Market - API de Collecte de Données"
        description="API scraping multi-plateformes : Amazon, eBay, Alibaba, Shein, Cdiscount, AliExpress. Collecte de données produits en temps réel."
        keywords="scraping, API, collecte données, Amazon, eBay, Alibaba, Shein, Cdiscount, AliExpress, produits, data, marketplace, extraction, analyse, DL Solutions"
        image="https://dlsolutions.com/images/scraping-og.jpg"
        url="https://dlsolutions.com/scraping-multi-market"
        type="website"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'Scraping Multi-Market', url: 'https://dlsolutions.com/scraping-multi-market' }
        ]}
        faq={[
          {
            question: "Quelles plateformes sont supportées ?",
            answer: "Nous supportons Amazon, eBay, Alibaba, Shein, Cdiscount et AliExpress."
          },
          {
            question: "Les données sont-elles mises à jour en temps réel ?",
            answer: "Oui, nos données sont mises à jour toutes les 24 heures pour garantir leur fraîcheur."
          },
          {
            question: "L'API est-elle sécurisée ?",
            answer: "Oui, notre API utilise des protocoles sécurisés et respecte les conditions d'utilisation des plateformes."
          }
        ]}
      />
      
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

        {/* Statistiques */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {platforms.map((platform) => (
                <Card key={platform.value} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${getPlatformColor(platform.value)} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                      {platform.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800">{platform.label}</h3>
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
                    <option value="all">Toutes les plateformes</option>
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
                    <option value="all">Toutes les catégories</option>
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
                      <span>{scrapingProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scrapingProgress}%` }}
                      />
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
                        <div className={`w-3 h-3 rounded-full ${
                          scrape.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
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

          {/* Fonctionnalités */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              Fonctionnalités avancées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Scraping en temps réel</CardTitle>
                  <CardDescription>
                    Collectez les données les plus récentes avec une mise à jour continue
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Export multiple</CardTitle>
                  <CardDescription>
                    Exportez vos données en JSON, CSV, Excel ou via API REST
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Analytics avancés</CardTitle>
                  <CardDescription>
                    Analysez les tendances et obtenez des insights sur les marchés
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

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
    </>
  );
} 