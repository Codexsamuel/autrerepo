"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Removed motion import
import { 
  Plane, 
  CreditCard,
  Calendar,
  BarChart3,
  Shield,
  Activity,
  ArrowLeft,
  Users,
  ArrowUpRight,
  Building,
  Globe,
  Clock,
  Star,
  Settings,
  Bell,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DLTravelPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    activeUsers: 850,
    monthlyRevenue: 120000,
    bookings: 4500,
    destinations: 150,
    satisfactionRate: 96,
    securityAlerts: 0,
    fraudPrevented: 0,
    transactionsMonitored: 0,
    activeSessions: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 1000) - 500,
        bookings: prev.bookings + Math.floor(Math.random() * 50) - 25,
        satisfactionRate: Math.min(100, Math.max(95, prev.satisfactionRate + Math.random() * 2 - 1)),
        securityAlerts: Math.floor(Math.random() * 5),
        fraudPrevented: prev.fraudPrevented + Math.floor(Math.random() * 3),
        transactionsMonitored: prev.transactionsMonitored + Math.floor(Math.random() * 100),
        activeSessions: Math.floor(Math.random() * 1000) + 500,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDemoClick = () => {
    router.push('/demo/dl-travel')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/novacore" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au Hub
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                DL Travel
              </h1>
              <p className="text-gray-300 text-lg">Plateforme complète de gestion de voyages</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des vols, hôtels, destinations..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Filter className="h-5 w-5 text-gray-400" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(stats).map(([key, value]) => (
                <div>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-gray-700/50 rounded-lg">
                          {key === 'activeUsers' && <Users className="h-5 w-5 text-blue-400" />}
                          {key === 'monthlyRevenue' && <CreditCard className="h-5 w-5 text-green-400" />}
                          {key === 'bookings' && <Calendar className="h-5 w-5 text-purple-400" />}
                          {key === 'destinations' && <Globe className="h-5 w-5 text-yellow-400" />}
                          {key === 'satisfactionRate' && <Star className="h-5 w-5 text-orange-400" />}
                          {key === 'securityAlerts' && <Shield className="h-5 w-5 text-red-400" />}
                          {key === 'fraudPrevented' && <Shield className="h-5 w-5 text-green-400" />}
                          {key === 'transactionsMonitored' && <Activity className="h-5 w-5 text-blue-400" />}
                          {key === 'activeSessions' && <Users className="h-5 w-5 text-purple-400" />}
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          +{Math.floor(Math.random() * 10)}%
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-1 text-white">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </h3>
                      <p className="text-gray-300">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            <div>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Fonctionnalités Principales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Plane className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">API Vols</h3>
                      <p className="text-sm text-gray-300">Accès aux données de vols en temps réel</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Building className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Réservations Hôtels</h3>
                      <p className="text-sm text-gray-300">Système de réservation intelligent</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Paiements Sécurisés</h3>
                      <p className="text-sm text-gray-300">Gestion des transactions B2B/B2C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Sécurité et Surveillance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Shield className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Surveillance IA</h3>
                      <p className="text-sm text-gray-300">Détection en temps réel des fraudes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Transactions Sécurisées</h3>
                      <p className="text-sm text-gray-300">Toutes les transactions sont surveillées</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Authentification Multi-facteurs</h3>
                      <p className="text-sm text-gray-300">Sécurité renforcée pour les utilisateurs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleDemoClick}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
              >
                Démarrer la Démo
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 