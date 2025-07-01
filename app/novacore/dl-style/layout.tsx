import { ReactNode } from 'react';
import { Metadata } from 'next';
import { CartProvider } from './cart-context';

export const metadata: Metadata = {
  title: 'Boutique Internationale DL Style | Produits du Monde Entier | Livraison Cameroun',
  description: 'Boutique internationale DL Style - Produits premium de Chine, Dubaï, Turquie et Cameroun. Véhicules, électronique, mode, accessoires. Livraison au Cameroun - École de Police, Yaoundé. Paiement sécurisé, devises multiples (EUR, USD, FCFA).',
  keywords: [
    'boutique internationale',
    'produits Chine',
    'produits Dubaï',
    'produits Turquie',
    'produits Cameroun',
    'véhicules électriques',
    'électronique',
    'mode',
    'accessoires',
    'livraison Cameroun',
    'paiement sécurisé',
    'devises multiples',
    'FCFA',
    'EUR',
    'USD'
  ],
  openGraph: {
    title: 'Boutique Internationale DL Style',
    description: 'Produits premium du monde entier - Livraison au Cameroun',
    type: 'website',
    locale: 'fr_FR'
  }
};

export default function DLStyleLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </CartProvider>
  );
} 