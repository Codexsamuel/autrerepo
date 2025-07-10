import AdvancedSEO from '@/components/AdvancedSEO';
import { BookOpen, Home, Search, ShoppingBag, Users } from 'lucide-react';
import Link from 'next/link';

export default function GlobalNotFoundPage() {
  return (
    <>
      <AdvancedSEO
        title="Page non trouvée - DL Solutions"
        description="Page non trouvée. Retournez à l'accueil ou explorez nos solutions digitales innovantes."
        keywords="404, page non trouvée, DL Solutions"
        image="/images/404.jpg"
        url="https://dlsolutions.com/404"
        type="website"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-12">
            <Search className="w-32 h-32 text-gray-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page non trouvée</h2>
            <p className="text-lg text-gray-600 mb-8">
              Cette page n'existe pas encore. Nous travaillons constamment à améliorer DL Solutions !
            </p>
          </div>
          
          <div className="space-y-8">
            <Link 
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
            >
              <Home className="w-6 h-6 mr-2" />
              Retour à l'accueil
            </Link>
            
            <div className="text-lg text-gray-700 font-semibold">
              Explorez nos solutions disponibles :
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/novaworld" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-2">NovaWorld</div>
                <div className="text-sm text-gray-600">Réseau social professionnel</div>
              </Link>
              
              <Link href="/formations" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group">
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-2">Formations</div>
                <div className="text-sm text-gray-600">Formations certifiantes</div>
              </Link>
              
              <Link href="/dl-style" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group">
                <ShoppingBag className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-2">DL-Style</div>
                <div className="text-sm text-gray-600">Boutique en ligne</div>
              </Link>
            </div>
            
            <div className="text-sm text-gray-500 mt-8">
              Si vous pensez qu'il s'agit d'une erreur, contactez-nous à support@dlsolutions.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 