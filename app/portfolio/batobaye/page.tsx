'use client';

import { CheckCircle, ExternalLink, Github, Play, ShoppingCart, BarChart3, Bot, Shield, Zap, Users, Database, FileText, Search, Package, CreditCard, ShoppingBag, Mail, Phone, TrendingUp, Award, Target, Rocket, Info } from 'lucide-react';
import { useState } from 'react';
import BatobayeLauncher from '../../../components/BatobayeLauncher';
import SEOOptimizedHead from '../../../components/SEOOptimizedHead';
import { generateBatobayeStructuredData } from '../../../lib/structured-data';

export default function BatobayeProjectPage() {
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const startDemo = () => {
    setIsDemoRunning(true);
    setTimeout(() => {
      window.open('http://localhost:3000', '_blank');
    }, 2000);
  };

  return (
    <>
      <SEOOptimizedHead
        title="Batobaye Marketplace - Plateforme E-commerce Complète | DL Solutions Davy & Lucie"
        description="Batobaye Marketplace par DL Solutions - Plateforme e-commerce complète avec dashboard admin VIP, IA intégrée, paiement CinetPay. Solution marketplace moderne au Cameroun."
        keywords="Batobaye, Batobaye Market, marketplace Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, vente en ligne Cameroun, DL Solutions, Davy, Lucie, Dave and Luce, CinetPay, OpenAI, Sage Compta, dashboard admin, gestion produits, inventaire en ligne, analytics e-commerce, IA e-commerce"
        image="/images/batobaye-og.jpg"
        url="https://dlsolutions.com/portfolio/batobaye"
        type="website"
        structuredData={generateBatobayeStructuredData()}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl mr-6">
              <ShoppingCart className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Batobaye E-commerce</h1>
              <p className="text-xl opacity-90">Solution E-commerce Complète avec IA</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Plateforme e-commerce moderne avec dashboard admin VIP, intégrations IA avancées, 
            et système de paiement sécurisé. Prêt pour la production et facilement adaptable.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">45,000+</div>
            <div className="text-sm text-gray-600">Lignes de code</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Technologies</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50</div>
            <div className="text-sm text-gray-600">Fonctionnalités</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Performance</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">A+</div>
            <div className="text-sm text-gray-600">Sécurité</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Accessibilité</div>
          </div>
        </div>

        {/* Lanceur Batobaye */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lanceur Automatique</h2>
          <div className="max-w-2xl mx-auto">
            <BatobayeLauncher 
              onLaunch={() => {
                console.log('Batobaye lancé avec succès !');
              }}
            />
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fonctionnalités Principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Site E-commerce */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-blue-600" />
                Site E-commerce
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Catalogue produits avec filtres
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Panier d'achat persistant
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Checkout sécurisé CinetPay
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Recherche intelligente IA
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Responsive design mobile
                </div>
              </div>
            </div>

            {/* Dashboard Admin */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
                Dashboard Admin VIP
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  15+ pages spécialisées
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Gestion produits/inventaire
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Assistant IA intégré
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Analytics en temps réel
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Intégration Sage Compta
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Instructions de démarrage</h3>
          <div className="space-y-3 text-gray-700">
            <p>1. <strong>Cloner le projet :</strong> <code className="bg-gray-200 px-2 py-1 rounded">git clone https://github.com/Codexsamuel/batobaye</code></p>
            <p>2. <strong>Installer les dépendances :</strong> <code className="bg-gray-200 px-2 py-1 rounded">pnpm install</code></p>
            <p>3. <strong>Configurer l'environnement :</strong> <code className="bg-gray-200 px-2 py-1 rounded">cp .env.example .env.local</code></p>
            <p>4. <strong>Lancer en développement :</strong> <code className="bg-gray-200 px-2 py-1 rounded">pnpm dev</code></p>
            <p>5. <strong>Accéder au site :</strong> <a href="http://localhost:3000" className="text-blue-600 hover:underline">http://localhost:3000</a></p>
          </div>
        </div>

        {/* Liens */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <Github className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Code Source</h4>
              <p className="text-blue-100 mb-4">Accédez au code source complet sur GitHub</p>
              <a
                href="https://github.com/Codexsamuel/batobaye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
              >
                Voir le code
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="text-center">
              <ExternalLink className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Site Live</h4>
              <p className="text-blue-100 mb-4">Découvrez le site en production</p>
              <a
                href="https://batobaye.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
              >
                Visiter le site
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 