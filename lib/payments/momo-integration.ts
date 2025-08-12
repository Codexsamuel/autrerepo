/**
 * NOVAIA MOMO (MOBILE MONEY) INTEGRATION
 * Intégration complète de MoMo pour les paiements NovaIA
 */

import { createClient } from '@supabase/supabase-js';

// Configuration MoMo (Mobile Money)
const MOMO_CONFIG = {
  // Production
  production: {
    apiUrl: 'https://api.momo.com',
    merchantId: process.env.MOMO_MERCHANT_ID!,
    apiKey: process.env.MOMO_API_KEY!,
    secretKey: process.env.MOMO_SECRET_KEY!,
    callbackUrl: process.env.MOMO_CALLBACK_URL!,
    environment: 'live'
  },
  // Test/Sandbox
  sandbox: {
    apiUrl: 'https://sandbox-api.momo.com',
    merchantId: process.env.MOMO_SANDBOX_MERCHANT_ID!,
    apiKey: process.env.MOMO_SANDBOX_API_KEY!,
    secretKey: process.env.MOMO_SANDBOX_SECRET_KEY!,
    callbackUrl: process.env.MOMO_SANDBOX_CALLBACK_URL!,
    environment: 'sandbox'
  }
};

// Types MoMo
export interface MoMoPayment {
  id: string;
  amount: number;
  currency: string;
  phoneNumber: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';
  transactionId?: string;
  momoTransactionId?: string;
  errorCode?: string;
  errorMessage?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoMoRequest {
  amount: number;
  currency: string;
  phoneNumber: string;
  description: string;
  reference: string;
  callbackUrl?: string;
  expiryMinutes?: number;
}

export interface MoMoResponse {
  success: boolean;
  transactionId?: string;
  momoTransactionId?: string;
  status: string;
  message: string;
  errorCode?: string;
  paymentUrl?: string;
  qrCode?: string;
}

// Classe d'intégration MoMo
export class MoMoIntegration {
  private config: typeof MOMO_CONFIG.production;
  private supabase: any;
  private environment: 'production' | 'sandbox';

  constructor(environment: 'production' | 'sandbox' = 'sandbox') {
    this.environment = environment;
    this.config = MOMO_CONFIG[environment];
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Créer un paiement MoMo
  async createPayment(payment: MoMoRequest): Promise<MoMoResponse> {
    try {
      // Validation des données
      if (!this.validatePaymentRequest(payment)) {
        throw new Error('Données de paiement invalides');
      }

      // Préparer la requête pour MoMo
      const momoRequest = {
        merchantId: this.config.merchantId,
        amount: payment.amount,
        currency: payment.currency,
        phoneNumber: payment.phoneNumber,
        description: payment.description,
        reference: payment.reference,
        callbackUrl: payment.callbackUrl || this.config.callbackUrl,
        expiryMinutes: payment.expiryMinutes || 30,
        timestamp: new Date().toISOString(),
        environment: this.config.environment
      };

      // Signature de sécurité
      const signature = this.generateSignature(momoRequest);

      // Appel API MoMo
      const response = await fetch(`${this.config.apiUrl}/payment/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Signature': signature,
          'X-Timestamp': momoRequest.timestamp,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(momoRequest)
      });

      const result = await response.json();

      if (result.success) {
        // Calculer la date d'expiration
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + (payment.expiryMinutes || 30));

        // Sauvegarder en base
        await this.savePaymentToDatabase({
          id: result.transactionId,
          amount: payment.amount,
          currency: payment.currency,
          phoneNumber: payment.phoneNumber,
          description: payment.description,
          status: 'pending',
          momoTransactionId: result.momoTransactionId,
          expiresAt,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return {
          success: true,
          transactionId: result.transactionId,
          momoTransactionId: result.momoTransactionId,
          status: 'pending',
          message: 'Paiement MoMo initié avec succès',
          paymentUrl: result.paymentUrl,
          qrCode: result.qrCode
        };
      } else {
        throw new Error(result.message || 'Erreur lors de la création du paiement');
      }

    } catch (error: any) {
      console.error('Erreur création paiement MoMo:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors de la création du paiement',
        errorCode: 'MOMO_ERROR'
      };
    }
  }

  // Vérifier le statut d'un paiement
  async checkPaymentStatus(transactionId: string): Promise<MoMoResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/payment/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Timestamp': new Date().toISOString(),
          'X-Environment': this.config.environment
        }
      });

      const result = await response.json();

      if (result.success) {
        // Mettre à jour le statut en base
        await this.updatePaymentStatus(transactionId, result.status);
        
        return {
          success: true,
          transactionId,
          momoTransactionId: result.momoTransactionId,
          status: result.status,
          message: `Statut du paiement: ${result.status}`
        };
      } else {
        throw new Error(result.message || 'Erreur lors de la vérification du statut');
      }

    } catch (error: any) {
      console.error('Erreur vérification statut MoMo:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors de la vérification du statut',
        errorCode: 'MOMO_STATUS_ERROR'
      };
    }
  }

  // Traiter le callback MoMo
  async handleCallback(callbackData: any): Promise<boolean> {
    try {
      // Vérifier la signature du callback
      if (!this.verifyCallbackSignature(callbackData)) {
        throw new Error('Signature du callback invalide');
      }

      const { transactionId, momoTransactionId, status, amount, phoneNumber } = callbackData;

      // Mettre à jour le statut en base
      await this.updatePaymentStatus(transactionId, status);

      // Si le paiement est réussi, activer les fonctionnalités NovaIA
      if (status === 'completed') {
        await this.activateNovaiaFeatures(phoneNumber, amount);
      }

      return true;

    } catch (error: any) {
      console.error('Erreur traitement callback MoMo:', error);
      return false;
    }
  }

  // Annuler un paiement
  async cancelPayment(transactionId: string): Promise<MoMoResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/payment/cancel/${transactionId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Timestamp': new Date().toISOString(),
          'X-Environment': this.config.environment
        }
      });

      const result = await response.json();

      if (result.success) {
        // Mettre à jour le statut en base
        await this.updatePaymentStatus(transactionId, 'cancelled');
        
        return {
          success: true,
          transactionId,
          status: 'cancelled',
          message: 'Paiement annulé avec succès'
        };
      } else {
        throw new Error(result.message || 'Erreur lors de l\'annulation');
      }

    } catch (error: any) {
      console.error('Erreur annulation paiement MoMo:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors de l\'annulation',
        errorCode: 'MOMO_CANCEL_ERROR'
      };
    }
  }

  // Rembourser un paiement
  async refundPayment(transactionId: string, amount?: number): Promise<MoMoResponse> {
    try {
      const refundRequest = {
        amount: amount || 0, // 0 = remboursement total
        reason: 'Demande client',
        timestamp: new Date().toISOString()
      };

      const signature = this.generateSignature(refundRequest);

      const response = await fetch(`${this.config.apiUrl}/payment/refund/${transactionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Signature': signature,
          'X-Timestamp': refundRequest.timestamp,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(refundRequest)
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          transactionId,
          status: 'refunded',
          message: 'Remboursement effectué avec succès'
        };
      } else {
        throw new Error(result.message || 'Erreur lors du remboursement');
      }

    } catch (error: any) {
      console.error('Erreur remboursement MoMo:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors du remboursement',
        errorCode: 'MOMO_REFUND_ERROR'
      };
    }
  }

  // Validation des données de paiement
  private validatePaymentRequest(payment: MoMoRequest): boolean {
    return (
      payment.amount > 0 &&
      payment.currency &&
      payment.phoneNumber &&
      payment.description &&
      payment.reference
    );
  }

  // Génération de signature de sécurité
  private generateSignature(data: any): string {
    const message = `${data.merchantId}${data.amount}${data.currency}${data.phoneNumber}${data.timestamp}`;
    const crypto = require('crypto');
    return crypto.createHmac('sha256', this.config.secretKey).update(message).digest('hex');
  }

  // Vérification de la signature du callback
  private verifyCallbackSignature(callbackData: any): boolean {
    const { signature, timestamp, ...data } = callbackData;
    const expectedSignature = this.generateSignature({ ...data, timestamp });
    return signature === expectedSignature;
  }

  // Sauvegarder le paiement en base
  private async savePaymentToDatabase(payment: MoMoPayment): Promise<void> {
    const { error } = await this.supabase
      .from('momo_payments')
      .insert(payment);

    if (error) throw error;
  }

  // Mettre à jour le statut d'un paiement
  private async updatePaymentStatus(transactionId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('momo_payments')
      .update({ 
        status, 
        updatedAt: new Date() 
      })
      .eq('id', transactionId);

    if (error) throw error;
  }

  // Activer les fonctionnalités NovaIA
  private async activateNovaiaFeatures(phoneNumber: string, amount: number): Promise<void> {
    // Déterminer le plan basé sur le montant
    const plan = this.determinePlanFromAmount(amount);
    
    // Activer les fonctionnalités pour l'utilisateur
    const { error } = await this.supabase
      .from('user_permissions')
      .upsert({
        phoneNumber,
        plan,
        momo_enabled: true,
        updatedAt: new Date()
      });

    if (error) throw error;
  }

  // Déterminer le plan basé sur le montant
  private determinePlanFromAmount(amount: number): string {
    if (amount >= 299) return 'enterprise';
    if (amount >= 99) return 'professional';
    if (amount >= 29) return 'starter';
    return 'free';
  }

  // Nettoyer les paiements expirés
  async cleanupExpiredPayments(): Promise<number> {
    const { data, error } = await this.supabase
      .from('momo_payments')
      .update({ 
        status: 'expired',
        updatedAt: new Date()
      })
      .lt('expiresAt', new Date())
      .eq('status', 'pending');

    if (error) throw error;
    
    return data?.length || 0;
  }

  // Obtenir les statistiques des paiements
  async getPaymentStats(): Promise<any> {
    const { data, error } = await this.supabase
      .from('momo_payments')
      .select('status, amount, currency, created_at');

    if (error) throw error;

    return {
      total: data.length,
      completed: data.filter(p => p.status === 'completed').length,
      pending: data.filter(p => p.status === 'pending').length,
      failed: data.filter(p => p.status === 'failed').length,
      expired: data.filter(p => p.status === 'expired').length,
      totalAmount: data
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)
    };
  }
}

// Instance globale MoMo
export const momoIntegration = new MoMoIntegration(); 