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
  CheckCircle,
  Calendar,
  MapPin,
  DollarSign,
  Target,
  TrendingUp,
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  BarChart3,
} from "lucide-react"

export default function EcommerceVentePage() {
  const programme = [
    {
      jour: "Jour 1",
      titre: "Fondamentaux E-commerce",
      modules: [
        "Écosystème du commerce électronique",
        "Choix de la plateforme (Shopify, WooCommerce, Prestashop)",
        "Analyse de marché et positionnement",
        "Stratégie produit et catalogue",
        "Atelier : Création d'une boutique de base",
      ],
    },
    {
      jour: "Jour 2",
      titre: "Optimisation des conversions",
      modules: [
        "UX/UI pour l'e-commerce",
        "Optimisation des fiches produits",
        "Tunnel de vente et checkout",
        "A/B testing et analytics",
        "Atelier pratique : Optimisation complète",
      ],
    },
    {
      jour: "Jour 3",
      titre: "Logistique et paiements",
      modules: [
        "Gestion des stocks et approvisionnement",
        "Solutions de paiement (Stripe, PayPal, etc.)",
        "Logistique et expédition",
        "Service client e-commerce",
        "Atelier : Configuration complète",
      ],
    },
    {
      jour: "Jour 4",
      titre: "Marketing E-commerce",
      modules: [
        "SEO pour e-commerce",
        "Publicité Google Shopping",
        "Email marketing et automation",
        "Réseaux sociaux et influenceurs",
        "Projet final : Lancement boutique",
      ],
    },
  ]

  const objectifs = [
    "Créer et configurer une boutique en ligne complète",
    "Optimiser les taux de conversion",
    "Maîtriser la logistique e-commerce",
    "Développer une stratégie marketing efficace",
    "Analyser et améliorer les performances",
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
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600">S'inscrire maintenant</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
                Formation Premium
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                E-commerce &{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Vente en Ligne
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Lancez et optimisez votre boutique en ligne avec succès. Formation complète de la création au marketing
                avancé.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Durée</div>
                    <div className="text-gray-600">4 jours intensifs</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Participants</div>
                    <div className="text-gray-600">6-10 personnes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Certification</div>
                    <div className="text-gray-600">E-commerce Expert</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Prix</div>
                    <div className="text-gray-600 font-bold text-lg">200$</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600">
                  S'inscrire maintenant
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
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Prochaine session</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                      <span>10-13 Avril 2024</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                      <span>Paris + Lab E-commerce</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-teal-500 mr-3" />
                      <span>2 places restantes</span>
                    </div>
                  </div>
                  <Progress value={90} className="mt-6" />
                  <p className="text-sm text-gray-600 mt-2">90% des places réservées</p>
                  <Badge className="mt-4 bg-red-100 text-red-700">Places limitées !</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modules couverts */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">5 modules complets</h2>
            <p className="text-gray-600">Formation la plus complète pour maîtriser l'e-commerce</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <ShoppingCart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Création</h3>
                <p className="text-gray-600">Boutique complète</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Optimisation</h3>
                <p className="text-gray-600">Taux de conversion</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Logistique</h3>
                <p className="text-gray-600">Stocks & expédition</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <CreditCard className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Paiements</h3>
                <p className="text-gray-600">Solutions sécurisées</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Analytics</h3>
                <p className="text-gray-600">Performance & ROI</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contenu principal avec onglets */}
      <section className="py-16 px-4 bg-gray-50">
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
                    Formation premium de 4 jours pour créer et développer votre boutique e-commerce.
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

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-orange-800">🎁 Bonus inclus</h3>
                    <ul className="space-y-2 text-orange-700">
                      <li>• Template de boutique professionnel (valeur 150$)</li>
                      <li>• 3 mois d'accompagnement post-formation</li>
                      <li>• Accès à la communauté e-commerce DL Solutions</li>
                      <li>• Kit de ressources marketing (images, textes, guides)</li>
                    </ul>
                  </CardContent>
                </Card>
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

                <Card className="bg-gradient-to-r from-teal-600 to-blue-600 border-0 text-white">
                  <CardContent className="p-8 text-center">
                    <Package className="h-16 w-16 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Résultats attendus</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-3xl font-bold">100%</div>
                        <div>Boutique fonctionnelle</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">+250%</div>
                        <div>Augmentation des ventes</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">ROI</div>
                        <div>Positif en 3 mois</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="formateur" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Votre formateur expert</h2>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">MC</span>
                        </div>
                        <h3 className="text-xl font-bold">Marc Dubois</h3>
                        <p className="text-gray-600">Expert E-commerce</p>
                      </div>

                      <div className="md:col-span-2">
                        <h4 className="text-lg font-bold mb-4">Expertise & Expérience</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>15+ années d'expérience en e-commerce</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Fondateur de 3 boutiques en ligne à succès</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Consultant pour +200 entreprises</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Certifié Shopify Partner Expert</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
                      <div className="text-gray-600">Apprenants formés</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
                      <div className="text-gray-600">Taux de satisfaction</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-teal-600 mb-2">4.9/5</div>
                      <div className="text-gray-600">Note moyenne</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="temoignages" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Ce que disent nos apprenants</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">SL</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Sophie Laurent</h4>
                          <p className="text-gray-600">Créatrice de bijoux</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        "Grâce à cette formation, j'ai lancé ma boutique en ligne en 2 semaines. Le chiffre d'affaires a
                        dépassé mes attentes dès le premier mois !"
                      </p>
                      <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">JM</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Jean Martin</h4>
                          <p className="text-gray-600">Entrepreneur</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        "Formation très complète et pratique. Marc nous accompagne vraiment jusqu'au bout. Ma boutique
                        génère maintenant 15k€/mois."
                      </p>
                      <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">AD</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Alice Dubois</h4>
                          <p className="text-gray-600">Consultante</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        "J'ai enfin compris tous les aspects techniques. La partie logistique et paiements était
                        exactement ce dont j'avais besoin."
                      </p>
                      <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold">PR</span>
                        </div>
                        <div>
                          <h4 className="font-bold">Pierre Rousseau</h4>
                          <p className="text-gray-600">Artisan</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        "ROI incroyable ! La formation s'est amortie en 1 mois. Je recommande vivement à tous les
                        entrepreneurs."
                      </p>
                      <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inscription" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Inscription & Informations pratiques</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Formulaire d'inscription</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Prénom</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Session souhaitée</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option>10-13 Avril 2024 (Paris)</option>
                          <option>15-18 Mai 2024 (Lyon)</option>
                          <option>20-23 Juin 2024 (Marseille)</option>
                        </select>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-lg py-3">
                        S'inscrire maintenant - 200€
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Informations pratiques</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">Durée</div>
                            <div className="text-gray-600">4 jours intensifs (9h-17h)</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">Lieu</div>
                            <div className="text-gray-600">Centre de formation DL Solutions + Lab pratique</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Package className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">Inclus</div>
                            <div className="text-gray-600">Support de cours, déjeuners, certification</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Users className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">Groupe</div>
                            <div className="text-gray-600">6-10 participants maximum</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-green-800 mb-3">💰 Financement possible</h3>
                        <ul className="space-y-2 text-green-700">
                          <li>• Prise en charge OPCO</li>
                          <li>• CPF (Compte Personnel de Formation)</li>
                          <li>• Paiement en 3x sans frais</li>
                          <li>• Tarif entreprise disponible</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-blue-800 mb-3">🎯 Garantie résultats</h3>
                        <p className="text-blue-700">
                          Si vous n'êtes pas satisfait, nous vous remboursons intégralement sous 30 jours ou vous
                          offrons une session de rattrapage gratuite.
                        </p>
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
