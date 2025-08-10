import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  const periods = [
    { id: '1d', label: '24h', icon: '📅' },
    { id: '7d', label: '7 jours', icon: '📊' },
    { id: '30d', label: '30 jours', icon: '📈' },
    { id: '90d', label: '90 jours', icon: '📊' }
  ];

  const mockAnalyticsData = {
    overview: {
      total_reach: 125000,
      total_engagement: 8500,
      total_followers: 95000,
      growth_rate: 0.15
    },
    platforms: [
      {
        name: 'Instagram',
        reach: 75000,
        engagement: 5200,
        followers: 55000,
        growth: 0.12
      },
      {
        name: 'TikTok',
        reach: 35000,
        engagement: 2500,
        followers: 25000,
        growth: 0.25
      },
      {
        name: 'LinkedIn',
        reach: 15000,
        engagement: 800,
        followers: 15000,
        growth: 0.08
      }
    ],
    trends: [
      {
        name: 'Engagement',
        value: 0.068,
        change: 0.15,
        trend: 'up'
      },
      {
        name: 'Reach',
        value: 125000,
        change: 0.22,
        trend: 'up'
      },
      {
        name: 'Followers',
        value: 95000,
        change: 0.18,
        trend: 'up'
      },
      {
        name: 'Conversion',
        value: 0.025,
        change: -0.05,
        trend: 'down'
      }
    ],
    topContent: [
      {
        title: 'Post Innovation Tech',
        platform: 'Instagram',
        reach: 15000,
        engagement: 1200,
        type: 'image'
      },
      {
        title: 'Vidéo Tutorial',
        platform: 'TikTok',
        reach: 12000,
        engagement: 1800,
        type: 'video'
      },
      {
        title: 'Article Business',
        platform: 'LinkedIn',
        reach: 8000,
        engagement: 600,
        type: 'article'
      }
    ]
  };

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setIsLoading(false);
    }, 2000);
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Analytics & Performance
            </h1>
            <p className="text-gray-300">
              Analysez vos performances et optimisez vos stratégies
            </p>
          </div>
          
          {/* Sélecteur de période */}
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{period.icon}</span>
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.overview && Object.entries(analyticsData.overview).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm capitalize">
                    {key.replace('_', ' ')}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {typeof value === 'number' && value > 1000 
                      ? (value / 1000).toFixed(1) + 'K'
                      : typeof value === 'number' && value < 1
                      ? (value * 100).toFixed(1) + '%'
                      : value.toLocaleString()
                    }
                  </p>
                </div>
                <div className="text-3xl">
                  {key.includes('reach') && '📊'}
                  {key.includes('engagement') && '🎯'}
                  {key.includes('followers') && '👥'}
                  {key.includes('growth') && '📈'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plateformes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance par plateforme */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Performance par Plateforme</h2>
            <div className="space-y-4">
              {analyticsData.platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{platform.name}</p>
                      <p className="text-gray-300 text-sm">
                        {platform.followers.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {platform.reach.toLocaleString()}
                    </p>
                    <p className="text-green-400 text-sm">
                      +{(platform.growth * 100).toFixed(1)}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tendances */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Tendances</h2>
            <div className="space-y-4">
              {analyticsData.trends.map((trend, index) => (
                <motion.div
                  key={trend.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div>
                    <p className="text-white font-semibold">{trend.name}</p>
                    <p className="text-gray-300 text-sm">
                      {typeof trend.value === 'number' && trend.value < 1
                        ? (trend.value * 100).toFixed(1) + '%'
                        : trend.value.toLocaleString()
                      }
                    </p>
                  </div>
                  <div className={`flex items-center ${
                    trend.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className="mr-2">
                      {trend.trend === 'up' ? '↗️' : '↘️'}
                    </span>
                    <span className="font-semibold">
                      {trend.change > 0 ? '+' : ''}{(trend.change * 100).toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu performant */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Contenu Performant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.topContent.map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{content.title}</h3>
                  <span className="text-2xl">
                    {content.type === 'image' && '🖼️'}
                    {content.type === 'video' && '🎥'}
                    {content.type === 'article' && '📄'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{content.platform}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-white">
                    {content.reach.toLocaleString()} vues
                  </span>
                  <span className="text-green-400">
                    {content.engagement.toLocaleString()} engagements
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
