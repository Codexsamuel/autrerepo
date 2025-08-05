import { MainNavigation } from '@/components/layout/MainNavigation';
import { AgentBattleSystem } from '@/components/ui/AgentBattleSystem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NovaIA Battle Arena - Compétition d\'Agents IA | DL Solutions',
  description: 'Faites s\'affronter vos agents IA préférés dans notre arène de battle. Comparez les performances et votez pour les meilleurs agents.',
  keywords: [
    'NovaIA Battle',
    'Agents IA',
    'Compétition IA',
    'Battle Arena',
    'ELO Rating',
    'Performance IA',
    'DL Solutions'
  ],
  openGraph: {
    title: 'NovaIA Battle Arena',
    description: 'Compétition d\'agents IA - Votez pour les meilleurs !',
    images: ['/images/nova-ia-battle-og.jpg'],
  },
};

export default function NovaIABattlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <MainNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ⚔️ NovaIA Battle Arena
            </h1>
            <p className="text-2xl text-white mb-4">
              Faites s'affronter vos agents IA préférés
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Inspiré d'AArena, notre système de battle permet de comparer les performances 
              des agents IA et de voter pour les meilleurs. Système ELO et classements en temps réel.
            </p>
          </div>

          {/* Battle System */}
          <AgentBattleSystem />
        </div>
      </main>
    </div>
  );
} 