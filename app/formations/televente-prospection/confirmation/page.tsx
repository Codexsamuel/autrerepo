'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, CheckCircle, Clock, Download, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  const courseInfo = {
    title: 'Télévente & Prospection',
    startDate: '2024-02-20',
    duration: '32 heures',
    location: 'Paris & En ligne',
    instructor: 'Samuel OBAM'
  };

  const nextSteps = [
    {
      icon: Mail,
      title: 'Email de confirmation',
      description: 'Vous recevrez un email de confirmation dans les prochaines minutes avec tous les détails.'
    },
    {
      icon: Calendar,
      title: 'Planning détaillé',
      description: 'Un planning complet vous sera envoyé 1 semaine avant le début de la formation.'
    },
    {
      icon: Phone,
      title: 'Appel de bienvenue',
      description: 'Notre équipe vous appellera dans les 48h pour vous accueillir et répondre à vos questions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header de confirmation */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Inscription confirmée !
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Félicitations ! Votre inscription à la formation <strong>{courseInfo.title}</strong> a été enregistrée avec succès.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de la formation */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Détails de votre formation</CardTitle>
                  <CardDescription>
                    Voici un récapitulatif de votre inscription
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">Date de début</div>
                        <div className="text-gray-600">{new Date(courseInfo.startDate).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">Durée</div>
                        <div className="text-gray-600">{courseInfo.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">Lieu</div>
                        <div className="text-gray-600">{courseInfo.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">Formateur</div>
                        <div className="text-gray-600">{courseInfo.instructor}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prochaines étapes */}
              <Card>
                <CardHeader>
                  <CardTitle>Prochaines étapes</CardTitle>
                  <CardDescription>
                    Voici ce qui va se passer dans les prochains jours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Actions rapides */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger le programme
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Contacter l'équipe
                    </Button>
                    <Link href="/formations" className="w-full">
                      <Button className="w-full" variant="outline">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Voir nos autres formations
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Contact d'urgence */}
                <Card>
                  <CardHeader>
                    <CardTitle>Besoin d'aide ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Notre équipe est disponible pour vous accompagner.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>formations@dlsolutions.com</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>+33 1 23 45 67 89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Réseaux sociaux */}
                <Card>
                  <CardHeader>
                    <CardTitle>Restez connecté</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Suivez-nous pour des conseils et actualités.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        LinkedIn
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Twitter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center mt-12">
            <Link href="/formations">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <ArrowRight className="w-5 h-5 mr-2" />
                Découvrir nos autres formations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 