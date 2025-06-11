"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Search,
  MoreVertical,
  Star,
  Building2,
  Phone,
  Mail,
  Calendar,
  Target,
  BarChart3,
  Filter,
  Plus,
  Download,
} from "lucide-react"

export default function DLBusinessSuite() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const leads = [
    {
      id: "LD001",
      name: "Entreprise Kamga SARL",
      contact: "Marie Kamga",
      email: "marie@kamga-sarl.cm",
      phone: "+237 677 123 456",
      value: "2,500,000 FCFA",
      stage: "Négociation",
      probability: 75,
      source: "Site web",
    },
    {
      id: "LD002",
      name: "Hôtel Akwa Palace",
      contact: "Jean Mbarga",
      email: "direction@akwapalace.cm",
      phone: "+237 699 987 654",
      value: "8,900,000 FCFA",
      stage: "Proposition",
      probability: 60,
      source: "Référence",
    },
    {
      id: "LD003",
      name: "Restaurant Le Palais",
      contact: "Sophie Ndongo",
      email: "sophie@lepalais.cm",
      phone: "+237 655 456 789",
      value: "1,200,000 FCFA",
      stage: "Qualification",
      probability: 40,
      source: "LinkedIn",
    },
  ]

  const opportunities = [
    {
      id: "OP001",
      account: "Groupe Bolloré Cameroun",
      amount: "45,000,000 FCFA",
      stage: "Négociation finale",
      closeDate: "2024-02-15",
      probability: 90,
      owner: "Thomas Durand",
    },
    {
      id: "OP002",
      account: "Orange Cameroun",
      amount: "28,500,000 FCFA",
      stage: "Proposition envoyée",
      closeDate: "2024-02-28",
      probability: 70,
      owner: "Marie Kouam",
    },
  ]

  const activities = [
    {
      id: "ACT001",
      type: "Appel",
      subject: "Suivi proposition Kamga SARL",
      contact: "Marie Kamga",
      date: "2024-01-15 14:30",
      status: "Terminé",
    },
    {
      id: "ACT002",
      type: "Email",
      subject: "Envoi devis Hôtel Akwa Palace",
      contact: "Jean Mbarga",
      date: "2024-01-15 16:45",
      status: "Envoyé",
    },
    {
      id: "ACT003",
      type: "Réunion",
      subject: "Présentation solution CRM",
      contact: "Sophie Ndongo",
      date: "2024-01-16 10:00",
      status: "Planifié",
    },
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">DL Business Suite</h1>
                  <p className="text-sm text-muted-foreground">CRM Entreprise - DL Solutions</p>
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
                activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-3" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "leads" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <Target className="h-4 w-4 inline mr-3" />
              Prospects
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "opportunities" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-3" />
              Opportunités
            </button>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "accounts" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <Building2 className="h-4 w-4 inline mr-3" />
              Comptes
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "activities" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-3" />
              Activités
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "reports" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-3" />
              Rapports
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tableau de bord</h2>
                  <p className="text-muted-foreground">Vue d'ensemble de vos ventes et performances</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau prospect
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                        <p className="text-2xl font-bold">125M FCFA</p>
                        <p className="text-xs text-green-600">+12% ce mois</p>
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
                        <p className="text-sm text-muted-foreground">Prospects actifs</p>
                        <p className="text-2xl font-bold">247</p>
                        <p className="text-xs text-blue-600">+8 cette semaine</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Taux de conversion</p>
                        <p className="text-2xl font-bold">24%</p>
                        <p className="text-xs text-purple-600">+3% ce mois</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Objectif mensuel</p>
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-xs text-orange-600">13% restant</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activités récentes</CardTitle>
                    <CardDescription>Vos dernières interactions clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {activity.type === "Appel" && <Phone className="h-4 w-4 text-blue-600" />}
                            {activity.type === "Email" && <Mail className="h-4 w-4 text-blue-600" />}
                            {activity.type === "Réunion" && <Calendar className="h-4 w-4 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.subject}</p>
                            <p className="text-xs text-muted-foreground">{activity.contact}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                          <Badge variant={activity.status === "Terminé" ? "default" : "secondary"} className="text-xs">
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Opportunités</CardTitle>
                    <CardDescription>Vos meilleures opportunités en cours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {opportunities.map((opp) => (
                        <div key={opp.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{opp.account}</h4>
                            <Badge variant="outline">{opp.probability}%</Badge>
                          </div>
                          <p className="text-lg font-bold text-green-600 mb-1">{opp.amount}</p>
                          <p className="text-sm text-muted-foreground mb-2">{opp.stage}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Clôture: {opp.closeDate}</span>
                            <span>{opp.owner}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Gestion des prospects</h2>
                  <p className="text-muted-foreground">Suivez et convertissez vos prospects</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau prospect
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                            Entreprise
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Valeur</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Étape</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                            Probabilité
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{lead.name}</div>
                                <div className="text-sm text-gray-500">{lead.id}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{lead.contact}</div>
                                <div className="text-sm text-gray-500">{lead.email}</div>
                                <div className="text-sm text-gray-500">{lead.phone}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-green-600">{lead.value}</div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="outline">{lead.stage}</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${lead.probability}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{lead.probability}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="secondary">{lead.source}</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Voir
                                </Button>
                                <Button size="sm" variant="outline">
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
            </div>
          )}

          {/* Autres onglets... */}
        </main>
      </div>

      {/* Demo Banner */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Mode Démo</p>
                <p className="text-xs opacity-90">DL Business Suite</p>
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
