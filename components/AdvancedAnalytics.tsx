'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topPages: Array<{ path: string; views: number }>;
  userEngagement: {
    timeOnSite: number;
    pagesPerSession: number;
    returnRate: number;
  };
}

export default function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    sessionDuration: 0,
    bounceRate: 0,
    conversionRate: 0,
    topPages: [],
    userEngagement: {
      timeOnSite: 0,
      pagesPerSession: 0,
      returnRate: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données analytics
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Simulation de données analytics
      setTimeout(() => {
        setAnalytics({
          pageViews: 15420,
          uniqueVisitors: 8234,
          sessionDuration: 285,
          bounceRate: 23.4,
          conversionRate: 8.7,
          topPages: [
            { path: '/drone-simulator', views: 3420 },
            { path: '/investor-demo', views: 2890 },
            { path: '/', views: 2150 },
            { path: '/formations', views: 1890 },
            { path: '/novaworld', views: 1670 },
          ],
          userEngagement: {
            timeOnSite: 285,
            pagesPerSession: 4.2,
            returnRate: 67.3,
          },
        });
        setIsLoading(false);
      }, 1500);
    };

    loadAnalytics();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 rounded-xl p-6 border border-slate-700"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        📊 Analytics Avancés
        <span className="ml-2 text-sm text-slate-400">Temps réel</span>
      </h3>

      {/* Métriques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4"
        >
          <div className="text-blue-100 text-sm font-medium">Pages Vues</div>
          <div className="text-white text-2xl font-bold">{formatNumber(analytics.pageViews)}</div>
          <div className="text-blue-200 text-xs">+12.5% vs hier</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4"
        >
          <div className="text-green-100 text-sm font-medium">Visiteurs Uniques</div>
          <div className="text-white text-2xl font-bold">{formatNumber(analytics.uniqueVisitors)}</div>
          <div className="text-green-200 text-xs">+8.3% vs hier</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4"
        >
          <div className="text-purple-100 text-sm font-medium">Durée Session</div>
          <div className="text-white text-2xl font-bold">{formatTime(analytics.sessionDuration)}</div>
          <div className="text-purple-200 text-xs">+5.2% vs hier</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4"
        >
          <div className="text-orange-100 text-sm font-medium">Taux Conversion</div>
          <div className="text-white text-2xl font-bold">{analytics.conversionRate}%</div>
          <div className="text-orange-200 text-xs">+2.1% vs hier</div>
        </motion.div>
      </div>

      {/* Pages les plus visitées */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4">📈 Pages les Plus Visitées</h4>
        <div className="space-y-3">
          {analytics.topPages.map((page, index) => (
            <motion.div
              key={page.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between bg-slate-800 rounded-lg p-3"
            >
              <div className="flex items-center">
                <span className="text-slate-400 text-sm w-6">{index + 1}</span>
                <span className="text-white font-medium">{page.path}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-700 rounded-full h-2 mr-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(page.views / analytics.topPages[0].views) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-slate-300 text-sm">{formatNumber(page.views)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engagement utilisateur */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">👥 Engagement Utilisateur</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Temps sur Site</div>
            <div className="text-white text-xl font-bold">{formatTime(analytics.userEngagement.timeOnSite)}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Pages/Session</div>
            <div className="text-white text-xl font-bold">{analytics.userEngagement.pagesPerSession}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Taux de Retour</div>
            <div className="text-white text-xl font-bold">{analytics.userEngagement.returnRate}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}