'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Globe, Loader2, Search, Shield, TrendingUp, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface OSINTResult {
  source: string;
  data: any;
  timestamp: string;
  confidence: number;
  metadata: {
    url: string;
    method: string;
    responseTime: number;
  };
}

interface IntelligenceResult {
  query: string;
  osintData: OSINTResult[];
  webAnalysis: any;
  socialMediaAnalysis: any;
  technicalAnalysis: any;
  riskAssessment: any;
  recommendations: string[];
  confidence: number;
  timestamp: string;
}

export default function AdvancedIntelligencePage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [osintResults, setOsintResults] = useState<OSINTResult[]>([]);
  const [intelligenceResults, setIntelligenceResults] = useState<IntelligenceResult | null>(null);
  const [activeTab, setActiveTab] = useState('osint');

  const handleOSINTSearch = async () => {
    if (!query.trim()) {
      toast.error('Veuillez entrer une requête');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/osint/advanced-search?q=${encodeURIComponent(query)}&sources=google,reddit,github,wayback&sentiment=true`);
      const data = await response.json();

      if (data.success) {
        setOsintResults(data.data.results);
        toast.success(`Recherche OSINT terminée: ${data.data.results.length} sources analysées`);
      } else {
        toast.error('Erreur lors de la recherche OSINT');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntelligenceAnalysis = async () => {
    if (!query.trim()) {
      toast.error('Veuillez entrer une requête');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/intelligence/advanced-analysis?q=${encodeURIComponent(query)}&osint=true&social=true&technical=true&risk=true`);
      const data = await response.json();

      if (data.success) {
        setIntelligenceResults(data.data);
        toast.success(`Analyse d'intelligence terminée (Confiance: ${data.data.confidence}%)`);
      } else {
        toast.error('Erreur lors de l\'analyse d\'intelligence');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Intelligence Avancée
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Système d'analyse d'intelligence complet combinant OSINT, analyse web, réseaux sociaux et évaluation des risques
        </p>
      </div>

      {/* Search Interface */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recherche et Analyse
          </CardTitle>
          <CardDescription>
            Entrez votre requête pour effectuer une recherche OSINT ou une analyse d'intelligence complète
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Entrez votre requête (ex: bitcoin, OpenAI, cybersécurité...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleOSINTSearch()}
            />
            <Button 
              onClick={handleOSINTSearch} 
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
              OSINT
            </Button>
            <Button 
              onClick={handleIntelligenceAnalysis} 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
              Intelligence Complète
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="osint" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Recherche OSINT
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Analyse d'Intelligence
          </TabsTrigger>
        </TabsList>

        {/* OSINT Results */}
        <TabsContent value="osint" className="space-y-4">
          {osintResults.length > 0 && (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Résultats OSINT ({osintResults.length} sources)
                </h3>
                <Badge variant="secondary">
                  Confiance moyenne: {Math.round(osintResults.reduce((acc, r) => acc + r.confidence, 0) / osintResults.length)}%
                </Badge>
              </div>
              
              {osintResults.map((result, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">{result.source}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {result.metadata.responseTime}ms
                        </Badge>
                        <Badge className={getConfidenceColor(result.confidence)}>
                          {result.confidence}% confiance
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.data.results && result.data.results.length > 0 ? (
                        result.data.results.slice(0, 3).map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="p-3 border rounded-lg">
                            <h4 className="font-medium text-sm">{item.title || item.name || 'Sans titre'}</h4>
                            {item.snippet && <p className="text-sm text-gray-600 mt-1">{item.snippet}</p>}
                            {item.link && (
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Voir la source
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">Aucun résultat trouvé</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Intelligence Analysis Results */}
        <TabsContent value="intelligence" className="space-y-4">
          {intelligenceResults && (
            <div className="grid gap-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Vue d'ensemble
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {intelligenceResults.osintData?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Sources OSINT</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className={`text-2xl font-bold ${getConfidenceColor(intelligenceResults.confidence)}`}>
                        {intelligenceResults.confidence}%
                      </div>
                      <div className="text-sm text-gray-600">Niveau de confiance</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className={`text-2xl font-bold ${getRiskLevelColor(intelligenceResults.riskAssessment?.overallRiskLevel).split(' ')[0]}`}>
                        {intelligenceResults.riskAssessment?.overallRiskLevel || 'UNKNOWN'}
                      </div>
                      <div className="text-sm text-gray-600">Niveau de risque</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              {intelligenceResults.riskAssessment && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Évaluation des Risques
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Niveau global:</span>
                        <Badge className={getRiskLevelColor(intelligenceResults.riskAssessment.overallRiskLevel)}>
                          {intelligenceResults.riskAssessment.overallRiskLevel}
                        </Badge>
                      </div>
                      
                      {intelligenceResults.riskAssessment.securityRisks?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Risques de sécurité:</h4>
                          <div className="space-y-1">
                            {intelligenceResults.riskAssessment.securityRisks.map((risk: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span>{risk.keyword}</span>
                                <Badge variant="outline" className="text-xs">
                                  {risk.source}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {intelligenceResults.riskAssessment.recommendations?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Recommandations:</h4>
                          <div className="space-y-1">
                            {intelligenceResults.riskAssessment.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {intelligenceResults.recommendations && intelligenceResults.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Recommandations Générales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {intelligenceResults.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Web Analysis */}
                {intelligenceResults.webAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Analyse Web</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {intelligenceResults.webAnalysis.summary || 'Analyse web effectuée'}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Social Media Analysis */}
                {intelligenceResults.socialMediaAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Réseaux Sociaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {intelligenceResults.socialMediaAnalysis.summary || 'Analyse des réseaux sociaux effectuée'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Instructions */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Comment utiliser l'Intelligence Avancée</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">🔍 Recherche OSINT</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Recherche multi-sources (Google, Reddit, GitHub, etc.)</li>
                <li>• Analyse de sentiment automatique</li>
                <li>• Cache intelligent pour optimiser les performances</li>
                <li>• Évaluation de la confiance des résultats</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🛡️ Analyse d'Intelligence</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Analyse web complète multi-moteurs</li>
                <li>• Surveillance des réseaux sociaux</li>
                <li>• Évaluation technique et de sécurité</li>
                <li>• Évaluation des risques et recommandations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 