"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  RefreshCw,
  TrendingUp
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

interface ScrapingStats {
  totalProducts: number;
  categories: string[];
  sources: string[];
  countries: string[];
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
  const [stats, setStats] = useState<ScrapingStats | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  // Fonction pour charger les produits depuis l'API
  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        category: category,
        country: selectedMarket
      });
      
      const response = await fetch(`/api/scraping/chinese-stores?${params}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        // Fallback vers un tableau vide si l'API ne retourne rien
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/scraping/chinese-stores?action=stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }

      const categoriesResponse = await fetch('/api/scraping/chinese-stores?action=categories');
      const categoriesData = await categoriesResponse.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }

      const sourcesResponse = await fetch('/api/scraping/chinese-stores?action=sources');
      const sourcesData = await sourcesResponse.json();
      if (sourcesData.success) {
        setSources(sourcesData.data);
      }

      const countriesResponse = await fetch('/api/scraping/chinese-stores?action=countries');
      const countriesData = await countriesResponse.json();
      if (countriesData.success) {
        setCountries(countriesData.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  useEffect(() => {
    loadStats();
    loadProducts();
  }, []);

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

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sellingPrice,
      currency: selectedCurrency as 'EUR' | 'USD' | 'FCFA',
      image: product.images[0] || '',
      quantity: 1
    });
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

  const getMarketColor = (market: string) => {
    switch (market) {
      case 'china':
        return 'bg-red-100 text-red-800';
      case 'dubai':
        return 'bg-green-100 text-green-800';
      case 'turkey':
        return 'bg-blue-100 text-blue-800';
      case 'cameroon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    loadProducts();
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Boutique Internationale
              </h1>
              <p className="mt-2 text-gray-600">
                Produits premium de Chine, Dubaï, Turquie et Cameroun
              </p>
            </div>
            
            {stats && (
              <div className="mt-4 lg:mt-0 flex space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
                  <div className="text-sm text-gray-600">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.categories.length}</div>
                  <div className="text-sm text-gray-600">Catégories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.countries.length}</div>
                  <div className="text-sm text-gray-600">Pays</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Select value={category} onValueChange={(value) => {
              setSelectedMarket(value === 'all' ? 'all' : value as string);
              setSearchQuery('');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedMarket} onValueChange={(value) => {
              setSelectedMarket(value === 'all' ? 'all' : value as string);
              setSearchQuery('');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  <Badge className={`absolute top-2 left-2 ${getMarketColor(product.market)}`}>
                    {getMarketFlag(product.market)} {getMarketName(product.market)}
                  </Badge>
                  
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(convertPrice(product.sellingPrice, selectedCurrency), selectedCurrency)}
                      </div>
                      {product.originalPrice > product.sellingPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(convertPrice(product.originalPrice, selectedCurrency), selectedCurrency)}
                        </div>
                      )}
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 