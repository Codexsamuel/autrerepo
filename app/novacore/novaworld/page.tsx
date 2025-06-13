"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Briefcase,
  MessageSquare,
  Building2,
  Globe,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export default function NovaWorldPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
              alt="NovaWorld Logo"
              width={200}
              height={50}
              className="mx-auto h-12 w-auto"
            />
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Votre Réseau Social Professionnel
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Connectez-vous avec des professionnels, développez votre réseau et trouvez des opportunités commerciales.
            </p>
            <div className="mt-8">
              <Link href="/novacore/novaworld/social">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Rejoindre NovaWorld
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Réseau</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Connectez-vous avec des professionnels de votre secteur et développez votre réseau.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Opportunités</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Découvrez des opportunités professionnelles et commerciales adaptées à votre profil.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Communauté</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Rejoignez des groupes de discussion et partagez vos expériences avec la communauté.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Features */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Sociales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6">
                <Building2 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Profil Professionnel</h3>
                <p className="text-gray-600">
                  Créez un profil détaillé mettant en valeur votre expertise et vos réalisations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Réseau International</h3>
                <p className="text-gray-600">
                  Connectez-vous avec des professionnels du monde entier.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sécurité Avancée</h3>
                <p className="text-gray-600">
                  Vos données sont protégées avec les dernières technologies de sécurité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Sparkles className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Recommandations IA</h3>
                <p className="text-gray-600">
                  Recevez des suggestions personnalisées basées sur votre profil.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Pour Qui ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Professionnels</h3>
              <p className="text-gray-600">
                Développez votre réseau professionnel et trouvez de nouvelles opportunités.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Entreprises</h3>
              <p className="text-gray-600">
                Recrutez des talents et développez votre présence en ligne.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Entrepreneurs</h3>
              <p className="text-gray-600">
                Trouvez des partenaires et des investisseurs pour vos projets.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Rejoindre NovaWorld ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Commencez à développer votre réseau professionnel dès aujourd'hui.
          </p>
          <Link href="/novacore/novaworld/social">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Rejoindre Maintenant
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 