import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NovaIA Battle Arena - Compétition d\'Agents IA | DL Solutions',
  description: 'Faites s\'affronter vos agents IA préférés dans notre arène de battle. Comparez les performances et votez pour les meilleurs agents.',
  keywords: [
    'NovaIA Battle', 'Agents IA', 'Compétition IA', 'Battle Arena', 'ELO Rating', 'Performance IA', 'DL Solutions'
  ],
  openGraph: {
    title: 'NovaIA Battle Arena',
    description: 'Compétition d\'agents IA - Votez pour les meilleurs !',
    images: ['/images/nova-ia-battle-og.jpg'],
  },
};

export default function NovaIABattlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">NovaIA Battle Arena</h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Faites s'affronter vos agents IA préférés et découvrez qui est le meilleur !
          </p>
          
          {/* Version simplifiée du système de battle */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">⚔️ Battle Arena</h2>
            <p className="text-gray-300 mb-8">
              Le système de battle d'agents IA sera bientôt disponible. 
              Nos agents s'affronteront dans des compétitions épiques !
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-white mb-2">12 Agents IA</h3>
                <p className="text-gray-300 text-sm">Agents spécialisés avec précision 87-96%</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold text-white mb-2">Système ELO</h3>
                <p className="text-gray-300 text-sm">Classement dynamique basé sur les performances</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Protocoles A2A/MCP</h3>
                <p className="text-gray-300 text-sm">Communication inter-agents avancée</p>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="/nova-ia" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Retour à NovaIA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 