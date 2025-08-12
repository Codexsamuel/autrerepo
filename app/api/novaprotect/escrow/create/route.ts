import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureIdempotent } from '@/lib/idempotency';
import { audit } from '@/lib/audit';
import { generateIdempotencyKey } from '@/lib/idempotency';

interface EscrowRequest {
  booking_id: string;
  total_amount: number;
  escrow_percentage?: number;
  payment_provider: 'cinetpay' | 'stripe' | 'momo' | 'orange_money';
  idempotency_key?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EscrowRequest = await request.json();
    const { 
      booking_id, 
      total_amount, 
      escrow_percentage = 100, 
      payment_provider,
      idempotency_key 
    } = body;

    // Validation des paramètres
    if (!booking_id || !total_amount || !payment_provider) {
      return NextResponse.json({ 
        error: "Paramètres manquants: booking_id, total_amount, payment_provider requis" 
      }, { status: 400 });
    }

    if (total_amount <= 0) {
      return NextResponse.json({ 
        error: "Le montant total doit être supérieur à 0" 
      }, { status: 400 });
    }

    if (escrow_percentage < 0 || escrow_percentage > 100) {
      return NextResponse.json({ 
        error: "Le pourcentage d'escrow doit être entre 0 et 100" 
      }, { status: 400 });
    }

    // Générer une clé d'idempotence si non fournie
    const finalIdempotencyKey = idempotency_key || generateIdempotencyKey(
      null, 
      'create_escrow', 
      { booking_id, total_amount, payment_provider }
    );

    // Vérification idempotency
    try {
      await ensureIdempotent(finalIdempotencyKey, '/api/novaprotect/escrow/create');
    } catch (error) {
      return NextResponse.json({ 
        error: "Transaction d'escrow déjà créée" 
      }, { status: 409 });
    }

    const supa = supabaseAdmin();
    
    // Récupérer les détails de la réservation
    const { data: booking, error: bookingError } = await supa
      .from("bookings")
      .select(`
        id, 
        user_id, 
        service_id, 
        start_at, 
        end_at, 
        status,
        total_amount
      `)
      .eq("id", booking_id)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ 
        error: "Réservation introuvable" 
      }, { status: 404 });
    }

    // Vérifier que la réservation est en statut approprié
    if (booking.status !== 'confirmed' && booking.status !== 'pending_payment') {
      return NextResponse.json({ 
        error: "La réservation doit être confirmée ou en attente de paiement" 
      }, { status: 400 });
    }

    // Récupérer les détails du service et prestataire
    const { data: service, error: serviceError } = await supa
      .from("services")
      .select("provider_id, title, category")
      .eq("id", booking.service_id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json({ 
        error: "Service introuvable" 
      }, { status: 404 });
    }

    // Calculer le montant en escrow
    const escrowAmount = (total_amount * escrow_percentage) / 100;

    // Créer la transaction d'escrow
    const { data: escrow, error: escrowError } = await supa
      .from("escrow_transactions")
      .insert({
        booking_id: booking.id,
        provider_id: service.provider_id,
        user_id: booking.user_id,
        total_amount: total_amount,
        escrow_amount: escrowAmount,
        status: 'pending',
        current_stage: 'escrow_created',
        payment_provider: payment_provider,
        metadata: {
          escrow_percentage,
          service_title: service.title,
          service_category: service.category,
          booking_dates: {
            start: booking.start_at,
            end: booking.end_at
          }
        }
      })
      .select()
      .single();

    if (escrowError) {
      console.error('Erreur création escrow:', escrowError);
      return NextResponse.json({ 
        error: "Erreur lors de la création de l'escrow" 
      }, { status: 500 });
    }

    // Créer le contrat associé
    const contractTerms = {
      service_title: service.title,
      total_amount: total_amount,
      escrow_amount: escrowAmount,
      start_date: booking.start_at,
      end_date: booking.end_at,
      sla_hours: 72,
      cancellation_policy: "Annulation gratuite jusqu'à 24h avant le début du service",
      penalty_terms: {
        no_show: "Remboursement complet en cas de non-présentation du prestataire",
        quality_issue: "Remboursement partiel ou total selon la gravité",
        cancellation_late: "Frais de 20% en cas d'annulation tardive"
      }
    };

    const termsHash = require('crypto')
      .createHash('sha256')
      .update(JSON.stringify(contractTerms))
      .digest('hex');

    const { data: contract, error: contractError } = await supa
      .from("contracts")
      .insert({
        booking_id: booking.id,
        escrow_id: escrow.id,
        contract_type: 'standard',
        terms_version: '1.0',
        terms_hash: termsHash,
        status: 'draft',
        sla_hours: 72,
        cancellation_policy: contractTerms.cancellation_policy,
        penalty_terms: contractTerms.penalty_terms
      })
      .select()
      .single();

    if (contractError) {
      console.error('Erreur création contrat:', contractError);
      // Continuer même si le contrat n'est pas créé
    }

    // Créer la facture proforma
    const tvaRate = 19.25; // TVA Cameroun
    const subtotalHT = total_amount / (1 + tvaRate / 100);
    const tvaAmount = total_amount - subtotalHT;

    const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const { data: invoice, error: invoiceError } = await supa
      .from("invoices")
      .insert({
        booking_id: booking.id,
        escrow_id: escrow.id,
        contract_id: contract?.id,
        invoice_number: invoiceNumber,
        invoice_type: 'proforma',
        subtotal_ht: subtotalHT,
        tva_rate: tvaRate,
        tva_amount: tvaAmount,
        total_ttc: total_amount,
        currency: 'XAF',
        status: 'draft',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        payment_terms: "Paiement en escrow - Libération après validation du service",
        notes: "Facture proforma - Service en attente d'exécution"
      })
      .select()
      .single();

    if (invoiceError) {
      console.error('Erreur création facture:', invoiceError);
      // Continuer même si la facture n'est pas créée
    }

    // Mettre à jour le statut de la réservation
    await supa
      .from("bookings")
      .update({ 
        status: 'escrow_created',
        total_amount: total_amount
      })
      .eq("id", booking.id);

    // Audit de la création d'escrow
    await audit(booking.user_id, 'CREATE_ESCROW', 'escrow_transactions', {
      escrow_id: escrow.id,
      booking_id: booking.id,
      total_amount: total_amount,
      escrow_amount: escrowAmount,
      payment_provider: payment_provider,
      contract_id: contract?.id,
      invoice_id: invoice?.id,
      idempotency_key: finalIdempotencyKey
    });

    return NextResponse.json({
      success: true,
      message: "Transaction d'escrow créée avec succès",
      data: {
        escrow_id: escrow.id,
        contract_id: contract?.id,
        invoice_id: invoice?.id,
        escrow_amount: escrowAmount,
        status: escrow.status,
        next_steps: [
          "Effectuer le paiement via le prestataire sélectionné",
          "Le montant sera mis en attente (escrow)",
          "Libération après validation du service",
          "Possibilité d'ouvrir un litige en cas de problème"
        ]
      }
    });

  } catch (error) {
    console.error('Erreur création escrow:', error);
    
    // Audit de l'erreur
    await audit(null, 'CREATE_ESCROW_ERROR', 'api', {
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      error: "Erreur interne du serveur" 
    }, { status: 500 });
  }
}

// Méthode GET pour vérifier le statut de l'API
export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'NovaProtect Escrow API',
    version: '1.0.0',
    features: [
      'Création de transactions d\'escrow sécurisées',
      'Génération automatique de contrats',
      'Création de factures proforma avec TVA',
      'Intégration multi-prestataires de paiement',
      'Audit complet et traçabilité',
      'Protection idempotency'
    ],
    supported_providers: ['cinetpay', 'stripe', 'momo', 'orange_money'],
    escrow_percentage_range: '0-100%',
    default_sla: '72 heures',
    timestamp: new Date().toISOString(),
  });
} 