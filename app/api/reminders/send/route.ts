import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureIdempotent } from '@/lib/idempotency';
import { audit } from '@/lib/audit';

interface ReminderRequest {
  booking_id: string;
  reminder_type: '24h' | '2h' | '15min';
  channels: ('whatsapp' | 'sms')[];
  idempotency_key?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReminderRequest = await request.json();
    const { booking_id, reminder_type, channels, idempotency_key } = body;

    // Validation des paramètres
    if (!booking_id || !reminder_type || !channels.length) {
      return NextResponse.json({ 
        error: "Paramètres manquants: booking_id, reminder_type, channels requis" 
      }, { status: 400 });
    }

    // Vérification idempotency
    if (idempotency_key) {
      try {
        await ensureIdempotent(idempotency_key, '/api/reminders/send');
      } catch (error) {
        return NextResponse.json({ 
          error: "Rappel déjà envoyé" 
        }, { status: 409 });
      }
    }

    const supa = supabaseAdmin();
    
    // Récupérer les détails de la réservation
    const { data: booking, error: bookingError } = await supa
      .from("bookings")
      .select(`
        id, 
        start_at, 
        end_at, 
        address, 
        service_id, 
        user_id,
        status
      `)
      .eq("id", booking_id)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ 
        error: "Réservation introuvable" 
      }, { status: 404 });
    }

    // Vérifier que la réservation est confirmée
    if (booking.status !== 'confirmed') {
      return NextResponse.json({ 
        error: "Réservation non confirmée" 
      }, { status: 400 });
    }

    // Récupérer les détails du service et prestataire
    const { data: service, error: serviceError } = await supa
      .from("services_view")
      .select("title, business_name, category")
      .eq("id", booking.service_id)
      .single();

    if (serviceError) {
      console.error('Erreur récupération service:', serviceError);
    }

    // Récupérer les détails de l'utilisateur
    const { data: user, error: userError } = await supa
      .from("users_profiles")
      .select("full_name, phone, email")
      .eq("user_id", booking.user_id)
      .single();

    if (userError) {
      console.error('Erreur récupération utilisateur:', userError);
    }

    // Calculer le temps restant
    const now = new Date();
    const startTime = new Date(booking.start_at);
    const timeRemaining = startTime.getTime() - now.getTime();
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // Messages selon le type de rappel
    const getMessage = (channel: string) => {
      const baseMessage = `🔔 NovaWorld - Rappel réservation\n\n`;
      const serviceInfo = `Service: ${service?.title || 'Service'}\n`;
      const providerInfo = `Prestataire: ${service?.business_name || 'À confirmer'}\n`;
      const timeInfo = `Horaire: ${new Date(booking.start_at).toLocaleString('fr-FR')}\n`;
      const addressInfo = `Adresse: ${booking.address || 'À confirmer'}\n\n`;

      let reminderText = '';
      switch (reminder_type) {
        case '24h':
          reminderText = `⏰ Votre réservation est prévue dans 24h. Préparez-vous !`;
          break;
        case '2h':
          reminderText = `⏰ Votre réservation est prévue dans 2h. Préparez-vous !`;
          break;
        case '15min':
          reminderText = `🚨 Votre réservation est prévue dans 15 minutes !`;
          break;
      }

      const footer = `\n📱 Plus d'infos: https://novaworld.com/booking/${booking_id}`;
      
      return baseMessage + serviceInfo + providerInfo + timeInfo + addressInfo + reminderText + footer;
    };

    // Envoyer les rappels via les canaux demandés
    const results = [];
    
    for (const channel of channels) {
      try {
        let sent = false;
        let error = null;

        switch (channel) {
          case 'whatsapp':
            if (user?.phone) {
              // Simulation envoi WhatsApp (en production, utiliser WhatsApp Business API)
              console.log(`📱 WhatsApp envoyé à ${user.phone}:`, getMessage('whatsapp'));
              sent = true;
            } else {
              error = 'Numéro de téléphone manquant pour WhatsApp';
            }
            break;

          case 'sms':
            if (user?.phone) {
              // Simulation envoi SMS (en production, utiliser Twilio)
              console.log(`📨 SMS envoyé à ${user.phone}:`, getMessage('sms'));
              sent = true;
            } else {
              error = 'Numéro de téléphone manquant pour SMS';
            }
            break;
        }

        results.push({
          channel,
          sent,
          error,
          timestamp: new Date().toISOString()
        });

      } catch (channelError) {
        results.push({
          channel,
          sent: false,
          error: channelError instanceof Error ? channelError.message : 'Erreur inconnue',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Enregistrer le rappel dans la base
    const { error: reminderError } = await supa
      .from("reminders_sent")
      .insert({
        booking_id: booking.id,
        reminder_type,
        channels: channels,
        message_template: getMessage('default'),
        sent_at: new Date().toISOString(),
        results: results
      });

    if (reminderError) {
      console.error('Erreur enregistrement rappel:', reminderError);
    }

    // Audit de l'envoi des rappels
    await audit(booking.user_id, 'SEND_REMINDERS', 'booking', {
      booking_id: booking.id,
      reminder_type,
      channels,
      results_count: results.length,
      success_count: results.filter(r => r.sent).length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: `Rappels ${reminder_type} envoyés via ${channels.join(', ')}`,
      data: {
        booking_id: booking.id,
        user_name: user?.full_name,
        service_title: service?.title,
        reminder_type,
        channels,
        results,
        sent_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur envoi rappels:', error);
    
    // Audit de l'erreur
    await audit(null, 'SEND_REMINDERS_ERROR', 'api', {
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
    service: 'NovaWorld Reminders API',
    version: '1.0.0',
    features: [
      'Rappels WhatsApp et SMS',
      'Types: 24h, 2h, 15min avant',
      'Idempotency et audit logging',
      'Support multi-canaux',
      'Templates personnalisés'
    ],
    timestamp: new Date().toISOString(),
  });
} 