"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  UserPlus,
  Shield,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function NovaCoreDashboard() {
  const [selectedTab, setSelectedTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@example.com",
      role: "admin",
      services: ["NovaWorld", "DL Style"],
      status: "active",
      lastLogin: "Il y a 2h",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@example.com",
      role: "client",
      services: ["DL Travel", "DL Style"],
      status: "active",
      lastLogin: "Il y a 1j",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophie.laurent@example.com",
      role: "agent",
      services: ["NovaWorld", "DL Bookmaker"],
      status: "inactive",
      lastLogin: "Il y a 5j",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Thomas Durand",
      email: "thomas.durand@example.com",
      role: "manager",
      services: ["Tous les services"],
      status: "active",
      lastLogin: "Il y a 30min",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const roleColors = {
    admin: "bg-red-100 text-red-700",
    manager: "bg-blue-100 text-blue-700",
    agent: "bg-green-100 text-green-700",
    client: "bg-gray-100 text-gray-700",
  }

  const statusColors = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    suspended: "bg-red-100 text-red-700",
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                  Dashboard NovaCore
                </h1>
                <p className="text-sm text-gray-600">Gestion des utilisateurs et accès</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouvel utilisateur
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-800">4,847</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-700 text-xs">+12% ce mois</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                  <p className="text-2xl font-bold text-gray-800">3,241</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-700 text-xs">+8% ce mois</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nouveaux ce mois</p>
                  <p className="text-2xl font-bold text-gray-800">284</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-700 text-xs">+15% ce mois</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de rétention</p>
                  <p className="text-2xl font-bold text-gray-800">94.2%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-700 text-xs">+2% ce mois</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 max-w-md">
          <button
            onClick={() => setSelectedTab("users")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "users"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Utilisateurs
          </button>
          <button
            onClick={() => setSelectedTab("roles")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "roles"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Rôles
          </button>
          <button
            onClick={() => setSelectedTab("settings")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "settings"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Paramètres
          </button>
        </div>

        {/* Users Table */}
        {selectedTab === "users" && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des Utilisateurs</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière connexion
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                              <img
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={roleColors[user.role as keyof typeof roleColors]}>{user.role}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.services.map((service, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                            {user.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
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
        )}

        {/* Roles Management */}
        {selectedTab === "roles" && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Rôles et Permissions</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-red-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Admin</h4>
                    <p className="text-sm text-gray-600 mb-4">Accès complet à tous les services et paramètres</p>
                    <Badge className="bg-red-100 text-red-700">Accès total</Badge>
                  </CardContent>
                </Card>

                <Card className="border border-blue-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Manager</h4>
                    <p className="text-sm text-gray-600 mb-4">Gestion d'équipe et accès aux analytics</p>
                    <Badge className="bg-blue-100 text-blue-700">Gestion</Badge>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Agent</h4>
                    <p className="text-sm text-gray-600 mb-4">Accès aux services clients et ventes</p>
                    <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <Eye className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Client</h4>
                    <p className="text-sm text-gray-600 mb-4">Accès aux services souscrits uniquement</p>
                    <Badge className="bg-gray-100 text-gray-700">Limité</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        {selectedTab === "settings" && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Paramètres Système</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-800 mb-4">Sécurité</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Authentification 2FA</span>
                          <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Sessions multiples</span>
                          <Badge className="bg-green-100 text-green-700">Autorisé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Expiration session</span>
                          <span className="text-sm text-gray-800">24h</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-800 mb-4">Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Emails système</span>
                          <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Alertes sécurité</span>
                          <Badge className="bg-green-100 text-green-700">Activé</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rapports hebdo</span>
                          <Badge className="bg-blue-100 text-blue-700">Programmé</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
