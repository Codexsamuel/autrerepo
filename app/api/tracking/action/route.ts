import { trackAction } from '@/middleware/visitor-tracker';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, url, timestamp } = body;
    
    // Valider l'action
    const validActions = ['click', 'call', 'direction', 'website_visit'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Action invalide' },
        { status: 400 }
      );
    }
    
    // Tracker l'action
    await trackAction(request, action as any);
    
    return NextResponse.json({
      success: true,
      message: 'Action trackée avec succès',
      data: {
        action,
        url,
        timestamp
      }
    });
    
  } catch (error) {
    console.error('Erreur lors du tracking d\'action:', error);
    return NextResponse.json(
      { error: 'Erreur lors du tracking' },
      { status: 500 }
    );
  }
} 