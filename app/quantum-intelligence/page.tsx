'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Database, Loader2, Shield, Target, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface QuantumAnalysisResult {
  query: string;
  classicalAnalysis: any;
  quantumSimulation: any;
  predictiveInsights: any;
  riskForecasting: any;
  marketPredictions: any;
  confidence: number;
  quantumEntanglement: number;
  timestamp: string;
}

export default function QuantumIntelligencePage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<QuantumAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState({
    enableQuantumSimulation: true,
    enablePredictiveAI: true,
    enableMarketForecasting: true,
    enableRiskPrediction: true,
    simulationDepth: 2000
  });

  const analyzeQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quantum/intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, config }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors de l\'analyse');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEntanglementColor = (entanglement: number) => {
    if (entanglement >= 80) return 'text-purple-500';
    if (entanglement >= 60) return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Intelligence Quantique
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Analyse révolutionnaire combinant intelligence artificielle classique, simulation quantique, 
            IA prédictive et prévisions de marché pour des insights inégalés
          </p>
        </div>

        {/* Configuration */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Configuration Quantique
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="quantum"
                checked={config.enableQuantumSimulation}
                onChange={(e) => setConfig({...config, enableQuantumSimulation: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="quantum" className="text-sm text-gray-300">Simulation Quantique</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="predictive"
                checked={config.enablePredictiveAI}
                onChange={(e) => setConfig({...config, enablePredictiveAI: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="predictive" className="text-sm text-gray-300">IA Prédictive</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="market"
                checked={config.enableMarketForecasting}
                onChange={(e) => setConfig({...config, enableMarketForecasting: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="market" className="text-sm text-gray-300">Prévisions Marché</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="risk"
                checked={config.enableRiskPrediction}
                onChange={(e) => setConfig({...config, enableRiskPrediction: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="risk" className="text-sm text-gray-300">Prédiction Risques</label>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Requête d'Analyse</CardTitle>
            <CardDescription className="text-gray-400">
              Entrez votre requête pour une analyse quantique complète
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ex: Analysez les tendances futures de l'IA et ses impacts sur les marchés financiers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] bg-slate-700 border-slate-600 text-white"
            />
            <Button 
              onClick={analyzeQuery} 
              disabled={isLoading || !query.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyse Quantique en Cours...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Lancer l'Analyse Quantique
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-700">
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Confiance</p>
                      <p className={`text-2xl font-bold ${getConfidenceColor(results.confidence)}`}>
                        {results.confidence}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                  <Progress value={results.confidence} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Intrication Quantique</p>
                      <p className={`text-2xl font-bold ${getEntanglementColor(results.quantumEntanglement)}`}>
                        {results.quantumEntanglement.toFixed(1)}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <Progress value={results.quantumEntanglement} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Avantage Quantique</p>
                      <p className="text-2xl font-bold text-green-400">
                        {results.quantumSimulation?.quantumAdvantage?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Cohérence</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {(results.quantumSimulation?.coherence * 100)?.toFixed(1) || 'N/A'}%
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <Tabs defaultValue="quantum" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-800">
                <TabsTrigger value="quantum" className="text-purple-400">Quantique</TabsTrigger>
                <TabsTrigger value="predictive" className="text-blue-400">Prédictif</TabsTrigger>
                <TabsTrigger value="market" className="text-green-400">Marché</TabsTrigger>
                <TabsTrigger value="risk" className="text-red-400">Risques</TabsTrigger>
                <TabsTrigger value="classical" className="text-yellow-400">Classique</TabsTrigger>
              </TabsList>

              <TabsContent value="quantum" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Simulation Quantique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.quantumSimulation && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">États Quantiques</h4>
                            <p className="text-sm text-gray-400">
                              {results.quantumSimulation.quantumStates?.length || 0} états simulés
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Superposition</h4>
                            <p className="text-sm text-gray-400">
                              Amplitude: {results.quantumSimulation.superposition?.totalAmplitude?.toFixed(3) || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Cohérence</h4>
                            <p className="text-cyan-400">{(results.quantumSimulation.coherence * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Décohérence</h4>
                            <p className="text-orange-400">{(results.quantumSimulation.decoherence * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Avantage</h4>
                            <p className="text-green-400">{results.quantumSimulation.quantumAdvantage?.toFixed(2) || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predictive" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      IA Prédictive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.predictiveInsights && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Court Terme (7j)</h4>
                            <div className="space-y-2">
                              {results.predictiveInsights.shortTermPredictions?.slice(0, 3).map((pred: any, i: number) => (
                                <div key={i} className="text-sm">
                                  <p className="text-gray-400">Jour {pred.day}</p>
                                  <p className="text-blue-400">{(pred.confidence * 100).toFixed(0)}% confiance</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Moyen Terme (4s)</h4>
                            <div className="space-y-2">
                              {results.predictiveInsights.mediumTermPredictions?.slice(0, 3).map((pred: any, i: number) => (
                                <div key={i} className="text-sm">
                                  <p className="text-gray-400">Semaine {pred.week}</p>
                                  <p className="text-blue-400">{(pred.confidence * 100).toFixed(0)}% confiance</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Long Terme (12m)</h4>
                            <div className="space-y-2">
                              {results.predictiveInsights.longTermPredictions?.slice(0, 3).map((pred: any, i: number) => (
                                <div key={i} className="text-sm">
                                  <p className="text-gray-400">Mois {pred.month}</p>
                                  <p className="text-blue-400">{(pred.confidence * 100).toFixed(0)}% confiance</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Prévisions de Marché
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.marketPredictions && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Sentiment de Marché</h4>
                            <p className="text-green-400">
                              {results.marketPredictions.marketSentiment?.overallSentiment || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-400">
                              Score: {(results.marketPredictions.marketSentiment?.sentimentScore * 100)?.toFixed(0) || 'N/A'}%
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Volatilité</h4>
                            <p className="text-orange-400">
                              {(results.marketPredictions.volatilityForecast?.predictedVolatility * 100)?.toFixed(1) || 'N/A'}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Prédiction de Risques
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.riskForecasting && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Trajectoires de Risque</h4>
                            <div className="space-y-2">
                              {results.riskForecasting.riskTrajectories?.map((risk: any, i: number) => (
                                <div key={i} className="text-sm">
                                  <p className="text-gray-400">{risk.scenario}</p>
                                  <p className="text-red-400">{(risk.probability * 100).toFixed(0)}% probabilité</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Évolution des Menaces</h4>
                            <p className="text-orange-400">
                              {results.riskForecasting.threatEvolution?.threatTrend || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classical" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      Analyse Classique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.classicalAnalysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">OSINT</h4>
                            <p className="text-sm text-gray-400">
                              {results.classicalAnalysis.osint?.sourcesAnalyzed || 0} sources analysées
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Analyse Web</h4>
                            <p className="text-sm text-gray-400">
                              {results.classicalAnalysis.webAnalysis?.sourcesAnalyzed || 0} sources web
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
} 