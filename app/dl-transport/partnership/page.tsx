'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BarChart3, Car, CheckCircle, CreditCard, FileText, Smartphone } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface PartnershipForm {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  vehicleCount: number;
  businessLicense: string;
  taxId: string;
  bankAccount: string;
}

export default function PartnershipPage() {
  const [formData, setFormData] = useState<PartnershipForm>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    vehicleCount: 1,
    businessLicense: '',
    taxId: '',
    bankAccount: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof PartnershipForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation de soumission
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    
    // Simulation de paiement
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL-Transport</h1>
                <p className="text-gray-600">Programme Partenariat</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Partenaire Premium
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Étapes */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Inscription</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Paiement</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Activation</span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Informations */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Inscription Partenaire</span>
                    </CardTitle>
                    <CardDescription>
                      Rejoignez DL-Transport en tant que partenaire et bénéficiez de notre plateforme complète
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de l'entreprise *
                          </label>
                          <Input
                            value={formData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            placeholder="Ex: Transport Express SARL"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom du propriétaire *
                          </label>
                          <Input
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange('ownerName', e.target.value)}
                            placeholder="Nom complet"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="contact@entreprise.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone *
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+237 XXX XXX XXX"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse complète *
                        </label>
                        <Input
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Adresse de l'entreprise"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de véhicules *
                          </label>
                          <Input
                            type="number"
                            min="1"
                            value={formData.vehicleCount}
                            onChange={(e) => handleInputChange('vehicleCount', parseInt(e.target.value))}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Licence commerciale *
                          </label>
                          <Input
                            value={formData.businessLicense}
                            onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                            placeholder="Numéro de licence"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Identifiant fiscal *
                          </label>
                          <Input
                            value={formData.taxId}
                            onChange={(e) => handleInputChange('taxId', e.target.value)}
                            placeholder="Numéro fiscal"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Compte bancaire *
                          </label>
                          <Input
                            value={formData.bankAccount}
                            onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                            placeholder="Numéro de compte"
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Traitement...' : 'Continuer vers le paiement'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Avantages */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avantages Partenaire</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Frais fixe mensuel</h4>
                        <p className="text-sm text-gray-600">50.000 FCFA seulement</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Aucun pourcentage</h4>
                        <p className="text-sm text-gray-600">Gardez 100% de vos bénéfices</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Application dédiée</h4>
                        <p className="text-sm text-gray-600">Dashboard personnalisé</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Support prioritaire</h4>
                        <p className="text-sm text-gray-600">Assistance 24/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documents requis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Licence commerciale</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Attestation fiscale</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Extrait Kbis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Justificatif bancaire</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Paiement des frais mensuels</span>
                  </CardTitle>
                  <CardDescription>
                    Effectuez le paiement de 50.000 FCFA pour activer votre compte partenaire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Frais mensuels</span>
                      <span className="text-2xl font-bold text-blue-600">50.000 FCFA</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Paiement unique pour le premier mois. Renouvellement automatique.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Méthodes de paiement</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">M</span>
                          </div>
                          <div>
                            <h5 className="font-medium">Mobile Money</h5>
                            <p className="text-sm text-gray-600">MTN, Orange, Moov</p>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">B</span>
                          </div>
                          <div>
                            <h5 className="font-medium">Virement bancaire</h5>
                            <p className="text-sm text-gray-600">Transfert direct</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Informations de paiement</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Banque:</span>
                        <span className="font-medium">BICEC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Compte:</span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bénéficiaire:</span>
                        <span className="font-medium">DL-Transport SARL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Référence:</span>
                        <span className="font-medium">PART-{formData.businessName.slice(0, 3).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment} 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Traitement du paiement...' : 'Confirmer le paiement'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto text-center">
              <Card>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Félicitations !</CardTitle>
                  <CardDescription>
                    Votre compte partenaire a été activé avec succès
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Compte activé</h4>
                    <p className="text-sm text-green-700">
                      Vous pouvez maintenant accéder à votre application partenaire
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Prochaines étapes</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">1</span>
                        </div>
                        <span className="text-sm">Téléchargez l'application partenaire</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">2</span>
                        </div>
                        <span className="text-sm">Connectez-vous avec vos identifiants</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">3</span>
                        </div>
                        <span className="text-sm">Configurez vos véhicules et chauffeurs</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Accès à votre application</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/dl-transport/partner/dashboard">
                        <Button className="w-full" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Dashboard Web
                        </Button>
                      </Link>
                      <Button className="w-full" variant="outline">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Télécharger l'App
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Support</h4>
                    <p className="text-sm text-blue-700">
                      Notre équipe vous contactera dans les 24h pour vous accompagner
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      Email: partenaires@dl-transport.com | Tél: +237 XXX XXX XXX
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 