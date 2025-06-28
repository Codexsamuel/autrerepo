"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Brain,
  Zap
} from 'lucide-react';
import DavyTradingChat from './DavyTradingChat';

interface TradingStats {
  totalTrades: number;
  winRate: number;
  totalProfit: number;
  activePositions: number;
  dailyChange: number;
  monthlyChange: number;
}

interface MarketOverview {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  trend: 'bullish' | 'bearish' | 'neutral';
}

export default function DAVYDashboard() {
  const [stats, setStats] = useState<TradingStats>({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    activePositions: 0,
    dailyChange: 0,
    monthlyChange: 0
  });

  const [marketData, setMarketData] = useState<MarketOverview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      setIsLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées
      setStats({
        totalTrades: 156,
        winRate: 68.5,
        totalProfit: 15420.50,
        activePositions: 8,
        dailyChange: 2.3,
        monthlyChange: 12.7
      });

      setMarketData([
        {
          symbol: 'AAPL',
          price: 185.92,
          change: 2.45,
          changePercent: 1.33,
          volume: 45678900,
          trend: 'bullish'
        },
        {
          symbol: 'BTC',
          price: 43250.75,
          change: -1250.25,
          changePercent: -2.81,
          volume: 28456789000,
          trend: 'bearish'
        },
        {
          symbol: 'ETH',
          price: 2650.45,
          change: 45.67,
          changePercent: 1.75,
          volume: 15678900000,
          trend: 'bullish'
        },
        {
          symbol: 'TSLA',
          price: 245.67,
          change: -3.21,
          changePercent: -1.29,
          volume: 23456700,
          trend: 'neutral'
        }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DAVY Trading Dashboard</h1>
          <p className="text-gray-600 mt-1">Votre assistant IA pour le trading intelligent</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            IA Active
          </Badge>
          <Button variant="outline" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Mode Auto
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrades}</div>
            <p className="text-xs text-muted-foreground">
              +12 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.winRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalProfit.toLocaleString()}</div>
            <p className={`text-xs flex items-center gap-1 ${getChangeColor(stats.monthlyChange)}`}>
              {getChangeIcon(stats.monthlyChange)}
              +{stats.monthlyChange}% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positions Actives</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePositions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> cette semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="chat">Assistant IA</TabsTrigger>
          <TabsTrigger value="analysis">Analyses</TabsTrigger>
          <TabsTrigger value="signals">Signaux</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vue d'ensemble du marché */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Vue d'ensemble du marché
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((item: any) => (
                    <div key={item.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-blue-600">{item.symbol}</span>
                        </div>
                        <div>
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">
                            Vol: {item.volume.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 ${getChangeColor(item.change)}`}>
                          {getChangeIcon(item.change)}
                          <span className="font-medium">
                            {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommandations IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Recommandations IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">AAPL - Acheter</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Support technique solide à $180. RSI en zone de survente. 
                      Recommandation: Acheter sur pullback.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">Confiance: 85%</Badge>
                      <Badge variant="outline">Stop: $175</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">BTC - Attendre</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Consolidation en cours. Volatilité élevée. 
                      Recommandation: Maintenir les positions existantes.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-yellow-100 text-yellow-800">Confiance: 72%</Badge>
                      <Badge variant="outline">Range: $42k-$45k</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">ETH - Surveiller</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Tendance haussière confirmée. Volume en hausse. 
                      Recommandation: Acheter sur breakout.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-blue-100 text-blue-800">Confiance: 78%</Badge>
                      <Badge variant="outline">Target: $2800</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <DavyTradingChat />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyses Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Les analyses techniques détaillées seront affichées ici.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Signaux de Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Les signaux de trading en temps réel seront affichés ici.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 