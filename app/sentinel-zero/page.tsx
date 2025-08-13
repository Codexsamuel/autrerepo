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
  Fingerprint,
  Search,
  Bug,
  Database,
  Cpu,
  Network,
  HardDrive,
  Trash2
} from 'lucide-react';

export default function SentinelZero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSeigneurBypass, setShowSeigneurBypass] = useState(false);
  const [seigneurCode, setSeigneurCode] = useState('');
  const [loginData, setLoginData] = useState({
    master_code: '',
    admin_id: '',
    voice_hash: '',
    fingerprint_hash: '',
    vocal_phrase: ''
  });
  const [scanResults, setScanResults] = useState(null);
  const [systemStatus, setSystemStatus] = useState({
    backdoorDetection: 'En attente',
    reconnaissance: 'En attente',
    vulnerabilityTest: 'En attente',
    configuration: 'En attente',
    securityLogs: 'En attente',
    performanceTest: 'En attente'
  });

  // Code Seigneur pour bypasser complètement les 5 niveaux
  const SEIGNEUR_MASTER_CODE = 'SEIGNEUR-OMEGA-2025';

  const handleSeigneurBypass = () => {
    if (seigneurCode === SEIGNEUR_MASTER_CODE) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setShowSeigneurBypass(false);
      alert('🚀 BYPASS SEIGNEUR ACTIVÉ - Accès direct au système !');
    } else {
      alert('❌ Code Seigneur incorrect !');
    }
  };

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

  // FONCTIONS DES BOUTONS D'ACTION
  const handleBackdoorDetection = async () => {
    setSystemStatus(prev => ({ ...prev, backdoorDetection: 'Scan en cours...' }));
    
    try {
      // Simulation d'un scan de portes dérobées
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = {
        timestamp: new Date().toISOString(),
        scanType: 'Backdoor Detection',
        results: [
          { threat: 'Suspicious Process', severity: 'HIGH', details: 'Processus inconnu détecté' },
          { threat: 'Network Anomaly', severity: 'MEDIUM', details: 'Connexion suspecte détectée' },
          { threat: 'File Modification', severity: 'LOW', details: 'Fichiers système modifiés' }
        ]
      };
      
      setScanResults(results);
      setSystemStatus(prev => ({ ...prev, backdoorDetection: 'Scan terminé' }));
      
      alert(`🔍 SCAN TERMINÉ !\n\nThreats détectés: ${results.results.length}\n\n${results.results.map(r => `• ${r.threat} (${r.severity}): ${r.details}`).join('\n')}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, backdoorDetection: 'Erreur' }));
      alert('❌ Erreur lors du scan de portes dérobées');
    }
  };

  const handleReconnaissance = async () => {
    setSystemStatus(prev => ({ ...prev, reconnaissance: 'Reconnaissance en cours...' }));
    
    try {
      // Simulation d'une reconnaissance
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const reconResults = {
        timestamp: new Date().toISOString(),
        scanType: 'Reconnaissance',
        results: {
          openPorts: [22, 80, 443, 3306, 8080],
          services: ['SSH', 'HTTP', 'HTTPS', 'MySQL', 'HTTP-Proxy'],
          vulnerabilities: ['Weak SSH config', 'Default MySQL credentials'],
          networkTopology: '3 subnets detected'
        }
      };
      
      setScanResults(reconResults);
      setSystemStatus(prev => ({ ...prev, reconnaissance: 'Reconnaissance terminée' }));
      
      alert(`🔍 RECONNAISSANCE TERMINÉE !\n\nPorts ouverts: ${reconResults.results.openPorts.join(', ')}\nServices: ${reconResults.results.services.join(', ')}\nVulnérabilités: ${reconResults.results.vulnerabilities.length}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, reconnaissance: 'Erreur' }));
      alert('❌ Erreur lors de la reconnaissance');
    }
  };

  const handleVulnerabilityTest = async () => {
    setSystemStatus(prev => ({ ...prev, vulnerabilityTest: 'Test en cours...' }));
    
    try {
      // Simulation d'un test de vulnérabilité
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const vulnResults = {
        timestamp: new Date().toISOString(),
        scanType: 'Vulnerability Test',
        results: {
          critical: 2,
          high: 5,
          medium: 8,
          low: 12,
          details: [
            'SQL Injection possible sur /login',
            'XSS sur /search',
            'Weak password policy',
            'Missing security headers'
          ]
        }
      };
      
      setScanResults(vulnResults);
      setSystemStatus(prev => ({ ...prev, vulnerabilityTest: 'Test terminé' }));
      
      alert(`🔍 TEST DE VULNÉRABILITÉ TERMINÉ !\n\nCritique: ${vulnResults.results.critical}\nÉlevé: ${vulnResults.results.high}\nMoyen: ${vulnResults.results.medium}\nFaible: ${vulnResults.results.low}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, vulnerabilityTest: 'Erreur' }));
      alert('❌ Erreur lors du test de vulnérabilité');
    }
  };

  // FONCTIONS DES BOUTONS SYSTÈME
  const handleConfiguration = async () => {
    setSystemStatus(prev => ({ ...prev, configuration: 'Configuration en cours...' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const configResults = {
        timestamp: new Date().toISOString(),
        action: 'Configuration System',
        results: {
          firewall: 'Configuré et actif',
          ids: 'Intrusion Detection System actif',
          encryption: 'AES-256 activé',
          backup: 'Sauvegarde automatique configurée',
          monitoring: 'Monitoring 24/7 actif'
        }
      };
      
      setScanResults(configResults);
      setSystemStatus(prev => ({ ...prev, configuration: 'Configuration terminée' }));
      
      alert(`⚙️ CONFIGURATION TERMINÉE !\n\nFirewall: ${configResults.results.firewall}\nIDS: ${configResults.results.ids}\nEncryption: ${configResults.results.encryption}\nBackup: ${configResults.results.backup}\nMonitoring: ${configResults.results.monitoring}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, configuration: 'Erreur' }));
      alert('❌ Erreur lors de la configuration');
    }
  };

  const handleSecurityLogs = async () => {
    setSystemStatus(prev => ({ ...prev, securityLogs: 'Analyse des logs...' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const logResults = {
        timestamp: new Date().toISOString(),
        action: 'Security Logs Analysis',
        results: {
          totalLogs: 15420,
          suspiciousActivities: 23,
          blockedAttempts: 156,
          alerts: [
            'Tentative de connexion SSH depuis IP suspecte',
            'Fichier système modifié',
            'Tentative d'accès non autorisé à la base de données'
          ]
        }
      };
      
      setScanResults(logResults);
      setSystemStatus(prev => ({ ...prev, securityLogs: 'Analyse terminée' }));
      
      alert(`📊 ANALYSE DES LOGS TERMINÉE !\n\nTotal logs: ${logResults.results.totalLogs}\nActivités suspectes: ${logResults.results.suspiciousActivities}\nTentatives bloquées: ${logResults.results.blockedAttempts}\n\nAlertes:\n${logResults.results.alerts.map(a => `• ${a}`).join('\n')}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, securityLogs: 'Erreur' }));
      alert('❌ Erreur lors de l\'analyse des logs');
    }
  };

  const handlePerformanceTest = async () => {
    setSystemStatus(prev => ({ ...prev, performanceTest: 'Test en cours...' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const perfResults = {
        timestamp: new Date().toISOString(),
        action: 'Performance Test',
        results: {
          cpu: '15% (Normal)',
          memory: '67% (Normal)',
          disk: '23% (Normal)',
          network: '12% (Normal)',
          responseTime: '45ms (Excellent)',
          throughput: '2.3 GB/s (Excellent)'
        }
      };
      
      setScanResults(perfResults);
      setSystemStatus(prev => ({ ...prev, performanceTest: 'Test terminé' }));
      
      alert(`⚡ TEST DE PERFORMANCE TERMINÉ !\n\nCPU: ${perfResults.results.cpu}\nMémoire: ${perfResults.results.memory}\nDisque: ${perfResults.results.disk}\nRéseau: ${perfResults.results.network}\nTemps de réponse: ${perfResults.results.responseTime}\nDébit: ${perfResults.results.throughput}`);
      
    } catch (error) {
      setSystemStatus(prev => ({ ...prev, performanceTest: 'Erreur' }));
      alert('❌ Erreur lors du test de performance');
    }
  };

  const activateRedButton = async () => {
    if (confirm('🚨 ATTENTION CRITIQUE !\n\nÊtes-vous ABSOLUMENT sûr de vouloir activer le protocole Red Button ?\n\nCette action est IRRÉVERSIBLE et détruira :\n• Toutes les données\n• Tous les systèmes\n• Toute la configuration\n• TOUT !\n\nTapez "DESTROY" pour confirmer :')) {
      const confirmation = prompt('Tapez "DESTROY" pour confirmer la destruction totale :');
      
      if (confirmation === 'DESTROY') {
        try {
          setSystemStatus(prev => ({ ...prev, backdoorDetection: 'DESTRUCTION EN COURS' }));
          
          // Simulation de la destruction
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          alert('💥 PROTOCOLE RED BUTTON ACTIVÉ !\n\nToutes les données ont été détruites.\nLe système est maintenant inutilisable.\n\nSentinel Zero - Mission Accomplie.');
          
          // Reset complet
          setIsAuthenticated(false);
          setShowLogin(true);
          setScanResults(null);
          setSystemStatus({
            backdoorDetection: 'DESTROYED',
            reconnaissance: 'DESTROYED',
            vulnerabilityTest: 'DESTROYED',
            configuration: 'DESTROYED',
            securityLogs: 'DESTROYED',
            performanceTest: 'DESTROYED'
          });
          
        } catch (error) {
          console.error('Red button error:', error);
          alert('❌ Erreur lors de l\'activation du Red Button');
        }
      } else {
        alert('❌ Confirmation incorrecte. Red Button désactivé.');
      }
    }
  };

  if (showSeigneurBypass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">🚀 BYPASS SEIGNEUR</h2>
            <p className="text-purple-300">Accès direct au système Sentinel Zero</p>
          </div>

          <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <p className="text-purple-200 text-sm mb-2">Code Seigneur :</p>
            <code className="text-purple-400 font-mono text-lg">{SEIGNEUR_MASTER_CODE}</code>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-purple-300 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Entrez le Code Seigneur
            </label>
            <input
              type="password"
              value={seigneurCode}
              onChange={(e) => setSeigneurCode(e.target.value)}
              className="w-full p-3 bg-black/20 border border-purple-500/30 rounded-lg text-white"
              placeholder="Code Seigneur"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSeigneurBypass}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg mb-3"
          >
            <Zap className="w-4 h-4 mr-2 inline" />
            ACTIVER BYPASS SEIGNEUR
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSeigneurBypass(false)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Retour à l'authentification standard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-red-500/30 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Sentinel Zero</h2>
            <p className="text-red-300">Authentification 5 Niveaux Requise</p>
          </div>

          <div className="space-y-4 mb-6">
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
                placeholder="Code maître d'accès"
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
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Shield className="w-4 h-4 mr-2 inline" />
              Authentification 5 Niveaux
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSeigneurBypass(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2 inline" />
              🚀 BYPASS SEIGNEUR - Accès Direct
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
              onClick={() => window.location.href = '/sentinel-zero/dashboard'}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Target className="h-4 w-4 mr-2 inline" />
              🚀 DASHBOARD MILITAIRE OPÉRATIONNEL
              <span className="ml-2 text-xs bg-green-800 px-2 py-1 rounded">
                ACCÈS DIRECT
              </span>
            </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReconnaissance}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2 inline" />
                Reconnaissance
                <span className="ml-2 text-xs bg-blue-800 px-2 py-1 rounded">
                  {systemStatus.reconnaissance}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVulnerabilityTest}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <AlertTriangle className="h-4 w-4 mr-2 inline" />
                Test de Vulnérabilité
                <span className="ml-2 text-xs bg-yellow-800 px-2 py-1 rounded">
                  {systemStatus.vulnerabilityTest}
                </span>
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
                onClick={handleConfiguration}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Settings className="h-4 w-4 mr-2 inline" />
                Configuration
                <span className="ml-2 text-xs bg-green-800 px-2 py-1 rounded">
                  {systemStatus.configuration}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSecurityLogs}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Shield className="h-4 w-4 mr-2 inline" />
                Logs de Sécurité
                <span className="ml-2 text-xs bg-purple-800 px-2 py-1 rounded">
                  {systemStatus.securityLogs}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePerformanceTest}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Zap className="h-4 w-4 mr-2 inline" />
                Test de Performance
                <span className="ml-2 text-xs bg-orange-800 px-2 py-1 rounded">
                  {systemStatus.performanceTest}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Résultats des scans */}
        {scanResults && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Résultats du Scan
            </h3>
            <div className="bg-black/20 p-4 rounded-lg">
              <pre className="text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(scanResults, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}

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
            <Trash2 className="h-4 w-4 mr-2 inline" />
            Red Button
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
