'use client';

import { SubscriptionGuard } from '@/components/guards/SubscriptionGuard';
import { useEffect, useState } from 'react';

interface TradingSymbol {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  high: number;
  low: number;
}

interface PortfolioPosition {
  symbol: string;
  quantity: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
  entryPrice: number;
  currentPrice: number;
}

interface Portfolio {
  totalValue: number;
  dailyChange: number;
  totalChange: number;
  changePercentage: number;
  positions: PortfolioPosition[];
  cash: number;
  margin: number;
  leverage: number;
  lastUpdate: string;
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('symbols');
  const [symbols, setSymbols] = useState<TradingSymbol[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  // Données simulées
  const mockSymbols: TradingSymbol[] = [
    { symbol: 'BTC/USD', price: 45000, change: 2.5, volume: 1250000, high: 45200, low: 44800 },
    { symbol: 'ETH/USD', price: 3200, change: -1.2, volume: 890000, high: 3250, low: 3180 },
    { symbol: 'EUR/USD', price: 1.0850, change: 0.3, volume: 2100000, high: 1.0870, low: 1.0830 },
    { symbol: 'GBP/USD', price: 1.2650, change: -0.8, volume: 950000, high: 1.2680, low: 1.2620 },
    { symbol: 'USD/JPY', price: 150.25, change: 0.1, volume: 1800000, high: 150.50, low: 150.00 },
    { symbol: 'XAU/USD', price: 2050, change: 1.8, volume: 450000, high: 2055, low: 2045 },
    { symbol: 'AAPL', price: 185.50, change: 0.8, volume: 850000, high: 186.00, low: 185.00 },
    { symbol: 'TSLA', price: 245.75, change: -2.1, volume: 650000, high: 248.00, low: 244.00 }
  ];

  const mockPortfolio: Portfolio = {
    totalValue: 125000,
    dailyChange: 1250,
    totalChange: 8500,
    changePercentage: 7.3,
    positions: [
      { 
        symbol: 'BTC/USD', 
        quantity: 0.5, 
        value: 22500, 
        pnl: 1250, 
        pnlPercentage: 5.9,
        entryPrice: 42500,
        currentPrice: 45000
      },
      { 
        symbol: 'ETH/USD', 
        quantity: 5, 
        value: 16000, 
        pnl: -800, 
        pnlPercentage: -4.8,
        entryPrice: 3360,
        currentPrice: 3200
      },
      { 
        symbol: 'EUR/USD', 
        quantity: 10000, 
        value: 10850, 
        pnl: 300, 
        pnlPercentage: 2.8,
        entryPrice: 1.0820,
        currentPrice: 1.0850
      },
      { 
        symbol: 'AAPL', 
        quantity: 50, 
        value: 9275, 
        pnl: 425, 
        pnlPercentage: 4.8,
        entryPrice: 177.00,
        currentPrice: 185.50
      }
    ],
    cash: 61375,
    margin: 0,
    leverage: 1.0,
    lastUpdate: new Date().toISOString()
  };

  useEffect(() => {
    setSymbols(mockSymbols);
    setPortfolio(mockPortfolio);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <SubscriptionGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              DL Solutions - Trading Platform Demo
            </h1>
            <p className="text-lg text-gray-600">
              Démonstration des fonctionnalités de trading avec données simulées
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-6">
            <button
              onClick={() => setActiveTab('symbols')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'symbols'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Symboles de Trading
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Portefeuille
            </button>
          </div>

          {/* Symbols Tab */}
          {activeTab === 'symbols' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Symboles de Trading en Temps Réel
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Symbole
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Changement
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Haut
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {symbols.map((symbol) => (
                      <tr key={symbol.symbol} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {symbol.symbol}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                          {formatPrice(symbol.price)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                          symbol.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {symbol.change >= 0 ? '+' : ''}{symbol.change}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                          {formatVolume(symbol.volume)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                          {formatPrice(symbol.high)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                          {formatPrice(symbol.low)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && portfolio && (
            <div className="space-y-6">
              {/* Portfolio Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Résumé du Portefeuille
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-600">Valeur Totale</div>
                    <div className="text-2xl font-bold text-blue-900">
                      ${portfolio.totalValue.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-green-600">Changement Quotidien</div>
                    <div className="text-2xl font-bold text-green-900">
                      +${portfolio.dailyChange.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-purple-600">Changement Total</div>
                    <div className="text-2xl font-bold text-purple-900">
                      +${portfolio.totalChange.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-orange-600">Cash Disponible</div>
                    <div className="text-2xl font-bold text-orange-900">
                      ${portfolio.cash.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Positions */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Positions Ouvertes
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Symbole
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix d'Entrée
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix Actuel
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valeur
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          P&L
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {portfolio.positions.map((position) => (
                        <tr key={position.symbol} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {position.symbol}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                            {position.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                            {formatPrice(position.entryPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                            {formatPrice(position.currentPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                            ${position.value.toLocaleString()}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                            position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {position.pnl >= 0 ? '+' : ''}${position.pnl.toLocaleString()}
                            <br />
                            <span className="text-xs">
                              ({position.pnlPercentage >= 0 ? '+' : ''}{position.pnlPercentage}%)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              À propos de cette démonstration
            </h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Les données affichées sont simulées pour la démonstration</li>
              <li>• Les APIs réelles seront connectées une fois le déploiement terminé</li>
              <li>• Cette interface montre les fonctionnalités de la plateforme de trading</li>
              <li>• Les graphiques en temps réel et l'authentification seront ajoutés prochainement</li>
            </ul>
          </div>
        </div>
      </div>
    </SubscriptionGuard>
  );
} 