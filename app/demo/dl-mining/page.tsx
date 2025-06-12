"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Mountain,
  HardHat,
  Truck,
  HardHat as HardHatIcon,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  Shield,
  Zap,
  Bot,
  TrendingUp,
  LineChart,
  Search,
  Settings,
  BarChart3,
  Brain,
  Camera,
  Video,
  Target,
  Download,
  Upload,
  Sparkles,
  Rocket,
  CheckCircle,
  Clock,
  Plus,
  Activity,
  Lightbulb,
  Megaphone,
  Palette,
  Code,
  Monitor,
  Film,
  ImageIcon,
  Building2,
  Globe,
  Phone,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React from "react"
import { Feature, Stat } from '../../types/icons'

export default function NovaMiningERP() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const mines = [
    {
      id: "M001",
      name: "Mine d'Or Batouri",
      location: "Batouri, Est",
      type: "Or alluvionnaire",
      status: "Active",
      production: "2.5 kg/jour",
      safety: "Excellent",
      workers: 45,
    },
    {
      id: "M002",
      name: "Carrière Edéa",
      location: "Edéa, Littoral",
      type: "Granit",
      status: "Active",
      production: "150 m³/jour",
      safety: "Bon",
      workers: 32,
    },
  ]

  const equipment = [
    {
      id: "EQ001",
      name: "Excavatrice CAT 320",
      type: "Excavation",
      status: "En service",
      location: "Mine Batouri",
      maintenance: "Dans 15 jours",
      efficiency: 94,
    },
    {
      id: "EQ002",
      name: "Camion Volvo FH16",
      type: "Transport",
      status: "Maintenance",
      location: "Atelier",
      maintenance: "En cours",
      efficiency: 0,
    },
  ]

  const safetyAlerts = [
    {
      id: "SA001",
      type: "warning",
      title: "Niveau de gaz détecté",
      location: "Tunnel B - Mine Batouri",
      severity: "Moyen",
      timestamp: "Il y a 15 min",
    },
    {
      id: "SA002",
      type: "info",
      title: "Inspection sécurité programmée",
      location: "Carrière Edéa",
      severity: "Info",
      timestamp: "Il y a 2h",
    },
  ]

  const features: Feature[] = [
    {
      title: "Exploration Intelligente",
      description: "Détection précise des gisements grâce à l'IA",
      icon: Search,
      color: "blue"
    },
    {
      title: "Optimisation des Opérations",
      description: "Maximisation de la production et réduction des coûts",
      icon: Settings,
      color: "green"
    },
    {
      title: "Sécurité Avancée",
      description: "Surveillance en temps réel et prévention des risques",
      icon: Shield,
      color: "purple"
    },
    {
      title: "Analyse de Données",
      description: "Décisions basées sur des données en temps réel",
      icon: BarChart3,
      color: "orange"
    }
  ];

  const stats: Stat[] = [
    {
      title: "Production",
      value: "2.5M T",
      icon: HardHat,
      color: "blue"
    },
    {
      title: "Efficacité",
      value: "92%",
      icon: LineChart,
      color: "green"
    },
    {
      title: "Sécurité",
      value: "99.9%",
      icon: Shield,
      color: "purple"
    },
    {
      title: "ROI",
      value: "+45%",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/sign-in">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </a>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nova Mining ERP</h1>
                  <p className="text-sm text-muted-foreground">Société Minière du Cameroun</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-red-700">Sécurité Active</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">IA Mining Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r h-screen sticky top-0 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "dashboard" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-3" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("mines")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "mines" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Mountain className="h-4 w-4 inline mr-3" />
              Sites miniers
            </button>
            <button
              onClick={() => setActiveTab("production")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "production" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <HardHatIcon className="h-4 w-4 inline mr-3" />
              Production
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "equipment" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Truck className="h-4 w-4 inline mr-3" />
              Équipements
            </button>
            <button
              onClick={() => setActiveTab("safety")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "safety" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <HardHatIcon className="h-4 w-4 inline mr-3" />
              Sécurité
            </button>
            <button
              onClick={() => setActiveTab("workers")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "workers" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-3" />
              Personnel
            </button>
            <button
              onClick={() => setActiveTab("logistics")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "logistics" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Package className="h-4 w-4 inline mr-3" />
              Logistique
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "finance" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-3" />
              Finances
            </button>
            <button
              onClick={() => setActiveTab("ai-monitoring")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "ai-monitoring" ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Bot className="h-4 w-4 inline mr-3" />
              IA Mining
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tableau de bord minier</h2>
                <p className="text-muted-foreground">Vue d'ensemble de vos opérations minières</p>
              </div>

              {/* Safety Alert */}
              {safetyAlerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-800">Alerte Sécurité</h3>
                      <p className="text-sm text-red-700">
                        {safetyAlerts[0].title} - {safetyAlerts[0].location}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Voir toutes les alertes
                    </Button>
                  </div>
                </div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                          {React.createElement(stat.icon, { className: `w-6 h-6 text-${stat.color}-600` })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sites and Equipment Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sites miniers</CardTitle>
                    <CardDescription>État de vos exploitations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mines.map((mine) => (
                        <div key={mine.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Mountain className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{mine.name}</p>
                              <p className="text-sm text-muted-foreground">{mine.location}</p>
                              <p className="text-xs text-muted-foreground">{mine.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="default" className="text-xs mb-1">
                              {mine.status}
                            </Badge>
                            <p className="text-sm font-medium">{mine.production}</p>
                            <p className="text-xs text-muted-foreground">{mine.workers} ouvriers</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Équipements critiques</CardTitle>
                    <CardDescription>État des machines principales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {equipment.map((eq) => (
                        <div key={eq.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Truck className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{eq.name}</p>
                              <p className="text-sm text-muted-foreground">{eq.type}</p>
                              <p className="text-xs text-muted-foreground">{eq.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={eq.status === "En service" ? "default" : "secondary"}
                              className="text-xs mb-1"
                            >
                              {eq.status}
                            </Badge>
                            <p className="text-sm font-medium">Efficacité: {eq.efficiency}%</p>
                            <p className="text-xs text-muted-foreground">{eq.maintenance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Features Section */}
          {activeTab === "dashboard" && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Nos Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}>
                        {React.createElement(feature.icon, { className: `w-6 h-6 text-${feature.color}-600` })}
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Alert Section */}
          {activeTab === "dashboard" && (
            <Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {React.createElement(AlertTriangle, { className: "w-6 h-6 text-yellow-500" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Sécurité et Conformité</h3>
                      <p className="text-gray-300">Protocoles stricts et surveillance continue</p>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20">
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Footer NovaCore */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                {React.createElement(Zap, { className: "w-6 h-6 text-white" })}
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore</h3>
                <p className="text-sm text-gray-500">Plateforme d'IA</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-1">Made by Samuel OBAM</p>
              <p className="text-sm text-gray-400 mb-1">CEO of DL Solutions</p>
              <p className="text-sm text-gray-400 mb-1">+237 694 341 586</p>
              <p className="text-sm text-gray-400 mb-1">Rue École de Police, Yaoundé</p>
              <p className="text-sm text-gray-400">sobam@daveandlucesolutions.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2024 NovaCore ERP. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
