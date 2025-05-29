"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  ShoppingBag,
  Plane,
  Trophy,
  ArrowLeft,
} from "lucide-react"

export default function NovaCorSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de connexion
    setTimeout(() => {
      setIsLoading(false)
      // Redirection vers NovaCore après connexion
      window.location.href = "/novacore/dashboard"
    }, 2000)
  }

  const services = [
    { name: "NovaWorld", icon: Globe, color: "from-blue-500 to-indigo-600" },
    { name: "DL Style", icon: ShoppingBag, color: "from-purple-500 to-pink-600" },
    { name: "DL Travel", icon: Plane, color: "from-cyan-500 to-blue-600" },
    { name: "DL Bookmaker", icon: Trophy, color: "from-green-500 to-emerald-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
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
                <p className="text-indigo-200">Hub DL Solutions</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Accédez à votre
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                écosystème digital
              </span>
            </h2>

            <p className="text-xl text-indigo-200 mb-8 leading-relaxed">
              Connectez-vous pour accéder à tous vos services DL Solutions : CRM, e-commerce, voyages, paris sportifs et
              bien plus.
            </p>

            {/* Services Preview */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              {services.map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white font-medium text-sm">{service.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-indigo-100 text-indigo-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Connexion Sécurisée
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Connexion NovaCore</h3>
                  <p className="text-gray-600">Accédez à votre tableau de bord</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
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

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <a href="/novacore/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Connexion en cours...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Se connecter
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Pas encore de compte ?</p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/novacore/auth/signup">Créer un compte NovaCore</a>
                    </Button>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 text-center mb-2">Comptes de démonstration :</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Admin: admin@dlsolutions.com / admin123</div>
                    <div>Client: client@dlsolutions.com / client123</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-t border-white/10 p-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm">Sécurité SSL</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              <span className="text-sm">Accès instantané</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span className="text-sm">4 services intégrés</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
