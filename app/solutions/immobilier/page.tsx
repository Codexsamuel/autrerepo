"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  Calendar,
  Euro,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Image as ImageIcon
} from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

interface RecentActivity {
  id: number
  type: "visit" | "sale" | "client" | "property"
  title: string
  description: string
  date: string
  icon: React.ReactNode
}

interface TopAgent {
  id: number
  name: string
  avatar: string
  role: string
  sales: number
  revenue: number
  rating: number
}

const stats: StatCard[] = [
  {
    title: "Biens en vente",
    value: "45",
    change: 12,
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Clients actifs",
    value: "128",
    change: 8,
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Visites du mois",
    value: "86",
    change: -5,
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: "Chiffre d'affaires",
    value: "2.4M €",
    change: 15,
    icon: <Euro className="w-6 h-6" />
  }
]

const recentActivities: RecentActivity[] = [
  {
    id: 1,
    type: "visit",
    title: "Nouvelle visite planifiée",
    description: "Appartement T3 centre-ville - Jean Dupont",
    date: "Il y a 2 heures",
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: 2,
    type: "sale",
    title: "Vente conclue",
    description: "Maison familiale avec jardin - 450 000 €",
    date: "Il y a 5 heures",
    icon: <Euro className="w-5 h-5" />
  },
  {
    id: 3,
    type: "client",
    title: "Nouveau client",
    description: "Sophie Bernard - Acheteur",
    date: "Il y a 1 jour",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 4,
    type: "property",
    title: "Nouveau bien ajouté",
    description: "Local commercial centre-ville - 2500 €/mois",
    date: "Il y a 2 jours",
    icon: <Building2 className="w-5 h-5" />
  }
]

const topAgents: TopAgent[] = [
  {
    id: 1,
    name: "Marie Martin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    role: "Senior",
    sales: 8,
    revenue: 2800000,
    rating: 4.8
  },
  {
    id: 2,
    name: "Thomas Petit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    role: "Agent",
    sales: 4,
    revenue: 1200000,
    rating: 4.5
  },
  {
    id: 3,
    name: "Sophie Bernard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    role: "Manager",
    sales: 12,
    revenue: 4200000,
    rating: 4.9
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Vue d'ensemble de votre activité immobilière
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    {stat.change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.change > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      vs mois dernier
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activités récentes et meilleurs agents */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border"
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meilleurs agents */}
        <Card>
          <CardHeader>
            <CardTitle>Meilleurs agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center gap-4 p-4 rounded-lg border"
                >
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {agent.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {agent.rating}/5
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        <span className="text-sm">
                          {agent.sales} ventes
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">
                          {agent.revenue.toLocaleString("fr-FR")} €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Building2 className="w-6 h-6" />
                <span>Ajouter un bien</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Users className="w-6 h-6" />
                <span>Ajouter un client</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>Planifier une visite</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Nouveau message</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 