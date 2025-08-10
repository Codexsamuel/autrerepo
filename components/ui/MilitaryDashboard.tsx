"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    CheckCircle,
    Clock,
    Network, Server,
    Shield, Target,
    TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface MilitaryMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'success';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface MilitaryAlert {
  id: string;
  type: 'threat' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const MilitaryDashboard = () => {
  const [metrics, setMetrics] = useState<MilitaryMetric[]>([
    {
      id: 'cpu',
      label: 'CPU Usage',
      value: 0,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      icon: <Activity className="h-5 w-5" />
    },
    {
      id: 'memory',
      label: 'Memory',
      value: 0,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      icon: <Server className="h-5 w-5" />
    },
    {
      id: 'network',
      label: 'Network',
      value: 0,
      unit: 'Mbps',
      status: 'normal',
      trend: 'stable',
      icon: <Network className="h-5 w-5" />
    },
    {
      id: 'security',
      label: 'Security',
      value: 0,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      icon: <Shield className="h-5 w-5" />
    }
  ]);

  const [alerts, setAlerts] = useState<MilitaryAlert[]>([]);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

  useEffect(() => {
    // Simulation des métriques en temps réel
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.floor(Math.random() * 100),
        status: Math.random() > 0.8 ? 'warning' : 'normal',
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })));
    }, 2000);

    // Simulation des alertes
    const alertInterval = setInterval(() => {
      const alertTypes: MilitaryAlert['type'][] = ['threat', 'warning', 'info', 'success'];
      const priorities: MilitaryAlert['priority'][] = ['low', 'medium', 'high', 'critical'];
      
      if (Math.random() > 0.7) {
        const newAlert: MilitaryAlert = {
          id: Date.now().toString(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: [
            'Nouvelle menace détectée',
            'Scan de vulnérabilité terminé',
            'Mise à jour des signatures',
            'Protocole de sécurité activé',
            'Backup automatique effectué'
          ][Math.floor(Math.random() * 5)],
          timestamp: new Date().toLocaleTimeString(),
          priority: priorities[Math.floor(Math.random() * priorities.length)]
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Target className="h-5 w-5 mr-2 text-red-400" />
          Dashboard Militaire
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            threatLevel === 'critical' ? 'bg-red-500' :
            threatLevel === 'high' ? 'bg-orange-500' :
            threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          } animate-pulse`} />
          <span className="text-sm text-gray-300">
            Niveau de menace: {threatLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 rounded-lg p-4 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center ${getStatusColor(metric.status)}`}>
                {metric.icon}
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="mb-2">
              <p className="text-gray-400 text-sm">{metric.label}</p>
              <p className="text-2xl font-bold text-white">
                {metric.value}{metric.unit}
              </p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                className={`h-2 rounded-full ${
                  metric.status === 'critical' ? 'bg-red-500' :
                  metric.status === 'warning' ? 'bg-yellow-500' :
                  metric.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alertes */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
          Alertes en Temps Réel
        </h4>
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg border border-gray-700"
            >
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-white text-sm">{alert.message}</p>
                <p className="text-gray-400 text-xs">{alert.timestamp}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                alert.priority === 'critical' ? 'bg-red-500 text-white' :
                alert.priority === 'high' ? 'bg-orange-500 text-white' :
                alert.priority === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
              }`}>
                {alert.priority}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Statut système */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Système Opérationnel</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">12 Modules Actifs</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant de métrique militaire individuelle
export const MilitaryMetric = ({ 
  label, 
  value, 
  unit, 
  status = 'normal',
  trend = 'stable',
  icon 
}: {
  label: string;
  value: number;
  unit: string;
  status?: 'normal' | 'warning' | 'critical' | 'success';
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'success': return 'border-green-500 bg-green-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border ${getStatusColor(status)} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white">
          {icon}
        </div>
        {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
        {trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
        {trend === 'stable' && <BarChart3 className="h-4 w-4 text-gray-500" />}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">
          {value}{unit}
        </p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          className={`h-2 rounded-full ${
            status === 'critical' ? 'bg-red-500' :
            status === 'warning' ? 'bg-yellow-500' :
            status === 'success' ? 'bg-green-500' : 'bg-blue-500'
          }`}
        />
      </div>
    </motion.div>
  );
}; 