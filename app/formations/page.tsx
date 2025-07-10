"use client";

import AdvancedSEO from '@/components/AdvancedSEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllFormations } from '@/lib/data/formations';
import {
    ArrowRight,
    Award,
    Brain,
    Camera,
    CheckCircle,
    Clock,
    MapPin,
    MessageSquare,
    Play,
    ShoppingCart,
    Star,
    Target,
    Users,
    Users as UsersIcon
} from 'lucide-react';
import Link from 'next/link';

export default function FormationsPage() {
  const formations = getAllFormations();

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Brain,
      Users,
      ShoppingCart,
      Camera,
      MessageSquare,
      Target
    };
    return icons[iconName] || Brain;
  };

  return (
    <>
      <AdvancedSEO
        title="Formations Professionnelles - DL Solutions"
        description="Formations certifiantes en télévente, marketing digital, e-commerce, IA, CRM. Développez vos compétences avec nos experts."
        keywords="formations, télévente, marketing digital, e-commerce, IA, CRM, certification, DL Solutions"
        image="https://dlsolutions.com/images/formations-og.jpg"
        url="https://dlsolutions.com/formations"
        type="website"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'Formations', url: 'https://dlsolutions.com/formations' }
        ]}
        faq={[
          {
            question: "Les formations sont-elles certifiantes ?",
            answer: "Oui, toutes nos formations délivrent une certification reconnue par l'industrie."
          },
          {
            question: "Peut-on suivre les formations à distance ?",
            answer: "Oui, nous proposons des formations en présentiel et en ligne selon vos préférences."
          },
          {
            question: "Y a-t-il un support post-formation ?",
            answer: "Oui, nous offrons un support personnalisé pendant 3 mois après la formation."
          }
        ]}
        course={{
          name: 'Catalogue Formations DL Solutions',
          description: 'Formations professionnelles certifiantes dans tous les domaines du digital',
          provider: 'DL Solutions',
          instructor: 'Experts certifiés',
          duration: '18-40 heures',
          price: '299-699',
          currency: 'EUR'
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Formations Professionnelles</h1>
              <p className="text-xl opacity-90 mb-8">
                Développez vos compétences avec nos formations certifiantes animées par des experts
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center justify-center">
                  <Award className="w-6 h-6 mr-2" />
                  <span>Certifications reconnues</span>
                </div>
                <div className="flex items-center justify-center">
                  <Users className="w-6 h-6 mr-2" />
                  <span>+300 participants</span>
                </div>
                <div className="flex items-center justify-center">
                  <Star className="w-6 h-6 mr-2" />
                  <span>4.8/5 satisfaction</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  <span>Paris & En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation) => (
              <Card key={formation.slug} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${formation.color} text-white`}>
                      {formation.status === 'active' ? 'Disponible' : 'Bientôt'}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">€{formation.price}</div>
                      {formation.originalPrice > formation.price && (
                        <div className="text-sm text-gray-500 line-through">€{formation.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {formation.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {formation.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <span>{formation.students} étudiants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>{formation.rating}/5</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
                    <ul className="space-y-2">
                      {formation.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                      {formation.features.length > 3 && (
                        <li className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          +{formation.features.length - 3} autres
                        </li>
                      )}
                    </ul>
                  </div>

                  <Link href={`/formations/${formation.slug}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group">
                      <Play className="w-4 h-4 mr-2" />
                      Voir la formation
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}