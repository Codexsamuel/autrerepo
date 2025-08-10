"use client";

import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    AlertCircle,
    ExternalLink,
    Eye,
    Heart,
    MapPin,
    Package,
    RefreshCw,
    Search,
    ShoppingCart,
    Star,
    Store
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from './cart-context';

interface TaobaoProduct {
  id: string;
  title: string;
  description?: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: string[];
  rating?: number;
  reviews?: number;
  availability: boolean;
  category: string;
  brand?: string;
  features?: string[];
  specifications?: Record<string, any>;
  url: string;
  site: 'taobao' | '1688';
  seller?: {
    name: string;
    rating: number;
    location: string;
  };
}

interface TaobaoProductsClientProps {
  selectedCurrency: 'EUR' | 'USD' | 'FCFA';
  convertPrice: (priceUSD: number, currency: 'EUR' | 'USD' | 'FCFA') => number;
  formatPrice: (price: number, currency: 'EUR' | 'USD' | 'FCFA') => string;
  getCurrencySymbol: (currency: 'EUR' | 'USD' | 'FCFA') => string;
}

export default function TaobaoProductsClient({
  selectedCurrency,
  convertPrice,
  formatPrice,
  getCurrencySymbol
}: TaobaoProductsClientProps) {
  const [products, setProducts] = useState<TaobaoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSite, setSelectedSite] = useState<'taobao' | '1688'>('1688');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { addToCart } = useCart();

  // Utiliser useMemo pour filtrer les produits de manière optimisée
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    
    let filtered = products;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtre par site
    filtered = filtered.filter(product => product.site === selectedSite);

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedSite]);

  // Fonction pour charger les produits Taobao/1688
  const loadTaobaoProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        query: searchQuery || 'electronics',
        site: selectedSite,
        page: currentPage.toString(),
        limit: '12'
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`/api/taobao/products?${params}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits Taobao/1688');
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
        setTotalProducts(data.pagination?.total || data.data.length);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setProducts([]);
        if (data.error) {
          setError(data.error);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits Taobao/1688:', error);
      setProducts([]);
      setError('Erreur de connexion au serveur Taobao/1688');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour charger les catégories Taobao/1688
  const loadTaobaoCategories = async () => {
    try {
      const response = await fetch('/api/taobao/products?action=categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories Taobao/1688:', error);
    }
  };

  useEffect(() => {
    loadTaobaoCategories();
  }, []);

  useEffect(() => {
    loadTaobaoProducts();
  }, [searchQuery, selectedCategory, selectedSite, currentPage]);

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product: TaobaoProduct) => {
    try {
      // Convertir TaobaoProduct en format Product compatible
      const cartProduct = {
        id: product.id,
        name: product.title,
        description: product.description || '',
        originalPrice: product.price.original || product.price.current,
        sellingPrice: product.price.current,
        currency: product.price.currency,
        images: product.images,
        category: product.category,
        market: product.site as any,
        supplier: {
          name: product.seller?.name || product.brand || 'Taobao/1688',
          contact: '',
          location: product.seller?.location || 'China'
        },
        specifications: product.specifications || {},
        shippingOptions: {
          withCustoms: true,
          withTransport: true
        },
        stock: product.availability ? 10 : 0,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        createdAt: new Date()
      };
      
      addToCart(cartProduct);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadTaobaoProducts();
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
            <Card key={`loading-${i}`} className="animate-pulse">
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

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Erreur de chargement Taobao/1688
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={loadTaobaoProducts} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Réessayer
        </Button>
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
                Produits Taobao & 1688
              </h1>
              <p className="mt-2 text-gray-600">
                Sélection de produits authentiques de Chine avec livraison au Cameroun
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{totalProducts}</div>
                <div className="text-sm text-gray-600">Produits Chinois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Catégories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher sur Taobao/1688..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
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

            <Select value={selectedSite} onValueChange={(value) => {
              setSelectedSite(value as 'taobao' | '1688');
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1688">1688.com (B2B)</SelectItem>
                <SelectItem value="taobao">Taobao.com (B2C)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSite('1688');
                setCurrentPage(1);
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={`taobao-${product.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-200 relative">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                  🇨🇳 {product.site === '1688' ? '1688' : 'Taobao'}
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
                  {product.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description || 'Description non disponible'}
                </p>

                {/* Vendeur */}
                {product.seller && (
                  <div className="flex items-center space-x-2 mb-3">
                    <Store className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{product.seller.name}</div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{product.seller.rating}</span>
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{product.seller.location}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating || 0}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews || 0})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(convertPrice(product.price.current, selectedCurrency), selectedCurrency)}
                    </div>
                    {product.price.original && product.price.original > product.price.current && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(convertPrice(product.price.original, selectedCurrency), selectedCurrency)}
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {product.availability ? 'En stock' : 'Rupture'}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun produit Taobao/1688 trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 
