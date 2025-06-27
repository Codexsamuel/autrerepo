"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Calendar, FileText, BarChart3, Settings, MessageSquare, Shield } from "lucide-react"



const features = [{
    title: "Gestion des Équipes",
    description: "Organisez et gérez efficacement vos équipes",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    details: [
      "Planning des équipes",
      "Suivi des performances",
      "Gestion des tâches",
      "Communication interne"]
  },
  {
    title: "Gestion des Projets",
    description: "Suivez et gérez vos projets de A à Z",
    icon: <Building2 className="w-8 h-8 text-green-600" />,
    details: ["Suivi des deadlines",
      "Gestion des ressources",
      "Collaboration en temps réel",
      "Rapports d'avancement"]
  },
  {
    title: "Planning & Calendrier",
    description: "Organisez efficacement votre temps et vos rendez-vous",
    icon: <Calendar className="w-8 h-8 text-purple-600" />,
    details: ["Agenda partagé",
      "Gestion des rendez-vous",
      "Rappels automatiques",
      "Synchronisation multi-supports"]
  },
  {
    title: "Gestion Documentaire",
    description: "Centralisez et gérez tous vos documents",
    icon: <FileText className="w-8 h-8 text-orange-600" />,
    details: ["Stockage sécurisé",
      "Partage de documents",
      "Versioning",
      "Archivage automatique"]
  },
  {
    title: "Tableaux de Bord",
    description: "Visualisez vos performances et KPIs",
    icon: <BarChart3 className="w-8 h-8 text-red-600" />,
    details: ["KPIs personnalisables",
      "Rapports automatisés",
      "Analyses de performance",
      "Prévisions"]
  },
  {
    title: "Communication",
    description: "Maintenez une communication fluide avec vos clients",
    icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
    details: ["Notifications automatiques",
      "Templates de messages",
      "Suivi des échanges",
      "Intégration email/SMS"]
  }
]

export default function AgencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CRM Agence
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une solution complète pour la gestion d'agence
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