"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    AlertTriangle,
    Atom,
    BarChart3,
    Brain,
    Bug,
    CheckCircle,
    Cloud,
    Cpu,
    Eye,
    FileText,
    Globe,
    Key,
    Lock,
    Network,
    Search,
    Server,
    Settings,
    Shield,
    ShieldCheck,
    Target,
    User,
    Users,
    Wifi,
    XCircle,
    Zap
} from "lucide-react";
import { useEffect, useState } from 'react';

export default function SentinelZeroPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('initializing');
  const [authLevel, setAuthLevel] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const [activeModules, setActiveModules] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    security: 0
  });
  const [currentTarget, setCurrentTarget] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [threatLevel, setThreatLevel] = useState('low');
  const [activeThreats, setActiveThreats] = useState<any[]>([]);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSystemStatus('active');
    }, 3000);

    // Simulation des métriques système
    const metricsInterval = setInterval(() => {
      setSystemMetrics({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        network: Math.random() * 100,
        security: Math.random() * 100
      });
    }, 2000);

    // Simulation des logs système
    const logsInterval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'][Math.floor(Math.random() * 4)],
        message: [
          'Scan de vulnérabilité terminé',
          'Nouvelle menace détectée',
          'Mise à jour des signatures antivirus',
          'Analyse comportementale en cours',
          'Protocole de sécurité activé',
          'Backup automatique effectué',
          'Monitoring réseau actif',
          'Détection d\'intrusion en cours'
        ][Math.floor(Math.random() * 8)],
        module: ['Reconnaissance', 'SQL Injection', 'XSS Detection', 'Brute Force', 'OSINT'][Math.floor(Math.random() * 5)]
      };
      setSystemLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(metricsInterval);
      clearInterval(logsInterval);
    };
  }, []);

  const modules = [
    {
      id: 'recon',
      name: 'Reconnaissance',
      icon: <Eye className="h-6 w-6" />,
      description: 'WHOIS, DNS, IP, HTTP headers, Port scanning',
      status: 'active',
      color: 'from-blue-500 to-blue-600',
      progress: 100,
      features: ['WHOIS Lookup', 'DNS Enumeration', 'Port Scanning', 'Service Detection', 'Subdomain Discovery']
    },
    {
      id: 'sql',
      name: 'SQL Injection',
      icon: <Target className="h-6 w-6" />,
      description: 'Tests automatisés SQLMap, Blind SQL, Time-based',
      status: 'active',
      color: 'from-red-500 to-red-600',
      progress: 100,
      features: ['Automated SQLMap', 'Blind SQL Injection', 'Time-based SQL', 'Union-based SQL', 'Error-based SQL']
    },
    {
      id: 'xss',
      name: 'XSS Detection',
      icon: <AlertTriangle className="h-6 w-6" />,
      description: 'Détection et exploitation XSS, DOM-based, Stored',
      status: 'active',
      color: 'from-yellow-500 to-yellow-600',
      progress: 100,
      features: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS', 'XSS Filter Bypass', 'Payload Generation']
    },
    {
      id: 'brute',
      name: 'Brute Force',
      icon: <Zap className="h-6 w-6" />,
      description: 'Tests de force brute, dictionnaires personnalisés',
      status: 'active',
      color: 'from-purple-500 to-purple-600',
      progress: 100,
      features: ['Password Cracking', 'Username Enumeration', 'Custom Dictionaries', 'Rate Limiting Bypass', 'Session Hijacking']
    },
    {
      id: 'osint',
      name: 'OSINT',
      icon: <Users className="h-6 w-6" />,
      description: 'Intelligence open source, social media, dark web',
      status: 'active',
      color: 'from-green-500 to-green-600',
      progress: 100,
      features: ['Social Media Analysis', 'Dark Web Monitoring', 'Email Intelligence', 'Phone Number Lookup', 'Company Intelligence']
    },
    {
      id: 'malware',
      name: 'Malware Analysis',
      icon: <Bug className="h-6 w-6" />,
      description: 'Analyse de malware, sandboxing, signature detection',
      status: 'active',
      color: 'from-orange-500 to-orange-600',
      progress: 100,
      features: ['Static Analysis', 'Dynamic Analysis', 'Sandboxing', 'Signature Detection', 'Behavioral Analysis']
    },
    {
      id: 'network',
      name: 'Network Security',
      icon: <Network className="h-6 w-6" />,
      description: 'Analyse réseau, sniffing, man-in-the-middle',
      status: 'active',
      color: 'from-cyan-500 to-cyan-600',
      progress: 100,
      features: ['Packet Sniffing', 'ARP Spoofing', 'DNS Spoofing', 'Network Mapping', 'Traffic Analysis']
    },
    {
      id: 'webapp',
      name: 'Web Application',
      icon: <Globe className="h-6 w-6" />,
      description: 'Tests d\'applications web, API security',
      status: 'active',
      color: 'from-indigo-500 to-indigo-600',
      progress: 100,
      features: ['API Security Testing', 'Authentication Bypass', 'Authorization Testing', 'Input Validation', 'Session Management']
    },
    {
      id: 'wireless',
      name: 'Wireless Security',
      icon: <Wifi className="h-6 w-6" />,
      description: 'Tests WiFi, Bluetooth, RFID security',
      status: 'active',
      color: 'from-pink-500 to-pink-600',
      progress: 100,
      features: ['WiFi Cracking', 'Bluetooth Security', 'RFID Cloning', 'Signal Jamming', 'Rogue Access Points']
    },
    {
      id: 'forensics',
      name: 'Digital Forensics',
      icon: <Search className="h-6 w-6" />,
      description: 'Analyse forensique, récupération de données',
      status: 'active',
      color: 'from-teal-500 to-teal-600',
      progress: 100,
      features: ['Memory Analysis', 'Disk Imaging', 'File Recovery', 'Timeline Analysis', 'Evidence Preservation']
    },
    {
      id: 'crypto',
      name: 'Cryptography',
      icon: <Key className="h-6 w-6" />,
      description: 'Tests cryptographiques, certificats SSL/TLS',
      status: 'active',
      color: 'from-emerald-500 to-emerald-600',
      progress: 100,
      features: ['SSL/TLS Testing', 'Certificate Analysis', 'Weak Cipher Detection', 'Key Management', 'Hash Cracking']
    },
    {
      id: 'social',
      name: 'Social Engineering',
      icon: <User className="h-6 w-6" />,
      description: 'Tests d\'ingénierie sociale, phishing',
      status: 'active',
      color: 'from-rose-500 to-rose-600',
      progress: 100,
      features: ['Phishing Campaigns', 'Pretexting', 'Baiting', 'Quid Pro Quo', 'Tailgating']
    }
  ];

  const advancedModules = [
    {
      id: 'ai-threat',
      name: 'AI Threat Detection',
      icon: <Brain className="h-6 w-6" />,
      description: 'Détection de menaces par IA, analyse comportementale',
      status: 'active',
      color: 'from-violet-500 to-violet-600',
      progress: 100
    },
    {
      id: 'quantum',
      name: 'Quantum Security',
      icon: <Atom className="h-6 w-6" />,
      description: 'Tests de sécurité quantique, cryptographie post-quantique',
      status: 'active',
      color: 'from-fuchsia-500 to-fuchsia-600',
      progress: 100
    },
    {
      id: 'iot',
      name: 'IoT Security',
      icon: <Server className="h-6 w-6" />,
      description: 'Tests de sécurité IoT, vulnérabilités embarquées',
      status: 'active',
      color: 'from-slate-500 to-slate-600',
      progress: 100
    },
    {
      id: 'cloud',
      name: 'Cloud Security',
      icon: <Cloud className="h-6 w-6" />,
      description: 'Tests de sécurité cloud, configuration AWS/Azure',
      status: 'active',
      color: 'from-sky-500 to-sky-600',
      progress: 100
    }
  ];

  const handleScan = async () => {
    if (!currentTarget.trim()) {
      setCurrentTarget('example.com');
    }
    
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulation d'un scan progressif
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          
          // Résultats du scan
          setScanResults({
            target: currentTarget || 'example.com',
            status: 'completed',
            timestamp: new Date().toISOString(),
            vulnerabilities: [
              { type: 'SQL Injection', severity: 'high', status: 'fixed', cve: 'CVE-2024-001', description: 'Vulnérabilité SQL injection détectée dans le formulaire de connexion' },
              { type: 'XSS', severity: 'medium', status: 'open', cve: 'CVE-2024-002', description: 'Cross-site scripting détecté dans le champ de recherche' },
              { type: 'Brute Force', severity: 'low', status: 'fixed', cve: 'CVE-2024-003', description: 'Protection contre la force brute activée' },
              { type: 'Weak SSL', severity: 'medium', status: 'open', cve: 'CVE-2024-004', description: 'Configuration SSL faible détectée' },
              { type: 'Directory Traversal', severity: 'high', status: 'fixed', cve: 'CVE-2024-005', description: 'Vulnérabilité de traversée de répertoire corrigée' }
            ],
            recommendations: [
              'Mettre à jour les certificats SSL',
              'Implémenter une validation d\'entrée stricte',
              'Activer la protection CSRF',
              'Configurer un WAF',
              'Auditer régulièrement les logs'
            ]
          });
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-400';
      case 'WARNING': return 'text-yellow-400';
      case 'ERROR': return 'text-orange-400';
      case 'CRITICAL': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Particules animées */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
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
            className="w-24 h-24 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Sentinel Zero
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-red-400 text-lg"
          >
            Initialisation du système Red Team IA...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 space-y-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Authentification 5 niveaux en cours...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Modules d'attaque en chargement...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Protocole Red Button activé...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Système Sentinel Zero 100% opérationnel...</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
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
        className="bg-black/20 backdrop-blur-lg border-b border-red-500/30 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mr-3 flex items-center justify-center shadow-lg"
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sentinel Zero</h1>
                <p className="text-red-400 text-sm">Agent Red Team IA Ultra-Avancé - 100% Opérationnel</p>
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
                <span className="text-red-400 text-sm">Niveau d'accès: {authLevel}/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${getThreatLevelColor(threatLevel)}`}>
                  Niveau de menace: {threatLevel.toUpperCase()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthLevel(Math.min(authLevel + 1, 5))}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                <Lock className="h-4 w-4 mr-2 inline" />
                Accès Sécurisé
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Métriques système */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'CPU', value: systemMetrics.cpu, icon: <Cpu className="h-6 w-6" />, color: 'from-blue-500 to-blue-600' },
            { label: 'Mémoire', value: systemMetrics.memory, icon: <Memory className="h-6 w-6" />, color: 'from-green-500 to-green-600' },
            { label: 'Réseau', value: systemMetrics.network, icon: <Network className="h-6 w-6" />, color: 'from-purple-500 to-purple-600' },
            { label: 'Sécurité', value: systemMetrics.security, icon: <ShieldCheck className="h-6 w-6" />, color: 'from-red-500 to-red-600' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 hover:bg-black/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
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
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Configuration du scan */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-red-400" />
            Configuration du Scan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Cible</label>
              <input
                type="text"
                value={currentTarget}
                onChange={(e) => setCurrentTarget(e.target.value)}
                placeholder="exemple.com"
                className="w-full bg-black/30 border border-red-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Type de Scan</label>
              <select className="w-full bg-black/30 border border-red-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                <option>Scan Complet</option>
                <option>Scan Rapide</option>
                <option>Scan Ciblé</option>
                <option>Scan Furtif</option>
              </select>
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg"
              >
                {isScanning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Scanning... {scanProgress.toFixed(0)}%
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
          {isScanning && (
            <div className="mt-4">
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full shadow-lg"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Modules d'attaque */}
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
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3"
            >
              <Settings className="h-4 w-4 text-white" />
            </motion.div>
            Modules d'Attaque (100% Opérationnels)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 hover:bg-black/30 transition-all duration-300 shadow-lg"
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
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full shadow-lg"
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-red-400 text-sm font-semibold">{module.progress}%</span>
                </div>
                <div className="mt-3">
                  <details className="text-xs">
                    <summary className="text-gray-400 cursor-pointer hover:text-white">Fonctionnalités</summary>
                    <ul className="mt-2 space-y-1 text-gray-500">
                      {module.features?.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modules avancés */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            Modules Avancés IA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 hover:bg-black/30 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    {module.icon}
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white shadow-lg">
                    {module.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{module.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{module.description}</p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full shadow-lg"
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-purple-400 text-sm font-semibold">{module.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Résultats du scan */}
        <AnimatePresence>
          {scanResults && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-400" />
                Résultats du Scan - {scanResults.target}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Vulnérabilités Détectées</h4>
                  <div className="space-y-2">
                    {scanResults.vulnerabilities.map((vuln, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-black/20 rounded-lg border border-red-500/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {vuln.status === 'fixed' ? (
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 mr-2" />
                            )}
                            <span className="text-white font-medium">{vuln.type}</span>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full shadow-lg ${
                            vuln.severity === 'high' ? 'bg-red-500 text-white' :
                            vuln.severity === 'medium' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          }`}>
                            {vuln.severity}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-1">{vuln.description}</p>
                        <p className="text-gray-500 text-xs">CVE: {vuln.cve}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Recommandations</h4>
                  <div className="space-y-2">
                    {scanResults.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-2 p-3 bg-black/20 rounded-lg border border-blue-500/20"
                      >
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logs système */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-400" />
              Logs Système
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-2 p-2 bg-black/20 rounded border border-gray-700">
                  <span className="text-gray-500 text-xs flex-shrink-0">{log.timestamp}</span>
                  <span className={`text-xs font-semibold ${getLogLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-gray-300 text-xs flex-1">{log.message}</span>
                  <span className="text-gray-500 text-xs flex-shrink-0">{log.module}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
              Statistiques
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scans effectués</span>
                <span className="text-white font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Vulnérabilités trouvées</span>
                <span className="text-white font-semibold">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Taux de détection</span>
                <span className="text-green-400 font-semibold">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temps moyen de scan</span>
                <span className="text-white font-semibold">2m 34s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Système opérationnel</span>
                <span className="text-green-400 font-semibold">100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Red Button */}
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
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
              disabled
            >
              <AlertTriangle className="h-4 w-4 mr-2 inline" />
              Red Button (Désactivé)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <CheckCircle className="h-4 w-4 mr-2 inline" />
              Système 100% Opérationnel
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
