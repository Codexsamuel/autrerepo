import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureIdempotent } from '@/lib/idempotency';
import { audit } from '@/lib/audit';
import { generateIdempotencyKey } from '@/lib/idempotency';

interface DisputeRequest {
  booking_id: string;
  dispute_type: 'quality_issue' | 'payment_dispute' | 'cancellation' | 'no_show' | 'safety_concern' | 'other';
  dispute_reason: string;
  description: string;
  requested_action: 'full_refund' | 'partial_refund' | 'service_redone' | 'compensation' | 'cancellation';
  requested_refund_amount?: number;
  requested_compensation?: number;
  idempotency_key?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DisputeRequest = await request.json();
    const { 
      booking_id, 
      dispute_type, 
      dispute_reason, 
      description, 
      requested_action,
      requested_refund_amount,
      requested_compensation,
      idempotency_key 
    } = body;

    // Validation des paramètres
    if (!booking_id || !dispute_type || !dispute_reason || !requested_action) {
      return NextResponse.json({ 
        error: "Paramètres manquants: booking_id, dispute_type, dispute_reason, requested_action requis" 
      }, { status: 400 });
    }

    // Générer une clé d'idempotence si non fournie
    const finalIdempotencyKey = idempotency_key || generateIdempotencyKey(
      null, 
      'open_dispute', 
      { booking_id, dispute_type, requested_action }
    );

    // Vérification idempotency
    try {
      await ensureIdempotent(finalIdempotencyKey, '/api/novaprotect/disputes/open');
    } catch (error) {
      return NextResponse.json({ 
        error: "Litige déjà ouvert" 
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
        provider_id,
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

    // Vérifier que la réservation est éligible aux litiges
    if (booking.status !== 'completed' && booking.status !== 'in_progress') {
      return NextResponse.json({ 
        error: "La réservation doit être terminée ou en cours pour ouvrir un litige" 
      }, { status: 400 });
    }

    // Vérifier qu'aucun litige n'existe déjà pour cette réservation
    const { data: existingDispute, error: disputeCheckError } = await supa
      .from("disputes")
      .select("id, status")
      .eq("booking_id", booking_id)
      .maybeSingle();

    if (existingDispute) {
      return NextResponse.json({ 
        error: "Un litige existe déjà pour cette réservation" 
      }, { status: 400 });
    }

    // Récupérer les détails du service
    const { data: service, error: serviceError } = await supa
      .from("services")
      .select("title, category, business_name")
      .eq("id", booking.service_id)
      .single();

    if (serviceError) {
      console.error('Erreur récupération service:', serviceError);
    }

    // Récupérer l'escrow associé
    const { data: escrow, error: escrowError } = await supa
      .from("escrow_transactions")
      .select("id, escrow_amount, status")
      .eq("booking_id", booking_id)
      .maybeSingle();

    if (escrowError) {
      console.error('Erreur récupération escrow:', escrowError);
    }

    // Déterminer la partie disputée
    const disputedParty = booking.provider_id; // Par défaut, le prestataire

    // Calculer la priorité du litige
    let priority = 'normal';
    if (dispute_type === 'safety_concern' || dispute_type === 'no_show') {
      priority = 'high';
    } else if (dispute_type === 'payment_dispute' && (requested_refund_amount || 0) > 50000) {
      priority = 'urgent';
    }

    // Créer le litige
    const { data: dispute, error: disputeError } = await supa
      .from("disputes")
      .insert({
        escrow_id: escrow?.id,
        contract_id: null, // Sera mis à jour si un contrat existe
        booking_id: booking.id,
        opened_by: booking.user_id,
        disputed_party: disputedParty,
        dispute_type: dispute_type,
        dispute_reason: dispute_reason,
        description: description,
        requested_action: requested_action,
        requested_refund_amount: requested_refund_amount,
        requested_compensation: requested_compensation,
        status: 'opened',
        priority: priority,
        evidence_deadline: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72h pour les preuves
        metadata: {
          service_title: service?.title,
          service_category: service?.category,
          business_name: service?.business_name,
          booking_dates: {
            start: booking.start_at,
            end: booking.end_at
          },
          total_amount: booking.total_amount,
          escrow_amount: escrow?.escrow_amount
        }
      })
      .select()
      .single();

    if (disputeError) {
      console.error('Erreur création litige:', disputeError);
      return NextResponse.json({ 
        error: "Erreur lors de la création du litige" 
      }, { status: 500 });
    }

    // Mettre à jour le statut de l'escrow si il existe
    if (escrow) {
      await supa
        .from("escrow_transactions")
        .update({ 
          status: 'disputed',
          current_stage: 'dispute_opened',
          dispute_opened_at: new Date().toISOString()
        })
        .eq("id", escrow.id);
    }

    // Créer un message système pour le litige
    const systemMessage = `🔔 Litige ouvert par le client\n\n**Type:** ${dispute_type}\n**Raison:** ${dispute_reason}\n**Action demandée:** ${requested_action}\n\nLe prestataire a 72h pour fournir ses preuves.`;

    await supa
      .from("dispute_messages")
      .insert({
        dispute_id: dispute.id,
        sender_id: null, // Message système
        message_type: 'system_message',
        content: systemMessage,
        is_internal: false,
        is_visible_to_client: true,
        is_visible_to_provider: true
      });

    // Notifier le prestataire (en production, envoyer email/SMS)
    console.log(`📢 Notification litige envoyée au prestataire ${disputedParty}`);

    // Audit de l'ouverture du litige
    await audit(booking.user_id, 'OPEN_DISPUTE', 'disputes', {
      dispute_id: dispute.id,
      booking_id: booking.id,
      dispute_type: dispute_type,
      requested_action: requested_action,
      priority: priority,
      idempotency_key: finalIdempotencyKey
    });

    return NextResponse.json({
      success: true,
      message: "Litige ouvert avec succès",
      data: {
        dispute_id: dispute.id,
        status: dispute.status,
        priority: dispute.priority,
        evidence_deadline: dispute.evidence_deadline,
        next_steps: [
          "Le prestataire a 72h pour fournir ses preuves",
          "Collecte des évidences et témoignages",
          "Processus de médiation si nécessaire",
          "Décision finale par l'équipe NovaProtect",
          "Résolution du litige et libération des fonds"
        ],
        timeline: {
          opened_at: dispute.opened_at,
          evidence_deadline: dispute.evidence_deadline,
          estimated_resolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
        }
      }
    });

  } catch (error) {
    console.error('Erreur ouverture litige:', error);
    
    // Audit de l'erreur
    await audit(null, 'OPEN_DISPUTE_ERROR', 'api', {
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
    service: 'NovaProtect Disputes API',
    version: '1.0.0',
    features: [
      'Ouverture de litiges sécurisée',
      'Types de litiges multiples',
      'Système de priorité automatique',
      'Deadline de preuves (72h)',
      'Messages système automatiques',
      'Audit complet et traçabilité',
      'Protection idempotency'
    ],
    dispute_types: [
      'quality_issue', 'payment_dispute', 'cancellation', 
      'no_show', 'safety_concern', 'other'
    ],
    requested_actions: [
      'full_refund', 'partial_refund', 'service_redone', 
      'compensation', 'cancellation'
    ],
    sla: '72 heures pour les preuves',
    timestamp: new Date().toISOString(),
  });
} 