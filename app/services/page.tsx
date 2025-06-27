"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Users, Palette, Megaphone, Zap, CheckCircle, Star, Camera, ShoppingCart, Building2, TrendingUp, Shield, Globe, Smartphone, Video, Database, Target } from "lucide-react"
import { Header } from '@/components/layout/header'
import Link from 'next/link'

const services = [
  {
    title: "Intelligence Artificielle",
    description: "Solutions IA personnalisées pour automatiser et optimiser vos processus métier",
    icon: Brain,
    features: ["Chatbots IA", "Analyse prédictive", "Automatisation", "Machine Learning"],
    status: "active",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "E-commerce & Vente",
    description: "Plateformes e-commerce complètes avec gestion des paiements et analytics",
    icon: ShoppingCart,
    features: ["Boutiques en ligne", "Paiements sécurisés", "Gestion des stocks", "Marketing automation"],
    status: "active",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "CRM & Gestion Client",
    description: "Systèmes de gestion de la relation client adaptés à votre secteur",
    icon: Users,
    features: ["Gestion des contacts", "Suivi des ventes", "Automatisation", "Analytics"],
    status: "active",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Solutions Sectorielles",
    description: "CRM/ERP spécialisés pour l'immobilier, la banque, l'hôtellerie et plus",
    icon: Building2,
    features: ["Immobilier", "Banque", "Hôtellerie", "Assurance"],
    status: "active",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Trading & Finance",
    description: "Plateformes de trading automatisées avec IA et gestion des risques",
    icon: TrendingUp,
    features: ["Trading automatisé", "IA prédictive", "Gestion des risques", "Analytics avancés"],
    status: "active",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Sécurité & Conformité",
    description: "Solutions de cybersécurité et conformité réglementaire",
    icon: Shield,
    features: ["Audit de sécurité", "Conformité RGPD", "Chiffrement", "Monitoring"],
    status: "active",
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Développement Web",
    description: "Sites web et applications sur mesure avec technologies modernes",
    icon: Globe,
    features: ["Sites responsives", "Applications web", "APIs", "Maintenance"],
    status: "active",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Applications Mobiles",
    description: "Applications iOS et Android natives et cross-platform",
    icon: Smartphone,
    features: ["iOS & Android", "React Native", "Flutter", "PWA"],
    status: "active",
    color: "from-teal-500 to-blue-500"
  },
  {
    title: "Édition Vidéo IA",
    description: "Outils d'édition vidéo assistés par intelligence artificielle",
    icon: Video,
    features: ["Édition automatique", "IA générative", "Templates", "Export multi-format"],
    status: "active",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Bases de Données",
    description: "Conception et optimisation de bases de données performantes",
    icon: Database,
    features: ["Architecture DB", "Optimisation", "Migration", "Maintenance"],
    status: "active",
    color: "from-gray-500 to-slate-500"
  },
  {
    title: "Intégrations API",
    description: "Connexion et synchronisation entre vos différents outils",
    icon: Zap,
    features: ["APIs REST", "Webhooks", "Synchronisation", "Monitoring"],
    status: "active",
    color: "from-amber-500 to-yellow-500"
  },
  {
    title: "Formation & Consulting",
    description: "Formation de vos équipes et accompagnement stratégique",
    icon: Target,
    features: ["Formation sur mesure", "Consulting", "Accompagnement", "Support"],
    status: "active",
    color: "from-emerald-500 to-green-500"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Services" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services Intelligents
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services technologiques pour transformer 
            votre entreprise et accélérer votre croissance digitale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color}`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                    {service.status === 'active' ? 'Actif' : 'Bêta'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/contact">
                      En savoir plus
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Contactez-nous pour discuter de vos besoins et découvrir comment nos solutions 
            peuvent vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Demander un devis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/formations">
                Nos formations
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
