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
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { getAllFormations } from '@/lib/data/formations';
import Image from 'next/image';

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
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formations.reduce((acc, f) => acc + f.students, 0)}
            </div>
            <div className="text-gray-600">Étudiants formés</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{formations.length}</div>
            <div className="text-gray-600">Formations disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(formations.reduce((acc, f) => acc + f.rating, 0) / formations.length).toFixed(1)}
            </div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {formations.map((formation, index) => {
            const IconComponent = getIconComponent(formation.icon);
            return (
              <Card key={formation.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Image de la formation */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={formation.image}
                    alt={formation.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant={formation.status === 'active' ? 'default' : 'secondary'} className="mb-2">
                      {formation.status === 'active' ? 'Disponible' : 'Bientôt'}
                    </Badge>
                    <h3 className="text-white font-semibold text-lg">{formation.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{formation.description}</p>
                  
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {formation.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formation.level}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {formation.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {formation.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{formation.features.length - 3} autres
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">€{formation.price}</span>
                      {formation.originalPrice > formation.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">€{formation.originalPrice}</span>
                      )}
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${formation.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/formations/${formation.slug}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Voir les détails
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
          <p className="text-xl mb-6 opacity-90">
            Rejoignez nos formations et transformez votre carrière professionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Nous contacter
              </Button>
            </Link>
            <Link href="/devis">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}