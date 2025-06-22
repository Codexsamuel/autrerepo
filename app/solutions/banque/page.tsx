"use client"

// Removed motion import
import { Card, CardContent } from "@/components/ui/card"
import { Banknote, CreditCard, LineChart, Shield, Users, FileText, BarChart3, Settings } from "lucide-react"

const features = [
  {
    title: "Gestion des Comptes",
    description: "Gérez efficacement les comptes de vos clients avec des outils avancés",
    icon: <Banknote className="w-8 h-8 text-blue-600" />,
    details: [
      "Suivi des opérations",
      "Gestion des soldes",
      "Historique des transactions",
      "Alertes personnalisées"
    ]
  },
  {
    title: "Services Bancaires",
    description: "Offrez une gamme complète de services bancaires à vos clients",
    icon: <CreditCard className="w-8 h-8 text-green-600" />,
    details: [
      "Gestion des cartes",
      "Prêts et crédits",
      "Investissements",
      "Assurances"
    ]
  },
  {
    title: "Analyse Financière",
    description: "Analysez les données financières pour une meilleure prise de décision",
    icon: <LineChart className="w-8 h-8 text-purple-600" />,
    details: [
      "Tableaux de bord",
      "Rapports personnalisés",
      "Analyses de tendances",
      "Prévisions financières"
    ]
  },
  {
    title: "Sécurité",
    description: "Protégez les données et transactions de vos clients",
    icon: <Shield className="w-8 h-8 text-orange-600" />,
    details: [
      "Authentification forte",
      "Détection des fraudes",
      "Chiffrement des données",
      "Audit de sécurité"
    ]
  },
  {
    title: "Gestion des Clients",
    description: "Centralisez les informations de vos clients",
    icon: <Users className="w-8 h-8 text-red-600" />,
    details: [
      "Profils clients",
      "Historique des interactions",
      "Segmentation",
      "Campagnes marketing"
    ]
  },
  {
    title: "Conformité",
    description: "Assurez la conformité réglementaire de vos opérations",
    icon: <FileText className="w-8 h-8 text-indigo-600" />,
    details: [
      "Rapports réglementaires",
      "Audit de conformité",
      "Gestion des risques",
      "Documentation"
    ]
  }
]

export default function BanquePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CRM Banque
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une solution complète pour la gestion bancaire moderne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
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
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 