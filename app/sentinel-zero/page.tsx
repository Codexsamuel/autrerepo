"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity,
  Settings,
  Target,
  Eye,
  Zap,
  Lock,
  User,
  Mic,
  Fingerprint
} from 'lucide-react';

export default function SentinelZero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    master_code: '',
    admin_id: '',
    voice_hash: '',
    fingerprint_hash: '',
    vocal_phrase: ''
  });
  const [scanResults, setScanResults] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setShowLogin(false);
      } else {
        alert('Authentification échouée');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion');
    }
  };

  const activateRedButton = async () => {
    if (confirm('Êtes-vous sûr de vouloir activer le protocole Red Button ? Cette action est irréversible.')) {
      try {
        const response = await fetch('/api/auth/red-button', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            confirmation: 'DESTROY_ALL_DATA',
            reason: 'ADMIN_REQUEST'
          }),
        });

        if (response.ok) {
          alert('Protocole Red Button activé - Toutes les données ont été détruites');
        }
      } catch (error) {
        console.error('Red button error:', error);
      }
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-red-500/30 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Sentinel Zero
            </h1>
            <p className="text-gray-300">
              Agent Red Team IA Ultra-Avancé
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Code Maître
              </label>
              <input
                type="password"
                value={loginData.master_code}
                onChange={(e) => setLoginData({...loginData, master_code: e.target.value})}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
                placeholder="0987612345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                ID Administrateur
              </label>
              <input
                type="text"
                value={loginData.admin_id}
                onChange={(e) => setLoginData({...loginData, admin_id: e.target.value})}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
                placeholder="DL-SUPER-01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mic className="w-4 h-4 inline mr-2" />
                Hash Empreinte Vocale
              </label>
              <input
                type="password"
                value={loginData.voice_hash}
                onChange={(e) => setLoginData({...loginData, voice_hash: e.target.value})}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
                placeholder="b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Fingerprint className="w-4 h-4 inline mr-2" />
                Hash Empreinte Digitale
              </label>
              <input
                type="password"
                value={loginData.fingerprint_hash}
                onChange={(e) => setLoginData({...loginData, fingerprint_hash: e.target.value})}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
                placeholder="a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mic className="w-4 h-4 inline mr-2" />
                Phrase Vocale
              </label>
              <input
                type="password"
                value={loginData.vocal_phrase}
                onChange={(e) => setLoginData({...loginData, vocal_phrase: e.target.value})}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
                placeholder="i am sentinel"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Shield className="w-4 h-4 mr-2 inline" />
              Authentification 5 Niveaux
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black">
      <header className="bg-black/40 backdrop-blur-lg border-b border-red-500/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">Sentinel Zero</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-green-400 text-sm">SUPER_ADMIN</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Déconnexion
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-400" />
            Dashboard Sentinel Zero
          </h2>
          <p className="text-gray-300">
            Agent Red Team IA Ultra-Avancé - Système de détection de portes dérobées opérationnel
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-400" />
              Actions
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Target className="h-4 w-4 mr-2 inline" />
                Détection Portes Dérobées
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2 inline" />
                Reconnaissance
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <AlertTriangle className="h-4 w-4 mr-2 inline" />
                Test de Vulnérabilité
              </motion.button>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-400" />
              Système
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Settings className="h-4 w-4 mr-2 inline" />
                Configuration
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Shield className="h-4 w-4 mr-2 inline" />
                Logs de Sécurité
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Zap className="h-4 w-4 mr-2 inline" />
                Test de Performance
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/50"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
            ⚠️ Protocole Red Button
          </h3>
          <p className="text-gray-300 mb-4">
            Ce protocole activera la destruction immédiate de toutes les données et le nettoyage complet du système.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activateRedButton}
            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
          >
            <AlertTriangle className="h-4 w-4 mr-2 inline" />
            Red Button
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
