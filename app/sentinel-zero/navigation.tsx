"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, ArrowRight } from 'lucide-react';

export default function SentinelZeroNavigation() {
  const navigateToDashboard = () => {
    window.location.href = '/sentinel-zero/dashboard';
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 mb-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-red-400" />
        🚀 ACCÈS DIRECT AU SYSTÈME MILITAIRE
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={navigateToDashboard}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg flex items-center justify-center"
        >
          <Target className="h-6 w-6 mr-3" />
          DASHBOARD MILITAIRE OPÉRATIONNEL
          <ArrowRight className="h-5 w-5 ml-3" />
        </motion.button>
        
        <div className="bg-black/20 p-4 rounded-lg border border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Statut du Système
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Modules d'Attaque:</span>
              <span className="text-green-400">100% Opérationnels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Modules IA:</span>
              <span className="text-green-400">100% Opérationnels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Système:</span>
              <span className="text-green-400">100% Opérationnel</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-4 text-center">
        🎯 Tous les modules sont maintenant cliquables et 100% opérationnels pour missions militaires
      </p>
    </motion.div>
  );
} 