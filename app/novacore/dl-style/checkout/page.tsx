"use client";

import { useState } from 'react';
import { useCart, CartItem } from '../cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ShoppingCart, CreditCard, User, MapPin, Phone, Mail } from 'lucide-react';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const total = items.reduce((sum: number, item: CartItem) => sum + (item.product.sellingPrice * item.quantity), 0);
  const profit = items.reduce((sum: number, item: CartItem) => sum + ((item.product.sellingPrice - item.product.originalPrice) * item.quantity), 0);

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Validation basique
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/facturation/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            image: item.product.images[0],
            price: item.product.sellingPrice,
            quantity: item.quantity
          })),
          customer: customerInfo,
          total: total
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        // Redirection vers Stripe Checkout
        window.location.href = data.url;
      } else {
        alert('Erreur lors de la création de la session de paiement');
      }
    } catch (error) {
      console.error('Erreur checkout:', error);
      alert('Erreur lors du processus de paiement');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-4">Ajoutez des produits avant de procéder au paiement</p>
          <Button onClick={() => window.history.back()}>
            Retourner aux produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Finaliser votre commande</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations client */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    value={customerInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Récapitulatif commande */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Récapitulatif de votre commande
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 border-b pb-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{item.product.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.product.supplier?.name} • {item.product.market}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.product.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.product.sellingPrice} €</div>
                      <div className="text-xs text-gray-500">x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="font-semibold">Total</div>
                <div className="text-2xl font-bold">{total} €</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">Profit estimé</div>
                <div className="text-sm text-green-600 font-semibold">{profit} €</div>
              </div>
              <Button className="w-full mt-6" onClick={handleCheckout} disabled={loading}>
                <CreditCard className="h-4 w-4 mr-2" />
                {loading ? 'Paiement en cours...' : 'Payer maintenant'}
              </Button>
              <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
                Vider le panier
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 