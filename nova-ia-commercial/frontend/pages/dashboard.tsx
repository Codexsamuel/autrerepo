import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DashboardProps {
  user?: {
    username: string;
    role: string;
    permissions: string[];
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiStatus, setAiStatus] = useState('active');
  const [recentActivity, setRecentActivity] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'content', label: 'Génération de Contenu', icon: '🎨' },
    { id: 'social', label: 'Gestion Social', icon: '📱' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'campaigns', label: 'Campagnes', icon: '🚀' },
    { id: 'security', label: 'Sécurité', icon: '🔒' }
  ];

  const modules = [
    {
      name: 'AI Influence Scanner',
      status: 'active',
      description: 'Détection d\'influenceurs et campagnes virales',
      icon: '🔍'
    },
    {
      name: 'Predictive Trend Model',
      status: 'active',
      description: 'Prédiction de tendances virales',
      icon: '📊'
    },
    {
      name: 'Sovereign AI Counter Algorithm',
      status: 'active',
      description: 'Algorithme IA souverain',
      icon: '🤖'
    },
    {
      name: 'Intelligent Social Manager',
      status: 'active',
      description: 'Gestion intelligente des comptes sociaux',
      icon: '📱'
    },
    {
      name: 'AI Content Generator',
      status: 'active',
      description: 'Génération de contenu IA',
      icon: '🎨'
    },
    {
      name: 'Security Controller',
      status: 'active',
      description: 'Contrôle de sécurité',
      icon: '🔒'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                NovaAgent AI Commercial
              </h1>
              <span className="ml-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                {aiStatus}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Bienvenue, {user?.username || 'Utilisateur'}</span>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{module.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{module.name}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  module.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {module.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-4">{module.description}</p>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Accéder
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
              <span className="mr-2">🎨</span>
              Générer du Contenu
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">
              <span className="mr-2">📊</span>
              Analyser les Tendances
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
              <span className="mr-2">🚀</span>
              Lancer une Campagne
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
