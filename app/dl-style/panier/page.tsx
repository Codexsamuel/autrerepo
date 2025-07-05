'use client';

import { ArrowRight, CreditCard, Lock, Minus, Plus, Shield, Trash2, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock: boolean;
  fastDelivery: boolean;
}

const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB - Titane Naturel',
    price: 1299,
    originalPrice: 1499,
    image: '/images/products/iphone-15-pro.jpg',
    quantity: 1,
    inStock: true,
    fastDelivery: true
  },
  {
    id: '2',
    name: 'MacBook Air M3 - 13" - 8GB RAM - 256GB SSD',
    price: 1199,
    originalPrice: 1299,
    image: '/images/products/macbook-air.jpg',
    quantity: 1,
    inStock: true,
    fastDelivery: true
  },
  {
    id: '4',
    name: 'AirPods Pro 2ème génération',
    price: 249,
    originalPrice: 299,
    image: '/images/products/airpods-pro.jpg',
    quantity: 2,
    inStock: true,
    fastDelivery: true
  }
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo({ code: promoCode, discount: 10 });
      setPromoCode('');
    } else {
      alert('Code promo invalide');
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const totalSavings = items.reduce((sum, item) => {
    const originalTotal = (item.originalPrice || item.price) * item.quantity;
    const currentTotal = item.price * item.quantity;
    return sum + (originalTotal - currentTotal);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panier</h1>
          <p className="text-gray-600 mt-2">
            {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits et commencez vos achats
            </p>
            <Link
              href="/dl-style"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Continuer les achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Articles ({items.length})</h2>
                </div>
                
                <div className="divide-y">
                  {items.map(item => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          
                          <div className="flex items-center mt-1">
                            <span className="text-lg font-bold text-gray-900">
                              €{item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                €{item.originalPrice}
                              </span>
                            )}
                            {item.fastDelivery && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Livraison rapide
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded border hover:bg-gray-50"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded border hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
                <h3 className="text-lg font-semibold mb-4">Code promo</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Appliquer
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 text-sm text-green-600">
                    Code "{appliedPromo.code}" appliqué (-{appliedPromo.discount}%)
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Sous-total ({items.length} article{items.length > 1 ? 's' : ''})</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Économies</span>
                      <span>-€{totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction promo</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'Gratuit' : `€${shipping.toFixed(2)}`}</span>
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

                <div className="mt-6 space-y-3">
                  <Link
                    href="/dl-style/checkout"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <span>Passer la commande</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <Link
                    href="/dl-style"
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 text-center block"
                  >
                    Continuer les achats
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Garantie 30 jours</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Livraison gratuite dès €50</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Moyens de paiement acceptés</h4>
                  <div className="flex space-x-2">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Carte bancaire, PayPal, Apple Pay, Google Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}