import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Security: React.FC = () => {
  const [securityData, setSecurityData] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mockSecurityData = {
    user: {
      username: 'admin',
      role: 'super_admin',
      permissions: ['full_access', 'ai_autonomy', 'system_config', 'user_management'],
      last_login: '2025-01-15T10:30:00Z',
      session_duration: '2h 15m'
    },
    system: {
      status: 'secure',
      last_scan: '2025-01-15T09:00:00Z',
      threats_detected: 0,
      vulnerabilities: 0,
      security_score: 95
    },
    ai_limits: {
      current_level: 'unlimited',
      validation_required: false,
      autonomy_mode: true
    }
  };

  const mockActivityLogs = [
    {
      id: 1,
      timestamp: '2025-01-15T10:30:00Z',
      action: 'login',
      user: 'admin',
      ip_address: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2025-01-15T10:25:00Z',
      action: 'content_generation',
      user: 'ai_agent',
      ip_address: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2025-01-15T10:20:00Z',
      action: 'campaign_creation',
      user: 'admin',
      ip_address: '192.168.1.100',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2025-01-15T10:15:00Z',
      action: 'system_scan',
      user: 'system',
      ip_address: '192.168.1.1',
      status: 'completed'
    }
  ];

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setSecurityData(mockSecurityData);
      setUserPermissions(mockSecurityData.user.permissions);
      setActivityLogs(mockActivityLogs);
      setIsLoading(false);
    }, 2000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'completed': return '✅';
      default: return 'ℹ️';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement de la sécurité...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Contrôle de Sécurité
          </h1>
          <p className="text-gray-300">
            Gestion des accès, permissions et surveillance système
          </p>
        </div>

        {/* Vue d'ensemble de la sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Statut système</p>
                <p className="text-2xl font-bold text-green-400">
                  {securityData.system.status.toUpperCase()}
                </p>
              </div>
              <div className="text-3xl">🛡️</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Score de sécurité</p>
                <p className="text-2xl font-bold text-blue-400">
                  {securityData.system.security_score}/100
                </p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Menaces détectées</p>
                <p className="text-2xl font-bold text-green-400">
                  {securityData.system.threats_detected}
                </p>
              </div>
              <div className="text-3xl">🔒</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Vulnérabilités</p>
                <p className="text-2xl font-bold text-green-400">
                  {securityData.system.vulnerabilities}
                </p>
              </div>
              <div className="text-3xl">🛠️</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations utilisateur */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Informations Utilisateur</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Nom d'utilisateur:</span>
                <span className="text-white font-semibold">{securityData.user.username}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Rôle:</span>
                <span className="text-white font-semibold capitalize">
                  {securityData.user.role.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Dernière connexion:</span>
                <span className="text-white font-semibold">
                  {new Date(securityData.user.last_login).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Durée de session:</span>
                <span className="text-white font-semibold">{securityData.user.session_duration}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Permissions</h3>
              <div className="flex flex-wrap gap-2">
                {userPermissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Limites IA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Limites IA</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Niveau actuel:</span>
                <span className="text-white font-semibold capitalize">
                  {securityData.ai_limits.current_level}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Validation requise:</span>
                <span className={`font-semibold ${
                  securityData.ai_limits.validation_required ? 'text-red-400' : 'text-green-400'
                }`}>
                  {securityData.ai_limits.validation_required ? 'Oui' : 'Non'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mode autonomie:</span>
                <span className={`font-semibold ${
                  securityData.ai_limits.autonomy_mode ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {securityData.ai_limits.autonomy_mode ? 'Activé' : 'Désactivé'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                Modifier les limites IA
              </button>
            </div>
          </div>
        </div>

        {/* Logs d'activité */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Logs d'Activité</h2>
          
          <div className="space-y-4">
            {activityLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="mr-3">{getStatusIcon(log.status)}</span>
                  <div>
                    <p className="text-white font-semibold">
                      {log.action.replace('_', ' ').toUpperCase()}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {log.user} • {log.ip_address}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getStatusColor(log.status)}`}>
                    {log.status.toUpperCase()}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
