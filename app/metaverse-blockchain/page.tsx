'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Bitcoin, Coins, Eye, Globe, Loader2, Shield, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface MetaverseBlockchainResult {
  query: string;
  classicalAnalysis: any;
  quantumAnalysis: any;
  blockchainAnalysis: any;
  metaverseAnalysis: any;
  nftIntelligence: any;
  defiAnalysis: any;
  web3Insights: any;
  confidence: number;
  blockchainScore: number;
  metaverseScore: number;
  timestamp: string;
}

export default function MetaverseBlockchainPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MetaverseBlockchainResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState({
    enableBlockchainAnalysis: true,
    enableMetaverseAnalysis: true,
    enableNFTIntelligence: true,
    enableDeFiAnalysis: true,
    enableWeb3Insights: true
  });

  const analyzeQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/metaverse-blockchain/analysis', {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Métaverse + Blockchain Intelligence
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Analyse révolutionnaire combinant intelligence artificielle, blockchain, métaverse, NFT, DeFi et Web3 
            pour des insights complets sur l'écosystème numérique du futur
          </p>
        </div>

        {/* Configuration */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Configuration d'Analyse
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="blockchain"
                checked={config.enableBlockchainAnalysis}
                onChange={(e) => setConfig({...config, enableBlockchainAnalysis: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="blockchain" className="text-sm text-gray-300">Blockchain</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="metaverse"
                checked={config.enableMetaverseAnalysis}
                onChange={(e) => setConfig({...config, enableMetaverseAnalysis: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="metaverse" className="text-sm text-gray-300">Métaverse</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="nft"
                checked={config.enableNFTIntelligence}
                onChange={(e) => setConfig({...config, enableNFTIntelligence: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="nft" className="text-sm text-gray-300">NFT</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="defi"
                checked={config.enableDeFiAnalysis}
                onChange={(e) => setConfig({...config, enableDeFiAnalysis: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="defi" className="text-sm text-gray-300">DeFi</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="web3"
                checked={config.enableWeb3Insights}
                onChange={(e) => setConfig({...config, enableWeb3Insights: e.target.checked})}
                className="rounded border-slate-600"
              />
              <label htmlFor="web3" className="text-sm text-gray-300">Web3</label>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Requête d'Analyse</CardTitle>
            <CardDescription className="text-gray-400">
              Entrez votre requête pour une analyse complète Métaverse + Blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ex: Analysez l'impact des NFT sur l'économie du métaverse et les opportunités DeFi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] bg-slate-700 border-slate-600 text-white"
            />
            <Button 
              onClick={analyzeQuery} 
              disabled={isLoading || !query.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyse en Cours...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  Lancer l'Analyse Complète
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
                      <p className="text-sm text-gray-400">Confiance Globale</p>
                      <p className={`text-2xl font-bold ${getScoreColor(results.confidence)}`}>
                        {results.confidence}%
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                  <Progress value={results.confidence} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Score Blockchain</p>
                      <p className={`text-2xl font-bold ${getScoreColor(results.blockchainScore)}`}>
                        {results.blockchainScore}%
                      </p>
                    </div>
                    <Bitcoin className="w-8 h-8 text-orange-400" />
                  </div>
                  <Progress value={results.blockchainScore} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Score Métaverse</p>
                      <p className={`text-2xl font-bold ${getScoreColor(results.metaverseScore)}`}>
                        {results.metaverseScore}%
                      </p>
                    </div>
                    <Globe className="w-8 h-8 text-purple-400" />
                  </div>
                  <Progress value={results.metaverseScore} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Réseaux Analysés</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {Object.keys(results.blockchainAnalysis?.networks || {}).length}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <Tabs defaultValue="blockchain" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-slate-800">
                <TabsTrigger value="blockchain" className="text-orange-400">Blockchain</TabsTrigger>
                <TabsTrigger value="metaverse" className="text-purple-400">Métaverse</TabsTrigger>
                <TabsTrigger value="nft" className="text-green-400">NFT</TabsTrigger>
                <TabsTrigger value="defi" className="text-blue-400">DeFi</TabsTrigger>
                <TabsTrigger value="web3" className="text-cyan-400">Web3</TabsTrigger>
                <TabsTrigger value="quantum" className="text-yellow-400">Quantique</TabsTrigger>
              </TabsList>

              <TabsContent value="blockchain" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center">
                      <Bitcoin className="w-5 h-5 mr-2" />
                      Analyse Blockchain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.blockchainAnalysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(results.blockchainAnalysis.networks || {}).map(([network, data]: [string, any]) => (
                            <div key={network} className="bg-slate-700/50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-300 mb-2 capitalize">{network}</h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-gray-400">Transactions: {data.totalTransactions?.toLocaleString()}</p>
                                <p className="text-gray-400">Market Cap: ${(data.marketCap / 1e9).toFixed(2)}B</p>
                                <p className="text-gray-400">Volume 24h: ${(data.volume24h / 1e6).toFixed(2)}M</p>
                                <p className="text-orange-400">Sécurité: {data.securityScore?.toFixed(0)}%</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metaverse" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Analyse Métaverse
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.metaverseAnalysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(results.metaverseAnalysis.platforms || {}).map(([platform, data]: [string, any]) => (
                            <div key={platform} className="bg-slate-700/50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-300 mb-2 capitalize">{platform}</h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-gray-400">Utilisateurs: {data.activeUsers?.toLocaleString()}</p>
                                <p className="text-gray-400">Terrains: {data.virtualLand?.toLocaleString()}</p>
                                <p className="text-gray-400">Market Cap: ${(data.marketCap / 1e9).toFixed(2)}B</p>
                                <p className="text-purple-400">Engagement: {(data.userEngagement * 100).toFixed(0)}%</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nft" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center">
                      <Coins className="w-5 h-5 mr-2" />
                      Intelligence NFT
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.nftIntelligence && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Collections</h4>
                            <p className="text-sm text-gray-400">
                              Total: {results.nftIntelligence.collections?.totalCollections?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              Market Cap: ${(results.nftIntelligence.collections?.marketCap / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Marché</h4>
                            <p className="text-sm text-gray-400">
                              Volume: ${(results.nftIntelligence.marketAnalysis?.totalVolume / 1e6).toFixed(2)}M
                            </p>
                            <p className="text-sm text-gray-400">
                              Prix moyen: ${results.nftIntelligence.marketAnalysis?.averagePrice?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="defi" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Analyse DeFi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.defiAnalysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Protocoles</h4>
                            <p className="text-sm text-gray-400">
                              Total: {results.defiAnalysis.protocols?.totalProtocols?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              TVL: ${(results.defiAnalysis.protocols?.tvl / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Rendements</h4>
                            <p className="text-sm text-gray-400">
                              APY moyen: {(results.defiAnalysis.yieldAnalysis?.averageAPY * 100).toFixed(2)}%
                            </p>
                            <p className="text-sm text-gray-400">
                              Retours ajustés: {(results.defiAnalysis.yieldAnalysis?.riskAdjustedReturns * 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="web3" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Insights Web3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.web3Insights && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Écosystème</h4>
                            <p className="text-sm text-gray-400">
                              Projets: {results.web3Insights.ecosystemAnalysis?.totalProjects?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              Financement: ${(results.web3Insights.ecosystemAnalysis?.funding / 1e9).toFixed(2)}B
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Innovation</h4>
                            <p className="text-sm text-gray-400">
                              Score: {results.web3Insights.innovationMetrics?.innovationScore?.toFixed(0)}%
                            </p>
                            <p className="text-sm text-gray-400">
                              Recherche: {results.web3Insights.innovationMetrics?.researchActivity?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quantum" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Analyse Quantique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.quantumAnalysis && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Confiance</h4>
                            <p className="text-yellow-400 text-2xl font-bold">
                              {results.quantumAnalysis.confidence}%
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-300 mb-2">Intrication</h4>
                            <p className="text-yellow-400 text-2xl font-bold">
                              {results.quantumAnalysis.quantumEntanglement?.toFixed(1) || 'N/A'}
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