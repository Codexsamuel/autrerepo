"use client";

import { Check, Star, Zap, Crown, Users, Shield, Clock, Globe } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

const pricingPlans = [
  {
    name: "Starter",
    price: "99€",
    originalPrice: "129€",
    period: "/mois",
    description: "Parfait pour les petites entreprises",
    icon: Zap,
    features: [
      "Gestion de base des contacts",
      "Suivi des transactions",
      "Rapports mensuels",
      "Support email",
      "1 utilisateur",
      "Stockage 5GB"
    ],
    buttonText: "Commencer",
    popular: false,
    savings: "23% d'économie"
  },
  {
    name: "Professional",
    price: "299€",
    originalPrice: "399€",
    period: "/mois",
    description: "Idéal pour les entreprises en croissance",
    icon: Users,
    features: [
      "Toutes les fonctionnalités Starter",
      "Gestion avancée des leads",
      "Automatisation des tâches",
      "Support prioritaire",
      "5 utilisateurs",
      "Formation incluse",
      "Stockage 25GB",
      "API de base"
    ],
    buttonText: "Essai gratuit",
    popular: true,
    savings: "25% d'économie"
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    originalPrice: "",
    period: "",
    description: "Solution complète pour grandes entreprises",
    icon: Crown,
    features: [
      "Toutes les fonctionnalités Professional",
      "API personnalisée",
      "Intégration sur mesure",
      "Support 24/7",
      "Utilisateurs illimités",
      "Formation dédiée",
      "SLA garanti",
      "Stockage illimité",
      "Déploiement cloud"
    ],
    buttonText: "Contactez-nous",
    popular: false,
    savings: "Prix négociable"
  }
];

const additionalServices = [
  {
    name: "Formation IA",
    price: "499€",
    description: "Formation complète sur l'IA et le machine learning",
    icon: Users,
    duration: "3 jours"
  },
  {
    name: "Consulting Digital",
    price: "150€/h",
    description: "Expertise en transformation digitale",
    icon: Globe,
    duration: "Sur mesure"
  },
  {
    name: "Support Premium",
    price: "199€",
    description: "Support technique prioritaire 24/7",
    icon: Shield,
    duration: "/mois"
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tarifs Transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent 
            une garantie de satisfaction de 30 jours.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Pas de frais cachés
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Annulation gratuite
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Support inclus
            </div>
          </div>
        </div>

        {/* Plans principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? 'border-blue-500 shadow-blue-100 scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 mr-2" />
                  Le plus populaire
                </Badge>
              )}

              <div className="p-8">
                {/* En-tête du plan */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Prix */}
                  <div className="mb-4">
                    {plan.price === "Sur mesure" ? (
                      <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                    ) : (
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-lg text-gray-500">{plan.period}</span>
                      </div>
                    )}
                    
                    {plan.originalPrice && plan.originalPrice !== plan.price && (
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {plan.savings}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fonctionnalités */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bouton */}
                <Button
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Services additionnels */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Services Additionnels
          </h3>
          <p className="text-lg text-gray-600">
            Complétez votre solution avec nos services spécialisés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {additionalServices.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <service.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-2">{service.price}</div>
                <div className="text-sm text-gray-500">{service.duration}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Besoin d'une solution sur mesure ?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Nos experts sont là pour vous accompagner dans votre transformation digitale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Demander un devis
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 