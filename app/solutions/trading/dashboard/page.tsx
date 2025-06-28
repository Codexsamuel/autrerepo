'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Users, 
  Target,
  Plus,
  BarChart3,
  Settings,
  Zap
} from 'lucide-react';

interface TradingStats {
  totalPortfolio: number;
  dailyPnL: number;
  totalTrades: number;
  winRate: number;
  activePositions: number;
  monthlyReturn: number;
}

interface RecentTrade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export default function TradingDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<TradingStats>({
    totalPortfolio: 0,
    dailyPnL: 0,
    totalTrades: 0,
    winRate: 0,
    activePositions: 0,
    monthlyReturn: 0
  });
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simuler les données pour l'exemple
      setStats({
        totalPortfolio: 125000,
        dailyPnL: 2450,
        totalTrades: 156,
        winRate: 68.5,
        activePositions: 8,
        monthlyReturn: 12.3
      });

      setRecentTrades([
        {
          id: '1',
          symbol: 'AAPL',
          type: 'buy',
          amount: 100,
          price: 150.25,
          timestamp: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          symbol: 'TSLA',
          type: 'sell',
          amount: 50,
          price: 245.80,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'completed'
        }
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement du dashboard...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Trading</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble de vos activités de trading</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.push('/solutions/trading/positions')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Positions
          </Button>
          <Button onClick={() => router.push('/solutions/trading/execute')}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau trade
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portefeuille Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalPortfolio)}</div>
            <p className="text-xs text-muted-foreground">
              +{formatPercentage(stats.monthlyReturn)} ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P&L Journalier</CardTitle>
            {stats.dailyPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.dailyPnL >= 0 ? '+' : ''}{formatCurrency(stats.dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.dailyPnL >= 0 ? 'Gain' : 'Perte'} aujourd'hui
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(stats.winRate)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalTrades} trades au total
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
              Positions ouvertes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trades du Jour</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 depuis hier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Tradé</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(45000)}</div>
            <p className="text-xs text-muted-foreground">
              Volume 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trades récents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Trades Récents</span>
              <Button variant="ghost" size="sm" onClick={() => router.push('/solutions/trading/history')}>
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade: any) => (
                <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium">{trade.symbol}</p>
                      <p className="text-sm text-gray-500">
                        {trade.type === 'buy' ? 'Achat' : 'Vente'} • {trade.amount} actions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(trade.price)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(trade.timestamp).toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => router.push('/solutions/trading/execute')}
              >
                <Zap className="h-6 w-6 mb-2" />
                <span>Nouveau Trade</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => router.push('/solutions/trading/positions')}
              >
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>Mes Positions</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => router.push('/solutions/trading/signals')}
              >
                <Target className="h-6 w-6 mb-2" />
                <span>Signaux</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => router.push('/solutions/trading/settings')}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span>Paramètres</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 