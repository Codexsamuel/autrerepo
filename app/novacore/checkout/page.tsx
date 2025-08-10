"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, CreditCard, Crown, Lock, Shield, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

const subscriptionPlans: { [key: string]: SubscriptionPlan } = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 99,
    period: '/mois',
    features: [
      'Gestion de base des contacts',
      'Suivi des transactions',
      'Rapports mensuels',
      'Support email',
      '1 utilisateur',
      'Stockage 5GB'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 299,
    originalPrice: 399,
    period: '/mois',
    features: [
      'Toutes les fonctionnalités Starter',
      'Gestion avancée des leads',
      'Automatisation des tâches',
      'Support prioritaire',
      '5 utilisateurs',
      'Formation incluse',
      'Stockage 25GB',
      'API de base'
    ],
    popular: true,
    savings: '25% d\'économie'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    period: 'Sur mesure',
    features: [
      'Toutes les fonctionnalités Professional',
      'API personnalisée',
      'Intégration sur mesure',
      'Support 24/7',
      'Utilisateurs illimités',
      'Formation dédiée',
      'SLA garanti',
      'Stockage illimité',
      'Déploiement cloud'
    ]
  }
};

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export default function NovaCoreCheckoutPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'professional';
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(subscriptionPlans.professional);
  const [isAnnual, setIsAnnual] = useState(true);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'France',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (planParam && subscriptionPlans[planParam]) {
      setSelectedPlan(subscriptionPlans[planParam]);
    }
  }, [planParam]);

  const getAnnualPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.8); // 20% de réduction
  };

  const getAnnualOriginalPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12;
  };

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions générales');
      return;
    }

    // Pour le plan Enterprise, rediriger vers le formulaire de contact
    if (selectedPlan.name === 'Enterprise') {
      window.location.href = '/contact?plan=enterprise&source=novacore';
      return;
    }

    setIsProcessing(true);
    
    // Simulation du traitement du paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Ici, vous intégreriez votre logique de paiement réelle
    // Stripe, PayPal, etc.
    
    setIsProcessing(false);
    alert('Paiement traité avec succès ! Vous recevrez un email de confirmation.');
  };

  const currentPrice = isAnnual ? getAnnualPrice(selectedPlan.price) : selectedPlan.price;
  const currentOriginalPrice = isAnnual && selectedPlan.originalPrice ? getAnnualOriginalPrice(selectedPlan.originalPrice) : selectedPlan.originalPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/novacore/pricing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux tarifs
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Finaliser votre abonnement</h1>
                <p className="text-sm text-gray-600">Plan {selectedPlan.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Informations de paiement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informations de facturation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Adresse de facturation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="billingAddress">Adresse *</Label>
                        <Input
                          id="billingAddress"
                          value={formData.billingAddress}
                          onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCity">Ville *</Label>
                        <Input
                          id="billingCity"
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingPostalCode">Code postal *</Label>
                        <Input
                          id="billingPostalCode"
                          value={formData.billingPostalCode}
                          onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCountry">Pays *</Label>
                        <select
                          id="billingCountry"
                          value={formData.billingCountry}
                          onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          required
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Canada">Canada</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Informations de carte */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informations de carte bancaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Numéro de carte *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Date d'expiration *</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardholderName">Nom sur la carte *</Label>
                        <Input
                          id="cardholderName"
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1"
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        J'accepte les <Link href="/terms" className="text-blue-600 hover:underline">conditions générales</Link> et la{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</Link> *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onChange={(e) => handleInputChange('acceptMarketing', e.target.checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptMarketing" className="text-sm">
                        J'accepte de recevoir des communications marketing (optionnel)
                      </Label>
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Traitement en cours...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Payer et activer l'abonnement</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Résumé de votre abonnement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan sélectionné */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {selectedPlan.name === 'Starter' && <Zap className="h-5 w-5 text-blue-600" />}
                    {selectedPlan.name === 'Professional' && <Users className="h-5 w-5 text-purple-600" />}
                    {selectedPlan.name === 'Enterprise' && <Crown className="h-5 w-5 text-yellow-600" />}
                    <h3 className="font-semibold">{selectedPlan.name}</h3>
                  </div>
                  
                  {selectedPlan.name === 'Enterprise' ? (
                    <div className="text-2xl font-bold text-gray-900">Sur mesure</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {isAnnual ? `${currentPrice}€` : `${selectedPlan.price}€`}
                        </span>
                        <span className="text-gray-600">
                          {isAnnual ? '/an' : selectedPlan.period}
                        </span>
                      </div>
                      {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {currentOriginalPrice}€
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Fonctionnalités */}
                <div>
                  <h4 className="font-semibold mb-3">Fonctionnalités incluses</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sélecteur annuel/mensuel */}
                {selectedPlan.name !== 'Enterprise' && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Période de facturation</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="billingPeriod"
                          checked={!isAnnual}
                          onChange={() => setIsAnnual(false)}
                          className="text-blue-600"
                        />
                        <div>
                          <div className="font-medium">Mensuel</div>
                          <div className="text-sm text-gray-600">{selectedPlan.price}€/mois</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="billingPeriod"
                          checked={isAnnual}
                          onChange={() => setIsAnnual(true)}
                          className="text-blue-600"
                        />
                        <div>
                          <div className="font-medium">Annuel</div>
                          <div className="text-sm text-gray-600">
                            {getAnnualPrice(selectedPlan.price)}€/an
                            <Badge variant="secondary" className="ml-2">-20%</Badge>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Sécurité */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Paiement sécurisé</h4>
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Chiffrement SSL 256-bit</div>
                    <div>• Conformité PCI DSS</div>
                    <div>• Protection des données</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 