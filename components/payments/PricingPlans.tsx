'use client';

import React from 'react';
import { PaymentCard } from './PaymentCard';
import { PaymentPlan, PaymentType } from '@/lib/payments/novaia-payment-system';

interface PricingPlansProps {
  onSelectPlan: (plan: PaymentPlan, type: PaymentType) => void;
}

const plans = [
  {
    plan: PaymentPlan.FREE,
    type: PaymentType.AGENT_SUBSCRIPTION,
    name: 'Gratuit',
    description: 'Découvrez NovaIA avec des fonctionnalités de base',
    price: 0,
    currency: '€',
    features: [
      '2 agents IA de base',
      '100 requêtes par mois',
      'Support communautaire',
      'Accès au marketplace de base',
      'Battle Arena limité'
    ],
    popular: false
  },
  {
    plan: PaymentPlan.STARTER,
    type: PaymentType.AGENT_SUBSCRIPTION,
    name: 'Starter',
    description: 'Parfait pour les développeurs et petites équipes',
    price: 29,
    currency: '€',
    features: [
      '5 agents IA avancés',
      '1000 requêtes par mois',
      'Analytics de base',
      'Support par email',
      'Accès complet au marketplace',
      'Battle Arena complet',
      'Formations incluses'
    ],
    popular: true
  },
  {
    plan: PaymentPlan.PROFESSIONAL,
    type: PaymentType.AGENT_SUBSCRIPTION,
    name: 'Professional',
    description: 'Pour les équipes professionnelles et entreprises',
    price: 99,
    currency: '€',
    features: [
      '20 agents IA professionnels',
      'Requêtes illimitées',
      'Analytics avancés',
      'Support prioritaire',
      'Marketplace premium',
      'Battle Arena premium',
      'Formations avancées',
      'API personnalisée',
      'Intégrations avancées'
    ],
    popular: false
  },
  {
    plan: PaymentPlan.ENTERPRISE,
    type: PaymentType.ENTERPRISE_LICENSE,
    name: 'Enterprise',
    description: 'Solutions sur mesure pour grandes entreprises',
    price: 299,
    currency: '€',
    features: [
      'Agents IA illimités',
      'Requêtes illimitées',
      'Analytics enterprise',
      'Support dédié 24/7',
      'Marketplace enterprise',
      'Battle Arena enterprise',
      'Formations sur mesure',
      'API enterprise',
      'Intégrations personnalisées',
      'Déploiement on-premise',
      'SLA garanti'
    ],
    popular: false
  }
];

export function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Plans de Paiement NovaIA
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choisissez le plan qui correspond à vos besoins. Tous les plans incluent 
          l'accès à l'écosystème complet NovaIA avec des fonctionnalités adaptées.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((planData) => (
          <PaymentCard
            key={planData.plan}
            plan={planData.plan}
            type={planData.type}
            name={planData.name}
            description={planData.description}
            price={planData.price}
            currency={planData.currency}
            features={planData.features}
            popular={planData.popular}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Besoin d'un plan personnalisé ?
        </p>
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
          Contactez-nous
        </button>
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Fonctionnalités Incluses dans Tous les Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Agents IA Avancés</h3>
            <p className="text-gray-600">
              Accès à tous les agents NovaIA avec des capacités d'apprentissage continu
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Complets</h3>
            <p className="text-gray-600">
              Tableaux de bord détaillés et métriques de performance en temps réel
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité Enterprise</h3>
            <p className="text-gray-600">
              Chiffrement AES-256, RBAC/ABAC et conformité aux standards de sécurité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 