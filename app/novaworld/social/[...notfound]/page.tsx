import AdvancedSEO from '@/components/AdvancedSEO';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function SocialNotFoundPage() {
  return (
    <>
      <AdvancedSEO
        title="Page non trouvée - NovaWorld Social | DL Solutions"
        description="Page non trouvée dans le hub social NovaWorld. Retournez à l'accueil ou explorez nos fonctionnalités."
        keywords="404, page non trouvée, NovaWorld, DL Solutions"
        image="/images/404-social.jpg"
        url="https://dlsolutions.com/novaworld/social/404"
        type="website"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'NovaWorld', url: 'https://dlsolutions.com/novaworld' },
          { name: 'Social', url: 'https://dlsolutions.com/novaworld/social' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <Search className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
            <p className="text-lg text-gray-600 mb-8">
              Cette page du hub social n'existe pas encore. Nous travaillons constamment à améliorer NovaWorld !
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/novaworld/social"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour au hub social
            </Link>
            
            <div className="text-sm text-gray-500">
              Ou explorez nos fonctionnalités disponibles :
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Link href="/novaworld/social/feed" className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Fil d'actualité</div>
                <div className="text-sm text-gray-600">Discussions & posts</div>
              </Link>
              <Link href="/novaworld/social/groups" className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Groupes</div>
                <div className="text-sm text-gray-600">Communautés</div>
              </Link>
              <Link href="/novaworld/social/events" className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Événements</div>
                <div className="text-sm text-gray-600">Calendrier</div>
              </Link>
              <Link href="/novaworld/social/dashboard" className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Dashboard</div>
                <div className="text-sm text-gray-600">Analytics</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 