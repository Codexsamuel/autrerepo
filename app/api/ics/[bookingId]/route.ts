import { audit } from '@/lib/audit';
import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request, 
  { params }: { params: { bookingId: string } }
) {
  try {
    const supa = supabaseAdmin();
    
    // Récupérer les détails de la réservation
    const { data: booking, error: bookingError } = await supa
      .from("bookings")
      .select("id, start_at, end_at, address, service_id, user_id, status")
      .eq("id", params.bookingId)
      .single();

    if (bookingError || !booking) {
      return new NextResponse("Réservation introuvable", { status: 404 });
    }

    // Récupérer les détails du service
    const { data: service, error: serviceError } = await supa
      .from("services_view")
      .select("title, city, business_name, category, price_monthly")
      .eq("id", booking.service_id)
      .single();

    if (serviceError) {
      console.error('Erreur récupération service:', serviceError);
    }

    // Récupérer les détails de l'utilisateur
    const { data: user, error: userError } = await supa
      .from("users_profiles")
      .select("full_name, email")
      .eq("user_id", booking.user_id)
      .single();

    if (userError) {
      console.error('Erreur récupération utilisateur:', userError);
    }

    // Générer l'UID unique pour le calendrier
    const uid = `NovaWorld-${booking.id}`;
    
    // Fonction helper pour formater les dates
    const formatDate = (dateString: string) => {
      return new Date(dateString)
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");
    };

    // Générer le contenu .ics
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//NovaWorld//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:NovaWorld Réservation",
      "X-WR-CALDESC:Réservation de service NovaWorld",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatDate(new Date().toISOString())}`,
      `DTSTART:${formatDate(booking.start_at)}`,
      `DTEND:${formatDate(booking.end_at)}`,
      `SUMMARY:${service?.title || "Réservation NovaWorld"}`,
      `LOCATION:${booking.address || service?.city || "Lieu à confirmer"}`,
      `DESCRIPTION:Prestataire: ${service?.business_name || "À confirmer"}\\n`,
      `CATEGORIES:${service?.category || "Service"}\\n`,
      `PRIORITY:5\\n`,
      `STATUS:CONFIRMED\\n`,
      `ORGANIZER;CN=NovaWorld:mailto:noreply@novaworld.com\\n`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${user?.full_name || "Client"}:mailto:${user?.email || "client@example.com"}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Rappel réservation NovaWorld",
      "TRIGGER:-PT15M",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    // Audit de l'export .ics
    await audit(booking.user_id, 'EXPORT_ICS', 'booking', {
      booking_id: booking.id,
      service_title: service?.title,
      export_timestamp: new Date().toISOString(),
      user_agent: "ICS-Export"
    });

    // Retourner le fichier .ics
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="NovaWorld-${booking.id}.ics"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });

  } catch (error) {
    console.error('Erreur export .ics:', error);
    
    // Audit de l'erreur
    await audit(null, 'EXPORT_ICS_ERROR', 'api', {
      booking_id: params.bookingId,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    });

    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
} 