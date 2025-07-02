'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from 'lucide-react';

interface TradingData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  type: 'stock' | 'crypto' | 'forex';
}

interface TradingChartsProps {
  data: TradingData[];
  selectedSymbol?: string;
  onSymbolSelect?: (symbol: string) => void;
}

const COLORS = {
  positive: '#10b981',
  negative: '#ef4444',
  neutral: '#6b7280',
  primary: '#3b82f6',
  secondary: '#8b5cf6'
};

const TradingCharts: React.FC<TradingChartsProps> = ({
  data,
  selectedSymbol,
  onSymbolSelect
}) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar' | 'pie'>('line');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M'>('1D');

  // Générer des données simulées pour les graphiques
  const generateChartData = (symbol: string, days: number = 30) => {
    const basePrice = data.find(d => d.symbol === symbol)?.price || 100;
    const volatility = 0.02;
    
    return Array.from({ length: days }, (_, i) => {
      const randomChange = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + randomChange * i);
      return {
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      };
    });
  };

  const chartData = selectedSymbol ? generateChartData(selectedSymbol) : [];

  const performanceData = data.map(item => ({
    name: item.symbol,
    value: Math.abs(item.changePercent),
    change: item.changePercent,
    color: item.changePercent >= 0 ? COLORS.positive : COLORS.negative
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">Prix: ${payload[0].value}</p>
          {payload[1] && <p className="text-purple-600">Volume: {payload[1].value?.toLocaleString()}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Contrôles */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <TrendingUp size={16} />
            Ligne
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              chartType === 'area' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Activity size={16} />
            Zone
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              chartType === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <BarChart3 size={16} />
            Barres
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              chartType === 'pie' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <DollarSign size={16} />
            Performance
          </button>
        </div>

        <div className="flex gap-2">
          {(['1D', '1W', '1M', '3M'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded ${
                timeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Sélection de symbole */}
      {onSymbolSelect && (
        <div className="flex flex-wrap gap-2">
          {data.map((item) => (
            <button
              key={item.symbol}
              onClick={() => onSymbolSelect(item.symbol)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                selectedSymbol === item.symbol
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.symbol}</span>
                <span className={`text-sm ${
                  item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Graphiques */}
      <div className="bg-white rounded-lg border p-6">
        {selectedSymbol ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span>{selectedSymbol}</span>
              <span className="text-sm text-gray-500">- {timeframe}</span>
            </h3>

            <ResponsiveContainer width="100%" height={400}>
              {(() => {
                if (chartType === 'line') {
                  return (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  );
                }
                if (chartType === 'area') {
                  return (
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={COLORS.primary}
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  );
                }
                if (chartType === 'bar') {
                  return (
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="volume" fill={COLORS.secondary} />
                    </BarChart>
                  );
                }
                if (chartType === 'pie') {
                  return (
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  );
                }
                return <></>;
              })()}
            </ResponsiveContainer>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Prix actuel</div>
                <div className="text-xl font-bold">
                  ${data.find(d => d.symbol === selectedSymbol)?.price?.toFixed(2) || '0.00'}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Variation</div>
                                 <div className={`text-xl font-bold ${
                   (data.find(d => d.symbol === selectedSymbol)?.changePercent || 0) >= 0 
                     ? 'text-green-600' : 'text-red-600'
                 }`}>
                   {(data.find(d => d.symbol === selectedSymbol)?.changePercent || 0).toFixed(2)}%
                 </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Volume</div>
                <div className="text-xl font-bold">
                  {chartData[chartData.length - 1]?.volume?.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Tendance</div>
                                 <div className="text-xl font-bold">
                   {(data.find(d => d.symbol === selectedSymbol)?.changePercent || 0) >= 0 ? '📈' : '📉'}
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Sélectionnez un symbole pour voir les graphiques</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingCharts; 