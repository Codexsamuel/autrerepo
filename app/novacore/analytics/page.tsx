"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

export default function NovaCorAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Données simulées pour les analytics
  const stats = [
    {
      label: "Visiteurs",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Revenus",
      value: "€45,230",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Commandes",
      value: "1,234",
      change: "-2.1%",
      trend: "down",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      label: "Taux de conversion",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600",
    },
  ]

  const topPages = [
    { name: "Page d'accueil", views: 4520, change: "+15%" },
    { name: "Produits", views: 3240, change: "+8%" },
    { name: "À propos", views: 2150, change: "+12%" },
    { name: "Contact", views: 1890, change: "-3%" },
  ]

  const recentActivity = [
    { action: "Nouvelle commande", user: "Marie Dubois", time: "Il y a 2 min" },
    { action: "Inscription utilisateur", user: "Jean Martin", time: "Il y a 5 min" },
    { action: "Paiement reçu", user: "Sophie Laurent", time: "Il y a 10 min" },
    { action: "Avis laissé", user: "Thomas Durand", time: "Il y a 15 min" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/novacore">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics NovaCore
                </h1>
                <p className="text-sm text-gray-600">Analyse des performances et métriques</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="90d">90 derniers jours</option>
              </select>
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pages les plus visitées */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Pages les plus visitées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{page.name}</p>
                      <p className="text-sm text-gray-600">{page.views.toLocaleString()} vues</p>
                    </div>
                    <Badge variant="secondary">{page.change}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphique placeholder */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Évolution des performances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Graphique en cours de développement...</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
