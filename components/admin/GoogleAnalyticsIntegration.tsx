'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    Clock,
    ExternalLink,
    Eye,
    Globe,
    RefreshCw,
    Smartphone,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface GoogleAnalyticsData {
  isConnected: boolean;
  propertyId?: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  newUsers: number;
  returningUsers: number;
  topPages: Array<{ page: string; views: number; change: number }>;
  trafficSources: Array<{ source: string; sessions: number; percentage: number }>;
  deviceBreakdown: Array<{ device: string; sessions: number; percentage: number }>;
  realTimeUsers: number;
}

export default function GoogleAnalyticsIntegration() {
  const [analyticsData, setAnalyticsData] = useState<GoogleAnalyticsData>({
    isConnected: false,
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    newUsers: 0,
    returningUsers: 0,
    topPages: [],
    trafficSources: [],
    deviceBreakdown: [],
    realTimeUsers: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      // Vérifier si l'utilisateur est connecté à Google Analytics
      const response = await fetch('/api/google-analytics/status');
      const data = await response.json();
      
      if (data.connected) {
        setAnalyticsData(prev => ({ ...prev, isConnected: true, propertyId: data.propertyId }));
        loadAnalyticsData();
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  };

  const connectGoogleAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Rediriger vers l'authentification Google OAuth
      const response = await fetch('/api/google-analytics/auth');
      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      setError('Erreur lors de la connexion à Google Analytics');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalyticsData = async () => {
    if (!analyticsData.isConnected) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/google-analytics/data');
      const data = await response.json();
      
      if (data.success) {
        setAnalyticsData(prev => ({ ...prev, ...data.data }));
      } else {
        setError(data.error || 'Erreur lors du chargement des données');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectGoogleAnalytics = async () => {
    try {
      await fetch('/api/google-analytics/disconnect', { method: 'POST' });
      setAnalyticsData({
        isConnected: false,
        visitors: 0,
        pageViews: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        newUsers: 0,
        returningUsers: 0,
        topPages: [],
        trafficSources: [],
        deviceBreakdown: [],
        realTimeUsers: 0
      });
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec statut de connexion */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <div>
                <CardTitle className="text-white">Google Analytics</CardTitle>
                <p className="text-sm text-gray-400">
                  {analyticsData.isConnected 
                    ? `Connecté - Property ID: ${analyticsData.propertyId}` 
                    : 'Non connecté'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {analyticsData.isConnected ? (
                <>
                  <Button 
                    onClick={loadAnalyticsData}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                  <Button 
                    onClick={disconnectGoogleAnalytics}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/20"
                  >
                    Déconnecter
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={connectGoogleAnalytics}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connecter Google Analytics
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Message d'erreur */}
      {error && (
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Données Analytics */}
      {analyticsData.isConnected && (
        <>
          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Visiteurs</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.visitors.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Pages vues</CardTitle>
                <Eye className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.pageViews.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Taux de rebond</CardTitle>
                <TrendingUp className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.bounceRate.toFixed(1)}%
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Utilisateurs en temps réel</CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.realTimeUsers}
                </div>
                <p className="text-xs text-gray-400">Actuellement</p>
              </CardContent>
            </Card>
          </div>

          {/* Détails des utilisateurs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Répartition des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Nouveaux utilisateurs</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {analyticsData.newUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {((analyticsData.newUsers / (analyticsData.newUsers + analyticsData.returningUsers)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Utilisateurs récurrents</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {analyticsData.returningUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {((analyticsData.returningUsers / (analyticsData.newUsers + analyticsData.returningUsers)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Durée moyenne de session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {Math.floor(analyticsData.avgSessionDuration / 60)}m {analyticsData.avgSessionDuration % 60}s
                </div>
                <p className="text-sm text-gray-400">Temps moyen passé sur le site</p>
              </CardContent>
            </Card>
          </div>

          {/* Pages les plus visitées */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Pages les plus visitées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-white font-medium">{page.page}</div>
                      <div className="text-sm text-gray-400">
                        {page.views.toLocaleString()} vues
                      </div>
                    </div>
                    <Badge 
                      variant={page.change >= 0 ? "default" : "destructive"}
                      className={page.change >= 0 ? "bg-green-600" : "bg-red-600"}
                    >
                      {page.change >= 0 ? '+' : ''}{page.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sources de trafic et appareils */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Sources de trafic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {source.sessions.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          {source.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Appareils utilisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.deviceBreakdown.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {device.sessions.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          {device.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Instructions de connexion */}
      {!analyticsData.isConnected && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Comment connecter Google Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-gray-300">
              <p>1. Cliquez sur "Connecter Google Analytics"</p>
              <p>2. Autorisez l'accès à votre compte Google</p>
              <p>3. Sélectionnez la propriété Analytics à connecter</p>
              <p>4. Les données seront automatiquement synchronisées</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>Note :</strong> Seules les données de votre propriété Analytics seront accessibles. 
                Aucune donnée personnelle ne sera partagée.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 