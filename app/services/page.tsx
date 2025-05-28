"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Users, Palette, Megaphone, Zap, CheckCircle, Star, Camera } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Users,
      title: "CRM NovaCore",
      description: "Plateforme CRM intelligente adaptée à votre secteur d'activité",
      features: [
        "CRM Hôtellerie avec gestion des réservations",
        "CRM Spa & Bien-être avec planning automatisé",
        "CRM Restaurant avec gestion des commandes",
        "CRM Community Manager avec analytics",
      ],
      price: "À partir de 49€/mois",
      popular: true,
    },
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Solutions IA personnalisées pour automatiser vos processus",
      features: [
        "Chatbots intelligents multilingues",
        "Analyse prédictive des ventes",
        "Automatisation des tâches répétitives",
        "Génération de contenu IA",
      ],
      price: "Sur devis",
      popular: false,
    },
    {
      icon: Palette,
      title: "Création Visuelle",
      description: "Designs modernes et impactants pour votre marque",
      features: [
        "Logo et identité visuelle complète",
        "Design de sites web responsive",
        "Supports marketing (flyers, cartes)",
        "Templates réseaux sociaux",
      ],
      price: "À partir de 150€",
      popular: false,
    },
    {
      icon: Camera,
      title: "Shooting Photo/Vidéo",
      description: "Contenus visuels professionnels pour vos communications",
      features: [
        "Shooting produits et corporate",
        "Vidéos promotionnelles",
        "Contenu pour réseaux sociaux",
        "Post-production et montage",
      ],
      price: "À partir de 300€",
      popular: false,
    },
    {
      icon: Megaphone,
      title: "Campagnes IA",
      description: "Campagnes marketing optimisées par intelligence artificielle",
      features: [
        "Ciblage intelligent des audiences",
        "Optimisation automatique des budgets",
        "A/B testing automatisé",
        "Reporting en temps réel",
      ],
      price: "À partir de 200€/mois",
      popular: false,
    },
    {
      icon: Zap,
      title: "Automatisation",
      description: "Automatisez vos processus métier pour gagner en efficacité",
      features: [
        "Workflows automatisés",
        "Intégrations API personnalisées",
        "Synchronisation des données",
        "Notifications intelligentes",
      ],
      price: "Sur devis",
      popular: false,
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Analyse de vos besoins",
      description: "Nous étudions votre activité et identifions les opportunités d'amélioration.",
    },
    {
      step: "02",
      title: "Proposition personnalisée",
      description: "Nous concevons une solution sur-mesure adaptée à vos objectifs.",
    },
    {
      step: "03",
      title: "Développement & Intégration",
      description: "Notre équipe développe et intègre la solution dans votre environnement.",
    },
    {
      step: "04",
      title: "Formation & Support",
      description: "Nous formons vos équipes et assurons un support continu.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-14 w-14 object-contain" />
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-800 hover:text-teal-600 transition-colors">
                Accueil
              </a>
              <a href="/a-propos" className="text-gray-800 hover:text-teal-600 transition-colors">
                À propos
              </a>
              <a href="/services" className="text-teal-600 font-medium">
                Services
              </a>
              <a href="/formations" className="text-gray-800 hover:text-teal-600 transition-colors">
                Formations
              </a>
              <a href="/portfolio" className="text-gray-800 hover:text-teal-600 transition-colors">
                Portfolio
              </a>
              <a href="/contact" className="text-gray-800 hover:text-teal-600 transition-colors">
                Contact
              </a>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700" asChild>
                <a href="/devis">Devis IA</a>
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
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
            <Badge className="mb-4 bg-teal-100 text-teal-700">Nos Services</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Solutions complètes pour votre{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                transformation digitale
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              De l'intelligence artificielle aux créations visuelles, nous proposons une gamme complète de services pour
              propulser votre entreprise vers le succès.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  service.popular ? "ring-2 ring-teal-500" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-teal-600">{service.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                      <a href="/devis">
                        Demander un devis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700">Notre Processus</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Comment nous{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                travaillons
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-teal-200 to-blue-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Obtenez un devis personnalisé et découvrez comment nos services peuvent transformer votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <a href="/devis">
                  Obtenir un devis gratuit
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="/rendez-vous">Planifier un RDV</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
