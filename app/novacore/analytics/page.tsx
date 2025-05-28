"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Globe,
  ShoppingBag,
  Plane,
  Trophy,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function NovaCorAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedService, setSelectedService] = useState("all")

  const revenueData = [
    { month: "Jan", novaworld: 12000, dlstyle: 8500, dltravel: 15000, dlbookmaker: 5500 },
    { month: "Fév", novaworld: 15000, dlstyle: 9200, dltravel: 18000, dlbookmaker: 6800 },
    { month: "Mar", novaworld: 18000, dlstyle: 11000, dltravel: 22000, dlbookmaker: 8200 },
    { month: "Avr", novaworld: 22000, dlstyle: 13500, dltravel: 25000, dlbookmaker: 9500 },
    { month: "Mai", novaworld: 25000, dlstyle: 15800, dltravel: 28000, dlbookmaker: 11200 },
    { month: "Juin", novaworld: 28000, dlstyle: 18200, dltravel: 32000, dlbookmaker: 13800 },
  ]

  const userGrowthData = [
    { date: "1 Jun", users: 2400 },
    { date: "8 Jun", users: 2800 },
    { date: "15 Jun", users: 3200 },
    { date: "22 Jun", users: 3800 },
    { date: "29 Jun", users: 4200 },
    { date: "6 Jul", users: 4800 },
  ]

  const serviceDistribution = [
    { name: "NovaWorld", value: 35, color: "#3B82F6" },
    { name: "DL Style", value: 28, color: "#8B5CF6" },
    { name: "DL Travel", value: 25, color: "#06B6D4" },
    { name: "DL Bookmaker", value: 12, color: "#10B981" },
  ]

  const kpiData = [
    {
      title: "Revenus Totaux",
      value: "€142.5k",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Utilisateurs Actifs",
      value: "4,847",
      change: "+8.2%",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Taux de Conversion",
      value: "3.24%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Engagement",
      value: "94.2%",
      change: "+2.1%",
      icon: Activity,
      color: "from-orange-500 to-red-600",
    },
  ]

  const topPerformers = [
    { service: "DL Travel", metric: "Réservations", value: "1,247", growth: "+18%" },
    { service: "NovaWorld", metric: "Connexions", value: "3,842", growth: "+15%" },
    { service: "DL Style", metric: "Commandes", value: "892", growth: "+12%" },
    { service: "DL Bookmaker", metric: "Paris", value: "456", growth: "+25%" },
  ]

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
                  Analytics NovaCore
                </h1>
                <p className="text-sm text-gray-600">Analyse des performances et métriques</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedPeriod === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("7d")}
                >
                  7j
                </Button>
                <Button
                  variant={selectedPeriod === "30d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("30d")}
                >
                  30j
                </Button>
                <Button
                  variant={selectedPeriod === "90d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("90d")}
                >
                  90j
                </Button>
              </div>
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-xl flex items-center justify-center`}
                  >
                    <kpi.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">{kpi.change}</Badge>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Revenus par Service</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="novaworld"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="dlstyle"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="dltravel"
                      stackId="1"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="dlbookmaker"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Répartition des Services</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {serviceDistribution.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: service.color }}></div>
                      <span className="text-sm text-gray-600">{service.name}</span>
                    </div>
                    <span className="text-sm font-medium">{service.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Growth & Top Performers */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Croissance des Utilisateurs</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#3B82F6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Meilleures Performances</h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        {performer.service === "NovaWorld" && <Globe className="h-5 w-5 text-white" />}
                        {performer.service === "DL Style" && <ShoppingBag className="h-5 w-5 text-white" />}
                        {performer.service === "DL Travel" && <Plane className="h-5 w-5 text-white" />}
                        {performer.service === "DL Bookmaker" && <Trophy className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{performer.service}</div>
                        <div className="text-sm text-gray-600">{performer.metric}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{performer.value}</div>
                      <Badge className="bg-green-100 text-green-700 text-xs">{performer.growth}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Activité Récente</h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { time: "Il y a 5 min", event: "Nouvelle inscription sur NovaWorld", user: "Marie Dubois" },
                { time: "Il y a 12 min", event: "Commande validée sur DL Style", user: "Jean Martin", amount: "€245" },
                {
                  time: "Il y a 18 min",
                  event: "Réservation vol Paris-Londres",
                  user: "Sophie Laurent",
                  amount: "€380",
                },
                {
                  time: "Il y a 25 min",
                  event: "Pari gagnant sur DL Bookmaker",
                  user: "Thomas Durand",
                  amount: "€150",
                },
                { time: "Il y a 32 min", event: "Nouveau partenariat NovaWorld", user: "Entreprise ABC" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-800">{activity.event}</div>
                      <div className="text-sm text-gray-600">{activity.user}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && <div className="font-medium text-green-600">{activity.amount}</div>}
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
