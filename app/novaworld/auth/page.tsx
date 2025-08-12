import { Metadata } from 'next';
import { NovaWorldAuth } from '@/components/novaworld/auth/NovaWorldAuth';

export const metadata: Metadata = {
  title: 'Authentification NovaWorld - Réseau Social B2B Africain',
  description: 'Inscrivez-vous ou connectez-vous à NovaWorld, le premier réseau social professionnel B2B africain.',
  keywords: [
    'NovaWorld', 'Inscription', 'Connexion', 'Authentification', 'Réseau social B2B', 'Afrique'
  ],
};

export default function NovaWorldAuthPage() {
  return <NovaWorldAuth />;
} 