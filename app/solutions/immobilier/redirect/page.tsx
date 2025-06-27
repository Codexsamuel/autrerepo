"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, ExternalLink } from "lucide-react"
import Link from "next/link"



export default function RedirectPage() {
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(true)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsRedirecting(false)
    }
  }, [countdown])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Redirection en cours</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Vous allez être redirigé vers une page externe.
          </p>
        </div>

        {/* Carte de redirection */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <ExternalLink className="w-12 h-12 text-primary" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Vous allez être redirigé vers un site externe dans{" "}
              <span className="font-bold">{countdown}</span> secondes.
            </p>
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => window.location.href = "https://example.com"}
              >
                Continuer maintenant
              </Button>
              <Link href="/solutions/immobilier">
                <Button variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Avertissement */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Vous quittez notre site. Nous ne sommes pas responsables du contenu des sites externes.
          </p>
        </div>
      </div>
    </div>
  )
} 