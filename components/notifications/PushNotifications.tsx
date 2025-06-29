"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Zap, TrendingUp, Gift, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'boost' | 'match' | 'bonus' | 'win' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    url: string;
  };
  data?: {
    matchId?: string;
    odds?: number;
    boostValue?: number;
    bonusAmount?: number;
  };
}

export default function PushNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    boosts: true,
    newMatches: true,
    bonuses: true,
    wins: true,
    system: false
  });

  // Notifications de démonstration
  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: '1',
        type: 'boost',
        title: '🔥 Cote Boostée !',
        message: 'PSG victoire boostée de 1.85 à 2.15 !',
        timestamp: new Date(Date.now() - 300000),
        isRead: false,
        action: { label: 'Parier maintenant', url: '/novacore/dl-bookmaker/nouveau' },
        data: { matchId: 'match1', odds: 2.15, boostValue: 16 }
      },
      {
        id: '2',
        type: 'match',
        title: '⚽ Nouveau match en direct',
        message: 'Real Madrid vs Barcelona commence dans 15min',
        timestamp: new Date(Date.now() - 600000),
        isRead: false,
        action: { label: 'Voir les cotes', url: '/novacore/dl-bookmaker' },
        data: { matchId: 'match2' }
      },
      {
        id: '3',
        type: 'bonus',
        title: '🎁 Bonus gratuit !',
        message: 'Freebet 10€ offert pour votre prochain pari',
        timestamp: new Date(Date.now() - 900000),
        isRead: false,
        action: { label: 'Récupérer', url: '/novacore/dl-bookmaker' },
        data: { bonusAmount: 10 }
      },
      {
        id: '4',
        type: 'win',
        title: '🎉 Pari gagné !',
        message: 'Félicitations ! Vous avez gagné 45€',
        timestamp: new Date(Date.now() - 1200000),
        isRead: true,
        data: { odds: 2.25 }
      },
      {
        id: '5',
        type: 'system',
        title: '🔧 Maintenance',
        message: 'Maintenance prévue ce soir de 2h à 4h',
        timestamp: new Date(Date.now() - 1800000),
        isRead: false
      }
    ];

    setNotifications(demoNotifications);
  }, []);

  const toggleNotifications = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      // Demander la permission pour les notifications push
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // Envoyer une notification de test
            new Notification('DL Bookmaker', {
              body: 'Notifications activées ! Vous recevrez les meilleures cotes.',
              icon: '/favicon.ico'
            });
          }
        });
      }
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'boost': return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'match': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'bonus': return <Gift className="h-4 w-4 text-green-600" />;
      case 'win': return <TrendingUp className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'boost': return 'bg-yellow-50 border-yellow-200';
      case 'match': return 'bg-blue-50 border-blue-200';
      case 'bonus': return 'bg-green-50 border-green-200';
      case 'win': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-blue-600" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant={isEnabled ? "default" : "outline"}
              size="sm"
              onClick={toggleNotifications}
              className="flex items-center gap-1"
            >
              {isEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              {isEnabled ? 'Activé' : 'Désactivé'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        {showSettings ? (
          <div className="p-4 space-y-4">
            <h3 className="font-semibold">Paramètres des notifications</h3>
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm capitalize">{key}</span>
                <Button
                  variant={value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, [key]: !value }))}
                >
                  {value ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune notification</p>
              </div>
            ) : (
              <>
                {unreadCount > 0 && (
                  <div className="p-3 bg-blue-50 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Marquer tout comme lu
                    </Button>
                  </div>
                )}
                
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b ${getNotificationColor(notification.type)} ${
                      !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{notification.timestamp.toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                            {notification.data?.boostValue && (
                              <Badge variant="outline" className="text-xs">
                                +{notification.data.boostValue}%
                              </Badge>
                            )}
                          </div>
                          {notification.action && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 