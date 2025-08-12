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
  HardDrive
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
}

interface AnalysisJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'queued' | 'paused';
  progress: number;
  startTime: Date;
  endTime?: Date;
  dataSource: string;
  algorithm: string;
  parameters: Record<string, any>;
  results?: any;
  error?: string;
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
}

export default function DataAnalysisAgent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [analysisJobs, setAnalysisJobs] = useState<AnalysisJob[]>([]);
  const [insights, setInsights] = useState<DataInsight[]>([]);
  const [metrics, setMetrics] = useState<DataMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

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
        errorRate: 0.3
      });

      setDataSources([
        {
          id: '1',
          name: 'Base de données clients',
          type: 'database',
          status: 'connected',
          lastSync: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
          recordCount: 1250000,
          size: '450 GB',
          schema: ['id', 'nom', 'email', 'telephone', 'adresse', 'historique_achats'],
          refreshRate: '5 min'
        },
        {
          id: '2',
          name: 'API ventes externes',
          type: 'api',
          status: 'syncing',
          lastSync: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
          recordCount: 890000,
          size: '120 GB',
          schema: ['transaction_id', 'montant', 'date', 'produit', 'categorie'],
          refreshRate: '1 min'
        },
        {
          id: '3',
          name: 'Fichiers logs système',
          type: 'file',
          status: 'connected',
          lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
          recordCount: 5670000,
          size: '890 GB',
          schema: ['timestamp', 'level', 'message', 'user_id', 'action'],
          refreshRate: '30 min'
        }
      ]);

      setAnalysisJobs([
        {
          id: '1',
          name: 'Analyse des tendances de vente',
          status: 'running',
          progress: 67,
          startTime: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
          dataSource: 'Base de données clients',
          algorithm: 'Time Series Analysis',
          parameters: { window: '30d', granularity: '1h', confidence: 0.95 }
        },
        {
          id: '2',
          name: 'Segmentation clientèle',
          status: 'completed',
          progress: 100,
          startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
          endTime: new Date(Date.now() - 1000 * 60 * 60), // 1h ago
          dataSource: 'Base de données clients',
          algorithm: 'K-Means Clustering',
          parameters: { clusters: 5, iterations: 100, tolerance: 0.001 },
          results: { segments: 5, accuracy: 94.2, insights: ['Premium', 'Standard', 'Budget', 'New', 'Inactive'] }
        },
        {
          id: '3',
          name: 'Détection d\'anomalies',
          status: 'queued',
          progress: 0,
          startTime: new Date(),
          dataSource: 'Fichiers logs système',
          algorithm: 'Isolation Forest',
          parameters: { contamination: 0.1, samples: 100, trees: 100 }
        }
      ]);

      setInsights([
        {
          id: '1',
          title: 'Pic de ventes le vendredi soir',
          description: 'Les ventes augmentent de 34% entre 18h et 21h le vendredi, principalement dans la catégorie loisirs.',
          confidence: 96.8,
          impact: 'high',
          category: 'trend',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          dataPoints: 1250,
          visualization: 'chart',
          tags: ['ventes', 'temporal', 'loisirs']
        },
        {
          id: '2',
          title: 'Corrélation forte entre âge et catégorie de produit',
          description: 'Les clients de 25-35 ans préfèrent les produits technologiques, tandis que les 45+ privilégient les services.',
          confidence: 89.3,
          impact: 'medium',
          category: 'correlation',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          dataPoints: 8900,
          visualization: 'chart',
          tags: ['demographie', 'preferences', 'segmentation']
        },
        {
          id: '3',
          title: 'Anomalie détectée dans les logs système',
          description: 'Pic anormal d\'erreurs 404 entre 14h et 15h, possible attaque ou problème de configuration.',
          confidence: 78.5,
          impact: 'high',
          category: 'anomaly',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          dataPoints: 234,
          visualization: 'chart',
          tags: ['securite', 'erreurs', 'systeme']
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
      case 'running': return 'bg-green-500';
      case 'syncing': return 'bg-blue-500';
      case 'queued': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'disconnected':
      case 'failed':
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
      case 'running': return 'En cours';
      case 'completed': return 'Terminé';
      case 'failed': return 'Échoué';
      case 'queued': return 'En attente';
      case 'paused': return 'Pausé';
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
            <p className="text-white text-xl mt-4">Chargement de l'Agent d'Analyse de Données...</p>
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
                <h1 className="text-4xl font-bold text-white">Agent d'Analyse de Données</h1>
                <p className="text-slate-200 text-lg">Intelligence artificielle & Analytics avancés</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-slate-500 text-slate-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-gray-500 text-gray-300">
                <Brain className="w-4 h-4 mr-1" />
                IA Avancée
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
                  <p className="text-3xl font-bold text-white">{metrics?.totalRecords.toLocaleString()}</p>
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
                  <p className="text-gray-200 text-sm font-medium">Précision</p>
                  <p className="text-3xl font-bold text-white">{metrics?.accuracy}%</p>
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
                  <p className="text-zinc-200 text-sm font-medium">Vitesse Traitement</p>
                  <p className="text-3xl font-bold text-white">{metrics?.processingSpeed.toLocaleString()}/s</p>
                  <p className="text-zinc-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +15.3%
                  </p>
                </div>
                <div className="p-3 bg-zinc-500/20 rounded-xl">
                  <Zap className="w-8 h-8 text-zinc-400" />
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

        {/* Interface Principale */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-500/20 data-[state=active]:text-slate-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-gray-500/20 data-[state=active]:text-gray-300">
              <Database className="w-4 h-4 mr-2" />
              Sources
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-zinc-500/20 data-[state=active]:text-zinc-300">
              <Play className="w-4 h-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-neutral-500/20 data-[state=active]:text-neutral-300">
              <Brain className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="visualization" className="data-[state=active]:bg-slate-400/20 data-[state=active]:text-slate-200">
              <PieChart className="w-4 h-4 mr-2" />
              Visualisation
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique de Performance */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-slate-400" />
                    Performance en Temps Réel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-slate-500/10 to-gray-500/10 rounded-lg border border-slate-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-200">Graphique de performance temps réel</p>
                      <p className="text-slate-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statuts des Sources */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-gray-400" />
                    Statut des Sources de Données
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataSources.map((source) => (
                      <div key={source.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(source.status)}`}></div>
                          <div>
                            <h4 className="text-white font-medium text-sm">{source.name}</h4>
                            <p className="text-gray-400 text-xs">{source.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm font-medium">{getStatusText(source.status)}</p>
                          <p className="text-gray-400 text-xs">{source.recordCount.toLocaleString()} enregistrements</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sources de Données */}
          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Sources de Données</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Source
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source) => (
                    <div key={source.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(source.status)}`}></div>
                          <h3 className="text-white font-semibold">{source.name}</h3>
                          <Badge variant="outline" className="border-white/30 text-white capitalize">
                            {source.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Statut</p>
                          <p className="text-white capitalize">{getStatusText(source.status)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Dernière Sync</p>
                          <p className="text-white">{source.lastSync.toLocaleTimeString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Enregistrements</p>
                          <p className="text-white">{source.recordCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Taille</p>
                          <p className="text-white">{source.size}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-gray-400 text-sm mb-2">Schéma :</p>
                        <div className="flex flex-wrap gap-2">
                          {source.schema.slice(0, 6).map((field, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white text-xs">
                              {field}
                            </Badge>
                          ))}
                          {source.schema.length > 6 && (
                            <Badge variant="outline" className="border-white/20 text-white text-xs">
                              +{source.schema.length - 6} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Rafraîchissement : {source.refreshRate}</span>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/20">
                          <Download className="w-4 h-4 mr-2" />
                          Exporter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs d'Analyse */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Jobs d'Analyse</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button className="bg-gradient-to-r from-zinc-500 to-neutral-500 hover:from-zinc-600 hover:to-neutral-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Job
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
                          <h3 className="text-white font-semibold">{job.name}</h3>
                          <Badge variant="outline" className="border-white/30 text-white">
                            {job.algorithm}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {job.status === 'running' && (
                            <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-300 hover:bg-orange-500/20">
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {job.status === 'paused' && (
                            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/20">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Source</p>
                          <p className="text-white">{job.dataSource}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Début</p>
                          <p className="text-white">{job.startTime.toLocaleTimeString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Durée</p>
                          <p className="text-white">
                            {job.endTime 
                              ? `${Math.round((job.endTime.getTime() - job.startTime.getTime()) / 1000 / 60)} min`
                              : 'En cours'
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Statut</p>
                          <p className="text-white capitalize">{getStatusText(job.status)}</p>
                        </div>
                      </div>

                      {job.status === 'running' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progression</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      )}

                      {job.results && (
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <h4 className="text-green-300 font-medium mb-2">Résultats :</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Segments</p>
                              <p className="text-white">{job.results.segments}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Précision</p>
                              <p className="text-white">{job.results.accuracy}%</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {job.error && (
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <h4 className="text-red-300 font-medium mb-2">Erreur :</h4>
                          <p className="text-red-200 text-sm">{job.error}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Insights IA</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button className="bg-gradient-to-r from-neutral-500 to-slate-500 hover:from-neutral-600 hover:to-slate-600">
                      <Brain className="w-4 h-4 mr-2" />
                      Nouvelle Analyse
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className={getImpactColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                          <h3 className="text-white font-semibold">{insight.title}</h3>
                          <Badge variant="outline" className="border-white/30 text-white capitalize">
                            {insight.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{insight.confidence}%</p>
                          <p className="text-gray-400 text-xs">Confiance</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{insight.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Timestamp</p>
                          <p className="text-white">{insight.timestamp.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Points de Données</p>
                          <p className="text-white">{insight.dataPoints.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Visualisation</p>
                          <p className="text-white capitalize">{insight.visualization}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Catégorie</p>
                          <p className="text-white capitalize">{insight.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visualisation */}
          <TabsContent value="visualization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-slate-400" />
                    Graphiques en Barres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-slate-500/10 to-gray-500/10 rounded-lg border border-slate-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-200">Graphiques en barres interactifs</p>
                      <p className="text-slate-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2 text-gray-400" />
                    Graphiques Circulaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-gray-500/10 to-zinc-500/10 rounded-lg border border-gray-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <PieChartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-200">Graphiques circulaires</p>
                      <p className="text-gray-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChartIcon className="w-5 h-5 mr-2 text-zinc-400" />
                    Graphiques Linéaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-zinc-500/10 to-neutral-500/10 rounded-lg border border-zinc-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <LineChartIcon className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                      <p className="text-zinc-200">Graphiques linéaires temporels</p>
                      <p className="text-zinc-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                                      <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-neutral-400" />
                      Nuages de Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-neutral-500/10 to-slate-400/10 rounded-lg border border-neutral-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-200">Nuages de points 3D</p>
                        <p className="text-neutral-300 text-sm">Intégration Chart.js en cours</p>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 