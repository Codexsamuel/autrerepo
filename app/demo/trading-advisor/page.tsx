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
    CheckCircle,
    ExternalLink,
    History,
    Info,
    MessageSquare,
    RefreshCw,
    Send,
    Shield,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TradingAdvice {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD' | 'WATCH';
  confidence: number;
  reasoning: string;
  sources: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: 'SHORT' | 'MEDIUM' | 'LONG';
  priceTarget?: number;
  stopLoss?: number;
  timestamp: string;
  marketContext: string;
  warnings: string[];
}

interface MarketAnalysis {
  symbol: string;
  currentPrice: number;
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  support: number;
  resistance: number;
  volume: number;
  volatility: number;
  newsImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  politicalImpact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  economicFactors: string[];
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  advice?: TradingAdvice;
  analysis?: MarketAnalysis;
}

export default function TradingAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState<TradingAdvice | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<MarketAnalysis | null>(null);
  const [historicalAdvice, setHistoricalAdvice] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const popularSymbols = [
    { value: 'AAPL', label: 'Apple Inc.' },
    { value: 'TSLA', label: 'Tesla Inc.' },
    { value: 'MSFT', label: 'Microsoft Corp.' },
    { value: 'GOOGL', label: 'Alphabet Inc.' },
    { value: 'AMZN', label: 'Amazon.com Inc.' },
    { value: 'NVDA', label: 'NVIDIA Corp.' },
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'EUR/USD', label: 'EUR/USD' },
    { value: 'GBP/USD', label: 'GBP/USD' }
  ];

  // Messages d'accueil
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'bot',
      content: `Bonjour ! Je suis votre assistant trading IA. Je peux analyser les marchés en temps réel et vous donner des conseils basés sur des données vérifiables.

Exemples de questions :
• "Analyse AAPL pour moi"
• "Que penses-tu du Bitcoin ?"
• "Conseils pour EUR/USD"
• "Risques sur TSLA"

⚠️ Avertissement : Mes conseils sont éducatifs uniquement. Faites vos propres recherches avant d'investir.`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fonction pour obtenir des conseils
  const getAdvice = async (symbol: string, includeNews: boolean = true) => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/trading/advisor?symbol=${symbol}&news=${includeNews}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de l\'analyse');
      }
      
      setCurrentAdvice(data.advice);
      setCurrentAnalysis(data.marketAnalysis);
      
      // Message du bot avec conseil
      const botMessage: ChatMessage = {
        id: `advice_${Date.now()}`,
        type: 'bot',
        content: generateAdviceMessage(data.advice, data.marketAnalysis, data.newsAnalysis),
        timestamp: new Date(),
        advice: data.advice,
        analysis: data.marketAnalysis
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des conseils:', error);
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: 'Désolé, je n\'ai pas pu analyser ce symbole pour le moment. Vérifiez que le symbole est correct et réessayez.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Génération du message de conseil
  const generateAdviceMessage = (advice: TradingAdvice, analysis: MarketAnalysis, newsAnalysis?: any): string => {
    let message = `📊 **Analyse de ${advice.symbol}**\n\n`;
    
    // Action recommandée
    const actionEmoji = {
      'BUY': '🟢',
      'SELL': '🔴',
      'HOLD': '🟡',
      'WATCH': '👁️'
    };
    
    message += `${actionEmoji[advice.action]} **Action recommandée : ${advice.action}**\n`;
    message += `🎯 **Confiance : ${advice.confidence}%**\n`;
    message += `⏰ **Horizon : ${advice.timeframe}**\n\n`;
    
    // Raisonnement
    message += `💡 **Raisonnement :**\n${advice.reasoning}\n\n`;
    
    // Contexte de marché
    message += `🌍 **Contexte :**\n${advice.marketContext}\n\n`;
    
    // Objectifs de prix
    if (advice.priceTarget && advice.stopLoss) {
      message += `📈 **Objectif : $${advice.priceTarget}**\n`;
      message += `🛡️ **Stop-loss : $${advice.stopLoss}**\n\n`;
    }
    
    // Avertissements
    if (advice.warnings.length > 0) {
      message += `⚠️ **Avertissements :**\n`;
      advice.warnings.forEach(warning => {
        message += `• ${warning}\n`;
      });
      message += '\n';
    }
    
    // Sources
    message += `📚 **Sources fiables :**\n`;
    advice.sources.slice(0, 3).forEach(source => {
      message += `• ${source}\n`;
    });
    
    return message;
  };

  // Gestion de l'envoi de message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;
    
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Analyse du message utilisateur
    const lowerInput = inputValue.toLowerCase();
    
    if (lowerInput.includes('analyse') || lowerInput.includes('conseil') || lowerInput.includes('pense')) {
      // Extraction du symbole
      let symbol = selectedSymbol;
      
      for (const sym of popularSymbols) {
        if (lowerInput.includes(sym.value.toLowerCase())) {
          symbol = sym.value;
          break;
        }
      }
      
      await getAdvice(symbol, true);
    } else if (lowerInput.includes('historique') || lowerInput.includes('performance')) {
      // Récupération de l'historique
      try {
        const response = await fetch('/api/trading/advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbol: selectedSymbol, timeframe: '7d' })
        });
        
        const data = await response.json();
        if (data.success) {
          setHistoricalAdvice(data.historicalAdvice);
          
          const historyMessage: ChatMessage = {
            id: `history_${Date.now()}`,
            type: 'bot',
            content: `📈 **Historique des conseils pour ${selectedSymbol}**\n\n` +
              `Total : ${data.performance.totalAdvice} conseils\n` +
              `Réussite : ${data.performance.successfulAdvice}/${data.performance.totalAdvice}\n` +
              `Performance moyenne : ${data.performance.averagePerformance}\n\n` +
              `Consultez l'onglet "Historique" pour plus de détails.`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, historyMessage]);
        }
      } catch (error) {
        console.error('Erreur historique:', error);
      }
    } else {
      // Message générique
      const genericMessage: ChatMessage = {
        id: `generic_${Date.now()}`,
        type: 'bot',
        content: `Je peux vous aider à analyser les marchés. Essayez de me demander :\n\n` +
          `• "Analyse AAPL pour moi"\n` +
          `• "Conseils pour Bitcoin"\n` +
          `• "Que penses-tu de EUR/USD ?"\n` +
          `• "Historique des conseils"`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, genericMessage]);
    }
  };

  // Raccourcis rapides
  const quickActions = [
    { symbol: 'AAPL', label: 'Apple' },
    { symbol: 'TSLA', label: 'Tesla' },
    { symbol: 'bitcoin', label: 'Bitcoin' },
    { symbol: 'EUR/USD', label: 'EUR/USD' }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'text-green-600 bg-green-100';
      case 'SELL': return 'text-red-600 bg-red-100';
      case 'HOLD': return 'text-yellow-600 bg-yellow-100';
      case 'WATCH': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'HIGH': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bot className="w-8 h-8 text-blue-600" />
            Assistant Trading IA
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Conseils intelligents basés sur l'analyse en temps réel et des sources fiables
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            IA en temps réel
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Sources vérifiées
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversation IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 border'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-700 border p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyse en cours...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Posez votre question... (ex: Analyse AAPL)"
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={loading || !inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Raccourcis rapides */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Raccourcis :</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.symbol}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setInputValue(`Analyse ${action.symbol}`);
                        handleSendMessage();
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Analyse actuelle */}
        <div className="space-y-4">
          {/* Sélection de symbole */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Symbole
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularSymbols.map((symbol) => (
                    <SelectItem key={symbol.value} value={symbol.value}>
                      {symbol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => getAdvice(selectedSymbol, true)}
                className="w-full mt-2"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Analyser
              </Button>
            </CardContent>
          </Card>

          {/* Conseil actuel */}
          {currentAdvice && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Conseil actuel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{currentAdvice.symbol}</span>
                  <Badge className={getActionColor(currentAdvice.action)}>
                    {currentAdvice.action}
                  </Badge>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confiance</span>
                    <span>{currentAdvice.confidence}%</span>
                  </div>
                  <Progress value={currentAdvice.confidence} className="h-2" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Risque :</span>
                    <span className={getRiskColor(currentAdvice.riskLevel)}>
                      {currentAdvice.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horizon :</span>
                    <span>{currentAdvice.timeframe}</span>
                  </div>
                  {currentAdvice.priceTarget && (
                    <div className="flex justify-between">
                      <span>Objectif :</span>
                      <span className="text-green-600">${currentAdvice.priceTarget}</span>
                    </div>
                  )}
                  {currentAdvice.stopLoss && (
                    <div className="flex justify-between">
                      <span>Stop-loss :</span>
                      <span className="text-red-600">${currentAdvice.stopLoss}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(currentAdvice.timestamp).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analyse technique */}
          {currentAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Analyse technique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Prix actuel :</span>
                  <span className="font-medium">${currentAnalysis.currentPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Tendance :</span>
                  <Badge variant={
                    currentAnalysis.trend === 'BULLISH' ? 'default' :
                    currentAnalysis.trend === 'BEARISH' ? 'destructive' : 'secondary'
                  }>
                    {currentAnalysis.trend}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Volatilité :</span>
                  <span className="text-sm">{currentAnalysis.volatility.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Support :</span>
                  <span className="text-sm">${currentAnalysis.support.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Résistance :</span>
                  <span className="text-sm">${currentAnalysis.resistance.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Onglets pour plus de détails */}
      <Tabs defaultValue="advice" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="advice">Conseil détaillé</TabsTrigger>
          <TabsTrigger value="analysis">Analyse complète</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="advice" className="space-y-4">
          {currentAdvice ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Raisonnement</h3>
                    <p className="text-gray-700 dark:text-gray-300">{currentAdvice.reasoning}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contexte de marché</h3>
                    <p className="text-gray-700 dark:text-gray-300">{currentAdvice.marketContext}</p>
                  </div>
                  
                  {currentAdvice.warnings.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Avertissements
                      </h3>
                      <ul className="space-y-1">
                        {currentAdvice.warnings.map((warning, index) => (
                          <li key={index} className="text-orange-700 dark:text-orange-300 flex items-start gap-2">
                            <span>•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Sources fiables</h3>
                    <div className="space-y-1">
                      {currentAdvice.sources.map((source, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <ExternalLink className="w-3 h-3" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                Sélectionnez un symbole et demandez une analyse pour voir les détails
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {currentAnalysis ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Facteurs économiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentAnalysis.economicFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Impact des nouvelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Impact économique :</span>
                      <Badge variant={
                        currentAnalysis.newsImpact === 'POSITIVE' ? 'default' :
                        currentAnalysis.newsImpact === 'NEGATIVE' ? 'destructive' : 'secondary'
                      }>
                        {currentAnalysis.newsImpact}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact politique :</span>
                      <Badge variant={
                        currentAnalysis.politicalImpact === 'POSITIVE' ? 'default' :
                        currentAnalysis.politicalImpact === 'NEGATIVE' ? 'destructive' : 'secondary'
                      }>
                        {currentAnalysis.politicalImpact}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                Aucune analyse disponible
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {historicalAdvice.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Historique des conseils
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalAdvice.map((advice) => (
                    <div key={advice.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{advice.symbol}</span>
                          <Badge className={getActionColor(advice.action)}>
                            {advice.action}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(advice.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {advice.reasoning}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Confiance : {advice.confidence}%</span>
                        {advice.performance && (
                          <span className={advice.performance.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                            {advice.performance}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                Aucun historique disponible. Demandez "Historique des conseils" pour voir les performances passées.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Avertissement :</strong> Ces conseils sont fournis à titre éducatif uniquement et ne constituent pas un conseil financier professionnel. 
          Faites vos propres recherches avant d'investir. Les marchés financiers comportent des risques de perte.
        </AlertDescription>
      </Alert>
    </div>
  );
} 