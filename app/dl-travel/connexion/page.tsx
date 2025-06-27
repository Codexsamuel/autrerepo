"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Plane, MapPin, Star, Facebook, Mail, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"



export default function ConnexionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    // Logique de connexion
    console.log("Login:", loginData)
  }

  const handleSignup = (e: FormEvent) => {
    e.preventDefault()
    // Logique d'inscription
    console.log("Signup:", signupData)
  }

  const handleFacebookLogin = () => {
    // Logique de connexion Facebook
    console.log("Login with Facebook")
  }

  const handleGoogleLogin = () => {
    // Logique de connexion Google
    console.log("Login with Google")
  }

  const handleFacebookSignup = () => {
    // Logique d'inscription Facebook
    console.log("Signup with Facebook")
  }

  const handleGoogleSignup = () => {
    // Logique d'inscription Google
    console.log("Signup with Google")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/dl-travel"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plane className="w-6 h-6" />
            <span className="font-bold text-xl">DL Travel</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Côté gauche - Informations */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Rejoignez DL Travel</h1>
              <p className="text-xl text-gray-600 mb-6">
                Découvrez le monde avec nos offres exclusives et bénéficiez d'avantages membres
              </p>
            </div>

            {/* Avantages */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Offres exclusives</h3>
                  <p className="text-gray-600">Accédez à des tarifs préférentiels réservés aux membres</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gestion simplifiée</h3>
                  <p className="text-gray-600">Gérez tous vos voyages depuis votre espace personnel</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Support prioritaire</h3>
                  <p className="text-gray-600">Assistance dédiée 24h/24 pour tous vos voyages</p>
                </div>
              </div>
            </div>

            {/* Témoignage */}
            <Card className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Client satisfait"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-blue-100">Cliente depuis 2 ans</div>
                  </div>
                </div>
                <p className="text-blue-100">
                  "DL Travel a transformé ma façon de voyager. Les offres sont exceptionnelles et le service client est
                  remarquable !"
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Côté droit - Formulaires */}
          <div className="w-full max-w-md mx-auto">
            <Card className="overflow-hidden">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>

                {/* Formulaire de connexion */}
                <TabsContent value="login">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Bon retour !</h2>
                      <p className="text-gray-600">Connectez-vous à votre compte</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                        </label>
                        <Link
                          href="/dl-travel/mot-de-passe-oublie"
                          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Mot de passe oublié ?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 transform hover:scale-105 transition-all duration-200"
                      >
                        Se connecter
                      </Button>
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2" onClick={handleFacebookLogin}>
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={handleGoogleLogin}>
                          <Mail className="w-4 h-4" />
                          Google
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                {/* Formulaire d'inscription */}
                <TabsContent value="signup">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
                      <p className="text-gray-600">Rejoignez la communauté DL Travel</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                          <input
                            type="text"
                            required
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Prénom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                          <input
                            type="text"
                            required
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          required
                          value={signupData.phone}
                          onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmer le mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          required
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          J'accepte les{" "}
                          <Link href="#" className="text-blue-600 hover:text-blue-700">
                            conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="#" className="text-blue-600 hover:text-blue-700">
                            politique de confidentialité
                          </Link>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 transform hover:scale-105 transition-all duration-200"
                      >
                        Créer mon compte
                      </Button>
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2" onClick={handleFacebookSignup}>
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={handleGoogleSignup}>
                          <Mail className="w-4 h-4" />
                          Google
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Contact support */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">Besoin d'aide ?</p>
              <div className="flex justify-center gap-4">
                <Link href="tel:+33123456789" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" />
                  <span>01 23 45 67 89</span>
                </Link>
                <Link
                  href="mailto:support@dltravel.com"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="w-4 h-4" />
                  <span>Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
