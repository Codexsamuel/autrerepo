import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Récupérer les activités d'aujourd'hui
    const { data: todayActivities } = await supabase
      .from('property_activities')
      .select('*')
      .gte('timestamp', today);

    // Récupérer les alertes actives
    const { data: activeAlerts } = await supabase
      .from('security_alerts')
      .select('*')
      .eq('resolved', false);

    // Récupérer les activités signalées
    const { data: flaggedActivities } = await supabase
      .from('property_activities')
      .select('*')
      .eq('flagged', true)
      .gte('timestamp', today);

    // Calculer le niveau de risque
    const alertCount = activeAlerts?.length || 0;
    const riskLevel = calculateRiskLevel(alertCount);

    const stats = {
      totalActivities: todayActivities?.length || 0,
      activeAlerts: alertCount,
      flaggedActivities: flaggedActivities?.length || 0,
      riskLevel
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('❌ Erreur API stats:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

function calculateRiskLevel(alertCount: number): 'low' | 'medium' | 'high' | 'critical' {
  if (alertCount === 0) return 'low';
  if (alertCount <= 5) return 'medium';
  if (alertCount <= 15) return 'high';
  return 'critical';
} 