import AdvancedSEO from '@/components/AdvancedSEO';
import { Group, PlusCircle, Search, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function SocialGroupsPage() {
  return (
    <>
      <AdvancedSEO
        title="Groupes - NovaWorld Social | DL Solutions"
        description="Rejoignez, créez et gérez des groupes professionnels sur NovaWorld Social. Suggestions IA, recherche avancée, communautés actives."
        keywords="groupes, social, IA, NovaWorld, DL Solutions"
        image="/images/social-groups.jpg"
        url="https://dlsolutions.com/novaworld/social/groups"
        type="organization"
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
          { name: 'Groupes', url: 'https://dlsolutions.com/novaworld/social/groups' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-green-800 mb-8 flex items-center">
            <Group className="w-8 h-8 mr-3 text-green-600" />
            Groupes professionnels
          </h1>
          <div className="flex items-center mb-8">
            <Search className="w-6 h-6 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Rechercher un groupe..."
              className="flex-1 border-none outline-none text-lg bg-white rounded-lg px-4 py-2 shadow"
            />
            <button className="ml-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
              Rechercher
            </button>
            <Link href="#" className="ml-4 flex items-center text-green-700 font-semibold hover:underline">
              <PlusCircle className="w-5 h-5 mr-1" />Créer un groupe
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-blue-500 mr-2" />Suggestions IA
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Rejoignez le groupe <b>"Growth Hacking"</b> pour booster votre réseau</li>
                <li>Groupe <b>"Sales Leaders"</b> recommandé pour votre profil</li>
                <li>Participez à la discussion <b>"Nouveaux outils CRM"</b></li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-2" />Groupes populaires
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Marketing Digital</b> (1 200 membres)</li>
                <li><b>Entrepreneurs Afrique</b> (800 membres)</li>
                <li><b>Tech & Innovation</b> (950 membres)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 