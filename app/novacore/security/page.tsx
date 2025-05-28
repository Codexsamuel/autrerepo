"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  Download,
  RefreshCw,
  Ban,
} from "lucide-react"

export default function NovaCorSecurity() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const securityAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Tentative de connexion suspecte",
      description: "Connexion depuis une nouvelle localisation (Londres, UK)",
      time: "Il y a 2h",
      status: "active",
    },
    {
      id: 2,
      type: "info",
      title: "Mot de passe modifié",
      description: "Mot de passe mis à jour avec succès",
      time: "Il y a 1j",
      status: "resolved",
    },
    {
      id: 3,
      type: "success",
      title: "2FA activé",
      description: "Authentification à deux facteurs configurée",
      time: "Il y a 3j",
      status: "resolved",
    },
  ]

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      browser: "Chrome 118.0",
      location: "Paris, France",
      ip: "192.168.1.100",
      lastActive: "Maintenant",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 15 Pro",
      browser: "Safari Mobile",
      location: "Paris, France",
      ip: "192.168.1.101",
      lastActive: "Il y a 2h",
      current: false,
    },
    {
      id: 3,
      device: "Windows PC",
      browser: "Edge 118.0",
      location: "Lyon, France",
      ip: "192.168.2.50",
      lastActive: "Il y a 1j",
      current: false,
    },
  ]

  const loginHistory = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      location: "Paris, France",
      ip: "192.168.1.100",
      device: "MacBook Pro",
      status: "success",
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:15:10",
      location: "Paris, France",
      ip: "192.168.1.101",
      device: "iPhone 15 Pro",
      status: "success",
    },
    {
      id: 3,
      timestamp: "2024-01-14 18:45:33",
      location: "Londres, UK",
      ip: "203.0.113.45",
      device: "Unknown Device",
      status: "blocked",
    },
    {
      id: 4,
      timestamp: "2024-01-14 16:20:15",
      location: "Lyon, France",
      ip: "192.168.2.50",
      device: "Windows PC",
      status: "success",
    },
  ]

  const securityScore = 85

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
                  Sécurité NovaCore
                </h1>
                <p className="text-sm text-gray-600">Surveillance et protection des accès</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Rapport Sécurité
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Security Score */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Score de Sécurité</h2>
                <p className="text-gray-600">Évaluation globale de la sécurité de votre compte</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${securityScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{securityScore}</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 mt-2">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 max-w-2xl">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "overview"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Vue d'ensemble
          </button>
          <button
            onClick={() => setSelectedTab("sessions")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "sessions"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Monitor className="h-4 w-4 inline mr-2" />
            Sessions
          </button>
          <button
            onClick={() => setSelectedTab("history")}
            className={`flex-1 py-3 px-6 rounded-md transition-all ${
              selectedTab === "history"
                ? "bg-white shadow-md text-indigo-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Clock className="h-4 w-4 inline mr-2" />
            Historique
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-8">
            {/* Security Alerts */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Alertes de Sécurité</h3>
                  <Badge className="bg-orange-100 text-orange-700">
                    {securityAlerts.filter((alert) => alert.status === "active").length} active(s)
                  </Badge>
                </div>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        {alert.type === "warning" && <AlertTriangle className="h-6 w-6 text-orange-500" />}
                        {alert.type === "info" && <Shield className="h-6 w-6 text-blue-500" />}
                        {alert.type === "success" && <CheckCircle className="h-6 w-6 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                      <div>
                        <Badge
                          className={
                            alert.status === "active" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                          }
                        >
                          {alert.status === "active" ? "Actif" : "Résolu"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Fonctionnalités de Sécurité</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Authentification 2FA</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activé</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Chiffrement SSL</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activé</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">Détection d'intrusion</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activé</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-gray-700">Sauvegarde automatique</span>
                      </div>
                      <Badge className="bg-red-100 text-red-700">Désactivé</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Actions Rapides</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Lock className="mr-3 h-4 w-4" />
                      Changer le mot de passe
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Smartphone className="mr-3 h-4 w-4" />
                      Configurer 2FA
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="mr-3 h-4 w-4" />
                      Voir les permissions
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Ban className="mr-3 h-4 w-4" />
                      Révoquer toutes les sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {selectedTab === "sessions" && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Sessions Actives</h3>
                <Button variant="outline" className="text-red-600 border-red-200">
                  <Ban className="h-4 w-4 mr-2" />
                  Révoquer toutes
                </Button>
              </div>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        {session.device.includes("iPhone") && <Smartphone className="h-6 w-6 text-white" />}
                        {session.device.includes("MacBook") && <Monitor className="h-6 w-6 text-white" />}
                        {session.device.includes("Windows") && <Monitor className="h-6 w-6 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 flex items-center">
                          {session.device}
                          {session.current && (
                            <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Actuelle</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{session.browser}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {session.location} • {session.ip}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{session.lastActive}</div>
                      {!session.current && (
                        <Button variant="outline" size="sm" className="mt-2 text-red-600 border-red-200">
                          Révoquer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Tab */}
        {selectedTab === "history" && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Historique des Connexions</h3>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Filtrer par IP ou localisation..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Heure
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localisation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appareil
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loginHistory.map((login) => (
                      <tr key={login.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{login.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {login.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{login.device}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{login.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              login.status === "success"
                                ? "bg-green-100 text-green-700"
                                : login.status === "blocked"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                            }
                          >
                            {login.status === "success" && "Succès"}
                            {login.status === "blocked" && "Bloqué"}
                            {login.status === "failed" && "Échec"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
