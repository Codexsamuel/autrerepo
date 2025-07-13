'use client';

import CreditsDisplay from '@/src/components/subscription/CreditsDisplay';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    Crown,
    Star
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SubscriptionPage() {
  const [userId] = useState('demo-user-123'); // En production, récupérer depuis l'auth

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Abonnements</h1>
                <p className="text-gray-600">Gérez vos crédits et abonnements DL Solutions</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Crown className="h-4 w-4" />
              <span>Plateforme Premium</span>
            </div>
          </div>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <CreditsDisplay userId={userId} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statut de l'abonnement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut de l'Abonnement</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan actuel</span>
                  <span className="font-medium text-gray-900">Gratuit</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prochain renouvellement</span>
                  <span className="font-medium text-gray-900">-</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Statut</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Actif
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Avantages Premium */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 text-purple-600 mr-2" />
                Avantages Premium
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Accès illimité à toutes les IA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">OSINT avancé (9 sources)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Trading avec IA prédictive</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Quantum Intelligence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Support prioritaire</span>
                </li>
              </ul>
            </motion.div>

            {/* Statistiques d'utilisation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prompts utilisés ce mois</span>
                  <span className="font-medium text-gray-900">0 / 3</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  Renouvellement dans 30 jours
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions Fréquentes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Comment fonctionnent les crédits ?</h4>
              <p className="text-gray-600 text-sm">
                Chaque utilisation d'une IA consomme 1 crédit. Vous avez 3 crédits gratuits par mois, 
                renouvelés automatiquement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Puis-je annuler mon abonnement ?</h4>
              <p className="text-gray-600 text-sm">
                Oui, vous pouvez annuler à tout moment. Votre abonnement restera actif jusqu'à la fin 
                de la période payée.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Les crédits sont-ils cumulables ?</h4>
              <p className="text-gray-600 text-sm">
                Les crédits payants se cumulent avec les crédits gratuits. Les crédits payants sont 
                consommés en premier.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Y a-t-il un engagement ?</h4>
              <p className="text-gray-600 text-sm">
                Non, tous nos abonnements sont sans engagement. Vous pouvez annuler à tout moment 
                sans frais.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 