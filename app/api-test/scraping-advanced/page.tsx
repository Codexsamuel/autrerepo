'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { BarChart3, Clock, Download, Eye, Globe, MapPin, Package, RefreshCw, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScrapedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  market: 'china' | 'dubai' | 'turkey' | 'cameroon';
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  image: string;
  url: string;
  availability: boolean;
  shipping: string;
  scrapedAt: string;
  source: string;
}

interface MarketData {
  name: string;
  code: string;
  flag: string;
  products: number;
  avgPrice: number;
  currency: string;
  lastUpdate: string;
  status: 'active' | 'error' | 'updating';
}

export default function ScrapingAdvancedPage() {
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarket, setActiveMarket] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mockMarkets: MarketData[] = [
      {
        name: 'Chine',
        code: 'china',
        flag: '🇨🇳',
        products: 1247,
        avgPrice: 45.50,
        currency: 'CNY',
        lastUpdate: '2 min',
        status: 'active'
      },
      {
        name: 'Dubai',
        code: 'dubai',
        flag: '🇦🇪',
        products: 892,
        avgPrice: 125.30,
        currency: 'AED',
        lastUpdate: '5 min',
        status: 'active'
      },
      {
        name: 'Turquie',
        code: 'turkey',
        flag: '🇹🇷',
        products: 567,
        avgPrice: 89.75,
        currency: 'TRY',
        lastUpdate: '8 min',
        status: 'updating'
      },
      {
        name: 'Cameroun',
        code: 'cameroon',
        flag: '🇨🇲',
        products: 234,
        avgPrice: 156.20,
        currency: 'XAF',
        lastUpdate: '12 min',
        status: 'active'
      }
    ];

    const mockProducts: ScrapedProduct[] = [
      {
        id: '1',
        name: 'Smartphone Huawei P40 Pro',
        price: 2999,
        originalPrice: 3599,
        currency: 'CNY',
        market: 'china',
        category: 'Électronique',
        seller: 'Huawei Store',
        rating: 4.8,
        reviews: 1247,
        image: '/images/products/huawei-p40.jpg',
        url: 'https://example.com/product1',
        availability: true,
        shipping: 'Gratuit',
        scrapedAt: '2 min ago',
        source: 'Taobao'
      },
      {
        id: '2',
        name: 'Or 24K Dubai Gold Bar',
        price: 1850,
        currency: 'AED',
        market: 'dubai',
        category: 'Luxe',
        seller: 'Dubai Gold Souk',
        rating: 4.9,
        reviews: 89,
        image: '/images/products/gold-bar.jpg',
        url: 'https://example.com/product2',
        availability: true,
        shipping: 'Express',
        scrapedAt: '5 min ago',
        source: 'Dubai Mall'
      },
      {
        id: '3',
        name: 'Tapis turc traditionnel',
        price: 1250,
        originalPrice: 1500,
        currency: 'TRY',
        market: 'turkey',
        category: 'Décoration',
        seller: 'Istanbul Carpet',
        rating: 4.6,
        reviews: 234,
        image: '/images/products/turkish-carpet.jpg',
        url: 'https://example.com/product3',
        availability: true,
        shipping: 'Standard',
        scrapedAt: '8 min ago',
        source: 'Grand Bazaar'
      },
      {
        id: '4',
        name: 'Café robusta camerounais',
        price: 4500,
        currency: 'XAF',
        market: 'cameroon',
        category: 'Alimentation',
        seller: 'Café du Cameroun',
        rating: 4.7,
        reviews: 156,
        image: '/images/products/cameroon-coffee.jpg',
        url: 'https://example.com/product4',
        availability: true,
        shipping: 'Local',
        scrapedAt: '12 min ago',
        source: 'Marché Central'
      }
    ];

    setMarkets(mockMarkets);
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = activeMarket === 'all' || product.market === activeMarket;
    return matchesSearch && matchesMarket;
  });

  const handleRefreshMarket = async (marketCode: string) => {
    setIsLoading(true);
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMarkets(markets.map(market =>
        market.code === marketCode 
          ? { ...market, status: 'active', lastUpdate: 'Maintenant' }
          : market
      ));
      
      toast({
        title: "Données mises à jour",
        description: `Les données du marché ${marketCode} ont été actualisées.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = (marketCode: string) => {
    const marketProducts = products.filter(p => p.market === marketCode);
    const csvContent = `Nom,Prix,Devise,Catégorie,Vendeur,Note\n${marketProducts.map(p => 
      `${p.name},${p.price},${p.currency},${p.category},${p.seller},${p.rating}`
    ).join('\n')}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scraping-${marketCode}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export réussi",
      description: `Données exportées pour ${marketCode}.`,
    });
  };

  // Statistiques scraping (mock)
  const stats = [
    { label: 'Produits scrapés', value: products.length, icon: Package },
    { label: 'Marchés actifs', value: markets.filter(m => m.status === 'active').length, icon: Globe },
    { label: 'Mise à jour', value: '2 min', icon: Clock },
    { label: 'Taux de succès', value: '98.5%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Scraping Multi-Marchés</h1>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {products.length} produits
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <BarChart3 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="w-5 h-5" />
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser tout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Marchés */}
          <div className="lg:col-span-1 space-y-8">
            {/* Marchés actifs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Marchés actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {markets.map(market => (
                    <div key={market.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{market.flag}</span>
                        <div>
                          <h4 className="font-medium">{market.name}</h4>
                          <p className="text-sm text-gray-500">{market.products} produits</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          market.status === 'active' ? 'bg-green-100 text-green-800' :
                          market.status === 'updating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {market.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRefreshMarket(market.code)}
                          disabled={isLoading}
                        >
                          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter toutes les données
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics avancées
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Historique des scrapes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un produit, catégorie, vendeur..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeMarket}
                onChange={e => setActiveMarket(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les marchés</option>
                <option value="china">Chine</option>
                <option value="dubai">Dubai</option>
                <option value="turkey">Turquie</option>
                <option value="cameroon">Cameroun</option>
              </select>
            </div>

            <Tabs value={activeMarket} onValueChange={setActiveMarket}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="china">🇨🇳 Chine</TabsTrigger>
                <TabsTrigger value="dubai">🇦🇪 Dubai</TabsTrigger>
                <TabsTrigger value="turkey">🇹🇷 Turquie</TabsTrigger>
                <TabsTrigger value="cameroon">🇨🇲 Cameroun</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={product.image} />
                            <AvatarFallback>{product.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {product.market}
                              </span>
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                {product.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{product.market}</Badge>
                          <Badge className={product.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.availability ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">
                            {product.price.toLocaleString()} {product.currency}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} {product.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Scrapé {product.scrapedAt} via {product.source}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Livraison: {product.shipping}</span>
                        <span>Source: {product.source}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le produit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exporter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="china" className="space-y-6">
                {filteredProducts.filter(p => p.market === 'china').map(product => (
                  <Card key={product.id} className="border-l-4 border-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={product.image} />
                            <AvatarFallback>{product.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Chine
                              </span>
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                {product.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Chine</Badge>
                          <Badge className={product.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.availability ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">
                            {product.price.toLocaleString()} {product.currency}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} {product.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Scrapé {product.scrapedAt} via {product.source}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Livraison: {product.shipping}</span>
                        <span>Source: {product.source}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le produit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportData('china')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exporter Chine
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="dubai" className="space-y-6">
                {filteredProducts.filter(p => p.market === 'dubai').map(product => (
                  <Card key={product.id} className="border-l-4 border-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={product.image} />
                            <AvatarFallback>{product.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Dubai
                              </span>
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                {product.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Dubai</Badge>
                          <Badge className={product.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.availability ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            {product.price.toLocaleString()} {product.currency}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} {product.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Scrapé {product.scrapedAt} via {product.source}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Livraison: {product.shipping}</span>
                        <span>Source: {product.source}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le produit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportData('dubai')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exporter Dubai
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="turkey" className="space-y-6">
                {filteredProducts.filter(p => p.market === 'turkey').map(product => (
                  <Card key={product.id} className="border-l-4 border-red-600">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={product.image} />
                            <AvatarFallback>{product.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Turquie
                              </span>
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                {product.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Turquie</Badge>
                          <Badge className={product.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.availability ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">
                            {product.price.toLocaleString()} {product.currency}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} {product.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Scrapé {product.scrapedAt} via {product.source}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Livraison: {product.shipping}</span>
                        <span>Source: {product.source}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le produit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportData('turkey')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exporter Turquie
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="cameroon" className="space-y-6">
                {filteredProducts.filter(p => p.market === 'cameroon').map(product => (
                  <Card key={product.id} className="border-l-4 border-yellow-600">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={product.image} />
                            <AvatarFallback>{product.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.seller}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Cameroun
                              </span>
                              <span className="flex items-center">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                {product.category}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Cameroun</Badge>
                          <Badge className={product.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {product.availability ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-yellow-600">
                            {product.price.toLocaleString()} {product.currency}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} {product.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Scrapé {product.scrapedAt} via {product.source}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Livraison: {product.shipping}</span>
                        <span>Source: {product.source}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Voir le produit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportData('cameroon')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exporter Cameroun
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 