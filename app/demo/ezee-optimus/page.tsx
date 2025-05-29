"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ReservationCalendar } from "@/components/reservation-calendar"
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Hotel,
  MapPin,
  BarChart3,
  Package,
  Bot,
  Zap,
  Filter,
  Download,
  Star,
  Bed,
  Shield,
  UserCheck,
  Wifi,
  Coffee,
  Tv,
  Bath,
  AirVent,
  RefreshCw,
} from "lucide-react"

interface UserRole {
  id: string
  name: string
  level: "admin" | "manager" | "receptionist" | "housekeeping" | "maintenance" | "finance"
  permissions: string[]
}

interface UserType {
  id: string
  name: string
  email: string
  role: UserRole
  isOnline: boolean
}

export default function EzeeOptimusDemo() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [showRoleSelector, setShowRoleSelector] = useState(true)
  const [aiAlerts, setAiAlerts] = useState<any[]>([])

  // Nom de l'entreprise qui s'affiche dans le menu
  const companyName = "Hôtel Le Meridien Yaoundé"

  // Rôles spécialisés hôtellerie
  const roles: UserRole[] = [
    {
      id: "admin",
      name: "Directeur Général",
      level: "admin",
      permissions: ["all"],
    },
    {
      id: "manager",
      name: "Manager Hôtel",
      level: "manager",
      permissions: [
        "dashboard",
        "reservations",
        "rooms",
        "guests",
        "housekeeping",
        "finance",
        "reports",
        "staff",
        "rates",
        "inventory",
      ],
    },
    {
      id: "receptionist",
      name: "Réceptionniste",
      level: "receptionist",
      permissions: ["dashboard", "reservations", "rooms", "guests", "checkin", "checkout"],
    },
    {
      id: "housekeeping",
      name: "Gouvernante",
      level: "housekeeping",
      permissions: ["dashboard", "rooms", "housekeeping", "maintenance"],
    },
    {
      id: "maintenance",
      name: "Maintenance",
      level: "maintenance",
      permissions: ["dashboard", "rooms", "maintenance", "inventory"],
    },
    {
      id: "finance",
      name: "Comptable",
      level: "finance",
      permissions: ["dashboard", "finance", "reports", "rates"],
    },
  ]

  const demoUsers: UserType[] = [
    {
      id: "1",
      name: "Samuel OBAM",
      email: "sobam@meridien-yaounde.cm",
      role: roles[0],
      isOnline: true,
    },
    {
      id: "2",
      name: "Marie Kouam",
      email: "marie.kouam@meridien-yaounde.cm",
      role: roles[1],
      isOnline: true,
    },
    {
      id: "3",
      name: "Jean Mbarga",
      email: "jean.mbarga@meridien-yaounde.cm",
      role: roles[2],
      isOnline: true,
    },
    {
      id: "4",
      name: "Grace Biya",
      email: "grace.biya@meridien-yaounde.cm",
      role: roles[3],
      isOnline: true,
    },
    {
      id: "5",
      name: "Paul Essomba",
      email: "paul.essomba@meridien-yaounde.cm",
      role: roles[4],
      isOnline: false,
    },
    {
      id: "6",
      name: "Fatima Ngono",
      email: "fatima.ngono@meridien-yaounde.cm",
      role: roles[5],
      isOnline: true,
    },
  ]

  // Données de démonstration hôtel
  const hotelStats = {
    totalRooms: 45,
    occupiedRooms: 32,
    availableRooms: 11,
    outOfOrderRooms: 2,
    occupancyRate: 71.1,
    adr: 75000, // Average Daily Rate
    revpar: 53325, // Revenue Per Available Room
    totalRevenue: 2400000,
    checkInsToday: 8,
    checkOutsToday: 6,
    stayOvers: 24,
    noShows: 1,
    walkIns: 3,
    vipGuests: 5,
    groupReservations: 2,
    pendingPayments: 450000,
  }

  const recentReservations = [
    {
      id: "RES001",
      guest: "Marie Kouam",
      room: "301",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "Confirmed",
      amount: 225000,
      source: "Direct",
      vip: true,
      aiRisk: "low",
    },
    {
      id: "RES002",
      guest: "Paul Essomba",
      room: "205",
      checkIn: "2024-01-16",
      checkOut: "2024-01-19",
      status: "Pending Payment",
      amount: 195000,
      source: "Booking.com",
      vip: false,
      aiRisk: "medium",
    },
    {
      id: "RES003",
      guest: "Entreprise ABC SARL",
      room: "401-403",
      checkIn: "2024-01-17",
      checkOut: "2024-01-20",
      status: "Group Booking",
      amount: 585000,
      source: "Corporate",
      vip: true,
      aiRisk: "low",
    },
  ]

  const roomStatus = [
    {
      floor: 1,
      rooms: [
        { number: "101", status: "Occupied", guest: "M. Dupont", checkout: "2024-01-16", type: "Standard" },
        { number: "102", status: "Vacant Clean", guest: "", checkout: "", type: "Standard" },
        { number: "103", status: "Vacant Dirty", guest: "", checkout: "2024-01-15", type: "Standard" },
        { number: "104", status: "Out of Order", guest: "", checkout: "", type: "Standard" },
      ],
    },
    {
      floor: 2,
      rooms: [
        { number: "201", status: "Occupied", guest: "Mme Martin", checkout: "2024-01-17", type: "Deluxe" },
        { number: "202", status: "Occupied", guest: "M. Leblanc", checkout: "2024-01-18", type: "Deluxe" },
        { number: "203", status: "Vacant Clean", guest: "", checkout: "", type: "Deluxe" },
        { number: "204", status: "Maintenance", guest: "", checkout: "", type: "Deluxe" },
      ],
    },
    {
      floor: 3,
      rooms: [
        { number: "301", status: "Occupied", guest: "VIP - Marie Kouam", checkout: "2024-01-18", type: "Suite" },
        { number: "302", status: "Vacant Clean", guest: "", checkout: "", type: "Suite" },
        { number: "303", status: "Reserved", guest: "Arrivée 15h", checkout: "", type: "Suite" },
      ],
    },
  ]

  useEffect(() => {
    const alertInterval = setInterval(() => {
      const alerts = [
        "Overbooking détecté - 3 réservations pour 2 chambres disponibles",
        "Client VIP Marie Kouam - Check-in dans 30 minutes",
        "Chambre 104 - Réparation terminée, inspection requise",
        "Paiement en retard - Réservation RES002 (48h)",
        "Tarif concurrent - Booking.com 15% moins cher ce weekend",
        "No-show probable - Client historique 70% no-show",
        "Maintenance urgente - Climatisation chambre 205",
        "Groupe ABC SARL - Demande upgrade suite présidentielle",
      ]
      const newAlert = {
        id: Date.now(),
        message: alerts[Math.floor(Math.random() * alerts.length)],
        type: Math.random() > 0.7 ? "warning" : "info",
        timestamp: new Date().toLocaleTimeString(),
      }
      setAiAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 18000)

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
      case "Occupied":
        return "bg-red-100 text-red-800"
      case "Vacant Clean":
        return "bg-green-100 text-green-800"
      case "Vacant Dirty":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Order":
        return "bg-gray-100 text-gray-800"
      case "Maintenance":
        return "bg-orange-100 text-orange-800"
      case "Reserved":
        return "bg-blue-100 text-blue-800"
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending Payment":
        return "bg-yellow-100 text-yellow-800"
      case "Group Booking":
        return "bg-purple-100 text-purple-800"
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
      case "receptionist":
        return "bg-blue-100 text-blue-800"
      case "housekeeping":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      case "finance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserPermissions = () => {
    if (!currentUser)
      return {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canViewFinancials: false,
        canManageRates: false,
        level: "receptionist" as const,
      }

    return {
      canCreate: hasPermission("reservations") || hasPermission("all"),
      canEdit: hasPermission("reservations") || hasPermission("all"),
      canDelete: hasPermission("all"),
      canViewFinancials: hasPermission("finance") || hasPermission("all"),
      canManageRates: hasPermission("rates") || hasPermission("all"),
      level: currentUser.role.level,
    }
  }

  // Écran de sélection de rôle
  if (showRoleSelector || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-5xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Hotel className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">eZee Optimus - NovaCore</CardTitle>
                <CardDescription>{companyName}</CardDescription>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Sélectionnez votre profil utilisateur</h2>
            <p className="text-muted-foreground">
              Système de gestion hôtelière avec IA pour surveillance des transactions et optimisation des revenus
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
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        {user.role.level === "receptionist" && <Users className="h-5 w-5 text-white" />}
                        {user.role.level === "housekeeping" && <Bed className="h-5 w-5 text-white" />}
                        {user.role.level === "maintenance" && <Settings className="h-5 w-5 text-white" />}
                        {user.role.level === "finance" && <DollarSign className="h-5 w-5 text-white" />}
                        {(user.role.level === "admin" || user.role.level === "manager") && (
                          <Hotel className="h-5 w-5 text-white" />
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Hotel className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">eZee Optimus - NovaCore</h1>
                  <p className="text-sm text-muted-foreground">{companyName}</p>
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  {currentUser.role.level === "receptionist" && <Users className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "housekeeping" && <Bed className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "maintenance" && <Settings className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "finance" && <DollarSign className="h-4 w-4 text-white" />}
                  {(currentUser.role.level === "admin" || currentUser.role.level === "manager") && (
                    <Hotel className="h-4 w-4 text-white" />
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

            {hasPermission("reservations") && (
              <button
                onClick={() => setActiveTab("reservations")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "reservations" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-3" />
                Calendrier Réservations
              </button>
            )}

            {hasPermission("rooms") && (
              <button
                onClick={() => setActiveTab("rooms")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "rooms" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Bed className="h-4 w-4 inline mr-3" />
                État des Chambres
              </button>
            )}

            {hasPermission("guests") && (
              <button
                onClick={() => setActiveTab("guests")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "guests" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Users className="h-4 w-4 inline mr-3" />
                Clients & Groupes
              </button>
            )}

            {hasPermission("housekeeping") && (
              <button
                onClick={() => setActiveTab("housekeeping")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "housekeeping" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <UserCheck className="h-4 w-4 inline mr-3" />
                Gouvernance
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
                Finances & Tarifs
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

            {hasPermission("inventory") && (
              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "inventory" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                }`}
              >
                <Package className="h-4 w-4 inline mr-3" />
                Inventaire & Stock
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
                  <h2 className="text-2xl font-bold mb-2">Tableau de bord Hôtel</h2>
                  <p className="text-muted-foreground">
                    Vue d'ensemble en temps réel - {companyName} - Accès: {currentUser.role.name}
                  </p>
                </div>
                {hasPermission("reports") && (
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Rapport du jour
                  </Button>
                )}
              </div>

              {/* Stats Cards principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Taux d'occupation</p>
                        <p className="text-2xl font-bold">{hotelStats.occupancyRate}%</p>
                        <p className="text-xs text-green-600">
                          {hotelStats.occupiedRooms}/{hotelStats.totalRooms} chambres
                        </p>
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
                        <p className="text-2xl font-bold">
                          {hasPermission("finance") || hasPermission("all")
                            ? `${(hotelStats.totalRevenue / 1000).toFixed(0)}K FCFA`
                            : "***K FCFA"}
                        </p>
                        <p className="text-xs text-green-600">+18% vs hier</p>
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
                        <p className="text-sm text-muted-foreground">ADR (Tarif moyen)</p>
                        <p className="text-2xl font-bold">
                          {hasPermission("finance") || hasPermission("all")
                            ? `${(hotelStats.adr / 1000).toFixed(0)}K FCFA`
                            : "***K FCFA"}
                        </p>
                        <p className="text-xs text-blue-600">
                          RevPAR: {hasPermission("finance") ? `${(hotelStats.revpar / 1000).toFixed(0)}K` : "***K"}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
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

              {/* Stats secondaires */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{hotelStats.checkInsToday}</div>
                    <div className="text-xs text-muted-foreground">Arrivées</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{hotelStats.checkOutsToday}</div>
                    <div className="text-xs text-muted-foreground">Départs</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{hotelStats.stayOvers}</div>
                    <div className="text-xs text-muted-foreground">Stay-overs</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{hotelStats.walkIns}</div>
                    <div className="text-xs text-muted-foreground">Walk-ins</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{hotelStats.vipGuests}</div>
                    <div className="text-xs text-muted-foreground">Clients VIP</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{hotelStats.noShows}</div>
                    <div className="text-xs text-muted-foreground">No-shows</div>
                  </CardContent>
                </Card>
              </div>

              {/* Réservations récentes et état des chambres */}
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
                      {recentReservations.map((reservation) => (
                        <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              {reservation.vip ? (
                                <Star className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <Users className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{reservation.guest}</p>
                              <p className="text-sm text-muted-foreground">
                                Chambre {reservation.room} - {reservation.source}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reservation.checkIn} au {reservation.checkOut}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {hasPermission("finance") || hasPermission("all")
                                ? `${(reservation.amount / 1000).toFixed(0)}K FCFA`
                                : "***K FCFA"}
                            </p>
                            <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                            <div className="flex items-center gap-1 mt-1">
                              <Bot className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">
                                Risque: {reservation.aiRisk === "low" ? "Faible" : "Moyen"}
                              </span>
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
                      <Bed className="h-5 w-5 text-purple-600" />
                      État des chambres par étage
                    </CardTitle>
                    <CardDescription>Statut en temps réel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roomStatus.map((floor) => (
                        <div key={floor.floor}>
                          <h4 className="font-medium mb-2">Étage {floor.floor}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {floor.rooms.map((room) => (
                              <div key={room.number} className="p-2 border rounded text-xs">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{room.number}</span>
                                  <Badge className={`${getStatusColor(room.status)} text-xs`} variant="outline">
                                    {room.status === "Occupied" && "Occupée"}
                                    {room.status === "Vacant Clean" && "Libre"}
                                    {room.status === "Vacant Dirty" && "À nettoyer"}
                                    {room.status === "Out of Order" && "HS"}
                                    {room.status === "Maintenance" && "Maintenance"}
                                    {room.status === "Reserved" && "Réservée"}
                                  </Badge>
                                </div>
                                <div className="text-muted-foreground">
                                  {room.guest && <div>{room.guest}</div>}
                                  {room.checkout && <div>Départ: {room.checkout}</div>}
                                  <div>{room.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "reservations" && hasPermission("reservations") && (
            <div className="space-y-6">
              <ReservationCalendar
                userPermissions={getUserPermissions()}
                userName={currentUser.name}
                companyName={companyName}
              />
            </div>
          )}

          {activeTab === "rooms" && hasPermission("rooms") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">État des Chambres</h2>
                  <p className="text-muted-foreground">Gestion en temps réel du statut des chambres - {companyName}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                  </Button>
                </div>
              </div>

              {/* Vue d'ensemble des chambres */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{hotelStats.availableRooms}</div>
                    <div className="text-sm text-muted-foreground">Chambres disponibles</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">{hotelStats.occupiedRooms}</div>
                    <div className="text-sm text-muted-foreground">Chambres occupées</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">6</div>
                    <div className="text-sm text-muted-foreground">À nettoyer</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-gray-600">{hotelStats.outOfOrderRooms}</div>
                    <div className="text-sm text-muted-foreground">Hors service</div>
                  </CardContent>
                </Card>
              </div>

              {/* Plan détaillé des chambres */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan des chambres par étage</CardTitle>
                  <CardDescription>Cliquez sur une chambre pour voir les détails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {roomStatus.map((floor) => (
                      <div key={floor.floor}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Étage {floor.floor}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {floor.rooms.map((room) => (
                            <Card
                              key={room.number}
                              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                                room.status === "Occupied"
                                  ? "border-red-200 bg-red-50"
                                  : room.status === "Vacant Clean"
                                    ? "border-green-200 bg-green-50"
                                    : room.status === "Vacant Dirty"
                                      ? "border-yellow-200 bg-yellow-50"
                                      : room.status === "Out of Order"
                                        ? "border-gray-200 bg-gray-50"
                                        : room.status === "Maintenance"
                                          ? "border-orange-200 bg-orange-50"
                                          : "border-blue-200 bg-blue-50"
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="text-center">
                                  <div className="text-xl font-bold mb-2">{room.number}</div>
                                  <Badge className={`${getStatusColor(room.status)} mb-2`} variant="outline">
                                    {room.status === "Occupied" && "Occupée"}
                                    {room.status === "Vacant Clean" && "Libre"}
                                    {room.status === "Vacant Dirty" && "À nettoyer"}
                                    {room.status === "Out of Order" && "HS"}
                                    {room.status === "Maintenance" && "Maintenance"}
                                    {room.status === "Reserved" && "Réservée"}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground mb-2">{room.type}</div>
                                  {room.guest && (
                                    <div className="text-xs font-medium text-gray-700 mb-1">{room.guest}</div>
                                  )}
                                  {room.checkout && (
                                    <div className="text-xs text-muted-foreground">Départ: {room.checkout}</div>
                                  )}

                                  {/* Icônes d'équipements */}
                                  <div className="flex justify-center gap-1 mt-2">
                                    <Wifi className="h-3 w-3 text-gray-400" />
                                    <Tv className="h-3 w-3 text-gray-400" />
                                    <AirVent className="h-3 w-3 text-gray-400" />
                                    <Bath className="h-3 w-3 text-gray-400" />
                                    {room.type === "Suite" && <Coffee className="h-3 w-3 text-gray-400" />}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Message d'accès refusé */}
          {!hasPermission(activeTab) && activeTab !== "dashboard" && (
            <div className="flex items-center justify-center h-96">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <Hotel className="h-16 w-16 mx-auto mb-4 text-gray-400" />
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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore Hospitality</h3>
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
              © 2024 NovaCore Hospitality CRM. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
