"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Plane,
  MapPin,
  Globe,
  FileText,
  BarChart3,
  Package,
  Bot,
  Zap,
  Plus,
  Phone,
  Mail,
  Filter,
  Download,
  Edit,
  Eye,
  Star,
  Navigation,
  StampIcon as Passport,
  Shield,
} from "lucide-react"

interface UserRole {
  id: string
  name: string
  level: "admin" | "manager" | "agent" | "guide" | "finance" | "support"
  permissions: string[]
}

interface UserType {
  id: string
  name: string
  email: string
  role: UserRole
  isOnline: boolean
}

export default function NovaTravelCRM() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [showRoleSelector, setShowRoleSelector] = useState(true)
  const [aiAlerts, setAiAlerts] = useState<any[]>([])

  // Rôles spécialisés agence de voyage
  const roles: UserRole[] = [
    {
      id: "admin",
      name: "Directeur Agence",
      level: "admin",
      permissions: ["all"],
    },
    {
      id: "manager",
      name: "Manager Commercial",
      level: "manager",
      permissions: [
        "dashboard",
        "bookings",
        "customers",
        "itineraries",
        "suppliers",
        "finance",
        "reports",
        "staff",
        "marketing",
      ],
    },
    {
      id: "agent",
      name: "Agent de Voyage",
      level: "agent",
      permissions: ["dashboard", "bookings", "customers", "itineraries", "quotes", "payments"],
    },
    {
      id: "guide",
      name: "Guide Touristique",
      level: "guide",
      permissions: ["dashboard", "itineraries", "customers", "activities"],
    },
    {
      id: "finance",
      name: "Comptable",
      level: "finance",
      permissions: ["dashboard", "finance", "payments", "reports", "suppliers"],
    },
    {
      id: "support",
      name: "Service Client",
      level: "support",
      permissions: ["dashboard", "customers", "bookings", "support"],
    },
  ]

  const demoUsers: UserType[] = [
    {
      id: "1",
      name: "Samuel OBAM",
      email: "sobam@dltravel.cm",
      role: roles[0],
      isOnline: true,
    },
    {
      id: "2",
      name: "Marie Kouam",
      email: "marie.kouam@dltravel.cm",
      role: roles[1],
      isOnline: true,
    },
    {
      id: "3",
      name: "Jean Mbarga",
      email: "jean.mbarga@dltravel.cm",
      role: roles[2],
      isOnline: true,
    },
    {
      id: "4",
      name: "Grace Biya",
      email: "grace.biya@dltravel.cm",
      role: roles[3],
      isOnline: true,
    },
    {
      id: "5",
      name: "Paul Essomba",
      email: "paul.essomba@dltravel.cm",
      role: roles[4],
      isOnline: false,
    },
  ]

  // Données de démonstration voyage
  const bookings = [
    {
      id: "VOY001",
      customer: "Famille Kouam",
      destination: "Paris, France",
      departureDate: "2024-02-15",
      returnDate: "2024-02-22",
      travelers: 4,
      status: "Confirmé",
      totalAmount: 2850000,
      paidAmount: 1425000,
      agent: "Jean Mbarga",
      bookingDate: "2024-01-10",
      type: "Voyage organisé",
      aiRisk: "low",
      fraudScore: 15,
    },
    {
      id: "VOY002",
      customer: "M. Paul Essomba",
      destination: "Dubaï, EAU",
      departureDate: "2024-02-20",
      returnDate: "2024-02-25",
      travelers: 2,
      status: "En attente paiement",
      totalAmount: 1650000,
      paidAmount: 0,
      agent: "Marie Kouam",
      bookingDate: "2024-01-12",
      type: "Voyage d'affaires",
      aiRisk: "medium",
      fraudScore: 45,
    },
    {
      id: "VOY003",
      customer: "Groupe Entreprise ABC",
      destination: "Marrakech, Maroc",
      departureDate: "2024-03-01",
      returnDate: "2024-03-05",
      travelers: 15,
      status: "Devis envoyé",
      totalAmount: 8750000,
      paidAmount: 0,
      agent: "Marie Kouam",
      bookingDate: "2024-01-14",
      type: "Voyage de groupe",
      aiRisk: "low",
      fraudScore: 20,
    },
  ]

  const destinations = [
    {
      id: "DEST001",
      name: "Paris, France",
      country: "France",
      continent: "Europe",
      popularity: 95,
      avgPrice: 750000,
      season: "Toute l'année",
      bookings: 45,
      rating: 4.8,
      highlights: ["Tour Eiffel", "Louvre", "Champs-Élysées"],
      aiTrend: "rising",
    },
    {
      id: "DEST002",
      name: "Dubaï, EAU",
      country: "Émirats Arabes Unis",
      continent: "Asie",
      popularity: 88,
      avgPrice: 850000,
      season: "Oct-Avr",
      bookings: 32,
      rating: 4.7,
      highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert Safari"],
      aiTrend: "stable",
    },
    {
      id: "DEST003",
      name: "Marrakech, Maroc",
      country: "Maroc",
      continent: "Afrique",
      popularity: 82,
      avgPrice: 450000,
      season: "Mar-Mai, Sep-Nov",
      bookings: 28,
      rating: 4.6,
      highlights: ["Médina", "Jardins Majorelle", "Atlas Mountains"],
      aiTrend: "rising",
    },
  ]

  const customers = [
    {
      id: "CUST001",
      name: "Marie Kouam",
      email: "marie.kouam@email.cm",
      phone: "+237 677 123 456",
      totalBookings: 8,
      totalSpent: 4250000,
      avgSpent: 531250,
      lastTrip: "2023-12-15",
      preferredDestinations: ["Europe", "Asie"],
      travelStyle: "Luxe",
      loyaltyLevel: "Gold",
      birthday: "1985-03-15",
      passportExpiry: "2027-08-20",
      aiSegment: "VIP Voyageur",
      fraudRisk: "low",
    },
    {
      id: "CUST002",
      name: "Jean Mbarga",
      email: "jean.mbarga@email.cm",
      phone: "+237 699 987 654",
      totalBookings: 5,
      totalSpent: 2100000,
      avgSpent: 420000,
      lastTrip: "2023-11-20",
      preferredDestinations: ["Afrique", "Moyen-Orient"],
      travelStyle: "Affaires",
      loyaltyLevel: "Silver",
      birthday: "1978-07-22",
      passportExpiry: "2026-03-15",
      aiSegment: "Voyageur Régulier",
      fraudRisk: "low",
    },
  ]

  const itineraries = [
    {
      id: "ITIN001",
      name: "Paris Romantique - 7 jours",
      destination: "Paris, France",
      duration: 7,
      price: 750000,
      includes: ["Vol A/R", "Hôtel 4*", "Petit-déjeuner", "Visites guidées"],
      highlights: ["Tour Eiffel", "Croisière Seine", "Montmartre", "Versailles"],
      difficulty: "Facile",
      groupSize: "2-8 personnes",
      season: "Toute l'année",
      rating: 4.8,
      bookings: 25,
    },
    {
      id: "ITIN002",
      name: "Safari Tanzanie - 10 jours",
      destination: "Tanzanie",
      duration: 10,
      price: 1850000,
      includes: ["Vol A/R", "Lodge Safari", "Tous repas", "Guide francophone", "4x4"],
      highlights: ["Serengeti", "Ngorongoro", "Kilimandjaro", "Zanzibar"],
      difficulty: "Modéré",
      groupSize: "4-12 personnes",
      season: "Jun-Oct",
      rating: 4.9,
      bookings: 18,
    },
  ]

  useEffect(() => {
    const alertInterval = setInterval(() => {
      const alerts = [
        "Paiement suspect détecté - Carte utilisée 3 fois en 24h",
        "Destination tendance - Demandes Dubaï +40% cette semaine",
        "Client VIP Marie Kouam - Anniversaire dans 5 jours",
        "Alerte visa - 3 clients sans visa valide pour départ demain",
        "Prix concurrent - Paris 15% moins cher chez concurrent",
        "Fraude potentielle - Réservation multiple même IP",
      ]
      const newAlert = {
        id: Date.now(),
        message: alerts[Math.floor(Math.random() * alerts.length)],
        type: Math.random() > 0.7 ? "warning" : "info",
        timestamp: new Date().toLocaleTimeString(),
      }
      setAiAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 15000)

    return () => clearInterval(alertInterval)
  }, [])

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false
    if (currentUser.role.permissions.includes("all")) return true
    return currentUser.role.permissions.includes(permission)
  }

  const switchUser = (userId: string) => {
    const user = demoUsers.find((u) => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setShowRoleSelector(false)
      setActiveTab("dashboard")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmé":
        return "bg-green-100 text-green-800"
      case "En attente paiement":
        return "bg-yellow-100 text-yellow-800"
      case "Devis envoyé":
        return "bg-blue-100 text-blue-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (level: string) => {
    switch (level) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "manager":
        return "bg-purple-100 text-purple-800"
      case "agent":
        return "bg-blue-100 text-blue-800"
      case "guide":
        return "bg-green-100 text-green-800"
      case "finance":
        return "bg-yellow-100 text-yellow-800"
      case "support":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Écran de sélection de rôle
  if (showRoleSelector || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Nova Travel CRM</CardTitle>
                <CardDescription>DL Travel Agency - Yaoundé</CardDescription>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Sélectionnez votre profil utilisateur</h2>
            <p className="text-muted-foreground">
              Système de gestion agence de voyage avec IA pour détection de fraudes et analyse des tendances
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoUsers.map((user) => (
                <Card
                  key={user.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                  onClick={() => switchUser(user.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        {user.role.level === "agent" && <Plane className="h-5 w-5 text-white" />}
                        {user.role.level === "guide" && <Navigation className="h-5 w-5 text-white" />}
                        {user.role.level === "finance" && <DollarSign className="h-5 w-5 text-white" />}
                        {user.role.level === "support" && <Users className="h-5 w-5 text-white" />}
                        {(user.role.level === "admin" || user.role.level === "manager") && (
                          <Settings className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>

                    <Badge className={`${getRoleColor(user.role.level)} mb-3`}>{user.role.name}</Badge>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Accès autorisé:</p>
                      <div className="flex flex-wrap gap-1">
                        {user.role.permissions.slice(0, 3).map((perm, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {perm === "all" ? "Accès total" : perm}
                          </Badge>
                        ))}
                        {user.role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.role.permissions.length - 3} autres
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nova Travel CRM</h1>
                  <p className="text-sm text-muted-foreground">DL Travel Agency - Yaoundé</p>
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

              {/* Profil utilisateur */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  {currentUser.role.level === "agent" && <Plane className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "guide" && <Navigation className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "finance" && <DollarSign className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "support" && <Users className="h-4 w-4 text-white" />}
                  {(currentUser.role.level === "admin" || currentUser.role.level === "manager") && (
                    <Settings className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <Badge className={`${getRoleColor(currentUser.role.level)} text-xs`}>{currentUser.role.name}</Badge>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowRoleSelector(true)}>
                  Changer
                </Button>
              </div>

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
            {hasPermission("dashboard") && (
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-3" />
                Tableau de bord
              </button>
            )}

            {hasPermission("bookings") && (
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "bookings" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-3" />
                Réservations
              </button>
            )}

            {hasPermission("customers") && (
              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "customers" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Users className="h-4 w-4 inline mr-3" />
                Clients
              </button>
            )}

            {hasPermission("itineraries") && (
              <button
                onClick={() => setActiveTab("itineraries")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "itineraries" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-3" />
                Circuits & Itinéraires
              </button>
            )}

            {hasPermission("quotes") && (
              <button
                onClick={() => setActiveTab("quotes")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "quotes" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <FileText className="h-4 w-4 inline mr-3" />
                Devis & Facturation
              </button>
            )}

            {hasPermission("suppliers") && (
              <button
                onClick={() => setActiveTab("suppliers")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "suppliers" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Package className="h-4 w-4 inline mr-3" />
                Fournisseurs
              </button>
            )}

            {hasPermission("finance") && (
              <button
                onClick={() => setActiveTab("finance")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "finance" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <DollarSign className="h-4 w-4 inline mr-3" />
                Finances
              </button>
            )}

            {hasPermission("reports") && (
              <button
                onClick={() => setActiveTab("reports")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "reports" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-3" />
                Rapports & Analytics
              </button>
            )}

            {hasPermission("all") && (
              <button
                onClick={() => setActiveTab("ai-monitoring")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "ai-monitoring" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Bot className="h-4 w-4 inline mr-3" />
                Surveillance IA
                <Badge className="ml-2 text-xs bg-red-100 text-red-700">Admin</Badge>
              </button>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Alertes IA */}
          {aiAlerts.length > 0 && (
            <div className="mb-6">
              <Alert className="border-blue-200 bg-blue-50">
                <Bot className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      <strong>IA NovaCore:</strong> {aiAlerts[0].message}
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tableau de bord Agence</h2>
                  <p className="text-muted-foreground">
                    Vue d'ensemble des voyages et performances - Accès: {currentUser.role.name}
                  </p>
                </div>
                {hasPermission("reports") && (
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Rapport mensuel
                  </Button>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Réservations actives</p>
                        <p className="text-2xl font-bold">47</p>
                        <p className="text-xs text-green-600">+8 cette semaine</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">CA du mois</p>
                        <p className="text-2xl font-bold">
                          {hasPermission("finance") || hasPermission("all") ? "15.8M FCFA" : "***M FCFA"}
                        </p>
                        <p className="text-xs text-green-600">+22% vs mois dernier</p>
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
                        <p className="text-sm text-muted-foreground">Voyageurs ce mois</p>
                        <p className="text-2xl font-bold">156</p>
                        <p className="text-xs text-blue-600">+18% vs mois dernier</p>
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
                        <p className="text-2xl font-bold">96%</p>
                        <p className="text-xs text-green-600">Excellent</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Réservations et Destinations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Réservations récentes
                    </CardTitle>
                    <CardDescription>Dernières réservations avec analyse IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Plane className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{booking.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.destination} - {booking.travelers} pers.
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.departureDate} au {booking.returnDate}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {hasPermission("finance") || hasPermission("all")
                                ? `${(booking.totalAmount / 1000).toFixed(0)}K FCFA`
                                : "***K FCFA"}
                            </p>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <div className="flex items-center gap-1 mt-1">
                              <Bot className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Fraude: {booking.fraudScore}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      Destinations tendances
                    </CardTitle>
                    <CardDescription>Analyse IA des destinations populaires</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {destinations.map((destination) => (
                        <div key={destination.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{destination.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {destination.bookings} réservations - Note: {destination.rating}/5
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-xs">Popularité: {destination.popularity}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {hasPermission("finance") || hasPermission("all")
                                ? `${(destination.avgPrice / 1000).toFixed(0)}K FCFA`
                                : "***K FCFA"}
                            </p>
                            <Badge
                              variant={destination.aiTrend === "rising" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {destination.aiTrend === "rising" ? "↗ Tendance" : "→ Stable"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "bookings" && hasPermission("bookings") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des Réservations</h2>
                  <p className="text-muted-foreground">Suivi des voyages avec détection de fraudes IA</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Réservation
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                            Destination
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                            Analyse IA
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{booking.customer}</div>
                                <div className="text-sm text-gray-500">{booking.agent}</div>
                                <div className="text-sm text-gray-500">{booking.type}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{booking.destination}</div>
                                <div className="text-sm text-gray-500">{booking.travelers} voyageurs</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{booking.departureDate}</div>
                                <div className="text-sm text-gray-500">au {booking.returnDate}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-green-600">
                                  {hasPermission("finance") || hasPermission("all")
                                    ? `${(booking.totalAmount / 1000).toFixed(0)}K FCFA`
                                    : "***K FCFA"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Payé:{" "}
                                  {hasPermission("finance") || hasPermission("all")
                                    ? `${(booking.paidAmount / 1000).toFixed(0)}K`
                                    : "***K"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    booking.fraudScore < 30
                                      ? "bg-green-500"
                                      : booking.fraudScore < 60
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                <span className="text-sm">Fraude: {booking.fraudScore}%</span>
                              </div>
                              <Badge className={getRiskColor(booking.aiRisk)} variant="outline">
                                {booking.aiRisk === "low" ? "Faible" : booking.aiRisk === "medium" ? "Moyen" : "Élevé"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && hasPermission("customers") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Base Clients Voyageurs</h2>
                  <p className="text-muted-foreground">Profils clients avec historique de voyages et préférences</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Segmentation IA
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Client
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {customers.map((customer) => (
                  <Card key={customer.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{customer.name}</h3>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                            <p className="text-sm text-muted-foreground">{customer.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-gold-100 text-gold-800 mb-2">{customer.loyaltyLevel}</Badge>
                          <Badge variant="outline">{customer.aiSegment}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Voyages</p>
                          <p className="font-bold">{customer.totalBookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total dépensé</p>
                          <p className="font-bold">
                            {hasPermission("finance") || hasPermission("all")
                              ? `${(customer.totalSpent / 1000).toFixed(0)}K FCFA`
                              : "***K FCFA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Panier moyen</p>
                          <p className="font-bold">
                            {hasPermission("finance") || hasPermission("all")
                              ? `${(customer.avgSpent / 1000).toFixed(0)}K FCFA`
                              : "***K FCFA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Dernier voyage</p>
                          <p className="font-bold">{customer.lastTrip}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-sm font-medium">Destinations préférées:</p>
                          <div className="flex flex-wrap gap-1">
                            {customer.preferredDestinations.map((dest, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {dest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Style de voyage:</p>
                          <Badge variant="outline" className="text-xs">
                            {customer.travelStyle}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Passport className="h-3 w-3" />
                            <span>Passeport: {customer.passportExpiry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>Risque: {customer.fraudRisk}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Historique
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plane className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Message d'accès refusé */}
          {!hasPermission(activeTab) && activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-96">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <Plane className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Accès restreint</h3>
                  <p className="text-muted-foreground mb-4">
                    Votre rôle ({currentUser.role.name}) ne vous permet pas d'accéder à cette section.
                  </p>
                  <Badge className={getRoleColor(currentUser.role.level)}>{currentUser.role.name}</Badge>
                  <div className="mt-4">
                    <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
                      Retour au tableau de bord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore Travel</h3>
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
              © 2024 NovaCore Travel CRM. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
