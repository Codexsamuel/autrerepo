import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Users, DollarSign, Package, AlertTriangle, TrendingUp, Eye, Shield, BarChart3 } from "lucide-react"

// Données mock pour la démonstration
const mockStats = {
  totalClients: 1247,
  monthlyRevenue: 2850000,
  activeAlerts: 7,
  stockItems: 342,
  trends: {
    clients: { value: 12, isPositive: true },
    revenue: { value: 8.5, isPositive: true },
    alerts: { value: -15, isPositive: true },
    stock: { value: 3, isPositive: true },
  },
}

const recentAlerts = [
  {
    id: "1",
    type: "Paiement suspect",
    severity: "high" as const,
    message: "Transaction de 500,000 FCFA détectée à 3h du matin",
    time: "2 min",
  },
  {
    id: "2",
    type: "Stock faible",
    severity: "medium" as const,
    message: 'Produit "Serviettes Premium" en rupture de stock',
    time: "15 min",
  },
  {
    id: "3",
    type: "Connexion inhabituelle",
    severity: "low" as const,
    message: "Connexion depuis une nouvelle localisation",
    time: "1h",
  },
]

function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Clients"
        value={mockStats.totalClients.toLocaleString()}
        description="Clients actifs dans le système"
        icon={Users}
        trend={mockStats.trends.clients}
      />
      <StatsCard
        title="Revenus Mensuels"
        value={`${(mockStats.monthlyRevenue / 1000000).toFixed(1)}M FCFA`}
        description="Revenus du mois en cours"
        icon={DollarSign}
        trend={mockStats.trends.revenue}
      />
      <StatsCard
        title="Alertes Actives"
        value={mockStats.activeAlerts}
        description="Alertes nécessitant une attention"
        icon={AlertTriangle}
        trend={mockStats.trends.alerts}
      />
      <StatsCard
        title="Articles en Stock"
        value={mockStats.stockItems}
        description="Produits disponibles"
        icon={Package}
        trend={mockStats.trends.stock}
      />
    </div>
  )
}

function RecentAlerts() {
  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-blue-600 bg-blue-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Alertes Récentes
        </CardTitle>
        <CardDescription>Surveillance IA en temps réel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                {alert.type}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">Il y a {alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { name: "Nouveau Client", href: "/novacore/clients/new", icon: Users, color: "bg-blue-500" },
    { name: "Créer Facture", href: "/novacore/finances/invoices/new", icon: DollarSign, color: "bg-green-500" },
    { name: "Rapport Mensuel", href: "/novacore/reports/monthly", icon: BarChart3, color: "bg-purple-500" },
    { name: "Surveillance", href: "/novacore/surveillance", icon: Shield, color: "bg-red-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
        <CardDescription>Accès direct aux fonctionnalités principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard NovaCore</h1>
        <p className="text-gray-600">Vue d'ensemble de votre CRM d'entreprise</p>
      </div>

      {/* Stats */}
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardStats />
      </Suspense>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<LoadingSpinner />}>
          <RecentAlerts />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <QuickActions />
        </Suspense>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Performance Mensuelle
          </CardTitle>
          <CardDescription>Évolution des métriques clés sur les 6 derniers mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Graphique de performance</p>
              <p className="text-sm">Intégration Chart.js à venir</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
