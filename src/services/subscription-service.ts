import { supabase } from '@/lib/supabase/client';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  promptsPerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export interface UserCredits {
  userId: string;
  freeCreditsRemaining: number;
  paidCreditsRemaining: number;
  subscriptionPlan?: string;
  subscriptionEndDate?: Date;
  lastResetDate: Date;
}

export class SubscriptionService {
  private static readonly FREE_CREDITS_PER_MONTH = 3;
  private static readonly FREE_CREDITS_RESET_DAYS = 30;

  // Plans d'abonnement disponibles
  public static readonly SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 9.99,
      currency: 'EUR',
      promptsPerMonth: 50,
      features: [
        '50 prompts par mois',
        'Accès à toutes les IA (Ultra AI, Dark GPT, Multi-AI)',
        'OSINT avancé (5 sources)',
        'Trading temps réel',
        'Support email'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29.99,
      currency: 'EUR',
      promptsPerMonth: 200,
      features: [
        '200 prompts par mois',
        'Accès complet à toutes les fonctionnalités',
        'OSINT avancé (9 sources)',
        'Trading avec IA prédictive',
        'Scraping multi-sources',
        'Support prioritaire',
        'API access'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      currency: 'EUR',
      promptsPerMonth: 1000,
      features: [
        '1000 prompts par mois',
        'Toutes les fonctionnalités avancées',
        'Quantum Intelligence',
        'Métaverse-Blockchain Intelligence',
        'Support dédié 24/7',
        'API complète',
        'Intégrations personnalisées',
        'Formation équipe'
      ]
    }
  ];

  /**
   * Crée un nouvel utilisateur avec 3 crédits gratuits
   */
  static async createUser(userId: string, email: string = ''): Promise<UserCredits> {
    const { data: existingUser, error: checkError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingUser) {
      // L'utilisateur existe déjà, retourner ses crédits
      return {
        userId: existingUser.user_id,
        freeCreditsRemaining: existingUser.free_credits_remaining,
        paidCreditsRemaining: existingUser.paid_credits_remaining,
        subscriptionPlan: existingUser.subscription_plan,
        subscriptionEndDate: existingUser.subscription_end_date ? new Date(existingUser.subscription_end_date) : undefined,
        lastResetDate: new Date(existingUser.last_reset_date)
      };
    }

    // Créer un nouvel utilisateur avec 3 crédits gratuits
    const { data: newUser, error: createError } = await supabase
      .from('user_credits')
      .insert([{
        user_id: userId,
        email: email,
        free_credits_remaining: this.FREE_CREDITS_PER_MONTH,
        paid_credits_remaining: 0,
        last_reset_date: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) throw createError;

    return {
      userId: newUser.user_id,
      freeCreditsRemaining: newUser.free_credits_remaining,
      paidCreditsRemaining: newUser.paid_credits_remaining,
      subscriptionPlan: newUser.subscription_plan,
      subscriptionEndDate: newUser.subscription_end_date ? new Date(newUser.subscription_end_date) : undefined,
      lastResetDate: new Date(newUser.last_reset_date)
    };
  }

  /**
   * Vérifie les crédits disponibles pour un utilisateur
   */
  static async checkUserCredits(userId: string): Promise<UserCredits> {
    // Récupérer les crédits existants
    const { data: existingCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    let userCredits: UserCredits;

    if (!existingCredits) {
      // Créer un nouveau compte avec 3 crédits gratuits
      const { data: newCredits, error: createError } = await supabase
        .from('user_credits')
        .insert([{
          user_id: userId,
          free_credits_remaining: this.FREE_CREDITS_PER_MONTH,
          paid_credits_remaining: 0,
          last_reset_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (createError) throw createError;
      userCredits = {
        userId: newCredits.user_id,
        freeCreditsRemaining: newCredits.free_credits_remaining,
        paidCreditsRemaining: newCredits.paid_credits_remaining,
        subscriptionPlan: newCredits.subscription_plan,
        subscriptionEndDate: newCredits.subscription_end_date ? new Date(newCredits.subscription_end_date) : undefined,
        lastResetDate: new Date(newCredits.last_reset_date)
      };
    } else {
      // Vérifier si les crédits gratuits doivent être réinitialisés
      const lastReset = new Date(existingCredits.last_reset_date);
      const daysSinceReset = Math.floor(
        (Date.now() - lastReset.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceReset >= this.FREE_CREDITS_RESET_DAYS) {
        const { data: updatedCredits, error: updateError } = await supabase
          .from('user_credits')
          .update({
            free_credits_remaining: this.FREE_CREDITS_PER_MONTH,
            last_reset_date: new Date().toISOString()
          })
          .eq('user_id', userId)
          .select()
          .single();

        if (updateError) throw updateError;
        userCredits = {
          userId: updatedCredits.user_id,
          freeCreditsRemaining: updatedCredits.free_credits_remaining,
          paidCreditsRemaining: updatedCredits.paid_credits_remaining,
          subscriptionPlan: updatedCredits.subscription_plan,
          subscriptionEndDate: updatedCredits.subscription_end_date ? new Date(updatedCredits.subscription_end_date) : undefined,
          lastResetDate: new Date(updatedCredits.last_reset_date)
        };
      } else {
        userCredits = {
          userId: existingCredits.user_id,
          freeCreditsRemaining: existingCredits.free_credits_remaining,
          paidCreditsRemaining: existingCredits.paid_credits_remaining,
          subscriptionPlan: existingCredits.subscription_plan,
          subscriptionEndDate: existingCredits.subscription_end_date ? new Date(existingCredits.subscription_end_date) : undefined,
          lastResetDate: new Date(existingCredits.last_reset_date)
        };
      }
    }

    return userCredits;
  }

  /**
   * Consomme un crédit pour un utilisateur
   */
  static async consumeCredit(userId: string): Promise<{ success: boolean; message: string; remainingCredits: number }> {
    const userCredits = await this.checkUserCredits(userId);

    // Essayer d'abord les crédits payants
    if (userCredits.paidCreditsRemaining > 0) {
      const { data: updatedCredits, error } = await supabase
        .from('user_credits')
        .update({ paid_credits_remaining: userCredits.paidCreditsRemaining - 1 })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Crédit payant consommé',
        remainingCredits: updatedCredits.paid_credits_remaining + updatedCredits.free_credits_remaining
      };
    }

    // Sinon, essayer les crédits gratuits
    if (userCredits.freeCreditsRemaining > 0) {
      const { data: updatedCredits, error } = await supabase
        .from('user_credits')
        .update({ free_credits_remaining: userCredits.freeCreditsRemaining - 1 })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Crédit gratuit consommé',
        remainingCredits: updatedCredits.paid_credits_remaining + updatedCredits.free_credits_remaining
      };
    }

    // Aucun crédit disponible
    return {
      success: false,
      message: 'Aucun crédit disponible. Veuillez souscrire à un abonnement.',
      remainingCredits: 0
    };
  }

  /**
   * Ajoute des crédits payants à un utilisateur
   */
  static async addPaidCredits(userId: string, credits: number): Promise<void> {
    const { error } = await supabase
      .from('user_credits')
      .update({ 
        paid_credits_remaining: supabase.rpc('increment', { 
          amount: credits, 
          row_id: userId 
        })
      })
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Met à jour l'abonnement d'un utilisateur
   */
  static async updateSubscription(userId: string, planId: string, endDate: Date): Promise<void> {
    const { error } = await supabase
      .from('user_credits')
      .update({
        subscription_plan: planId,
        subscription_end_date: endDate.toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Vérifie si un utilisateur a un abonnement actif
   */
  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_credits')
      .select('subscription_end_date')
      .eq('user_id', userId)
      .single();

    if (error || !data) return false;
    return new Date(data.subscription_end_date) > new Date();
  }

  /**
   * Récupère le plan d'abonnement d'un utilisateur
   */
  static async getUserPlan(userId: string): Promise<SubscriptionPlan | null> {
    const { data, error } = await supabase
      .from('user_credits')
      .select('subscription_plan')
      .eq('user_id', userId)
      .single();

    if (error || !data?.subscription_plan) return null;
    return this.SUBSCRIPTION_PLANS.find(plan => plan.id === data.subscription_plan) || null;
  }

  /**
   * Calcule le prix avec remise
   */
  static calculatePriceWithDiscount(plan: SubscriptionPlan, discountPercent: number = 0): number {
    return plan.price * (1 - discountPercent / 100);
  }

  /**
   * Crée une session de paiement (simulation pour l'exemple)
   */
  static async createCheckoutSession(planId: string, userId: string, successUrl: string, cancelUrl: string): Promise<string> {
    // Simulation - dans un vrai projet, intégrer Stripe ou autre
    const plan = this.SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) throw new Error('Plan non trouvé');

    // Retourner une URL de simulation
    return `${successUrl}?session_id=sim_${Date.now()}&plan_id=${planId}&user_id=${userId}`;
  }

  /**
   * Gère un paiement réussi
   */
  static async handleSuccessfulPayment(userId: string, planId: string, sessionId: string): Promise<void> {
    const plan = this.SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) throw new Error('Plan non trouvé');

    // Ajouter les crédits et mettre à jour l'abonnement
    await this.addPaidCredits(userId, plan.promptsPerMonth);
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 mois
    await this.updateSubscription(userId, planId, endDate);
  }
} 