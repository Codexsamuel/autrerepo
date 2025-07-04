import { NextRequest, NextResponse } from 'next/server';

// Mock Stripe pour la démo (remplacer par l'import réel de Stripe en production)
const mockStripeCheckout = async (orderData: any) => {
  // Simulation d'un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Retourner une URL de démo (en production, ce serait l'URL Stripe Checkout)
  return {
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/novacore/dl-style/commande-confirmee?session_id=mock_session_${Date.now()}`
  };
};

export async function POST(req: NextRequest) {
  try {
    const { cart, customer, total } = await req.json();

    // Validation des données
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: 'Panier invalide' },
        { status: 400 }
      );
    }

    if (!customer || !customer.email) {
      return NextResponse.json(
        { error: 'Informations client manquantes' },
        { status: 400 }
      );
    }

    // En production, utiliser Stripe réel :
    // import Stripe from 'stripe';
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
    
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: cart.map((item: any) => ({
    //     price_data: {
    //       currency: 'eur',
    //       product_data: { 
    //         name: item.name, 
    //         images: [item.image] 
    //       },
    //       unit_amount: Math.round(item.price * 100), // en centimes
    //     },
    //     quantity: item.quantity,
    //   })),
    //   mode: 'payment',
    //   customer_email: customer.email,
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/novacore/dl-style/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/novacore/dl-style/checkout`,
    //   metadata: {
    //     customer_name: `${customer.firstName} ${customer.lastName}`,
    //     customer_phone: customer.phone || '',
    //     customer_address: customer.address || '',
    //     order_total: total.toString()
    //   }
    // });

    // Pour la démo, utiliser le mock
    const session = await mockStripeCheckout({
      cart,
      customer,
      total
    });

    // Log de la commande (en production, sauvegarder en base de données)
    console.log('Nouvelle commande créée:', {
      orderId: `CMD-${Date.now()}`,
      customer: customer,
      items: cart,
      total: total,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: `mock_session_${Date.now()}`
    });

  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 