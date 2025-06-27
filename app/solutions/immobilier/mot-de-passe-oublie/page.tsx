"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Mail } from "lucide-react"
import Link from "next/link"



export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Entrez votre email pour réinitialiser votre mot de passe
          </p>
        </div>

        {/* Formulaire */}
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button className="w-full">
                Envoyer le lien de réinitialisation
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Un email contenant un lien de réinitialisation vous sera envoyé.
                Vérifiez votre boîte de réception et vos spams.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Lien de connexion */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/solutions/immobilier/connexion"
            className="text-primary hover:underline"
          >
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  )
} 