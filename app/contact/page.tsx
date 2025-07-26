import { FormValidation } from "@/components/form-validation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from 'next';
import { useState } from "react";

export const metadata: Metadata = {
  title: 'Contact - DL Solutions | Davy & Lucie Solutions SARL',
  description: 'Contactez DL Solutions à Ngoa Ekelle, Yaoundé. Téléphone: +237 694 341 586. Email: contact@dlsolutions.com. Solutions digitales, e-commerce, IA et transformation numérique au Cameroun.',
  keywords: 'DL Solutions, contact, Davy, Lucie, téléphone, email, adresse, Ngoa Ekelle, Yaoundé, Cameroun, solutions digitales',
  openGraph: {
    title: 'Contact - DL Solutions | Davy & Lucie',
    description: 'Contactez-nous pour vos projets digitaux au Cameroun',
    type: 'website',
    url: 'https://dlsolutions.com/contact',
    images: ['/images/contact-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - DL Solutions | Davy & Lucie',
    description: 'Contactez-nous pour vos projets digitaux au Cameroun',
    images: ['/images/contact-og.jpg'],
  },
  alternates: {
    canonical: 'https://dlsolutions.com/contact',
  },
};


export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactFields = [
    {
      id: "name",
      label: "Nom complet",
      type: "text" as const,
      required: true,
      minLength: 3,
      placeholder: "Votre nom et prénom",
    },
    {
      id: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "votre@email.com",
    },
    {
      id: "phone",
      label: "Téléphone",
      type: "tel" as const,
      required: true,
      placeholder: "+237 6XX XXX XXX",
    },
    {
      id: "subject",
      label: "Sujet",
      type: "select" as const,
      required: true,
      options: [
        { value: "information", label: "Demande d'information" },
        { value: "devis", label: "Demande de devis" },
        { value: "support", label: "Support technique" },
        { value: "partenariat", label: "Proposition de partenariat" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "message",
      label: "Message",
      type: "textarea" as const,
      required: true,
      minLength: 10,
      placeholder: "Détaillez votre demande ici...",
    },
  ]

  const handleSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Formulaire soumis:", data)
    setIsSubmitting(false)

    // Dans un cas réel, vous enverriez les données à votre API
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos
              projets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Téléphone</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a href="tel:+237694341586" className="hover:text-blue-600 transition-colors">
                    +237 694 341 586
                  </a>
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a href="mailto:sobam@daveandlucesolutions.com" className="hover:text-blue-600 transition-colors">
                    sobam@daveandlucesolutions.com
                  </a>
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Adresse</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  2 rue École de Police
                  <br />
                  Yaoundé, Cameroun
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-blue-600 text-white p-6 rounded-lg h-full">
                <h2 className="text-2xl font-bold mb-4">Horaires d'ouverture</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-blue-400 pb-2">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">8h - 18h</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-blue-400 pb-2">
                    <span>Samedi</span>
                    <span className="font-medium">9h - 15h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3">Besoin urgent?</h3>
                  <p className="mb-4">
                    Pour toute demande urgente, n'hésitez pas à nous contacter directement par téléphone.
                  </p>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="font-bold">+237 694 341 586</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Formulaire de contact</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormValidation
                    fields={contactFields}
                    onSubmit={handleSubmit}
                    submitLabel="Envoyer le message"
                    successMessage="Votre message a été envoyé avec succès. Notre équipe vous contactera dans les plus brefs délais."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
