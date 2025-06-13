"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Confirmation requise</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Veuillez confirmer votre action.
          </p>
        </div>

        {/* Carte de confirmation */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-yellow-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Êtes-vous sûr de vouloir effectuer cette action ? Cette opération est irréversible.
            </p>
            <div className="space-y-4">
              <Button className="w-full">Confirmer</Button>
              <Link href="/solutions/immobilier">
                <Button variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Si vous avez des questions, n'hésitez pas à nous contacter :
            <br />
            +33 1 23 45 67 89
          </p>
        </div>
      </div>
    </div>
  )
} 