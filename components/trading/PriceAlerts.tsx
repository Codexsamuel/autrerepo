'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: Date;
  triggered?: boolean;
  triggeredAt?: Date;
}

interface PriceAlertsProps {
  currentPrices: { [symbol: string]: number };
  onAddAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  onDeleteAlert: (id: string) => void;
  onToggleAlert: (id: string) => void;
  alerts: PriceAlert[];
}

export default function PriceAlerts({
  currentPrices,
  onAddAlert,
  onDeleteAlert,
  onToggleAlert,
  alerts
}: PriceAlertsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.symbol || !newAlert.targetPrice) return;

    onAddAlert({
      symbol: newAlert.symbol.toUpperCase(),
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      isActive: true
    });

    setNewAlert({ symbol: '', targetPrice: '', condition: 'above' });
    setShowAddForm(false);
  };

  const checkAlertStatus = (alert: PriceAlert) => {
    const currentPrice = currentPrices[alert.symbol];
    if (!currentPrice) return 'unknown';

    if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
      return 'triggered';
    }
    if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
      return 'triggered';
    }
    return 'active';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'triggered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'triggered':
        return 'Déclenchée';
      case 'active':
        return 'Active';
      default:
        return 'Inconnu';
    }
  };

  const popularSymbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'bitcoin', 'ethereum'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Alertes de Prix</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle Alerte</span>
        </button>
      </div>

      {/* Formulaire d'ajout d'alerte */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symbole
                </label>
                <input
                  type="text"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
                  placeholder="AAPL, TSLA, bitcoin..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="symbols"
                />
                <datalist id="symbols">
                  {popularSymbols.map(symbol => (
                    <option key={symbol} value={symbol} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix Cible
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="number"
                    step="0.01"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                    placeholder="150.00"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="above">Au-dessus de</option>
                  <option value="below">En-dessous de</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter l'alerte</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des alertes */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BellOff className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune alerte configurée</p>
            <p className="text-sm">Ajoutez votre première alerte pour commencer</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const status = checkAlertStatus(alert);
            const currentPrice = currentPrices[alert.symbol];
            const priceChange = currentPrice ? currentPrice - alert.targetPrice : 0;
            const priceChangePercent = currentPrice ? (priceChange / alert.targetPrice) * 100 : 0;

            return (
              <div
                key={alert.id}
                className={`p-4 border rounded-lg transition-all ${
                  status === 'triggered'
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(status)}
                      <span className={`text-sm font-medium ${
                        status === 'triggered' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {getStatusText(status)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{alert.symbol}</span>
                      {alert.condition === 'above' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-gray-600">
                        {alert.condition === 'above' ? '>' : '<'} ${alert.targetPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {currentPrice && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Prix actuel</div>
                        <div className="font-semibold text-gray-900">${currentPrice.toFixed(2)}</div>
                        <div className={`text-xs ${
                          priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleAlert(alert.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          alert.isActive
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={alert.isActive ? 'Désactiver' : 'Activer'}
                      >
                        {alert.isActive ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => onDeleteAlert(alert.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Créée le {alert.createdAt.toLocaleDateString()} à {alert.createdAt.toLocaleTimeString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
} 