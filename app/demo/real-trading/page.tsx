'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, DollarSign, Info, Loader2, RefreshCw, Settings, TrendingDown, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface TradingData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume: number;
  marketCap: number;
  type: 'stock' | 'crypto' | 'forex';
}

interface PortfolioData {
  totalValue: string;
  totalChange: string;
  totalChangePercent: string;
  positions: Array<{
    symbol: string;
    quantity: number;
    price: string;
    value: string;
    change: string;
    changePercent: string;
    type: string;
  }>;
}

interface ApiResponse {
  success: boolean;
  data: TradingData[];
  portfolio?: PortfolioData;
  timestamp: string;
  error?: string;
  cacheInfo?: {
    stocks: number;
    cryptos: number;
    forex: number;
    total: number;
  };
}

export default function RealTradingDemo() {
  const [data, setData] = useState<TradingData[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [selectedSymbols, setSelectedSymbols] = useState<string>('AAPL,TSLA,MSFT,GOOGL,AMZN,NVDA,META,NFLX,bitcoin,ethereum,cardano,solana,EUR/USD,GBP/USD,USD/JPY');
  const [customSymbols, setCustomSymbols] = useState<string>('');
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [cacheInfo, setCacheInfo] = useState<any>(null);

  // Configuration des symboles prédéfinis
  const predefinedSymbols = {
    'Tech Stocks': 'AAPL,TSLA,MSFT,GOOGL,AMZN,NVDA,META,NFLX',
    'Crypto': 'bitcoin,ethereum,cardano,solana,binancecoin,ripple',
    'Forex': 'EUR/USD,GBP/USD,USD/JPY,USD/CHF,AUD/USD,USD/CAD',
    'All': 'AAPL,TSLA,MSFT,GOOGL,AMZN,NVDA,META,NFLX,bitcoin,ethereum,cardano,solana,EUR/USD,GBP/USD,USD/JPY'
  };

  // Fonction optimisée pour récupérer les données
  const fetchData = useCallback(async (symbols: string, includePortfolio: boolean = true) => {
    try {
      setLoading(true);
      setError(null);

      const startTime = Date.now();
      const response = await fetch(`/api/trading/real-data?symbols=${encodeURIComponent(symbols)}&portfolio=${includePortfolio}`);
      const fetchTime = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la récupération des données');
      }

      setData(result.data);
      setPortfolio(result.portfolio || null);
      setLastUpdate(new Date());
      setCacheInfo(result.cacheInfo);

      console.log(`Données récupérées en ${fetchTime}ms`, {
        total: result.data.length,
        cacheInfo: result.cacheInfo,
        timestamp: result.timestamp
      });

    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour nettoyer le cache
  const clearCache = async () => {
    try {
      await fetch('/api/trading/real-data', { method: 'DELETE' });
      console.log('Cache nettoyé');
      // Recharger les données après nettoyage du cache
      await fetchData(selectedSymbols, showPortfolio);
    } catch (err) {
      console.error('Erreur lors du nettoyage du cache:', err);
    }
  };

  // Effet pour le rechargement automatique
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData(selectedSymbols, showPortfolio);
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, selectedSymbols, showPortfolio, fetchData]);

  // Chargement initial
  useEffect(() => {
    fetchData(selectedSymbols, showPortfolio);
  }, [fetchData, selectedSymbols, showPortfolio]);

  // Filtrage des données par type
  const stocks = useMemo(() => data.filter(item => item.type === 'stock'), [data]);
  const cryptos = useMemo(() => data.filter(item => item.type === 'crypto'), [data]);
  const forex = useMemo(() => data.filter(item => item.type === 'forex'), [data]);

  // Calcul des statistiques
  const stats = useMemo(() => {
    if (data.length === 0) return null;

    const totalChange = data.reduce((sum, item) => sum + parseFloat(item.change), 0);
    const avgChangePercent = data.reduce((sum, item) => sum + parseFloat(item.changePercent), 0) / data.length;
    const gainers = data.filter(item => parseFloat(item.change) > 0).length;
    const losers = data.filter(item => parseFloat(item.change) < 0).length;

    return {
      totalChange: totalChange.toFixed(2),
      avgChangePercent: avgChangePercent.toFixed(2),
      gainers,
      losers,
      total: data.length
    };
  }, [data]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPrice = (price: string, type: string) => {
    const num = parseFloat(price);
    if (type === 'forex') return num.toFixed(4);
    if (type === 'crypto' && num < 1) return num.toFixed(6);
    return num.toFixed(2);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading en Temps Réel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Données de marché en direct avec cache intelligent et API gratuites
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={loading ? "secondary" : "default"}>
            {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <BarChart3 className="w-3 h-3 mr-1" />}
            {loading ? 'Chargement...' : `${data.length} actifs`}
          </Badge>
          
          {lastUpdate && (
            <Badge variant="outline">
              Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
            </Badge>
          )}
        </div>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Symboles prédéfinis</label>
              <Select value={selectedSymbols} onValueChange={setSelectedSymbols}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(predefinedSymbols).map(([name, symbols]) => (
                    <SelectItem key={name} value={symbols}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Symboles personnalisés</label>
              <Input
                placeholder="AAPL,TSLA,bitcoin"
                value={customSymbols}
                onChange={(e) => setCustomSymbols(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedSymbols(customSymbols);
                  }
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Intervalle (secondes)</label>
              <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10s</SelectItem>
                  <SelectItem value="30">30s</SelectItem>
                  <SelectItem value="60">1min</SelectItem>
                  <SelectItem value="300">5min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button
                onClick={() => fetchData(selectedSymbols, showPortfolio)}
                disabled={loading}
                className="flex-1"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <Button
                onClick={clearCache}
                variant="outline"
                size="sm"
              >
                Cache
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Actualisation automatique</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPortfolio}
                onChange={(e) => setShowPortfolio(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Afficher le portfolio</span>
            </label>
          </div>

          {cacheInfo && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Cache: {cacheInfo.stocks} actions, {cacheInfo.cryptos} cryptos, {cacheInfo.forex} forex 
                ({cacheInfo.total} total) - Données mises en cache pour optimiser les performances
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Variation totale</p>
                  <p className={`text-2xl font-bold ${parseFloat(stats.totalChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(stats.totalChange) >= 0 ? '+' : ''}{stats.totalChange}
                  </p>
                </div>
                {parseFloat(stats.totalChange) >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-600" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-600" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Moyenne %</p>
                <p className={`text-2xl font-bold ${parseFloat(stats.avgChangePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(stats.avgChangePercent) >= 0 ? '+' : ''}{stats.avgChangePercent}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Gagnants</p>
                <p className="text-2xl font-bold text-green-600">{stats.gainers}</p>
                <p className="text-xs text-gray-500">sur {stats.total}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Perdants</p>
                <p className="text-2xl font-bold text-red-600">{stats.losers}</p>
                <p className="text-xs text-gray-500">sur {stats.total}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Portfolio */}
      {showPortfolio && portfolio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Valeur totale</p>
                <p className="text-2xl font-bold">${portfolio.totalValue}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Variation</p>
                <p className={`text-2xl font-bold ${parseFloat(portfolio.totalChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(portfolio.totalChange) >= 0 ? '+' : ''}${portfolio.totalChange}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Pourcentage</p>
                <p className={`text-2xl font-bold ${parseFloat(portfolio.totalChangePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(portfolio.totalChangePercent) >= 0 ? '+' : ''}{portfolio.totalChangePercent}%
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {portfolio.positions.map((position, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{position.type}</Badge>
                    <div>
                      <p className="font-medium">{position.symbol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {position.quantity} @ ${position.price}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${position.value}</p>
                    <p className={`text-sm ${parseFloat(position.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {parseFloat(position.change) >= 0 ? '+' : ''}${position.change} ({position.changePercent}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Données de trading */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tous ({data.length})</TabsTrigger>
          <TabsTrigger value="stocks">Actions ({stocks.length})</TabsTrigger>
          <TabsTrigger value="crypto">Crypto ({cryptos.length})</TabsTrigger>
          <TabsTrigger value="forex">Forex ({forex.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <TradingCard key={index} item={item} formatNumber={formatNumber} formatPrice={formatPrice} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stocks.map((item, index) => (
              <TradingCard key={index} item={item} formatNumber={formatNumber} formatPrice={formatPrice} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cryptos.map((item, index) => (
              <TradingCard key={index} item={item} formatNumber={formatNumber} formatPrice={formatPrice} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forex" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forex.map((item, index) => (
              <TradingCard key={index} item={item} formatNumber={formatNumber} formatPrice={formatPrice} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Message d'erreur */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Composant de carte de trading
function TradingCard({ 
  item, 
  formatNumber, 
  formatPrice 
}: { 
  item: TradingData; 
  formatNumber: (num: number) => string; 
  formatPrice: (price: string, type: string) => string; 
}) {
  const change = parseFloat(item.change);
  const changePercent = parseFloat(item.changePercent);
  const isPositive = change >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{item.symbol}</CardTitle>
          <Badge variant="outline" className="capitalize">
            {item.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <p className="text-2xl font-bold">${formatPrice(item.price, item.type)}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <p className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Volume:</span>
            <span>{formatNumber(item.volume)}</span>
          </div>
          {item.marketCap > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
              <span>${formatNumber(item.marketCap)}</span>
            </div>
          )}
        </div>

        <Progress 
          value={Math.abs(changePercent)} 
          className={isPositive ? "bg-green-100" : "bg-red-100"}
        />
      </CardContent>
    </Card>
  );
} 