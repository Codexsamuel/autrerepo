'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity, 
  Target, 
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  target: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

interface Insight {
  id: string;
  type: 'positive' | 'warning' | 'negative' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  timestamp: Date;
}

export default function AdvancedAnalytics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const periods = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' },
    { value: '1y', label: '1 an' }
  ];

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    // Simuler le chargement des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Métriques d'exemple
    const sampleMetrics: Metric[] = [
      {
        id: '1',
        name: 'Chiffre d\'affaires',
        value: 125000,
        change: 12.5,
        changeType: 'increase',
        target: 150000,
        unit: '€',
        icon: DollarSign,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      },
      {
        id: '2',
        name: 'Clients actifs',
        value: 2847,
        change: -2.1,
        changeType: 'decrease',
        target: 3000,
        unit: '',
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        id: '3',
        name: 'Taux de conversion',
        value: 3.2,
        change: 0.8,
        changeType: 'increase',
        target: 4.0,
        unit: '%',
        icon: Target,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      },
      {
        id: '4',
        name: 'Satisfaction client',
        value: 4.6,
        change: 0.2,
        changeType: 'increase',
        target: 4.8,
        unit: '/5',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      }
    ];

    // Données de graphique d'exemple
    const sampleChartData: ChartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Ventes',
          data: [65000, 72000, 68000, 85000, 92000, 125000],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        },
        {
          label: 'Objectif',
          data: [70000, 70000, 70000, 70000, 70000, 70000],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0
        }
      ]
    };

    // Insights IA d'exemple
    const sampleInsights: Insight[] = [
      {
        id: '1',
        type: 'positive',
        title: 'Croissance exceptionnelle des ventes',
        description: 'Les ventes ont augmenté de 35% ce mois-ci, dépassant l\'objectif de 20%.',
        impact: 'high',
        action: 'Analyser les facteurs de succès',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'warning',
        title: 'Diminution du taux de conversion',
        description: 'Le taux de conversion a baissé de 0.5% cette semaine.',
        impact: 'medium',
        action: 'Réviser la stratégie marketing',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'info',
        title: 'Optimisation recommandée',
        description: 'L\'IA suggère d\'ajuster les prix de 5% pour maximiser les profits.',
        impact: 'medium',
        action: 'Analyser la recommandation',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
      }
    ];

    setMetrics(sampleMetrics);
    setChartData(sampleChartData);
    setInsights(sampleInsights);
    setIsLoading(false);
  };

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'negative':
        return TrendingDown;
      case 'info':
        return Brain;
      default:
        return Activity;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const exportData = () => {
    const data = {
      metrics,
      insights,
      period: selectedPeriod,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Avancés</h2>
          <p className="text-gray-600">Tableau de bord intelligent avec insights IA</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadAnalytics}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportData}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter
          </motion.button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const progress = (metric.value / metric.target) * 100;
          
          return (
            <motion.div
              key={metric.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value.toLocaleString()}{metric.unit}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Objectif</span>
                  <span className="text-gray-900">{metric.target.toLocaleString()}{metric.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {progress >= 100 ? 'Objectif atteint !' : `${Math.round(progress)}% de l'objectif`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Évolution des ventes</h3>
              <p className="text-sm text-gray-600">Comparaison avec l'objectif</p>
            </div>
            <LineChart className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Graphique interactif</p>
              <p className="text-sm text-gray-500">Intégration Chart.js/Recharts</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Ventes réelles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Objectif</span>
            </div>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Répartition des canaux</h3>
              <p className="text-sm text-gray-600">Sources de trafic</p>
            </div>
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Graphique circulaire</p>
              <p className="text-sm text-gray-500">Répartition des données</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Direct (45%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">SEO (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Social (15%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Autres (10%)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white p-6 rounded-xl shadow-lg border"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Insights IA</h3>
              <p className="text-sm text-gray-600">Recommandations intelligentes</p>
            </div>
          </div>
          <Zap className="w-6 h-6 text-yellow-500" />
        </div>

        <div className="space-y-4">
          {insights.map((insight) => {
            const InsightIcon = getInsightIcon(insight.type);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getInsightColor(insight.type)}`}>
                  <InsightIcon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor(insight.impact)} bg-gray-100`}>
                      Impact {insight.impact}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {insight.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {insight.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    
                    {insight.action && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        {insight.action}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8" />
            <span className="text-2xl font-bold">98.5%</span>
          </div>
          <h4 className="font-semibold mb-1">Uptime</h4>
          <p className="text-blue-100 text-sm">Performance système</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
            <span className="text-2xl font-bold">87%</span>
          </div>
          <h4 className="font-semibold mb-1">Objectifs atteints</h4>
          <p className="text-green-100 text-sm">Ce mois-ci</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8" />
            <span className="text-2xl font-bold">24/7</span>
          </div>
          <h4 className="font-semibold mb-1">IA Active</h4>
          <p className="text-purple-100 text-sm">Monitoring continu</p>
        </motion.div>
      </div>
    </div>
  );
} 