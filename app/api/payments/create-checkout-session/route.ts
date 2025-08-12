import { PaymentPlan, PaymentType, novaiaPaymentSystem } from '@/lib/payments/novaia-payment-system';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, type, amount, currency, email, name, userId } = body;

    // Validation des données
    if (!plan || !type || !amount || !currency || !email || !name) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Validation du plan
    if (!Object.values(PaymentPlan).includes(plan)) {
      return NextResponse.json(
        { error: 'Plan de paiement invalide' },
        { status: 400 }
      );
    }

    // Validation du type
    if (!Object.values(PaymentType).includes(type)) {
      return NextResponse.json(
        { error: 'Type de paiement invalide' },
        { status: 400 }
      );
    }

    // Créer la session de checkout
    const session = await novaiaPaymentSystem.createCheckoutSession(
      userId || 'anonymous',
      `${type}_${plan}`, // ID du produit
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      {
        email,
        name,
        plan,
        type
      }
    );

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error: any) {
    console.error('Erreur création session checkout:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la session de paiement',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 