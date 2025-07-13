'use client';

import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    Crown,
    Loader2,
    ShoppingCart,
    Star,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreditsDisplayProps {
  userId: string;
  onCreditConsumed?: (remaining: number) => void;
}

interface UserCredits {
  userId: string;
  freeCreditsRemaining: number;
  paidCreditsRemaining: number;
  subscriptionPlan?: string;
  subscriptionEndDate?: Date;
  lastResetDate: Date;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  promptsPerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export default function CreditsDisplay({ userId, onCreditConsumed }: CreditsDisplayProps) {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCreditsAndPlans();
  }, [userId]);

  const loadCreditsAndPlans = async () => {
    try {
      setLoading(true);
      
      // Charger les crédits
      const creditsResponse = await fetch(`/api/subscription?action=credits&userId=${userId}`);
      const creditsData = await creditsResponse.json();
      
      if (creditsData.success) {
        setCredits(creditsData.data);
      }

      // Charger les plans
      const plansResponse = await fetch(`/api/subscription?action=plans&userId=${userId}`);
      const plansData = await plansResponse.json();
      
      if (plansData.success) {
        setPlans(plansData.data);
      }
    } catch (error) {
      console.error('Erreur chargement crédits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setProcessing(true);
      
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-checkout',
          userId,
          planId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Rediriger vers la page de paiement
        window.location.href = data.data.checkoutUrl;
      }
    } catch (error) {
      console.error('Erreur souscription:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2">Chargement des crédits...</span>
      </div>
    );
  }

  const totalCredits = (credits?.freeCreditsRemaining || 0) + (credits?.paidCreditsRemaining || 0);
  const isLowCredits = totalCredits <= 1;

  return (
    <div className="space-y-6">
      {/* Affichage des crédits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Crédits Disponibles</h3>
              <p className="text-sm text-gray-600">
                {credits?.subscriptionPlan ? 'Abonnement actif' : 'Plan gratuit'}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {totalCredits}
            </div>
            <div className="text-sm text-gray-600">
              {credits?.freeCreditsRemaining || 0} gratuit + {credits?.paidCreditsRemaining || 0} payant
            </div>
          </div>
        </div>

        {isLowCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-700">
                Crédits faibles ! Souscrivez à un abonnement pour continuer.
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Bouton pour voir les plans */}
      <div className="text-center">
        <button
          onClick={() => setShowPlans(!showPlans)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Crown className="h-5 w-5 mr-2" />
          {showPlans ? 'Masquer les plans' : 'Voir les plans d\'abonnement'}
        </button>
      </div>

      {/* Plans d'abonnement */}
      {showPlans && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
                plan.isPopular 
                  ? 'border-purple-500 bg-gradient-to-b from-purple-50 to-white' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {plan.price}€
                </div>
                <div className="text-sm text-gray-600">par mois</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {plan.promptsPerMonth} prompts
                  </div>
                  <div className="text-sm text-gray-600">par mois</div>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={processing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Traitement...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Souscrire
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 