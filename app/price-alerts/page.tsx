'use client';

import React, { useState, useEffect } from 'react';
import PriceAlerts from '@/components/trading/PriceAlerts';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

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

export default function PriceAlertsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [currentPrices, setCurrentPrices] = useState<{ [symbol: string]: number }>({});
  const [loading, setLoading] = useState(true);

  // Redirection si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, router]);

  // Charger les alertes depuis le localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedAlerts = localStorage.getItem(`alerts_${user.id}`);
      if (savedAlerts) {
        const parsedAlerts = JSON.parse(savedAlerts).map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt),
          triggeredAt: alert.triggeredAt ? new Date(alert.triggeredAt) : undefined
        }));
        setAlerts(parsedAlerts);
      }
    }
    setLoading(false);
  }, [isAuthenticated, user]);

  // Sauvegarder les alertes
  const saveAlerts = (newAlerts: PriceAlert[]) => {
    if (user) {
      localStorage.setItem(`alerts_${user.id}`, JSON.stringify(newAlerts));
    }
  };

  // Récupérer les prix en temps réel
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const symbols = [...new Set(alerts.map(alert => alert.symbol))];
        if (symbols.length === 0) return;

        const response = await fetch(`/api/trading/real-data?symbols=${symbols.join(',')}`);
        if (response.ok) {
          const data = await response.json();
          const prices: { [symbol: string]: number } = {};
          
          data.forEach((item: any) => {
            if (item.price) {
              prices[item.symbol] = item.price;
            }
          });
          
          setCurrentPrices(prices);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, [alerts]);

  // Ajouter une alerte
  const handleAddAlert = (alertData: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const updatedAlerts = [...alerts, newAlert];
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  };

  // Supprimer une alerte
  const handleDeleteAlert = (id: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  };

  // Activer/Désactiver une alerte
  const handleToggleAlert = (id: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    );
    setAlerts(updatedAlerts);
    saveAlerts(updatedAlerts);
  };

  // Vérifier les alertes déclenchées
  useEffect(() => {
    const checkTriggeredAlerts = () => {
      let hasChanges = false;
      const updatedAlerts = alerts.map(alert => {
        if (!alert.isActive || alert.triggered) return alert;

        const currentPrice = currentPrices[alert.symbol];
        if (!currentPrice) return alert;

        let shouldTrigger = false;
        if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
          shouldTrigger = true;
        } else if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
          shouldTrigger = true;
        }

        if (shouldTrigger) {
          hasChanges = true;
          // Notification browser
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Alerte Prix - ${alert.symbol}`, {
              body: `${alert.symbol} a atteint ${alert.condition === 'above' ? 'au-dessus' : 'en-dessous'} de $${alert.targetPrice} (Prix actuel: $${currentPrice.toFixed(2)})`,
              icon: '/favicon.ico'
            });
          }
          
          return {
            ...alert,
            triggered: true,
            triggeredAt: new Date()
          };
        }
        return alert;
      });

      if (hasChanges) {
        setAlerts(updatedAlerts);
        saveAlerts(updatedAlerts);
      }
    };

    checkTriggeredAlerts();
  }, [currentPrices, alerts]);

  // Demander la permission pour les notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirection...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des alertes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Alertes de Prix
          </h1>
          <p className="text-gray-600">
            Surveillez vos actifs favoris et recevez des notifications en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section principale des alertes */}
          <div className="lg:col-span-2">
            <PriceAlerts
              currentPrices={currentPrices}
              onAddAlert={handleAddAlert}
              onDeleteAlert={handleDeleteAlert}
              onToggleAlert={handleToggleAlert}
              alerts={alerts}
            />
          </div>

          {/* Sidebar avec statistiques */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total d'alertes</span>
                  <span className="font-semibold">{alerts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alertes actives</span>
                  <span className="font-semibold text-blue-600">
                    {alerts.filter(a => a.isActive).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alertes déclenchées</span>
                  <span className="font-semibold text-green-600">
                    {alerts.filter(a => a.triggered).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Actifs surveillés */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actifs Surveillés</h3>
              <div className="space-y-2">
                {Object.keys(currentPrices).length > 0 ? (
                  Object.entries(currentPrices).map(([symbol, price]) => (
                    <div key={symbol} className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{symbol}</span>
                      <span className="text-green-600 font-semibold">${price.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Aucun actif surveillé</p>
                )}
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Conseils</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Activez les notifications du navigateur pour recevoir les alertes</li>
                <li>• Surveillez plusieurs actifs pour diversifier vos alertes</li>
                <li>• Utilisez des seuils réalistes basés sur l'analyse technique</li>
                <li>• Les alertes se mettent à jour automatiquement toutes les 30 secondes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 