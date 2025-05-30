import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Download, Star, Shield, Zap, Users, Apple, PlayCircle, QrCode, ArrowRight } from "lucide-react"

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Download className="h-4 w-4 mr-2" />
            Application Mobile
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Téléchargez
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              NovaCore Mobile
            </span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
            Gérez votre entreprise où que vous soyez avec l'application mobile NovaCore. CRM complet, IA intégrée,
            synchronisation temps réel.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* iOS Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-black rounded-2xl flex items-center justify-center mr-4">
                  <Apple className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">App Store</h3>
                  <p className="text-indigo-200">Pour iPhone et iPad</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>4.8/5 étoiles (2,847 avis)</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-green-400 mr-2" />
                  <span>50,000+ téléchargements</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-400 mr-2" />
                  <span>iOS 14.0 ou plus récent</span>
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-100 mb-4">
                <Apple className="h-5 w-5 mr-2" />
                Télécharger sur l'App Store
              </Button>

              <div className="text-center">
                <p className="text-sm text-indigo-200 mb-2">Ou scannez le QR code</p>
                <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Android Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Google Play</h3>
                  <p className="text-indigo-200">Pour Android</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>4.7/5 étoiles (4,521 avis)</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-green-400 mr-2" />
                  <span>100,000+ téléchargements</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-400 mr-2" />
                  <span>Android 8.0 ou plus récent</span>
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-100 mb-4">
                <PlayCircle className="h-5 w-5 mr-2" />
                Télécharger sur Google Play
              </Button>

              <div className="text-center">
                <p className="text-sm text-indigo-200 mb-2">Ou scannez le QR code</p>
                <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Fonctionnalités de l'application mobile</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interface Optimisée</h3>
              <p className="text-indigo-200">Interface mobile native optimisée pour la productivité en déplacement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Synchronisation Temps Réel</h3>
              <p className="text-indigo-200">Vos données synchronisées instantanément entre tous vos appareils</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Collaboration Mobile</h3>
              <p className="text-indigo-200">Travaillez en équipe même en déplacement avec les notifications push</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Tarification Application Mobile</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Gratuit</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-4">0 FCFA</p>
                <p className="text-indigo-200 mb-4">Fonctionnalités de base</p>
                <ul className="text-sm text-indigo-200 space-y-2 mb-6">
                  <li>• Consultation des données</li>
                  <li>• 5 clients maximum</li>
                  <li>• Support communautaire</li>
                </ul>
                <Button variant="outline" className="w-full text-white border-white/30">
                  Télécharger
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 ring-2 ring-cyan-400">
              <CardContent className="p-6 text-center">
                <Badge className="mb-2 bg-cyan-400 text-black">Populaire</Badge>
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-4">
                  19,900 FCFA<span className="text-sm">/mois</span>
                </p>
                <p className="text-indigo-200 mb-4">Fonctionnalités complètes</p>
                <ul className="text-sm text-indigo-200 space-y-2 mb-6">
                  <li>• Accès complet CRM</li>
                  <li>• IA intégrée</li>
                  <li>• Notifications push</li>
                  <li>• Support prioritaire</li>
                </ul>
                <Button className="w-full bg-cyan-400 text-black hover:bg-cyan-300">Commencer l'essai</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-cyan-400 mb-4">
                  49,900 FCFA<span className="text-sm">/mois</span>
                </p>
                <p className="text-indigo-200 mb-4">Solution d'entreprise</p>
                <ul className="text-sm text-indigo-200 space-y-2 mb-6">
                  <li>• Tout du Pro</li>
                  <li>• Utilisateurs illimités</li>
                  <li>• API personnalisée</li>
                  <li>• Support 24/7</li>
                </ul>
                <Button variant="outline" className="w-full text-white border-white/30">
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à booster votre productivité ?</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 professionnels qui utilisent NovaCore Mobile pour gérer leur entreprise
            efficacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-400 text-black hover:bg-cyan-300">
              <Download className="h-5 w-5 mr-2" />
              Télécharger Maintenant
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30">
              Voir la Démo
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
