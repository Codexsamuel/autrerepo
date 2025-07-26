import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Award,
    BookOpen,
    Bot,
    Building,
    Gamepad2,
    Home,
    Plane,
    Shield,
    ShoppingCart,
    Star,
    Target,
    TrendingUp,
    Truck,
    Users,
    Zap
} from "lucide-react";
import { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Services Principaux - DL Solutions | Davy & Lucie Solutions',
  description: 'Découvrez nos services principaux : DL Style (e-commerce), NovaWorld (réseau social), NovaCore (plateforme), DL-Immobilier, DL-Transport, IA & Trading. Solutions digitales innovantes au Cameroun.',
  keywords: 'DL Solutions, Davy, Lucie, services digitaux, e-commerce, réseau social, immobilier, transport, IA, trading, Cameroun, Yaoundé',
  openGraph: {
    title: 'Services Principaux - DL Solutions',
    description: 'Écosystème digital complet avec e-commerce, réseau social, immobilier, transport et IA',
    type: 'website',
    url: 'https://dlsolutions.com/services',
    images: ['/images/services-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Principaux - DL Solutions',
    description: 'Écosystème digital complet avec e-commerce, réseau social, immobilier, transport et IA',
    images: ['/images/services-og.jpg'],
  },
  alternates: {
    canonical: 'https://dlsolutions.com/services',
  },
};

const services = [
  {
    id: 'dl-style',
    name: 'DL Style',
    description: 'Boutique en ligne premium avec électronique, mode, maison',
    icon: ShoppingCart,
    color: 'bg-blue-600',
    features: ['Livraison gratuite', 'Garantie 2 ans', 'Paiement sécurisé', 'Support 24/7'],
    url: '/dl-style',
    badge: 'E-commerce',
    priority: 'high'
  },
  {
    id: 'novaworld',
    name: 'NovaWorld',
    description: 'Réseau social professionnel avec gestion d\'entreprise et emplois',
    icon: Users,
    color: 'bg-purple-600',
    features: ['Networking professionnel', 'Gestion d\'entreprise', 'Offres d\'emploi', 'Collaboration'],
    url: '/novaworld',
    badge: 'Réseau Social',
    priority: 'high'
  },
  {
    id: 'novacore',
    name: 'NovaCore',
    description: 'Plateforme d\'intégration complète pour CRM, ERP, e-commerce',
    icon: Building,
    color: 'bg-green-600',
    features: ['CRM intégré', 'ERP complet', 'E-commerce', 'Analytics avancés'],
    url: '/novacore',
    badge: 'Plateforme',
    priority: 'high'
  },
  {
    id: 'dl-immobilier',
    name: 'DL-Immobilier',
    description: 'Plateforme immobilière avec IA et visites virtuelles',
    icon: Home,
    color: 'bg-orange-600',
    features: ['IA intelligente', 'Visites 360°', 'Gestion propriétaires', 'Recherche avancée'],
    url: '/dl-immobilier',
    badge: 'Immobilier',
    priority: 'high'
  },
  {
    id: 'dl-transport',
    name: 'DL-Transport',
    description: 'Solutions de transport et logistique intelligentes',
    icon: Truck,
    color: 'bg-red-600',
    features: ['Livraison rapide', 'Suivi GPS', 'Optimisation routes', 'Support client'],
    url: '/dl-transport',
    badge: 'Transport',
    priority: 'medium'
  },
  {
    id: 'dl-travel',
    name: 'DL-Travel',
    description: 'Agence de voyage avec réservations et conseils personnalisés',
    icon: Plane,
    color: 'bg-cyan-600',
    features: ['Réservations', 'Conseils IA', 'Prix compétitifs', 'Assistance voyage'],
    url: '/dl-travel',
    badge: 'Voyage',
    priority: 'medium'
  },
  {
    id: 'trading',
    name: 'Trading & Finance',
    description: 'Plateforme de trading avec analyses et signaux IA',
    icon: TrendingUp,
    color: 'bg-emerald-600',
    features: ['Trading automatisé', 'Analyses IA', 'Signaux en temps réel', 'Gestion risques'],
    url: '/trading',
    badge: 'Finance',
    priority: 'medium'
  },
  {
    id: 'ai-chatbot',
    name: 'IA & Chatbot',
    description: 'Solutions d\'intelligence artificielle personnalisées',
    icon: Bot,
    color: 'bg-indigo-600',
    features: ['Chatbots IA', 'Automatisation', 'Analyse prédictive', 'Support client'],
    url: '/ai-chatbot',
    badge: 'IA',
    priority: 'medium'
  },
  {
    id: 'formations',
    name: 'Formations',
    description: 'Formations professionnelles certifiantes en ligne',
    icon: BookOpen,
    color: 'bg-pink-600',
    features: ['Certifications', 'Formation continue', 'Support pédagogique', 'Suivi progrès'],
    url: '/formations',
    badge: 'Formation',
    priority: 'medium'
  },
  {
    id: 'dl-paris-sportif',
    name: 'DL Paris Sportif',
    description: 'Plateforme de paris sportifs avec analyses IA',
    icon: Gamepad2,
    color: 'bg-yellow-600',
    features: ['Analyses IA', 'Cotes compétitives', 'Paiements rapides', 'Support 24/7'],
    url: '/dl-paris-sportif',
    badge: 'Paris Sportifs',
    priority: 'low'
  }
];

export default function ServicesPage() {
  const highPriorityServices = services.filter(s => s.priority === 'high');
  const mediumPriorityServices = services.filter(s => s.priority === 'medium');
  const lowPriorityServices = services.filter(s => s.priority === 'low');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Nos Services Principaux
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Découvrez l'écosystème digital complet de DL Solutions par Davy et Lucie. 
            Des solutions innovantes pour tous vos besoins numériques.
          </p>
          <div className="flex justify-center mt-8 space-x-4">
            <Badge variant="secondary" className="text-sm">
              <Star className="h-3 w-3 mr-1" />
              Services Premium
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              Sécurisé
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Zap className="h-3 w-3 mr-1" />
              Innovation
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Services Prioritaires */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services Principaux
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos services phares qui transforment votre expérience digitale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highPriorityServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {service.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {service.description}
                  </CardDescription>
                  <ul className="text-sm text-gray-500 space-y-1 mb-6">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center justify-center">
                        <Target className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.url}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Découvrir
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Secondaires */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services Spécialisés
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des solutions adaptées à vos besoins spécifiques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediumPriorityServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className={`w-14 h-14 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto text-xs">
                    {service.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 text-sm">
                    {service.description}
                  </CardDescription>
                  <Link href={service.url}>
                    <Button variant="outline" className="w-full">
                      En savoir plus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Additionnels */}
        {lowPriorityServices.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Services Additionnels
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des services complémentaires pour enrichir votre expérience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lowPriorityServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-base font-bold text-gray-900">
                      {service.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto text-xs">
                      {service.badge}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </CardDescription>
                    <Link href={service.url}>
                      <Button variant="ghost" className="w-full">
                        Découvrir
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre business ?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez l'écosystème DL Solutions et bénéficiez de nos services innovants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Users className="mr-2 h-5 w-5" />
                Nous Contacter
              </Button>
            </Link>
            <Link href="/devis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Award className="mr-2 h-5 w-5" />
                Demander un Devis
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
