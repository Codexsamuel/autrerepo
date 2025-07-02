'use client';

import React, { useState, useEffect } from 'react';
import TradingCharts from '@/components/trading/TradingCharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, RefreshCw } from 'lucide-react';

interface TradingData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  type: 'stock' | 'crypto' | 'forex';
}

export default function TradingChartsPage() {
  const [data, setData] = useState<TradingData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/trading/real-data?portfolio=true');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      const result = await response.json();
      setData(result.data || []);
      if (result.data && result.data.length > 0 && !selectedSymbol) {
        setSelectedSymbol(result.data[0].symbol);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto h-8 w-8 text-blue-600 mb-4" />
          <p className="text-gray-600">Chargement des données de trading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Graphiques de Trading</h1>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total des actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En hausse</p>
                <p className="text-2xl font-bold text-green-600">
                  {data.filter(item => item.changePercent > 0).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En baisse</p>
                <p className="text-2xl font-bold text-red-600">
                  {data.filter(item => item.changePercent < 0).length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variation moyenne</p>
                <p className={`text-2xl font-bold ${
                  data.reduce((acc, item) => acc + item.changePercent, 0) / data.length >= 0 
                    ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(data.reduce((acc, item) => acc + item.changePercent, 0) / data.length).toFixed(2)}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Analyse technique</h2>
            <p className="text-gray-600 mt-1">
              Visualisez les tendances et performances de vos actifs préférés
            </p>
          </div>
          <div className="p-6">
            <TradingCharts
              data={data}
              selectedSymbol={selectedSymbol}
              onSymbolSelect={handleSymbolSelect}
            />
          </div>
        </div>

        {/* Tableau des données */}
        <div className="mt-8 bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Données détaillées</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbole
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr 
                    key={item.symbol}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedSymbol === item.symbol ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSymbolSelect(item.symbol)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.symbol}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        item.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.type === 'stock' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'crypto' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 