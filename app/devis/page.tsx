"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Sparkles, CheckCircle, MessageSquare, Brain, Download, Mail } from "lucide-react"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
  options?: string[]
}

interface DevisData {
  name: string
  email: string
  company: string
  phone: string
  services: string[]
  budget: string
  timeline: string
  description: string
  industry: string
  teamSize: string
  currentChallenges: string[]
  goals: string[]
}

export default function DevisPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [devisData, setDevisData] = useState<Partial<DevisData>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showDevis, setShowDevis] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Message d'accueil initial
    const welcomeMessage: Message = {
      id: "welcome",
      type: "bot",
      content:
        "👋 Bonjour ! Je suis Nova, votre assistant IA pour générer un devis personnalisé. Je vais vous poser quelques questions pour mieux comprendre vos besoins et vous proposer la solution DL Solutions la plus adaptée. Commençons par votre nom ?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  const conversationFlow = [
    {
      question: "Parfait ! Quel est le nom de votre entreprise ?",
      field: "company",
      type: "text",
    },
    {
      question: "Excellent ! Pouvez-vous me donner votre adresse email pour vous envoyer le devis ?",
      field: "email",
      type: "email",
    },
    {
      question: "Et votre numéro de téléphone pour un suivi personnalisé ?",
      field: "phone",
      type: "text",
    },
    {
      question:
        "Parfait ! Dans quel secteur d'activité évoluez-vous ? Cela m'aidera à personnaliser mes recommandations.",
      field: "industry",
      type: "select",
      options: [
        "E-commerce / Retail",
        "Services / Consulting",
        "Santé / Médical",
        "Éducation / Formation",
        "Hôtellerie / Restauration",
        "Immobilier",
        "Finance / Banque",
        "Technologie / IT",
        "Manufacturing",
        "Autre",
      ],
    },
    {
      question: "Quelle est la taille de votre équipe ?",
      field: "teamSize",
      type: "select",
      options: ["1-5 employés", "6-20 employés", "21-50 employés", "51-100 employés", "Plus de 100 employés"],
    },
    {
      question:
        "Quels sont vos principaux défis actuels ? (Vous pouvez sélectionner plusieurs options ou taper votre réponse)",
      field: "currentChallenges",
      type: "multiselect",
      options: [
        "Gestion client difficile",
        "Manque d'automatisation",
        "Visibilité en ligne insuffisante",
        "Formation des équipes",
        "Analyse des données",
        "Communication interne",
        "Génération de leads",
        "Autre",
      ],
    },
    {
      question: "Quels services DL Solutions vous intéressent le plus ?",
      field: "services",
      type: "multiselect",
      options: [
        "CRM NovaCore",
        "Intelligence Artificielle",
        "Création Visuelle",
        "Formations Professionnelles",
        "Shooting Photo/Vidéo",
        "Campagnes Marketing IA",
        "Automatisation",
        "Consultation stratégique",
      ],
    },
    {
      question: "Quel est votre budget approximatif pour ce projet ?",
      field: "budget",
      type: "select",
      options: [
        "Moins de 1 000€",
        "1 000€ - 5 000€",
        "5 000€ - 15 000€",
        "15 000€ - 50 000€",
        "Plus de 50 000€",
        "À discuter",
      ],
    },
    {
      question: "Dans quel délai souhaitez-vous démarrer le projet ?",
      field: "timeline",
      type: "select",
      options: [
        "Immédiatement",
        "Dans le mois",
        "Dans les 3 mois",
        "Dans les 6 mois",
        "Plus de 6 mois",
        "Pas encore défini",
      ],
    },
    {
      question: "Parfait ! Pour finir, pouvez-vous me décrire brièvement votre projet ou vos objectifs spécifiques ?",
      field: "description",
      type: "textarea",
    },
  ]

  const addMessage = (content: string, type: "bot" | "user", options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, duration))
    setIsTyping(false)
  }

  const handleUserResponse = async (response: string) => {
    addMessage(response, "user")
    setCurrentInput("")

    // Sauvegarder la réponse
    const currentQuestion = conversationFlow[currentStep]
    if (currentQuestion) {
      if (currentQuestion.type === "multiselect") {
        setDevisData((prev) => ({
          ...prev,
          [currentQuestion.field]: [...((prev[currentQuestion.field as keyof DevisData] as string[]) || []), response],
        }))
      } else {
        setDevisData((prev) => ({
          ...prev,
          [currentQuestion.field]: response,
        }))
      }
    } else {
      // Première question (nom)
      setDevisData((prev) => ({ ...prev, name: response }))
    }

    await simulateTyping()

    // Passer à la question suivante
    if (currentStep < conversationFlow.length) {
      const nextQuestion = conversationFlow[currentStep]
      addMessage(nextQuestion.question, "bot", nextQuestion.options)
      setCurrentStep(currentStep + 1)
    } else {
      // Fin du questionnaire
      setIsCompleted(true)
      addMessage(
        "🎉 Parfait ! J'ai toutes les informations nécessaires. Je génère votre devis personnalisé... Cela ne prendra que quelques secondes !",
        "bot",
      )

      await simulateTyping(3000)
      addMessage(
        "✅ Votre devis personnalisé est prêt ! Il a été généré en fonction de vos besoins spécifiques et inclut nos recommandations d'experts. Vous pouvez le consulter ci-dessous et le télécharger en PDF.",
        "bot",
      )
      setShowDevis(true)
    }
  }

  const handleOptionClick = (option: string) => {
    handleUserResponse(option)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleUserResponse(currentInput.trim())
    }
  }

  const generateDevisContent = () => {
    const services = devisData.services || []
    let totalPrice = 0
    const serviceDetails = services.map((service) => {
      let price = 0
      let description = ""

      switch (service) {
        case "CRM NovaCore":
          price = 49
          description = "Plateforme CRM intelligente avec IA intégrée"
          break
        case "Intelligence Artificielle":
          price = 150
          description = "Solutions IA personnalisées et chatbots"
          break
        case "Création Visuelle":
          price = 80
          description = "Design graphique et identité visuelle"
          break
        case "Formations Professionnelles":
          price = 120
          description = "Formations spécialisées pour vos équipes"
          break
        case "Shooting Photo/Vidéo":
          price = 200
          description = "Contenus visuels professionnels"
          break
        case "Campagnes Marketing IA":
          price = 180
          description = "Campagnes optimisées par IA"
          break
        case "Automatisation":
          price = 100
          description = "Automatisation des processus métier"
          break
        case "Consultation stratégique":
          price = 90
          description = "Accompagnement stratégique personnalisé"
          break
        default:
          price = 50
          description = "Service personnalisé"
      }

      totalPrice += price
      return { service, price, description }
    })

    return { serviceDetails, totalPrice }
  }

  const { serviceDetails, totalPrice } = generateDevisContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-blue-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-blue-600 transition-colors">
                À propos
              </a>
              <a href="/services" className="text-gray-800 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="/formations" className="text-gray-800 hover:text-blue-600 transition-colors">
                Formations
              </a>
              <a href="/portfolio" className="text-gray-800 hover:text-blue-600 transition-colors">
                Portfolio
              </a>
              <a href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-blue-200 text-blue-700">
                Devis IA
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                <a href="/sign-in">NovaCore</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              IA Assistant
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Devis{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Notre assistant IA Nova analyse vos besoins et génère un devis personnalisé en temps réel. Réponses
              rapides, recommandations expertes.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl h-[600px] flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Nova - Assistant IA</h3>
                    <p className="text-blue-100 text-sm">Spécialiste en solutions digitales</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">En ligne</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%]`}>
                        {message.type === "bot" && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`p-4 rounded-2xl ${
                            message.type === "user"
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-800 rounded-bl-sm"
                          }`}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                          {message.options && (
                            <div className="mt-4 space-y-2">
                              {message.options.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleOptionClick(option)}
                                  className="block w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.type === "user" && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                {!isCompleted && (
                  <div className="border-t p-6">
                    <form onSubmit={handleSubmit} className="flex space-x-4">
                      <Input
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Tapez votre réponse..."
                        className="flex-1"
                        disabled={isTyping}
                      />
                      <Button type="submit" disabled={!currentInput.trim() || isTyping} className="bg-blue-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Progression
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Questions répondues</span>
                    <span className="font-medium">
                      {Math.min(currentStep + 1, conversationFlow.length + 1)}/{conversationFlow.length + 1}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(Math.min(currentStep + 1, conversationFlow.length + 1) / (conversationFlow.length + 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Pourquoi ces questions ?
                </h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Comprendre vos besoins spécifiques</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Recommander les meilleures solutions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Calculer un prix juste et transparent</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>Préparer un accompagnement personnalisé</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Preview */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>CRM NovaCore</span>
                    <span className="text-blue-600 font-medium">dès 49€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intelligence Artificielle</span>
                    <span className="text-blue-600 font-medium">sur devis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Création Visuelle</span>
                    <span className="text-blue-600 font-medium">dès 150€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Formations Pro</span>
                    <span className="text-blue-600 font-medium">dès 350€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Devis Generated */}
        {showDevis && (
          <div className="mt-12">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-green-100 text-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Devis Généré
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">Votre Devis Personnalisé</h2>
                  <p className="text-gray-600">Généré par IA en fonction de vos besoins spécifiques</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Client Info */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Informations Client</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nom :</span>
                        <span className="font-medium">{devisData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Entreprise :</span>
                        <span className="font-medium">{devisData.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email :</span>
                        <span className="font-medium">{devisData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Secteur :</span>
                        <span className="font-medium">{devisData.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taille équipe :</span>
                        <span className="font-medium">{devisData.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Services Recommandés</h3>
                    <div className="space-y-4">
                      {serviceDetails.map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.service}</h4>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <span className="font-bold text-blue-600">{item.price}€/mois</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t mt-8 pt-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Mensuel Estimé :</span>
                    <span className="text-2xl text-blue-600">{totalPrice}€/mois</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Prix indicatifs - Devis final après consultation personnalisée
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le devis PDF
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-700 flex-1" asChild>
                    <a href="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Planifier un RDV
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
