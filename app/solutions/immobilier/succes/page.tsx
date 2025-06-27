"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, CheckCircle2 } from "lucide-react"
import Link from "next/link"



export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Opération réussie</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Votre demande a été traitée avec succès.
          </p>
        </div>

        {/* Carte de succès */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Votre demande a été enregistrée avec succès. Nous vous contacterons dans les plus brefs délais.
            </p>
            <div className="space-y-4">
              <Link href="/solutions/immobilier">
                <Button className="w-full">Retour à l'accueil</Button>
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
            Un email de confirmation a été envoyé à votre adresse email.
            <br />
            Consultez votre boîte de réception pour plus de détails.
          </p>
        </div>
      </div>
    </div>
  )
} 