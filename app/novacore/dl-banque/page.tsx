"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Ban,
  CreditCard,
  Wallet,
  BarChart3,
  Shield,
  Activity,
  ArrowLeft,
  Users,
  Building2,
  PiggyBank,
  LineChart,
} from "lucide-react"
import Link from "next/link"

export default function DLBanquePage() {
  const [stats, setStats] = useState({
    activeUsers: 1200,
    monthlyRevenue: 850000,
    transactions: 15000,
    accounts: 5000,
    satisfactionRate: 97,
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
        transactions: prev.transactions + Math.floor(Math.random() * 100) - 50,
        accounts: prev.accounts + Math.floor(Math.random() * 20) - 10,
        satisfactionRate: Math.min(100, Math.max(95, prev.satisfactionRate + Math.random() * 2 - 1)),
        securityAlerts: Math.floor(Math.random() * 5),
        fraudPrevented: prev.fraudPrevented + Math.floor(Math.random() * 3),
        transactionsMonitored: prev.transactionsMonitored + Math.floor(Math.random() * 100),
        activeSessions: Math.floor(Math.random() * 1000) + 500,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <Link href="/novacore" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au Hub
        </Link>
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          DL Banque
        </h1>
        <p className="text-gray-600 text-lg">Services bancaires innovants</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
              <div className="p-2 bg-indigo-100 rounded-full">
                {key === 'activeUsers' && <Users className="h-4 w-4 text-indigo-600" />}
                {key === 'monthlyRevenue' && <CreditCard className="h-4 w-4 text-green-600" />}
                {key === 'transactions' && <Wallet className="h-4 w-4 text-blue-600" />}
                {key === 'accounts' && <PiggyBank className="h-4 w-4 text-yellow-600" />}
                {key === 'satisfactionRate' && <Activity className="h-4 w-4 text-purple-600" />}
                {key === 'securityAlerts' && <Shield className="h-4 w-4 text-red-600" />}
                {key === 'fraudPrevented' && <Shield className="h-4 w-4 text-green-600" />}
                {key === 'transactionsMonitored' && <Activity className="h-4 w-4 text-blue-600" />}
                {key === 'activeSessions' && <Users className="h-4 w-4 text-purple-600" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500">
                  +{Math.floor(Math.random() * 10)}% ce mois
                </Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fonctionnalités */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Services Bancaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Comptes et Cartes</h3>
                  <p className="text-sm text-gray-600">Gestion des comptes et cartes bancaires</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Transactions</h3>
                  <p className="text-sm text-gray-600">Suivi des transactions en temps réel</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Épargne</h3>
                  <p className="text-sm text-gray-600">Solutions d'épargne et investissement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <LineChart className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Investissements</h3>
                  <p className="text-sm text-gray-600">Gestion de portefeuille et conseils</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Sécurité et Surveillance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Surveillance IA</h3>
                  <p className="text-sm text-gray-600">Détection en temps réel des fraudes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Transactions Sécurisées</h3>
                  <p className="text-sm text-gray-600">Toutes les transactions sont surveillées</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Authentification Multi-facteurs</h3>
                  <p className="text-sm text-gray-600">Sécurité renforcée pour les utilisateurs</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Rapports de Sécurité</h3>
                  <p className="text-sm text-gray-600">Analyses détaillées des incidents</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
          Accéder à DL Banque
        </Button>
        <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
          Documentation
        </Button>
      </div>
    </div>
  );
} 