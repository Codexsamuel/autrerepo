"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CommandeConfirmeePage() {
  const { items, clearCart } = useCart();
  const [orderNumber] = useState(() => `CMD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  useEffect(() => {
    // Vider le panier après confirmation
    if (items.length > 0) {
      clearCart();
    }
  }, [items.length, clearCart]);

  const total = items.reduce((sum: number, item) => sum + (item.product.sellingPrice * item.quantity), 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Commande confirmée !
        </h1>
        <p className="text-lg text-gray-600">
          Merci pour votre commande. Nous avons reçu votre paiement avec succès.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Détails de la commande
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Numéro de commande:</span>
              <span className="font-mono text-blue-600">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Date:</span>
              <span>{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total payé:</span>
              <span className="text-lg font-bold text-green-600">{total.toFixed(2)} €</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Prochaines étapes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Confirmation par email</h4>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email de confirmation avec tous les détails de votre commande.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Traitement de la commande</h4>
                <p className="text-sm text-gray-600">
                  Notre équipe va traiter votre commande et organiser l'expédition.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Suivi de livraison</h4>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email avec le numéro de suivi dès que votre commande sera expédiée.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Besoin d'aide ?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">support@dlsolutions.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Paris, France</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Link href="/novacore/dl-style">
          <Button variant="outline">
            Continuer les achats
          </Button>
        </Link>
        <Link href="/novacore">
          <Button>
            Retour au dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
} 