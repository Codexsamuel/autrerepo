'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Analytics,
    CheckCircle,
    Crown,
    Globe,
    MessageSquare,
    Shield,
    Star,
    Users,
    Video,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  popular?: boolean;
  icon: any;
  color: string;
}

export function PremiumSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Gratuit',
      price: 0,
      currency: 'FCFA',
      period: 'mois',
      features: [
        'Profil basique',
        'Connexions limitées (100)',
        'Messages directs (5/jour)',
        'Recherche basique',
        'Accès aux groupes publics'
      ],
      icon: Users,
      color: 'bg-gray-500'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 15000 : 150000,
      currency: 'FCFA',
      period: billingPeriod === 'monthly' ? 'mois' : 'an',
      features: [
        'Profil vérifié avec badge',
        'Connexions illimitées',
        'Messages directs illimités',
        'Appels audio et vidéo',
        'Accès aux groupes privés',
        'Analytics avancés',
        'Support prioritaire',
        'Recherche avancée'
      ],
      popular: true,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      price: billingPeriod === 'monthly' ? 50000 : 500000,
      currency: 'FCFA',
      period: billingPeriod === 'monthly' ? 'mois' : 'an',
      features: [
        'Tout Premium +',
        'Page entreprise vérifiée',
        'Recrutement illimité',
        'Analytics entreprise',
        'API d\'intégration',
        'Formation équipe',
        'Gestion des rôles',
        'Support dédié 24/7'
      ],
      icon: Crown,
      color: 'bg-yellow-500'
    }
  ];

  const handleSubscribe = (planId: string) => {
    console.log('Abonnement à:', planId, 'Période:', billingPeriod);
    // Logique de paiement
  };

  const getSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre plan NovaWorld
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Débloquez toutes les fonctionnalités premium et connectez-vous avec les hauts cadres africains
          </p>
        </div>

        {/* Sélecteur de période */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annuel
                {billingPeriod === 'yearly' && (
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                    Économisez {getSavings(15000, 150000)}%
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Plans d'abonnement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative bg-white border-2 transition-all hover:shadow-lg ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                    Le plus populaire
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Gratuit' : plan.price.toLocaleString()}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-2">
                      {plan.currency}/{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.id !== 'free' && (
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-3 text-lg font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    } text-white`}
                  >
                    {plan.id === 'premium' ? 'Commencer Premium' : 'Commencer Entreprise'}
                  </Button>
                )}

                {plan.id === 'free' && (
                  <Button variant="outline" className="w-full py-3 text-lg font-semibold border-gray-300 text-gray-700">
                    Plan actuel
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fonctionnalités détaillées */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Fonctionnalités Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Appels vidéo & audio</h3>
              <p className="text-sm text-gray-600">
                Communiquez en direct avec vos connexions professionnelles
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Messages illimités</h3>
              <p className="text-sm text-gray-600">
                Contactez autant de professionnels que vous le souhaitez
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connexions illimitées</h3>
              <p className="text-sm text-gray-600">
                Développez votre réseau sans restrictions
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Analytics className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics avancés</h3>
              <p className="text-sm text-gray-600">
                Suivez vos performances et optimisez votre présence
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Groupes privés</h3>
              <p className="text-sm text-gray-600">
                Accédez aux communautés exclusives
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support prioritaire</h3>
              <p className="text-sm text-gray-600">
                Assistance dédiée et réponse rapide
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment fonctionne la vérification des profils ?
              </h3>
              <p className="text-gray-600">
                Nous vérifions l'identité et les documents professionnels de chaque utilisateur premium 
                pour garantir la qualité du réseau et la confiance entre membres.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je annuler mon abonnement à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez annuler votre abonnement à tout moment depuis votre profil. 
                Vous conserverez l'accès premium jusqu'à la fin de la période payée.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Les appels vidéo sont-ils sécurisés ?
              </h3>
              <p className="text-gray-600">
                Absolument ! Toutes nos communications sont chiffrées de bout en bout et respectent 
                les standards de sécurité les plus élevés pour protéger votre vie privée.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à rejoindre l'élite professionnelle africaine ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Commencez votre essai gratuit de 7 jours sans engagement
          </p>
          <Button 
            onClick={() => setSelectedPlan('premium')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Commencer l'essai gratuit
          </Button>
        </div>
      </div>
    </div>
  );
} 