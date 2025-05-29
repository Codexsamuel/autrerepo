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
  Utensils,
  ChefHat,
  Clock,
  Star,
  BarChart3,
  Package,
  UserCheck,
  Bot,
  Zap,
  Plus,
  Phone,
  Mail,
  Filter,
  Download,
  Edit,
  Eye,
  Heart,
  Coffee,
  UtensilsCrossed,
} from "lucide-react"

interface UserRole {
  id: string
  name: string
  level: "admin" | "manager" | "waiter" | "chef" | "host" | "cashier"
  permissions: string[]
}

interface UserType {
  id: string
  name: string
  email: string
  role: UserRole
  isOnline: boolean
}

export default function NovaRestaurantCRM() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [showRoleSelector, setShowRoleSelector] = useState(true)
  const [aiAlerts, setAiAlerts] = useState<any[]>([])

  // Rôles spécialisés restaurant
  const roles: UserRole[] = [
    {
      id: "admin",
      name: "Directeur Restaurant",
      level: "admin",
      permissions: ["all"],
    },
    {
      id: "manager",
      name: "Manager de Service",
      level: "manager",
      permissions: [
        "dashboard",
        "reservations",
        "tables",
        "customers",
        "menu",
        "orders",
        "staff",
        "reports",
        "inventory",
        "events",
      ],
    },
    {
      id: "waiter",
      name: "Serveur",
      level: "waiter",
      permissions: ["dashboard", "reservations", "tables", "orders", "customers", "menu_view"],
    },
    {
      id: "chef",
      name: "Chef de Cuisine",
      level: "chef",
      permissions: ["dashboard", "orders", "menu", "inventory", "kitchen"],
    },
    {
      id: "host",
      name: "Hôte d'Accueil",
      level: "host",
      permissions: ["dashboard", "reservations", "tables", "customers"],
    },
    {
      id: "cashier",
      name: "Caissier",
      level: "cashier",
      permissions: ["dashboard", "orders", "payments", "customers"],
    },
  ]

  const demoUsers: UserType[] = [
    {
      id: "1",
      name: "Samuel OBAM",
      email: "sobam@restaurant-meridien.cm",
      role: roles[0],
      isOnline: true,
    },
    {
      id: "2",
      name: "Marie Kouam",
      email: "marie.kouam@restaurant-meridien.cm",
      role: roles[1],
      isOnline: true,
    },
    {
      id: "3",
      name: "Jean Mbarga",
      email: "jean.mbarga@restaurant-meridien.cm",
      role: roles[2],
      isOnline: true,
    },
    {
      id: "4",
      name: "Chef Paul Essomba",
      email: "chef.paul@restaurant-meridien.cm",
      role: roles[3],
      isOnline: true,
    },
    {
      id: "5",
      name: "Grace Biya",
      email: "grace.biya@restaurant-meridien.cm",
      role: roles[4],
      isOnline: false,
    },
  ]

  // Données de démonstration restaurant
  const reservations = [
    {
      id: "RES001",
      customer: "Famille Kouam",
      date: "2024-01-15",
      time: "19:30",
      guests: 4,
      table: "Table 12",
      status: "Confirmé",
      phone: "+237 677 123 456",
      email: "kouam@email.cm",
      preferences: "Végétarien, Sans gluten",
      occasion: "Anniversaire",
      aiRisk: "low",
    },
    {
      id: "RES002",
      customer: "M. Jean Mbarga",
      date: "2024-01-15",
      time: "20:00",
      guests: 2,
      table: "Table 8",
      status: "En attente",
      phone: "+237 699 987 654",
      email: "mbarga@email.cm",
      preferences: "Aucune",
      occasion: "Dîner d'affaires",
      aiRisk: "medium",
    },
    {
      id: "RES003",
      customer: "Groupe Entreprise ABC",
      date: "2024-01-16",
      time: "12:30",
      guests: 12,
      table: "Salon privé",
      status: "Confirmé",
      phone: "+237 655 456 789",
      email: "contact@abc-sarl.cm",
      preferences: "Menu groupe",
      occasion: "Réunion d'équipe",
      aiRisk: "low",
    },
  ]

  const tables = [
    {
      number: "1",
      capacity: 2,
      status: "Libre",
      location: "Terrasse",
      waiter: "",
      currentOrder: null,
      lastCleaned: "14:30",
      aiScore: 98,
    },
    {
      number: "8",
      capacity: 4,
      status: "Occupée",
      location: "Salle principale",
      waiter: "Jean Mbarga",
      currentOrder: "CMD-456",
      lastCleaned: "18:45",
      aiScore: 95,
    },
    {
      number: "12",
      capacity: 6,
      status: "Réservée",
      location: "Près fenêtre",
      waiter: "Marie Kouam",
      currentOrder: null,
      lastCleaned: "19:00",
      aiScore: 92,
    },
    {
      number: "15",
      capacity: 8,
      status: "Nettoyage",
      location: "Salle VIP",
      waiter: "",
      currentOrder: null,
      lastCleaned: "En cours",
      aiScore: 85,
    },
  ]

  const menuItems = [
    {
      id: "MENU001",
      name: "Ndolé aux Crevettes",
      category: "Plats Traditionnels",
      price: 4500,
      cost: 1800,
      margin: 60,
      popularity: 95,
      ingredients: ["Ndolé", "Crevettes", "Arachides", "Poisson fumé"],
      allergens: ["Crustacés", "Arachides"],
      preparationTime: 25,
      available: true,
      aiRecommendation: "high",
    },
    {
      id: "MENU002",
      name: "Poulet DG",
      category: "Plats Signature",
      price: 6000,
      cost: 2400,
      margin: 60,
      popularity: 88,
      ingredients: ["Poulet", "Plantain", "Légumes", "Épices"],
      allergens: [],
      preparationTime: 30,
      available: true,
      aiRecommendation: "high",
    },
    {
      id: "MENU003",
      name: "Poisson Braisé",
      category: "Grillades",
      price: 5500,
      cost: 2200,
      margin: 60,
      popularity: 82,
      ingredients: ["Poisson", "Épices", "Légumes"],
      allergens: ["Poisson"],
      preparationTime: 20,
      available: false,
      aiRecommendation: "medium",
    },
  ]

  const customers = [
    {
      id: "CUST001",
      name: "Marie Kouam",
      email: "marie.kouam@email.cm",
      phone: "+237 677 123 456",
      visits: 15,
      totalSpent: 125000,
      avgSpent: 8333,
      lastVisit: "2024-01-10",
      preferences: ["Végétarien", "Sans épices"],
      allergies: ["Gluten"],
      favoriteTable: "Table 12",
      vipStatus: true,
      birthday: "1985-03-15",
      aiSegment: "VIP Fidèle",
    },
    {
      id: "CUST002",
      name: "Jean Mbarga",
      email: "jean.mbarga@email.cm",
      phone: "+237 699 987 654",
      visits: 8,
      totalSpent: 85000,
      avgSpent: 10625,
      lastVisit: "2024-01-12",
      preferences: ["Plats épicés"],
      allergies: [],
      favoriteTable: "Table 8",
      vipStatus: false,
      birthday: "1978-07-22",
      aiSegment: "Client Régulier",
    },
  ]

  const orders = [
    {
      id: "CMD001",
      table: "Table 8",
      waiter: "Jean Mbarga",
      items: [
        { name: "Ndolé aux Crevettes", quantity: 2, price: 4500 },
        { name: "Vin Rouge", quantity: 1, price: 8000 },
      ],
      total: 17000,
      status: "En préparation",
      orderTime: "19:45",
      estimatedReady: "20:10",
      specialRequests: "Peu épicé",
      aiPriority: "normal",
    },
    {
      id: "CMD002",
      table: "Table 12",
      waiter: "Marie Kouam",
      items: [
        { name: "Poulet DG", quantity: 1, price: 6000 },
        { name: "Jus de Bissap", quantity: 2, price: 1500 },
      ],
      total: 9000,
      status: "Prêt",
      orderTime: "19:30",
      estimatedReady: "20:00",
      specialRequests: "Sans arachides",
      aiPriority: "high",
    },
  ]

  useEffect(() => {
    const alertInterval = setInterval(() => {
      const alerts = [
        "Réservation suspecte détectée - Même numéro pour 5 réservations",
        "Commande inhabituelle - Montant élevé table 8",
        "Client VIP Marie Kouam en attente depuis 10 min",
        "Stock faible - Ndolé (2 portions restantes)",
        "Temps de préparation dépassé - Commande CMD001",
      ]
      const newAlert = {
        id: Date.now(),
        message: alerts[Math.floor(Math.random() * alerts.length)],
        type: Math.random() > 0.7 ? "warning" : "info",
        timestamp: new Date().toLocaleTimeString(),
      }
      setAiAlerts((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 12000)

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
      case "Libre":
        return "bg-green-100 text-green-800"
      case "Occupée":
        return "bg-red-100 text-red-800"
      case "Réservée":
        return "bg-blue-100 text-blue-800"
      case "Nettoyage":
        return "bg-yellow-100 text-yellow-800"
      case "Confirmé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "En préparation":
        return "bg-orange-100 text-orange-800"
      case "Prêt":
        return "bg-green-100 text-green-800"
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
      case "waiter":
        return "bg-blue-100 text-blue-800"
      case "chef":
        return "bg-orange-100 text-orange-800"
      case "host":
        return "bg-green-100 text-green-800"
      case "cashier":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Écran de sélection de rôle
  if (showRoleSelector || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Nova Restaurant CRM</CardTitle>
                <CardDescription>Restaurant Le Meridien - Yaoundé</CardDescription>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Sélectionnez votre profil utilisateur</h2>
            <p className="text-muted-foreground">
              Système de gestion restaurant avec IA pour surveillance des transactions et prévention des fraudes
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoUsers.map((user) => (
                <Card
                  key={user.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-200"
                  onClick={() => switchUser(user.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        {user.role.level === "chef" && <ChefHat className="h-5 w-5 text-white" />}
                        {user.role.level === "waiter" && <Utensils className="h-5 w-5 text-white" />}
                        {user.role.level === "host" && <Users className="h-5 w-5 text-white" />}
                        {user.role.level === "cashier" && <DollarSign className="h-5 w-5 text-white" />}
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nova Restaurant CRM</h1>
                  <p className="text-sm text-muted-foreground">Restaurant Le Meridien - Yaoundé</p>
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
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  {currentUser.role.level === "chef" && <ChefHat className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "waiter" && <Utensils className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "host" && <Users className="h-4 w-4 text-white" />}
                  {currentUser.role.level === "cashier" && <DollarSign className="h-4 w-4 text-white" />}
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
                  activeTab === "dashboard" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
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
                  activeTab === "reservations" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-3" />
                Réservations
              </button>
            )}

            {hasPermission("tables") && (
              <button
                onClick={() => setActiveTab("tables")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "tables" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <UtensilsCrossed className="h-4 w-4 inline mr-3" />
                Plan de Salle
              </button>
            )}

            {hasPermission("orders") && (
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "orders" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Clock className="h-4 w-4 inline mr-3" />
                Commandes
              </button>
            )}

            {(hasPermission("menu") || hasPermission("menu_view")) && (
              <button
                onClick={() => setActiveTab("menu")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "menu" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Coffee className="h-4 w-4 inline mr-3" />
                Menu & Carte
              </button>
            )}

            {hasPermission("customers") && (
              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "customers" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Users className="h-4 w-4 inline mr-3" />
                Clients
              </button>
            )}

            {hasPermission("events") && (
              <button
                onClick={() => setActiveTab("events")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "events" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Star className="h-4 w-4 inline mr-3" />
                Événements
              </button>
            )}

            {hasPermission("inventory") && (
              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "inventory" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <Package className="h-4 w-4 inline mr-3" />
                Stock & Inventaire
              </button>
            )}

            {hasPermission("staff") && (
              <button
                onClick={() => setActiveTab("staff")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "staff" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                }`}
              >
                <UserCheck className="h-4 w-4 inline mr-3" />
                Personnel
              </button>
            )}

            {hasPermission("reports") && (
              <button
                onClick={() => setActiveTab("reports")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "reports" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
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
                  activeTab === "ai-monitoring" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
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
              <Alert className="border-orange-200 bg-orange-50">
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
                  <h2 className="text-2xl font-bold mb-2">Tableau de bord Restaurant</h2>
                  <p className="text-muted-foreground">Vue d'ensemble en temps réel - Accès: {currentUser.role.name}</p>
                </div>
                {hasPermission("reports") && (
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Rapport du jour
                  </Button>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Tables occupées</p>
                        <p className="text-2xl font-bold">12/20</p>
                        <p className="text-xs text-green-600">60% d'occupation</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UtensilsCrossed className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">CA du jour</p>
                        <p className="text-2xl font-bold">
                          {hasPermission("reports") || hasPermission("all") ? "485,000 FCFA" : "***,*** FCFA"}
                        </p>
                        <p className="text-xs text-green-600">+15% vs hier</p>
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
                        <p className="text-sm text-muted-foreground">Commandes actives</p>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-xs text-orange-600">Temps moyen: 18 min</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Satisfaction client</p>
                        <p className="text-2xl font-bold">4.8/5</p>
                        <p className="text-xs text-green-600">+0.2 vs semaine</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Réservations et Commandes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Réservations du jour
                    </CardTitle>
                    <CardDescription>Prochaines réservations avec surveillance IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reservations.map((reservation) => (
                        <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{reservation.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {reservation.time} - {reservation.guests} pers. - {reservation.table}
                              </p>
                              <p className="text-xs text-muted-foreground">{reservation.occasion}</p>
                            </div>
                          </div>
                          <div className="text-right">
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
                      <Clock className="h-5 w-5 text-orange-600" />
                      Commandes en cours
                    </CardTitle>
                    <CardDescription>Suivi temps réel des commandes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Utensils className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{order.table}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} plats - {order.waiter}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Commandé: {order.orderTime} - Prêt: {order.estimatedReady}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {hasPermission("reports") || hasPermission("all")
                                ? `${order.total.toLocaleString()} FCFA`
                                : "***,*** FCFA"}
                            </p>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des Réservations</h2>
                  <p className="text-muted-foreground">Planning et gestion des réservations avec IA anti-fraude</p>
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
                            Date & Heure
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Convives</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                            Analyse IA
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((reservation) => (
                          <tr key={reservation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{reservation.customer}</div>
                                <div className="text-sm text-gray-500">{reservation.phone}</div>
                                <div className="text-sm text-gray-500">{reservation.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{reservation.date}</div>
                                <div className="text-sm text-gray-500">{reservation.time}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{reservation.table}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{reservation.guests}</div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    reservation.aiRisk === "low"
                                      ? "bg-green-500"
                                      : reservation.aiRisk === "medium"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                <span className="text-sm">
                                  {reservation.aiRisk === "low"
                                    ? "Faible"
                                    : reservation.aiRisk === "medium"
                                      ? "Moyen"
                                      : "Élevé"}
                                </span>
                              </div>
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
                  <h2 className="text-2xl font-bold mb-2">Base Clients</h2>
                  <p className="text-muted-foreground">Profils clients avec historique et préférences</p>
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
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{customer.name}</h3>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                            <p className="text-sm text-muted-foreground">{customer.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {customer.vipStatus && <Badge className="bg-gold-100 text-gold-800 mb-2">VIP</Badge>}
                          <Badge variant="outline">{customer.aiSegment}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Visites</p>
                          <p className="font-bold">{customer.visits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total dépensé</p>
                          <p className="font-bold">
                            {hasPermission("reports") || hasPermission("all")
                              ? `${customer.totalSpent.toLocaleString()} FCFA`
                              : "***,*** FCFA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Panier moyen</p>
                          <p className="font-bold">
                            {hasPermission("reports") || hasPermission("all")
                              ? `${customer.avgSpent.toLocaleString()} FCFA`
                              : "***,*** FCFA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Dernière visite</p>
                          <p className="font-bold">{customer.lastVisit}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-sm font-medium">Préférences:</p>
                          <div className="flex flex-wrap gap-1">
                            {customer.preferences.map((pref, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {customer.allergies.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-red-600">Allergies:</p>
                            <div className="flex flex-wrap gap-1">
                              {customer.allergies.map((allergy, idx) => (
                                <Badge key={idx} variant="destructive" className="text-xs">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
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
                          <Heart className="h-4 w-4" />
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
                  <Utensils className="h-16 w-16 mx-auto mb-4 text-gray-400" />
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
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore Restaurant</h3>
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
              © 2024 NovaCore Restaurant CRM. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
