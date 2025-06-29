import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Configuration des APIs des prestataires
const BOOKING_API_CONFIG = {
  baseURL: process.env.BOOKING_API_URL,
  apiKey: process.env.BOOKING_API_KEY,
  partnerId: process.env.BOOKING_PARTNER_ID
};

const EXPEDIA_API_CONFIG = {
  baseURL: process.env.EXPEDIA_API_URL,
  apiKey: process.env.EXPEDIA_API_KEY,
  secret: process.env.EXPEDIA_SECRET
};

const AIRBNB_API_CONFIG = {
  baseURL: process.env.AIRBNB_API_URL,
  apiKey: process.env.AIRBNB_API_KEY
};

// Types pour les données de réservation
export interface BookingData {
  id: string;
  provider: 'booking' | 'expedia' | 'airbnb' | 'hotels' | 'tripadvisor';
  reservationId: string;
  hotelId: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'no-show' | 'checked-in' | 'checked-out';
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'refunded';
  paymentMethod: string;
  specialRequests: string[];
  createdAt: string;
  updatedAt: string;
  source: string;
  commission: number;
  cancellationPolicy: string;
  roomType: string;
  ratePlan: string;
}

export interface HotelData {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  amenities: string[];
  photos: string[];
  rates: {
    [roomType: string]: {
      base: number;
      current: number;
      currency: string;
    };
  };
  availability: {
    [date: string]: {
      available: number;
      booked: number;
      blocked: number;
    };
  };
}

export interface NotificationData {
  type: 'arrival' | 'departure' | 'payment' | 'cancellation' | 'modification' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  data: any;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  aiAnalysis?: {
    riskScore: number;
    recommendations: string[];
    urgency: 'low' | 'medium' | 'high';
  };
}

class BookingIntegrationService {
  private supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Synchronisation avec Booking.com
  async syncBookingCom() {
    try {
      const response = await axios.get(`${BOOKING_API_CONFIG.baseURL}/reservations`, {
        headers: {
          'Authorization': `Bearer ${BOOKING_API_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          partner_id: BOOKING_API_CONFIG.partnerId,
          arrival_date: new Date().toISOString().split('T')[0],
          departure_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      });

      const reservations = response.data.reservations;
      
      for (const reservation of reservations) {
        await this.processReservation({
          id: `booking_${reservation.reservation_id}`,
          provider: 'booking',
          reservationId: reservation.reservation_id,
          hotelId: reservation.hotel_id,
          roomId: reservation.room_id,
          guestName: `${reservation.guest.first_name} ${reservation.guest.last_name}`,
          guestEmail: reservation.guest.email,
          guestPhone: reservation.guest.phone,
          checkIn: reservation.arrival_date,
          checkOut: reservation.departure_date,
          guests: reservation.number_of_guests,
          totalAmount: reservation.total_price.amount,
          currency: reservation.total_price.currency,
          status: this.mapBookingStatus(reservation.status) as 'confirmed' | 'pending' | 'cancelled' | 'no-show' | 'checked-in' | 'checked-out',
          paymentStatus: this.mapPaymentStatus(reservation.payment_status) as 'paid' | 'partial' | 'unpaid' | 'refunded',
          paymentMethod: reservation.payment_method,
          specialRequests: reservation.special_requests || [],
          createdAt: reservation.created_at,
          updatedAt: reservation.updated_at,
          source: 'booking.com',
          commission: reservation.commission?.amount || 0,
          cancellationPolicy: reservation.cancellation_policy,
          roomType: reservation.room_type,
          ratePlan: reservation.rate_plan
        });
      }

      console.log(`✅ Synchronisé ${reservations.length} réservations Booking.com`);
    } catch (error: any) {
      console.error('❌ Erreur synchronisation Booking.com:', error);
      await this.createAlert('sync_error', 'booking', error.message || 'Erreur inconnue');
    }
  }

  // Synchronisation avec Expedia
  async syncExpedia() {
    try {
      const response = await axios.get(`${EXPEDIA_API_CONFIG.baseURL}/reservations`, {
        headers: {
          'Authorization': `Bearer ${EXPEDIA_API_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const reservations = response.data.reservations;
      
      for (const reservation of reservations) {
        await this.processReservation({
          id: `expedia_${reservation.confirmation_id}`,
          provider: 'expedia',
          reservationId: reservation.confirmation_id,
          hotelId: reservation.property_id,
          roomId: reservation.room_id,
          guestName: `${reservation.guest.first_name} ${reservation.guest.last_name}`,
          guestEmail: reservation.guest.email,
          guestPhone: reservation.guest.phone,
          checkIn: reservation.check_in_date,
          checkOut: reservation.check_out_date,
          guests: reservation.number_of_guests,
          totalAmount: reservation.total_amount,
          currency: reservation.currency,
          status: this.mapExpediaStatus(reservation.status) as 'confirmed' | 'pending' | 'cancelled' | 'no-show' | 'checked-in' | 'checked-out',
          paymentStatus: this.mapPaymentStatus(reservation.payment_status) as 'paid' | 'partial' | 'unpaid' | 'refunded',
          paymentMethod: reservation.payment_method,
          specialRequests: reservation.special_requests || [],
          createdAt: reservation.created_date,
          updatedAt: reservation.modified_date,
          source: 'expedia.com',
          commission: reservation.commission || 0,
          cancellationPolicy: reservation.cancellation_policy,
          roomType: reservation.room_type,
          ratePlan: reservation.rate_plan
        });
      }

      console.log(`✅ Synchronisé ${reservations.length} réservations Expedia`);
    } catch (error: any) {
      console.error('❌ Erreur synchronisation Expedia:', error);
      await this.createAlert('sync_error', 'expedia', error.message || 'Erreur inconnue');
    }
  }

  // Traitement d'une réservation
  async processReservation(bookingData: BookingData) {
    try {
      // Vérifier si la réservation existe déjà
      const { data: existing } = await this.supabase
        .from('bookings')
        .select('*')
        .eq('provider_reservation_id', bookingData.reservationId)
        .single();

      if (existing) {
        // Mettre à jour la réservation existante
        await this.updateReservation(existing.id, bookingData);
      } else {
        // Créer une nouvelle réservation
        await this.createReservation(bookingData);
      }

      // Analyser avec IA
      await this.analyzeWithAI(bookingData);

    } catch (error) {
      console.error('❌ Erreur traitement réservation:', error);
    }
  }

  // Créer une nouvelle réservation
  async createReservation(bookingData: BookingData) {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert({
        provider: bookingData.provider,
        provider_reservation_id: bookingData.reservationId,
        hotel_id: bookingData.hotelId,
        room_id: bookingData.roomId,
        guest_name: bookingData.guestName,
        guest_email: bookingData.guestEmail,
        guest_phone: bookingData.guestPhone,
        check_in: bookingData.checkIn,
        check_out: bookingData.checkOut,
        guests: bookingData.guests,
        total_amount: bookingData.totalAmount,
        currency: bookingData.currency,
        status: bookingData.status,
        payment_status: bookingData.paymentStatus,
        payment_method: bookingData.paymentMethod,
        special_requests: bookingData.specialRequests,
        source: bookingData.source,
        commission: bookingData.commission,
        cancellation_policy: bookingData.cancellationPolicy,
        room_type: bookingData.roomType,
        rate_plan: bookingData.ratePlan,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Créer notification d'arrivée
    await this.createNotification({
      type: 'arrival',
      priority: 'high',
      title: `Nouvelle réservation - ${bookingData.guestName}`,
      message: `Réservation confirmée pour ${bookingData.guestName} du ${bookingData.checkIn} au ${bookingData.checkOut}`,
      data: { bookingId: data.id, ...bookingData },
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: true
    });

    console.log(`✅ Réservation créée: ${bookingData.guestName}`);
    return data;
  }

  // Mettre à jour une réservation existante
  async updateReservation(id: string, bookingData: BookingData) {
    const { data: existing } = await this.supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    const { error } = await this.supabase
      .from('bookings')
      .update({
        status: bookingData.status,
        payment_status: bookingData.paymentStatus,
        total_amount: bookingData.totalAmount,
        special_requests: bookingData.specialRequests,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    // Vérifier les changements critiques
    if (existing.status !== bookingData.status) {
      await this.handleStatusChange(existing, bookingData);
    }

    if (existing.payment_status !== bookingData.paymentStatus) {
      await this.handlePaymentStatusChange(existing, bookingData);
    }

    console.log(`✅ Réservation mise à jour: ${bookingData.guestName}`);
  }

  // Gérer les changements de statut
  async handleStatusChange(oldData: any, newData: BookingData) {
    const statusMessages = {
      'confirmed': 'Réservation confirmée',
      'checked-in': 'Client arrivé',
      'checked-out': 'Client parti',
      'cancelled': 'Réservation annulée',
      'no-show': 'Client absent'
    };

    await this.createNotification({
      type: 'modification',
      priority: newData.status === 'cancelled' || newData.status === 'no-show' ? 'critical' : 'medium',
      title: `Changement de statut - ${newData.guestName}`,
      message: `${statusMessages[newData.status as keyof typeof statusMessages]} pour ${newData.guestName}`,
      data: { 
        bookingId: oldData.id, 
        oldStatus: oldData.status, 
        newStatus: newData.status,
        ...newData 
      },
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: newData.status === 'cancelled' || newData.status === 'no-show'
    });
  }

  // Gérer les changements de statut de paiement
  async handlePaymentStatusChange(oldData: any, newData: BookingData) {
    const paymentMessages = {
      'paid': 'Paiement reçu',
      'partial': 'Paiement partiel',
      'unpaid': 'Paiement en attente',
      'refunded': 'Remboursement effectué'
    };

    await this.createNotification({
      type: 'payment',
      priority: newData.paymentStatus === 'unpaid' ? 'critical' : 'high',
      title: `Changement paiement - ${newData.guestName}`,
      message: `${paymentMessages[newData.paymentStatus as keyof typeof paymentMessages]} pour ${newData.guestName}`,
      data: { 
        bookingId: oldData.id, 
        oldPaymentStatus: oldData.payment_status, 
        newPaymentStatus: newData.paymentStatus,
        amount: newData.totalAmount,
        ...newData 
      },
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: newData.paymentStatus === 'unpaid'
    });
  }

  // Analyser avec IA
  async analyzeWithAI(bookingData: BookingData) {
    try {
      // Appel à l'API IA pour analyse
      const aiResponse = await axios.post('/api/ai/analyze-booking', {
        bookingData,
        context: 'reservation_analysis'
      });

      const aiAnalysis = aiResponse.data;

      // Créer notification IA si nécessaire
      if (aiAnalysis.riskScore > 0.7) {
        await this.createNotification({
          type: 'alert',
          priority: 'critical',
          title: `Alerte IA - ${bookingData.guestName}`,
          message: aiAnalysis.recommendations[0],
          data: { bookingId: bookingData.id, aiAnalysis },
          timestamp: new Date().toISOString(),
          read: false,
          actionRequired: true,
          aiAnalysis: {
            riskScore: aiAnalysis.riskScore,
            recommendations: aiAnalysis.recommendations,
            urgency: aiAnalysis.riskScore > 0.8 ? 'high' : 'medium'
          }
        });
      }

    } catch (error) {
      console.error('❌ Erreur analyse IA:', error);
    }
  }

  // Créer une notification
  async createNotification(notificationData: NotificationData) {
    const { error } = await this.supabase
      .from('notifications')
      .insert({
        type: notificationData.type,
        priority: notificationData.priority,
        title: notificationData.title,
        message: notificationData.message,
        data: notificationData.data,
        timestamp: notificationData.timestamp,
        read: notificationData.read,
        action_required: notificationData.actionRequired,
        ai_analysis: notificationData.aiAnalysis
      });

    if (error) {
      console.error('❌ Erreur création notification:', error);
    } else {
      // Envoyer notification push/email si critique
      if (notificationData.priority === 'critical') {
        await this.sendCriticalNotification(notificationData);
      }
    }
  }

  // Envoyer notification critique
  async sendCriticalNotification(notificationData: NotificationData) {
    // Notification push
    await this.sendPushNotification(notificationData);
    
    // Email admin
    await this.sendAdminEmail(notificationData);
    
    // SMS si très critique
    if (notificationData.type === 'alert') {
      await this.sendSMS(notificationData);
    }
  }

  // Envoyer notification push
  async sendPushNotification(notificationData: NotificationData) {
    // Implémentation notification push
    console.log('📱 Push notification envoyée:', notificationData.title);
  }

  // Envoyer email admin
  async sendAdminEmail(notificationData: NotificationData) {
    // Implémentation email admin
    console.log('📧 Email admin envoyé:', notificationData.title);
  }

  // Envoyer SMS
  async sendSMS(notificationData: NotificationData) {
    // Implémentation SMS
    console.log('📱 SMS envoyé:', notificationData.title);
  }

  // Créer une alerte
  async createAlert(type: string, source: string, message: string) {
    await this.createNotification({
      type: 'alert',
      priority: 'critical',
      title: `Alerte système - ${source}`,
      message: message,
      data: { type, source, message },
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: true
    });
  }

  // Mapper les statuts Booking.com
  private mapBookingStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'confirmed',
      'pending': 'pending',
      'cancelled': 'cancelled',
      'no_show': 'no-show',
      'checked_in': 'checked-in',
      'checked_out': 'checked-out'
    };
    return statusMap[status] || 'pending';
  }

  // Mapper les statuts Expedia
  private mapExpediaStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'CONFIRMED': 'confirmed',
      'PENDING': 'pending',
      'CANCELLED': 'cancelled',
      'NO_SHOW': 'no-show',
      'CHECKED_IN': 'checked-in',
      'CHECKED_OUT': 'checked-out'
    };
    return statusMap[status] || 'pending';
  }

  // Mapper les statuts de paiement
  private mapPaymentStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'paid': 'paid',
      'partial': 'partial',
      'unpaid': 'unpaid',
      'refunded': 'refunded',
      'PAID': 'paid',
      'PARTIAL': 'partial',
      'UNPAID': 'unpaid',
      'REFUNDED': 'refunded'
    };
    return statusMap[status] || 'unpaid';
  }

  // Synchronisation complète
  async syncAll() {
    console.log('🔄 Début synchronisation complète...');
    
    await Promise.all([
      this.syncBookingCom(),
      this.syncExpedia(),
      // Ajouter d'autres prestataires ici
    ]);

    console.log('✅ Synchronisation complète terminée');
  }
}

export const bookingIntegrationService = new BookingIntegrationService();