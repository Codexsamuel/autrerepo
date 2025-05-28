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
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
  MessageSquare,
  Calendar,
  User,
  Building,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        service: "",
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Principal",
      value: "sobam@daveandlucesolutions.com",
      description: "Réponse sous 24h",
      link: "mailto:sobam@daveandlucesolutions.com",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+237 694 341 586",
      description: "Lun-Ven 8h-18h",
      link: "tel:+237694341586",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "2 rue École de Police",
      description: "Yaoundé, Cameroun",
      link: "https://maps.google.com/?q=2+rue+École+de+Police,Yaoundé,Cameroun",
    },
    {
      icon: Globe,
      title: "Site Web",
      value: "daveandlucesolutions.com",
      description: "Portfolio en ligne",
      link: "https://www.daveandlucesolutions.com",
    },
  ]

  const services = [
    "CRM NovaCore",
    "Intelligence Artificielle",
    "Création Visuelle",
    "Formations Professionnelles",
    "Shooting Photo/Vidéo",
    "Campagnes Marketing IA",
    "Automatisation",
    "Autre",
  ]

  const businessHours = [
    { day: "Lundi - Vendredi", hours: "8h00 - 18h00" },
    { day: "Samedi", hours: "9h00 - 15h00" },
    { day: "Dimanche", hours: "Fermé" },
  ]

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
              <a href="/contact" className="text-blue-600 font-medium">
                Contact
              </a>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-blue-200 text-blue-700" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                <a href="/sign-in">NovaCore</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Contactez-nous</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Parlons de votre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">projet</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale. Contactez-nous
              pour discuter de vos besoins.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Envoyez-nous un message</h2>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Message envoyé !</h3>
                    <p className="text-gray-600">
                      Merci pour votre message. Nous vous répondrons sous 24h à l'adresse{" "}
                      <span className="font-medium">sobam@daveandlucesolutions.com</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom et Prénom */}
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

                    {/* Email et Téléphone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email *
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
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+237 6XX XXX XXX"
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Entreprise et Service */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Entreprise
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Nom de votre entreprise"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Service d'intérêt
                        </Label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Sélectionnez un service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sujet */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Sujet *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Objet de votre message"
                        className="h-12"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Décrivez votre projet ou vos besoins en détail..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="h-5 w-5 mr-2" />
                          Envoyer le message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Informations de contact</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                        <a
                          href={info.link}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-blue-600 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Urgences :</strong> Pour les urgences techniques, contactez-nous par email. Nous répondons
                    sous 2h en cas d'urgence.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Actions rapides</h3>
                <div className="space-y-4">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <a href="/devis">
                      <MessageSquare className="h-5 w-5 mr-3" />
                      Obtenir un devis IA
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-700" asChild>
                    <a href="/rendez-vous">
                      <Calendar className="h-5 w-5 mr-3" />
                      Planifier un RDV
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-700" asChild>
                    <a href="https://daveandlucesolutions.com" target="_blank" rel="noopener noreferrer">
                      <Globe className="h-5 w-5 mr-3" />
                      Visiter notre site
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
