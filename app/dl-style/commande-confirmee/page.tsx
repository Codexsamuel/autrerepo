'use client';

import { Check, Download, Home, Package, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const orderNumber = 'DL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  const orderItems = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max - 256GB - Titane Naturel',
      price: 1299,
      quantity: 1,
      image: '/images/products/iphone-15-pro.jpg'
    },
    {
      id: '2',
      name: 'MacBook Air M3 - 13" - 8GB RAM - 256GB SSD',
      price: 1199,
      quantity: 1,
      image: '/images/products/macbook-air.jpg'
    },
    {
      id: '4',
      name: 'AirPods Pro 2ème génération',
      price: 249,
      quantity: 2,
      image: '/images/products/airpods-pro.jpg'
    }
  ];

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-600">
            Merci pour votre commande. Nous avons reçu votre paiement et nous préparons votre colis.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Détails de la commande</h2>
            <span className="text-sm text-gray-500">#{orderNumber}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Date de commande</h3>
              <p className="text-gray-600">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Livraison estimée</h3>
              <p className="text-gray-600">{estimatedDelivery.toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Total</h3>
              <p className="text-lg font-bold text-gray-900">€{total.toFixed(2)}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Articles commandés</h3>
            <div className="space-y-4">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Tracking */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Suivi de livraison</h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-500"></div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Commande confirmée</h3>
                  <p className="text-sm text-gray-600">Votre commande a été confirmée et le paiement reçu</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString('fr-FR')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">En préparation</h3>
                  <p className="text-sm text-gray-600">Votre commande est en cours de préparation</p>
                  <p className="text-xs text-gray-500 mt-1">Prévu pour aujourd'hui</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-500">En livraison</h3>
                  <p className="text-sm text-gray-500">Votre colis sera expédié dans les prochaines heures</p>
                  <p className="text-xs text-gray-500 mt-1">Prévu pour demain</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Home className="h-4 w-4 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-500">Livré</h3>
                  <p className="text-sm text-gray-500">Votre commande sera livrée à votre adresse</p>
                  <p className="text-xs text-gray-500 mt-1">Prévu pour {estimatedDelivery.toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/dl-style/suivi"
            className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Truck className="h-5 w-5 mr-2" />
            Suivre ma commande
          </Link>
          
          <Link
            href="/dl-style"
            className="flex items-center justify-center p-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Continuer les achats
          </Link>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-4">Informations importantes</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <p>• Vous recevrez un email de confirmation avec tous les détails de votre commande</p>
            <p>• Un email de suivi vous sera envoyé dès que votre colis sera expédié</p>
            <p>• Vous pouvez suivre votre commande en temps réel dans votre espace client</p>
            <p>• Pour toute question, contactez notre service client au 01 23 45 67 89</p>
          </div>
        </div>

        {/* Download Invoice */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Télécharger la facture
          </button>
        </div>
      </div>
    </div>
  );
}