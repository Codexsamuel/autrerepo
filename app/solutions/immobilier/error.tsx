"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"



export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
            Désolé, une erreur inattendue s'est produite.
          </p>
        </div>

        {/* Carte d'erreur */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-6xl font-bold text-primary mb-4">500</div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Une erreur interne s'est produite. Notre équipe technique a été notifiée et travaille à résoudre le problème.
            </p>
            <div className="space-y-4">
              <Button onClick={() => reset()} className="w-full">
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
      </div>
    </div>
  )
} 