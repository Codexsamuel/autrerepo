"use client";

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Users, 
  ShoppingCart, 
  Camera, 
  MessageSquare, 
  Target,
  Star,
  Clock,
  Users as UsersIcon,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const formations = [
  {
    title: "Intelligence Artificielle pour Entreprises",
    description: "Maîtrisez l'IA pour transformer votre entreprise et automatiser vos processus",
    duration: "5 jours",
    level: "Intermédiaire",
    price: "€1,200",
    rating: 4.8,
    students: 156,
    features: [
      "Chatbots IA",
      "Machine Learning",
      "Automatisation",
      "Analyse prédictive",
      "Intégration API"
    ],
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    status: "active"
  },
  {
    title: "Marketing Digital & Réseaux Sociaux",
    description: "Développez votre présence en ligne et maîtrisez les stratégies digitales",
    duration: "4 jours",
    level: "Débutant",
    price: "€950",
    rating: 4.7,
    students: 203,
    features: [
      "Stratégies digitales",
      "Gestion réseaux sociaux",
      "Publicité en ligne",
      "Analytics",
      "Content marketing"
    ],
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    status: "active"
  },
  {
    title: "E-commerce & Vente en Ligne",
    description: "Créez et gérez votre boutique en ligne de A à Z",
    duration: "6 jours",
    level: "Tous niveaux",
    price: "€1,400",
    rating: 4.9,
    students: 89,
    features: [
      "Création boutique",
      "Gestion des paiements",
      "Logistique",
      "Marketing e-commerce",
      "Analytics ventes"
    ],
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    status: "active"
  },
  {
    title: "CRM & Gestion Client",
    description: "Optimisez votre relation client avec les meilleures pratiques CRM",
    duration: "3 jours",
    level: "Intermédiaire",
    price: "€750",
    rating: 4.6,
    students: 134,
    features: [
      "Stratégies CRM",
      "Automatisation",
      "Analytics client",
      "Intégrations",
      "Best practices"
    ],
    icon: Users,
    color: "from-orange-500 to-red-500",
    status: "active"
  },
  {
    title: "Création Visuelle & Design",
    description: "Créez des visuels professionnels pour vos supports marketing",
    duration: "4 jours",
    level: "Débutant",
    price: "€850",
    rating: 4.5,
    students: 167,
    features: [
      "Design graphique",
      "Outils créatifs",
      "Branding",
      "Supports marketing",
      "Templates"
    ],
    icon: Camera,
    color: "from-yellow-500 to-orange-500",
    status: "active"
  },
  {
    title: "Télévente & Prospection",
    description: "Développez vos compétences commerciales et techniques de vente",
    duration: "3 jours",
    level: "Tous niveaux",
    price: "€650",
    rating: 4.7,
    students: 98,
    features: [
      "Techniques de vente",
      "Prospection",
      "Gestion objections",
      "Closing",
      "Suivi client"
    ],
    icon: MessageSquare,
    color: "from-red-500 to-pink-500",
    status: "active"
  }
];

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Formations" description="Développez vos compétences avec nos formations spécialisées" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Formations Professionnelles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Développez vos compétences avec nos formations spécialisées en technologies 
            et stratégies digitales. Formations pratiques et certifiantes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">847</div>
            <div className="text-gray-600">Étudiants formés</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">6</div>
            <div className="text-gray-600">Formations disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.7</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {formations.map((formation, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${formation.color}`}>
                    <formation.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant={formation.status === 'active' ? 'default' : 'secondary'}>
                    {formation.status === 'active' ? 'Disponible' : 'Bientôt'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{formation.title}</CardTitle>
                <p className="text-gray-600 text-sm mb-4">{formation.description}</p>
                
                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{formation.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    {formation.students} étudiants
                  </div>
                </div>

                {/* Duration and Level */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formation.duration}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {formation.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formation.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-gray-900">{formation.price}</div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                      <Link href={`/formations/${formation.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        S'inscrire
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à développer vos compétences ?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Contactez-nous pour plus d'informations sur nos formations ou pour organiser 
            une session personnalisée pour votre équipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Demander un devis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">
                Formation sur mesure
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}