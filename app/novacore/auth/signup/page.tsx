"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Check, ArrowLeft } from "lucide-react"



export default function NovaCorSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'inscription
    setTimeout(() => {
      setIsLoading(false)
      // Redirection vers la page de connexion
      window.location.href = "/novacore/auth/signin"
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const features = ["Accès à tous les services DL Solutions",
    "Dashboard personnalisé avec analytics",
    "Support client prioritaire 24/7",
    "Intégration IA avancée",
    "Sécurité renforcée avec 2FA",
    "Mises à jour automatiques",]
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="text-center lg:text-left">
            <Button variant="ghost" className="text-white/80 hover:text-white mb-8" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au site
              </a>
            </Button>

            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-xl mr-4">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-12 w-12 object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">NovaCore</h1>
                <p className="text-indigo-200">Rejoignez l'écosystème</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Créez votre compte
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                NovaCore
              </span>
            </h2>

            <p className="text-xl text-indigo-200 mb-8 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui font confiance à DL Solutions pour leur transformation digitale.
            </p>

            {/* Features List */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-green-100 text-green-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Inscription Gratuite
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte</h3>
                  <p className="text-gray-600">Commencez votre transformation digitale</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Jean"
                          className="pl-9 h-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Dupont"
                          className="pl-9 h-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="jean.dupont@email.com"
                        className="pl-9 h-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="pl-9 h-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 pr-9 h-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 pr-9 h-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                      required
                    />
                    <label className="ml-2 text-xs text-gray-600">
                      J'accepte les{" "}
                      <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                        politique de confidentialité
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.acceptTerms}
                    className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Création en cours...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Créer mon compte
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )</Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    Déjà un compte ?{" "}
                    <a href="/novacore/auth/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Se connecter
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
