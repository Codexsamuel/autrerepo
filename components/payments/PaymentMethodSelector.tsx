'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Smartphone, 
  Globe, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

// Types de moyens de paiement
export enum PaymentMethod {
  STRIPE = 'stripe',
  ORANGE_MONEY = 'orange_money',
  MOMO = 'momo',
  BANK_TRANSFER = 'bank_transfer'
}

// Interface des moyens de paiement
export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  countries: string[];
  currencies: string[];
  processingTime: string;
  fees: string;
  minAmount: number;
  maxAmount: number;
}

// Options de moyens de paiement
const paymentMethods: PaymentMethodOption[] = [
  {
    id: PaymentMethod.STRIPE,
    name: 'Cartes Bancaires',
    description: 'Visa, Mastercard, American Express, etc.',
    icon: <CreditCard className="h-6 w-6" />,
    available: true,
    countries: ['Mondial'],
    currencies: ['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CAD'],
    processingTime: 'Instantané',
    fees: '2.9% + 0.30€',
    minAmount: 0.50,
    maxAmount: 999999
  },
  {
    id: PaymentMethod.ORANGE_MONEY,
    name: 'Orange Money',
    description: 'Paiement mobile via Orange Money',
    icon: <Smartphone className="h-6 w-6" />,
    available: true,
    countries: ['France', 'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Madagascar', 'Cameroun'],
    currencies: ['EUR', 'XOF', 'XAF', 'MGA'],
    processingTime: '2-5 minutes',
    fees: '1.5% + 0.20€',
    minAmount: 1.00,
    maxAmount: 50000
  },
  {
    id: PaymentMethod.MOMO,
    name: 'MoMo (Mobile Money)',
    description: 'Paiement mobile via MoMo',
    icon: <Smartphone className="h-6 w-6" />,
    available: true,
    countries: ['Ghana', 'Kenya', 'Tanzanie', 'Ouganda', 'Rwanda'],
    currencies: ['GHS', 'KES', 'TZS', 'UGX', 'RWF'],
    processingTime: '1-3 minutes',
    fees: '1.0% + 0.15€',
    minAmount: 0.50,
    maxAmount: 25000
  },
  {
    id: PaymentMethod.BANK_TRANSFER,
    name: 'Virement Bancaire',
    description: 'Virement SEPA, ACH, SWIFT',
    icon: <Globe className="h-6 w-6" />,
    available: true,
    countries: ['Mondial'],
    currencies: ['EUR', 'USD', 'GBP', 'CHF'],
    processingTime: '1-3 jours ouvrables',
    fees: '5.00€',
    minAmount: 10.00,
    maxAmount: 999999
  }
];

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
  amount: number;
  currency: string;
  onContinue: () => void;
}

export function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
  amount,
  currency,
  onContinue
}: PaymentMethodSelectorProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si le montant est dans la plage du moyen de paiement
  const isAmountValid = (method: PaymentMethodOption): boolean => {
    return amount >= method.minAmount && amount <= method.maxAmount;
  };

  // Vérifier si la devise est supportée
  const isCurrencySupported = (method: PaymentMethodOption): boolean => {
    return method.currencies.includes(currency);
  };

  // Vérifier si le moyen de paiement est disponible
  const isMethodAvailable = (method: PaymentMethodOption): boolean => {
    return method.available && 
           isAmountValid(method) && 
           isCurrencySupported(method);
  };

  // Gérer la sélection d'une méthode
  const handleMethodSelect = (method: PaymentMethod) => {
    setError(null);
    onMethodSelect(method);
  };

  // Valider et continuer
  const handleContinue = async () => {
    if (!selectedMethod) {
      setError('Veuillez sélectionner un moyen de paiement');
      return;
    }

    // Validation spécifique pour Orange Money et MoMo
    if (selectedMethod === PaymentMethod.ORANGE_MONEY || selectedMethod === PaymentMethod.MOMO) {
      if (!phoneNumber || phoneNumber.length < 8) {
        setError('Veuillez saisir un numéro de téléphone valide');
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      await onContinue();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choisissez votre moyen de paiement
        </h2>
        <p className="text-gray-600">
          Montant à payer : <span className="font-semibold">{amount} {currency}</span>
        </p>
      </div>

      {/* Sélection des moyens de paiement */}
      <RadioGroup value={selectedMethod || ''} onValueChange={handleMethodSelect}>
        <div className="grid gap-4">
          {paymentMethods.map((method) => {
            const available = isMethodAvailable(method);
            const selected = selectedMethod === method.id;
            
            return (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selected 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'hover:border-gray-300'
                } ${
                  !available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => available && handleMethodSelect(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      disabled={!available}
                      className="flex-shrink-0"
                    />
                    
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${
                        selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label 
                            htmlFor={method.id}
                            className="text-lg font-semibold text-gray-900 cursor-pointer"
                          >
                            {method.name}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {method.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <Badge variant={selected ? 'default' : 'secondary'}>
                            {method.fees}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Détails du moyen de paiement */}
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Pays :</span> {method.countries.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Devises :</span> {method.currencies.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Traitement :</span> {method.processingTime}
                        </div>
                        <div>
                          <span className="font-medium">Limites :</span> {method.minAmount}-{method.maxAmount} {currency}
                        </div>
                      </div>
                      
                      {/* Indicateurs de disponibilité */}
                      {!available && (
                        <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span>
                            {!isAmountValid(method) && `Montant hors limites (${method.minAmount}-${method.maxAmount} ${currency})`}
                            {!isCurrencySupported(method) && `Devise ${currency} non supportée`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </RadioGroup>

      {/* Saisie du numéro de téléphone pour Orange Money et MoMo */}
      {(selectedMethod === PaymentMethod.ORANGE_MONEY || selectedMethod === PaymentMethod.MOMO) && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Numéro de téléphone</span>
            </CardTitle>
            <CardDescription>
              Saisissez votre numéro de téléphone pour recevoir la demande de paiement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              Format international recommandé pour une meilleure compatibilité
            </p>
          </CardContent>
        </Card>
      )}

      {/* Affichage des erreurs */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Bouton de continuation */}
      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedMethod || isLoading}
          size="lg"
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              Continuer
              <CheckCircle className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {/* Informations de sécurité */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>Tous les paiements sont sécurisés et chiffrés</span>
        </div>
      </div>
    </div>
  );
} 