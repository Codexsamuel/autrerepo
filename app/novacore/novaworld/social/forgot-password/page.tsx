"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password reset logic
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
            alt="NovaWorld Logo"
            width={200}
            height={50}
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Réinitialisation du mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez votre email pour recevoir les instructions de réinitialisation
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi..." : "Envoyer les instructions"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3 mx-auto w-12 h-12 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email envoyé
                </h3>
                <p className="text-sm text-gray-600">
                  Les instructions de réinitialisation ont été envoyées à votre adresse email.
                  Veuillez vérifier votre boîte de réception.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/novacore/novaworld/social/login"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
} 