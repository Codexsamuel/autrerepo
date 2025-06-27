"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Wrench } from "lucide-react"
import Link from "next/link"



export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Site en maintenance</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Nous effectuons actuellement des travaux de maintenance.
          </p>
        </div>

        {/* Carte de maintenance */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <Wrench className="w-12 h-12 text-primary" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Notre site est temporairement indisponible pour des travaux de maintenance. Nous serons de retour très prochainement.
            </p>
            <div className="space-y-4">
              <Link href="/solutions/immobilier/contact">
                <Button className="w-full">Nous contacter</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Actualiser la page
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Durée estimée de la maintenance : 2 heures</p>
          <p className="mt-2">
            Pour toute urgence, veuillez nous contacter par téléphone :
            <br />
            +33 1 23 45 67 89
          </p>
        </div>
      </div>
    </div>
  )
} 