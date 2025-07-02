'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface RealTradingSymbol {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  lastUpdated: string;
}

interface RealPortfolioPosition {
  symbol: string;
  quantity: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  entryPrice: number;
  lastUpdated: string;
}

interface PortfolioSummary {
  totalValue: number;
  totalPnl: number;
  totalPnlPercentage: number;
  positionCount: number;
}

export default function RealTradingDemo() {
  const [symbols, setSymbols] = useState<RealTradingSymbol[]>([]);
  const [portfolio, setPortfolio] = useState<RealPortfolioPosition[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const popularSymbols = [
    'AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX',
    'bitcoin', 'ethereum', 'cardano', 'solana',
    'EUR/USD', 'GBP/USD', 'USD/JPY'
  ];

  const fetchRealData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/trading/real-data?symbols=${popularSymbols.join(',')}&portfolio=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch data');
      }

      setSymbols(result.data.symbols || []);
      setPortfolio(result.data.portfolio || []);
      setPortfolioSummary(result.data.portfolioSummary || null);
      setLastUpdate(new Date());

    } catch (err) {
      console.error('Error fetching real data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData();
    
    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchRealData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Erreur de connexion</h2>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-sm text-red-600 mb-4">
              Assurez-vous que les variables d'environnement suivantes sont configurées :
            </p>
            <ul className="text-sm text-red-600 mb-4 space-y-1">
              <li>• ALPHA_VANTAGE_API_KEY (pour les actions)</li>
              <li>• Les APIs publiques CoinGecko et Exchange Rate sont utilisées pour les cryptos et devises</li>
            </ul>
            <Button onClick={fetchRealData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Trading en Temps Réel</h1>
          <p className="text-gray-600 mt-2">
            Données réelles de marchés financiers - Actions, Cryptomonnaies, Devises
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdate && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
            </div>
          )}
          <Button onClick={fetchRealData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Chargement...' : 'Actualiser'}
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      {portfolioSummary && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Résumé du Portefeuille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Valeur Totale</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolioSummary.totalValue)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">P&L Total</p>
                <p className={`text-2xl font-bold ${getChangeColor(portfolioSummary.totalPnl)}`}>
                  {formatCurrency(portfolioSummary.totalPnl)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">P&L %</p>
                <p className={`text-2xl font-bold ${getChangeColor(portfolioSummary.totalPnlPercentage)}`}>
                  {formatPercentage(portfolioSummary.totalPnlPercentage)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Positions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolioSummary.positionCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="symbols" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="symbols">Marchés</TabsTrigger>
          <TabsTrigger value="portfolio">Portefeuille</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="symbols" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Marchés en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbols.map((symbol) => (
                    <Card key={symbol.symbol} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{symbol.symbol}</h3>
                          <Badge variant={symbol.change >= 0 ? "default" : "destructive"}>
                            {getChangeIcon(symbol.change)}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{formatCurrency(symbol.price)}</p>
                          <p className={`text-sm ${getChangeColor(symbol.change)}`}>
                            {formatCurrency(symbol.change)} ({formatPercentage(symbol.changePercent)})
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>Volume: {formatNumber(symbol.volume)}</p>
                            <p>H: {formatCurrency(symbol.high)} L: {formatCurrency(symbol.low)}</p>
                            <p>Ouverture: {formatCurrency(symbol.open)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Positions du Portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolio.map((position) => (
                    <Card key={position.symbol} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{position.symbol}</h3>
                            <p className="text-sm text-gray-600">
                              {position.quantity} @ {formatCurrency(position.entryPrice)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{formatCurrency(position.value)}</p>
                            <p className={`text-sm ${getChangeColor(position.pnl)}`}>
                              {formatCurrency(position.pnl)} ({formatPercentage(position.pnlPercentage)})
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Prix actuel: {formatCurrency(position.currentPrice)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist Personnalisée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Fonctionnalité de watchlist personnalisée à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Connecté aux APIs: Alpha Vantage (Actions), CoinGecko (Crypto), Exchange Rate (Forex)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 