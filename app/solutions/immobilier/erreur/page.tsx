"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, XCircle } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Désolé, une erreur s'est produite lors du traitement de votre demande.
          </p>
        </div>

        {/* Carte d'erreur */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ou nous contacter si le problème persiste.
            </p>
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
              <Link href="/solutions/immobilier">
                <Button variant="outline" className="w-full">
                  Retour à l'accueil
                </Button>
              </Link>
              <Link href="/solutions/immobilier/contact">
                <Button variant="outline" className="w-full">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Si le problème persiste, veuillez nous contacter par téléphone :
            <br />
            +33 1 23 45 67 89
          </p>
        </div>
      </div>
    </div>
  )
} 