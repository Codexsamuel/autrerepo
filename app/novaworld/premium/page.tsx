import { Metadata } from 'next';
import { PremiumSubscription } from '@/components/novaworld/premium/PremiumSubscription';

export const metadata: Metadata = {
  title: 'Abonnements Premium NovaWorld - Réseau Social B2B Africain',
  description: 'Débloquez toutes les fonctionnalités premium de NovaWorld et connectez-vous avec les hauts cadres africains.',
  keywords: [
    'NovaWorld', 'Premium', 'Abonnement', 'Fonctionnalités avancées', 'Réseau social B2B', 'Afrique'
  ],
};

export default function NovaWorldPremiumPage() {
  return <PremiumSubscription />;
} 