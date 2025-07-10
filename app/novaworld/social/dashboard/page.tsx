import AdvancedSEO from '@/components/AdvancedSEO';
import { Bell, BookOpen, Calendar, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function SocialDashboardPage() {
  return (
    <>
      <AdvancedSEO
        title="Dashboard Social - NovaWorld | DL Solutions"
        description="Tableau de bord social avancé : analytics, IA, notifications, résumé d'activité, tendances."
        keywords="dashboard, social, analytics, IA, NovaWorld, DL Solutions"
        image="/images/social-dashboard.jpg"
        url="https://dlsolutions.com/novaworld/social/dashboard"
        type="dashboard"
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
          { name: 'Dashboard', url: 'https://dlsolutions.com/novaworld/social/dashboard' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-pink-600" />
            Dashboard Social
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-6 h-6 text-green-500 mr-2" />Notifications récentes
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Vous avez été mentionné dans le groupe <b>"Growth Hacking"</b></li>
                <li>Nouvel événement : <b>Webinar Prospection 2024</b> demain à 14h</li>
                <li>Votre post a reçu <b>12 nouveaux commentaires</b></li>
                <li>3 nouvelles ressources ajoutées à la bibliothèque</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-blue-500 mr-2" />Suggestions IA
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Rejoignez le groupe <b>"Sales Leaders"</b> pour élargir votre réseau</li>
                <li>Participez à l'événement <b>"Atelier CRM"</b> recommandé pour vous</li>
                <li>Votre activité sociale est dans le top 5% ce mois-ci</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">+124%</div>
              <div className="text-gray-600 text-sm">Interactions ce mois-ci</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">+37</div>
              <div className="text-gray-600 text-sm">Nouveaux messages</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600 mb-1">3</div>
              <div className="text-gray-600 text-sm">Événements à venir</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-gray-600 text-sm">Ressources partagées</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 