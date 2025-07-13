'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AlertTriangle,
    BarChart3,
    Bot,
    Brain,
    MessageSquare,
    RefreshCw,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DarkGPTMessage {
  id: string;
  type: 'user' | 'dark-gpt';
  content: string;
  timestamp: Date;
  data?: any;
  confidence?: number;
  recommendation?: string;
}

interface DarkGPTAnalysis {
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WATCH';
  confidence: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  priceTargets: {
    shortTerm: number;
    mediumTerm: number;
    longTerm: number;
  };
  stopLoss: number;
  takeProfit: number;
  timeHorizon: string;
  keyFactors: string[];
  warnings: string[];
  sources: string[];
  alternativeScenarios: {
    bullish: string;
    bearish: string;
    neutral: string;
  };
  marketContext: {
    sectorTrend: string;
    marketSentiment: string;
    volatility: string;
    liquidity: string;
  };
}

export default function DarkGPTChat() {
  const [messages, setMessages] = useState<DarkGPTMessage[]>([
    {
      id: '1',
      type: 'dark-gpt',
      content: 'Bonjour ! Je suis Dark GPT, votre assistant de trading IA avancé. Je peux analyser les marchés, faire des prédictions et créer des stratégies personnalisées. Que souhaitez-vous analyser ?',
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [selectedAction, setSelectedAction] = useState('analyze');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedRiskProfile, setSelectedRiskProfile] = useState('moderate');
  const [capital, setCapital] = useState(10000);
  const [currentAnalysis, setCurrentAnalysis] = useState<DarkGPTAnalysis | null>(null);
  const [cacheStats, setCacheStats] = useState({ size: 0, hitRate: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Omit<DarkGPTMessage, 'id' | 'timestamp'>) => {
    const newMessage: DarkGPTMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'WATCH': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'EXTREME': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Ajouter le message utilisateur
    addMessage({
      type: 'user',
      content: userMessage,
    });

    try {
      // Détecter le type de demande
      let action = 'analyze';
      let symbol = selectedSymbol;
      const timeframe = selectedTimeframe;

      // Extraction automatique du symbole et de l'action
      const symbolMatch = userMessage.match(/([A-Z]{1,5}|[A-Z]{2,4}\/[A-Z]{2,4})/);
      if (symbolMatch) {
        symbol = symbolMatch[1];
      }

      if (userMessage.toLowerCase().includes('prédiction') || userMessage.toLowerCase().includes('predict')) {
        action = 'predict';
      } else if (userMessage.toLowerCase().includes('stratégie') || userMessage.toLowerCase().includes('strategy')) {
        action = 'strategy';
      } else if (userMessage.toLowerCase().includes('analyse') || userMessage.toLowerCase().includes('analyze')) {
        action = 'analyze';
      }

      if (!symbol) {
        addMessage({
          type: 'dark-gpt',
          content: 'Veuillez spécifier un symbole à analyser (ex: AAPL, BTC, EUR/USD)',
        });
        setIsLoading(false);
        return;
      }

      // Appel à l'API Dark GPT
      const response = await fetch('/api/trading/dark-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          action,
          timeframe,
          riskProfile: selectedRiskProfile,
          capital,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'analyse');
      }

      const analysis = result.data;
      setCurrentAnalysis(analysis);
      setCacheStats(result.metadata.cacheStats);

      // Formater la réponse
      let responseContent = '';
      
      if (action === 'analyze') {
        responseContent = `🔍 **Analyse Dark GPT pour ${symbol}**

📊 **Recommandation**: ${analysis.recommendation}
🎯 **Confiance**: ${analysis.confidence}%
⚠️ **Niveau de risque**: ${analysis.riskLevel}

💰 **Cibles de prix**:
- Court terme: $${analysis.priceTargets.shortTerm.toFixed(2)}
- Moyen terme: $${analysis.priceTargets.mediumTerm.toFixed(2)}
- Long terme: $${analysis.priceTargets.longTerm.toFixed(2)}

🛡️ **Gestion des risques**:
- Stop-loss: $${analysis.stopLoss.toFixed(2)}
- Take-profit: $${analysis.takeProfit.toFixed(2)}

📈 **Facteurs clés**: ${analysis.keyFactors.join(', ')}

⚠️ **Avertissements**: ${analysis.warnings.join(', ')}

📰 **Sources**: ${analysis.sources.join(', ')}

${analysis.reasoning}`;
      } else if (action === 'predict') {
        responseContent = `🔮 **Prédiction Dark GPT pour ${symbol}**

📈 **Direction**: ${analysis.prediction.direction}
🎯 **Probabilité**: ${analysis.prediction.probability}%
📊 **Magnitude**: ${analysis.prediction.magnitude}%

${analysis.reasoning}`;
      } else if (action === 'strategy') {
        responseContent = `⚡ **Stratégie Dark GPT pour ${symbol}**

${analysis.strategy}

💰 **Capital**: $${capital.toLocaleString()}
🎯 **Profil de risque**: ${selectedRiskProfile}`;
      }

      addMessage({
        type: 'dark-gpt',
        content: responseContent,
        data: analysis,
        confidence: analysis.confidence,
        recommendation: analysis.recommendation,
      });

    } catch (error) {
      console.error('Erreur Dark GPT:', error);
      addMessage({
        type: 'dark-gpt',
        content: `❌ Erreur lors de l'analyse: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Veuillez réessayer.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string, symbol: string) => {
    setSelectedAction(action);
    setSelectedSymbol(symbol);
    setInputValue(`${action === 'analyze' ? 'Analyse' : action === 'predict' ? 'Prédiction' : 'Stratégie'} pour ${symbol}`);
    handleSubmit(new Event('submit') as any);
  };

  const clearCache = async () => {
    try {
      await fetch('/api/trading/dark-gpt', { method: 'DELETE' });
      setCacheStats({ size: 0, hitRate: 0 });
      addMessage({
        type: 'dark-gpt',
        content: '✅ Cache Dark GPT vidé avec succès',
      });
    } catch (error) {
      addMessage({
        type: 'dark-gpt',
        content: '❌ Erreur lors du vidage du cache',
      });
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header avec statistiques */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Dark GPT Trading Assistant</CardTitle>
                <p className="text-sm text-gray-500">IA avancée pour l'analyse de marché</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Cache: {cacheStats.size} items
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCache}
                className="text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Vider cache
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Configuration rapide */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Symbole</label>
              <Input
                placeholder="AAPL, BTC, EUR/USD"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyze">Analyse</SelectItem>
                  <SelectItem value="predict">Prédiction</SelectItem>
                  <SelectItem value="strategy">Stratégie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1H">1H</SelectItem>
                  <SelectItem value="4H">4H</SelectItem>
                  <SelectItem value="1D">1D</SelectItem>
                  <SelectItem value="1W">1W</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Capital</label>
              <Input
                type="number"
                value={capital}
                onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('analyze', 'AAPL')}
              className="text-xs"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              Analyser AAPL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('predict', 'BTC')}
              className="text-xs"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Prédire BTC
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('strategy', 'EUR/USD')}
              className="text-xs"
            >
              <Target className="w-3 h-3 mr-1" />
              Stratégie EUR/USD
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('analyze', 'TSLA')}
              className="text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Analyser TSLA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat interface */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Conversation Dark GPT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'dark-gpt' && (
                      <Brain className="w-4 h-4 mt-1 text-purple-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      
                      {/* Affichage des données structurées */}
                      {message.data && message.type === 'dark-gpt' && (
                        <div className="mt-3 space-y-2">
                          {message.recommendation && (
                            <Badge className={getRecommendationColor(message.recommendation)}>
                              {message.recommendation}
                            </Badge>
                          )}
                          
                          {message.confidence && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600">Confiance:</span>
                              <Progress value={message.confidence} className="w-20 h-2" />
                              <span className="text-xs font-medium">{message.confidence}%</span>
                            </div>
                          )}
                          
                          {message.data.riskLevel && (
                            <Badge className={getRiskColor(message.data.riskLevel)}>
                              Risque: {message.data.riskLevel}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question à Dark GPT (ex: 'Analyse AAPL', 'Prédiction BTC', 'Stratégie EUR/USD')"
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Analyse actuelle */}
      {currentAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Analyse Actuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="targets">Cibles</TabsTrigger>
                <TabsTrigger value="risks">Risques</TabsTrigger>
                <TabsTrigger value="context">Contexte</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Recommandation</h4>
                    <Badge className={getRecommendationColor(currentAnalysis.recommendation)}>
                      {currentAnalysis.recommendation}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Confiance</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={currentAnalysis.confidence} className="w-20 h-2" />
                      <span className="text-sm font-medium">{currentAnalysis.confidence}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Facteurs clés</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentAnalysis.keyFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="targets" className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Court terme</h4>
                    <p className="text-lg font-bold text-green-600">
                      ${currentAnalysis.priceTargets.shortTerm.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Moyen terme</h4>
                    <p className="text-lg font-bold text-blue-600">
                      ${currentAnalysis.priceTargets.mediumTerm.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Long terme</h4>
                    <p className="text-lg font-bold text-purple-600">
                      ${currentAnalysis.priceTargets.longTerm.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Stop-loss</h4>
                    <p className="text-lg font-bold text-red-600">
                      ${currentAnalysis.stopLoss.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Take-profit</h4>
                    <p className="text-lg font-bold text-green-600">
                      ${currentAnalysis.takeProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="risks" className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Niveau de risque</h4>
                  <Badge className={getRiskColor(currentAnalysis.riskLevel)}>
                    {currentAnalysis.riskLevel}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Avertissements</h4>
                  <div className="space-y-1">
                    {currentAnalysis.warnings.map((warning, index) => (
                      <Alert key={index}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">{warning}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="context" className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Tendance secteur</h4>
                    <p className="text-sm">{currentAnalysis.marketContext.sectorTrend}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Sentiment marché</h4>
                    <p className="text-sm">{currentAnalysis.marketContext.marketSentiment}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Volatilité</h4>
                    <p className="text-sm">{currentAnalysis.marketContext.volatility}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Liquidité</h4>
                    <p className="text-sm">{currentAnalysis.marketContext.liquidity}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Sources</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentAnalysis.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 