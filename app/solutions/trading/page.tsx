"use client"

// Removed motion import
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, TrendingUp, AlertCircle, Wallet, BarChart3, Settings, Users, Shield } from "lucide-react"

const features = [
  {
    title: "Suivi des Marchés",
    description: "Surveillez les marchés en temps réel avec des outils avancés",
    icon: <LineChart className="w-8 h-8 text-blue-600" />,
    details: [
      "Données en temps réel",
      "Graphiques interactifs",
      "Indicateurs techniques",
      "Alertes personnalisées"
    ]
  },
  {
    title: "Gestion des Portefeuilles",
    description: "Gérez efficacement vos investissements et portefeuilles",
    icon: <Wallet className="w-8 h-8 text-green-600" />,
    details: [
      "Suivi des actifs",
      "Analyse de performance",
      "Répartition des risques",
      "Rapports détaillés"
    ]
  },
  {
    title: "Analyse Technique",
    description: "Utilisez des outils d'analyse avancés pour vos décisions",
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    details: [
      "Indicateurs techniques",
      "Patterns de trading",
      "Backtesting",
      "Optimisation des stratégies"
    ]
  },
  {
    title: "Gestion des Risques",
    description: "Protégez vos investissements avec des outils de gestion des risques",
    icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
    details: [
      "Stop-loss automatiques",
      "Limites de position",
      "Analyse de risque",
      "Alertes de sécurité"
    ]
  },
  {
    title: "Tableaux de Bord",
    description: "Visualisez vos performances et prenez des décisions éclairées",
    icon: <BarChart3 className="w-8 h-8 text-red-600" />,
    details: [
      "KPIs personnalisables",
      "Rapports automatisés",
      "Analyses de performance",
      "Prévisions de marché"
    ]
  },
  {
    title: "Sécurité",
    description: "Protégez vos données et transactions",
    icon: <Shield className="w-8 h-8 text-indigo-600" />,
    details: [
      "Authentification forte",
      "Chiffrement des données",
      "Journal des transactions",
      "Protection contre les fraudes"
    ]
  }
]

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CRM Trading
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une plateforme complète pour le trading professionnel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 