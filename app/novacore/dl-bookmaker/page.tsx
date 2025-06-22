"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Removed motion import
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  Clock,
  Shield,
  Zap
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Volume de Paris",
    value: "2.5M €",
    change: "+12.5%",
    icon: <BarChart className="w-6 h-6 text-blue-500" />,
    trend: "up"
  },
  {
    title: "Utilisateurs Actifs",
    value: "15,234",
    change: "+8.3%",
    icon: <Users className="w-6 h-6 text-green-500" />,
    trend: "up"
  },
  {
    title: "Revenus",
    value: "450K €",
    change: "+15.2%",
    icon: <DollarSign className="w-6 h-6 text-purple-500" />,
    trend: "up"
  },
  {
    title: "Performance",
    value: "98.5%",
    change: "+2.1%",
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    trend: "up"
  }
]

const features = [
  {
    title: "Automatisation Avancée",
    description: "Workflows intelligents pour une gestion optimale des paris",
    icon: <Zap className="w-8 h-8 text-blue-500" />
  },
  {
    title: "Temps Réel",
    description: "Suivi instantané des cotes et des résultats",
    icon: <Clock className="w-8 h-8 text-green-500" />
  },
  {
    title: "Sécurité Maximale",
    description: "Protection avancée des transactions et des données",
    icon: <Shield className="w-8 h-8 text-purple-500" />
  }
]

export default function DLBookmakerPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            DL Bookmaker
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Solution complète de gestion de paris sportifs avec automatisation avancée
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-fade-in"
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {stat.icon}
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      {stat.change}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-white">{stat.value}</h3>
                  <p className="text-gray-300">{stat.title}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in"
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="p-3 bg-gray-700/50 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
          >
            Démarrer la Démo
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 