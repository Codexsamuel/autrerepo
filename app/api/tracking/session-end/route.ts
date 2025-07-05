import { VisitorTrackingDB } from '@/lib/database/visitor-tracking';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const action = formData.get('action') as string;
    const duration = parseInt(formData.get('duration') as string);
    const visitorId = formData.get('visitor_id') as string;
    const sessionId = formData.get('session_id') as string;
    
    if (action !== 'session_end' || !duration || !visitorId || !sessionId) {
      return NextResponse.json(
        { error: 'Données manquantes ou invalides' },
        { status: 400 }
      );
    }
    
    // Mettre à jour la durée de session
    await VisitorTrackingDB.updateSessionDuration(sessionId, duration);
    
    return NextResponse.json({
      success: true,
      message: 'Session finalisée avec succès',
      data: {
        sessionId,
        duration,
        visitorId
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la finalisation de session:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la finalisation' },
      { status: 500 }
    );
  }
} 