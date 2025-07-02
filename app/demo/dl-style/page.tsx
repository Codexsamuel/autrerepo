// Dashboard E-commerce DL Style - Inspiré Shopify/Prestashop
// Modules : Navbar, Alertes IA, KPI, Pipeline, VIP, Recos IA, Footer
// Personnalisation facile : modifiez les mock data ou les modules selon vos besoins.
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell, AlertTriangle, TrendingUp, TrendingDown, Users, Star, Brain, AlertCircle, FileText, Building, MapPin, DollarSign, CheckCircle, X, ChevronRight, ChevronLeft, Search, ShoppingCart, Package, Globe
} from 'lucide-react';

interface KPIData {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  sales: number;
  stock: number;
  image: string;
}

export default function DLStyleDemoPage() {
  const [kpis] = useState<KPIData[]>([
    {
      title: "Chiffre d'affaires",
      value: "€125,430",
      change: 12.5,
      icon: <DollarSign className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Commandes",
      value: "1,234",
      change: 8.2,
      icon: <ShoppingCart className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Clients actifs",
      value: "892",
      change: -2.1,
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600"
    },
    {
      title: "Stock total",
      value: "15,678",
      change: 5.7,
      icon: <Package className="h-4 w-4" />,
      color: "text-orange-600"
    }
  ]);

  const [topProducts] = useState<ProductData[]>([
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1299,
      sales: 156,
      stock: 45,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop"
    },
    {
      id: "2",
      name: "MacBook Air M2",
      price: 1499,
      sales: 89,
      stock: 23,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop"
    },
    {
      id: "3",
      name: "AirPods Pro",
      price: 249,
      sales: 234,
      stock: 67,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">DL Style Demo</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Version Demo
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Alert Banner */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Brain className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Insight IA</h3>
                <p className="text-sm text-gray-600">
                  Les ventes d'électronique ont augmenté de 23% ce mois-ci. Recommandation: augmenter le stock des produits populaires.
                </p>
              </div>
              <Button size="sm" variant="outline">
                Voir détails
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${kpi.color}`}>
                    {kpi.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Produits les plus vendus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.image} />
                    <AvatarFallback>{product.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">€{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.sales} ventes</p>
                    <p className="text-sm text-gray-600">{product.stock} en stock</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 