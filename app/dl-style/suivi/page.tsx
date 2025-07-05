'use client';

import { Check, Clock, Home, Mail, MapPin, Package, Phone, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered';
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  icon: any;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus['status'];
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shipping: {
    method: string;
    trackingNumber: string;
    estimatedDelivery: string;
    address: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
}

const orderStatuses: OrderStatus[] = [
  {
    id: '1',
    status: 'pending',
    title: 'Commande confirmée',
    description: 'Votre commande a été confirmée et le paiement reçu',
    date: '15 Jan 2024',
    time: '14:30',
    completed: true,
    icon: Check
  },
  {
    id: '2',
    status: 'processing',
    title: 'En préparation',
    description: 'Votre commande est en cours de préparation dans notre entrepôt',
    date: '15 Jan 2024',
    time: '16:45',
    completed: true,
    icon: Package
  },
  {
    id: '3',
    status: 'shipped',
    title: 'Expédié',
    description: 'Votre colis a été expédié et est en route vers vous',
    date: '16 Jan 2024',
    time: '09:15',
    completed: true,
    icon: Truck
  },
  {
    id: '4',
    status: 'in-transit',
    title: 'En transit',
    description: 'Votre colis est en cours de livraison',
    date: '17 Jan 2024',
    time: '08:30',
    completed: false,
    icon: Truck
  },
  {
    id: '5',
    status: 'out-for-delivery',
    title: 'En livraison',
    description: 'Votre colis est en cours de livraison par le livreur',
    date: '18 Jan 2024',
    time: '07:00',
    completed: false,
    icon: Truck
  },
  {
    id: '6',
    status: 'delivered',
    title: 'Livré',
    description: 'Votre commande a été livrée avec succès',
    date: '18 Jan 2024',
    time: '14:00',
    completed: false,
    icon: Home
  }
];

const currentOrder: Order = {
  id: 'DL-ABC123456',
  date: '2024-01-15',
  status: 'in-transit',
  total: 2797,
  items: [
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
  ],
  shipping: {
    method: 'Livraison express',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '18 Jan 2024',
    address: {
      firstName: 'Jean',
      lastName: 'Dupont',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    }
  }
};

export default function OrderTrackingPage() {
  const [order] = useState<Order>(currentOrder);

  const getCurrentStatusIndex = () => {
    return orderStatuses.findIndex(status => status.status === order.status);
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suivi de commande</h1>
              <p className="text-gray-600 mt-2">
                Commande #{order.id} • {new Date(order.date).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <Link
              href="/dl-style/compte"
              className="text-blue-600 hover:text-blue-700"
            >
              Retour à mon compte
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Résumé de la commande</h2>
                <span className="text-2xl font-bold text-gray-900">€{order.total.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Suivi de livraison</h2>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {orderStatuses.map((status, index) => {
                    const Icon = status.icon;
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;
                    const isUpcoming = index > currentIndex;
                    
                    return (
                      <div key={status.id} className="relative flex items-start">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' :
                          isActive ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            isCompleted || isActive ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${
                              isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {status.title}
                            </h3>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{status.date}</p>
                              <p className="text-xs text-gray-500">{status.time}</p>
                            </div>
                          </div>
                          
                          <p className={`text-sm mt-1 ${
                            isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {status.description}
                          </p>
                          
                          {isActive && (
                            <div className="mt-3 flex items-center text-blue-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">En cours</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold mb-4">Informations de livraison</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Méthode de livraison</h4>
                  <p className="text-sm text-gray-900">{order.shipping.method}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Numéro de suivi</h4>
                  <p className="text-sm text-gray-900 font-mono">{order.shipping.trackingNumber}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Livraison estimée</h4>
                  <p className="text-sm text-gray-900">{order.shipping.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold mb-4">Adresse de livraison</h3>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-900">
                  <p>{order.shipping.address.firstName} {order.shipping.address.lastName}</p>
                  <p>{order.shipping.address.address}</p>
                  <p>{order.shipping.address.postalCode} {order.shipping.address.city}</p>
                  <p>{order.shipping.address.country}</p>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Besoin d'aide ?</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Service client</p>
                    <p className="text-sm text-blue-700">01 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Email</p>
                    <p className="text-sm text-blue-700">support@dlstyle.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <Link
                  href="/dl-style/support/centre-aide"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Centre d'aide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}