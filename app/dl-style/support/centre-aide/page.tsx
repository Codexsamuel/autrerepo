"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  User,
  ChevronRight,
} from "lucide-react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Toutes les catégories", icon: HelpCircle, count: 45 },
    { id: "orders", name: "Commandes", icon: Package, count: 12 },
    { id: "payment", name: "Paiement", icon: CreditCard, count: 8 },
    { id: "shipping", name: "Livraison", icon: Truck, count: 10 },
    { id: "returns", name: "Retours", icon: RotateCcw, count: 7 },
    { id: "account", name: "Mon compte", icon: User, count: 5 },
    { id: "security", name: "Sécurité", icon: Shield, count: 3 },
  ]

  const popularQuestions = [
    {
      id: 1,
      question: "Comment suivre ma commande ?",
      answer:
        "Vous pouvez suivre votre commande en vous connectant à votre compte et en consultant la section 'Mes commandes'.",
      category: "orders",
      views: 1234,
    },
    {
      id: 2,
      question: "Quels sont les délais de livraison ?",
      answer:
        "Les délais de livraison sont de 3-5 jours ouvrés pour la livraison standard et 24h pour la livraison express.",
      category: "shipping",
      views: 987,
    },
    {
      id: 3,
      question: "Comment retourner un article ?",
      answer:
        "Vous avez 30 jours pour retourner un article. Connectez-vous à votre compte et initiez un retour depuis vos commandes.",
      category: "returns",
      views: 856,
    },
    {
      id: 4,
      question: "Quels moyens de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et Mobile Money (Orange Money, MTN Money).",
      category: "payment",
      views: 743,
    },
    {
      id: 5,
      question: "Comment modifier mon adresse de livraison ?",
      answer:
        "Vous pouvez modifier votre adresse dans votre compte, section 'Mes adresses', avant l'expédition de votre commande.",
      category: "account",
      views: 621,
    },
    {
      id: 6,
      question: "Ma commande est défectueuse, que faire ?",
      answer:
        "Contactez notre service client avec votre numéro de commande et des photos du défaut. Nous traiterons votre demande rapidement.",
      category: "orders",
      views: 534,
    },
  ]

  const quickActions = [
    {
      title: "Suivre une commande",
      description: "Vérifiez le statut de votre commande",
      icon: Package,
      link: "/dl-style/suivi",
      color: "bg-blue-500",
    },
    {
      title: "Retourner un article",
      description: "Initiez un retour en quelques clics",
      icon: RotateCcw,
      link: "/dl-style/retours",
      color: "bg-orange-500",
    },
    {
      title: "Nous contacter",
      description: "Parlez à notre équipe support",
      icon: MessageCircle,
      link: "/dl-style/support/contact",
      color: "bg-green-500",
    },
    {
      title: "Mon compte",
      description: "Gérez vos informations personnelles",
      icon: User,
      link: "/dl-style/compte",
      color: "bg-purple-500",
    },
  ]

  const filteredQuestions =
    selectedCategory === "all" ? popularQuestions : popularQuestions.filter((q) => q.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à DL Style
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-xl">Centre d'aide</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Comment pouvons-nous vous aider ?</h1>
          <p className="text-xl text-indigo-100 mb-8">Trouvez rapidement les réponses à vos questions</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-2 focus:ring-white"
              />
              <Search className="h-6 w-6 absolute left-4 top-4 text-gray-400" />
              <Button className="absolute right-2 top-2 bg-indigo-600 hover:bg-indigo-700">Rechercher</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Actions rapides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                asChild
              >
                <a href={action.link}>
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                    <ChevronRight className="h-4 w-4 mx-auto mt-3 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <category.icon className="h-4 w-4 mr-3" />
                          {category.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-0 shadow-lg mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="tel:+237694341586">
                      <Phone className="mr-3 h-4 w-4" />
                      +237 694 341 586
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="mailto:sobam@daveandlucesolutions.com">
                      <Mail className="mr-3 h-4 w-4" />
                      Support Email
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/dl-style/support/chat">
                      <MessageCircle className="mr-3 h-4 w-4" />
                      Chat en direct
                    </a>
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Lun-Ven: 9h-18h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === "all"
                      ? "Questions fréquentes"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <Badge className="bg-indigo-100 text-indigo-700">{filteredQuestions.length} questions</Badge>
                </div>

                <div className="space-y-6">
                  {filteredQuestions.map((faq) => (
                    <div key={faq.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-800 flex-1">{faq.question}</h3>
                        <Badge variant="outline" className="ml-4 text-xs">
                          {faq.views} vues
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center hover:text-green-600 transition-colors">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Utile
                        </button>
                        <button className="flex items-center hover:text-indigo-600 transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contacter le support
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune question trouvée</h3>
                    <p className="text-gray-500 mb-6">Essayez de modifier votre recherche ou contactez notre support</p>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                      <a href="/dl-style/support/contact">Contacter le support</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Still Need Help */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-gray-600 mb-8">Notre équipe support est là pour vous aider</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
              <a href="/dl-style/support/contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contacter le support
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/dl-style/support/chat">
                <Phone className="mr-2 h-5 w-5" />
                Chat en direct
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
