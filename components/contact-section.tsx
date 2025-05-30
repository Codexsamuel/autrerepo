"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Appelez-nous",
    description: "Discutons de votre projet par téléphone",
    value: "+33 1 23 45 67 89",
    action: "Appeler maintenant",
    link: "tel:+33123456789",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Mail,
    title: "Écrivez-nous",
    description: "Envoyez-nous un email détaillé",
    value: "contact@dl-solutions.fr",
    action: "Envoyer un email",
    link: "mailto:contact@dl-solutions.fr",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "Chat en direct",
    description: "Support instantané via notre chat",
    value: "Disponible 24/7",
    action: "Démarrer le chat",
    link: "#chat",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Calendar,
    title: "Rendez-vous",
    description: "Planifiez une consultation gratuite",
    value: "30 min gratuit",
    action: "Réserver un créneau",
    link: "/rendez-vous",
    color: "from-orange-500 to-red-500",
  },
]

const officeInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    value: "123 Avenue des Champs-Élysées\n75008 Paris, France",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun - Ven: 9h00 - 18h00\nSam: 10h00 - 16h00",
  },
  {
    icon: Phone,
    title: "Support",
    value: "24/7 via chat et email\nTéléphone: 9h00 - 18h00",
  },
]

export default function ContactSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">Contactez-nous</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prêt à transformer
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Votre Entreprise ?
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale. Contactez-nous pour
            une consultation gratuite et personnalisée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre mode de contact</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">{method.title}</CardTitle>
                    <CardDescription className="text-gray-600">{method.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="text-sm font-medium text-gray-900 mb-4">{method.value}</div>
                    <Link href={method.link}>
                      <Button className="w-full text-sm">
                        {method.action}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Info */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <h4 className="text-lg font-bold text-gray-900">Informations pratiques</h4>
              {officeInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">{info.title}</div>
                    <div className="text-sm text-gray-600 whitespace-pre-line">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Envoyez-nous un message</CardTitle>
              <CardDescription>Décrivez votre projet et nous vous recontacterons dans les 24h</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <Input placeholder="Votre prénom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="votre@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <Input type="tel" placeholder="+33 1 23 45 67 89" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                <Input placeholder="Nom de votre entreprise" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea placeholder="Décrivez votre projet, vos besoins et objectifs..." rows={4} />
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold">
                <Send className="mr-2 w-5 h-5" />
                Envoyer le message
              </Button>

              <p className="text-xs text-gray-500 text-center">
                En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
