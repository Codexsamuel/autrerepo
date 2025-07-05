'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AlertTriangle,
    BarChart3,
    CheckCircle,
    Clock,
    DollarSign,
    ExternalLink,
    Eye,
    MousePointer,
    RefreshCw,
    Settings,
    TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface AdSenseData {
  connected: boolean;
  publisherId: string;
  siteStatus: 'ready' | 'getting_ready' | 'requires_review' | 'needs_attention';
  siteUrl: string;
  lastUpdated: string;
  earnings: {
    today: number;
    thisMonth: number;
    thisYear: number;
    total: number;
  };
  performance: {
    pageViews: number;
    impressions: number;
    clicks: number;
    ctr: number;
    rpm: number;
    cpm: number;
  };
  adUnits: Array<{
    id: string;
    name: string;
    type: 'display' | 'in-article' | 'in-feed' | 'matched-content';
    status: 'active' | 'inactive' | 'review';
    performance: {
      impressions: number;
      clicks: number;
      ctr: number;
      revenue: number;
    };
  }>;
  alerts: Array<{
    type: 'warning' | 'error' | 'info' | 'success';
    message: string;
    date: string;
  }>;
}

export default function AdSenseIntegration() {
  const [adSenseData, setAdSenseData] = useState<AdSenseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAdSenseData();
  }, []);

  const loadAdSenseData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/adsense/status');
      const data = await response.json();
      
      if (data.success) {
        setAdSenseData(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données AdSense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'getting_ready':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'requires_review':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'needs_attention':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Prêt</Badge>;
      case 'getting_ready':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">En préparation</Badge>;
      case 'requires_review':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Révision requise</Badge>;
      case 'needs_attention':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Attention requise</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  if (!adSenseData) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            Chargement des données AdSense...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec statut */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <div>
                <CardTitle className="text-white">Google AdSense</CardTitle>
                <p className="text-sm text-gray-400">
                  Monétisation et performance publicitaire
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(adSenseData.siteStatus)}
              <Button 
                onClick={loadAdSenseData}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => window.open('https://adsense.google.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                AdSense
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenus aujourd'hui</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(adSenseData.earnings.today)}
            </div>
            <p className="text-xs text-gray-400">
              +12.5% vs hier
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenus ce mois</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(adSenseData.earnings.thisMonth)}
            </div>
            <p className="text-xs text-gray-400">
              +8.3% vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Taux de clic</CardTitle>
            <MousePointer className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatPercentage(adSenseData.performance.ctr)}
            </div>
            <p className="text-xs text-gray-400">
              {formatNumber(adSenseData.performance.clicks)} clics
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">RPM</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(adSenseData.performance.rpm)}
            </div>
            <p className="text-xs text-gray-400">
              Par 1000 impressions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets d'analyse */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="adunits" className="data-[state=active]:bg-purple-600">
            <Settings className="w-4 h-4 mr-2" />
            Unités publicitaires
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Alertes
          </TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations du site */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Informations du site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Publisher ID:</span>
                    <span className="text-white font-mono">{adSenseData.publisherId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Site:</span>
                    <span className="text-white">{adSenseData.siteUrl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Statut:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(adSenseData.siteStatus)}
                      {getStatusBadge(adSenseData.siteStatus)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Dernière mise à jour:</span>
                    <span className="text-white">
                      {new Date(adSenseData.lastUpdated).toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenus détaillés */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Revenus détaillés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Aujourd'hui:</span>
                    <span className="text-white font-medium">
                      {formatCurrency(adSenseData.earnings.today)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Ce mois:</span>
                    <span className="text-white font-medium">
                      {formatCurrency(adSenseData.earnings.thisMonth)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cette année:</span>
                    <span className="text-white font-medium">
                      {formatCurrency(adSenseData.earnings.thisYear)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-700 pt-2">
                    <span className="text-gray-400 font-medium">Total:</span>
                    <span className="text-white font-bold text-lg">
                      {formatCurrency(adSenseData.earnings.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Métriques de performance */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Métriques de performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Pages vues:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatNumber(adSenseData.performance.pageViews)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400">Impressions:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatNumber(adSenseData.performance.impressions)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400">Clics:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatNumber(adSenseData.performance.clicks)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400">CTR:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatPercentage(adSenseData.performance.ctr)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-400">RPM:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatCurrency(adSenseData.performance.rpm)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400">CPM:</span>
                    </div>
                    <span className="text-white font-medium">
                      {formatCurrency(adSenseData.performance.cpm)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphique de performance (simulé) */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Évolution des revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Graphique d'évolution</p>
                    <p className="text-sm">Intégration avec Google Charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Unités publicitaires */}
        <TabsContent value="adunits" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Unités publicitaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adSenseData.adUnits.map((unit) => (
                  <div key={unit.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-white font-medium">{unit.name}</div>
                        <div className="text-sm text-gray-400">ID: {unit.id}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {unit.type}
                        </Badge>
                        {unit.status === 'active' ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Actif
                          </Badge>
                        ) : unit.status === 'review' ? (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            En révision
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            Inactif
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Impressions:</span>
                        <div className="text-white font-medium">
                          {formatNumber(unit.performance.impressions)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Clics:</span>
                        <div className="text-white font-medium">
                          {formatNumber(unit.performance.clicks)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">CTR:</span>
                        <div className="text-white font-medium">
                          {formatPercentage(unit.performance.ctr)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenus:</span>
                        <div className="text-white font-medium">
                          {formatCurrency(unit.performance.revenue)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alertes */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Alertes et notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adSenseData.alerts.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune alerte active</p>
                    <p className="text-sm">Votre compte AdSense fonctionne correctement</p>
                  </div>
                ) : (
                  adSenseData.alerts.map((alert, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${
                      alert.type === 'error' ? 'border-red-500/30 bg-red-500/10' :
                      alert.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' :
                      alert.type === 'info' ? 'border-blue-500/30 bg-blue-500/10' :
                      'border-green-500/30 bg-green-500/10'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {alert.type === 'error' ? (
                          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                        ) : alert.type === 'warning' ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        ) : alert.type === 'info' ? (
                          <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-white">{alert.message}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            {new Date(alert.date).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 