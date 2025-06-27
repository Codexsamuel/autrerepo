"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Types simplifiés pour éviter les conflits d'imports
interface AIPrediction {
  direction: 'up' | 'down' | 'neutral';
  confidence: number;
  reasoning: string;
}

interface MarketAnalysis {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  recommendation: string;
  riskLevel: string;
}

interface TradingSignal {
  action: 'buy' | 'sell' | 'hold';
  strength: number;
  reasoning: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  data?: AIPrediction | MarketAnalysis | TradingSignal;
}

// Service DAVY simplifié pour éviter les imports problématiques
class DavyTradingAdvisor {
  async getPrediction(symbol: string): Promise<AIPrediction | null> {
    // Simulation d'une prédiction
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      direction: Math.random() > 0.5 ? 'up' : 'down',
      confidence: 0.7 + Math.random() * 0.2,
      reasoning: `Analyse technique et fondamentale pour ${symbol} indique une tendance ${Math.random() > 0.5 ? 'positive' : 'négative'}.`
    };
  }

  async getMarketAnalysis(symbol: string): Promise<MarketAnalysis | null> {
    // Simulation d'une analyse
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      sentiment: Math.random() > 0.5 ? 'bullish' : 'bearish',
      confidence: 0.6 + Math.random() * 0.3,
      recommendation: Math.random() > 0.5 ? 'Acheter' : 'Vendre',
      riskLevel: Math.random() > 0.5 ? 'Modéré' : 'Élevé'
    };
  }

  async getTradingSignal(symbol: string): Promise<TradingSignal | null> {
    // Simulation d'un signal
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      action: Math.random() > 0.5 ? 'buy' : 'sell',
      strength: 0.5 + Math.random() * 0.4,
      reasoning: `Signal ${Math.random() > 0.5 ? 'd\'achat' : 'de vente'} pour ${symbol} basé sur l'analyse technique.`
    };
  }
}

export default function DavyTradingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [advisor] = useState(() => new DavyTradingAdvisor());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Message de bienvenue
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        content: 'Bonjour ! Je suis DAVY, votre conseiller en trading IA. Posez-moi des questions sur les marchés, demandez des analyses ou des prédictions.',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Analyse du message pour déterminer l'action
      const lowerInput = input.toLowerCase();
      let aiResponse: ChatMessage;

      if (lowerInput.includes('prédiction') || lowerInput.includes('prediction')) {
        const symbol = extractSymbol(input);
        if (symbol) {
          const prediction = await advisor.getPrediction(symbol);
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: prediction 
              ? `Prédiction pour ${symbol}: ${prediction.direction === 'up' ? '📈 Hausse' : '📉 Baisse'} (Confiance: ${Math.round(prediction.confidence * 100)}%)\n\n${prediction.reasoning}`
              : `Désolé, je n'ai pas pu générer une prédiction pour ${symbol}.`,
            timestamp: new Date(),
            data: prediction || undefined
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Veuillez spécifier un symbole pour la prédiction (ex: "Prédiction pour AAPL")',
            timestamp: new Date()
          };
        }
      } else if (lowerInput.includes('analyse') || lowerInput.includes('sentiment')) {
        const symbol = extractSymbol(input);
        if (symbol) {
          const analysis = await advisor.getMarketAnalysis(symbol);
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: analysis 
              ? `Analyse du marché pour ${symbol}:\n\nSentiment: ${analysis.sentiment}\nConfiance: ${Math.round(analysis.confidence * 100)}%\nRecommandation: ${analysis.recommendation}\nNiveau de risque: ${analysis.riskLevel}`
              : `Désolé, je n'ai pas pu analyser le sentiment pour ${symbol}.`,
            timestamp: new Date(),
            data: analysis || undefined
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Veuillez spécifier un symbole pour l\'analyse (ex: "Analyse AAPL")',
            timestamp: new Date()
          };
        }
      } else if (lowerInput.includes('signal') || lowerInput.includes('trade')) {
        const symbol = extractSymbol(input);
        if (symbol) {
          const signal = await advisor.getTradingSignal(symbol);
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: signal 
              ? `Signal de trading pour ${symbol}:\n\nAction: ${signal.action.toUpperCase()}\nForce: ${Math.round(signal.strength * 100)}%\nRaisonnement: ${signal.reasoning}`
              : `Désolé, je n'ai pas pu générer un signal pour ${symbol}.`,
            timestamp: new Date(),
            data: signal || undefined
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Veuillez spécifier un symbole pour le signal (ex: "Signal AAPL")',
            timestamp: new Date()
          };
        }
      } else {
        // Réponse générique
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'Je peux vous aider avec:\n• Prédictions de prix (ex: "Prédiction pour AAPL")\n• Analyses de sentiment (ex: "Analyse TSLA")\n• Signaux de trading (ex: "Signal BTC")\n\nQue souhaitez-vous savoir ?',
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur DAVY:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractSymbol = (text: string): string | null => {
    // Extraction simple de symboles boursiers (3-5 caractères en majuscules)
    const symbolMatch = text.match(/\b[A-Z]{3,5}\b/);
    return symbolMatch ? symbolMatch[0] : null;
  };

  const getDirectionIcon = (direction?: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSentimentBadge = (sentiment?: string) => {
    switch (sentiment) {
      case 'bullish': return <Badge className="bg-green-100 text-green-800">Bullish</Badge>;
      case 'bearish': return <Badge className="bg-red-100 text-red-800">Bearish</Badge>;
      case 'neutral': return <Badge className="bg-gray-100 text-gray-800">Neutral</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          DAVY Trading Advisor
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
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
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.data && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      {message.data && 'direction' in message.data && (
                        <div className="flex items-center gap-2 text-sm">
                          {getDirectionIcon(message.data.direction)}
                          <span>Confiance: {Math.round(message.data.confidence * 100)}%</span>
                        </div>
                      )}
                      
                      {message.data && 'sentiment' in message.data && (
                        <div className="flex items-center gap-2 text-sm">
                          {getSentimentBadge(message.data.sentiment)}
                          <span>Confiance: {Math.round(message.data.confidence * 100)}%</span>
                        </div>
                      )}
                      
                      {message.data && 'action' in message.data && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className={
                            message.data.action === 'buy' ? 'bg-green-100 text-green-800' :
                            message.data.action === 'sell' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {message.data.action.toUpperCase()}
                          </Badge>
                          <span>Force: {Math.round(message.data.strength * 100)}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>DAVY réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez une question à DAVY..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 