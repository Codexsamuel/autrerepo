'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard, Home, Shield, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LocataireInscriptionPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    budget: '',
    typeBien: '',
    ville: '',
    quartier: '',
    accepteConditions: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription
    console.log('Inscription locataire:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inscription Locataire
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez DL-Immobilier et trouvez votre logement idéal avec notre IA intelligente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulaire d'inscription */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Créer votre compte
              </CardTitle>
              <CardDescription>
                Frais d'inscription : 5.000 FCFA (inscription + 2 mois d'abonnement)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget mensuel (FCFA) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    required
                    className="mt-1"
                    placeholder="Ex: 150000"
                  />
                </div>

                <div>
                  <Label htmlFor="typeBien">Type de bien recherché *</Label>
                  <select
                    id="typeBien"
                    value={formData.typeBien}
                    onChange={(e) => setFormData({...formData, typeBien: e.target.value})}
                    required
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="bureau">Bureau/Local commercial</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({...formData, ville: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Ex: Douala, Yaoundé"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quartier">Quartier souhaité</Label>
                    <Input
                      id="quartier"
                      value={formData.quartier}
                      onChange={(e) => setFormData({...formData, quartier: e.target.value})}
                      className="mt-1"
                      placeholder="Ex: Akwa, Bonanjo"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="conditions"
                    checked={formData.accepteConditions}
                    onCheckedChange={(checked) => setFormData({...formData, accepteConditions: checked as boolean})}
                    required
                  />
                  <Label htmlFor="conditions" className="text-sm">
                    J'accepte les conditions d'utilisation et la politique de confidentialité
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <User className="mr-2 h-4 w-4" />
                  S'inscrire (5.000 FCFA)
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations et avantages */}
          <div className="space-y-6">
            {/* Avantages */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Ce qui est inclus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Accès à tous nos biens immobiliers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Chatbot IA personnalisé pour vos recherches</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Visites virtuelles 360° des biens</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Support client 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Notifications personnalisées</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>2 mois d'abonnement inclus</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Informations de paiement */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  Informations de paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Mobile Money</h4>
                    <p className="font-mono text-lg bg-white p-2 rounded border">694341586</p>
                    <p className="text-sm text-blue-700 mt-1">Orange Money / MTN Mobile Money</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Compte Bancaire</h4>
                    <p className="font-mono text-sm bg-white p-2 rounded border">10039100290027774160164</p>
                    <p className="text-sm text-green-700 mt-1">CCA Bank - DAVE AND LUCE SOLUTIONS SARL</p>
                    <p className="text-xs text-green-600">Ngoa Ekelle, Yaoundé</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-5 w-5 text-purple-600 mr-2" />
                  Sécurité garantie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-purple-500 mr-3" />
                    <span className="text-sm">Paiement sécurisé SSL</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-purple-500 mr-3" />
                    <span className="text-sm">Données personnelles protégées</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-purple-500 mr-3" />
                    <span className="text-sm">Vérification d'identité</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Déjà inscrit ? 
            <Link href="/dl-immobilier/chatbot" className="text-blue-600 hover:text-blue-700 ml-1">
              Parlez à notre IA
            </Link>
          </p>
          <Link href="/dl-immobilier">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Retour à DL-Immobilier
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 