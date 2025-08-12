/**
 * NOVAIA ORANGE MONEY INTEGRATION
 * Intégration complète d'Orange Money pour les paiements NovaIA
 */

import { createClient } from '@supabase/supabase-js';

// Configuration Orange Money
const ORANGE_MONEY_CONFIG = {
  // Production
  production: {
    apiUrl: 'https://api.orange.com/money',
    merchantId: process.env.ORANGE_MONEY_MERCHANT_ID!,
    apiKey: process.env.ORANGE_MONEY_API_KEY!,
    secretKey: process.env.ORANGE_MONEY_SECRET_KEY!,
    callbackUrl: process.env.ORANGE_MONEY_CALLBACK_URL!
  },
  // Test/Sandbox
  sandbox: {
    apiUrl: 'https://api-sandbox.orange.com/money',
    merchantId: process.env.ORANGE_MONEY_SANDBOX_MERCHANT_ID!,
    apiKey: process.env.ORANGE_MONEY_SANDBOX_API_KEY!,
    secretKey: process.env.ORANGE_MONEY_SANDBOX_SECRET_KEY!,
    callbackUrl: process.env.ORANGE_MONEY_SANDBOX_CALLBACK_URL!
  }
};

// Types Orange Money
export interface OrangeMoneyPayment {
  id: string;
  amount: number;
  currency: string;
  phoneNumber: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrangeMoneyRequest {
  amount: number;
  currency: string;
  phoneNumber: string;
  description: string;
  reference: string;
  callbackUrl?: string;
}

export interface OrangeMoneyResponse {
  success: boolean;
  transactionId?: string;
  status: string;
  message: string;
  errorCode?: string;
}

// Classe d'intégration Orange Money
export class OrangeMoneyIntegration {
  private config: typeof ORANGE_MONEY_CONFIG.production;
  private supabase: any;
  private environment: 'production' | 'sandbox';

  constructor(environment: 'production' | 'sandbox' = 'sandbox') {
    this.environment = environment;
    this.config = ORANGE_MONEY_CONFIG[environment];
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Créer un paiement Orange Money
  async createPayment(payment: OrangeMoneyRequest): Promise<OrangeMoneyResponse> {
    try {
      // Validation des données
      if (!this.validatePaymentRequest(payment)) {
        throw new Error('Données de paiement invalides');
      }

      // Préparer la requête pour Orange Money
      const orangeMoneyRequest = {
        merchantId: this.config.merchantId,
        amount: payment.amount,
        currency: payment.currency,
        phoneNumber: payment.phoneNumber,
        description: payment.description,
        reference: payment.reference,
        callbackUrl: payment.callbackUrl || this.config.callbackUrl,
        timestamp: new Date().toISOString()
      };

      // Signature de sécurité
      const signature = this.generateSignature(orangeMoneyRequest);

      // Appel API Orange Money
      const response = await fetch(`${this.config.apiUrl}/payment/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Signature': signature,
          'X-Timestamp': orangeMoneyRequest.timestamp
        },
        body: JSON.stringify(orangeMoneyRequest)
      });

      const result = await response.json();

      if (result.success) {
        // Sauvegarder en base
        await this.savePaymentToDatabase({
          id: result.transactionId,
          amount: payment.amount,
          currency: payment.currency,
          phoneNumber: payment.phoneNumber,
          description: payment.description,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return {
          success: true,
          transactionId: result.transactionId,
          status: 'pending',
          message: 'Paiement Orange Money initié avec succès'
        };
      } else {
        throw new Error(result.message || 'Erreur lors de la création du paiement');
      }

    } catch (error: any) {
      console.error('Erreur création paiement Orange Money:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors de la création du paiement',
        errorCode: 'ORANGE_MONEY_ERROR'
      };
    }
  }

  // Vérifier le statut d'un paiement
  async checkPaymentStatus(transactionId: string): Promise<OrangeMoneyResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/payment/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Timestamp': new Date().toISOString()
        }
      });

      const result = await response.json();

      if (result.success) {
        // Mettre à jour le statut en base
        await this.updatePaymentStatus(transactionId, result.status);
        
        return {
          success: true,
          transactionId,
          status: result.status,
          message: `Statut du paiement: ${result.status}`
        };
      } else {
        throw new Error(result.message || 'Erreur lors de la vérification du statut');
      }

    } catch (error: any) {
      console.error('Erreur vérification statut Orange Money:', error);
      
      return {
        success: false,
        status: 'failed',
        message: error.message || 'Erreur lors de la vérification du statut',
        errorCode: 'ORANGE_MONEY_STATUS_ERROR'
      };
    }
  }

  // Traiter le callback Orange Money
  async handleCallback(callbackData: any): Promise<boolean> {
    try {
      // Vérifier la signature du callback
      if (!this.verifyCallbackSignature(callbackData)) {
        throw new Error('Signature du callback invalide');
      }

      const { transactionId, status, amount, phoneNumber } = callbackData;

      // Mettre à jour le statut en base
      await this.updatePaymentStatus(transactionId, status);

      // Si le paiement est réussi, activer les fonctionnalités NovaIA
      if (status === 'completed') {
        await this.activateNovaiaFeatures(phoneNumber, amount);
      }

      return true;

    } catch (error: any) {
      console.error('Erreur traitement callback Orange Money:', error);
      return false;
    }
  }

  // Validation des données de paiement
  private validatePaymentRequest(payment: OrangeMoneyRequest): boolean {
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
  private async savePaymentToDatabase(payment: OrangeMoneyPayment): Promise<void> {
    const { error } = await this.supabase
      .from('orange_money_payments')
      .insert(payment);

    if (error) throw error;
  }

  // Mettre à jour le statut d'un paiement
  private async updatePaymentStatus(transactionId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('orange_money_payments')
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
        orange_money_enabled: true,
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

  // Obtenir les statistiques des paiements
  async getPaymentStats(): Promise<any> {
    const { data, error } = await this.supabase
      .from('orange_money_payments')
      .select('status, amount, currency, created_at');

    if (error) throw error;

    return {
      total: data.length,
      completed: data.filter(p => p.status === 'completed').length,
      pending: data.filter(p => p.status === 'pending').length,
      failed: data.filter(p => p.status === 'failed').length,
      totalAmount: data
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)
    };
  }
}

// Instance globale Orange Money
export const orangeMoneyIntegration = new OrangeMoneyIntegration(); 