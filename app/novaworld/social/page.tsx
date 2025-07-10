import AdvancedSEO from '@/components/AdvancedSEO';
import { Bell, BookOpen, Calendar, Group, MessageSquare, Search, Settings, Sparkles, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function NovaWorldSocialPage() {
  return (
    <>
      <AdvancedSEO
        title="NovaWorld Social - Hub collaboratif et réseau professionnel | DL Solutions"
        description="Accédez à toutes les fonctionnalités sociales avancées de NovaWorld : feed, groupes, événements, ressources, analytics, IA, et plus."
        keywords="social, réseau, groupes, événements, analytics, IA, DL Solutions"
        image="/images/social-hub.jpg"
        url="https://dlsolutions.com/novaworld/social"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-800 mb-4 flex items-center">
              <Users className="w-8 h-8 mr-3 text-green-600" />
              NovaWorld Social
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Bienvenue sur le hub social de NovaWorld. Retrouvez toutes les fonctionnalités collaboratives, l'IA, les groupes, événements, ressources, analytics et plus encore.
            </p>

            {/* Navigation avancée */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <Link href="/novaworld/social/feed" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-blue-50 transition">
                <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
                <span className="font-semibold text-gray-900">Fil d'actualité</span>
                <span className="text-xs text-gray-500">Discussions, posts, IA</span>
              </Link>
              <Link href="/novaworld/social/groups" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-green-50 transition">
                <Group className="w-8 h-8 text-green-600 mb-2" />
                <span className="font-semibold text-gray-900">Groupes</span>
                <span className="text-xs text-gray-500">Communautés, projets</span>
              </Link>
              <Link href="/novaworld/social/events" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-yellow-50 transition">
                <Calendar className="w-8 h-8 text-yellow-600 mb-2" />
                <span className="font-semibold text-gray-900">Événements</span>
                <span className="text-xs text-gray-500">Calendrier, inscriptions</span>
              </Link>
              <Link href="/novaworld/social/resources" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-purple-50 transition">
                <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                <span className="font-semibold text-gray-900">Ressources</span>
                <span className="text-xs text-gray-500">Docs, outils, partage</span>
              </Link>
              <Link href="/novaworld/social/dashboard" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-pink-50 transition">
                <TrendingUp className="w-8 h-8 text-pink-600 mb-2" />
                <span className="font-semibold text-gray-900">Dashboard</span>
                <span className="text-xs text-gray-500">Analytics, stats, IA</span>
              </Link>
              <Link href="/novaworld/social/settings" className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-gray-100 transition">
                <Settings className="w-8 h-8 text-gray-600 mb-2" />
                <span className="font-semibold text-gray-900">Paramètres</span>
                <span className="text-xs text-gray-500">Profil, sécurité, préférences</span>
              </Link>
            </div>

            {/* Suggestions IA et analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="font-semibold text-blue-700">Suggestions IA personnalisées</span>
                </div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Rejoignez le groupe <b>"Growth Hacking"</b> pour booster votre réseau</li>
                  <li>Participez à l'événement <b>"Webinar Prospection 2024"</b> la semaine prochaine</li>
                  <li>Nouvelle ressource : <b>Guide CRM 2024</b> ajouté à la bibliothèque</li>
                  <li>Votre activité sociale est dans le top 10% ce mois-ci !</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <Bell className="w-6 h-6 text-green-500 mr-2" />
                  <span className="font-semibold text-green-700">Analytics & Statistiques</span>
                </div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Interactions ce mois-ci : <b>+124%</b></li>
                  <li>Groupes actifs : <b>7</b></li>
                  <li>Événements à venir : <b>3</b></li>
                  <li>Ressources partagées : <b>12</b></li>
                </ul>
              </div>
            </div>

            {/* Recherche avancée */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 flex items-center">
              <Search className="w-6 h-6 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Rechercher un groupe, un événement, une ressource..."
                className="flex-1 border-none outline-none text-lg bg-transparent"
              />
              <button className="ml-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 