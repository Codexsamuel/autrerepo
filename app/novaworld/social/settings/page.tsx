import AdvancedSEO from '@/components/AdvancedSEO';
import { Bell, Lock, Settings, ShieldCheck, User } from 'lucide-react';

export default function SocialSettingsPage() {
  return (
    <>
      <AdvancedSEO
        title="Paramètres - NovaWorld Social | DL Solutions"
        description="Personnalisez votre expérience, gérez la sécurité, les notifications et la confidentialité sur NovaWorld Social."
        keywords="paramètres, sécurité, notifications, RGPD, NovaWorld, DL Solutions"
        image="/images/social-settings.jpg"
        url="https://dlsolutions.com/novaworld/social/settings"
        type="settings"
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
          { name: 'Paramètres', url: 'https://dlsolutions.com/novaworld/social/settings' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <Settings className="w-8 h-8 mr-3 text-gray-600" />
            Paramètres du compte
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-6 h-6 text-blue-500 mr-2" />Profil & Personnalisation
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Modifier le profil, photo, bio</li>
                <li>Thème clair/sombre</li>
                <li>Langue de l'interface</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-6 h-6 text-green-500 mr-2" />Notifications & Préférences
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Notifications email, push, SMS</li>
                <li>Fréquence des notifications</li>
                <li>Préférences personnalisées</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-yellow-500 mr-2" />Sécurité & Confidentialité
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Changer le mot de passe</li>
                <li>Authentification à deux facteurs</li>
                <li>Gestion des sessions actives</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShieldCheck className="w-6 h-6 text-purple-500 mr-2" />RGPD & Données
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Exporter mes données</li>
                <li>Supprimer mon compte</li>
                <li>Consulter la politique de confidentialité</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 