"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, MessageSquare, BarChart3, Settings, Zap, Target, Eye, Shield, Activity, Wifi, Globe, Star, ArrowRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export default function NovaAgentAIPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('initializing');
  const [activeModules, setActiveModules] = useState([]);
  const [analytics, setAnalytics] = useState({
    engagement: 0,
    reach: 0,
    conversion: 0,
    roi: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSystemStatus('active');
    }, 3000);

    // Simulation des analytics
    const analyticsInterval = setInterval(() => {
      setAnalytics({
        engagement: Math.random() * 100,
        reach: Math.random() * 100,
        conversion: Math.random() * 100,
        roi: Math.random() * 100
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(analyticsInterval);
    };
  }, []);

  const modules = [
    {
      id: 'influence',
      name: 'AI Influence Scanner',
      icon: <Eye className="h-6 w-6" />,
      description: 'Détection d\'influenceurs et campagnes virales',
      status: 'active',
      color: 'from-blue-500 to-blue-600',
      progress: 92
    },
    {
      id: 'trends',
      name: 'Predictive Trend Model',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Prédiction de tendances virales',
      status: 'active',
      color: 'from-green-500 to-green-600',
      progress: 88
    },
    {
      id: 'sovereign',
      name: 'Sovereign AI Counter Algorithm',
      icon: <Shield className="h-6 w-6" />,
      description: 'Algorithme IA souverain',
      status: 'active',
      color: 'from-purple-500 to-purple-600',
      progress: 95
    },
    {
      id: 'social',
      name: 'Intelligent Social Manager',
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Gestion intelligente des comptes sociaux',
      status: 'active',
      color: 'from-pink-500 to-pink-600',
      progress: 85
    },
    {
      id: 'content',
      name: 'AI Content Generator',
      icon: <Brain className="h-6 w-6" />,
      description: 'Génération de contenu IA',
      status: 'active',
      color: 'from-orange-500 to-orange-600',
      progress: 90
    },
    {
      id: 'security',
      name: 'Security Controller',
      icon: <Shield className="h-6 w-6" />,
      description: 'Contrôle de sécurité',
      status: 'active',
      color: 'from-red-500 to-red-600',
      progress: 87
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Particules animées */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            NovaAgent AI Commercial
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-blue-400 text-lg"
          >
            Initialisation de l'agent IA commercial...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 space-y-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Modules IA en chargement...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Analyse de tendances...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Gestion des réseaux sociaux...</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center shadow-lg"
              >
                <Brain className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">NovaAgent AI Commercial</h1>
                <p className="text-blue-400 text-sm">Agent IA Commercial & Communication Digitale</p>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full shadow-lg"
              >
                {systemStatus}
              </motion.span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm">Système opérationnel</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Settings className="h-4 w-4 mr-2 inline" />
                Configuration
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Analytics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Engagement', value: analytics.engagement, icon: <Users className="h-6 w-6" />, color: 'from-blue-500 to-blue-600' },
            { label: 'Portée', value: analytics.reach, icon: <Globe className="h-6 w-6" />, color: 'from-green-500 to-green-600' },
            { label: 'Conversion', value: analytics.conversion, icon: <Target className="h-6 w-6" />, color: 'from-purple-500 to-purple-600' },
            { label: 'ROI', value: analytics.roi, icon: <TrendingUp className="h-6 w-6" />, color: 'from-pink-500 to-pink-600' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{metric.label}</p>
                  <p className="text-2xl font-bold text-white">{metric.value.toFixed(1)}%</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modules */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3"
            >
              <Brain className="h-4 w-4 text-white" />
            </motion.div>
            Modules IA Commercial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    {module.icon}
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white shadow-lg">
                    {module.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{module.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{module.description}</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full shadow-lg"
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-blue-400 text-sm font-semibold">{module.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-400" />
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Brain className="h-4 w-4 mr-2 inline" />
                Générer du Contenu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <TrendingUp className="h-4 w-4 mr-2 inline" />
                Analyser les Tendances
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <MessageSquare className="h-4 w-4 mr-2 inline" />
                Gérer les Réseaux Sociaux
              </motion.button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
              Analytics & Rapports
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <BarChart3 className="h-4 w-4 mr-2 inline" />
                Voir les Analytics
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Target className="h-4 w-4 mr-2 inline" />
                Campagnes Marketing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Shield className="h-4 w-4 mr-2 inline" />
                Sécurité & Contrôle
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            Performance Globale
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98.5%</div>
              <div className="text-gray-300 text-sm">Taux de Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2.4M</div>
              <div className="text-gray-300 text-sm">Personnes Touchées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">156%</div>
              <div className="text-gray-300 text-sm">ROI Moyen</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
