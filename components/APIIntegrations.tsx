'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { 
  Globe, 
  Key, 
  Settings, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Zap,
  Database,
  Mail,
  CreditCard,
  MessageSquare,
  Calendar,
  FileText,
  Shield,
  Activity,
  Clock,
  TrendingUp,
  Brain
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  status: 'active' | 'inactive' | 'error' | 'testing';
  responseTime?: number;
  lastTested?: Date;
  successRate?: number;
  headers?: { [key: string]: string };
  parameters?: { [key: string]: any };
  authentication?: {
    type: 'none' | 'api_key' | 'bearer' | 'oauth2' | 'basic';
    credentials?: { [key: string]: string };
  };
}

interface Integration {
  id: string;
  name: string;
  service: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error' | 'configuring';
  icon: React.ComponentType<any>;
  color: string;
  apiKey?: string;
  webhookUrl?: string;
  lastSync?: Date;
  syncInterval?: number;
  enabled: boolean;
  metadata?: {
    [key: string]: any;
  };
}

interface APITest {
  id: string;
  endpointId: string;
  timestamp: Date;
  status: 'success' | 'error' | 'timeout';
  responseTime: number;
  statusCode?: number;
  response?: any;
  error?: string;
}

// Type local pour l'état newEndpoint
interface NewEndpointState extends Omit<APIEndpoint, 'id' | 'status'> {
  status: 'inactive';
  authentication: {
    type: 'none' | 'api_key' | 'bearer' | 'oauth2' | 'basic';
    credentials?: { [key: string]: string };
  };
}

export default function APIIntegrations() {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [tests, setTests] = useState<APITest[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [isCreatingEndpoint, setIsCreatingEndpoint] = useState(false);
  const [isCreatingIntegration, setIsCreatingIntegration] = useState(false);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const [newEndpoint, setNewEndpoint] = useState<NewEndpointState>({
    name: '',
    url: '',
    method: 'GET',
    description: '',
    status: 'inactive',
    authentication: { type: 'none' }
  });

  const [newIntegration, setNewIntegration] = useState<Partial<Integration>>({
    name: '',
    service: '',
    description: '',
    status: 'configuring',
    enabled: false
  });

  const availableServices = [
    { 
      name: 'OpenAI', 
      icon: Brain, 
      color: 'text-green-600',
      description: 'Intelligence artificielle et traitement du langage naturel'
    },
    { 
      name: 'Stripe', 
      icon: CreditCard, 
      color: 'text-purple-600',
      description: 'Paiements en ligne et gestion des abonnements'
    },
    { 
      name: 'Supabase', 
      icon: Database, 
      color: 'text-blue-600',
      description: 'Base de données et authentification'
    },
    { 
      name: 'Clerk', 
      icon: Shield, 
      color: 'text-indigo-600',
      description: 'Authentification et gestion des utilisateurs'
    },
    { 
      name: 'ElevenLabs', 
      icon: MessageSquare, 
      color: 'text-orange-600',
      description: 'Synthèse vocale et reconnaissance audio'
    },
    { 
      name: 'SendGrid', 
      icon: Mail, 
      color: 'text-red-600',
      description: 'Envoi d\'emails et notifications'
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Simuler le chargement des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Endpoints d'exemple
    const sampleEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'Génération de contenu IA',
        url: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        description: 'Génère du contenu avec GPT-4',
        status: 'active',
        responseTime: 1200,
        lastTested: new Date(Date.now() - 30 * 60 * 1000),
        successRate: 98.5,
        authentication: {
          type: 'bearer',
          credentials: { token: 'sk-...' }
        }
      },
      {
        id: '2',
        name: 'Paiement Stripe',
        url: 'https://api.stripe.com/v1/payment_intents',
        method: 'POST',
        description: 'Traite les paiements via Stripe',
        status: 'active',
        responseTime: 450,
        lastTested: new Date(Date.now() - 15 * 60 * 1000),
        successRate: 99.2,
        authentication: {
          type: 'api_key',
          credentials: { key: 'sk_test_...' }
        }
      },
      {
        id: '3',
        name: 'Synthèse vocale',
        url: 'https://api.elevenlabs.io/v1/text-to-speech',
        method: 'POST',
        description: 'Convertit le texte en audio',
        status: 'testing',
        responseTime: 2100,
        lastTested: new Date(Date.now() - 5 * 60 * 1000),
        successRate: 95.8,
        authentication: {
          type: 'api_key',
          credentials: { key: 'xi-api-key-...' }
        }
      }
    ];

    // Intégrations d'exemple
    const sampleIntegrations: Integration[] = [
      {
        id: '1',
        name: 'OpenAI GPT-4',
        service: 'OpenAI',
        description: 'Intégration pour la génération de contenu IA',
        status: 'connected',
        icon: Brain,
        color: 'text-green-600',
        apiKey: 'sk-...',
        lastSync: new Date(Date.now() - 10 * 60 * 1000),
        syncInterval: 300,
        enabled: true
      },
      {
        id: '2',
        name: 'Stripe Payments',
        service: 'Stripe',
        description: 'Gestion des paiements en ligne',
        status: 'connected',
        icon: CreditCard,
        color: 'text-purple-600',
        apiKey: 'sk_test_...',
        lastSync: new Date(Date.now() - 5 * 60 * 1000),
        syncInterval: 60,
        enabled: true
      },
      {
        id: '3',
        name: 'Supabase Database',
        service: 'Supabase',
        description: 'Base de données et authentification',
        status: 'configuring',
        icon: Database,
        color: 'text-blue-600',
        enabled: false
      }
    ];

    setEndpoints(sampleEndpoints);
    setIntegrations(sampleIntegrations);
    setIsLoading(false);
  };

  const createEndpoint = () => {
    if (!newEndpoint.name || !newEndpoint.url) return;

    const endpoint: APIEndpoint = {
      id: `endpoint_${Date.now()}`,
      name: newEndpoint.name,
      url: newEndpoint.url,
      method: newEndpoint.method,
      description: newEndpoint.description,
      status: 'inactive',
      authentication: newEndpoint.authentication
    };

    setEndpoints(prev => [endpoint, ...prev]);
    setNewEndpoint({
      name: '',
      url: '',
      method: 'GET',
      description: '',
      status: 'inactive',
      authentication: { type: 'none' }
    });
    setIsCreatingEndpoint(false);
  };

  const createIntegration = () => {
    if (!newIntegration.name || !newIntegration.service) return;

    const service = availableServices.find(s => s.name === newIntegration.service);
    if (!service) return;

    const integration: Integration = {
      id: `integration_${Date.now()}`,
      name: newIntegration.name!,
      service: newIntegration.service!,
      description: newIntegration.description || '',
      status: 'configuring',
      icon: service.icon,
      color: service.color,
      enabled: false
    };

    setIntegrations(prev => [integration, ...prev]);
    setNewIntegration({
      name: '',
      service: '',
      description: '',
      status: 'configuring',
      enabled: false
    });
    setIsCreatingIntegration(false);
  };

  const testEndpoint = async (endpoint: APIEndpoint) => {
    setIsLoading(true);
    
    // Simuler un test d'API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const test: APITest = {
      id: `test_${Date.now()}`,
      endpointId: endpoint.id,
      timestamp: new Date(),
      status: Math.random() > 0.1 ? 'success' : 'error',
      responseTime: Math.floor(Math.random() * 2000) + 200,
      statusCode: Math.random() > 0.1 ? 200 : 500,
      response: Math.random() > 0.1 ? { success: true } : null,
      error: Math.random() > 0.1 ? undefined : 'Connection timeout'
    };

    setTests(prev => [test, ...prev]);
    
    // Mettre à jour l'endpoint
    setEndpoints(prev => prev.map(ep => 
      ep.id === endpoint.id 
        ? { 
            ...ep, 
            status: test.status === 'success' ? 'active' : 'error',
            responseTime: test.responseTime,
            lastTested: test.timestamp,
            successRate: test.status === 'success' ? (ep.successRate || 0) + 1 : (ep.successRate || 0)
          }
        : ep
    ));
    
    setIsLoading(false);
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled, status: !integration.enabled ? 'connected' : 'disconnected' }
        : integration
    ));
  };

  const deleteEndpoint = (id: string) => {
    setEndpoints(prev => prev.filter(endpoint => endpoint.id !== id));
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(prev => prev.filter(integration => integration.id !== id));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // Afficher une notification
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'testing':
      case 'configuring':
        return AlertTriangle;
      case 'inactive':
      case 'disconnected':
        return Clock;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'testing':
      case 'configuring':
        return 'text-yellow-600';
      case 'inactive':
      case 'disconnected':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API & Intégrations</h2>
          <p className="text-gray-600">Gérez vos endpoints et intégrations externes</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreatingEndpoint(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvel endpoint
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreatingIntegration(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle intégration
          </motion.button>
        </div>
      </div>

      {/* Create Endpoint Modal */}
      <AnimatePresence>
        {isCreatingEndpoint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-xl shadow-lg border"
          >
            <h3 className="text-lg font-semibold mb-4">Créer un nouvel endpoint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'endpoint
                </label>
                <input
                  type="text"
                  value={newEndpoint.name}
                  onChange={(e) => setNewEndpoint(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Génération de contenu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={newEndpoint.url}
                  onChange={(e) => setNewEndpoint(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://api.example.com/endpoint"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Méthode HTTP
                </label>
                <select
                  value={newEndpoint.method}
                  onChange={(e) => setNewEndpoint(prev => ({ ...prev, method: e.target.value as APIEndpoint['method'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'authentification
                </label>
                <select
                  value={newEndpoint.authentication.type}
                  onChange={(e) => setNewEndpoint(prev => ({ 
                    ...prev, 
                    authentication: {
                      ...prev.authentication,
                      type: e.target.value as 'none' | 'api_key' | 'bearer' | 'oauth2' | 'basic'
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">Aucune</option>
                  <option value="api_key">Clé API</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="oauth2">OAuth 2.0</option>
                  <option value="basic">Basic Auth</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newEndpoint.description}
                onChange={(e) => setNewEndpoint(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Description de l'endpoint..."
              />
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createEndpoint}
                disabled={!newEndpoint.name || !newEndpoint.url}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Créer l'endpoint
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreatingEndpoint(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Integration Modal */}
      <AnimatePresence>
        {isCreatingIntegration && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-xl shadow-lg border"
          >
            <h3 className="text-lg font-semibold mb-4">Créer une nouvelle intégration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'intégration
                </label>
                <input
                  type="text"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: OpenAI GPT-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select
                  value={newIntegration.service}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un service</option>
                  {availableServices.map(service => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newIntegration.description}
                onChange={(e) => setNewIntegration(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Description de l'intégration..."
              />
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createIntegration}
                disabled={!newIntegration.name || !newIntegration.service}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Créer l'intégration
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreatingIntegration(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Endpoints Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Endpoints API</h3>
            <p className="text-sm text-gray-600">Gérez vos points d'accès API</p>
          </div>
          <Globe className="w-6 h-6 text-blue-600" />
        </div>

        <div className="space-y-4">
          {endpoints.map((endpoint) => {
            const StatusIcon = getStatusIcon(endpoint.status);
            
            return (
              <motion.div
                key={endpoint.id}
                whileHover={{ y: -2 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    endpoint.status === 'active' ? 'bg-green-100' : 
                    endpoint.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <StatusIcon className={`w-5 h-5 ${getStatusColor(endpoint.status)}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{endpoint.name}</h4>
                    <p className="text-sm text-gray-600">{endpoint.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="font-mono">{endpoint.method} {endpoint.url}</span>
                      {endpoint.responseTime && (
                        <span>{endpoint.responseTime}ms</span>
                      )}
                      {endpoint.successRate && (
                        <span>{endpoint.successRate}% de succès</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => testEndpoint(endpoint)}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <TestTube className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteEndpoint(endpoint.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Intégrations</h3>
            <p className="text-sm text-gray-600">Services externes connectés</p>
          </div>
          <Zap className="w-6 h-6 text-green-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => {
            const StatusIcon = getStatusIcon(integration.status);
            const ServiceIcon = integration.icon;
            
            return (
              <motion.div
                key={integration.id}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <ServiceIcon className={`w-5 h-5 ${integration.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(integration.status)}`} />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={integration.enabled}
                        onChange={() => toggleIntegration(integration.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                
                {integration.apiKey && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Clé API:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs">
                        {showApiKey[integration.id] ? integration.apiKey : '••••••••••••••••'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowApiKey(prev => ({ ...prev, [integration.id]: !prev[integration.id] }))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showApiKey[integration.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyApiKey(integration.apiKey!)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {integration.lastSync ? integration.lastSync.toLocaleTimeString() : 'Jamais'}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteIntegration(integration.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Test Results */}
      {tests.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Résultats des tests</h3>
              <p className="text-sm text-gray-600">Historique des tests d'API</p>
            </div>
            <Activity className="w-6 h-6 text-purple-600" />
          </div>

          <div className="space-y-3">
            {tests.slice(0, 5).map((test) => {
              const endpoint = endpoints.find(ep => ep.id === test.endpointId);
              const StatusIcon = getStatusIcon(test.status);
              
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(test.status)}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {endpoint?.name || 'Endpoint inconnu'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {test.timestamp.toLocaleTimeString()} - {test.responseTime}ms
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      test.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {test.statusCode || test.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 