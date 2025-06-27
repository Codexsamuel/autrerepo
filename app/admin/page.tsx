"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, Target, Zap } from "lucide-react"
import { SmartDocumentGenerator } from "@/components/documents/smart-document-generator"
import { HRDashboard } from "@/components/hr/hr-dashboard"
import { SearchBar } from "@/components/search-bar"
import TradingAdvisor from "@/components/trading/TradingAdvisor"
import DavyTradingChat from "@/components/trading/DavyTradingChat"


export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec barre de recherche */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration DL Solutions</h1>
              <p className="text-gray-600">Intranet et outils de gestion</p>
            </div>
            <div className="w-96">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dashboard RH */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Dashboard RH Intelligent
                </h2>
                <HRDashboard />
              </div>
            </div>

            {/* Générateur de Documents */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Générateur de Documents
                </h2>
                <SmartDocumentGenerator />
              </div>
            </div>

            {/* Module Trading DAVY */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  DAVY Trading Advisor
                </h2>
                <TradingAdvisor />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques rapides */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistiques Rapides
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Employés Actifs</span>
                  <span className="font-semibold text-green-600">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents Générés</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Alertes en Cours</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance Moyenne</span>
                  <span className="font-semibold text-purple-600">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trades Recommandés</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rendement Trading</span>
                  <span className="font-semibold text-blue-600">+12.5%</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions Rapides
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📄</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Nouveau Contrat</p>
                      <p className="text-xs text-gray-600">Créer un contrat</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Nouvel Employé</p>
                      <p className="text-xs text-gray-600">Ajouter un collaborateur</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Fiche de Caisse</p>
                      <p className="text-xs text-gray-600">Sortie de caisse</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm">📊</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Rapport Journalier</p>
                      <p className="text-xs text-gray-600">Créer un rapport</p>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 text-sm">📈</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Trading IA</p>
                      <p className="text-xs text-gray-600">Conseils DAVY</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* IA Assistant */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assistant IA DAVY
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Utilisez DAVY pour automatiser vos tâches RH et administratives.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Génération de documents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Analyse des performances</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Alertes intelligentes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Assistant vocal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Conseiller trading IA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Analyse de marché</span>
                </div>
              </div>
            </div>

            {/* Chat Trading DAVY */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chat Trading DAVY
                </h3>
                <div className="h-96">
                  <DavyTradingChat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 