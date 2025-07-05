"use client";

import { ArrowLeft, Check, CreditCard, Lock, MapPin, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CheckoutData {
  step: number;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billing: {
    sameAsShipping: boolean;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: 'card' | 'paypal';
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  delivery: {
    method: 'standard' | 'express' | 'premium';
  };
}

const initialData: CheckoutData = {
  step: 1,
  shipping: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  },
  billing: {
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  },
  payment: {
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  },
  delivery: {
    method: 'standard'
  }
};

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Livraison standard',
    price: 0,
    time: '3-5 jours ouvrables',
    description: 'Livraison gratuite pour les commandes de plus de €50'
  },
  {
    id: 'express',
    name: 'Livraison express',
    price: 9.99,
    time: '1-2 jours ouvrables',
    description: 'Livraison prioritaire'
  },
  {
    id: 'premium',
    name: 'Livraison premium',
    price: 19.99,
    time: 'Livraison le lendemain',
    description: 'Livraison garantie le lendemain avant 12h'
  }
];

export default function CheckoutPage() {
  const [data, setData] = useState<CheckoutData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateShipping = (field: keyof CheckoutData['shipping'], value: string) => {
    setData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value }
    }));
  };

  const updateBilling = (field: keyof CheckoutData['billing'], value: string | boolean) => {
    setData(prev => ({
      ...prev,
      billing: { ...prev.billing, [field]: value }
    }));
  };

  const updatePayment = (field: keyof CheckoutData['payment'], value: string) => {
    setData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: value }
    }));
  };

  const nextStep = () => {
    if (data.step < 4) {
      setData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (data.step > 1) {
      setData(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simuler le traitement du paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // Rediriger vers la page de confirmation
    window.location.href = '/dl-style/commande-confirmee';
  };

  const subtotal = 2797; // Total du panier
  const deliveryPrice = deliveryOptions.find(opt => opt.id === data.delivery.method)?.price || 0;
  const total = subtotal + deliveryPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dl-style/panier" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Link>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-600">Commande Sécurisée</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { number: 1, title: 'Livraison', icon: Truck },
              { number: 2, title: 'Facturation', icon: MapPin },
              { number: 3, title: 'Paiement', icon: CreditCard },
              { number: 4, title: 'Confirmation', icon: Check }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = data.step === step.number;
              const isCompleted = data.step > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-600 text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < 3 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Step 1: Shipping */}
              {data.step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Informations de livraison</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={data.shipping.firstName}
                        onChange={(e) => updateShipping('firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={data.shipping.lastName}
                        onChange={(e) => updateShipping('lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={data.shipping.email}
                        onChange={(e) => updateShipping('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={data.shipping.phone}
                        onChange={(e) => updateShipping('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      value={data.shipping.address}
                      onChange={(e) => updateShipping('address', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ville *
                      </label>
                      <input
                        type="text"
                        value={data.shipping.city}
                        onChange={(e) => updateShipping('city', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        value={data.shipping.postalCode}
                        onChange={(e) => updateShipping('postalCode', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pays *
                      </label>
                      <select
                        value={data.shipping.country}
                        onChange={(e) => updateShipping('country', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Luxembourg">Luxembourg</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Billing */}
              {data.step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Informations de facturation</h2>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.billing.sameAsShipping}
                        onChange={(e) => updateBilling('sameAsShipping', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Même adresse que la livraison</span>
                    </label>
                  </div>

                  {!data.billing.sameAsShipping && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            value={data.billing.firstName}
                            onChange={(e) => updateBilling('firstName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom *
                          </label>
                          <input
                            type="text"
                            value={data.billing.lastName}
                            onChange={(e) => updateBilling('lastName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse *
                        </label>
                        <input
                          type="text"
                          value={data.billing.address}
                          onChange={(e) => updateBilling('address', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ville *
                          </label>
                          <input
                            type="text"
                            value={data.billing.city}
                            onChange={(e) => updateBilling('city', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Code postal *
                          </label>
                          <input
                            type="text"
                            value={data.billing.postalCode}
                            onChange={(e) => updateBilling('postalCode', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pays *
                          </label>
                          <select
                            value={data.billing.country}
                            onChange={(e) => updateBilling('country', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="France">France</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Luxembourg">Luxembourg</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {data.step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Méthode de paiement</h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={data.payment.method === 'card'}
                        onChange={(e) => updatePayment('method', e.target.value as 'card')}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 mr-2" />
                      <span>Carte bancaire</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={data.payment.method === 'paypal'}
                        onChange={(e) => updatePayment('method', e.target.value as 'paypal')}
                        className="mr-3"
                      />
                      <span>PayPal</span>
                    </label>
                  </div>

                  {data.payment.method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de carte *
                        </label>
                        <input
                          type="text"
                          value={data.payment.cardNumber}
                          onChange={(e) => updatePayment('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'expiration *
                          </label>
                          <input
                            type="text"
                            value={data.payment.expiryDate}
                            onChange={(e) => updatePayment('expiryDate', e.target.value)}
                            placeholder="MM/AA"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={data.payment.cvv}
                            onChange={(e) => updatePayment('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Titulaire de la carte *
                          </label>
                          <input
                            type="text"
                            value={data.payment.cardholderName}
                            onChange={(e) => updatePayment('cardholderName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {data.step === 4 && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Confirmation de commande</h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">
                        Votre commande est prête à être traitée
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-medium mb-2">Adresse de livraison</h3>
                      <div className="text-gray-600">
                        {data.shipping.firstName} {data.shipping.lastName}<br />
                        {data.shipping.address}<br />
                        {data.shipping.postalCode} {data.shipping.city}<br />
                        {data.shipping.country}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Méthode de paiement</h3>
                      <div className="text-gray-600">
                        {data.payment.method === 'card' ? 'Carte bancaire' : 'PayPal'}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Livraison</h3>
                      <div className="text-gray-600">
                        {deliveryOptions.find(opt => opt.id === data.delivery.method)?.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Confirmer la commande
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Résumé de la commande</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{deliveryPrice === 0 ? 'Gratuit' : `€${deliveryPrice.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    TVA incluse
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Paiement sécurisé SSL</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Données cryptées</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Livraison garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
