import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SocialManager: React.FC = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const mockAccounts = [
    {
      id: 1,
      platform: 'instagram',
      username: '@business_insta',
      followers: 50000,
      engagement_rate: 0.08,
      status: 'active',
      last_post: '2025-01-15',
      optimization_score: 0.75
    },
    {
      id: 2,
      platform: 'tiktok',
      username: '@business_tiktok',
      followers: 30000,
      engagement_rate: 0.12,
      status: 'active',
      last_post: '2025-01-14',
      optimization_score: 0.82
    },
    {
      id: 3,
      platform: 'linkedin',
      username: '@business_linkedin',
      followers: 15000,
      engagement_rate: 0.05,
      status: 'active',
      last_post: '2025-01-13',
      optimization_score: 0.68
    }
  ];

  useEffect(() => {
    setAccounts(mockAccounts);
  }, []);

  const handleOptimizeAccount = async (accountId) => {
    setIsOptimizing(true);
    setSelectedAccount(accounts.find(acc => acc.id === accountId));
    
    // Simulation d'optimisation
    setTimeout(() => {
      const mockOptimization = {
        platform: 'instagram',
        optimization_score: 0.88,
        recommendations: [
          'Améliorer la cohérence visuelle',
          'Poster plus régulièrement',
          'Engager avec la communauté',
          'Utiliser les hashtags tendance'
        ],
        automated_actions: [
          'Scheduling posts automatique',
          'Monitoring des mentions',
          'Optimisation des hashtags',
          'Analyse des performances'
        ],
        estimated_improvement: '15%'
      };
      
      setOptimizationResults(mockOptimization);
      setIsOptimizing(false);
    }, 3000);
  };

  const platforms = {
    instagram: { icon: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    tiktok: { icon: '🎵', color: 'bg-gradient-to-r from-black to-gray-800' },
    linkedin: { icon: '💼', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    facebook: { icon: '👥', color: 'bg-gradient-to-r from-blue-600 to-blue-700' },
    youtube: { icon: '📺', color: 'bg-gradient-to-r from-red-500 to-red-600' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestionnaire Social Intelligent
          </h1>
          <p className="text-gray-300">
            Optimisez et gérez vos comptes sociaux avec l'IA
          </p>
        </div>

        {/* Comptes sociaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-3 ${platforms[account.platform]?.color}`}>
                    {platforms[account.platform]?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{account.username}</h3>
                    <p className="text-gray-300 text-sm capitalize">{account.platform}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  account.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {account.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300 text-sm">Followers</p>
                  <p className="text-white font-semibold">{account.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Engagement</p>
                  <p className="text-white font-semibold">{(account.engagement_rate * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">Score d'optimisation</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${account.optimization_score * 100}%` }}
                  ></div>
                </div>
                <p className="text-white text-sm mt-1">{(account.optimization_score * 100).toFixed(0)}%</p>
              </div>

              <button
                onClick={() => handleOptimizeAccount(account.id)}
                disabled={isOptimizing}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {isOptimizing && selectedAccount?.id === account.id ? 'Optimisation...' : 'Optimiser'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Résultats d'optimisation */}
        {optimizationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Résultats d'optimisation - {optimizationResults.platform}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score d'optimisation */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Score d'optimisation</h3>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Score actuel</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {(optimizationResults.optimization_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      style={{ width: `${optimizationResults.optimization_score * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Amélioration estimée */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Amélioration estimée</h3>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-400">
                      {optimizationResults.estimated_improvement}
                    </span>
                    <p className="text-gray-300 text-sm">d'amélioration attendue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommandations */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Recommandations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {optimizationResults.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center bg-white/10 rounded-lg p-3">
                    <span className="text-blue-400 mr-3">💡</span>
                    <span className="text-white">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions automatisées */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Actions automatisées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {optimizationResults.automated_actions.map((action, index) => (
                  <div key={index} className="flex items-center bg-white/10 rounded-lg p-3">
                    <span className="text-green-400 mr-3">🤖</span>
                    <span className="text-white">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocialManager;
