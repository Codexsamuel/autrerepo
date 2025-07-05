'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    ExternalLink,
    Globe,
    RefreshCw,
    Search,
    Target,
    TrendingUp,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface SEOData {
  isConnected: boolean;
  propertyId?: string;
  domainAuthority: number;
  pageSpeed: number;
  mobileScore: number;
  desktopScore: number;
  keywords: number;
  ranking: number;
  backlinks: number;
  topKeywords: Array<{
    keyword: string;
    position: number;
    volume: number;
    change: number;
  }>;
  searchPerformance: {
    clicks: number;
    impressions: number;
    ctr: number;
    averagePosition: number;
  };
  technicalIssues: Array<{
    type: string;
    count: number;
    severity: 'high' | 'medium' | 'low';
    description: string;
  }>;
  pageSpeedIssues: Array<{
    issue: string;
    impact: 'high' | 'medium' | 'low';
    description: string;
  }>;
}

export default function SEOIntegration() {
  const [seoData, setSeoData] = useState<SEOData>({
    isConnected: false,
    domainAuthority: 0,
    pageSpeed: 0,
    mobileScore: 0,
    desktopScore: 0,
    keywords: 0,
    ranking: 0,
    backlinks: 0,
    topKeywords: [],
    searchPerformance: {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      averagePosition: 0
    },
    technicalIssues: [],
    pageSpeedIssues: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch('/api/seo/status');
      const data = await response.json();
      
      if (data.connected) {
        setSeoData(prev => ({ 
          ...prev, 
          isConnected: true, 
          propertyId: data.propertyId 
        }));
        loadSEOData();
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  };

  const connectSearchConsole = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo/auth');
      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      setError('Erreur lors de la connexion à Google Search Console');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSEOData = async () => {
    if (!seoData.isConnected) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo/data');
      const data = await response.json();
      
      if (data.success) {
        setSeoData(prev => ({ ...prev, ...data.data }));
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

  const runPageSpeedTest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seo/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.origin })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSeoData(prev => ({
          ...prev,
          pageSpeed: data.data.pageSpeed,
          mobileScore: data.data.mobileScore,
          desktopScore: data.data.desktopScore,
          pageSpeedIssues: data.data.issues
        }));
      } else {
        setError(data.error || 'Erreur lors du test de vitesse');
      }
    } catch (err) {
      setError('Erreur lors du test de vitesse');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectSEO = async () => {
    try {
      await fetch('/api/seo/disconnect', { method: 'POST' });
      setSeoData({
        isConnected: false,
        domainAuthority: 0,
        pageSpeed: 0,
        mobileScore: 0,
        desktopScore: 0,
        keywords: 0,
        ranking: 0,
        backlinks: 0,
        topKeywords: [],
        searchPerformance: {
          clicks: 0,
          impressions: 0,
          ctr: 0,
          averagePosition: 0
        },
        technicalIssues: [],
        pageSpeedIssues: []
      });
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header avec statut de connexion */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-orange-400" />
              <div>
                <CardTitle className="text-white">SEO & Search Console</CardTitle>
                <p className="text-sm text-gray-400">
                  {seoData.isConnected 
                    ? `Connecté - Property ID: ${seoData.propertyId}` 
                    : 'Non connecté'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {seoData.isConnected ? (
                <>
                  <Button 
                    onClick={runPageSpeedTest}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Test Vitesse
                  </Button>
                  <Button 
                    onClick={loadSEOData}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                  <Button 
                    onClick={disconnectSEO}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/20"
                  >
                    Déconnecter
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={connectSearchConsole}
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connecter Search Console
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

      {/* Données SEO */}
      {seoData.isConnected && (
        <>
          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Autorité domaine</CardTitle>
                <Target className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {seoData.domainAuthority}/100
                </div>
                <p className="text-xs text-gray-400">Score global</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Mots-clés classés</CardTitle>
                <Search className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {seoData.keywords.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Top 100</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Backlinks</CardTitle>
                <Globe className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {seoData.backlinks.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Liens externes</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Position moyenne</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  #{seoData.ranking}
                </div>
                <p className="text-xs text-gray-400">Moyenne</p>
              </CardContent>
            </Card>
          </div>

          {/* Scores de performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Score Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(seoData.mobileScore)} mb-2`}>
                    {seoData.mobileScore}
                  </div>
                  <Progress 
                    value={seoData.mobileScore} 
                    className="h-2 mb-2"
                  />
                  <p className="text-sm text-gray-400">Performance mobile</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Score Desktop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(seoData.desktopScore)} mb-2`}>
                    {seoData.desktopScore}
                  </div>
                  <Progress 
                    value={seoData.desktopScore} 
                    className="h-2 mb-2"
                  />
                  <p className="text-sm text-gray-400">Performance desktop</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Vitesse de chargement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(seoData.pageSpeed)} mb-2`}>
                    {seoData.pageSpeed}
                  </div>
                  <Progress 
                    value={seoData.pageSpeed} 
                    className="h-2 mb-2"
                  />
                  <p className="text-sm text-gray-400">Score global</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance de recherche */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance de recherche (30 derniers jours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {seoData.searchPerformance.clicks.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-400">Clics</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {seoData.searchPerformance.impressions.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-400">Impressions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {seoData.searchPerformance.ctr.toFixed(2)}%
                  </div>
                  <p className="text-sm text-gray-400">CTR</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {seoData.searchPerformance.averagePosition.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-400">Position moyenne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mots-clés principaux */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Mots-clés principaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {seoData.topKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-white font-medium">{keyword.keyword}</div>
                      <div className="text-sm text-gray-400">
                        Volume: {keyword.volume.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        Position #{keyword.position}
                      </Badge>
                      <div className={`text-sm ${keyword.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {keyword.change >= 0 ? '+' : ''}{keyword.change} positions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Problèmes techniques */}
          {seoData.technicalIssues.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Problèmes techniques détectés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoData.technicalIssues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className={`mt-1 ${
                        issue.severity === 'high' ? 'text-red-400' : 
                        issue.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {issue.severity === 'high' ? <XCircle className="w-4 h-4" /> :
                         issue.severity === 'medium' ? <Clock className="w-4 h-4" /> :
                         <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{issue.type}</div>
                        <div className="text-sm text-gray-400">{issue.description}</div>
                        <Badge 
                          variant={issue.severity === 'high' ? 'destructive' : 'secondary'}
                          className="mt-1"
                        >
                          {issue.count} occurrences
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Problèmes de vitesse */}
          {seoData.pageSpeedIssues.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Problèmes de vitesse de page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoData.pageSpeedIssues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className={`mt-1 ${
                        issue.impact === 'high' ? 'text-red-400' : 
                        issue.impact === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {issue.impact === 'high' ? <XCircle className="w-4 h-4" /> :
                         issue.impact === 'medium' ? <Clock className="w-4 h-4" /> :
                         <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{issue.issue}</div>
                        <div className="text-sm text-gray-400">{issue.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Instructions de connexion */}
      {!seoData.isConnected && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Comment connecter Google Search Console</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-gray-300">
              <p>1. Cliquez sur "Connecter Search Console"</p>
              <p>2. Autorisez l'accès à votre compte Google</p>
              <p>3. Sélectionnez votre propriété web</p>
              <p>4. Accédez aux données de performance et SEO</p>
            </div>
            <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
              <p className="text-orange-300 text-sm">
                <strong>Fonctionnalités :</strong> Analyse des mots-clés, performance de recherche, 
                problèmes techniques et optimisation de la vitesse.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 