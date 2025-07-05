"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Clock,
    Construction,
    ExternalLink,
    Home,
    Mail,
    Phone,
    TrendingUp,
    Users
} from 'lucide-react';
import Link from 'next/link';

interface DevelopmentPageProps {
  title?: string;
  description?: string;
  estimatedCompletion?: string;
  features?: string[];
  relatedPages?: { name: string; href: string }[];
}

export default function DevelopmentPage({
  title = "Page en cours de développement",
  description = "Cette fonctionnalité est actuellement en cours de développement par notre équipe.",
  estimatedCompletion = "2-3 semaines",
  features = [
    "Interface utilisateur moderne",
    "Fonctionnalités avancées",
    "Intégration IA",
    "Analytics en temps réel"
  ],
  relatedPages = []
}: DevelopmentPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Construction className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Estimation: {estimatedCompletion}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Équipe: 3 développeurs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Fonctionnalités à venir */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Fonctionnalités à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" variant="outline">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button asChild className="w-full" variant="outline">
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Nous contacter
                </Link>
              </Button>

              <Button asChild className="w-full" variant="outline">
                <Link href="/services">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Voir nos services
                </Link>
              </Button>

              {relatedPages.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Pages similaires</h4>
                  <div className="space-y-2">
                    {relatedPages.map((page, index) => (
                      <Link
                        key={index}
                        href={page.href}
                        className="block p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact d'urgence */}
        <Card className="mt-8 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Besoin urgent de cette fonctionnalité ?</h3>
              <p className="text-gray-600 mb-6">
                Contactez-nous directement pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="tel:+237694341586">
                    <Phone className="h-4 w-4 mr-2" />
                    +237 694 341 586
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="mailto:sobam@daveandlucesolutions.com">
                    <Mail className="h-4 w-4 mr-2" />
                    sobam@daveandlucesolutions.com
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badge de statut */}
        <div className="text-center mt-8">
          <Badge variant="secondary" className="text-sm">
            <Construction className="h-3 w-3 mr-1" />
            En développement
          </Badge>
        </div>
      </div>
    </div>
  );
} 