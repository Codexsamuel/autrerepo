'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

export default function CinetPayIntegration() {
  const [paymentData, setPaymentData] = useState<PaymentRequest>({
    amount: 0,
    currency: 'XAF',
    description: '',
    customerEmail: '',
    customerPhone: '',
    customerName: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null);

  const handleInputChange = (field: keyof PaymentRequest, value: string | number) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const initiatePayment = async () => {
    if (!paymentData.amount || !paymentData.description || !paymentData.customerEmail) {
      setPaymentResult({ success: false, error: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null);

    try {
      // Simulation de l'appel CinetPay (en production, appeler l'API réelle)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse: PaymentResponse = {
        success: true,
        transactionId: `CINET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        paymentUrl: `https://checkout.cinetpay.com/pay/${Date.now()}`,
      };
      
      setPaymentResult(mockResponse);
    } catch (error) {
      setPaymentResult({ 
        success: false, 
        error: 'Erreur lors de l\'initialisation du paiement' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { 
      name: 'Mobile Money', 
      icon: Smartphone, 
      color: 'bg-green-500',
      description: 'Orange Money, MTN Mobile Money, Moov Money'
    },
    { 
      name: 'Cartes Bancaires', 
      icon: CreditCard, 
      color: 'bg-blue-500',
      description: 'Visa, Mastercard, UnionPay'
    },
    { 
      name: 'Transfert Bancaire', 
      icon: Globe, 
      color: 'bg-purple-500',
      description: 'Virement bancaire direct'
    },
    { 
      name: 'Paiement Instantané', 
      icon: Zap, 
      color: 'bg-orange-500',
      description: 'Paiement immédiat sécurisé'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paiement Sécurisé CinetPay
        </h2>
        <p className="text-gray-600">
          Paiement en ligne sécurisé et instantané pour tous vos services NovaWorld
        </p>
      </div>

      {/* Méthodes de paiement supportées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <Card key={method.name} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{method.name}</h3>
                <p className="text-xs text-gray-600">{method.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Formulaire de paiement */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Détails du Paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Montant (FCFA)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50000"
                value={paymentData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="currency">Devise</Label>
              <select
                id="currency"
                value={paymentData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="XAF">FCFA (XAF)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar US (USD)</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description du service</Label>
            <Input
              id="description"
              placeholder="Ex: Abonnement Premium NovaWorld - 1 mois"
              value={paymentData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="customerName">Nom complet</Label>
              <Input
                id="customerName"
                placeholder="Votre nom complet"
                value={paymentData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="votre@email.com"
                value={paymentData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerPhone">Téléphone</Label>
              <Input
                id="customerPhone"
                placeholder="+237 6XX XXX XXX"
                value={paymentData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button 
            onClick={initiatePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Procéder au Paiement
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Résultat du paiement */}
      {paymentResult && (
        <Card className={`border-0 shadow-lg ${paymentResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {paymentResult.success ? (
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              )}
              <h3 className={`text-lg font-semibold ${paymentResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {paymentResult.success ? 'Paiement Initialisé avec Succès' : 'Erreur de Paiement'}
              </h3>
            </div>

            {paymentResult.success ? (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Transaction ID:</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{paymentResult.transactionId}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">URL de Paiement:</p>
                  <a 
                    href={paymentResult.paymentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {paymentResult.paymentUrl}
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé par CinetPay</span>
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-red-700">{paymentResult.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Informations de sécurité */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Sécurité et Confidentialité</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Paiement crypté SSL/TLS 256-bit</li>
                <li>• Conformité PCI DSS</li>
                <li>• Données personnelles protégées</li>
                <li>• Support 24/7 en cas de problème</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 