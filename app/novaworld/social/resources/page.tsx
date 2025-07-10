import AdvancedSEO from '@/components/AdvancedSEO';
import { BookOpen, Search, Share2, Sparkles, Star } from 'lucide-react';

export default function SocialResourcesPage() {
  return (
    <>
      <AdvancedSEO
        title="Ressources - NovaWorld Social | DL Solutions"
        description="Accédez à une bibliothèque intelligente de ressources professionnelles, outils, documents, favoris, et partage sur NovaWorld Social."
        keywords="ressources, bibliothèque, IA, NovaWorld, DL Solutions"
        image="/images/social-resources.jpg"
        url="https://dlsolutions.com/novaworld/social/resources"
        type="resources"
        organization={{
          name: 'DL Solutions',
          logo: 'https://dlsolutions.com/images/logo.png',
          url: 'https://dlsolutions.com',
          description: 'Solutions digitales innovantes pour entreprises'
        }}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://dlsolutions.com' },
          { name: 'NovaWorld', url: 'https://dlsolutions.com/novaworld' },
          { name: 'Social', url: 'https://dlsolutions.com/novaworld/social' },
          { name: 'Ressources', url: 'https://dlsolutions.com/novaworld/social/resources' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-purple-800 mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
            Bibliothèque de ressources
          </h1>
          <div className="flex items-center mb-8">
            <Search className="w-6 h-6 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              className="flex-1 border-none outline-none text-lg bg-white rounded-lg px-4 py-2 shadow"
            />
            <button className="ml-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
              Rechercher
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-blue-500 mr-2" />Suggestions IA
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Nouveau guide <b>CRM 2024</b> recommandé</li>
                <li>Ressource <b>"Scripts de vente"</b> ajoutée à vos favoris</li>
                <li>Partagez <b>"Checklist prospection"</b> avec votre équipe</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />Favoris & Partage
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Guide <b>CRM 2024</b> (favori)</li>
                <li>Scripts de vente (partagé)</li>
                <li>Checklist prospection (favori)</li>
              </ul>
              <button className="mt-4 flex items-center text-blue-700 font-semibold hover:underline">
                <Share2 className="w-5 h-5 mr-1" />Partager une ressource
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 