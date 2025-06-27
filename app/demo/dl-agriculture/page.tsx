"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Bot, 
  TrendingUp, 
  ArrowLeft, 
  Sprout, 
  MapPin, 
  CloudRain, 
  Tractor, 
  Package, 
  DollarSign, 
  Users, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun 
} from "lucide-react"

export default function NovaAgricultureERP() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const farms = [
    {
      id: "F001",
      name: "Ferme Akono",
      location: "Akono, Centre",
      size: "25 hectares",
      crops: ["Cacao", "Café", "Plantain"],
      status: "Active",
      yield: "85%",
      aiScore: 92,
    },
    {
      id: "F002",
      name: "Plantation Douala",
      location: "Douala, Littoral",
      size: "40 hectares",
      crops: ["Palmier à huile", "Hévéa"],
      status: "Active",
      yield: "78%",
      aiScore: 88,
    },
  ]

  const crops = [{
      name: "Cacao",
      planted: "15 hectares",
      stage: "Floraison",
      expectedHarvest: "Mars 2024",
      health: "Excellent",
      yield: "2.5 tonnes/ha",
      price: "2,800 FCFA/kg",
    },
    {
      name: "Café Arabica",
      planted: "8 hectares",
      stage: "Maturation",
      expectedHarvest: "Février 2024",
      health: "Bon",
      yield: "1.8 tonnes/ha",
      price: "3,200 FCFA/kg",
    },]
  const weather = {
    temperature: "28°C",
    humidity: "75%",
    rainfall: "12mm",
    windSpeed: "8 km/h",
    forecast: "Pluie légère",
  }

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
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nova Agriculture ERP</h1>
                  <p className="text-sm text-muted-foreground">Coopérative Agricole du Centre</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">IA Agro Active</span>
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
                activeTab === "dashboard" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-3" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("farms")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "farms" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <MapPin className="h-4 w-4 inline mr-3" />
              Exploitations
            </button>
            <button
              onClick={() => setActiveTab("crops")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "crops" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <Sprout className="h-4 w-4 inline mr-3" />
              Cultures
            </button>
            <button
              onClick={() => setActiveTab("weather")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "weather" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <CloudRain className="h-4 w-4 inline mr-3" />
              Météo & Irrigation
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "equipment" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <Tractor className="h-4 w-4 inline mr-3" />
              Équipements
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "inventory" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <Package className="h-4 w-4 inline mr-3" />
              Stock & Intrants
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "sales" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-3" />
              Ventes & Marchés
            </button>
            <button
              onClick={() => setActiveTab("workers")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "workers" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-3" />
              Ouvriers
            </button>
            <button
              onClick={() => setActiveTab("ai-insights")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "ai-insights" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`}
            >
              <Bot className="h-4 w-4 inline mr-3" />
              IA Agricole
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tableau de bord agricole</h2>
                <p className="text-muted-foreground">Vue d'ensemble de vos exploitations</p>
              </div>

              {/* Weather Widget */}
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Météo Yaoundé</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          <span>{weather.temperature}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4" />
                          <span>{weather.humidity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CloudRain className="h-4 w-4" />
                          <span>{weather.rainfall}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="h-4 w-4" />
                          <span>{weather.windSpeed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Sun className="h-12 w-12 mb-2" />
                      <p className="text-sm">{weather.forecast}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Surface totale</p>
                        <p className="text-2xl font-bold">65 ha</p>
                        <p className="text-xs text-green-600">+5 ha ce mois</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Production estimée</p>
                        <p className="text-2xl font-bold">145 tonnes</p>
                        <p className="text-xs text-green-600">+12% vs l'an dernier</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenus prévus</p>
                        <p className="text-2xl font-bold">425M FCFA</p>
                        <p className="text-xs text-green-600">+18% vs l'an dernier</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Score IA Agro</p>
                        <p className="text-2xl font-bold">90%</p>
                        <p className="text-xs text-green-600">Excellent</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farms and Crops Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exploitations</CardTitle>
                    <CardDescription>État de vos fermes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {farms.map((farm) => (
                        <div key={farm.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">{farm.name}</p>
                              <p className="text-sm text-muted-foreground">{farm.location}</p>
                              <p className="text-xs text-muted-foreground">{farm.size}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="default" className="text-xs mb-1">farm.status</Badge>
                            <p className="text-sm font-medium text-green-600">Rendement: {farm.yield}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cultures en cours</CardTitle>
                    <CardDescription>Suivi des plantations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {crops.map((crop, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <Sprout className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium">{crop.name}</p>
                              <p className="text-sm text-muted-foreground">{crop.planted}</p>
                              <p className="text-xs text-muted-foreground">Stade: {crop.stage}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{crop.price}</p>
                            <Badge variant="outline" className="text-xs">crop.health</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Autres onglets similaires... */}
        </main>
      </div>

      {/* Footer NovaCore */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore</h3>
                <p className="text-sm text-gray-400">Powered by AI</p>
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
