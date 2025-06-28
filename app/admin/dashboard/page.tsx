"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Eye, Edit, Download, RefreshCw, Clock, Search, Filter, Trash2, Plus, Upload, BarChart3, ImageIcon, FileText, Globe, ShoppingCart, Package, Users, LayoutDashboard } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const stats = [{ label: "Revenus Total", value: "€127,450", change: "+12%", icon: TrendingUp, color: "text-green-600" },
    { label: "Commandes", value: "1,247", change: "+8%", icon: ShoppingCart, color: "text-blue-600" },
    { label: "Produits", value: "2,847", change: "+15%", icon: Package, color: "text-purple-600" },
    { label: "Utilisateurs", value: "4,892", change: "+23%", icon: Users, color: "text-orange-600" }]
  const recentOrders = [{ id: "DL-001", customer: "Marie Dubois", amount: "€89.99", status: "completed", date: "Il y a 2h" },
    { id: "DL-002", customer: "Jean Martin", amount: "€149.99", status: "processing", date: "Il y a 4h" },
    { id: "DL-003", customer: "Sophie Laurent", amount: "€24.99", status: "shipped", date: "Il y a 6h" },
    { id: "DL-004", customer: "Thomas Durand", amount: "€199.99", status: "pending", date: "Il y a 8h" }]
  const products = [
    {
      id: 1,
      name: "Casque Gaming RGB Pro X",
      category: "Tech",
      price: "€89.99",
      stock: 45,
      sales: 127,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
    },
    {
      id: 2,
      name: "T-Shirt Premium DL Collection",
      category: "Mode",
      price: "€24.99",
      stock: 89,
      sales: 234,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
    },
    {
      id: 3,
      name: "Montre Connectée Sport Pro",
      category: "Tech",
      price: "€199.99",
      stock: 12,
      sales: 67,
      image: "/placeholder.svg?height=60&width=60",
      status: "low_stock",
    }
  ]
  const categories = [{ id: 1, name: "High-Tech", products: 892, icon: "📱" },
    { id: 2, name: "Mode & Vêtements", products: 654, icon: "👕" },
    { id: 3, name: "Maison & Jardin", products: 423, icon: "🏠" },
    { id: 4, name: "Sport & Loisirs", products: 387, icon: "⚽" }]
  const mediaFiles = [{ id: 1, name: "hero-banner.jpg", type: "image", size: "2.4 MB", url: "/placeholder.svg", usage: "Homepage" },
    { id: 2, name: "product-video.mp4", type: "video", size: "15.7 MB", url: "/placeholder.svg", usage: "Product" },
    { id: 3, name: "logo-dl.png", type: "image", size: "156 KB", url: "/placeholder.svg", usage: "Brand" }]
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "shipped":
        return "bg-purple-100 text-purple-700"
      case "pending":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Gestion complète DL Solutions</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Button
                variant={selectedTab === "overview" ? "default" : "ghost"}
                onClick={() => setSelectedTab("overview")}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Vue d'ensemble
              </Button>
              <Button
                variant={selectedTab === "products" ? "default" : "ghost"}
                onClick={() => setSelectedTab("products")}
              >
                <Package className="h-4 w-4 mr-2" />
                Produits
              </Button>
              <Button variant={selectedTab === "media" ? "default" : "ghost"} onClick={() => setSelectedTab("media")}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Médias
              </Button>
              <Button
                variant={selectedTab === "content" ? "default" : "ghost"}
                onClick={() => setSelectedTab("content")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Contenu
              </Button>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-700 text-xs">stat.change</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Commandes Récentes</h3>
                    <Button variant="outline" size="sm">
                      Voir tout
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-600">{order.customer}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{order.amount}</div>
                          <Badge className={getStatusColor(order.status)}>order.status</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Actions Rapides</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex-col bg-gradient-to-r from-blue-500 to-indigo-600">
                      <Package className="h-6 w-6 mb-2" />
                      Ajouter Produit
                    </Button>
                    <Button className="h-20 flex-col bg-gradient-to-r from-green-500 to-emerald-600">
                      <ImageIcon className="h-6 w-6 mb-2" />
                      Upload Média
                    </Button>
                    <Button className="h-20 flex-col bg-gradient-to-r from-purple-500 to-pink-600">
                      <FileText className="h-6 w-6 mb-2" />
                      Créer Article
                    </Button>
                    <Button className="h-20 flex-col bg-gradient-to-r from-orange-500 to-red-600">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="space-y-6">
              {/* Products Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gestion des Produits</h2>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Produit
                </Button>
              </div>

              {/* Products Filters */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Actualiser
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Produit
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Catégorie
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ventes
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product: any) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg mr-4"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">ID: {product.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="secondary">product.category</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  product.stock < 20 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                }
                              >
                                {product.stock} unités
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  product.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }
                              >product.status === "active" ? "Actif" : "Stock faible"</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
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

              {/* Categories Management */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Catégories</h3>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle Catégorie
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category: any) => (
                      <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{category.icon}</span>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.products} produits</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              {/* Media Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gestion des Médias</h2>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Fichier
                </Button>
              </div>

              {/* Upload Zone */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Glissez vos fichiers ici</h3>
                    <p className="text-gray-600 mb-4">ou cliquez pour sélectionner</p>
                    <Button variant="outline">Choisir des fichiers</Button>
                    <p className="text-xs text-gray-500 mt-4">Formats supportés: JPG, PNG, GIF, MP4, PDF (Max 50MB)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Media Library */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Bibliothèque Média</h3>
                    <div className="flex items-center space-x-4">
                      <Input placeholder="Rechercher..." className="w-64" />
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mediaFiles.map((file: any) => (
                      <Card key={file.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            {file.type === "image" ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-4xl">🎥</div>
                            )}
                          </div>
                          <h4 className="font-medium text-sm truncate">{file.name}</h4>
                          <p className="text-xs text-gray-500">{file.size}</p>
                          <p className="text-xs text-gray-500">{file.usage}</p>
                          <div className="flex items-center justify-between mt-3">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              {/* Content Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gestion du Contenu</h2>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Contenu
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Website Content */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Contenu du Site</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Page d'accueil</h4>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Hero section, services, témoignages</p>
                        <Badge className="mt-2 bg-green-100 text-green-700">Publié</Badge>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">À propos</h4>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Histoire, équipe, valeurs</p>
                        <Badge className="mt-2 bg-green-100 text-green-700">Publié</Badge>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Services</h4>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Détails des services offerts</p>
                        <Badge className="mt-2 bg-orange-100 text-orange-700">Brouillon</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blog & News */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Blog & Actualités</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">L'IA dans le e-commerce</h4>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Article sur les tendances IA</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className="bg-green-100 text-green-700">Publié</Badge>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Eye className="h-3 w-3" />
                            <span>1.2k vues</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Nouveautés DL Style</h4>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Présentation nouvelle collection</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className="bg-orange-100 text-orange-700">Programmé</Badge>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>15 Mars 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SEO & Analytics */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">SEO & Analytics</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-lg">24.5k</div>
                      <div className="text-sm text-gray-600">Visiteurs/mois</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-lg">3.2%</div>
                      <div className="text-sm text-gray-600">Taux conversion</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-lg">85</div>
                      <div className="text-sm text-gray-600">Score SEO</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
