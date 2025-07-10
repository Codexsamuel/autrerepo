import AdvancedSEO from '@/components/AdvancedSEO';
import { Activity, AlertTriangle, CheckCircle, Clock, Shield, Users, XCircle } from 'lucide-react';

export default function SocialModerationPage() {
  return (
    <>
      <AdvancedSEO
        title="Modération - NovaWorld Social | DL Solutions"
        description="Outils de modération avancés : signalements, gestion des membres, logs, IA anti-spam, et plus sur NovaWorld Social."
        keywords="modération, signalements, IA, NovaWorld, DL Solutions"
        image="/images/social-moderation.jpg"
        url="https://dlsolutions.com/novaworld/social/moderation"
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
          { name: 'Social', url: 'https://dlsolutions.com/novaworld/social' },
          { name: 'Modération', url: 'https://dlsolutions.com/novaworld/social/moderation' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-red-800 mb-8 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-red-600" />
            Centre de modération
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 mb-1">5</div>
              <div className="text-gray-600 text-sm">Signalements en attente</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600 mb-1">2</div>
              <div className="text-gray-600 text-sm">Membres suspendus</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Taux de satisfaction</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                Signalements récents
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Spam détecté</span>
                    <span className="text-xs text-gray-500">Il y a 2h</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Message suspect dans le groupe "Marketing Digital"</p>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approuver
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeter
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Contenu inapproprié</span>
                    <span className="text-xs text-gray-500">Il y a 4h</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Commentaire signalé par 3 membres</p>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approuver
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Activity className="w-6 h-6 text-blue-500 mr-2" />
                Logs d'activité
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Utilisateur suspendu pour spam</span>
                  <span className="text-gray-400 ml-auto">Il y a 1h</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Signalement traité automatiquement</span>
                  <span className="text-gray-400 ml-auto">Il y a 3h</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Nouveau modérateur ajouté</span>
                  <span className="text-gray-400 ml-auto">Il y a 1j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 