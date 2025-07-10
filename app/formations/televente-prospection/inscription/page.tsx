'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, CheckCircle, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InscriptionPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    poste: '',
    experience: '',
    motivation: '',
    questions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const courseInfo = {
    title: 'Télévente & Prospection',
    price: 499,
    originalPrice: 650,
    duration: '32 heures',
    startDate: '2024-02-20',
    location: 'Paris & En ligne',
    maxStudents: 25,
    currentStudents: 48
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Inscription envoyée !",
        description: "Nous vous recontacterons dans les 24h pour confirmer votre inscription.",
      });

      // Rediriger vers la page de confirmation
      window.location.href = '/formations/televente-prospection/confirmation';
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/formations/televente-prospection" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la formation
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription à la formation</h1>
          <p className="text-gray-600">Télévente & Prospection - Maîtrisez les techniques de vente à distance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire pour vous inscrire à la formation. Tous les champs marqués d'un * sont obligatoires.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations de base */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Informations professionnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entreprise">Entreprise</Label>
                      <Input
                        id="entreprise"
                        value={formData.entreprise}
                        onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="poste">Poste actuel</Label>
                      <Input
                        id="poste"
                        value={formData.poste}
                        onChange={(e) => setFormData({...formData, poste: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Expérience en vente</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="Décrivez votre expérience actuelle en vente ou télévente..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Motivation pour cette formation *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      placeholder="Pourquoi souhaitez-vous suivre cette formation ? Quels sont vos objectifs ?"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="questions">Questions ou demandes particulières</Label>
                    <Textarea
                      id="questions"
                      value={formData.questions}
                      onChange={(e) => setFormData({...formData, questions: e.target.value})}
                      placeholder="Avez-vous des questions spécifiques ou des demandes particulières ?"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande d\'inscription'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec informations */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Résumé de la formation */}
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Prix</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{courseInfo.price}€</div>
                      <div className="text-sm text-gray-400 line-through">{courseInfo.originalPrice}€</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{courseInfo.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Début : {new Date(courseInfo.startDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{courseInfo.currentStudents} participants inscrits</span>
                  </div>
                </CardContent>
              </Card>

              {/* Ce qui est inclus */}
              <Card>
                <CardHeader>
                  <CardTitle>Ce qui est inclus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Certification reconnue</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Accès à vie au contenu</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Support personnalisé</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Outils et templates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm">Suivi post-formation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Notre équipe est là pour vous accompagner dans votre inscription.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span>📧 formations@dlsolutions.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span>📞 +33 1 23 45 67 89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 