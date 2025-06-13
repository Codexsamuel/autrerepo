"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Chargement...</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Veuillez patienter pendant le chargement de la page.
          </p>
        </div>

        {/* Carte de chargement */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 