"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  Wallet,
  ShoppingCart,
  Briefcase,
  Mail,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Euro,
  TrendingUp,
  TrendingDown,
  UserPlus,
  FileCheck,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* En-tête */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold">ERP Immobilier</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 rounded-full bg-primary/10">
                  <Image
                    src="/avatar.png"
                    alt="Avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-1">
              <Link
                href="/solutions/immobilier/tableau-de-bord"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Tableau de bord</span>
              </Link>
              <Link
                href="/solutions/immobilier/biens"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Building2 className="w-5 h-5" />
                <span>Biens immobiliers</span>
              </Link>
              <Link
                href="/solutions/immobilier/clients"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Users className="w-5 h-5" />
                <span>Clients</span>
              </Link>
              <Link
                href="/solutions/immobilier/documents"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <FileText className="w-5 h-5" />
                <span>Documents</span>
              </Link>
              <Link
                href="/solutions/immobilier/calendrier"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Calendrier</span>
              </Link>
              <Link
                href="/solutions/immobilier/comptabilite"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Wallet className="w-5 h-5" />
                <span>Comptabilité</span>
              </Link>
              <Link
                href="/solutions/immobilier/fournisseurs"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Fournisseurs</span>
              </Link>
              <Link
                href="/solutions/immobilier/projets"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Briefcase className="w-5 h-5" />
                <span>Projets</span>
              </Link>
              <Link
                href="/solutions/immobilier/parametres"
                className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Settings className="w-5 h-5" />
                <span>Paramètres</span>
              </Link>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="col-span-9">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="analytics">Analytique</TabsTrigger>
                <TabsTrigger value="reports">Rapports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* KPIs */}
                <div className="grid grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Chiffre d'affaires
                      </CardTitle>
                      <DollarSign className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€45,231.89</div>
                      <p className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +20.1% par rapport au mois dernier
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Biens en gestion
                      </CardTitle>
                      <Building2 className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-blue-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12 nouveaux ce mois-ci
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Clients actifs
                      </CardTitle>
                      <Users className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,350</div>
                      <p className="text-xs text-purple-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +180 nouveaux ce mois-ci
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taux d'occupation
                      </CardTitle>
                      <BarChart3 className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">94.2%</div>
                      <p className="text-xs text-orange-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +2.1% par rapport au mois dernier
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Activités récentes et tâches */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activités récentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Nouveau client ajouté
                            </p>
                            <p className="text-xs text-gray-500">
                              Il y a 5 minutes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileCheck className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Contrat signé
                            </p>
                            <p className="text-xs text-gray-500">
                              Il y a 2 heures
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Maintenance requise
                            </p>
                            <p className="text-xs text-gray-500">
                              Il y a 3 heures
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tâches en attente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Vérification mensuelle
                              </p>
                              <p className="text-xs text-gray-500">
                                Échéance : Aujourd'hui
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Compléter
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-yellow-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Rapport trimestriel
                              </p>
                              <p className="text-xs text-gray-500">
                                Échéance : Dans 3 jours
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Compléter
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Renouvellement de bail
                              </p>
                              <p className="text-xs text-gray-500">
                                Échéance : Dans 1 semaine
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Compléter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Graphiques et statistiques */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        {/* Ici, nous ajouterons un graphique avec une bibliothèque comme Chart.js ou Recharts */}
                        <p className="text-gray-500">Graphique de performance</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition des biens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        {/* Ici, nous ajouterons un graphique circulaire */}
                        <p className="text-gray-500">Graphique de répartition</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                {/* Contenu de l'onglet Analytique */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analytique détaillée</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Contenu de l'analytique à venir...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                {/* Contenu de l'onglet Rapports */}
                <Card>
                  <CardHeader>
                    <CardTitle>Rapports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Contenu des rapports à venir...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
} 