import Stripe from 'stripe';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

export interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  plan: string;
}

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'eur',
    metadata?: Record<string, string>
  ): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe utilise les centimes
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret!,
      };
    } catch (error) {
      console.error('Erreur création PaymentIntent:', error);
      throw new Error('Échec de la création du paiement');
    }
  }

  async createCustomer(
    email: string,
    name?: string,
    phone?: string
  ): Promise<Customer> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        phone,
      });

      return {
        id: customer.id,
        email: customer.email!,
        name: customer.name || undefined,
        phone: customer.phone || undefined,
      };
    } catch (error) {
      console.error('Erreur création client:', error);
      throw new Error('Échec de la création du client');
    }
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret!,
      };
    } catch (error) {
      console.error('Erreur récupération PaymentIntent:', error);
      throw new Error('Échec de la récupération du paiement');
    }
  }

  async createSubscription(
    customerId: string,
    priceId: string,
    metadata?: Record<string, string>
  ) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        metadata,
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error) {
      console.error('Erreur création abonnement:', error);
      throw new Error('Échec de la création de l\'abonnement');
    }
  }

  async createCheckoutSession(
    priceId: string,
    successUrl: string,
    cancelUrl: string,
    metadata?: Record<string, string>
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
      });

      return session;
    } catch (error) {
      console.error('Erreur création session checkout:', error);
      throw new Error('Échec de la création de la session de paiement');
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });

      return refund;
    } catch (error) {
      console.error('Erreur remboursement:', error);
      throw new Error('Échec du remboursement');
    }
  }

  async getPaymentMethods(customerId: string) {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods.data;
    } catch (error) {
      console.error('Erreur récupération méthodes de paiement:', error);
      throw new Error('Échec de la récupération des méthodes de paiement');
    }
  }

  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: customerId,
        }
      );

      return paymentMethod;
    } catch (error) {
      console.error('Erreur attachement méthode de paiement:', error);
      throw new Error('Échec de l\'attachement de la méthode de paiement');
    }
  }

  async detachPaymentMethod(paymentMethodId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.detach(
        paymentMethodId
      );

      return paymentMethod;
    } catch (error) {
      console.error('Erreur détachement méthode de paiement:', error);
      throw new Error('Échec du détachement de la méthode de paiement');
    }
  }

  async createInvoice(
    customerId: string,
    amount: number,
    currency: string = 'eur',
    description?: string
  ) {
    try {
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        currency,
        description,
        collection_method: 'send_invoice',
        days_until_due: 30,
      });

      await this.stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        amount: Math.round(amount * 100),
        currency,
        description: description || 'Service',
      });

      const finalizedInvoice = await this.stripe.invoices.finalizeInvoice(
        invoice.id
      );

      return finalizedInvoice;
    } catch (error) {
      console.error('Erreur création facture:', error);
      throw new Error('Échec de la création de la facture');
    }
  }

  async sendInvoice(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.sendInvoice(invoiceId);
      return invoice;
    } catch (error) {
      console.error('Erreur envoi facture:', error);
      throw new Error('Échec de l\'envoi de la facture');
    }
  }

  async getInvoice(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.retrieve(invoiceId);
      return invoice;
    } catch (error) {
      console.error('Erreur récupération facture:', error);
      throw new Error('Échec de la récupération de la facture');
    }
  }

  async listInvoices(customerId?: string, limit: number = 10) {
    try {
      const invoices = await this.stripe.invoices.list({
        customer: customerId,
        limit,
      });

      return invoices.data;
    } catch (error) {
      console.error('Erreur liste factures:', error);
      throw new Error('Échec de la récupération des factures');
    }
  }

  // Obtenir les abonnements d'un client
  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
      });

      return subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        current_period_end: sub.current_period_end,
        plan: sub.items.data[0]?.price.id || '',
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des abonnements:', error);
      return [];
    }
  }

  // Obtenir les informations d'un client
  async getCustomer(customerId: string): Promise<any | null> {
    try {
      return await this.stripe.customers.retrieve(customerId);
    } catch (error) {
      console.error('Erreur lors de la récupération du client:', error);
      return null;
    }
  }

  // Obtenir les prix disponibles
  async getPrices(active: boolean = true): Promise<any[]> {
    try {
      const prices = await this.stripe.prices.list({
        active,
        expand: ['data.product'],
      });

      return prices.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des prix:', error);
      return [];
    }
  }

  // Créer un produit
  async createProduct(name: string, description?: string, metadata?: any): Promise<string | null> {
    try {
      const product = await this.stripe.products.create({
        name,
        description,
        metadata: {
          ...metadata,
          platform: 'DAVY Trading Platform',
        },
      });

      return product.id;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      return null;
    }
  }

  // Créer un prix
  async createPrice(
    productId: string,
    amount: number,
    currency: string = 'eur',
    recurring?: { interval: 'day' | 'week' | 'month' | 'year'; interval_count?: number }
  ): Promise<string | null> {
    try {
      const priceData: any = {
        product: productId,
        unit_amount: Math.round(amount * 100),
        currency,
        metadata: {
          platform: 'DAVY Trading Platform',
        },
      };

      if (recurring) {
        priceData.recurring = recurring;
      }

      const price = await this.stripe.prices.create(priceData);
      return price.id;
    } catch (error) {
      console.error('Erreur lors de la création du prix:', error);
      return null;
    }
  }

  // Obtenir les statistiques de paiement
  async getPaymentStats(days: number = 30): Promise<any> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const payments = await this.stripe.paymentIntents.list({
        created: {
          gte: Math.floor(startDate.getTime() / 1000),
          lte: Math.floor(endDate.getTime() / 1000),
        },
        limit: 100,
      });

      const totalAmount = payments.data.reduce((sum: number, payment: any) => {
        return sum + (payment.amount || 0);
      }, 0);

      const successfulPayments = payments.data.filter(payment => payment.status === 'succeeded');

      return {
        totalPayments: payments.data.length,
        successfulPayments: successfulPayments.length,
        totalAmount: totalAmount / 100,
        successRate: payments.data.length > 0 ? (successfulPayments.length / payments.data.length) * 100 : 0,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        totalPayments: 0,
        successfulPayments: 0,
        totalAmount: 0,
        successRate: 0,
      };
    }
  }
}

// Instance singleton
export const stripeService = new StripeService(); 