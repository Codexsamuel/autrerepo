import { SubscriptionService } from '@/src/services/subscription-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID requis' }, { status: 400 });
    }

    switch (action) {
      case 'credits':
        const credits = await SubscriptionService.checkUserCredits(userId);
        return NextResponse.json({ success: true, data: credits });

      case 'plans':
        return NextResponse.json({ 
          success: true, 
          data: SubscriptionService.SUBSCRIPTION_PLANS 
        });

      case 'subscription':
        const hasSubscription = await SubscriptionService.hasActiveSubscription(userId);
        const userPlan = await SubscriptionService.getUserPlan(userId);
        return NextResponse.json({ 
          success: true, 
          data: { hasSubscription, plan: userPlan } 
        });

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Erreur API subscription:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, planId, sessionId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID requis' }, { status: 400 });
    }

    switch (action) {
      case 'consume-credit':
        const result = await SubscriptionService.consumeCredit(userId);
        return NextResponse.json({ success: true, data: result });

      case 'create-checkout':
        if (!planId) {
          return NextResponse.json({ error: 'Plan ID requis' }, { status: 400 });
        }
        
        const successUrl = `${request.nextUrl.origin}/subscription/success`;
        const cancelUrl = `${request.nextUrl.origin}/subscription/cancel`;
        
        const checkoutUrl = await SubscriptionService.createCheckoutSession(
          planId, 
          userId, 
          successUrl, 
          cancelUrl
        );
        
        return NextResponse.json({ success: true, data: { checkoutUrl } });

      case 'handle-payment':
        if (!planId || !sessionId) {
          return NextResponse.json({ error: 'Plan ID et Session ID requis' }, { status: 400 });
        }
        
        await SubscriptionService.handleSuccessfulPayment(userId, planId, sessionId);
        return NextResponse.json({ success: true, message: 'Paiement traité avec succès' });

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Erreur API subscription POST:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur', 
      details: error.message 
    }, { status: 500 });
  }
} 