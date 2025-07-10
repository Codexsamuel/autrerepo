import AdvancedSEO from '@/components/AdvancedSEO';
import { MessageSquare, MoreVertical, Paperclip, Search, Send, Smile } from 'lucide-react';

export default function SocialMessagesPage() {
  return (
    <>
      <AdvancedSEO
        title="Messagerie - NovaWorld Social | DL Solutions"
        description="Messagerie avancée avec chat, threads, recherche, pièces jointes, IA, et plus sur NovaWorld Social."
        keywords="messagerie, chat, threads, IA, NovaWorld, DL Solutions"
        image="/images/social-messages.jpg"
        url="https://dlsolutions.com/novaworld/social/messages"
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
          { name: 'Messagerie', url: 'https://dlsolutions.com/novaworld/social/messages' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            Messagerie avancée
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Liste des conversations */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="flex-1 border-none outline-none bg-gray-100 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Jean Dupont</div>
                    <div className="text-sm text-gray-600">Dernier message il y a 2h</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    ML
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Marie Laurent</div>
                    <div className="text-sm text-gray-600">Dernier message il y a 1j</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    PL
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Pierre Martin</div>
                    <div className="text-sm text-gray-600">Dernier message il y a 3j</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Zone de chat */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg flex flex-col h-96">
              {/* Header du chat */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Jean Dupont</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      En ligne
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <div className="text-sm text-gray-900">Salut ! Comment ça va ?</div>
                    <div className="text-xs text-gray-500 mt-1">14:30</div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                    <div className="text-sm">Très bien, merci ! Et toi ?</div>
                    <div className="text-xs text-blue-100 mt-1">14:32</div>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <div className="text-sm text-gray-900">Parfait ! Tu as vu le nouveau projet ?</div>
                    <div className="text-xs text-gray-500 mt-1">14:35</div>
                  </div>
                </div>
              </div>
              
              {/* Zone de saisie */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Tapez votre message..."
                    className="flex-1 border-none outline-none bg-gray-100 rounded-lg px-4 py-2"
                  />
                  <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 