'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Link, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Plus,
  Settings,
  Activity,
  Users,
  TrendingUp
} from 'lucide-react';

interface CRMIntegration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  contacts: number;
  deals: number;
  revenue: number;
  health: number;
  isActive: boolean;
}

export default function CRMIntegrations() {
  const [integrations, setIntegrations] = useState<CRMIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadIntegrations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const mockIntegrations: CRMIntegration[] = [
        {
          id: '1',
          name: 'Salesforce',
          type: 'CRM Principal',
          status: 'connected',
          lastSync: '2 min',
          contacts: 12847,
          deals: 2341,
          revenue: 4200000,
          health: 95,
          isActive: true
        },
        {
          id: '2',
          name: 'HubSpot',
          type: 'Marketing Automation',
          status: 'connected',
          lastSync: '5 min',
          contacts: 8923,
          deals: 1567,
          revenue: 2800000,
          health: 88,
          isActive: true
        },
        {
          id: '3',
          name: 'Pipedrive',
          type: 'Sales CRM',
          status: 'connected',
          lastSync: '1 min',
          contacts: 5234,
          deals: 987,
          revenue: 1900000,
          health: 92,
          isActive: true
        },
        {
          id: '4',
          name: 'Freshworks CRM',
          type: 'CRM Moderne',
          status: 'disconnected',
          lastSync: '2h',
          contacts: 2345,
          deals: 432,
          revenue: 800000,
          health: 45,
          isActive: false
        }
      ];
      
      setIntegrations(mockIntegrations);
      setIsLoading(false);
    };

    loadIntegrations();
  }, []);

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId 
        ? { ...int, isActive: !int.isActive, status: int.isActive ? 'disconnected' : 'connected' }
        : int
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connecté';
      case 'disconnected': return 'Déconnecté';
      case 'error': return 'Erreur';
      default: return status;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement des intégrations...</h2>
          <p className="text-gray-500">Récupération des connexions CRM</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                <Link className="w-10 h-10 mr-3" />
                Intégrations CRM
              </h1>
              <p className="text-xl">Gérez vos intégrations CRM et automatisez vos processus commerciaux</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle intégration
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Grille d'intégrations */}
        <div className="space-y-4">
          {integrations.map(integration => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(integration.status)}`}></div>
                    <span className="text-sm text-gray-600">{getStatusText(integration.status)}</span>
                    <Badge variant="outline" className="text-xs">
                      {integration.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Dernière sync</p>
                    <p className="text-sm font-medium">{integration.lastSync}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Contacts</p>
                      <p className="text-lg font-bold text-blue-600">{integration.contacts.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Deals</p>
                      <p className="text-lg font-bold text-green-600">{integration.deals.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Revenus</p>
                      <p className="text-lg font-bold text-purple-600">€{(integration.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Santé de l'intégration:</span>
                    <span className={`font-semibold ${getHealthColor(integration.health)}`}>
                      {integration.health}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                      className={integration.isActive ? 'text-green-600 border-green-300' : 'text-gray-600 border-gray-300'}
                    >
                      {integration.isActive ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Statistiques */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">29,349</h3>
              <p className="text-gray-600">Contacts totaux</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">5,327</h3>
              <p className="text-gray-600">Deals actifs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">€9.7M</h3>
              <p className="text-gray-600">Revenus totaux</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Link className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">4/6</h3>
              <p className="text-gray-600">Intégrations actives</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Support */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 border border-indigo-200">
          <div className="text-center">
            <Link className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'aide pour vos intégrations ?</h2>
            <p className="text-xl text-gray-600 mb-6">
              Nos experts en intégration CRM sont là pour vous accompagner
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Configurer une intégration
              </Button>
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Voir la documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 