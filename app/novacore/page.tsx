"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Globe,
  ShoppingBag,
  Plane,
  Trophy,
  ArrowRight,
  Settings,
  BarChart3,
  Shield,
  Zap,
  Brain,
  Star,
  TrendingUp,
  UserCheck,
} from "lucide-react"

export default function NovaCoreHub() {
  const [userRole] = useState("admin") // Simulé - sera géré par Clerk

  const services = [
    {
      id: "novaworld",
      name: "NovaWorld",
      description: "Réseau social B2B professionnel avec IA",
      icon: Globe,
      color: "from-blue-500 to-indigo-600",
      url: "/novaworld",
      features: ["Networking IA", "Publications", "Entreprises", "Analytics"],
      status: "active",
      users: "2.5k+",
    },
    {
      id: "dl-style",
      name: "DL Style",
      description: "Boutique en ligne premium DL Solutions",
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-600",
      url: "/dl-style",
      features: ["E-commerce", "Paiements", "Inventory", "Analytics"],
      status: "active",
      users: "1.2k+",
    },
    {
      id: "dl-travel",
      name: "DL Travel",
      description: "Plateforme de vente de billets d'avion",
      icon: Plane,
      color: "from-cyan-500 to-blue-600",
      url: "/dl-travel",
      features: ["API Vols", "Réservations", "Commissions", "B2B/B2C"],
      status: "active",
      users: "850+",
    },
    {
      id: "dl-bookmaker",
      name: "DL Bookmaker",
      description: "Paris sportifs assistés par IA",
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
      url: "/dl-bookmaker",
      features: ["Prédictions IA", "Paris Live", "Analytics", "Wallet"],
      status: "beta",
      users: "320+",
    },
  ]

  const quickStats = [
    { label: "Utilisateurs Actifs", value: "4.8k+", icon: Users, change: "+12%" },
    { label: "Revenus Mensuel", value: "€45.2k", icon: TrendingUp, change: "+8%" },
    { label: "Services Actifs", value: "4", icon: Zap, change: "100%" },
    { label: "Satisfaction", value: "98%", icon: Star, change: "+2%" },
  ]

  const recentActivity = [
    { user: "Marie Dubois", action: "Nouvelle inscription", service: "NovaWorld", time: "Il y a 5 min" },
    { user: "Jean Martin", action: "Commande validée", service: "DL Style", time: "Il y a 12 min" },
    { user: "Sophie Laurent", action: "Réservation vol", service: "DL Travel", time: "Il y a 18 min" },
    { user: "Thomas Durand", action: "Pari gagnant", service: "DL Bookmaker", time: "Il y a 25 min" },
  ]

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
                  NovaCore Hub
                </h1>
                <p className="text-sm text-gray-600">Centre de contrôle DL Solutions</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/novacore" className="text-indigo-600 font-medium">
                Hub
              </a>
              <a href="/novacore/dashboard" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Dashboard
              </a>
              <a href="/novacore/analytics" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Analytics
              </a>
              <a href="/novacore/settings" className="text-gray-800 hover:text-indigo-600 transition-colors">
                Paramètres
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-700">
                <UserCheck className="h-3 w-3 mr-1" />
                {userRole}
              </Badge>
              <Button variant="outline" className="border-indigo-200 text-indigo-700" asChild>
                <a href="/novacore/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </a>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/">Retour Site</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Brain className="h-4 w-4 mr-2" />
              Écosystème IA Complet
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Bienvenue sur NovaCore</h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Votre centre de contrôle pour tous les services DL Solutions. Gérez vos accès, consultez vos analytics et
              accédez à tous nos outils IA en un seul endroit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
                <a href="/novacore/dashboard">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Accéder au Dashboard
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BarChart3 className="mr-2 h-5 w-5" />
                Voir les Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">{stat.change}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700">Services Disponibles</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
              Votre écosystème{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                digital complet
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Accédez à tous nos services depuis cette interface centralisée. Chaque service est optimisé par l'IA pour
              maximiser vos résultats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card
                key={service.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          service.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }
                      >
                        {service.status === "active" ? "Actif" : "Bêta"}
                      </Badge>
                      <div className="text-sm text-gray-500 mt-1">{service.users} utilisateurs</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button className={`flex-1 bg-gradient-to-r ${service.color}`} asChild>
                      <a href={service.url}>
                        Accéder au service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Activité Récente</h3>
                    <Button variant="outline" size="sm">
                      Voir tout
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{activity.user}</div>
                          <div className="text-sm text-gray-600">
                            {activity.action} sur {activity.service}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Actions Rapides</h3>
                  <div className="space-y-4">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/novacore/dashboard">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        Gérer les utilisateurs
                      </a>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/novacore/analytics">
                        <BarChart3 className="mr-3 h-4 w-4" />
                        Voir les analytics
                      </a>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/novacore/settings">
                        <Settings className="mr-3 h-4 w-4" />
                        Paramètres système
                      </a>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <a href="/novacore/security">
                        <Shield className="mr-3 h-4 w-4" />
                        Sécurité & Accès
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">État du Système</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Status</span>
                      <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Base de données</span>
                      <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Services IA</span>
                      <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Paiements</span>
                      <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-indigo-400 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-lg font-bold">NovaCore</span>
              </div>
              <p className="text-gray-400 text-sm">
                Centre de contrôle pour l'écosystème DL Solutions. Tous vos services IA en un seul endroit.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/novaworld" className="hover:text-white transition-colors">
                    NovaWorld
                  </a>
                </li>
                <li>
                  <a href="/dl-style" className="hover:text-white transition-colors">
                    DL Style
                  </a>
                </li>
                <li>
                  <a href="/dl-travel" className="hover:text-white transition-colors">
                    DL Travel
                  </a>
                </li>
                <li>
                  <a href="/dl-bookmaker" className="hover:text-white transition-colors">
                    DL Bookmaker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Administration</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/novacore/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/novacore/analytics" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/novacore/settings" className="hover:text-white transition-colors">
                    Paramètres
                  </a>
                </li>
                <li>
                  <a href="/novacore/security" className="hover:text-white transition-colors">
                    Sécurité
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/documentation" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-white transition-colors">
                    Support Technique
                  </a>
                </li>
                <li>
                  <a href="/status" className="hover:text-white transition-colors">
                    État des Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DL Solutions. Tous droits réservés. | NovaCore Hub v2.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
