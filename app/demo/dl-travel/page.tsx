"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Plane, 
  Hotel, 
  Car, 
  Building2,
  Globe,
  Shield,
  Users,
  CreditCard,
  Settings,
  Bell,
  Search,
  Filter,
  ArrowLeft,
  ChevronRight,
  Star,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Lock,
  Smartphone,
  Wifi,
  ShieldCheck,
  Globe2,
  Briefcase,
  Zap,
  Check,
  ArrowUpRight,
  ArrowRight,
  Brain,
  Mail,
  Eye
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DLTravelDemo() {
  const [activeTab, setActiveTab] = useState("flights")

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DL Travel
                </h1>
                <p className="text-sm text-gray-500">Votre partenaire de voyage intelligent</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                FR
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Shield className="h-4 w-4 mr-2" />
                Sécurité
              </Button>
              <Link href="/novacore">
                <Button variant="outline" size="sm" className="text-gray-600">
                  Retour au Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Voyagez Sereinement avec DL Travel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez une nouvelle façon de voyager avec notre plateforme intelligente, 
            conçue pour simplifier vos déplacements professionnels et personnels.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="flights" className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Vols
                </TabsTrigger>
                <TabsTrigger value="hotels" className="flex items-center gap-2">
                  <Hotel className="h-4 w-4" />
                  Hôtels
                </TabsTrigger>
                <TabsTrigger value="transfers" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Transfers
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Business
                </TabsTrigger>
              </TabsList>
              <TabsContent value="flights" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Départ</label>
                    <Input placeholder="Ville de départ" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Arrivée</label>
                    <Input placeholder="Destination" className="bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date de départ</label>
                    <Input type="date" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Date de retour</label>
                    <Input type="date" className="bg-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Passagers</label>
                    <Input type="number" placeholder="1" className="bg-white" />
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher des vols
                </Button>
              </TabsContent>
              {/* Autres onglets similaires */}
            </Tabs>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Pan-Africain</h3>
            <p className="text-gray-600">
              Accès à plus de 100 destinations en Afrique avec des partenariats locaux privilégiés.
            </p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Intelligence Artificielle</h3>
            <p className="text-gray-600">
              Recommandations personnalisées et optimisation des prix en temps réel.
            </p>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Sécurité Avancée</h3>
            <p className="text-gray-600">
              Protection des données et transactions sécurisées avec cryptage de bout en bout.
            </p>
          </Card>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Tarifs Transparents</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Basic</h3>
              <p className="text-3xl font-bold mb-4 text-blue-600">Gratuit</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Recherche de vols
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Réservations basiques
                </li>
              </ul>
              <Button variant="outline" className="w-full">Commencer</Button>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pro</h3>
              <p className="text-3xl font-bold mb-4 text-blue-600">10,000 FCFA<span className="text-sm text-gray-500">/mois</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Toutes les fonctionnalités Basic
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Réservations hôtels
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Support prioritaire
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Essayer Pro
              </Button>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Elite</h3>
              <p className="text-3xl font-bold mb-4 text-blue-600">25,000 FCFA<span className="text-sm text-gray-500">/mois</span></p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Toutes les fonctionnalités Pro
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Transfers VIP
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Conciergerie 24/7
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Passer Elite
              </Button>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">VIP Charter</h3>
              <p className="text-3xl font-bold mb-4 text-blue-600">Sur mesure</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Vols privés
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Service dédié
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Tarifs négociés
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contactez-nous</Button>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link href="/demo/dl-travel/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
              Commencer maintenant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">DL Travel</h3>
                <p className="text-sm text-gray-500">Powered by AI</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-1">Made by Samuel OBAM</p>
              <p className="text-sm text-gray-500 mb-1">CEO of DL Solutions</p>
              <p className="text-sm text-gray-500 mb-1">+237 694 341 586</p>
              <p className="text-sm text-gray-500 mb-1">Rue École de Police, Yaoundé</p>
              <p className="text-sm text-gray-500">sobam@daveandlucesolutions.com</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © 2024 DL Travel. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
