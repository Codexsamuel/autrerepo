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
import { ScrapedProduct } from '@/lib/scraper/chinese-stores';
import { useCart, CartItem } from './cart-context';
import { Suspense } from 'react';
import ChineseStoresClient from './ChineseStoresClient';

// Types de devises
type Currency = 'EUR' | 'USD' | 'FCFA';

// Taux de change (à mettre à jour régulièrement)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
  FCFA: 655.957
};

export default function DLStyleClient() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('EUR');
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useCart();

  const convertPrice = (priceUSD: number, currency: Currency): number => {
    const priceEUR = priceUSD / EXCHANGE_RATES.USD;
    
    switch (currency) {
      case 'EUR':
        return priceEUR;
      case 'USD':
        return priceUSD;
      case 'FCFA':
        return priceEUR * EXCHANGE_RATES.FCFA;
      default:
        return priceEUR;
    }
  };

  const formatPrice = (price: number, currency: Currency): string => {
    switch (currency) {
      case 'EUR':
        return `€${price.toFixed(2)}`;
      case 'USD':
        return `$${price.toFixed(2)}`;
      case 'FCFA':
        return `${Math.round(price).toLocaleString()} FCFA`;
      default:
        return `€${price.toFixed(2)}`;
    }
  };

  const getCurrencySymbol = (currency: Currency): string => {
    switch (currency) {
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      case 'FCFA':
        return 'FCFA';
      default:
        return '€';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">DL Style</h1>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Boutique Internationale
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Currency Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Devise:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="FCFA">FCFA</option>
                </select>
              </div>
              
              <Link href="/novacore/dl-style/panier">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Panier
                  {items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {items.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Boutique Internationale DL Style
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez notre sélection de produits premium du monde entier. 
            Véhicules, électronique, mode et accessoires de qualité.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Livraison au Cameroun</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Paiement Sécurisé</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Globe className="h-5 w-5 text-purple-600" />
              <span>Produits du Monde</span>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="vehicles" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Véhicules</span>
            </TabsTrigger>
            <TabsTrigger value="electronics" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Électronique</span>
            </TabsTrigger>
            <TabsTrigger value="fashion" className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Mode</span>
            </TabsTrigger>
            <TabsTrigger value="accessories" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Accessoires</span>
            </TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Véhicules Premium du Monde Entier
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez notre sélection de véhicules de qualité provenant de Chine, 
                Dubaï, Turquie et Cameroun. Livraison et dédouanement inclus.
              </p>
            </div>
            
            <Suspense fallback={
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
            }>
              <ChineseStoresClient 
                category="Véhicules" 
                selectedCurrency={selectedCurrency}
                convertPrice={convertPrice}
                formatPrice={formatPrice}
                getCurrencySymbol={getCurrencySymbol}
              />
            </Suspense>
          </TabsContent>

          {/* Electronics Tab */}
          <TabsContent value="electronics" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Électronique et Technologies
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Smartphones, ordinateurs, accessoires technologiques et plus encore. 
                Produits de marques reconnues aux meilleurs prix.
              </p>
            </div>
            
            <Suspense fallback={
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
            }>
              <ChineseStoresClient 
                category="Électronique" 
                selectedCurrency={selectedCurrency}
                convertPrice={convertPrice}
                formatPrice={formatPrice}
                getCurrencySymbol={getCurrencySymbol}
              />
            </Suspense>
          </TabsContent>

          {/* Fashion Tab */}
          <TabsContent value="fashion" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mode et Accessoires de Luxe
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Vêtements, chaussures, sacs et accessoires de mode. 
                Styles tendance du monde entier à des prix compétitifs.
              </p>
            </div>
            
            <Suspense fallback={
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
            }>
              <ChineseStoresClient 
                category="Mode" 
                selectedCurrency={selectedCurrency}
                convertPrice={convertPrice}
                formatPrice={formatPrice}
                getCurrencySymbol={getCurrencySymbol}
              />
            </Suspense>
          </TabsContent>

          {/* Accessories Tab */}
          <TabsContent value="accessories" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accessoires et Lifestyle
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Montres, bijoux, accessoires de maison et objets de décoration. 
                Élégance et qualité pour tous les goûts.
              </p>
            </div>
            
            <Suspense fallback={
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
            }>
              <ChineseStoresClient 
                category="Accessoires" 
                selectedCurrency={selectedCurrency}
                convertPrice={convertPrice}
                formatPrice={formatPrice}
                getCurrencySymbol={getCurrencySymbol}
              />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Delivery Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Livraison et Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Livraison Rapide</h4>
              <p className="text-sm text-gray-600">
                Livraison au Cameroun en 7-15 jours ouvrables
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dédouanement Inclus</h4>
              <p className="text-sm text-gray-600">
                Gestion complète des formalités douanières
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Points de Retrait</h4>
              <p className="text-sm text-gray-600">
                École de Police, Yaoundé et points relais
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Garantie Qualité</h4>
              <p className="text-sm text-gray-600">
                30 jours de garantie sur tous les produits
              </p>
            </div>
          </div>
        </div>

        {/* SEO Footer */}
        <footer className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">À Propos de DL Style</h4>
              <p className="text-sm text-gray-600 mb-4">
                Boutique internationale spécialisée dans l'importation et la vente de produits premium 
                du monde entier. Notre mission est de rendre accessible des produits de qualité 
                aux clients camerounais.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline">Produits Authentiques</Badge>
                <Badge variant="outline">Livraison Sécurisée</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Nos Services</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Importation de véhicules</li>
                <li>• Électronique et technologies</li>
                <li>• Mode et accessoires</li>
                <li>• Livraison au Cameroun</li>
                <li>• Dédouanement inclus</li>
                <li>• Support client 24/7</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Informations Pratiques</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Adresse:</strong> École de Police, Yaoundé, Cameroun</p>
                <p><strong>Devises:</strong> EUR, USD, FCFA</p>
                <p><strong>Livraison:</strong> 7-15 jours ouvrables</p>
                <p><strong>Garantie:</strong> 30 jours</p>
                <p><strong>Paiement:</strong> Sécurisé</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 