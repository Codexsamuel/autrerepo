'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BarChart3,
    CheckCircle,
    DollarSign,
    Eye,
    Plus,
    RefreshCw,
    Settings,
    Trash2,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

interface AdSenseData {
  publisherId: string;
  adUnits: AdUnit[];
  revenue: RevenueData;
  performance: PerformanceData;
}

interface AdUnit {
  id: string;
  name: string;
  type: 'display' | 'in-article' | 'in-feed' | 'matched-content';
  size: string;
  status: 'active' | 'inactive' | 'review';
  impressions: number;
  clicks: number;
  ctr: number;
  revenue: number;
}

interface RevenueData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  currency: string;
}

interface PerformanceData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export default function AdSenseIntegration() {
  const [adsenseData, setAdsenseData] = useState<AdSenseData>({
    publisherId: 'ca-pub-1234567890123456',
    adUnits: [
      {
        id: 'ad-1',
        name: 'Header Banner',
        type: 'display',
        size: '728x90',
        status: 'active',
        impressions: 15420,
        clicks: 234,
        ctr: 1.52,
        revenue: 45.67
      },
      {
        id: 'ad-2',
        name: 'Sidebar Rectangle',
        type: 'display',
        size: '300x250',
        status: 'active',
        impressions: 12340,
        clicks: 189,
        ctr: 1.53,
        revenue: 38.92
      },
      {
        id: 'ad-3',
        name: 'In-Article Ad',
        type: 'in-article',
        size: 'Responsive',
        status: 'review',
        impressions: 0,
        clicks: 0,
        ctr: 0,
        revenue: 0
      }
    ],
    revenue: {
      today: 12.45,
      thisWeek: 89.23,
      thisMonth: 342.67,
      total: 2847.89,
      currency: 'USD'
    },
    performance: {
      pageViews: 45678,
      uniqueVisitors: 23456,
      bounceRate: 42.3,
      avgSessionDuration: 2.45
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newAdUnit, setNewAdUnit] = useState({
    name: '',
    type: 'display' as const,
    size: '728x90'
  });

  const handleRefreshData = async () => {
    setIsLoading(true);
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleAddAdUnit = () => {
    if (!newAdUnit.name) return;
    
    const unit: AdUnit = {
      id: `ad-${Date.now()}`,
      name: newAdUnit.name,
      type: newAdUnit.type,
      size: newAdUnit.size,
      status: 'review',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0
    };

    setAdsenseData(prev => ({
      ...prev,
      adUnits: [...prev.adUnits, unit]
    }));

    setNewAdUnit({ name: '', type: 'display', size: '728x90' });
  };

  const handleDeleteAdUnit = (id: string) => {
    setAdsenseData(prev => ({
      ...prev,
      adUnits: prev.adUnits.filter(unit => unit.id !== id)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'destructive';
      case 'review': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'display': return <Eye className="w-4 h-4" />;
      case 'in-article': return <BarChart3 className="w-4 h-4" />;
      case 'in-feed': return <TrendingUp className="w-4 h-4" />;
      case 'matched-content': return <Settings className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Google AdSense</h1>
          <p className="text-gray-600">Gérez vos annonces et suivez vos revenus</p>
        </div>
        <Button 
          onClick={handleRefreshData} 
          disabled={isLoading}
          leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
        >
          {isLoading ? 'Actualisation...' : 'Actualiser'}
        </Button>
      </div>

      {/* Publisher ID */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Informations Publisher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">Publisher ID</label>
              <Input 
                value={adsenseData.publisherId} 
                readOnly 
                className="mt-1 font-mono"
              />
            </div>
            <Badge variant="success" className="text-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Actif
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList variant="gradient" className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="adunits">Unités publicitaires</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="gradient" hover="lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenus aujourd'hui</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${adsenseData.revenue.today.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card variant="ai" hover="lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Vues de pages</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {adsenseData.performance.pageViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card variant="blockchain" hover="lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visiteurs uniques</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {adsenseData.performance.uniqueVisitors.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card variant="cybersecurity" hover="lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Taux de rebond</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {adsenseData.performance.bounceRate}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des revenus</CardTitle>
              <CardDescription>Suivi détaillé de vos revenus AdSense</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${adsenseData.revenue.today.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <p className="text-sm text-gray-600">Cette semaine</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${adsenseData.revenue.thisWeek.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <p className="text-sm text-gray-600">Ce mois</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${adsenseData.revenue.thisMonth.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${adsenseData.revenue.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adunits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unités publicitaires</CardTitle>
              <CardDescription>Gérez vos annonces AdSense</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ajouter une nouvelle unité */}
              <div className="flex gap-2 mb-4 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Nom de l'unité publicitaire"
                  value={newAdUnit.name}
                  onChange={(e) => setNewAdUnit(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1"
                />
                <select
                  value={newAdUnit.type}
                  onChange={(e) => setNewAdUnit(prev => ({ ...prev, type: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="display">Display</option>
                  <option value="in-article">In-Article</option>
                  <option value="in-feed">In-Feed</option>
                  <option value="matched-content">Matched Content</option>
                </select>
                <select
                  value={newAdUnit.size}
                  onChange={(e) => setNewAdUnit(prev => ({ ...prev, size: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="728x90">728x90</option>
                  <option value="300x250">300x250</option>
                  <option value="300x600">300x600</option>
                  <option value="Responsive">Responsive</option>
                </select>
                <Button onClick={handleAddAdUnit} leftIcon={<Plus className="w-4 h-4" />}>
                  Ajouter
                </Button>
              </div>

              {/* Liste des unités */}
              <div className="space-y-3">
                {adsenseData.adUnits.map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(unit.type)}
                      <div>
                        <h4 className="font-medium text-gray-900">{unit.name}</h4>
                        <p className="text-sm text-gray-600">
                          {unit.type} • {unit.size}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">CTR</p>
                        <p className="font-medium">{unit.ctr}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Revenus</p>
                        <p className="font-medium">${unit.revenue.toFixed(2)}</p>
                      </div>
                      <Badge variant={getStatusColor(unit.status) as any}>
                        {unit.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAdUnit(unit.id)}
                        leftIcon={<Trash2 className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métriques de performance</CardTitle>
              <CardDescription>Analyse détaillée de vos performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Trafic</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Vues de pages</span>
                      <span className="font-medium">{adsenseData.performance.pageViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Visiteurs uniques</span>
                      <span className="font-medium">{adsenseData.performance.uniqueVisitors.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Taux de rebond</span>
                      <span className="font-medium">{adsenseData.performance.bounceRate}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Durée moyenne</span>
                      <span className="font-medium">{adsenseData.performance.avgSessionDuration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 