"use client";

import AdSenseIntegration from '@/components/admin/AdSenseIntegration';
import GoogleAnalyticsIntegration from '@/components/admin/GoogleAnalyticsIntegration';
import GoogleMyBusinessIntegration from '@/components/admin/GoogleMyBusinessIntegration';
import SEOIntegration from '@/components/admin/SEOIntegration';
import VisitorAnalytics from '@/components/admin/VisitorAnalytics';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, DollarSign, ExternalLink, Globe, MapPin, MessageSquare, RefreshCw, Search, Settings, Star, Target, TrendingUp, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; sessions: number }>;
}

interface BusinessData {
  reviews: number;
  rating: number;
  views: number;
  clicks: number;
  calls: number;
  directions: number;
  recentReviews: Array<{ author: string; rating: number; comment: string; date: string }>;
}

interface SEOData {
  ranking: number;
  keywords: number;
  backlinks: number;
  domainAuthority: number;
  pageSpeed: number;
  mobileScore: number;
  desktopScore: number;
  topKeywords: Array<{ keyword: string; position: number; volume: number }>;
}

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    trafficSources: []
  });
  const [businessData, setBusinessData] = useState<BusinessData>({
    reviews: 0,
    rating: 0,
    views: 0,
    clicks: 0,
    calls: 0,
    directions: 0,
    recentReviews: []
  });
  const [seoData, setSeoData] = useState<SEOData>({
    ranking: 0,
    keywords: 0,
    backlinks: 0,
    domainAuthority: 0,
    pageSpeed: 0,
    mobileScore: 0,
    desktopScore: 0,
    topKeywords: []
  });

  // Simuler le chargement des données
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    // Simulation de chargement des données
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Données Analytics simulées
    setAnalyticsData({
      visitors: 15420,
      pageViews: 45680,
      bounceRate: 42.3,
      avgSessionDuration: 185,
      topPages: [
        { page: '/', views: 12500 },
        { page: '/services', views: 8900 },
        { page: '/demo', views: 6700 },
        { page: '/contact', views: 4200 },
        { page: '/trading', views: 3800 }
      ],
      trafficSources: [
        { source: 'Google', sessions: 8500 },
        { source: 'Direct', sessions: 4200 },
        { source: 'Social Media', sessions: 2100 },
        { source: 'Referral', sessions: 620 }
      ]
    });

    // Données My Business simulées
    setBusinessData({
      reviews: 127,
      rating: 4.8,
      views: 8900,
      clicks: 2340,
      calls: 156,
      directions: 89,
      recentReviews: [
        { author: 'Marie D.', rating: 5, comment: 'Service exceptionnel, équipe très professionnelle !', date: '2025-01-04' },
        { author: 'Jean P.', rating: 5, comment: 'Très satisfait de la qualité du travail fourni.', date: '2025-01-03' },
        { author: 'Sophie L.', rating: 4, comment: 'Bon service, délais respectés.', date: '2025-01-02' }
      ]
    });

    // Données SEO simulées
    setSeoData({
      ranking: 15,
      keywords: 234,
      backlinks: 1560,
      domainAuthority: 42,
      pageSpeed: 87,
      mobileScore: 92,
      desktopScore: 89,
      topKeywords: [
        { keyword: 'développement web', position: 3, volume: 12000 },
        { keyword: 'trading platform', position: 8, volume: 8900 },
        { keyword: 'services informatiques', position: 12, volume: 6700 },
        { keyword: 'formation trading', position: 5, volume: 5400 },
        { keyword: 'solutions digitales', position: 18, volume: 3200 }
      ]
    });

    setIsLoading(false);
  };

  const connectGoogleAnalytics = () => {
    // Intégration Google Analytics
    window.open('https://analytics.google.com/', '_blank');
  };

  const connectGoogleMyBusiness = () => {
    // Intégration Google My Business
    window.open('https://business.google.com/', '_blank');
  };

  const connectGoogleSearchConsole = () => {
    // Intégration Google Search Console
    window.open('https://search.google.com/search-console/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Dashboard Super Admin
              </h1>
              <p className="text-gray-300">
                Contrôle centralisé de votre présence en ligne
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={loadDashboardData}
                disabled={isLoading}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Settings className="w-4 h-4 mr-2" />
                Configuration
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs de navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="visitors" className="data-[state=active]:bg-green-600">
              <Users className="w-4 h-4 mr-2" />
              Analyse visiteurs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Google Analytics
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-orange-600">
              <MapPin className="w-4 h-4 mr-2" />
              My Business
            </TabsTrigger>
            <TabsTrigger value="adsense" className="data-[state=active]:bg-yellow-600">
              <DollarSign className="w-4 h-4 mr-2" />
              AdSense
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-red-600">
              <Search className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* KPI Analytics */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Visiteurs</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analyticsData.visitors.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">+12% ce mois</p>
                </CardContent>
              </Card>

              {/* KPI Business */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Note Google</CardTitle>
                  <Star className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{businessData.rating}</div>
                  <p className="text-xs text-gray-400">{businessData.reviews} avis</p>
                </CardContent>
              </Card>

              {/* KPI SEO */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Position SEO</CardTitle>
                  <Target className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">#{seoData.ranking}</div>
                  <p className="text-xs text-gray-400">Moyenne</p>
                </CardContent>
              </Card>

              {/* KPI Performance */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Vitesse Page</CardTitle>
                  <Zap className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoData.pageSpeed}/100</div>
                  <p className="text-xs text-gray-400">Score mobile</p>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques et connexions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Connexions Google</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Google Analytics</span>
                    </div>
                    <Button onClick={connectGoogleAnalytics} size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connecter
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span className="text-white">Google My Business</span>
                    </div>
                    <Button onClick={connectGoogleMyBusiness} size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connecter
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Search className="w-5 h-5 text-orange-400" />
                      <span className="text-white">Search Console</span>
                    </div>
                    <Button onClick={connectGoogleSearchConsole} size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connecter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Répondre aux avis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Globe className="w-4 h-4 mr-2" />
                    Optimiser SEO
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Planifier contenu
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Analyser concurrence
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analyse des visiteurs */}
          <TabsContent value="visitors" className="space-y-6">
            <VisitorAnalytics />
          </TabsContent>

          {/* Google Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <GoogleAnalyticsIntegration />
          </TabsContent>

          {/* Google My Business */}
          <TabsContent value="business" className="space-y-6">
            <GoogleMyBusinessIntegration />
          </TabsContent>

          {/* Google AdSense */}
          <TabsContent value="adsense" className="space-y-6">
            <AdSenseIntegration />
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="space-y-6">
            <SEOIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
