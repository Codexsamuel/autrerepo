"use client";

import { FormValidation } from "@/components/form-validation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, FileText, Layers, MessageSquare, User } from "lucide-react";
import { useState } from "react";


export default function DevisPage() {
  const [activeTab, setActiveTab] = useState("client")

  const clientInfoFields = [{
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
  const companyInfoFields = [
    {
      id: "companySize",
      label: "Taille de l'entreprise",
      type: "select" as const,
      required: true,
      options: [
        { value: "1-10", label: "1-10 employés" },
        { value: "11-50", label: "11-50 employés" },
        { value: "51-200", label: "51-200 employés" },
        { value: "201-500", label: "201-500 employés" },
        { value: "501+", label: "Plus de 500 employés" },
      ],
    },
    {
      id: "industry",
      label: "Secteur d'activité",
      type: "select" as const,
      required: true,
      options: [
        { value: "tech", label: "Technologies" },
        { value: "finance", label: "Finance & Banque" },
        { value: "retail", label: "Commerce & Distribution" },
        { value: "health", label: "Santé" },
        { value: "education", label: "Éducation" },
        { value: "manufacturing", label: "Industrie" },
        { value: "services", label: "Services" },
        { value: "other", label: "Autre" },
      ],
    },
    {
      id: "website",
      label: "Site web",
      type: "text" as const,
      required: false,
      placeholder: "https://www.votreentreprise.com",
    },
    {
      id: "address",
      label: "Adresse",
      type: "text" as const,
      required: true,
      placeholder: "Adresse de l'entreprise",
    },
    {
      id: "city",
      label: "Ville",
      type: "text" as const,
      required: true,
      placeholder: "Ville",
    },
  ]

  const projectInfoFields = [
    {
      id: "serviceType",
      label: "Type de service",
      type: "select" as const,
      required: true,
      options: [
        { value: "crm", label: "CRM NovaCore" },
        { value: "ai", label: "Intelligence Artificielle" },
        { value: "web", label: "Développement Web" },
        { value: "mobile", label: "Application Mobile" },
        { value: "design", label: "Design & Création" },
        { value: "formation", label: "Formation" },
        { value: "other", label: "Autre" },
      ],
    },
    {
      id: "budget",
      label: "Budget estimé (FCFA)",
      type: "select" as const,
      required: true,
      options: [
        { value: "moins-500k", label: "Moins de 500 000" },
        { value: "500k-1m", label: "500 000 - 1 000 000" },
        { value: "1m-5m", label: "1 000 000 - 5 000 000" },
        { value: "5m-10m", label: "5 000 000 - 10 000 000" },
        { value: "plus-10m", label: "Plus de 10 000 000" },
      ],
    },
    {
      id: "timeline",
      label: "Délai souhaité",
      type: "select" as const,
      required: true,
      options: [
        { value: "urgent", label: "Urgent (< 1 mois)" },
        { value: "1-3", label: "1-3 mois" },
        { value: "3-6", label: "3-6 mois" },
        { value: "6+", label: "Plus de 6 mois" },
        { value: "flexible", label: "Flexible" },
      ],
    },
    {
      id: "description",
      label: "Description du projet",
      type: "textarea" as const,
      required: true,
      minLength: 50,
      placeholder: "Décrivez votre projet, vos objectifs et vos attentes...",
    },
  ]

  const handleSubmitClientInfo = async (data: Record<string, string>) => {
    console.log("Informations client:", data)
    setActiveTab("company")
  }

  const handleSubmitCompanyInfo = async (data: Record<string, string>) => {
    console.log("Informations entreprise:", data)
    setActiveTab("project")
  }

  const handleSubmitProjectInfo = async (data: Record<string, string>) => {
    console.log("Informations projet:", data)

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Dans un cas réel, vous enverriez les données à votre API
    // await fetch('/api/devis', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...clientInfo, ...companyInfo, ...data })
    // })
  }

  return (
    <>
      {/* SEO Optimized */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Demande de devis</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Obtenez un devis personnalisé pour votre projet en quelques étapes simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle className="text-lg">Devis détaillé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-900">
                  Recevez une proposition complète adaptée à vos besoins spécifiques.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                  <Layers className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle className="text-lg">Solutions sur mesure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-900">
                  Des solutions personnalisées selon vos objectifs et votre budget.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle className="text-lg">Accompagnement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-900">
                  Un conseiller dédié pour vous guider tout au long de votre projet.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulaire de demande de devis</CardTitle>
              <CardDescription>
                Complétez les informations ci-dessous pour recevoir un devis personnalisé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="client" disabled={activeTab !== "client"}>
                    <User className="h-4 w-4 mr-2" />
                    1. Vos informations
                  </TabsTrigger>
                  <TabsTrigger value="company" disabled={activeTab !== "company" && activeTab !== "project"}>
                    <Building className="h-4 w-4 mr-2" />
                    2. Votre entreprise
                  </TabsTrigger>
                  <TabsTrigger value="project" disabled={activeTab !== "project"}>
                    <FileText className="h-4 w-4 mr-2" />
                    3. Votre projet
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="client">
                  <FormValidation
                    fields={clientInfoFields}
                    onSubmit={handleSubmitClientInfo}
                    submitLabel="Continuer"
                    successMessage=""
                  />
                </TabsContent>

                <TabsContent value="company">
                  <FormValidation
                    fields={companyInfoFields}
                    onSubmit={handleSubmitCompanyInfo}
                    submitLabel="Continuer"
                    successMessage=""
                  />
                </TabsContent>

                <TabsContent value="project">
                  <FormValidation
                    fields={projectInfoFields}
                    onSubmit={handleSubmitProjectInfo}
                    submitLabel="Demander un devis"
                    successMessage="Votre demande de devis a été envoyée avec succès. Un conseiller vous contactera dans les 24 heures ouvrables pour discuter de votre projet."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
