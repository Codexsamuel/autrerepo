"use client";

import { useState } from "react";
import { FormValidation } from "@/components/form-validation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Video } from "lucide-react"



export default function RendezVousPage() {
  const [activeTab, setActiveTab] = useState("info")

  const personalInfoFields = [{
      id: "name",
      label: "Nom complet",
      type: "text" as const,
      required: true,
      minLength: 3,
      placeholder: "Votre nom et prénom",
    },
    {
      id: "email",
      label: "Email professionnel",
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
      id: "company",
      label: "Entreprise",
      type: "text" as const,
      required: true,
      placeholder: "Nom de votre entreprise",
    },
    {
      id: "position",
      label: "Poste occupé",
      type: "text" as const,
      required: true,
      placeholder: "Votre fonction",
    },]
  const meetingDetailsFields = [
    {
      id: "service",
      label: "Service concerné",
      type: "select" as const,
      required: true,
      options: [
        { value: "crm", label: "CRM NovaCore" },
        { value: "ai", label: "Intelligence Artificielle" },
        { value: "formation", label: "Formation professionnelle" },
        { value: "design", label: "Création visuelle" },
        { value: "dev", label: "Développement sur mesure" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "date",
      label: "Date souhaitée",
      type: "text" as const,
      required: true,
      placeholder: "JJ/MM/AAAA",
    },
    {
      id: "time",
      label: "Heure souhaitée",
      type: "select" as const,
      required: true,
      options: [
        { value: "9h", label: "9h00" },
        { value: "10h", label: "10h00" },
        { value: "11h", label: "11h00" },
        { value: "14h", label: "14h00" },
        { value: "15h", label: "15h00" },
        { value: "16h", label: "16h00" },
        { value: "17h", label: "17h00" },
      ],
    },
    {
      id: "format",
      label: "Format de rendez-vous",
      type: "select" as const,
      required: true,
      options: [
        { value: "presentiel", label: "Présentiel (nos bureaux)" },
        { value: "video", label: "Visioconférence" },
        { value: "telephone", label: "Appel téléphonique" },
      ],
    },
    {
      id: "message",
      label: "Sujet de la réunion",
      type: "textarea" as const,
      required: true,
      minLength: 10,
      placeholder: "Décrivez brièvement l'objectif de votre rendez-vous...",
    },
  ]

  const handleSubmitPersonalInfo = async (data: Record<string, string>) => {
    console.log("Informations personnelles:", data)
    // Passer à l'étape suivante
    setActiveTab("meeting")
  }

  const handleSubmitMeetingDetails = async (data: Record<string, string>) => {
    console.log("Détails du rendez-vous:", data)

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Dans un cas réel, vous enverriez les données à votre API
    // await fetch('/api/rendez-vous', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...personalInfo, ...data })
    // })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Prendre rendez-vous</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Planifiez une rencontre avec nos experts pour discuter de vos projets et besoins spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Rencontrez nos experts pour une analyse personnalisée de vos besoins.</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Démonstration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Découvrez nos solutions en action avec une démonstration personnalisée.</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Planification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Organisez votre rendez-vous selon vos disponibilités et préférences.</CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire de rendez-vous</CardTitle>
            <CardDescription>
              Complétez les informations ci-dessous pour planifier votre rendez-vous avec notre équipe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="info" disabled={activeTab === "meeting"}>
                  1. Vos informations
                </TabsTrigger>
                <TabsTrigger value="meeting" disabled={activeTab === "info"}>
                  2. Détails du rendez-vous
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <FormValidation
                  fields={personalInfoFields}
                  onSubmit={handleSubmitPersonalInfo}
                  submitLabel="Continuer"
                  successMessage=""
                />
              </TabsContent>

              <TabsContent value="meeting">
                <FormValidation
                  fields={meetingDetailsFields}
                  onSubmit={handleSubmitMeetingDetails}
                  submitLabel="Confirmer le rendez-vous"
                  successMessage="Votre demande de rendez-vous a été envoyée avec succès. Vous recevrez une confirmation par email dans les plus brefs délais."
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
