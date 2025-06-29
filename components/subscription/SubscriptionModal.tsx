'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  X, 
  Building2, 
  Upload, 
  Check, 
  Star,
  CreditCard,
  Key,
  Zap,
  Shield,
  Users,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

interface CompanyInfo {
  name: string;
  logo?: string;
  industry: string;
  size: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice: number;
  features: string[];
  popular?: boolean;
  savings?: string;
}

export default function SubscriptionModal({ 
  isOpen, 
  onClose, 
  onSubscribe 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubscribe: (plan: SubscriptionPlan, companyInfo: CompanyInfo) => void;
}) {
  const [step, setStep] = useState<'company' | 'plan' | 'payment'>('company');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    industry: '',
    size: '',
    email: '',
    phone: '',
    address: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const plans: SubscriptionPlan[] = [
    {
      id: 'direct-access',
      name: 'Accès Direct',
      duration: 'Accès immédiat',
      price: 0,
      originalPrice: 0,
      features: [
        'Accès complet à tous les modules',
        'Support prioritaire',
        'Formation personnalisée',
        'Intégration sur mesure'
      ]
    },
    {
      id: '3months',
      name: 'Plan 3 Mois',
      duration: '3 mois renouvelable',
      price: 210, // -30% de 300€
      originalPrice: 300,
      features: [
        'Tous les modules CRM',
        'Support par email et chat',
        'Mises à jour incluses',
        'Sauvegarde automatique'
      ],
      savings: 'Économisez 90€'
    },
    {
      id: '1year',
      name: 'Plan Annuel',
      duration: '1 an renouvelable',
      price: 840, // -30% de 1200€
      originalPrice: 1200,
      features: [
        'Tous les modules CRM',
        'Support prioritaire 24/7',
        'Formation gratuite',
        'Personnalisation avancée',
        'API dédiée',
        'Sauvegarde cloud'
      ],
      popular: true,
      savings: 'Économisez 360€'
    }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanySubmit = () => {
    if (companyInfo.name && companyInfo.email && companyInfo.industry) {
      setStep('plan');
    }
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    if (plan.id === 'direct-access') {
      // Accès direct - pas besoin de paiement
      onSubscribe(plan, companyInfo);
    } else {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    if (selectedPlan) {
      onSubscribe(selectedPlan, companyInfo);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold">Souscription EZEE Optimus</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'company' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'company' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm font-medium">Entreprise</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'plan' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'plan' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Plan</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-sm font-medium">Paiement</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Company Information */}
          {step === 'company' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Informations de votre entreprise</h3>
                <p className="text-gray-600">Personnalisez votre expérience EZEE Optimus</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Nom de l'entreprise *</Label>
                    <Input
                      id="company-name"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                      placeholder="Ex: Ma Société SARL"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Secteur d'activité *</Label>
                    <select
                      id="industry"
                      value={companyInfo.industry}
                      onChange={(e) => setCompanyInfo({...companyInfo, industry: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Sélectionnez un secteur</option>
                      <option value="hotel">Hôtellerie</option>
                      <option value="restaurant">Restauration</option>
                      <option value="immobilier">Immobilier</option>
                      <option value="assurance">Assurance</option>
                      <option value="banque">Banque</option>
                      <option value="trading">Trading</option>
                      <option value="commerce">Commerce</option>
                      <option value="services">Services</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="size">Taille de l'entreprise</Label>
                    <select
                      id="size"
                      value={companyInfo.size}
                      onChange={(e) => setCompanyInfo({...companyInfo, size: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Sélectionnez la taille</option>
                      <option value="1-10">1-10 employés</option>
                      <option value="11-50">11-50 employés</option>
                      <option value="51-200">51-200 employés</option>
                      <option value="201-1000">201-1000 employés</option>
                      <option value="1000+">1000+ employés</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                      placeholder="contact@entreprise.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                      placeholder="https://www.entreprise.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea
                      id="address"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                      placeholder="Adresse complète de l'entreprise"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Logo de l'entreprise</Label>
                    <div className="mt-2">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={logoPreview} />
                          <AvatarFallback>
                            {companyInfo.name ? companyInfo.name.charAt(0) : 'L'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label htmlFor="logo-upload">
                            <Button variant="outline" size="sm" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Choisir un logo
                            </Button>
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG jusqu'à 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCompanySubmit} disabled={!companyInfo.name || !companyInfo.email || !companyInfo.industry}>
                  Continuer
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {step === 'plan' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Choisissez votre plan</h3>
                <p className="text-gray-600">Profitez de nos tarifs préférentiels (-30% vs EZEE Absolute)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-center">{plan.name}</CardTitle>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {plan.price === 0 ? 'Gratuit' : `€${plan.price}`}
                        </div>
                        {plan.originalPrice > plan.price && (
                          <div className="text-sm text-gray-500 line-through">
                            €{plan.originalPrice}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">{plan.duration}</div>
                        {plan.savings && (
                          <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {plan.id === 'direct-access' ? 'Accéder maintenant' : 'Choisir ce plan'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Garantie satisfait ou remboursé</h4>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  30 jours pour tester EZEE Optimus. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && selectedPlan && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Finaliser votre souscription</h3>
                <p className="text-gray-600">Plan {selectedPlan.name} - {selectedPlan.duration}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Informations de paiement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Numéro de carte</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="card-name">Nom sur la carte</Label>
                      <Input id="card-name" placeholder="Jean Dupont" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Récapitulatif</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Plan {selectedPlan.name}</span>
                        <span>€{selectedPlan.price}</span>
                      </div>
                      {selectedPlan.originalPrice > selectedPlan.price && (
                        <div className="flex justify-between text-green-600">
                          <span>Économies</span>
                          <span>-€{selectedPlan.originalPrice - selectedPlan.price}</span>
                        </div>
                      )}
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>€{selectedPlan.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Paiement sécurisé SSL</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Facturation automatique</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Annulation à tout moment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep('plan')}>
                  Retour
                </Button>
                <Button onClick={handlePayment}>
                  Payer et activer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 