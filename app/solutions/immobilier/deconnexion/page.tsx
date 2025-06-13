"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Simuler la déconnexion
    const timer = setTimeout(() => {
      router.push("/solutions/immobilier")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Déconnexion en cours</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Vous allez être déconnecté dans quelques secondes.
          </p>
        </div>

        {/* Carte de déconnexion */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <LogOut className="w-12 h-12 text-primary" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Merci d'avoir utilisé notre plateforme. Vous allez être redirigé vers la page d'accueil.
            </p>
            <div className="space-y-4">
              <Link href="/solutions/immobilier">
                <Button className="w-full">Retour à l'accueil</Button>
              </Link>
              <Link href="/solutions/immobilier/connexion">
                <Button variant="outline" className="w-full">
                  Se reconnecter
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Pour toute question, n'hésitez pas à nous contacter :
            <br />
            +33 1 23 45 67 89
          </p>
        </div>
      </div>
    </div>
  )
} 