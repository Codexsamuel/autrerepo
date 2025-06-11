"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowRight, Shield, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Email envoyé !</h3>
            <p className="text-gray-600 mb-6">
              Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. Vérifiez votre boîte de
              réception et suivez les instructions.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/novacore/auth/signin">Retour à la connexion</a>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsEmailSent(false)}>
                Renvoyer l'email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800 mb-6" asChild>
                  <a href="/novacore/auth/signin">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la connexion
                  </a>
                </Button>

                <div className="flex items-center justify-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                    <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-8 w-8 object-contain" />
                  </div>
                </div>

                <Badge className="mb-4 bg-orange-100 text-orange-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Récupération Sécurisée
                </Badge>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Mot de passe oublié ?</h3>
                <p className="text-gray-600">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Envoyer le lien de réinitialisation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Vous vous souvenez de votre mot de passe ?{" "}
                  <a href="/novacore/auth/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Se connecter
                  </a>
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 text-center">
                  💡 Astuce : Vérifiez aussi votre dossier spam si vous ne recevez pas l'email dans les 5 minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
