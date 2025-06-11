"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  Headphones,
  MessageSquare,
  DollarSign,
  BarChart3,
} from "lucide-react"

export default function TeleveteProspectionPage() {
  const programme = [
    {
      jour: "Jour 1",
      titre: "Fondamentaux de la télévente",
      modules: [
        "Introduction à la télévente moderne",
        "Psychologie du client au téléphone",
        "Préparation et organisation du poste de travail",
        "Techniques de prise de contact efficace",
        "Atelier pratique : Premiers appels",
      ],
    },
    {
      jour: "Jour 2",
      titre: "Techniques de prospection avancées",
      modules: [
        "Stratégies de prospection ciblée",
        "Gestion des objections courantes",
        "Techniques de questionnement SPIN",
        "Art de la négociation téléphonique",
        "Atelier : Jeux de rôles et simulations",
      ],
    },
    {
      jour: "Jour 3",
      titre: "Closing et suivi client",
      modules: [
        "Techniques de closing efficaces",
        "Gestion du pipeline de ventes",
        "Outils CRM pour télévente",
        "Suivi et fidélisation client",
        "Évaluation finale et certification",
      ],
    },
  ]

  const objectifs = [
    "Maîtriser les techniques de prospection téléphonique",
    "Développer un argumentaire de vente percutant",
    "Gérer efficacement les objections clients",
    "Optimiser son taux de conversion",
    "Utiliser les outils CRM modernes",
  ]

  const temoignages = [
    {
      nom: "Marie Dubois",
      poste: "Commerciale chez TechCorp",
      note: 5,
      commentaire: "Formation exceptionnelle ! J'ai augmenté mes ventes de 40% en 2 mois.",
    },
    {
      nom: "Pierre Martin",
      poste: "Responsable commercial",
      note: 5,
      commentaire: "Techniques concrètes et applicables immédiatement. Formateur très compétent.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/formations" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux formations
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700" asChild>
                <a href="/contact">Questions ?</a>
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                <a href="/formations/checkout?formation=televente-prospection&price=160">S'inscrire maintenant</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal-100 text-teal-700">Formation Professionnelle</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Télévente &{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Prospection
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Maîtrisez les techniques de vente par téléphone et développez votre portefeuille client avec des
                méthodes éprouvées et modernes.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Durée</div>
                    <div className="text-gray-600">3 jours intensifs</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Participants</div>
                    <div className="text-gray-600">8-12 personnes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Certification</div>
                    <div className="text-gray-600">Incluse</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Prix</div>
                    <div className="text-gray-600">160$</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                  <a href="/formations/checkout?formation=televente-prospection&price=160">S'inscrire maintenant</a>
                </Button>
                <Button size="lg" variant="outline" className="border-teal-200 text-teal-700">
                  Télécharger le programme
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Headphones className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Prochaine session</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                      <span>15-17 Février 2024</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                      <span>Paris + Distanciel</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-teal-500 mr-3" />
                      <span>7 places restantes</span>
                    </div>
                  </div>
                  <Progress value={65} className="mt-6" />
                  <p className="text-sm text-gray-600 mt-2">65% des places réservées</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <Tabs defaultValue="programme" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="programme">Programme</TabsTrigger>
              <TabsTrigger value="objectifs">Objectifs</TabsTrigger>
              <TabsTrigger value="formateur">Formateur</TabsTrigger>
              <TabsTrigger value="temoignages">Témoignages</TabsTrigger>
              <TabsTrigger value="inscription">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="programme" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Programme détaillé</h2>
                  <p className="text-gray-600 mb-8">
                    Formation intensive de 3 jours pour maîtriser tous les aspects de la télévente moderne.
                  </p>
                </div>

                <div className="grid gap-6">
                  {programme.map((jour, index) => (
                    <Card key={index} className="border-l-4 border-l-teal-500">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Badge variant="secondary" className="mr-4">
                            {jour.jour}
                          </Badge>
                          {jour.titre}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {jour.modules.map((module, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span>{module}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objectifs" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Objectifs pédagogiques</h2>
                  <p className="text-gray-600 mb-8">À l'issue de cette formation, vous serez capable de :</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {objectifs.map((objectif, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Target className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                          <span className="text-lg">{objectif}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Méthodes pédagogiques</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <BookOpen className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Théorie</h4>
                        <p className="text-gray-600">Concepts et techniques fondamentales</p>
                      </div>
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Pratique</h4>
                        <p className="text-gray-600">Jeux de rôles et simulations</p>
                      </div>
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Évaluation</h4>
                        <p className="text-gray-600">Tests et mise en situation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="formateur" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Votre formateur</h2>
                </div>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">JD</span>
                        </div>
                        <h3 className="text-xl font-bold">Jean Dupont</h3>
                        <p className="text-gray-600">Expert en Télévente</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-lg font-semibold mb-4">Expérience</h4>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5" />
                            <span>15 ans d'expérience en vente B2B</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5" />
                            <span>Ex-Directeur Commercial chez SalesForce</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5" />
                            <span>Formateur certifié en techniques de vente</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5" />
                            <span>Plus de 1000 commerciaux formés</span>
                          </li>
                        </ul>
                        <p className="text-gray-600">
                          Jean apporte une approche pratique et moderne de la télévente, basée sur son expérience
                          terrain et sa connaissance des outils digitaux.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="temoignages" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Témoignages</h2>
                  <p className="text-gray-600 mb-8">Découvrez les retours de nos anciens apprenants.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {temoignages.map((temoignage, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {[...Array(temoignage.note)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 italic">"{temoignage.commentaire}"</p>
                        <div>
                          <div className="font-semibold">{temoignage.nom}</div>
                          <div className="text-sm text-gray-500">{temoignage.poste}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-teal-600 to-blue-600 border-0 text-white">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Résultats moyens</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-3xl font-bold">+45%</div>
                        <div>Augmentation des ventes</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">95%</div>
                        <div>Taux de satisfaction</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">+30%</div>
                        <div>Amélioration du closing</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inscription" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Inscription</h2>
                  <p className="text-gray-600 mb-8">Réservez votre place pour la prochaine session.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle>Formulaire d'inscription</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Prénom</label>
                          <input type="text" className="w-full p-3 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom</label>
                          <input type="text" className="w-full p-3 border rounded-lg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input type="tel" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Entreprise</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Session souhaitée</label>
                        <select className="w-full p-3 border rounded-lg">
                          <option>15-17 Février 2024 (Paris)</option>
                          <option>22-24 Mars 2024 (Lyon)</option>
                          <option>12-14 Avril 2024 (Distanciel)</option>
                        </select>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                        <a href="/formations/checkout?formation=televente-prospection&price=160">
                          Confirmer l'inscription
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Informations pratiques</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                            <div>
                              <div className="font-semibold">Horaires</div>
                              <div className="text-gray-600">9h00 - 17h00</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                            <div>
                              <div className="font-semibold">Lieu</div>
                              <div className="text-gray-600">Centre de formation DL Solutions, Paris</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <BookOpen className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                            <div>
                              <div className="font-semibold">Supports</div>
                              <div className="text-gray-600">Manuel, exercices, accès plateforme</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-blue-50">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Tarif et financement</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Formation (3 jours)</span>
                            <span className="font-bold">160$</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Supports inclus</span>
                            <span className="text-green-600">Gratuit</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Certification</span>
                            <span className="text-green-600">Incluse</span>
                          </div>
                          <hr />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>160$</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">Financement possible via OPCO ou CPF</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
