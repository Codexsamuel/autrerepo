"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Hospital, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SelectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choisissez votre type d'établissement</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sélectionnez le type d'établissement que vous souhaitez gérer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Immobilier */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Gestion Immobilière</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>Gérez tous vos biens immobiliers :</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Appartements (meublés/non meublés)</li>
                    <li>• Maisons et villas</li>
                    <li>• Bureaux et locaux commerciaux</li>
                    <li>• Chambres et studios</li>
                    <li>• Véhicules et parkings</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Link href="/solutions/immobilier/tableau-de-bord">
                    <Button className="w-full">
                      Accéder à la gestion immobilière
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hospitalier */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Hospital className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center">Gestion Hospitalière</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>Gérez votre établissement de santé :</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Établissements publics</li>
                    <li>• Cliniques privées</li>
                    <li>• Centres de soins</li>
                    <li>• Services spécialisés</li>
                    <li>• Suivi des patients</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Link href="/solutions/hospitalier/tableau-de-bord">
                    <Button className="w-full">
                      Accéder à la gestion hospitalière
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fonctionnalités communes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Fonctionnalités communes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CRM Avancé</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Gestion des clients/patients</li>
                  <li>• Historique des interactions</li>
                  <li>• Suivi des dossiers</li>
                  <li>• Communication intégrée</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gestion Financière</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Facturation automatique</li>
                  <li>• Suivi des paiements</li>
                  <li>• Gestion des dettes</li>
                  <li>• Rapports financiers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Gestion des contrats</li>
                  <li>• Documents légaux</li>
                  <li>• Historique des transactions</li>
                  <li>• Archivage sécurisé</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 