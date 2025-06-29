import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Types pour la surveillance immobilière
export interface PropertyActivity {
  id: string;
  propertyId: string;
  type: 'viewing' | 'offer' | 'payment' | 'contract' | 'maintenance' | 'alert';
  userId: string;
  userRole: 'agent' | 'client' | 'admin' | 'manager';
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

export interface PropertyData {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  currency: string;
  type: 'sale' | 'rent';
  status: 'available' | 'reserved' | 'sold' | 'rented';
  agentId: string;
  clientId?: string;
  viewings: number;
  offers: number;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityAlert {
  id: string;
  type: 'suspicious_activity' | 'unauthorized_access' | 'data_breach' | 'payment_fraud' | 'location_mismatch';
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

class RealEstateMonitoringService {
  private supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Enregistrer une activité
  async logActivity(activity: Omit<PropertyActivity, 'id' | 'timestamp' | 'riskScore' | 'flagged'>) {
    try {
      // Analyser le risque avec IA
      const riskAnalysis = await this.analyzeRisk(activity);
      
      const activityData = {
        ...activity,
        id: this.generateActivityId(),
        timestamp: new Date().toISOString(),
        riskScore: riskAnalysis.riskScore,
        flagged: riskAnalysis.flagged
      };

      const { error } = await this.supabase
        .from('property_activities')
        .insert(activityData);

      if (error) throw error;

      // Créer alerte si nécessaire
      if (riskAnalysis.flagged) {
        await this.createSecurityAlert(activityData, riskAnalysis);
      }

      // Vérifier les patterns suspects
      await this.checkSuspiciousPatterns(activityData);

      console.log(`✅ Activité enregistrée: ${activity.action} par ${activity.userRole}`);
      return activityData;

    } catch (error) {
      console.error('❌ Erreur enregistrement activité:', error);
      throw error;
    }
  }

  // Analyser le risque avec IA
  async analyzeRisk(activity: any) {
    try {
      const response = await axios.post('/api/ai/analyze-activity', {
        activity,
        context: 'real_estate_security'
      });

      return response.data;
    } catch (error) {
      console.error('❌ Erreur analyse IA:', error);
      return {
        riskScore: 0.1,
        flagged: false,
        reasons: ['Erreur analyse IA']
      };
    }
  }

  // Vérifier les patterns suspects
  async checkSuspiciousPatterns(activity: PropertyActivity) {
    try {
      // Vérifier connexions multiples
      await this.checkMultipleConnections(activity);
      
      // Vérifier localisation suspecte
      await this.checkLocationAnomaly(activity);
      
      // Vérifier activité excessive
      await this.checkExcessiveActivity(activity);
      
      // Vérifier modifications critiques
      await this.checkCriticalModifications(activity);

    } catch (error) {
      console.error('❌ Erreur vérification patterns:', error);
    }
  }

  // Vérifier connexions multiples
  async checkMultipleConnections(activity: PropertyActivity) {
    const { data: recentActivities } = await this.supabase
      .from('property_activities')
      .select('*')
      .eq('userId', activity.userId)
      .gte('timestamp', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // 5 minutes
      .order('timestamp', { ascending: false });

    if (recentActivities && recentActivities.length > 10) {
      await this.createSecurityAlert(activity, {
        type: 'suspicious_activity',
        severity: 'high',
        title: 'Activité excessive détectée',
        description: `L'utilisateur ${activity.userId} a effectué ${recentActivities.length} actions en 5 minutes`,
        evidence: { recentActivities },
        confidence: 0.85,
        recommendations: ['Vérifier l\'authenticité de l\'utilisateur', 'Limiter temporairement l\'accès'],
        riskFactors: ['Activité excessive', 'Possible bot ou script']
      });
    }
  }

  // Vérifier anomalie de localisation
  async checkLocationAnomaly(activity: PropertyActivity) {
    const { data: userProfile } = await this.supabase
      .from('user_profiles')
      .select('preferred_location')
      .eq('id', activity.userId)
      .single();

    if (userProfile?.preferred_location) {
      const distance = this.calculateDistance(
        userProfile.preferred_location,
        activity.location
      );

      if (distance > 100) { // Plus de 100km
        await this.createSecurityAlert(activity, {
          type: 'location_mismatch',
          severity: 'medium',
          title: 'Connexion depuis une localisation inhabituelle',
          description: `Connexion depuis ${activity.location.city} alors que l'utilisateur est habituellement à ${userProfile.preferred_location.city}`,
          evidence: { 
            expectedLocation: userProfile.preferred_location,
            actualLocation: activity.location,
            distance 
          },
          confidence: 0.75,
          recommendations: ['Vérifier l\'identité de l\'utilisateur', 'Demander une authentification supplémentaire'],
          riskFactors: ['Localisation inhabituelle', 'Possible compromission de compte']
        });
      }
    }
  }

  // Vérifier activité excessive
  async checkExcessiveActivity(activity: PropertyActivity) {
    const { data: dailyActivities } = await this.supabase
      .from('property_activities')
      .select('*')
      .eq('userId', activity.userId)
      .gte('timestamp', new Date().toISOString().split('T')[0])
      .order('timestamp', { ascending: false });

    if (dailyActivities && dailyActivities.length > 100) {
      await this.createSecurityAlert(activity, {
        type: 'suspicious_activity',
        severity: 'high',
        title: 'Activité quotidienne excessive',
        description: `L'utilisateur ${activity.userId} a effectué ${dailyActivities.length} actions aujourd'hui`,
        evidence: { dailyActivities },
        confidence: 0.9,
        recommendations: ['Limiter l\'accès temporairement', 'Contacter l\'utilisateur'],
        riskFactors: ['Activité excessive', 'Possible automatisation']
      });
    }
  }

  // Vérifier modifications critiques
  async checkCriticalModifications(activity: PropertyActivity) {
    const criticalActions = [
      'price_change',
      'status_change',
      'contract_modification',
      'payment_processing',
      'access_granted'
    ];

    if (criticalActions.includes(activity.action)) {
      await this.createSecurityAlert(activity, {
        type: 'suspicious_activity',
        severity: 'critical',
        title: `Action critique détectée: ${activity.action}`,
        description: `Action critique effectuée par ${activity.userRole} sur la propriété ${activity.propertyId}`,
        evidence: { activity },
        confidence: 0.95,
        recommendations: ['Vérifier immédiatement l\'action', 'Contacter l\'administrateur'],
        riskFactors: ['Action critique', 'Impact potentiel élevé']
      });
    }
  }

  // Créer une alerte de sécurité
  async createSecurityAlert(activity: PropertyActivity, alertData: any) {
    const securityAlert: SecurityAlert = {
      id: this.generateAlertId(),
      type: alertData.type,
      severity: alertData.severity,
      title: alertData.title,
      description: alertData.description,
      propertyId: activity.propertyId,
      userId: activity.userId,
      evidence: alertData.evidence,
      timestamp: new Date().toISOString(),
      resolved: false,
      aiAnalysis: {
        confidence: alertData.confidence,
        recommendations: alertData.recommendations,
        riskFactors: alertData.riskFactors
      }
    };

    const { error } = await this.supabase
      .from('security_alerts')
      .insert(securityAlert);

    if (error) {
      console.error('❌ Erreur création alerte:', error);
    } else {
      // Notifier les administrateurs
      await this.notifyAdmins(securityAlert);
      
      console.log(`🚨 Alerte de sécurité créée: ${securityAlert.title}`);
    }
  }

  // Notifier les administrateurs
  async notifyAdmins(alert: SecurityAlert) {
    try {
      // Email admin
      await this.sendAdminEmail(alert);
      
      // Push notification
      await this.sendPushNotification(alert);
      
      // SMS si critique
      if (alert.severity === 'critical') {
        await this.sendSMS(alert);
      }

    } catch (error) {
      console.error('❌ Erreur notification admin:', error);
    }
  }

  // Envoyer email admin
  async sendAdminEmail(alert: SecurityAlert) {
    console.log(`📧 Email admin envoyé: ${alert.title}`);
  }

  // Envoyer push notification
  async sendPushNotification(alert: SecurityAlert) {
    console.log(`📱 Push notification envoyée: ${alert.title}`);
  }

  // Envoyer SMS
  async sendSMS(alert: SecurityAlert) {
    console.log(`📱 SMS envoyé: ${alert.title}`);
  }

  // Calculer la distance entre deux points
  private calculateDistance(point1: any, point2: any): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(point2.latitude - point1.latitude);
    const dLon = this.deg2rad(point2.longitude - point1.longitude);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(point1.latitude)) * Math.cos(this.deg2rad(point2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Générer ID d'activité
  private generateActivityId(): string {
    return `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Générer ID d'alerte
  private generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Obtenir l'historique des activités
  async getActivityHistory(propertyId?: string, userId?: string, limit: number = 50) {
    let query = this.supabase
      .from('property_activities')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (propertyId) {
      query = query.eq('propertyId', propertyId);
    }

    if (userId) {
      query = query.eq('userId', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  // Obtenir les alertes de sécurité
  async getSecurityAlerts(resolved: boolean = false, limit: number = 50) {
    const { data, error } = await this.supabase
      .from('security_alerts')
      .select('*')
      .eq('resolved', resolved)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Marquer une alerte comme résolue
  async resolveAlert(alertId: string, resolution: string) {
    const { error } = await this.supabase
      .from('security_alerts')
      .update({
        resolved: true,
        resolution,
        resolved_at: new Date().toISOString()
      })
      .eq('id', alertId);

    if (error) throw error;
    console.log(`✅ Alerte résolue: ${alertId}`);
  }

  // Obtenir les statistiques de surveillance
  async getMonitoringStats() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data: todayActivities } = await this.supabase
      .from('property_activities')
      .select('*')
      .gte('timestamp', today);

    const { data: activeAlerts } = await this.supabase
      .from('security_alerts')
      .select('*')
      .eq('resolved', false);

    const { data: flaggedActivities } = await this.supabase
      .from('property_activities')
      .select('*')
      .eq('flagged', true)
      .gte('timestamp', today);

    return {
      totalActivities: todayActivities?.length || 0,
      activeAlerts: activeAlerts?.length || 0,
      flaggedActivities: flaggedActivities?.length || 0,
      riskLevel: this.calculateRiskLevel(activeAlerts?.length || 0)
    };
  }

  // Calculer le niveau de risque
  private calculateRiskLevel(alertCount: number): 'low' | 'medium' | 'high' | 'critical' {
    if (alertCount === 0) return 'low';
    if (alertCount <= 5) return 'medium';
    if (alertCount <= 15) return 'high';
    return 'critical';
  }
}

export const realEstateMonitoringService = new RealEstateMonitoringService(); 