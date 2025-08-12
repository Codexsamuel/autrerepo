"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Database,
  Zap,
  Crown,
  Star,
  FileText,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Brain,
  Sparkles,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  Map,
  Filter,
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Archive,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Map as MapIcon,
  Table,
  Grid,
  List,
  Calendar,
  Target,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  X,
  HardDrive,
  Database as DatabaseIcon,
  Shield,
  Key,
  Fingerprint,
  UserCheck,
  UserX,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin,
  Tag,
  Hash,
  Hash as HashIcon,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'stream';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: Date;
  recordCount: number;
  size: string;
  schema: string[];
  refreshRate: string;
  health: number;
}

interface MLModel {
  id: string;
  name: string;
  type: 'forecasting' | 'classification' | 'regression' | 'clustering';
  status: 'training' | 'ready' | 'deployed' | 'error';
  accuracy: number;
  lastTrained: Date;
  performance: {
    mape: number;
    rmse: number;
    f1Score: number;
  };
  features: string[];
  algorithm: string;
}

interface DataInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: 'trend' | 'anomaly' | 'correlation' | 'prediction' | 'segmentation';
  timestamp: Date;
  dataPoints: number;
  visualization: 'chart' | 'table' | 'map' | 'dashboard';
  tags: string[];
  source: string;
}

interface DataMetrics {
  totalRecords: number;
  processedRecords: number;
  accuracy: number;
  processingSpeed: number;
  storageUsed: string;
  activeConnections: number;
  dailyQueries: number;
  errorRate: number;
  dataQuality: number;
  mlAccuracy: number;
}

export default function InsightAgentPremium() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [mlModels, setMlModels] = useState<MLModel[]>([]);
  const [insights, setInsights] = useState<DataInsight[]>([]);
  const [metrics, setMetrics] = useState<DataMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setMetrics({
        totalRecords: 15478923,
        processedRecords: 12345678,
        accuracy: 98.7,
        processingSpeed: 15420,
        storageUsed: '2.4 TB',
        activeConnections: 47,
        dailyQueries: 89234,
        errorRate: 0.3,
        dataQuality: 96.2,
        mlAccuracy: 94.8
      });

      setDataSources([
        {
          id: '1',
          name: 'Base de données clients',
          type: 'database',
          status: 'connected',
          lastSync: new Date(Date.now() - 1000 * 60 * 15),
          recordCount: 1250000,
          size: '450 GB',
          schema: ['id', 'nom', 'email', 'telephone', 'adresse', 'historique_achats'],
          refreshRate: '5 min',
          health: 95
        },
        {
          id: '2',
          name: 'API ventes externes',
          type: 'api',
          status: 'syncing',
          lastSync: new Date(Date.now() - 1000 * 60 * 2),
          recordCount: 890000,
          size: '120 GB',
          schema: ['transaction_id', 'montant', 'date', 'produit', 'categorie'],
          refreshRate: '1 min',
          health: 87
        }
      ]);

      setMlModels([
        {
          id: '1',
          name: 'Modèle de prévision des ventes',
          type: 'forecasting',
          status: 'deployed',
          accuracy: 94.2,
          lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24),
          performance: {
            mape: 5.8,
            rmse: 1250,
            f1Score: 0.92
          },
          features: ['prix', 'saison', 'promotion', 'concurrence'],
          algorithm: 'XGBoost + LSTM'
        },
        {
          id: '2',
          name: 'Détection d\'anomalies',
          type: 'classification',
          status: 'ready',
          accuracy: 89.7,
          lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 48),
          performance: {
            mape: 0,
            rmse: 0,
            f1Score: 0.89
          },
          features: ['volume', 'fréquence', 'pattern', 'timestamp'],
          algorithm: 'Isolation Forest'
        }
      ]);

      setInsights([
        {
          id: '1',
          title: 'Pic de ventes le vendredi soir',
          description: 'Les ventes augmentent de 34% entre 18h et 21h le vendredi',
          confidence: 96.8,
          impact: 'high',
          category: 'trend',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          dataPoints: 1250,
          visualization: 'chart',
          tags: ['ventes', 'temporal', 'loisirs'],
          source: 'ml_model_1'
        },
        {
          id: '2',
          title: 'Corrélation forte entre âge et catégorie',
          description: 'Les clients de 25-35 ans préfèrent les produits technologiques',
          confidence: 89.3,
          impact: 'medium',
          category: 'correlation',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          dataPoints: 8900,
          visualization: 'chart',
          tags: ['demographie', 'preferences', 'segmentation'],
          source: 'ml_model_2'
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'deployed':
      case 'ready': return 'bg-green-500';
      case 'syncing':
      case 'training': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connecté';
      case 'disconnected': return 'Déconnecté';
      case 'error': return 'Erreur';
      case 'syncing': return 'Synchronisation';
      case 'training': return 'Entraînement';
      case 'ready': return 'Prêt';
      case 'deployed': return 'Déployé';
      default: return status;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-500 text-red-300';
      case 'medium': return 'border-yellow-500 text-yellow-300';
      case 'low': return 'border-green-500 text-green-300';
      default: return 'border-gray-500 text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Chargement de l'Agent d'Analyse Premium...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm border-b border-slate-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Nova Insight</h1>
                <p className="text-slate-200 text-lg">ELT local, ML & Prévisions intelligentes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-slate-500 text-slate-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-gray-500 text-gray-300">
                <Brain className="w-4 h-4 mr-1" />
                ML Local
              </Badge>
              <Badge variant="outline" className="border-zinc-500 text-zinc-300">
                <Database className="w-4 h-4 mr-1" />
                ELT Offline
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-600/20 to-slate-800/20 border-slate-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 text-sm font-medium">Total Enregistrements</p>
                  <p className="text-3xl font-bold text-white">{(metrics?.totalRecords || 0) / 1000000}M</p>
                  <p className="text-slate-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +8.7%
                  </p>
                </div>
                <div className="p-3 bg-slate-500/20 rounded-xl">
                  <Database className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-600/20 to-gray-800/20 border-gray-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 text-sm font-medium">Qualité des Données</p>
                  <p className="text-3xl font-bold text-white">{metrics?.dataQuality}%</p>
                  <p className="text-gray-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +2.1%
                  </p>
                </div>
                <div className="p-3 bg-gray-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-600/20 to-zinc-800/20 border-zinc-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-200 text-sm font-medium">Précision ML</p>
                  <p className="text-3xl font-bold text-white">{metrics?.mlAccuracy}%</p>
                  <p className="text-zinc-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +5.3%
                  </p>
                </div>
                <div className="p-3 bg-zinc-500/20 rounded-xl">
                  <Brain className="w-8 h-8 text-zinc-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-600/20 to-neutral-800/20 border-neutral-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-200 text-sm font-medium">Stockage Utilisé</p>
                  <p className="text-3xl font-bold text-white">{metrics?.storageUsed}</p>
                  <p className="text-neutral-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +12.4%
                  </p>
                </div>
                <div className="p-3 bg-neutral-500/20 rounded-xl">
                  <HardDrive className="w-8 h-8 text-neutral-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-500/20 data-[state=active]:text-slate-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-gray-500/20 data-[state=active]:text-gray-300">
              <Database className="w-4 h-4 mr-2" />
              Sources
            </TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-zinc-500/20 data-[state=active]:text-zinc-300">
              <Brain className="w-4 h-4 mr-2" />
              ML Models
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-neutral-500/20 data-[state=active]:text-neutral-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Vue d'ensemble */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Vue d'Ensemble
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Données traitées</span>
                      <span className="text-white font-semibold">{(metrics?.processedRecords || 0) / 1000000}M</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Modèles ML actifs</span>
                      <span className="text-white font-semibold">{mlModels.filter(m => m.status === 'deployed').length}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Sources connectées</span>
                      <span className="text-white font-semibold">{dataSources.filter(s => s.status === 'connected').length}</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Performance ML */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Performance ML
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mlModels.slice(0, 3).map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <div>
                          <p className="text-white font-medium text-sm">{model.name}</p>
                          <p className="text-white/60 text-xs">{model.algorithm}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{model.accuracy}%</p>
                          <Badge 
                            className={`${getStatusColor(model.status)} text-white text-xs`}
                          >
                            {getStatusText(model.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertes système */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Alertes Système
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded">
                      <p className="text-green-300 text-sm font-medium">Système stable</p>
                      <p className="text-green-200 text-xs">Toutes les sources sont connectées</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded">
                      <p className="text-yellow-300 text-sm font-medium">Synchronisation en cours</p>
                      <p className="text-yellow-200 text-xs">API ventes - 2 min restantes</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded">
                      <p className="text-blue-300 text-sm font-medium">Nouveau modèle prêt</p>
                      <p className="text-blue-200 text-xs">Détection d'anomalies - Prêt au déploiement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sources de Données */}
          <TabsContent value="sources" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Sources de Données ELT</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Plus className="w-4 h-4 mr-1" />
                      Nouvelle Source
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Synchroniser
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-white/60">Gestion des sources de données avec ELT local et monitoring en temps réel</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source) => (
                    <div key={source.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-white font-semibold">{source.name}</h3>
                          <Badge className={`${getStatusColor(source.status)} text-white`}>
                            {getStatusText(source.status)}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-white/60">
                            {source.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-white/60 text-sm">{source.health}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-white/60 text-sm">Enregistrements</p>
                          <p className="text-white">{(source.recordCount / 1000).toFixed(1)}k</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Taille</p>
                          <p className="text-white">{source.size}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Rafraîchissement</p>
                          <p className="text-white">{source.refreshRate}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Dernière Sync</p>
                          <p className="text-white">{source.lastSync.toLocaleTimeString()}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-white/60 text-sm mb-2">Schéma</p>
                        <div className="flex flex-wrap gap-2">
                          {source.schema.slice(0, 5).map((field, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white/60">
                              {field}
                            </Badge>
                          ))}
                          {source.schema.length > 5 && (
                            <Badge variant="outline" className="border-white/20 text-white/60">
                              +{source.schema.length - 5} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="w-full bg-white/10 rounded-full h-2 mr-4">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${source.health}%` }}
                          ></div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4 mr-1" />
                            Configurer
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Sync
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modèles ML */}
          <TabsContent value="ml" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Modèles Machine Learning</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Plus className="w-4 h-4 mr-1" />
                      Nouveau Modèle
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Play className="w-4 h-4 mr-1" />
                      Entraîner
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-white/60">Modèles ML locaux avec métriques de performance et gestion des versions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mlModels.map((model) => (
                    <div key={model.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-white font-semibold">{model.name}</h3>
                          <Badge className={`${getStatusColor(model.status)} text-white`}>
                            {getStatusText(model.status)}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-white/60">
                            {model.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-lg font-bold">{model.accuracy}%</p>
                          <p className="text-white/60 text-sm">Précision</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-white/60 text-sm">MAPE</p>
                          <p className="text-white">{model.performance.mape}%</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">RMSE</p>
                          <p className="text-white">{model.performance.rmse}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">F1-Score</p>
                          <p className="text-white">{model.performance.f1Score}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-white/60 text-sm mb-2">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {model.features.slice(0, 4).map((feature, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white/60">
                              {feature}
                            </Badge>
                          ))}
                          {model.features.length > 4 && (
                            <Badge variant="outline" className="border-white/20 text-white/60">
                              +{model.features.length - 4} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-white/60 text-sm">
                          Dernier entraînement: {model.lastTrained.toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Play className="w-4 h-4 mr-1" />
                            Tester
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Settings className="w-4 h-4 mr-1" />
                            Configurer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Insights Automatiques</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-1" />
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Actualiser
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-white/60">Insights générés automatiquement par l'IA avec analyse de confiance et impact</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-white font-semibold">{insight.title}</h3>
                          <Badge className={`${getImpactColor(insight.impact)}`}>
                            {insight.impact}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-white/60">
                            {insight.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-lg font-bold">{insight.confidence}%</p>
                          <p className="text-white/60 text-sm">Confiance</p>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-3">{insight.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-white/60 text-sm">Points de données</p>
                          <p className="text-white">{insight.dataPoints.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Visualisation</p>
                          <p className="text-white capitalize">{insight.visualization}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Source</p>
                          <p className="text-white">{insight.source}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Découvert</p>
                          <p className="text-white">{insight.timestamp.toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white/60">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Explorer
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <BarChart className="w-4 h-4 mr-1" />
                            Visualiser
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Share2 className="w-4 h-4 mr-1" />
                            Partager
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 