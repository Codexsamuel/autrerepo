'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Clock, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Settings,
  Activity
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  lastExecution: string;
  runs: number;
  successRate: number;
  isRunning: boolean;
}

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkflows = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockWorkflows: Workflow[] = [
        {
          id: '1',
          name: 'Sync CRM vers Supabase',
          description: 'Synchronisation automatique des données CRM vers la base de données',
          status: 'active',
          lastExecution: '2024-06-27 10:00',
          runs: 12,
          successRate: 95,
          isRunning: false
        },
        {
          id: '2',
          name: 'Import produits DL Style',
          description: 'Import automatique des produits depuis les fournisseurs',
          status: 'active',
          lastExecution: '2024-06-26 18:30',
          runs: 8,
          successRate: 87,
          isRunning: false
        },
        {
          id: '3',
          name: 'Alertes sécurité',
          description: 'Système de surveillance et d\'alertes de sécurité',
          status: 'inactive',
          lastExecution: '2024-06-25 14:10',
          runs: 3,
          successRate: 100,
          isRunning: false
        }
      ];
      
      setWorkflows(mockWorkflows);
      setIsLoading(false);
    };

    loadWorkflows();
  }, []);

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, status: wf.status === 'active' ? 'inactive' : 'active' }
        : wf
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'error': return 'Erreur';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl text-gray-700 font-semibold">Chargement des workflows...</h2>
          <p className="text-gray-500">Récupération des processus automatisés</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                <Activity className="w-10 h-10 mr-3" />
                Workflows n8n
              </h1>
              <p className="text-xl">Automatisez vos processus commerciaux avec n8n</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau workflow
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Grille de workflows */}
        <div className="space-y-4">
          {workflows.map(workflow => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}></div>
                    <span className="text-sm text-gray-600">{getStatusText(workflow.status)}</span>
                    <Badge variant="outline" className="text-xs">
                      {workflow.runs} exécutions
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Dernière exécution</p>
                    <p className="text-sm font-medium">{workflow.lastExecution}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{workflow.name}</h3>
                  <p className="text-gray-600 text-sm">{workflow.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Taux de succès</p>
                      <p className="text-lg font-bold text-green-600">{workflow.successRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Exécutions</p>
                      <p className="text-lg font-bold text-blue-600">{workflow.runs}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWorkflow(workflow.id)}
                      className={workflow.status === 'active' ? 'text-green-600 border-green-300' : 'text-gray-600 border-gray-300'}
                    >
                      {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600">Workflows actifs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">94%</h3>
              <p className="text-gray-600">Taux de succès global</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">23</h3>
              <p className="text-gray-600">Total exécutions</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Création */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <div className="text-center">
            <Activity className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Créez votre premier workflow</h2>
            <p className="text-xl text-gray-600 mb-6">
              Automatisez vos processus commerciaux avec n8n et boostez votre productivité
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Commencer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 