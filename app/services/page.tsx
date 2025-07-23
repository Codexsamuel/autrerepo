"use client";

import ContentAd from '@/components/ads/ContentAds';
import { SubscriptionGuard } from '@/components/guards/SubscriptionGuard';
import { Brain, Building2, Database, Globe, Shield, ShoppingCart, Smartphone, Target, TrendingUp, Users, Video, Zap } from "lucide-react";

const services = [
  {
    title: "Intelligence Artificielle",
    description: "Solutions IA personnalisées pour automatiser et optimiser vos processus métier",
    icon: Brain,
    features: ["Chatbots IA", "Analyse prédictive", "Automatisation", "Machine Learning"],
    status: "active",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "E-commerce & Vente",
    description: "Plateformes e-commerce complètes avec gestion des paiements et analytics",
    icon: ShoppingCart,
    features: ["Boutiques en ligne", "Paiements sécurisés", "Gestion des stocks", "Marketing automation"],
    status: "active",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "CRM & Gestion Client",
    description: "Systèmes de gestion de la relation client adaptés à votre secteur",
    icon: Users,
    features: ["Gestion des contacts", "Suivi des ventes", "Automatisation", "Analytics"],
    status: "active",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Solutions Sectorielles",
    description: "CRM/ERP spécialisés pour l'immobilier, la banque, l'hôtellerie et plus",
    icon: Building2,
    features: ["Immobilier", "Banque", "Hôtellerie", "Assurance"],
    status: "active",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Trading & Finance",
    description: "Plateformes de trading automatisées avec IA et gestion des risques",
    icon: TrendingUp,
    features: ["Trading automatisé", "IA prédictive", "Gestion des risques", "Analytics avancés"],
    status: "active",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Sécurité & Conformité",
    description: "Solutions de cybersécurité et conformité réglementaire",
    icon: Shield,
    features: ["Audit de sécurité", "Conformité RGPD", "Chiffrement", "Monitoring"],
    status: "active",
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Développement Web",
    description: "Sites web et applications sur mesure avec technologies modernes",
    icon: Globe,
    features: ["Sites responsives", "Applications web", "APIs", "Maintenance"],
    status: "active",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Applications Mobiles",
    description: "Applications iOS et Android natives et cross-platform",
    icon: Smartphone,
    features: ["iOS & Android", "React Native", "Flutter", "PWA"],
    status: "active",
    color: "from-teal-500 to-blue-500"
  },
  {
    title: "Édition Vidéo IA",
    description: "Outils d'édition vidéo assistés par intelligence artificielle",
    icon: Video,
    features: ["Édition automatique", "IA générative", "Templates", "Export multi-format"],
    status: "active",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Bases de Données",
    description: "Conception et optimisation de bases de données performantes",
    icon: Database,
    features: ["Architecture DB", "Optimisation", "Migration", "Maintenance"],
    status: "active",
    color: "from-gray-500 to-slate-500"
  },
  {
    title: "Intégrations API",
    description: "Connexion et synchronisation entre vos différents outils",
    icon: Zap,
    features: ["APIs REST", "Webhooks", "Synchronisation", "Monitoring"],
    status: "active",
    color: "from-amber-500 to-yellow-500"
  },
  {
    title: "Formation & Consulting",
    description: "Formation de vos équipes et accompagnement stratégique",
    icon: Target,
    features: ["Formation sur mesure", "Consulting", "Accompagnement", "Support"],
    status: "active",
    color: "from-emerald-500 to-green-500"
  }
]

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <>
      <SubscriptionGuard>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Services Premium
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre écosystème digital complet avec des solutions sur mesure pour votre entreprise
              </p>
            </div>

            {/* Publicité en haut de page */}
            <ContentAd position="top" className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Service 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-3">CRM & Gestion Client</h3>
                <p className="text-gray-600 mb-4">
                  Solutions CRM complètes pour optimiser la relation client et augmenter vos ventes.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  En savoir plus
                </button>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold mb-3">Boutique Internationale</h3>
                <p className="text-gray-600 mb-4">
                  Boutique en ligne avec produits du monde entier et livraison au Cameroun.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Découvrir
                </button>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-3">Formations Professionnelles</h3>
                <p className="text-gray-600 mb-4">
                  Formations certifiantes en ligne pour développer vos compétences.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Commencer
                </button>
              </div>
            </div>

            {/* Publicité au milieu */}
            <ContentAd position="middle" className="my-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Service 4 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Analytics & Reporting</h3>
                <p className="text-gray-600 mb-4">
                  Tableaux de bord avancés et analyses détaillées pour prendre les bonnes décisions.
                </p>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Analyser
                </button>
              </div>

              {/* Service 5 */}
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-3">Sécurité & Conformité</h3>
                <p className="text-gray-600 mb-4">
                  Protection de vos données et conformité aux réglementations internationales.
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Sécuriser
                </button>
              </div>
            </div>

            {/* Publicité en bas */}
            <ContentAd position="bottom" className="mt-8" />

            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Rejoignez des milliers d'entreprises qui font confiance à DL Solutions
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Commencer Maintenant
              </button>
            </div>
          </div>
        </div>
      </SubscriptionGuard>
    </>
  )
}
