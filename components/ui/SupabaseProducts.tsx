"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SupabaseProduct } from '@/lib/supabase-scraper';
import { Database, ExternalLink, Loader2, MapPin, Search, ShoppingCart, Star, TrendingUp, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SupabaseProductsProps {
  initialKeyword?: string;
  showScrapingControls?: boolean;
}

export function SupabaseProducts({ initialKeyword = '', showScrapingControls = true }: SupabaseProductsProps) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');

  // Charger les produits depuis Supabase
  const loadProducts = async (searchKeyword?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        action: 'get',
        limit: '50'
      });

      if (searchKeyword) {
        params.set('search', searchKeyword);
      }
      if (selectedSource !== 'all') {
        params.set('source', selectedSource);
      }

      const response = await fetch(`/api/scrape-supabase?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
        setStats(data.stats);
      } else {
        setError(data.error || 'Erreur lors du chargement');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  // Scraper et sauvegarder de nouveaux produits
  const scrapeAndSave = async () => {
    if (!keyword.trim()) return;

    setScraping(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        keyword: keyword,
        source: selectedSource,
        limit: '20',
        save: 'true'
      });

      const response = await fetch(`/api/scrape-supabase?${params}`);
      const data = await response.json();

      if (data.success) {
        console.log('✅ Scraping terminé:', data.supabase);
        // Recharger les produits après le scraping
        await loadProducts();
      } else {
        setError(data.error || 'Erreur lors du scraping');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setScraping(false);
    }
  };

  // Charger les statistiques
  const loadStats = async () => {
    try {
      const response = await fetch('/api/scrape-supabase?action=stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  // Charger les données au montage
  useEffect(() => {
    loadProducts();
    loadStats();
  }, [selectedSource]);

  // Gestionnaire de recherche
  const handleSearch = () => {
    loadProducts(keyword);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Formater le prix selon la devise
  const formatPrice = (price: number | undefined, currency: string) => {
    if (!price) return 'Prix non disponible';
    
    const symbols = {
      EUR: '€',
      USD: '$',
      FCFA: 'FCFA'
    };

    const symbol = symbols[currency as keyof typeof symbols] || '€';
    return `${symbol}${price.toFixed(2)}`;
  };

  // Obtenir le prix selon la devise sélectionnée
  const getProductPrice = (product: SupabaseProduct) => {
    switch (selectedCurrency) {
      case 'USD':
        return product.price_usd;
      case 'FCFA':
        return product.price_fcfa;
      default:
        return product.price_eur;
    }
  };

  // Obtenir la couleur selon la source
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

  // Composant carte produit
  const ProductCard = ({ product }: { product: SupabaseProduct }) => {
    const price = getProductPrice(product);
    const sellingPrice = product.selling_price || 0;
    const profitMargin = product.profit_margin || 0;

    return (
      <Card className="h-full flex flex-col">
        <div className="relative">
          <img
            src={product.image_url || '/images/placeholder.jpg'}
            alt={product.title_fr || product.title}
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
          {profitMargin > 0 && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              +{formatPrice(profitMargin, selectedCurrency)}
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
            {product.title_fr || product.title}
          </h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">
                {formatPrice(sellingPrice, selectedCurrency)}
              </span>
              {price !== sellingPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(price, selectedCurrency)}
                </span>
              )}
            </div>
            
            {profitMargin > 0 && (
              <div className="text-xs text-green-600 bg-green-50 p-1 rounded">
                💰 Marge: {formatPrice(profitMargin, selectedCurrency)}
              </div>
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
            {product.shipping_info && (
              <div className="flex items-center gap-1">
                <Truck className="w-3 h-3" />
                <span>{product.shipping_info}</span>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-2">
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => window.open(product.product_url, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Voir le produit
            </Button>
            
            <div className="text-xs text-gray-500">
              Mis à jour: {new Date(product.updated_at).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Contrôles de scraping */}
      {showScrapingControls && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Scraping et Sauvegarde Supabase
            </CardTitle>
            <CardDescription>
              Scraper de nouveaux produits et les sauvegarder dans la base de données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Mot-clé à scraper (ex: iphone, laptop...)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="aliexpress">AliExpress</SelectItem>
                  <SelectItem value="ebay">eBay</SelectItem>
                  <SelectItem value="taobao">Taobao</SelectItem>
                  <SelectItem value="1688">1688</SelectItem>
                  <SelectItem value="google">Google Shopping</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={scrapeAndSave} 
                disabled={scraping || !keyword.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {scraping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                Scraper & Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contrôles de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher dans la Base de Données
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Rechercher des produits..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sources</SelectItem>
                <SelectItem value="AliExpress">AliExpress</SelectItem>
                <SelectItem value="eBay">eBay</SelectItem>
                <SelectItem value="Taobao">Taobao</SelectItem>
                <SelectItem value="1688">1688</SelectItem>
                <SelectItem value="Google Shopping">Google Shopping</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="FCFA">FCFA</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={loading}>
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

      {/* Statistiques */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Statistiques Base de Données</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Produits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.keys(stats.productsBySource || {}).length}
                </div>
                <div className="text-sm text-gray-600">Sources Actives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{products.length}</div>
                <div className="text-sm text-gray-600">Affichés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleDateString() : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Dernière MAJ</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Erreur */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">❌ {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Produits */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Produits Sauvegardés ({products.length})
            </CardTitle>
            <CardDescription>
              Produits avec traduction automatique et marges calculées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Aucun produit */}
      {!loading && products.length === 0 && !error && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">Aucun produit trouvé. Essayez de scraper de nouveaux produits !</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 