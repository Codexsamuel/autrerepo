'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { 
  Bell, 
  BellOff, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X, 
  Settings, 
  Filter,
  Archive,
  Star,
  Clock,
  User,
  Mail,
  Calendar,
  Target,
  Zap,
  Brain,
  Eye,
  EyeOff,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'urgent';
  category: 'system' | 'user' | 'business' | 'ai' | 'reminder';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
  starred: boolean;
  actionable: boolean;
  action?: {
    label: string;
    type: 'link' | 'button' | 'dismiss';
    url?: string;
  };
  aiInsight?: string;
  expiresAt?: Date;
  sender?: string;
  metadata?: {
    [key: string]: any;
  };
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  categories: {
    [key: string]: boolean;
  };
  priority: {
    [key: string]: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function IntelligentNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    desktop: true,
    email: false,
    categories: {
      system: true,
      user: true,
      business: true,
      ai: true,
      reminder: true
    },
    priority: {
      low: true,
      medium: true,
      high: true,
      critical: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const loadNotifications = () => {
    // Notifications d'exemple
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'Rapport mensuel prêt',
        message: 'Le rapport de ventes de juin est maintenant disponible pour révision.',
        type: 'success',
        category: 'business',
        priority: 'medium',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        starred: false,
        actionable: true,
        action: {
          label: 'Voir le rapport',
          type: 'link',
          url: '/reports/monthly'
        },
        aiInsight: 'Ce rapport montre une amélioration de 15% par rapport au mois dernier.',
        sender: 'Système RH'
      },
      {
        id: '2',
        title: 'Maintenance système prévue',
        message: 'Une maintenance est prévue ce soir de 23h à 02h. Certains services peuvent être temporairement indisponibles.',
        type: 'warning',
        category: 'system',
        priority: 'high',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        starred: true,
        actionable: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Optimisation IA détectée',
        message: 'L\'IA a identifié une opportunité d\'optimisation dans vos processus de facturation.',
        type: 'info',
        category: 'ai',
        priority: 'medium',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        starred: false,
        actionable: true,
        action: {
          label: 'Analyser',
          type: 'button'
        },
        aiInsight: 'Cette optimisation pourrait réduire les coûts de 8% et améliorer l\'efficacité de 12%.',
        sender: 'Assistant IA'
      },
      {
        id: '4',
        title: 'Rappel: Réunion équipe',
        message: 'Réunion hebdomadaire de l\'équipe dans 30 minutes.',
        type: 'info',
        category: 'reminder',
        priority: 'high',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        read: false,
        starred: false,
        actionable: true,
        action: {
          label: 'Rejoindre',
          type: 'link',
          url: '/meeting/team-weekly'
        },
        expiresAt: new Date(Date.now() + 30 * 60 * 1000)
      },
      {
        id: '5',
        title: 'Erreur critique détectée',
        message: 'Une erreur critique a été détectée dans le système de paiement. Intervention immédiate requise.',
        type: 'error',
        category: 'system',
        priority: 'critical',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        starred: true,
        actionable: true,
        action: {
          label: 'Intervenir',
          type: 'button'
        },
        sender: 'Système de monitoring'
      }
    ];

    setNotifications(sampleNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const toggleStar = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, starred: !notification.starred } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const archiveNotifications = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
      case 'urgent':
        return AlertTriangle;
      case 'info':
      default:
        return Info;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'info':
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'system':
        return Zap;
      case 'user':
        return User;
      case 'business':
        return Target;
      case 'ai':
        return Brain;
      case 'reminder':
        return Calendar;
      default:
        return Bell;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'starred') return notification.starred;
    return notification.category === filter;
  });

  const handleAction = (notification: Notification) => {
    if (notification.action?.type === 'link' && notification.action.url) {
      window.open(notification.action.url, '_blank');
    }
    if (notification.action?.type === 'button') {
      // Gérer l'action du bouton
      console.log('Action button clicked:', notification.action.label);
    }
    if (notification.action?.type === 'dismiss') {
      deleteNotification(notification.id);
    }
    markAsRead(notification.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-8 h-8 text-gray-600" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </motion.div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications Intelligentes</h2>
            <p className="text-gray-600">Gestion intelligente des alertes avec IA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Tout marquer comme lu
          </motion.button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg border overflow-hidden"
          >
            <h3 className="text-lg font-semibold mb-4">Paramètres des notifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Général</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.enabled}
                      onChange={(e) => setSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Activer les notifications</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.sound}
                      onChange={(e) => setSettings(prev => ({ ...prev, sound: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Son</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.desktop}
                      onChange={(e) => setSettings(prev => ({ ...prev, desktop: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Notifications bureau</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Heures silencieuses</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.quietHours.enabled}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, enabled: e.target.checked }
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm">Activer les heures silencieuses</span>
                  </label>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, start: e.target.value }
                      }))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-sm">à</span>
                    <input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, end: e.target.value }
                      }))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Toutes les notifications</option>
          <option value="unread">Non lues</option>
          <option value="starred">Favoris</option>
          <option value="system">Système</option>
          <option value="business">Business</option>
          <option value="ai">IA</option>
          <option value="reminder">Rappels</option>
        </select>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={archiveNotifications}
          className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          <Archive className="w-4 h-4 inline mr-1" />
          Archiver les lues
        </motion.button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.type);
            const CategoryIcon = getCategoryIcon(notification.category);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white p-4 rounded-xl shadow-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h4>
                        {notification.starred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <CategoryIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleStar(notification.id)}
                          className="text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                          <Star className={`w-4 h-4 ${notification.starred ? 'text-yellow-500 fill-current' : ''}`} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                    
                    {notification.aiInsight && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Insight IA</span>
                        </div>
                        <p className="text-sm text-blue-700">{notification.aiInsight}</p>
                      </div>
                    )}
                    
                    {notification.sender && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <User className="w-3 h-3" />
                        {notification.sender}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.timestamp.toLocaleDateString()}
                        </div>
                        {notification.expiresAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Expire le {notification.expiresAt.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Marquer comme lu
                          </motion.button>
                        )}
                        
                        {notification.actionable && notification.action && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(notification)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            {notification.action.label}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <BellOff className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'Vous êtes à jour ! Aucune nouvelle notification.'
              : 'Aucune notification ne correspond à ce filtre.'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
} 