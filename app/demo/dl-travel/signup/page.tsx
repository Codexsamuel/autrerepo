"use client"

import { useState } from "react"
// Removed motion import
import { 
  Plane,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/demo/dl-travel" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à DL Travel
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Déjà un compte ?</span>
              <Link href="/demo/dl-travel/login">
                <Button variant="ghost" size="sm">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="space-y-4">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Rejoignez DL Travel
                </CardTitle>
                <p className="text-gray-500 mt-2">
                  Créez votre compte pour accéder à nos services premium
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="personal">Particulier</TabsTrigger>
                    <TabsTrigger value="business">Entreprise</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Prénom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            type="text"
                            placeholder="John"
                            className="pl-10 bg-white/50 border-gray-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            type="text"
                            placeholder="Doe"
                            className="pl-10 bg-white/50 border-gray-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                        Créer mon compte
                      </Button>
                      <p className="text-center text-sm text-gray-500">
                        En créant votre compte, vous acceptez nos{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et notre{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="business" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Votre entreprise"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email professionnel</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="contact@entreprise.com"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-white/50 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                        Créer un compte entreprise
                      </Button>
                      <p className="text-center text-sm text-gray-500">
                        Besoin d'une solution sur mesure ?{" "}
                        <Link href="/contact" className="text-blue-600 hover:underline">
                          Contactez-nous
                        </Link>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Pourquoi choisir DL Travel ?
              </h2>
              <p className="text-gray-600 text-lg">
                Rejoignez la première plateforme panafricaine de gestion intelligente des déplacements
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Réservations intelligentes</h3>
                  <p className="text-gray-600">
                    Accédez aux meilleurs tarifs grâce à notre IA qui analyse les tendances en temps réel
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Service premium</h3>
                  <p className="text-gray-600">
                    Bénéficiez d'un accompagnement personnalisé et d'un support 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sécurité garantie</h3>
                  <p className="text-gray-600">
                    Vos données sont protégées par notre système de sécurité de pointe
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-xl mb-2">Offre spéciale lancement</h3>
              <p className="mb-4">
                Profitez de -20% sur votre première réservation avec le code WELCOME20
              </p>
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 