'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Activity, BarChart3, Clock, DollarSign, Download, Eye, RefreshCw, Target, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  sector: string;
  lastUpdate: string;
  chartData: { time: string; price: number }[];
}

interface Portfolio {
  symbol: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export default function TradingChartsPage() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('watchlist');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mockStocks: StockData[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.43,
        change: 2.15,
        changePercent: 1.24,
        volume: 45678900,
        marketCap: 2750000000000,
        pe: 28.5,
        dividend: 0.92,
        sector: 'Technology',
        lastUpdate: '2 min ago',
        chartData: [
          { time: '09:30', price: 173.20 },
          { time: '10:00', price: 174.10 },
          { time: '10:30', price: 175.80 },
          { time: '11:00', price: 175.43 }
        ]
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.50,
        change: -5.20,
        changePercent: -2.05,
        volume: 23456700,
        marketCap: 789000000000,
        pe: 45.2,
        dividend: 0,
        sector: 'Automotive',
        lastUpdate: '1 min ago',
        chartData: [
          { time: '09:30', price: 253.70 },
          { time: '10:00', price: 251.30 },
          { time: '10:30', price: 249.80 },
          { time: '11:00', price: 248.50 }
        ]
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.85,
        change: 3.45,
        changePercent: 0.92,
        volume: 18923400,
        marketCap: 2810000000000,
        pe: 32.1,
        dividend: 2.72,
        sector: 'Technology',
        lastUpdate: '3 min ago',
        chartData: [
          { time: '09:30', price: 375.40 },
          { time: '10:00', price: 376.80 },
          { time: '10:30', price: 378.20 },
          { time: '11:00', price: 378.85 }
        ]
      }
    ];

    const mockPortfolio: Portfolio[] = [
      {
        symbol: 'AAPL',
        shares: 100,
        avgPrice: 165.20,
        currentPrice: 175.43,
        totalValue: 17543,
        profitLoss: 1023,
        profitLossPercent: 6.19
      },
      {
        symbol: 'TSLA',
        shares: 50,
        avgPrice: 260.80,
        currentPrice: 248.50,
        totalValue: 12425,
        profitLoss: -615,
        profitLossPercent: -4.72
      },
      {
        symbol: 'MSFT',
        shares: 75,
        avgPrice: 350.40,
        currentPrice: 378.85,
        totalValue: 28413.75,
        profitLoss: 2133.75,
        profitLossPercent: 8.12
      }
    ];

    setStocks(mockStocks);
    setPortfolio(mockPortfolio);
  }, []);

  const filteredStocks = stocks.filter(stock => {
    return stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simulation d'appel API Yahoo Finance
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStocks(stocks.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        lastUpdate: 'Maintenant'
      })));
      
      toast({
        title: "Données actualisées",
        description: "Les données de marché ont été mises à jour.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPortfolioValue = portfolio.reduce((acc, item) => acc + item.totalValue, 0);
  const totalProfitLoss = portfolio.reduce((acc, item) => acc + item.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100;

  // Statistiques trading (mock)
  const stats = [
    { label: 'Valeur du portefeuille', value: `$${totalPortfolioValue.toLocaleString()}`, icon: DollarSign },
    { label: 'P&L total', value: `${totalProfitLoss >= 0 ? '+' : ''}$${totalProfitLoss.toLocaleString()}`, icon: TrendingUp },
    { label: 'Actions suivies', value: stocks.length, icon: Eye },
    { label: 'Performance', value: `${totalProfitLossPercent >= 0 ? '+' : ''}${totalProfitLossPercent.toFixed(2)}%`, icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Trading Charts</h1>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Activity className="w-3 h-3 mr-1" />
                Marché ouvert
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Download className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleRefreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Nouveau trade
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres */}
          <div className="lg:col-span-1 space-y-8">
            {/* Secteurs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Secteurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Technology (15)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Finance (8)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Healthcare (12)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Consumer (6)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Watchlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Portefeuille
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Historique
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher une action, entreprise..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="watchlist">Watchlist</option>
                <option value="portfolio">Portefeuille</option>
                <option value="gainers">Gagnants</option>
                <option value="losers">Perdants</option>
              </select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="portfolio">Portefeuille</TabsTrigger>
                <TabsTrigger value="gainers">Gagnants</TabsTrigger>
                <TabsTrigger value="losers">Perdants</TabsTrigger>
              </TabsList>

              <TabsContent value="watchlist" className="space-y-6">
                {filteredStocks.map(stock => (
                  <Card key={stock.symbol} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{stock.symbol[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                            <p className="text-gray-600">{stock.name}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{stock.sector}</span>
                              <span>Volume: {stock.volume.toLocaleString()}</span>
                              <span>P/E: {stock.pe}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{stock.sector}</Badge>
                          <Badge className={stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${stock.price.toFixed(2)}
                          </span>
                          <span className={`text-lg ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Mise à jour {stock.lastUpdate}
                        </div>
                      </div>
                      
                      {/* Mini graphique simulé */}
                      <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-4 py-2">
                        {stock.chartData.map((point, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-500 rounded-sm"
                            style={{
                              width: '8px',
                              height: `${((point.price - Math.min(...stock.chartData.map(p => p.price))) / 
                                (Math.max(...stock.chartData.map(p => p.price)) - Math.min(...stock.chartData.map(p => p.price)))) * 40}px`
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Market Cap: ${(stock.marketCap / 1000000000).toFixed(1)}B</span>
                        <span>Dividend: ${stock.dividend}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Graphique
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Trader
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                {portfolio.map(item => (
                  <Card key={item.symbol} className="border-l-4 border-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{item.symbol[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{item.symbol}</h3>
                            <p className="text-gray-600">{item.shares} actions</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>Prix moyen: ${item.avgPrice.toFixed(2)}</span>
                              <span>Prix actuel: ${item.currentPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Portefeuille</Badge>
                          <Badge className={item.profitLoss >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {item.profitLoss >= 0 ? '+' : ''}{item.profitLossPercent.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${item.totalValue.toLocaleString()}
                          </span>
                          <span className={`text-lg ${item.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.profitLoss >= 0 ? '+' : ''}${item.profitLoss.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Valeur totale</span>
                        <span>P&L</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Performance
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Trader
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="gainers" className="space-y-6">
                {filteredStocks.filter(s => s.change > 0).map(stock => (
                  <Card key={stock.symbol} className="border-l-4 border-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{stock.symbol[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                            <p className="text-gray-600">{stock.name}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{stock.sector}</span>
                              <span>Volume: {stock.volume.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{stock.sector}</Badge>
                          <Badge className="bg-green-100 text-green-800">
                            +{stock.changePercent.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${stock.price.toFixed(2)}
                          </span>
                          <span className="text-lg text-green-600">
                            +{stock.change.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Acheter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="losers" className="space-y-6">
                {filteredStocks.filter(s => s.change < 0).map(stock => (
                  <Card key={stock.symbol} className="border-l-4 border-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{stock.symbol[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                            <p className="text-gray-600">{stock.name}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{stock.sector}</span>
                              <span>Volume: {stock.volume.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{stock.sector}</Badge>
                          <Badge className="bg-red-100 text-red-800">
                            {stock.changePercent.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${stock.price.toFixed(2)}
                          </span>
                          <span className="text-lg text-red-600">
                            {stock.change.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700" size="sm">
                          <TrendingDown className="w-4 h-4 mr-2" />
                          Vendre
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 