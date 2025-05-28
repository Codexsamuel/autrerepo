"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Target,
  Briefcase,
  CheckCircle,
  Video,
  Users,
  MessageSquare,
  PieChart,
  DollarSign,
  Clock3,
} from "lucide-react"

export default function RendezVousPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    website: "",
    industry: "",
    companySize: "",
    objectives: [] as string[],
    challenges: [] as string[],
    projectDescription: "",
    budget: "",
    timeline: "",
    meetingType: "",
    meetingDate: "",
    meetingTime: "",
    meetingDuration: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectToggle = (field: "objectives" | "challenges", value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field]
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter((item) => item !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const objectives = [
    { value: "Augmenter les ventes", icon: DollarSign },
    { value: "Améliorer l'efficacité", icon: PieChart },
    { value: "Automatiser les processus", icon: CheckCircle },
    { value: "Développer la notoriété", icon: Users },
    { value: "Lancer un nouveau produit", icon: Briefcase },
    { value: "Optimiser le service client", icon: MessageSquare },
  ]

  const challenges = [
    { value: "Manque de visibilité", icon: Target },
    { value: "Processus manuels", icon: CheckCircle },
    { value: "Perte de clients", icon: Users },
    { value: "Concurrence accrue", icon: Briefcase },
    { value: "Problèmes techniques", icon: Globe },
    { value: "Budget limité", icon: DollarSign },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre prénom"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom"
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email professionnel *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="votre@email.com"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+33 6XX XX XX XX"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Fonction / Poste *
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                placeholder="Votre fonction dans l'entreprise"
                className="h-12"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Nom de l'entreprise *
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Nom de votre entreprise"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Site web
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.votreentreprise.com"
                className="h-12"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Secteur d'activité *
                </Label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un secteur</option>
                  <option value="E-commerce / Retail">E-commerce / Retail</option>
                  <option value="Services / Consulting">Services / Consulting</option>
                  <option value="Santé / Médical">Santé / Médical</option>
                  <option value="Éducation / Formation">Éducation / Formation</option>
                  <option value="Hôtellerie / Restauration">Hôtellerie / Restauration</option>
                  <option value="Immobilier">Immobilier</option>
                  <option value="Finance / Banque">Finance / Banque</option>
                  <option value="Technologie / IT">Technologie / IT</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Taille de l'entreprise *
                </Label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez une taille</option>
                  <option value="1-5 employés">1-5 employés</option>
                  <option value="6-20 employés">6-20 employés</option>
                  <option value="21-50 employés">21-50 employés</option>
                  <option value="51-100 employés">51-100 employés</option>
                  <option value="101-500 employés">101-500 employés</option>
                  <option value="Plus de 500 employés">Plus de 500 employés</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Objectifs principaux (sélectionnez-en jusqu'à 3) *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {objectives.map((objective, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMultiSelectToggle("objectives", objective.value)}
                    className={`flex items-center p-4 border rounded-lg transition-all ${
                      formData.objectives.includes(objective.value)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        formData.objectives.includes(objective.value)
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <objective.icon className="h-5 w-5" />
                    </div>
                    <span>{objective.value}</span>
                    {formData.objectives.includes(objective.value) && (
                      <CheckCircle className="h-5 w-5 ml-auto text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Défis actuels (sélectionnez-en jusqu'à 3) *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.map((challenge, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMultiSelectToggle("challenges", challenge.value)}
                    className={`flex items-center p-4 border rounded-lg transition-all ${
                      formData.challenges.includes(challenge.value)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        formData.challenges.includes(challenge.value)
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <challenge.icon className="h-5 w-5" />
                    </div>
                    <span>{challenge.value}</span>
                    {formData.challenges.includes(challenge.value) && (
                      <CheckCircle className="h-5 w-5 ml-auto text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectDescription" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Description du projet / besoins *
              </Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
                placeholder="Décrivez votre projet ou vos besoins en détail..."
                rows={5}
                className="resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Budget approximatif *
                </Label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un budget</option>
                  <option value="Moins de 1 000€">Moins de 1 000€</option>
                  <option value="1 000€ - 5 000€">1 000€ - 5 000€</option>
                  <option value="5 000€ - 15 000€">5 000€ - 15 000€</option>
                  <option value="15 000€ - 50 000€">15 000€ - 50 000€</option>
                  <option value="Plus de 50 000€">Plus de 50 000€</option>
                  <option value="À discuter">À discuter</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className="flex items-center">
                  <Clock3 className="h-4 w-4 mr-2" />
                  Délai de réalisation souhaité *
                </Label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un délai</option>
                  <option value="Immédiatement">Immédiatement</option>
                  <option value="Dans le mois">Dans le mois</option>
                  <option value="Dans les 3 mois">Dans les 3 mois</option>
                  <option value="Dans les 6 mois">Dans les 6 mois</option>
                  <option value="Plus de 6 mois">Plus de 6 mois</option>
                  <option value="Pas encore défini">Pas encore défini</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Type de rendez-vous préféré *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, meetingType: "En personne" }))}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-all ${
                    formData.meetingType === "En personne"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      formData.meetingType === "En personne" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Users className="h-8 w-8" />
                  </div>
                  <span className="font-medium">En personne</span>
                  <span className="text-sm text-gray-500 mt-2">Dans nos bureaux</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, meetingType: "Visioconférence" }))}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-all ${
                    formData.meetingType === "Visioconférence"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      formData.meetingType === "Visioconférence"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Video className="h-8 w-8" />
                  </div>
                  <span className="font-medium">Visioconférence</span>
                  <span className="text-sm text-gray-500 mt-2">Teams, Zoom, etc.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, meetingType: "Téléphone" }))}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-all ${
                    formData.meetingType === "Téléphone"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      formData.meetingType === "Téléphone" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Phone className="h-8 w-8" />
                  </div>
                  <span className="font-medium">Téléphone</span>
                  <span className="text-sm text-gray-500 mt-2">Appel téléphonique</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="meetingDate" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date souhaitée *
                </Label>
                <Input
                  id="meetingDate"
                  name="meetingDate"
                  type="date"
                  value={formData.meetingDate}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingTime" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Heure souhaitée *
                </Label>
                <Input
                  id="meetingTime"
                  name="meetingTime"
                  type="time"
                  value={formData.meetingTime}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingDuration" className="flex items-center">
                <Clock3 className="h-4 w-4 mr-2" />
                Durée estimée *
              </Label>
              <select
                id="meetingDuration"
                name="meetingDuration"
                value={formData.meetingDuration}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez une durée</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 heure">1 heure</option>
                <option value="1h30">1h30</option>
                <option value="2 heures">2 heures</option>
                <option value="Plus de 2 heures">Plus de 2 heures</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Informations complémentaires
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Questions spécifiques, points à aborder, etc."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-200 flex items-center justify-center bg-white shadow-md">
                <img src="/placeholder.svg?height=56&width=56&query=DL%20logo" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
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
              <Button variant="outline" className="border-blue-200 text-blue-700" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-blue-700" asChild>
                <a href="/rendez-vous">Prendre RDV</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Planification</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Planifiez votre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                rendez-vous
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Remplissez ce formulaire pour nous permettre de préparer une présentation commerciale sur mesure adaptée à
              vos besoins spécifiques.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Demande de rendez-vous envoyée !</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Merci {formData.firstName} ! Nous avons bien reçu votre demande de rendez-vous. Notre équipe va
                  analyser vos besoins et vous contactera dans les plus brefs délais pour confirmer le rendez-vous.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-blue-200 text-blue-700" asChild>
                    <a href="/">Retour à l'accueil</a>
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <a href="/services">Découvrir nos services</a>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Étape {currentStep} sur 5</span>
                    <span className="text-sm font-medium text-gray-500">
                      {currentStep === 1
                        ? "Informations personnelles"
                        : currentStep === 2
                        ? "Entreprise"
                        : currentStep === 3
                        ? "Objectifs & défis"
                        : currentStep === 4
                        ? "Projet & budget"
                        : "Préférences RDV"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Step Icons */}
                <div className="hidden md:flex justify-between mb-12">
                  {[
                    { step: 1, icon: User, label: "Informations" },
                    { step: 2, icon: Building, label: "Entreprise" },
                    { step: 3, icon: Target, label: "Objectifs" },
                    { step: 4, icon: Briefcase, label: "Projet" },
                    { step: 5, icon: Calendar, label: "RDV" },
                  ].map((item) => (
                    <div key={item.step} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                          currentStep >= item.step
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <item.icon className="h-8 w-8" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          currentStep >= item.step ? "text-blue-700" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="mb-8">{renderStepContent()}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-blue-200 text-blue-700"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédent
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={nextStep}
                    >
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Planifier le rendez-vous
                          <Calendar className="ml-2 h-4 w-4" />
                        </>
                \
