"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Upload, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"



export default function InscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Inscription Entreprise</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Créez votre compte et personnalisez votre espace
          </p>
        </div>

        <Tabs defaultValue="informations" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="informations">Informations</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
            <TabsTrigger value="entreprise">Entreprise</TabsTrigger>
            <TabsTrigger value="personnalisation">Personnalisation</TabsTrigger>
          </TabsList>

          <TabsContent value="informations">
            <Card>
              <CardHeader>
                <CardTitle>Informations de connexion</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@entreprise.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirmer le mot de passe
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button className="w-full" onClick={() => setCurrentStep(2)}>
                    Suivant <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiscal">
            <Card>
              <CardHeader>
                <CardTitle>Informations fiscales</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siret">Numéro SIRET</Label>
                    <Input
                      id="siret"
                      placeholder="123 456 789 00012"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tva">Numéro de TVA intracommunautaire</Label>
                    <Input
                      id="tva"
                      placeholder="FR12345678900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rcs">RCS</Label>
                    <Input
                      id="rcs"
                      placeholder="RCS Paris B 123 456 789"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capital">Capital social</Label>
                    <Input
                      id="capital"
                      type="number"
                      placeholder="10000"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Précédent
                    </Button>
                    <Button onClick={() => setCurrentStep(3)}>
                      Suivant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entreprise">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nom de l'entreprise</Label>
                    <Input
                      id="company-name"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legal-form">Forme juridique</Label>
                    <Input
                      id="legal-form"
                      placeholder="SARL, SAS, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      placeholder="Adresse complète"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.entreprise.com"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Précédent
                    </Button>
                    <Button onClick={() => setCurrentStep(4)}>
                      Suivant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personnalisation">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo de l'entreprise</Label>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center">
                        {logoPreview ? (
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <Label
                          htmlFor="logo-upload"
                          className="cursor-pointer"
                        >
                          <Button variant="outline" type="button">
                            Choisir un logo
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mission">Mission de l'entreprise</Label>
                    <Textarea
                      id="mission"
                      placeholder="Décrivez la mission de votre entreprise..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision">Vision</Label>
                    <Textarea
                      id="vision"
                      placeholder="Décrivez la vision de votre entreprise..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="values">Valeurs</Label>
                    <Textarea
                      id="values"
                      placeholder="Listez les valeurs de votre entreprise..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branding">Charte graphique</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primary-color">Couleur principale</Label>
                        <Input
                          id="primary-color"
                          type="color"
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondary-color">
                          Couleur secondaire
                        </Label>
                        <Input
                          id="secondary-color"
                          type="color"
                          className="h-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                    >
                      Précédent
                    </Button>
                    <Button type="submit">
                      Créer mon compte
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            Déjà inscrit ?{" "}
            <Link
              href="/solutions/immobilier/connexion"
              className="text-primary hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 