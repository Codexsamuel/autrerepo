"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  BarChart3,
  Tag,
  Truck,
  Zap,
  Bot,
  Store,
  Grid3X3,
  Layers,
  ChevronRight,
  Home,
  PlusCircle,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function DLCommerce() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const recentOrders = [
    {
      id: "ORD-5723",
      customer: "Marie Kouam",
      date: "15/01/2024",
      status: "Livré",
      total: "45,000 FCFA",
      items: 3,
      payment: "Mobile Money",
    },
    {
      id: "ORD-5722",
      customer: "Jean Mbarga",
      date: "14/01/2024",
      status: "En cours",
      total: "78,500 FCFA",
      items: 5,
      payment: "Carte bancaire",
    },
    {
      id: "ORD-5721",
      customer: "Sophie Ndongo",
      date: "14/01/2024",
      status: "En attente",
      total: "12,000 FCFA",
      items: 1,
      payment: "Orange Money",
    },
  ]

  const topProducts = [
    {
      id: "PROD-1234",
      name: "Smartphone Galaxy A53",
      category: "Électronique",
      price: "175,000 FCFA",
      stock: 24,
      sold: 156,
      rating: 4.8,
    },
    {
      id: "PROD-2345",
      name: "Chaussures Nike Air Max",
      category: "Mode",
      price: "65,000 FCFA",
      stock: 12,
      sold: 89,
      rating: 4.5,
    },
    {
      id: "PROD-3456",
      name: "Mixeur Philips",
      category: "Électroménager",
      price: "32,000 FCFA",
      stock: 8,
      sold: 45,
      rating: 4.7,
    },
  ]

  const aiInsights = [
    {
      id: "AI001",
      type: "stock",
      title: "Alerte stock faible",
      description: "5 produits nécessitent un réapprovisionnement urgent",
      severity: "high",
      action: "Voir les produits",
    },
    {
      id: "AI002",
      type: "trend",
      title: "Tendance détectée",
      description: "Les ventes de smartphones ont augmenté de 35% cette semaine",
      severity: "info",
      action: "Analyser",
    },
    {
      id: "AI003",
      type: "pricing",
      title: "Opportunité de prix",
      description: "Augmenter le prix des chaussures Nike de 5% pourrait optimiser les marges",
      severity: "medium",
      action: "Appliquer",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const breadcrumbs = [
    { name: "Accueil", href: "/demo/dl-commerce" },
    { name: "Dashboard", href: "/demo/dl-commerce" },
  ]

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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">DL Commerce</h1>
                  <p className="text-sm text-muted-foreground">ERP E-commerce avec IA</p>
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center text-sm">
            {breadcrumbs.map((breadcrumb, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                <Link href={breadcrumb.href} className="text-gray-600 hover:text-blue-600">
                  {i === 0 ? <Home className="h-4 w-4" /> : breadcrumb.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r h-screen sticky top-0 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link
              href="/demo/dl-commerce"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <TrendingUp className="h-4 w-4 mr-3" />
              Tableau de bord
            </Link>
            <Link
              href="/demo/dl-commerce/commandes"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "orders" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <Package className="h-4 w-4 mr-3" />
              Commandes
            </Link>
            <Link
              href="/demo/dl-commerce/produits"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "products" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Grid3X3 className="h-4 w-4 mr-3" />
              Produits
            </Link>
            <Link
              href="/demo/dl-commerce/categories"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "categories" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              <Layers className="h-4 w-4 mr-3" />
              Catégories
            </Link>
            <Link
              href="/demo/dl-commerce/clients"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "customers" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("customers")}
            >
              <Users className="h-4 w-4 mr-3" />
              Clients
            </Link>
            <Link
              href="/demo/dl-commerce/promotions"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "promotions" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("promotions")}
            >
              <Tag className="h-4 w-4 mr-3" />
              Promotions
            </Link>
            <Link
              href="/demo/dl-commerce/livraisons"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "shipping" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              <Truck className="h-4 w-4 mr-3" />
              Livraisons
            </Link>
            <Link
              href="/demo/dl-commerce/finances"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "finances" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("finances")}
            >
              <DollarSign className="h-4 w-4 mr-3" />
              Finances
            </Link>
            <Link
              href="/demo/dl-commerce/analytics"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "analytics" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="h-4 w-4 mr-3" />
              Analytics
            </Link>
            <Link
              href="/demo/dl-commerce/boutique"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "store" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("store")}
            >
              <Store className="h-4 w-4 mr-3" />
              Ma Boutique
            </Link>
            <Link
              href="/demo/dl-commerce/ia"
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === "ai" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("ai")}
            >
              <Bot className="h-4 w-4 mr-3" />
              IA Commerce
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tableau de bord</h2>
                <p className="text-muted-foreground">Vue d'ensemble de votre boutique en ligne</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau produit
                </Button>
              </div>
            </div>

            {/* AI Insights Alert */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-800">IA NovaCore - Insights Commerce</h3>
                    <p className="text-sm text-blue-700">
                      L'IA a détecté 3 opportunités d'optimisation pour votre boutique
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-300">
                    Voir les insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ventes aujourd'hui</p>
                      <p className="text-2xl font-bold">245,000 FCFA</p>
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
                      <p className="text-sm text-muted-foreground">Commandes</p>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-green-600">+3 vs hier</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Nouveaux clients</p>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-green-600">+2 vs hier</p>
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
                      <p className="text-sm text-muted-foreground">Taux de conversion</p>
                      <p className="text-2xl font-bold">3.2%</p>
                      <p className="text-xs text-green-600">+0.5% vs hier</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Commandes récentes
                  </CardTitle>
                  <CardDescription>Les dernières commandes de votre boutique</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.id} - {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Voir toutes les commandes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Produits les plus vendus
                  </CardTitle>
                  <CardDescription>Performance de vos meilleurs produits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Grid3X3 className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.category} - {product.sold} vendus
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.price}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Voir tous les produits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Insights IA
                </CardTitle>
                <CardDescription>Recommandations intelligentes pour votre boutique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        insight.severity === "high"
                          ? "bg-red-50 border-red-500"
                          : insight.severity === "medium"
                            ? "bg-yellow-50 border-yellow-500"
                            : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {insight.severity === "high" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {insight.severity === "medium" && <Clock className="h-4 w-4 text-yellow-600" />}
                        {insight.severity === "info" && <CheckCircle className="h-4 w-4 text-blue-600" />}
                        <span
                          className={`font-medium ${
                            insight.severity === "high"
                              ? "text-red-800"
                              : insight.severity === "medium"
                                ? "text-yellow-800"
                                : "text-blue-800"
                          }`}
                        >
                          {insight.title}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          insight.severity === "high"
                            ? "text-red-700"
                            : insight.severity === "medium"
                              ? "text-yellow-700"
                              : "text-blue-700"
                        } mb-2`}
                      >
                        {insight.description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          insight.severity === "high"
                            ? "border-red-300 text-red-700"
                            : insight.severity === "medium"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-blue-300 text-blue-700"
                        }
                      >
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
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
