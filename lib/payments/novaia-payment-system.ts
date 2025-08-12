/**
 * NOVAIA PAYMENT SYSTEM - ÉCOSYSTÈME COMPLET
 * Système de paiements unifié pour tous les services NovaIA
 */

import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Configuration des variables d'environnement Vercel
const config = {
  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  },
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  
  // Vercel
  vercel: {
    projectId: process.env.VERCEL_PROJECT_ID!,
    teamId: process.env.VERCEL_TEAM_ID!,
    token: process.env.VERCEL_TOKEN!,
  },
  
  // NovaIA
  novaia: {
    apiKey: process.env.NOVAIA_API_KEY!,
    webhookUrl: process.env.NOVAIA_WEBHOOK_URL!,
    environment: process.env.NODE_ENV || 'development',
  }
};

// Types de paiement NovaIA
export enum PaymentType {
  AGENT_SUBSCRIPTION = 'agent_subscription',
  MARKETPLACE_PURCHASE = 'marketplace_purchase',
  BATTLE_ARENA_ENTRY = 'battle_arena_entry',
  PREMIUM_FEATURES = 'premium_features',
  ENTERPRISE_LICENSE = 'enterprise_license',
  TRAINING_COURSE = 'training_course',
  CONSULTING_SERVICE = 'consulting_service',
  CUSTOM_DEVELOPMENT = 'custom_development'
}

// Plans de paiement
export enum PaymentPlan {
  FREE = 'free',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}

// Statuts de paiement
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled'
}

// Interface de produit
export interface NovaiaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: PaymentType;
  plan: PaymentPlan;
  features: string[];
  metadata: Record<string, any>;
}

// Interface de paiement
export interface NovaiaPayment {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  type: PaymentType;
  plan: PaymentPlan;
  stripePaymentIntentId?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Interface de facturation
export interface NovaiaBilling {
  id: string;
  userId: string;
  plan: PaymentPlan;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  metadata: Record<string, any>;
}

// Classe principale du système de paiements
export class NovaiaPaymentSystem {
  private stripe: Stripe;
  private supabase: any;
  
  constructor() {
    // Initialisation Stripe
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2024-06-20',
      typescript: true,
    });
    
    // Initialisation Supabase
    this.supabase = createClient(
      config.supabase.url,
      config.supabase.serviceRoleKey
    );
  }
  
  // Créer un produit
  async createProduct(product: Omit<NovaiaProduct, 'id'>): Promise<NovaiaProduct> {
    try {
      // Créer le produit dans Stripe
      const stripeProduct = await this.stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          type: product.type,
          plan: product.plan,
          features: JSON.stringify(product.features),
          ...product.metadata
        }
      });
      
      // Créer le prix dans Stripe
      const stripePrice = await this.stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.price * 100), // Stripe utilise les centimes
        currency: product.currency,
        recurring: {
          interval: 'month' // ou 'year' selon le plan
        }
      });
      
      // Sauvegarder dans Supabase
      const { data, error } = await this.supabase
        .from('novaia_products')
        .insert({
          id: stripeProduct.id,
          name: product.name,
          description: product.description,
          price: product.price,
          currency: product.currency,
          type: product.type,
          plan: product.plan,
          features: product.features,
          metadata: product.metadata,
          stripe_price_id: stripePrice.id
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Erreur création produit:', error);
      throw error;
    }
  }
  
  // Créer une session de paiement
  async createCheckoutSession(
    userId: string,
    productId: string,
    successUrl: string,
    cancelUrl: string,
    metadata: Record<string, any> = {}
  ) {
    try {
      // Récupérer le produit
      const { data: product, error: productError } = await this.supabase
        .from('novaia_products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (productError) throw productError;
      
      // Créer la session Stripe
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: product.stripe_price_id,
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: metadata.email,
        metadata: {
          userId,
          productId,
          type: product.type,
          plan: product.plan,
          ...metadata
        },
        subscription_data: {
          metadata: {
            userId,
            productId,
            type: product.type,
            plan: product.plan
          }
        }
      });
      
      return session;
    } catch (error) {
      console.error('Erreur création session checkout:', error);
      throw error;
    }
  }
  
  // Traiter un webhook Stripe
  async handleWebhook(event: Stripe.Event) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
          
        case 'invoice.payment_succeeded':
          await this.handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;
          
        case 'invoice.payment_failed':
          await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
          break;
          
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
          
        default:
          console.log(`Webhook non géré: ${event.type}`);
      }
    } catch (error) {
      console.error('Erreur traitement webhook:', error);
      throw error;
    }
  }
  
  // Gérer le checkout complété
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, productId, type, plan } = session.metadata!;
    
    // Créer l'enregistrement de paiement
    const { error } = await this.supabase
      .from('novaia_payments')
      .insert({
        id: session.id,
        userId,
        productId,
        amount: session.amount_total! / 100,
        currency: session.currency!,
        status: PaymentStatus.COMPLETED,
        type: type as PaymentType,
        plan: plan as PaymentPlan,
        stripePaymentIntentId: session.payment_intent as string,
        metadata: session.metadata
      });
    
    if (error) throw error;
    
    // Mettre à jour la facturation
    await this.updateBilling(userId, plan as PaymentPlan, session.subscription as string);
    
    // Déclencher les actions post-paiement
    await this.triggerPostPaymentActions(userId, type as PaymentType, plan as PaymentPlan);
  }
  
  // Mettre à jour la facturation
  private async updateBilling(userId: string, plan: PaymentPlan, subscriptionId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    
    const { error } = await this.supabase
      .from('novaia_billing')
      .upsert({
        userId,
        plan,
        status: 'active',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        stripeSubscriptionId: subscriptionId
      });
    
    if (error) throw error;
  }
  
  // Déclencher les actions post-paiement
  private async triggerPostPaymentActions(userId: string, type: PaymentType, plan: PaymentPlan) {
    switch (type) {
      case PaymentType.AGENT_SUBSCRIPTION:
        await this.activateAgentFeatures(userId, plan);
        break;
        
      case PaymentType.MARKETPLACE_PURCHASE:
        await this.grantMarketplaceAccess(userId, plan);
        break;
        
      case PaymentType.BATTLE_ARENA_ENTRY:
        await this.activateBattleArena(userId, plan);
        break;
        
      case PaymentType.PREMIUM_FEATURES:
        await this.activatePremiumFeatures(userId, plan);
        break;
        
      case PaymentType.ENTERPRISE_LICENSE:
        await this.activateEnterpriseLicense(userId, plan);
        break;
        
      default:
        console.log(`Type de paiement non géré: ${type}`);
    }
  }
  
  // Activer les fonctionnalités d'agent
  private async activateAgentFeatures(userId: string, plan: PaymentPlan) {
    const features = this.getPlanFeatures(plan);
    
    // Mettre à jour les permissions utilisateur
    const { error } = await this.supabase
      .from('user_permissions')
      .upsert({
        userId,
        agentFeatures: features,
        plan,
        updatedAt: new Date()
      });
    
    if (error) throw error;
  }
  
  // Obtenir les fonctionnalités d'un plan
  private getPlanFeatures(plan: PaymentPlan): string[] {
    const planFeatures = {
      [PaymentPlan.FREE]: ['basic_agents', 'limited_queries'],
      [PaymentPlan.STARTER]: ['basic_agents', 'standard_queries', 'basic_analytics'],
      [PaymentPlan.PROFESSIONAL]: ['advanced_agents', 'unlimited_queries', 'advanced_analytics', 'priority_support'],
      [PaymentPlan.ENTERPRISE]: ['enterprise_agents', 'unlimited_queries', 'enterprise_analytics', 'dedicated_support', 'custom_integration'],
      [PaymentPlan.CUSTOM]: ['custom_features']
    };
    
    return planFeatures[plan] || [];
  }
  
  // Autres méthodes de gestion des webhooks...
  private async handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
    // Logique pour facture payée
  }
  
  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    // Logique pour facture échouée
  }
  
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    // Logique pour abonnement supprimé
  }
  
  // Méthodes utilitaires
  async getUserBilling(userId: string): Promise<NovaiaBilling | null> {
    const { data, error } = await this.supabase
      .from('novaia_billing')
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error) return null;
    return data;
  }
  
  async getUserPayments(userId: string): Promise<NovaiaPayment[]> {
    const { data, error } = await this.supabase
      .from('novaia_payments')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) return [];
    return data || [];
  }
  
  async cancelSubscription(userId: string): Promise<boolean> {
    try {
      const billing = await this.getUserBilling(userId);
      if (!billing?.stripeSubscriptionId) return false;
      
      await this.stripe.subscriptions.update(billing.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
      
      return true;
    } catch (error) {
      console.error('Erreur annulation abonnement:', error);
      return false;
    }
  }
}

// Instance globale du système de paiements
export const novaiaPaymentSystem = new NovaiaPaymentSystem(); 