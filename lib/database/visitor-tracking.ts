import { createClient } from '@supabase/supabase-js';

// Configuration Supabase (à remplacer par vos vraies clés)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Créer le client Supabase seulement si les variables sont configurées
let supabase: any = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey !== 'placeholder-key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.warn('Erreur lors de l\'initialisation de Supabase:', error);
  }
}

// Fonction helper pour vérifier si Supabase est disponible
function isSupabaseAvailable(): boolean {
  return supabase !== null;
}

// Interfaces pour les données des visiteurs
export interface VisitorSession {
  id: string;
  session_id: string;
  visitor_id: string;
  timestamp: string;
  source: 'search' | 'maps' | 'direct' | 'social' | 'referral';
  action: 'view' | 'click' | 'call' | 'direction' | 'website_visit';
  location: {
    city: string;
    region: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  device: 'mobile' | 'desktop' | 'tablet';
  session_duration: number;
  pages_viewed: string[];
  search_query?: string;
  user_agent: string;
  ip_address: string;
  is_returning: boolean;
  business_profile_id: string;
  created_at: string;
}

export interface VisitorAnalytics {
  total_views: number;
  total_clicks: number;
  total_calls: number;
  total_directions: number;
  conversion_rate: number;
  average_session_duration: number;
  unique_visitors: number;
  returning_visitors: number;
  new_visitors: number;
}

export interface SearchQueryAnalytics {
  query: string;
  count: number;
  conversion_rate: number;
  avg_session_duration: number;
  unique_visitors: number;
}

export interface LocationAnalytics {
  location: string;
  visitors: number;
  percentage: number;
  conversion_rate: number;
  avg_session_duration: number;
}

export interface DeviceAnalytics {
  device: string;
  visitors: number;
  percentage: number;
  conversion_rate: number;
}

export interface TimeAnalytics {
  hour: number;
  visitors: number;
  percentage: number;
  conversion_rate: number;
}

export interface BehaviorAnalytics {
  most_viewed_pages: Array<{ page: string; views: number; unique_visitors: number }>;
  common_paths: Array<{ path: string; frequency: number; conversion_rate: number }>;
  exit_pages: Array<{ page: string; exits: number; percentage: number }>;
}

// Fonctions de base de données
export class VisitorTrackingDB {
  // Enregistrer une nouvelle session de visiteur
  static async recordSession(session: Omit<VisitorSession, 'id' | 'created_at'>): Promise<void> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, session non enregistrée');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('visitor_sessions')
        .insert({
          session_id: session.session_id,
          visitor_id: session.visitor_id,
          timestamp: session.timestamp,
          source: session.source,
          action: session.action,
          location: session.location,
          device: session.device,
          session_duration: session.session_duration,
          pages_viewed: session.pages_viewed,
          search_query: session.search_query,
          user_agent: session.user_agent,
          ip_address: session.ip_address,
          is_returning: session.is_returning,
          business_profile_id: session.business_profile_id
        });

      if (error) {
        console.error('Erreur lors de l\'enregistrement de la session:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la session:', error);
      throw error;
    }
  }

  // Récupérer les sessions d'un visiteur spécifique
  static async getVisitorSessions(visitorId: string, limit: number = 50): Promise<VisitorSession[]> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour de données vides');
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('visitor_id', visitorId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Erreur lors de la récupération des sessions:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      return [];
    }
  }

  // Récupérer les analytics pour une période donnée
  static async getAnalytics(
    businessProfileId: string,
    startDate: string,
    endDate: string
  ): Promise<VisitorAnalytics> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour de données par défaut');
      return {
        total_views: 0,
        total_clicks: 0,
        total_calls: 0,
        total_directions: 0,
        conversion_rate: 0,
        average_session_duration: 0,
        unique_visitors: 0,
        returning_visitors: 0,
        new_visitors: 0
      };
    }
    
    try {
      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('business_profile_id', businessProfileId)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      if (error) {
        console.error('Erreur lors de la récupération des analytics:', error);
        throw error;
      }

      const sessions = data || [];
      
      // Calculer les analytics
      const totalViews = sessions.filter((s: any) => s.action === 'view').length;
      const totalClicks = sessions.filter((s: any) => s.action === 'click').length;
      const totalCalls = sessions.filter((s: any) => s.action === 'call').length;
      const totalDirections = sessions.filter((s: any) => s.action === 'direction').length;
      
      const uniqueVisitors = new Set(sessions.map((s: any) => s.visitor_id)).size;
      const returningVisitors = sessions.filter((s: any) => s.is_returning).length;
      const newVisitors = uniqueVisitors - returningVisitors;
      
      const totalActions = totalClicks + totalCalls + totalDirections;
      const conversionRate = totalViews > 0 ? (totalActions / totalViews) * 100 : 0;
      
      const avgSessionDuration = sessions.length > 0 
        ? sessions.reduce((sum: number, s: any) => sum + s.session_duration, 0) / sessions.length 
        : 0;

      return {
        total_views: totalViews,
        total_clicks: totalClicks,
        total_calls: totalCalls,
        total_directions: totalDirections,
        conversion_rate: conversionRate,
        average_session_duration: avgSessionDuration,
        unique_visitors: uniqueVisitors,
        returning_visitors: returningVisitors,
        new_visitors: newVisitors
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics:', error);
      return {
        total_views: 0,
        total_clicks: 0,
        total_calls: 0,
        total_directions: 0,
        conversion_rate: 0,
        average_session_duration: 0,
        unique_visitors: 0,
        returning_visitors: 0,
        new_visitors: 0
      };
    }
  }

  // Récupérer les requêtes de recherche les plus populaires
  static async getTopSearchQueries(
    businessProfileId: string,
    startDate: string,
    endDate: string,
    limit: number = 10
  ): Promise<SearchQueryAnalytics[]> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour de données vides');
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('business_profile_id', businessProfileId)
        .not('search_query', 'is', null)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      if (error) {
        console.error('Erreur lors de la récupération des requêtes:', error);
        throw error;
      }

      const sessions = data || [];
      
      // Grouper par requête
      const queryStats = new Map<string, {
        count: number;
        sessions: any[];
        uniqueVisitors: Set<string>;
      }>();

      sessions.forEach((session: any) => {
        if (session.search_query) {
          if (!queryStats.has(session.search_query)) {
            queryStats.set(session.search_query, {
              count: 0,
              sessions: [],
              uniqueVisitors: new Set()
            });
          }
          
          const stats = queryStats.get(session.search_query)!;
          stats.count++;
          stats.sessions.push(session);
          stats.uniqueVisitors.add(session.visitor_id);
        }
      });

      // Calculer les analytics pour chaque requête
      const analytics: SearchQueryAnalytics[] = Array.from(queryStats.entries())
        .map(([query, stats]) => {
          const conversions = stats.sessions.filter((s: any) => 
            ['click', 'call', 'direction'].includes(s.action)
          ).length;
          
          const conversionRate = stats.count > 0 ? (conversions / stats.count) * 100 : 0;
          const avgSessionDuration = stats.sessions.length > 0 
            ? stats.sessions.reduce((sum: number, s: any) => sum + s.session_duration, 0) / stats.sessions.length 
            : 0;

          return {
            query,
            count: stats.count,
            conversion_rate: conversionRate,
            avg_session_duration: avgSessionDuration,
            unique_visitors: stats.uniqueVisitors.size
          };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);

      return analytics;
    } catch (error) {
      console.error('Erreur lors de la récupération des requêtes:', error);
      return [];
    }
  }

  // Récupérer les analytics par localisation
  static async getLocationAnalytics(
    businessProfileId: string,
    startDate: string,
    endDate: string
  ): Promise<LocationAnalytics[]> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour de données vides');
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('business_profile_id', businessProfileId)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      if (error) {
        console.error('Erreur lors de la récupération des analytics de localisation:', error);
        throw error;
      }

      const sessions = data || [];
      
      // Grouper par localisation
      const locationStats = new Map<string, {
        visitors: Set<string>;
        sessions: any[];
      }>();

      sessions.forEach((session: any) => {
        const location = `${session.location.city}, ${session.location.region}`;
        
        if (!locationStats.has(location)) {
          locationStats.set(location, {
            visitors: new Set(),
            sessions: []
          });
        }
        
        const stats = locationStats.get(location)!;
        stats.visitors.add(session.visitor_id);
        stats.sessions.push(session);
      });

      const totalVisitors = new Set(sessions.map((s: any) => s.visitor_id)).size;

      // Calculer les analytics pour chaque localisation
      const analytics: LocationAnalytics[] = Array.from(locationStats.entries())
        .map(([location, stats]) => {
          const visitors = stats.visitors.size;
          const percentage = totalVisitors > 0 ? (visitors / totalVisitors) * 100 : 0;
          
          const conversions = stats.sessions.filter((s: any) => 
            ['click', 'call', 'direction'].includes(s.action)
          ).length;
          
          const conversionRate = stats.sessions.length > 0 ? (conversions / stats.sessions.length) * 100 : 0;
          const avgSessionDuration = stats.sessions.length > 0 
            ? stats.sessions.reduce((sum: number, s: any) => sum + s.session_duration, 0) / stats.sessions.length 
            : 0;

          return {
            location,
            visitors,
            percentage,
            conversion_rate: conversionRate,
            avg_session_duration: avgSessionDuration
          };
        })
        .sort((a, b) => b.visitors - a.visitors);

      return analytics;
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics de localisation:', error);
      return [];
    }
  }

  // Récupérer les sessions actives en temps réel
  static async getActiveSessions(businessProfileId: string): Promise<VisitorSession[]> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour de données vides');
      return [];
    }
    
    try {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('business_profile_id', businessProfileId)
        .gte('timestamp', fiveMinutesAgo)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des sessions actives:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions actives:', error);
      return [];
    }
  }

  // Générer un ID de visiteur unique
  static generateVisitorId(): string {
    return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Générer un ID de session unique
  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Vérifier si un visiteur est retournant
  static async isReturningVisitor(visitorId: string, businessProfileId: string): Promise<boolean> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, retour false');
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('visitor_sessions')
        .select('id')
        .eq('visitor_id', visitorId)
        .eq('business_profile_id', businessProfileId)
        .limit(1);

      if (error) {
        console.error('Erreur lors de la vérification du visiteur:', error);
        return false;
      }

      return data && data.length > 0;
    } catch (error) {
      console.error('Erreur lors de la vérification du visiteur:', error);
      return false;
    }
  }

  // Mettre à jour la durée de session
  static async updateSessionDuration(sessionId: string, duration: number): Promise<void> {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase non configuré, mise à jour ignorée');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('visitor_sessions')
        .update({ session_duration: duration })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Erreur lors de la mise à jour de la durée:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la durée:', error);
      throw error;
    }
  }
}

// Script SQL pour créer les tables nécessaires
export const CREATE_VISITOR_TABLES_SQL = `
-- Table pour les sessions de visiteurs
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT NOT NULL CHECK (source IN ('search', 'maps', 'direct', 'social', 'referral')),
  action TEXT NOT NULL CHECK (action IN ('view', 'click', 'call', 'direction', 'website_visit')),
  location JSONB NOT NULL,
  device TEXT NOT NULL CHECK (device IN ('mobile', 'desktop', 'tablet')),
  session_duration INTEGER NOT NULL DEFAULT 0,
  pages_viewed TEXT[] DEFAULT '{}',
  search_query TEXT,
  user_agent TEXT,
  ip_address TEXT,
  is_returning BOOLEAN DEFAULT FALSE,
  business_profile_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_business_profile_id ON visitor_sessions(business_profile_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_timestamp ON visitor_sessions(timestamp);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_action ON visitor_sessions(action);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_source ON visitor_sessions(source);

-- Table pour les métadonnées des visiteurs
CREATE TABLE IF NOT EXISTS visitor_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT UNIQUE NOT NULL,
  business_profile_id TEXT NOT NULL,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_visits INTEGER DEFAULT 1,
  total_duration INTEGER DEFAULT 0,
  preferred_device TEXT,
  preferred_location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les métadonnées
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_visitor_id ON visitor_metadata(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_metadata_business_profile_id ON visitor_metadata(business_profile_id);

-- Fonction pour mettre à jour les métadonnées automatiquement
CREATE OR REPLACE FUNCTION update_visitor_metadata()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO visitor_metadata (visitor_id, business_profile_id, last_visit, total_visits, total_duration)
  VALUES (NEW.visitor_id, NEW.business_profile_id, NEW.timestamp, 1, NEW.session_duration)
  ON CONFLICT (visitor_id) DO UPDATE SET
    last_visit = EXCLUDED.last_visit,
    total_visits = visitor_metadata.total_visits + 1,
    total_duration = visitor_metadata.total_duration + EXCLUDED.total_duration,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement les métadonnées
DROP TRIGGER IF EXISTS trigger_update_visitor_metadata ON visitor_sessions;
CREATE TRIGGER trigger_update_visitor_metadata
  AFTER INSERT ON visitor_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_visitor_metadata();
`; 