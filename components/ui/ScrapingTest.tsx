"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search, ExternalLink, Star, ShoppingCart, Globe, MapPin, Truck } from 'lucide-react';
import { ScrapedProduct } from '@/lib/scraper';

interface ScrapingResult {
  success: boolean;
  data: {
    aliExpress?: { data: ScrapedProduct[]; total: number };
    ebay?: { data: ScrapedProduct[]; total: number };
    taobao?: { data: ScrapedProduct[]; total: number };
    '1688'?: { data: ScrapedProduct[]; total: number };
    googleShopping?: { data: ScrapedProduct[]; total: number };
  };
  stats: {
    keyword: string;
    sources: number;
    totalProducts: number;
    timestamp: string;
  };
}

export function ScrapingTest() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScrapingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}&limit=10`);
      const data = await response.json();

      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'Erreur lors du scraping');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return 'Prix non disponible';
    return price;
  };

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'AliExpress': 'bg-orange-100 text-orange-800',
      'eBay': 'bg-blue-100 text-blue-800',
      'Taobao': 'bg-red-100 text-red-800',
      '1688': 'bg-green-100 text-green-800',
      'Google Shopping': 'bg-purple-100 text-purple-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const ProductCard = ({ product }: { product: ScrapedProduct }) => (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <img
          src={product.image || '/images/placeholder.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
        <Badge className={`absolute top-2 left-2 ${getSourceColor(product.source)}`}>
          {product.source}
        </Badge>
        {product.rating && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400" />
            <span className="text-xs">{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="space-y-1 text-xs text-gray-600 mb-3">
          {product.seller && (
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-3 h-3" />
              <span>{product.seller}</span>
            </div>
          )}
          {product.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
            </div>
          )}
          {product.shipping && (
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>{product.shipping}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => window.open(product.url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Voir le produit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Test des APIs de Scraping Réelles
          </CardTitle>
          <CardDescription>
            Testez les vraies APIs RapidAPI pour récupérer des produits de vrais marchés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Entrez un mot-clé (ex: iphone, laptop, chaussures...)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading || !keyword.trim()}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">❌ {error}</p>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats pour "{results.stats.keyword}"</CardTitle>
            <CardDescription>
              {results.stats.totalProducts} produits trouvés sur {results.stats.sources} sources
              <br />
              <span className="text-xs text-gray-500">
                Dernière mise à jour: {new Date(results.stats.timestamp).toLocaleString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">Tous ({results.stats.totalProducts})</TabsTrigger>
                <TabsTrigger value="aliexpress">
                  AliExpress ({results.data.aliExpress?.total || 0})
                </TabsTrigger>
                <TabsTrigger value="ebay">
                  eBay ({results.data.ebay?.total || 0})
                </TabsTrigger>
                <TabsTrigger value="taobao">
                  Taobao ({results.data.taobao?.total || 0})
                </TabsTrigger>
                <TabsTrigger value="1688">
                  1688 ({results.data['1688']?.total || 0})
                </TabsTrigger>
                <TabsTrigger value="google">
                  Google ({results.data.googleShopping?.total || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Object.values(results.data).flatMap(source => source?.data || []).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="aliexpress" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.data.aliExpress?.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ebay" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.data.ebay?.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="taobao" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.data.taobao?.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="1688" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.data['1688']?.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="google" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.data.googleShopping?.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 