import { novaiaPaymentSystem } from '@/lib/payments/novaia-payment-system';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante' },
      { status: 400 }
    );
  }

  try {
    // Vérifier la signature du webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Traiter l'événement via le système de paiements NovaIA
    await novaiaPaymentSystem.handleWebhook(event);

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Erreur webhook Stripe:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement du webhook',
        details: error.message 
      },
      { status: 400 }
    );
  }
} 