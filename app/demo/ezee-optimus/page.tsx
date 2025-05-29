"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  MoreVertical,
  Star,
  Utensils,
  Bed,
} from "lucide-react"

export default function EzeeOptimusDemo() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const recentBookings = [
    {
      id: "BK001",
      guest: "Marie Kouam",
      room: "Suite Deluxe 205",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "Confirmé",
      amount: "450€",
    },
    {
      id: "BK002",
      guest: "Jean Mbarga",
      room: "Chambre Standard 102",
      checkIn: "2024-01-16",
      checkOut: "2024-01-17",
      status: "En attente",
      amount: "120€",
    },
    {
      id: "BK003",
      guest: "Sophie Ndongo",
      room: "Suite Junior 301",
      checkIn: "2024-01-17",
      checkOut: "2024-01-20",
      status: "Confirmé",
      amount: "680€",
    },
  ]

  const rooms = [
    { number: "101", type: "Standard", status: "Occupée", guest: "M. Dupont", checkout: "14:00" },
    { number: "102", type: "Standard", status: "Libre", guest: "", checkout: "" },
    { number: "201", type: "Deluxe", status: "Maintenance", guest: "", checkout: "" },
    { number: "205", type: "Suite", status: "Occupée", guest: "Mme Kouam", checkout: "12:00" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Ezee Optimus</h1>
                  <p className="text-sm text-muted-foreground">Hôtel Le Meridien - Yaoundé</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button size="icon" variant="outline">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "dashboard" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-3" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("reservations")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "reservations" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-3" />
              Réservations
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "rooms" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <Bed className="h-4 w-4 inline mr-3" />
              Chambres
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "guests" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-3" />
              Clients
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "finance" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-3" />
              Finances
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tableau de bord</h2>
                <p className="text-muted-foreground">Vue d'ensemble de votre hôtel</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Taux d'occupation</p>
                        <p className="text-2xl font-bold">87%</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bed className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenus du jour</p>
                        <p className="text-2xl font-bold">2,450€</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Nouveaux clients</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Note moyenne</p>
                        <p className="text-2xl font-bold">4.8</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Réservations récentes</CardTitle>
                  <CardDescription>Les dernières réservations de votre hôtel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{booking.guest}</p>
                            <p className="text-sm text-muted-foreground">{booking.room}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <Badge variant={booking.status === "Confirmé" ? "default" : "secondary"} className="text-xs">
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des chambres</h2>
                  <p className="text-muted-foreground">État en temps réel de vos chambres</p>
                </div>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Planning
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <Card key={room.number} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Ch. {room.number}</h3>
                        <Badge
                          variant={
                            room.status === "Libre"
                              ? "default"
                              : room.status === "Occupée"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {room.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{room.type}</p>
                      {room.guest && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{room.guest}</p>
                          <p className="text-xs text-muted-foreground">Départ: {room.checkout}</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          Détails
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Autres onglets similaires... */}
        </main>
      </div>

      {/* Demo Banner */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Utensils className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Mode Démo</p>
                <p className="text-xs opacity-90">Ezee Optimus CRM</p>
              </div>
              <Button size="sm" variant="secondary" asChild>
                <a href="/contact">Essayer</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
