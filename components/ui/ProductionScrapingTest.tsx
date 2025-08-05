"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search, ExternalLink, Star, ShoppingCart, Globe } from 'lucide-react';

interface NormalizedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  source: string;
  rating?: number;
  reviews?: number;
  seller?: string;
  location?: string;
  shipping?: string;
  availability?: string;
  description?: string;
  category?: string;
  tags?: string[];
  score?: number;
  margin?: number;
  memberId?: string;
  shopName?: string;
}

interface ScrapingResult {
  keyword: string;
  totalProducts: number;
  products: NormalizedProduct[];
  sources: {
    [key: string]: {
      count: number;
      success: boolean;
      error?: string;
    };
  };
  timestamp: string;
  executionTime: number;
}

interface SourceStats {
  name: string;
  description: string;
  margin: string;
  reliability: string;
}

interface AllSourcesStats {
  totalSources: number;
  sources: {
    [key: string]: SourceStats;
  };
  features: string[];
}

export function ProductionScrapingTest() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScrapingResult | null>(null);
  const [stats, setStats] = useState<AllSourcesStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [limit, setLimit] = useState(10);

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = selectedSource === 'all' 
        ? `/api/scrape-production?keyword=${encodeURIComponent(keyword)}&limit=${limit}`
        : `/api/scrape-production?keyword=${encodeURIComponent(keyword)}&source=${selectedSource}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors du scraping');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/scrape-production?stats=true');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getSourceColor = (source: string) => {
    const colors = {
      'aliexpress': 'bg-orange-100 text-orange-800',
      'ebay': 'bg-blue-100 text-blue-800',
      '1688': 'bg-red-100 text-red-800',
      'taobao': 'bg-yellow-100 text-yellow-800',
      'google-shopping': 'bg-green-100 text-green-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (source: string) => {
    const icons = {
      'aliexpress': '🛒',
      'ebay': '🏪',
      '1688': '🏭',
      'taobao': '🛍️',
      'google-shopping': '🔍'
    };
    return icons[source as keyof typeof icons] || '📦';
  };

  const ProductCard = ({ product }: { product: NormalizedProduct }) => (
    <Card className="h-full">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getSourceColor(product.source)}>
            {getSourceIcon(product.source)} {product.source.toUpperCase()}
          </Badge>
          {product.score !== undefined && (
            <Badge variant="secondary">
              Score: {product.score}
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.margin && (
            <div className="text-xs text-blue-600">
              Marge: {formatPrice(product.margin)}
            </div>
          )}
          
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-gray-500">({product.reviews})</span>
              )}
            </div>
          )}
          
          {product.seller && (
            <div className="text-xs text-gray-600">
              Vendeur: {product.seller}
            </div>
          )}
          
          {product.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Globe className="w-3 h-3" />
              {product.location}
            </div>
          )}
        </div>
        
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open(product.url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Voir
          </Button>
          <Button size="sm" className="flex-1">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          🚀 Scraping Production Ready
        </h1>
        <p className="text-gray-600">
          Système de scraping e-commerce avec fallback automatique et données réelles
        </p>
      </div>

      {/* Contrôles */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Recherche de Produits</CardTitle>
          <CardDescription>
            Testez le système de scraping avec fallback automatique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Mot-clé (ex: iphone, laptop, chaussures)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
            <div className="w-32">
              <Input
                type="number"
                placeholder="Limite"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                min="1"
                max="50"
                disabled={loading}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading || !keyword.trim()}
              className="min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Rechercher
            </Button>
          </div>

          <div className="flex gap-4">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-3 py-2 border rounded-md"
              disabled={loading}
            >
              <option value="all">Toutes les sources</option>
              <option value="aliexpress">AliExpress</option>
              <option value="ebay">eBay</option>
              <option value="1688">1688</option>
              <option value="taobao">Taobao</option>
              <option value="google-shopping">Google Shopping</option>
            </select>

            <Button 
              variant="outline" 
              onClick={loadStats}
              disabled={loading}
            >
              📊 Statistiques
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Statistiques des Sources</CardTitle>
            <CardDescription>
              {stats.totalSources} sources disponibles avec fallback automatique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.sources).map(([key, source]) => (
                <div key={key} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSourceColor(key)}>
                      {getSourceIcon(key)} {source.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                  <div className="text-xs space-y-1">
                    <div>Marge: <span className="font-semibold">{source.margin}</span></div>
                    <div>Fiabilité: <span className="font-semibold">{source.reliability}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résultats */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600">❌ {error}</div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>
              📦 Résultats ({results.totalProducts} produits)
            </CardTitle>
            <CardDescription>
              Temps d'exécution: {results.executionTime}ms | 
              Mot-clé: "{results.keyword}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Statistiques par source */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">📊 Répartition par Source</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(results.sources).map(([source, stats]) => (
                  <Badge 
                    key={source} 
                    variant={stats.success ? "default" : "destructive"}
                    className={getSourceColor(source)}
                  >
                    {getSourceIcon(source)} {source}: {stats.count}
                    {!stats.success && stats.error && (
                      <span className="ml-1">({stats.error})</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Produits */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">Tous ({results.products.length})</TabsTrigger>
                {Object.keys(results.sources).map(source => (
                  <TabsTrigger key={source} value={source}>
                    {getSourceIcon(source)} {results.sources[source].count}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              {Object.keys(results.sources).map(source => (
                <TabsContent key={source} value={source} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {results.products
                      .filter(product => product.source === source)
                      .map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 