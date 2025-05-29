"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  CreditCard,
  BarChart3,
  Package,
  Truck,
  UserCheck,
  Clock,
  Bot,
  Activity,
  Lock,
  Zap,
} from "lucide-react"

interface AIAlert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  description: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  action?: string
}

interface Transaction {
  id: string
  type: "payment" | "refund" | "split" | "modification"
  amount: string
  guest: string
  room: string
  timestamp: string
  status: "pending" | "completed" | "flagged"
  aiScore: number
}

export default function NovaHospitalityERP() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [aiAlerts, setAiAlerts] = useState<AIAlert[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isAIMonitoring, setIsAIMonitoring] = useState(true)

  useEffect(() => {
    // Simulation d'alertes IA en temps réel
    const alertInterval = setInterval(() => {
      const newAlert: AIAlert = {
        id: `alert_${Date.now()}`,
        type: Math.random() > 0.7 ? "warning" : "info",
        title: "Activité suspecte détectée",
        description: "Transaction inhabituelle sur la chambre 205 - Montant élevé",
        timestamp: new Date().toLocaleTimeString(),
        severity: Math.random() > 0.8 ? "high" : "medium",
        action: "Vérifier la transaction",
      }
      setAiAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
    }, 15000)

    return () => clearInterval(alertInterval)
  }, [])

  const recentBookings = [
    {
      id: "BK001",
      guest: "Marie Kouam",
      room: "Suite Deluxe 205",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "Confirmé",
      amount: "450,000 FCFA",
      country: "Cameroun",
      passport: "CM123456789",
      phone: "+237 677 123 456",
      email: "marie.kouam@email.cm",
    },
    {
      id: "BK002",
      guest: "Jean Mbarga",
      room: "Chambre Standard 102",
      checkIn: "2024-01-16",
      checkOut: "2024-01-17",
      status: "En attente",
      amount: "120,000 FCFA",
      country: "Cameroun",
      passport: "CM987654321",
      phone: "+237 699 987 654",
      email: "jean.mbarga@email.cm",
    },
    {
      id: "BK003",
      guest: "Amina Diallo",
      room: "Suite Junior 301",
      checkIn: "2024-01-17",
      checkOut: "2024-01-20",
      status: "Confirmé",
      amount: "680,000 FCFA",
      country: "Sénégal",
      passport: "SN456789123",
      phone: "+221 77 456 789",
      email: "amina.diallo@email.sn",
    },
  ]

  const rooms = [
    {
      number: "101",
      type: "Standard",
      status: "Occupée",
      guest: "M. Dupont",
      checkout: "14:00",
      price: "85,000 FCFA",
      amenities: ["WiFi", "AC", "TV"],
      lastCleaned: "10:30",
      aiScore: 95,
    },
    {
      number: "102",
      type: "Standard",
      status: "Libre",
      guest: "",
      checkout: "",
      price: "85,000 FCFA",
      amenities: ["WiFi", "AC", "TV"],
      lastCleaned: "11:45",
      aiScore: 98,
    },
    {
      number: "201",
      type: "Deluxe",
      status: "Maintenance",
      guest: "",
      checkout: "",
      price: "150,000 FCFA",
      amenities: ["WiFi", "AC", "TV", "Minibar", "Balcon"],
      lastCleaned: "09:15",
      aiScore: 75,
    },
    {
      number: "205",
      type: "Suite",
      status: "Occupée",
      guest: "Mme Kouam",
      checkout: "12:00",
      price: "250,000 FCFA",
      amenities: ["WiFi", "AC", "TV", "Minibar", "Balcon", "Jacuzzi"],
      lastCleaned: "08:30",
      aiScore: 92,
    },
  ]

  const inventory = [
    { item: "Serviettes", stock: 245, minimum: 50, status: "ok" },
    { item: "Draps", stock: 180, minimum: 40, status: "ok" },
    { item: "Produits d'accueil", stock: 25, minimum: 30, status: "low" },
    { item: "Minibar - Coca", stock: 120, minimum: 50, status: "ok" },
    { item: "Papier toilette", stock: 15, minimum: 20, status: "critical" },
  ]

  const staff = [
    {
      id: "ST001",
      name: "Alice Nkomo",
      role: "Réceptionniste",
      shift: "Matin (06:00-14:00)",
      status: "En service",
      performance: 94,
    },
    {
      id: "ST002",
      name: "Paul Essomba",
      role: "Femme de chambre",
      shift: "Jour (08:00-16:00)",
      status: "En pause",
      performance: 87,
    },
    {
      id: "ST003",
      name: "Grace Biya",
      role: "Manager",
      shift: "Jour (09:00-17:00)",
      status: "En service",
      performance: 96,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Libre":
        return "bg-green-100 text-green-800"
      case "Occupée":
        return "bg-red-100 text-red-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nova Hospitality ERP</h1>
                  <p className="text-sm text-muted-foreground">Hôtel Le Meridien - Yaoundé</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <div className="relative">
                <Button size="icon" variant="outline">
                  <Bell className="h-4 w-4" />
                </Button>
                {aiAlerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <Button size="icon" variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">IA Active</span>
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
            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "inventory" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <Package className="h-4 w-4 inline mr-3" />
              Inventaire
            </button>
            <button
              onClick={() => setActiveTab("staff")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "staff" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <UserCheck className="h-4 w-4 inline mr-3" />
              Personnel
            </button>
            <button
              onClick={() => setActiveTab("ai-monitoring")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "ai-monitoring" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <Bot className="h-4 w-4 inline mr-3" />
              Surveillance IA
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "reports" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-3" />
              Rapports
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* AI Alerts Bar */}
          {aiAlerts.length > 0 && (
            <div className="mb-6">
              <Alert className="border-orange-200 bg-orange-50">
                <Bot className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      <strong>IA NovaCore:</strong> {aiAlerts[0].description}
                    </span>
                    <Button size="sm" variant="outline">
                      Voir toutes les alertes ({aiAlerts.length})
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tableau de bord</h2>
                <p className="text-muted-foreground">Vue d'ensemble de votre établissement</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Taux d'occupation</p>
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-xs text-green-600">+5% vs hier</p>
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
                        <p className="text-2xl font-bold">1,450,000 FCFA</p>
                        <p className="text-xs text-green-600">+12% vs hier</p>
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
                        <p className="text-xs text-blue-600">+3 vs hier</p>
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
                        <p className="text-sm text-muted-foreground">Score IA Sécurité</p>
                        <p className="text-2xl font-bold">94%</p>
                        <p className="text-xs text-green-600">Excellent</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Réservations récentes</CardTitle>
                    <CardDescription>Dernières réservations avec surveillance IA</CardDescription>
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
                              <p className="text-xs text-muted-foreground">{booking.country}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.amount}</p>
                            <Badge
                              variant={booking.status === "Confirmé" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {booking.status}
                            </Badge>
                            <div className="flex items-center gap-1 mt-1">
                              <Shield className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Vérifié IA</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertes IA en temps réel</CardTitle>
                    <CardDescription>Surveillance automatique des activités</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiAlerts.slice(0, 5).map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="mt-1">
                            {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                            {alert.type === "error" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des chambres</h2>
                  <p className="text-muted-foreground">État en temps réel avec surveillance IA</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planning
                  </Button>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Vue 3D
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <Card key={room.number} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Ch. {room.number}</h3>
                        <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{room.type}</p>
                      <p className="font-medium text-green-600 mb-2">{room.price}/nuit</p>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span>Score IA:</span>
                          <span className={`font-medium ${getAIScoreColor(room.aiScore)}`}>{room.aiScore}%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Dernier nettoyage:</span>
                          <span>{room.lastCleaned}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      {room.guest && (
                        <div className="space-y-1 mb-3">
                          <p className="text-sm font-medium">{room.guest}</p>
                          <p className="text-xs text-muted-foreground">Départ: {room.checkout}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
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

          {activeTab === "ai-monitoring" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Surveillance IA NovaCore</h2>
                <p className="text-muted-foreground">Monitoring intelligent en temps réel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Transactions surveillées</p>
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-xs text-green-600">Aujourd'hui</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Anomalies détectées</p>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-xs text-yellow-600">À vérifier</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Niveau de sécurité</p>
                        <p className="text-2xl font-bold">Élevé</p>
                        <p className="text-xs text-green-600">94% de confiance</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Lock className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="alerts" className="w-full">
                <TabsList>
                  <TabsTrigger value="alerts">Alertes</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres IA</TabsTrigger>
                </TabsList>

                <TabsContent value="alerts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alertes IA en temps réel</CardTitle>
                      <CardDescription>Surveillance automatique des activités suspectes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {aiAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="mt-1">
                              {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                              {alert.type === "error" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                              {alert.type === "info" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{alert.title}</h4>
                                <Badge variant="outline">{alert.severity}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                              <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Investiguer
                              </Button>
                              <Button size="sm">Résoudre</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transactions surveillées</CardTitle>
                      <CardDescription>Toutes les transactions avec analyse IA</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            id: "TXN001",
                            type: "payment",
                            amount: "450,000 FCFA",
                            guest: "Marie Kouam",
                            room: "205",
                            timestamp: "14:30",
                            status: "completed",
                            aiScore: 95,
                          },
                          {
                            id: "TXN002",
                            type: "split",
                            amount: "680,000 FCFA",
                            guest: "Amina Diallo",
                            room: "301",
                            timestamp: "15:45",
                            status: "flagged",
                            aiScore: 65,
                          },
                        ].map((txn) => (
                          <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{txn.guest}</p>
                                <p className="text-sm text-muted-foreground">
                                  {txn.type} - Chambre {txn.room}
                                </p>
                                <p className="text-xs text-muted-foreground">{txn.timestamp}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{txn.amount}</p>
                              <Badge
                                variant={txn.status === "completed" ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {txn.status}
                              </Badge>
                              <p className={`text-xs ${getAIScoreColor(txn.aiScore)}`}>IA: {txn.aiScore}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion d'inventaire</h2>
                  <p className="text-muted-foreground">Suivi automatique des stocks avec IA</p>
                </div>
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  Nouvelle commande
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Articles en stock</p>
                        <p className="text-2xl font-bold">1,247</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Stock faible</p>
                        <p className="text-2xl font-bold text-yellow-600">5</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Stock critique</p>
                        <p className="text-2xl font-bold text-red-600">2</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Commandes en cours</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                      <Truck className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>État des stocks</CardTitle>
                  <CardDescription>Surveillance automatique avec alertes IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventory.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{item.item}</p>
                            <p className="text-sm text-muted-foreground">Minimum: {item.minimum}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.stock} unités</p>
                          <Badge
                            variant={
                              item.status === "ok" ? "default" : item.status === "low" ? "secondary" : "destructive"
                            }
                            className="text-xs"
                          >
                            {item.status === "ok" ? "OK" : item.status === "low" ? "Faible" : "Critique"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "staff" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion du personnel</h2>
                  <p className="text-muted-foreground">Suivi des équipes avec analyse de performance IA</p>
                </div>
                <Button>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Nouveau employé
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Personnel en service</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Performance moyenne</p>
                        <p className="text-2xl font-bold">92%</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Heures travaillées</p>
                        <p className="text-2xl font-bold">96h</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Équipe actuelle</CardTitle>
                  <CardDescription>Personnel avec analyse de performance IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staff.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <p className="text-xs text-muted-foreground">{member.shift}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={member.status === "En service" ? "default" : "secondary"}
                            className="text-xs mb-1"
                          >
                            {member.status}
                          </Badge>
                          <p className={`text-sm font-medium ${getAIScoreColor(member.performance)}`}>
                            Performance: {member.performance}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer with NovaCore branding */}
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
