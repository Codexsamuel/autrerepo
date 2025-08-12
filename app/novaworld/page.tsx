import { Metadata } from 'next';
import { NovaWorldHeader } from '@/components/novaworld/NovaWorldHeader';
import { NovaWorldSidebar } from '@/components/novaworld/NovaWorldSidebar';
import { NovaWorldFeed } from '@/components/novaworld/NovaWorldFeed';
import { NovaWorldTrending } from '@/components/novaworld/NovaWorldTrending';
import { NovaWorldJobs } from '@/components/novaworld/NovaWorldJobs';
import { NovaWorldCompanies } from '@/components/novaworld/NovaWorldCompanies';
import { NovaWorldNetwork } from '@/components/novaworld/NovaWorldNetwork';
import { CommunicationWidget } from '@/components/novaworld/communication/CommunicationWidget';

export const metadata: Metadata = {
  title: 'NovaWorld - Réseau Social B2B Africain | DL Solutions',
  description: 'Rejoignez NovaWorld, le premier réseau social professionnel B2B africain. Connectez-vous avec des entrepreneurs, trouvez des opportunités business et développez votre réseau en Afrique.',
  keywords: [
    'NovaWorld', 'Réseau social B2B', 'Afrique', 'Business', 'Entrepreneurs', 'Networking', 'Emplois', 'Entreprises', 'DL Solutions'
  ],
  openGraph: {
    title: 'NovaWorld - Réseau Social B2B Africain',
    description: 'Le premier réseau social professionnel B2B africain',
    images: ['https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaWorld - Réseau Social B2B Africain',
    description: 'Le premier réseau social professionnel B2B africain',
    images: ['https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png'],
  },
};

export default function NovaWorldPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Principal */}
      <NovaWorldHeader />
      
      {/* Contenu Principal */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Gauche */}
          <div className="lg:col-span-3">
            <NovaWorldSidebar />
          </div>
          
          {/* Feed Principal */}
          <div className="lg:col-span-6">
            <NovaWorldFeed />
          </div>
          
          {/* Sidebar Droite */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <NovaWorldTrending />
              <NovaWorldJobs />
              <NovaWorldCompanies />
              <NovaWorldNetwork />
              <CommunicationWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}