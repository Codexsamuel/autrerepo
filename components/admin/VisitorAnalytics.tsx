'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BarChart3,
    Clock,
    Download,
    Eye,
    Globe,
    MapPin,
    Monitor,
    MousePointer,
    Navigation,
    Phone,
    RefreshCw,
    Search,
    Smartphone,
    Tablet,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface VisitorData {
  id: string;
  timestamp: string;
  source: 'search' | 'maps' | 'direct' | 'social' | 'referral';
  action: 'view' | 'click' | 'call' | 'direction' | 'website_visit';
  location: {
    city: string;
    region: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  device: 'mobile' | 'desktop' | 'tablet';
  sessionDuration: number;
  pagesViewed: string[];
  searchQuery?: string;
  userAgent: string;
  ipAddress: string;
  isReturning: boolean;
}

interface AdvancedAnalytics {
  totalViews: number;
  totalClicks: number;
  totalCalls: number;
  totalDirections: number;
  conversionRate: number;
  averageSessionDuration: number;
  topSearchQueries: Array<{ query: string; count: number; conversionRate: number }>;
  visitorDemographics: {
    byLocation: Array<{ location: string; visitors: number; percentage: number }>;
    byDevice: Array<{ device: string; visitors: number; percentage: number }>;
    byTime: Array<{ hour: number; visitors: number; percentage: number }>;
  };
  behaviorAnalysis: {
    mostViewedPages: Array<{ page: string; views: number; uniqueVisitors: number }>;
    commonPaths: Array<{ path: string; frequency: number; conversionRate: number }>;
    exitPages: Array<{ page: string; exits: number; percentage: number }>;
  };
  realTimeData: {
    currentVisitors: number;
    activeSessions: Array<{
      id: string;
      startTime: string;
      currentPage: string;
      duration: number;
      source: string;
    }>;
  };
}

export default function VisitorAnalytics() {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [analytics, setAnalytics] = useState<AdvancedAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('7d');

  useEffect(() => {
    loadVisitorData();
  }, [timeFilter]);

  const loadVisitorData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/google-my-business/data');
      const data = await response.json();
      
      if (data.success) {
        setVisitorData(data.data.visitorData || []);
        setAnalytics(data.data.advancedAnalytics);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'search': return <Search className="w-4 h-4" />;
      case 'maps': return <MapPin className="w-4 h-4" />;
      case 'direct': return <Globe className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'referral': return <TrendingUp className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="w-4 h-4" />;
      case 'click': return <MousePointer className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'direction': return <Navigation className="w-4 h-4" />;
      case 'website_visit': return <Globe className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Date', 'Source', 'Action', 'Ville', 'Région', 'Appareil', 'Durée', 'Pages vues', 'Requête de recherche', 'Retournant'],
      ...visitorData.map(visitor => [
        visitor.id,
        formatTimestamp(visitor.timestamp),
        visitor.source,
        visitor.action,
        visitor.location.city,
        visitor.location.region,
        visitor.device,
        formatDuration(visitor.sessionDuration),
        visitor.pagesViewed.join(', '),
        visitor.searchQuery || '',
        visitor.isReturning ? 'Oui' : 'Non'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visiteurs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!analytics) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            Chargement des données d'analyse...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec filtres */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Analyse des Visiteurs</CardTitle>
              <p className="text-sm text-gray-400">
                Comportement détaillé et géolocalisation des visiteurs
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 text-white rounded px-3 py-1 text-sm"
              >
                <option value="1d">24h</option>
                <option value="7d">7 jours</option>
                <option value="30d">30 jours</option>
                <option value="90d">90 jours</option>
              </select>
              <Button 
                onClick={loadVisitorData}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Visiteurs en temps réel</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics.realTimeData.currentVisitors}
            </div>
            <p className="text-xs text-gray-400">Actuellement actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Taux de conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-400">Vues vers actions</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Durée moyenne</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatDuration(analytics.averageSessionDuration)}
            </div>
            <p className="text-xs text-gray-400">Par session</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total des vues</CardTitle>
            <Eye className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets d'analyse */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="visitors" className="data-[state=active]:bg-green-600">
            <Users className="w-4 h-4 mr-2" />
            Visiteurs
          </TabsTrigger>
          <TabsTrigger value="behavior" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Comportement
          </TabsTrigger>
          <TabsTrigger value="realtime" className="data-[state=active]:bg-orange-600">
            <Clock className="w-4 h-4 mr-2" />
            Temps réel
          </TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top requêtes de recherche */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top requêtes de recherche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topSearchQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex-1">
                        <div className="text-white font-medium">{query.query}</div>
                        <div className="text-sm text-gray-400">
                          {query.count} recherches
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {query.conversionRate.toFixed(1)}%
                        </Badge>
                        <div className="text-xs text-gray-400">Conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Répartition géographique */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Répartition géographique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.visitorDemographics.byLocation.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{location.location}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {location.visitors.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          {location.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Détail des visiteurs */}
        <TabsContent value="visitors" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Détail des visiteurs récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitorData.map((visitor) => (
                  <div key={visitor.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          {getSourceIcon(visitor.source)}
                          {getActionIcon(visitor.action)}
                          {getDeviceIcon(visitor.device)}
                        </div>
                        <div>
                          <div className="text-white font-medium">Visiteur {visitor.id}</div>
                          <div className="text-sm text-gray-400">
                            {formatTimestamp(visitor.timestamp)}
                          </div>
                        </div>
                      </div>
                      <Badge variant={visitor.isReturning ? "default" : "secondary"}>
                        {visitor.isReturning ? 'Retournant' : 'Nouveau'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Localisation:</span>
                        <div className="text-white">
                          {visitor.location.city}, {visitor.location.region}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Durée:</span>
                        <div className="text-white">
                          {formatDuration(visitor.sessionDuration)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Pages vues:</span>
                        <div className="text-white">
                          {visitor.pagesViewed.length} pages
                        </div>
                      </div>
                      {visitor.searchQuery && (
                        <div className="md:col-span-2 lg:col-span-3">
                          <span className="text-gray-400">Requête de recherche:</span>
                          <div className="text-white font-medium">
                            "{visitor.searchQuery}"
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="text-xs text-gray-400 mb-2">Parcours:</div>
                      <div className="flex items-center space-x-2 text-sm">
                        {visitor.pagesViewed.map((page, index) => (
                          <div key={index} className="flex items-center">
                            <span className="text-blue-400">{page}</span>
                            {index < visitor.pagesViewed.length - 1 && (
                              <span className="text-gray-500 mx-2">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analyse du comportement */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pages les plus visitées */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pages les plus visitées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.behaviorAnalysis.mostViewedPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{page.page}</div>
                        <div className="text-sm text-gray-400">
                          {page.uniqueVisitors.toLocaleString()} visiteurs uniques
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {page.views.toLocaleString()} vues
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parcours communs */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Parcours communs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.behaviorAnalysis.commonPaths.map((path, index) => (
                    <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-white font-medium mb-2">{path.path}</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {path.frequency.toLocaleString()} fois
                        </span>
                        <Badge variant="secondary">
                          {path.conversionRate.toFixed(1)}% conversion
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Données temps réel */}
        <TabsContent value="realtime" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sessions actives en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.realTimeData.activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div>
                        <div className="text-white font-medium">{session.currentPage}</div>
                        <div className="text-sm text-gray-400">
                          Source: {session.source}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {formatDuration(session.duration)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Début: {formatTimestamp(session.startTime)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 