'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Shield, 
  Eye, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  User,
  Building,
  DollarSign,
  Calendar
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  propertyId?: string;
  userId?: string;
  evidence: any;
  timestamp: string;
  resolved: boolean;
  aiAnalysis: {
    confidence: number;
    recommendations: string[];
    riskFactors: string[];
  };
}

interface PropertyActivity {
  id: string;
  propertyId: string;
  type: string;
  userId: string;
  userRole: string;
  action: string;
  details: any;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  deviceInfo: {
    type: 'mobile' | 'desktop' | 'tablet';
    os: string;
    browser: string;
    screenResolution: string;
  };
  riskScore: number;
  flagged: boolean;
}

interface NotificationData {
  id: string;
  type: string;
  priority: string;
  title: string;
  message: string;
  data: any;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  aiAnalysis?: {
    riskScore: number;
    recommendations: string[];
    urgency: string;
  };
}

export default function SurveillanceDashboard() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [activities, setActivities] = useState<PropertyActivity[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    activeAlerts: 0,
    flaggedActivities: 0,
    riskLevel: 'low' as string
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Rafraîchir toutes les 30 secondes
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      // Charger les données de surveillance
      const [alertsRes, activitiesRes, notificationsRes, statsRes] = await Promise.all([
        fetch('/api/admin/security-alerts'),
        fetch('/api/admin/property-activities'),
        fetch('/api/admin/notifications'),
        fetch('/api/admin/monitoring-stats')
      ]);

      if (alertsRes.ok) setAlerts(await alertsRes.json());
      if (activitiesRes.ok) setActivities(await activitiesRes.json());
      if (notificationsRes.ok) setNotifications(await notificationsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());

    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/admin/resolve-alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId, resolution: 'Résolu par admin' })
      });

      if (response.ok) {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
        loadData();
      }
    } catch (error) {
      console.error('Erreur résolution alerte:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activités Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activités Signalées</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.flaggedActivities}</div>
            <p className="text-xs text-muted-foreground">À vérifier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niveau de Risque</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskLevelColor(stats.riskLevel)}`}>
              {stats.riskLevel.toUpperCase()}
            </div>
            <p className="text-xs text-muted-foreground">Système</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets principaux */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alertes de Sécurité ({alerts.filter(a => !a.resolved).length})
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Activités ({activities.length})
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications ({notifications.filter(n => !n.read).length})
          </TabsTrigger>
        </TabsList>

        {/* Onglet Alertes */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {alerts.filter(alert => !alert.resolved).map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-red-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{alert.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Résoudre
                    </Button>
                  </div>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-2">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Analyse IA</h4>
                      <div className="space-y-1 text-xs">
                        <p>Confiance: {(alert.aiAnalysis.confidence * 100).toFixed(1)}%</p>
                        <p>Facteurs de risque: {alert.aiAnalysis.riskFactors.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Recommandations</h4>
                      <ul className="text-xs space-y-1">
                        {alert.aiAnalysis.recommendations.map((rec, index) => (
                          <li key={index}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>ID: {alert.id}</p>
                    <p>Timestamp: {new Date(alert.timestamp).toLocaleString()}</p>
                    {alert.propertyId && <p>Propriété: {alert.propertyId}</p>}
                    {alert.userId && <p>Utilisateur: {alert.userId}</p>}
                  </div>
                </AlertDescription>
              </Alert>
            ))}

            {alerts.filter(alert => !alert.resolved).length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-muted-foreground">Aucune alerte active</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Onglet Activités */}
        <TabsContent value="activities" className="space-y-4">
          <div className="grid gap-4">
            {activities.map((activity) => (
              <Card key={activity.id} className={activity.flagged ? 'border-l-4 border-l-orange-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">{activity.userId}</span>
                      <Badge variant="outline">{activity.userRole}</Badge>
                      {activity.flagged && (
                        <Badge className="bg-orange-500 text-white">Signalé</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getDeviceIcon(activity.deviceInfo.type)}
                      <span>{activity.deviceInfo.os}</span>
                      <span>•</span>
                      <span>{activity.deviceInfo.browser}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>Propriété: {activity.propertyId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location.city}, {activity.location.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Risque: {(activity.riskScore * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    {activity.details && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <pre>{JSON.stringify(activity.details, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Onglet Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={!notification.read ? 'border-l-4 border-l-blue-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span className="font-semibold">{notification.title}</span>
                      <Badge className={getSeverityColor(notification.priority)}>
                        {notification.priority.toUpperCase()}
                      </Badge>
                      {notification.actionRequired && (
                        <Badge className="bg-red-500 text-white">Action Requise</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{notification.message}</p>
                  
                  {notification.aiAnalysis && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-muted rounded">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Analyse IA</h4>
                        <div className="space-y-1 text-xs">
                          <p>Risque: {(notification.aiAnalysis.riskScore * 100).toFixed(1)}%</p>
                          <p>Urgence: {notification.aiAnalysis.urgency}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Recommandations</h4>
                        <ul className="text-xs space-y-1">
                          {notification.aiAnalysis.recommendations.map((rec, index) => (
                            <li key={index}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Type: {notification.type}</p>
                    <p>ID: {notification.id}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 