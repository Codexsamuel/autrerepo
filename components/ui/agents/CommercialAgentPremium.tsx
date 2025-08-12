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
  Users,
  Target,
  DollarSign,
  ShoppingCart,
  MessageSquare,
  Zap,
  Crown,
  Star,
  ArrowUpRight,
  PieChart,
  Activity,
  Globe,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Brain,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  BarChart,
  PieChart as PieChartIcon,
  LineChart,
  Map,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Archive,
  Target as TargetIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  ShoppingCart as ShoppingCartIcon,
  MessageSquare as MessageSquareIcon,
  Zap as ZapIcon,
  Crown as CrownIcon,
  Star as StarIcon,
  ArrowUpRight as ArrowUpRightIcon,
  PieChart as PieChartIcon2,
  Activity as ActivityIcon,
  Globe as GlobeIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Clock as ClockIcon,
  Plus as PlusIcon,
  Brain as BrainIcon,
  Sparkles as SparklesIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  RotateCcw as RotateCcwIcon,
  Settings as SettingsIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  RefreshCw as RefreshCwIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon3,
  LineChart as LineChartIcon,
  Map as MapIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Archive as ArchiveIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface CausalScore {
  leadId: string;
  baseline: number;
  withOffer: number;
  lift: number;
  confidence: number;
  factors: string[];
}

interface HierarchicalForecast {
  level: 'product' | 'bu' | 'country';
  name: string;
  actual: number;
  forecast: number;
  mape: number;
  p50: number;
  p90: number;
  trend: 'up' | 'down' | 'stable';
}

interface Playbook {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'draft' | 'testing' | 'archived';
  steps: PlaybookStep[];
  performance: {
    conversionRate: number;
    avgCycleTime: number;
    revenue: number;
  };
  lastModified: Date;
}

interface PlaybookStep {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'offer' | 'followup';
  title: string;
  description: string;
  delay: number; // en heures
  conditions: string[];
  actions: string[];
  aiSuggestions: string[];
}

interface CommercialMetrics {
  sales: number;
  leads: number;
  conversion: number;
  revenue: number;
  customers: number;
  roi: number;
  avgCycleTime: number;
  winRate: number;
  causalLift: number;
  forecastAccuracy: number;
}

export default function CommercialAgentPremium() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [metrics, setMetrics] = useState<CommercialMetrics>({
    sales: 0,
    leads: 0,
    conversion: 0,
    revenue: 0,
    customers: 0,
    roi: 0,
    avgCycleTime: 0,
    winRate: 0,
    causalLift: 0,
    forecastAccuracy: 0
  });
  const [causalScores, setCausalScores] = useState<CausalScore[]>([]);
  const [forecasts, setForecasts] = useState<HierarchicalForecast[]>([]);
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [isPlaybookEditorOpen, setIsPlaybookEditorOpen] = useState(false);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setMetrics({
        sales: 1247,
        leads: 89,
        conversion: 23.4,
        revenue: 45678,
        customers: 234,
        roi: 312,
        avgCycleTime: 18.5,
        winRate: 67.8,
        causalLift: 15.3,
        forecastAccuracy: 87.2
      });

      setCausalScores([
        {
          leadId: 'L001',
          baseline: 0.23,
          withOffer: 0.31,
          lift: 34.8,
          confidence: 0.89,
          factors: ['Prix compétitif', 'Délai de livraison', 'Support premium']
        },
        {
          leadId: 'L002',
          baseline: 0.18,
          withOffer: 0.25,
          lift: 38.9,
          confidence: 0.92,
          factors: ['Formation incluse', 'Maintenance gratuite', 'Garantie étendue']
        }
      ]);

      setForecasts([
        {
          level: 'product',
          name: 'Solution CRM',
          actual: 125000,
          forecast: 132000,
          mape: 5.6,
          p50: 132000,
          p90: 145000,
          trend: 'up'
        },
        {
          level: 'bu',
          name: 'Division Ventes',
          actual: 450000,
          forecast: 478000,
          mape: 6.2,
          p50: 478000,
          p90: 520000,
          trend: 'up'
        },
        {
          level: 'country',
          name: 'France',
          actual: 890000,
          forecast: 925000,
          mape: 3.9,
          p50: 925000,
          p90: 980000,
          trend: 'up'
        }
      ]);

      setPlaybooks([
        {
          id: 'P001',
          name: 'Séquence Vente Premium',
          description: 'Séquence optimisée pour les prospects haut de gamme',
          version: '2.1.0',
          status: 'active',
          steps: [
            {
              id: 'S001',
              type: 'email',
              title: 'Premier contact personnalisé',
              description: 'Email d\'introduction avec proposition de valeur',
              delay: 0,
              conditions: ['Lead qualifié', 'Budget > 50k'],
              actions: ['Envoi email', 'Suivi ouverture', 'Préparation appel'],
              aiSuggestions: ['Personnaliser selon l\'industrie', 'Mentionner ROI attendu']
            },
            {
              id: 'S002',
              type: 'call',
              title: 'Appel de qualification',
              description: 'Appel de 15 minutes pour valider le besoin',
              delay: 24,
              conditions: ['Email ouvert', 'Lien cliqué'],
              actions: ['Planifier appel', 'Préparer questions', 'Documenter réponses'],
              aiSuggestions: ['Détecter objections', 'Qualifier le budget', 'Identifier les décideurs']
            }
          ],
          performance: {
            conversionRate: 28.5,
            avgCycleTime: 14.2,
            revenue: 125000
          },
          lastModified: new Date()
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'testing': return 'bg-blue-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4" />;
      case 'down': return <ArrowUpRight className="w-4 h-4 rotate-90" />;
      case 'stable': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Chargement de l'Agent Commercial Premium...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-emerald-800/50 to-blue-800/50 backdrop-blur-sm border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Closer IA Autonome</h1>
                <p className="text-emerald-200 text-lg">Scoring causal, prévisions hiérarchiques & Playbooks intelligents</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-emerald-500 text-emerald-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-300">
                <Brain className="w-4 h-4 mr-1" />
                IA Causale
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-300">
                <Sparkles className="w-4 h-4 mr-1" />
                Auto-Healing
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Métriques Principales avec Causal Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Ventes</p>
                  <p className="text-3xl font-bold text-white">{metrics.sales.toLocaleString()}</p>
                  <p className="text-emerald-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <ShoppingCart className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Conversion</p>
                  <p className="text-3xl font-bold text-white">{metrics.conversion}%</p>
                  <p className="text-blue-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +8.3%
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Causal Lift</p>
                  <p className="text-3xl font-bold text-white">{metrics.causalLift}%</p>
                  <p className="text-purple-300 text-sm flex items-center">
                    <Brain className="w-4 h-4 mr-1" />
                    IA Causale
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Cycle Time</p>
                  <p className="text-3xl font-bold text-white">{metrics.avgCycleTime}j</p>
                  <p className="text-orange-300 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    -15.2%
                  </p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border-pink-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-200 text-sm font-medium">Prévisions</p>
                  <p className="text-3xl font-bold text-white">{metrics.forecastAccuracy}%</p>
                  <p className="text-pink-300 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5.7%
                  </p>
                </div>
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Pipeline 360°
            </TabsTrigger>
            <TabsTrigger value="causal" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <Brain className="w-4 h-4 mr-2" />
              Scoring Causal
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Prévisions
            </TabsTrigger>
            <TabsTrigger value="playbooks" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
              <Play className="w-4 h-4 mr-2" />
              Playbooks
            </TabsTrigger>
          </TabsList>

          {/* Pipeline 360° */}
          <TabsContent value="pipeline" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Vue d'ensemble du pipeline */}
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
                      <span className="text-white/80">Leads Qualifiés</span>
                      <span className="text-white font-semibold">89</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">En Négociation</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Propositions</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Fermés</span>
                      <span className="text-white font-semibold">8</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Performance par commercial */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Performance Équipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Jean Dupont', deals: 12, revenue: 125000, performance: 95 },
                      { name: 'Marie Martin', deals: 8, revenue: 89000, performance: 87 },
                      { name: 'Pierre Durand', deals: 15, revenue: 156000, performance: 92 }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-white/60 text-sm">{member.deals} deals</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{member.revenue.toLocaleString()}€</p>
                          <p className="text-emerald-400 text-sm">{member.performance}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertes et opportunités */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Alertes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded">
                      <p className="text-red-300 text-sm font-medium">Lead à risque</p>
                      <p className="text-red-200 text-xs">L001 - Pas de contact depuis 7 jours</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded">
                      <p className="text-yellow-300 text-sm font-medium">Opportunité</p>
                      <p className="text-yellow-200 text-xs">L002 - Budget augmenté à 75k€</p>
                    </div>
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded">
                      <p className="text-green-300 text-sm font-medium">Succès</p>
                      <p className="text-green-200 text-xs">L003 - Deal fermé 45k€</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scoring Causal */}
          <TabsContent value="causal" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Analyse Causale des Conversions
                </CardTitle>
                <p className="text-white/60">Découvrez l'impact causal de vos actions sur la conversion des leads</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {causalScores.map((score, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Lead {score.leadId}</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          +{score.lift.toFixed(1)}% Lift
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">Baseline</p>
                          <p className="text-white text-xl font-bold">{(score.baseline * 100).toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">Avec Offre</p>
                          <p className="text-white text-xl font-bold">{(score.withOffer * 100).toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-3 bg-emerald-500/20 rounded border border-emerald-500/30">
                          <p className="text-emerald-300 text-sm">Confiance</p>
                          <p className="text-emerald-200 text-xl font-bold">{(score.confidence * 100).toFixed(0)}%</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-white/80 text-sm mb-2">Facteurs d'impact :</p>
                        <div className="flex flex-wrap gap-2">
                          {score.factors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="border-emerald-500/30 text-emerald-300">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prévisions Hiérarchiques */}
          <TabsContent value="forecasting" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Prévisions Hiérarchiques
                </CardTitle>
                <p className="text-white/60">Prévisions multi-niveaux avec métriques de précision MAPE et intervalles P50/P90</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {forecasts.map((forecast, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold">{forecast.name}</h3>
                          <p className="text-white/60 text-sm capitalize">{forecast.level}</p>
                        </div>
                        <div className={`flex items-center ${getTrendColor(forecast.trend)}`}>
                          {getTrendIcon(forecast.trend)}
                          <span className="ml-1 text-sm font-medium">
                            {forecast.trend === 'up' ? 'Hausse' : forecast.trend === 'down' ? 'Baisse' : 'Stable'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">Réel</p>
                          <p className="text-white text-lg font-bold">{forecast.actual.toLocaleString()}€</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">Prévision</p>
                          <p className="text-white text-lg font-bold">{forecast.forecast.toLocaleString()}€</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">MAPE</p>
                          <p className="text-white text-lg font-bold">{forecast.mape}%</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded">
                          <p className="text-white/60 text-sm">P90</p>
                          <p className="text-white text-lg font-bold">{forecast.p90.toLocaleString()}€</p>
                        </div>
                      </div>

                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, (forecast.forecast / forecast.actual) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Playbooks Intelligents */}
          <TabsContent value="playbooks" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Playbooks Auto-Healing</h2>
              <Button 
                onClick={() => setIsPlaybookEditorOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Playbook
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {playbooks.map((playbook) => (
                <Card key={playbook.id} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{playbook.name}</CardTitle>
                        <p className="text-white/60 text-sm">{playbook.description}</p>
                      </div>
                      <Badge 
                        className={`${getStatusColor(playbook.status)} text-white`}
                      >
                        {playbook.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>v{playbook.version}</span>
                      <span>•</span>
                      <span>Modifié le {playbook.lastModified.toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Performance du playbook */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-white/5 rounded">
                        <div className="text-center">
                          <p className="text-white/60 text-xs">Conversion</p>
                          <p className="text-white font-bold">{playbook.performance.conversionRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-xs">Cycle Time</p>
                          <p className="text-white font-bold">{playbook.performance.avgCycleTime}j</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-xs">Revenus</p>
                          <p className="text-white font-bold">{playbook.performance.revenue.toLocaleString()}€</p>
                        </div>
                      </div>

                      {/* Étapes du playbook */}
                      <div>
                        <p className="text-white/80 text-sm mb-2">Étapes ({playbook.steps.length})</p>
                        <div className="space-y-2">
                          {playbook.steps.slice(0, 3).map((step, index) => (
                            <div key={step.id} className="flex items-center space-x-2 p-2 bg-white/5 rounded">
                              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <span className="text-emerald-300 text-xs font-bold">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">{step.title}</p>
                                <p className="text-white/60 text-xs">{step.delay}h de délai</p>
                              </div>
                              <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                                {step.type}
                              </Badge>
                            </div>
                          ))}
                          {playbook.steps.length > 3 && (
                            <div className="text-center p-2">
                              <p className="text-white/60 text-sm">+{playbook.steps.length - 3} autres étapes</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPlaybook(playbook)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Éditer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Tester
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 