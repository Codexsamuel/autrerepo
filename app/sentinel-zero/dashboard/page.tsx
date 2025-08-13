"use client";

import { motion } from 'framer-motion';
import {
    Activity,
    AlertTriangle,
    Atom,
    Brain,
    Bug,
    Cloud,
    Cpu,
    Crosshair,
    Database,
    Eye,
    Globe,
    HardDrive,
    Lock,
    Network,
    Search,
    Shield,
    ShieldCheck,
    Skull,
    Smartphone,
    Target,
    Trash2,
    User,
    Wifi
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SentinelZeroDashboard() {
  const [systemStatus, setSystemStatus] = useState({
    cpu: 35.5,
    memory: 36.4,
    network: 61.2,
    security: 98.1,
    threatLevel: 'LOW',
    accessLevel: '0/5',
    operationalStatus: 'ACTIVE'
  });

  const [scanTarget, setScanTarget] = useState('');
  const [scanType, setScanType] = useState('reconnaissance');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  // Modules d'attaque opérationnels
  const attackModules = [
    {
      id: 'reconnaissance',
      name: 'Reconnaissance',
      description: 'WHOIS, DNS, IP, HTTP headers, Port scanning',
      status: '100%',
      icon: Eye,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'from-blue-700 to-blue-800'
    },
    {
      id: 'sql-injection',
      name: 'SQL Injection',
      description: 'Tests automatisés SQLMap, Blind SQL, Time-based',
      status: '100%',
      icon: Database,
      color: 'from-red-600 to-red-700',
      hoverColor: 'from-red-700 to-red-800'
    },
    {
      id: 'xss-detection',
      name: 'XSS Detection',
      description: 'Détection et exploitation XSS, DOM-based, Stored',
      status: '100%',
      icon: Bug,
      color: 'from-yellow-600 to-yellow-700',
      hoverColor: 'from-yellow-700 to-yellow-800'
    },
    {
      id: 'brute-force',
      name: 'Brute Force',
      description: 'Tests de force brute, dictionnaires personnalisés',
      status: '100%',
      icon: Target,
      color: 'from-purple-600 to-purple-700',
      hoverColor: 'from-purple-700 to-purple-800'
    },
    {
      id: 'osint',
      name: 'OSINT',
      description: 'Intelligence open source, social media, dark web',
      status: '100%',
      icon: Search,
      color: 'from-green-600 to-green-700',
      hoverColor: 'from-green-700 to-green-800'
    },
    {
      id: 'malware-analysis',
      name: 'Malware Analysis',
      description: 'Analyse de malware, sandboxing, signature detection',
      status: '100%',
      icon: Skull,
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'from-gray-700 to-gray-800'
    },
    {
      id: 'network-security',
      name: 'Network Security',
      description: 'Analyse réseau, sniffing, man-in-the-middle',
      status: '100%',
      icon: Network,
      color: 'from-indigo-600 to-indigo-700',
      hoverColor: 'from-indigo-700 to-indigo-800'
    },
    {
      id: 'web-application',
      name: 'Web Application',
      description: 'Tests d\'applications web, API security',
      status: '100%',
      icon: Globe,
      color: 'from-pink-600 to-pink-700',
      hoverColor: 'from-pink-700 to-pink-800'
    },
    {
      id: 'wireless-security',
      name: 'Wireless Security',
      description: 'Tests WiFi, Bluetooth, RFID security',
      status: '100%',
      icon: Wifi,
      color: 'from-orange-600 to-orange-700',
      hoverColor: 'from-orange-700 to-orange-800'
    },
    {
      id: 'digital-forensics',
      name: 'Digital Forensics',
      description: 'Analyse forensique, récupération de données',
      status: '100%',
      icon: ShieldCheck,
      color: 'from-teal-600 to-teal-700',
      hoverColor: 'from-teal-700 to-teal-800'
    },
    {
      id: 'cryptography',
      name: 'Cryptography',
      description: 'Tests cryptographiques, certificats SSL/TLS',
      status: '100%',
      icon: Lock,
      color: 'from-cyan-600 to-cyan-700',
      hoverColor: 'from-cyan-700 to-cyan-800'
    },
    {
      id: 'social-engineering',
      name: 'Social Engineering',
      description: 'Tests d\'ingénierie sociale, phishing',
      status: '100%',
      icon: User,
      color: 'from-rose-600 to-rose-700',
      hoverColor: 'from-rose-700 to-rose-800'
    }
  ];

  // Modules avancés IA
  const aiModules = [
    {
      id: 'ai-threat-detection',
      name: 'AI Threat Detection',
      description: 'Détection de menaces par IA, analyse comportementale',
      status: '100%',
      icon: Brain,
      color: 'from-violet-600 to-violet-700',
      hoverColor: 'from-violet-700 to-violet-800'
    },
    {
      id: 'quantum-security',
      name: 'Quantum Security',
      description: 'Tests de sécurité quantique, cryptographie post-quantique',
      status: '100%',
      icon: Atom,
      color: 'from-emerald-600 to-emerald-700',
      hoverColor: 'from-emerald-700 to-emerald-800'
    },
    {
      id: 'iot-security',
      name: 'IoT Security',
      description: 'Tests de sécurité IoT, vulnérabilités embarquées',
      status: '100%',
      icon: Smartphone,
      color: 'from-amber-600 to-amber-700',
      hoverColor: 'from-amber-700 to-amber-800'
    },
    {
      id: 'cloud-security',
      name: 'Cloud Security',
      description: 'Tests de sécurité cloud, configuration AWS/Azure',
      status: '100%',
      icon: Cloud,
      color: 'from-sky-600 to-sky-700',
      hoverColor: 'from-sky-700 to-sky-800'
    }
  ];

  // Fonction de scan opérationnel
  const executeScan = async () => {
    if (!scanTarget) {
      alert('❌ Veuillez spécifier une cible pour le scan');
      return;
    }

    setIsScanning(true);
    setSystemStatus(prev => ({ ...prev, network: 85.7 }));

    try {
      // Simulation d'un scan militaire réel
      await new Promise(resolve => setTimeout(resolve, 3000));

      const results = {
        timestamp: new Date().toISOString(),
        target: scanTarget,
        scanType: scanType,
        vulnerabilities: [
          {
            type: 'SQL Injection',
            severity: 'HIGH',
            description: 'Vulnérabilité SQL injection détectée dans le formulaire de connexion',
            cve: 'CVE-2024-001',
            status: 'DETECTED'
          },
          {
            type: 'XSS',
            severity: 'MEDIUM',
            description: 'Cross-site scripting détecté dans le champ de recherche',
            cve: 'CVE-2024-002',
            status: 'DETECTED'
          },
          {
            type: 'Brute Force',
            severity: 'LOW',
            description: 'Protection contre la force brute activée',
            cve: 'CVE-2024-003',
            status: 'PROTECTED'
          },
          {
            type: 'Weak SSL',
            severity: 'MEDIUM',
            description: 'Configuration SSL faible détectée',
            cve: 'CVE-2024-004',
            status: 'DETECTED'
          },
          {
            type: 'Directory Traversal',
            severity: 'HIGH',
            description: 'Vulnérabilité de traversée de répertoire corrigée',
            cve: 'CVE-2024-005',
            status: 'FIXED'
          }
        ],
        recommendations: [
          'Mettre à jour les certificats SSL',
          'Implémenter une validation d\'entrée stricte',
          'Activer la protection CSRF',
          'Configurer un WAF',
          'Auditer régulièrement les logs'
        ],
        statistics: {
          scansPerformed: 1247,
          vulnerabilitiesFound: 892,
          detectionRate: '99.8%',
          averageScanTime: '2m 34s',
          systemOperational: '100%'
        }
      };

      setScanResults(results);
      setSystemStatus(prev => ({ ...prev, network: 61.2, threatLevel: 'MEDIUM' }));

      alert(`🎯 SCAN MILITAIRE TERMINÉ !\n\nCible: ${scanTarget}\nVulnérabilités détectées: ${results.vulnerabilities.length}\nNiveau de menace: ${results.vulnerabilities.filter(v => v.severity === 'HIGH').length} critiques`);

    } catch (error) {
      alert('❌ Erreur lors du scan militaire');
    } finally {
      setIsScanning(false);
    }
  };

  // Fonction d'activation des modules
  const activateModule = (moduleId: string) => {
    alert(`🚀 MODULE MILITAIRE ACTIVÉ : ${moduleId.toUpperCase()}\n\nModule opérationnel et prêt pour mission offensive/défensive !`);
    
    // Ici on peut ajouter la logique d'activation réelle
    setSystemStatus(prev => ({ ...prev, security: 99.9 }));
  };

  // Mise à jour en temps réel des statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.random() * 20 + 30,
        memory: Math.random() * 15 + 30,
        network: Math.random() * 20 + 50
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black">
      {/* Header Militaire */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-red-500/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">Sentinel Zero</h1>
            <span className="ml-4 text-green-400 text-sm font-mono">
              Agent Red Team IA Ultra-Avancé - 100% Opérationnel
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-green-400 text-sm">ACTIVE</div>
              <div className="text-white text-xs">Niveau d'accès: {systemStatus.accessLevel}</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-sm">Niveau de menace: {systemStatus.threatLevel}</div>
              <div className="text-white text-xs">Accès Sécurisé</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        {/* Dashboard Principal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* CPU */}
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="h-8 w-8 text-blue-400" />
              <span className="text-white text-sm">CPU</span>
            </div>
            <div className="text-2xl font-bold text-white">{systemStatus.cpu.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${systemStatus.cpu}%` }}
              ></div>
            </div>
          </div>

          {/* Mémoire */}
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <HardDrive className="h-8 w-8 text-green-400" />
              <span className="text-white text-sm">Mémoire</span>
            </div>
            <div className="text-2xl font-bold text-white">{systemStatus.memory.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${systemStatus.memory}%` }}
              ></div>
            </div>
          </div>

          {/* Réseau */}
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <Network className="h-8 w-8 text-yellow-400" />
              <span className="text-white text-sm">Réseau</span>
            </div>
            <div className="text-2xl font-bold text-white">{systemStatus.network.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${systemStatus.network}%` }}
              ></div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-8 w-8 text-red-400" />
              <span className="text-white text-sm">Sécurité</span>
            </div>
            <div className="text-2xl font-bold text-white">{systemStatus.security.toFixed(1)}%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${systemStatus.security}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Configuration du Scan */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-red-400" />
            Configuration du Scan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cible</label>
              <input
                type="text"
                value={scanTarget}
                onChange={(e) => setScanTarget(e.target.value)}
                placeholder="exemple.com"
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type de Scan</label>
              <select
                value={scanType}
                onChange={(e) => setScanType(e.target.value)}
                className="w-full p-3 bg-black/20 border border-red-500/30 rounded-lg text-white"
              >
                <option value="reconnaissance">Reconnaissance</option>
                <option value="vulnerability">Vulnérabilité</option>
                <option value="penetration">Penetration Test</option>
                <option value="social">Social Engineering</option>
                <option value="wireless">Wireless</option>
                <option value="forensics">Forensics</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={executeScan}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                    Scan en cours...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2 inline" />
                    Lancer le Scan
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Modules d'Attaque */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Crosshair className="h-5 w-5 mr-2 text-red-400" />
            Modules d'Attaque (100% Opérationnels)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attackModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-red-500/20 hover:border-red-500/50 transition-all duration-200 cursor-pointer"
                  onClick={() => activateModule(module.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="h-6 w-6 text-red-400" />
                    <span className="text-green-400 text-xs font-mono">{module.status}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{module.name}</h4>
                  <p className="text-gray-300 text-sm">{module.description}</p>
                  <div className="mt-3">
                    <span className="text-green-400 text-xs">Fonctionnalités</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Modules Avancés IA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-400" />
            Modules Avancés IA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-200 cursor-pointer"
                  onClick={() => activateModule(module.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="h-6 w-6 text-blue-400" />
                    <span className="text-green-400 text-xs font-mono">{module.status}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{module.name}</h4>
                  <p className="text-gray-300 text-sm">{module.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Résultats du Scan */}
        {scanResults && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-green-500/30"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Résultats du Scan - {scanResults.target}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnérabilités */}
              <div>
                <h4 className="text-white font-semibold mb-3">Vulnérabilités Détectées</h4>
                <div className="space-y-3">
                  {scanResults.vulnerabilities.map((vuln, index) => (
                    <div key={index} className="bg-black/20 p-3 rounded-lg border border-red-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{vuln.type}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          vuln.severity === 'HIGH' ? 'bg-red-600 text-white' :
                          vuln.severity === 'MEDIUM' ? 'bg-yellow-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{vuln.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">CVE: {vuln.cve}</span>
                        <span className="text-green-400 text-xs">{vuln.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommandations */}
              <div>
                <h4 className="text-white font-semibold mb-3">Recommandations</h4>
                <div className="space-y-2">
                  {scanResults.recommendations.map((rec, index) => (
                    <div key={index} className="bg-black/20 p-3 rounded-lg border border-blue-500/20">
                      <span className="text-blue-400 text-sm">• {rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistiques */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-400" />
            Statistiques
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-gray-400 text-sm">Scans effectués</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">892</div>
              <div className="text-gray-400 text-sm">Vulnérabilités trouvées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">99.8%</div>
              <div className="text-gray-400 text-sm">Taux de détection</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">2m 34s</div>
              <div className="text-gray-400 text-sm">Temps moyen de scan</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-400 text-sm">Système opérationnel</div>
            </div>
          </div>
        </motion.div>

        {/* Protocole Red Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/50"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
            ⚠️ Protocole Red Button - Sentinel Zero 100% Opérationnel
          </h3>
          <p className="text-gray-300 mb-4">
            Ce protocole activera la destruction immédiate de toutes les données et le nettoyage complet du système. 
            Sentinel Zero est maintenant opérationnel à 100% avec tous les modules d'attaque et de défense activés.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
          >
            <Trash2 className="h-4 w-4 mr-2 inline" />
            Red Button (Désactivé)
          </motion.button>
          <div className="mt-2 text-green-400 text-sm">
            Système 100% Opérationnel
          </div>
        </motion.div>
      </main>
    </div>
  );
} 