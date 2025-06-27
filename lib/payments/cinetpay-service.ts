import axios, { AxiosInstance } from 'axios';


export interface CinetPayPayment {
  transaction_id: string;
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  lang: string;
  channel: string;
}

export interface CinetPayResponse {
  code: string;
  message: string;
  data?: {
    payment_url: string;
    transaction_id: string;
    status: string;
  };
}

export interface CinetPayVerification {
  transaction_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_date: string;
  payment_method: string;
}

export class CinetPayService {
  private client: AxiosInstance;
  private apiKey: string;
  private siteId: string;
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.CINETPAY_API_KEY!;
    this.siteId = process.env.CINETPAY_SITE_ID!;
    this.secretKey = process.env.CINETPAY_SECRET_KEY!;
    this.baseUrl = 'https://api-checkout.cinetpay.com/v2';

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  // Créer un paiement
  async createPayment(payment: CinetPayPayment): Promise<CinetPayResponse | null> {
    try {
      const payload = {
        apikey: this.apiKey,
        site_id: this.siteId,
        transaction_id: payment.transaction_id,
        amount: payment.amount,
        currency: payment.currency,
        description: payment.description,
        return_url: payment.return_url,
        cancel_url: payment.cancel_url,
        notify_url: payment.notify_url,
        lang: payment.lang || 'FR',
        channel: payment.channel || 'WEB',
        metadata: {
          platform: 'DAVY Trading Platform',
          timestamp: Date.now(),
        },
      };

      const response = await this.client.post('/payment', payload);
      
      if (response.data.code === '201') {
        return {
          code: response.data.code,
          message: response.data.message,
          data: {
            payment_url: response.data.data.payment_url,
            transaction_id: response.data.data.transaction_id,
            status: response.data.data.status,
          },
        };
      } else {
        console.error('Erreur CinetPay:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la création du paiement CinetPay:', error);
      return null;
    }
  }

  // Vérifier le statut d'un paiement
  async verifyPayment(transactionId: string): Promise<CinetPayVerification | null> {
    try {
      const payload = {
        apikey: this.apiKey,
        site_id: this.siteId,
        transaction_id: transactionId,
      };

      const response = await this.client.post('/payment/check', payload);
      
      if (response.data.code === '00') {
        const data = response.data.data;
        return {
          transaction_id: data.transaction_id,
          amount: data.amount,
          currency: data.currency,
          status: data.status,
          payment_date: data.payment_date,
          payment_method: data.payment_method,
        };
      } else {
        console.error('Erreur vérification CinetPay:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du paiement:', error);
      return null;
    }
  }

  // Obtenir l'historique des paiements
  async getPaymentHistory(startDate?: string, endDate?: string): Promise<any[]> {
    try {
      const payload: any = {
        apikey: this.apiKey,
        site_id: this.siteId,
      };

      if (startDate) payload.start_date = startDate;
      if (endDate) payload.end_date = endDate;

      const response = await this.client.post('/payment/history', payload);
      
      if (response.data.code === '00') {
        return response.data.data || [];
      } else {
        console.error('Erreur historique CinetPay:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  // Créer un remboursement
  async createRefund(transactionId: string, amount?: number): Promise<boolean> {
    try {
      const payload: any = {
        apikey: this.apiKey,
        site_id: this.siteId,
        transaction_id: transactionId,
      };

      if (amount) {
        payload.amount = amount;
      }

      const response = await this.client.post('/payment/refund', payload);
      
      return response.data.code === '00';
    } catch (error) {
      console.error('Erreur lors de la création du remboursement:', error);
      return false;
    }
  }

  // Obtenir les statistiques de paiement
  async getPaymentStats(days: number = 30): Promise<any> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const history = await this.getPaymentHistory(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );

      const totalAmount = history.reduce((sum: number, payment: any) => {
        return sum + (payment.amount || 0);
      }, 0);

      const successfulPayments = history.filter((payment: any) => payment.status === 'SUCCESSFUL');

      return {
        totalPayments: history.length,
        successfulPayments: successfulPayments.length,
        totalAmount,
        successRate: history.length > 0 ? (successfulPayments.length / history.length) * 100 : 0,
        averageAmount: history.length > 0 ? totalAmount / history.length : 0,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        totalPayments: 0,
        successfulPayments: 0,
        totalAmount: 0,
        successRate: 0,
        averageAmount: 0,
      };
    }
  }

  // Générer un ID de transaction unique
  generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `DAVY_${timestamp}_${random}`.toUpperCase();
  }

  // Vérifier la signature d'un webhook
  verifyWebhookSignature(payload: any, signature: string): boolean {
    try {
      // Implémentation de la vérification de signature selon la documentation CinetPay
      const expectedSignature = this.generateSignature(payload);
      return signature === expectedSignature;
    } catch (error) {
      console.error('Erreur lors de la vérification de la signature:', error);
      return false;
    }
  }

  private generateSignature(payload: any): string {
    // Implémentation de la génération de signature selon la documentation CinetPay
    const data = `${payload.transaction_id}${payload.amount}${payload.currency}${this.secretKey}`;
    return require('crypto').createHash('sha256').update(data).digest('hex');
  }

  // Créer un paiement mobile money
  async createMobileMoneyPayment(
    transactionId: string,
    amount: number,
    phoneNumber: string,
    operator: 'ORANGE' | 'MTN' | 'MOOV',
    description: string,
    returnUrl: string,
    notifyUrl: string
  ): Promise<CinetPayResponse | null> {
    try {
      const payment: CinetPayPayment = {
        transaction_id: transactionId,
        amount,
        currency: 'XOF',
        description,
        return_url: returnUrl,
        cancel_url: returnUrl,
        notify_url: notifyUrl,
        lang: 'FR',
        channel: 'MOBILE',
      };

      const payload = {
        ...payment,
        apikey: this.apiKey,
        site_id: this.siteId,
        phone_number: phoneNumber,
        operator,
        metadata: {
          platform: 'DAVY Trading Platform',
          payment_method: 'mobile_money',
          operator,
          timestamp: Date.now(),
        },
      };

      const response = await this.client.post('/payment', payload);
      
      if (response.data.code === '201') {
        return {
          code: response.data.code,
          message: response.data.message,
          data: {
            payment_url: response.data.data.payment_url,
            transaction_id: response.data.data.transaction_id,
            status: response.data.data.status,
          },
        };
      } else {
        console.error('Erreur paiement Mobile Money:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la création du paiement Mobile Money:', error);
      return null;
    }
  }

  // Obtenir les opérateurs disponibles
  getAvailableOperators(): { code: string; name: string; country: string }[] {
    return [
      { code: 'ORANGE', name: 'Orange Money', country: 'Côte d\'Ivoire' },
      { code: 'MTN', name: 'MTN Mobile Money', country: 'Côte d\'Ivoire' },
      { code: 'MOOV', name: 'Moov Money', country: 'Côte d\'Ivoire' },
    ];
  }

  // Obtenir les devises supportées
  getSupportedCurrencies(): { code: string; name: string; symbol: string }[] {
    return [
      { code: 'XOF', name: 'Franc CFA', symbol: 'CFA' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'USD', name: 'Dollar US', symbol: '$' },
    ];
  }
}

// Instance singleton
export const cinetpayService = new CinetPayService(); 