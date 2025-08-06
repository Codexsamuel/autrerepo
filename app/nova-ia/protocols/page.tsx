import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Network } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Protocoles Avancés A2A/MCP - NovaIA | DL Solutions',
  description: 'Découvrez les protocoles A2A (Agent-to-Agent) et MCP (Model Context Protocol) pour la communication inter-agents IA avancée.',
};

export default function ProtocolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">🌐</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Protocoles Avancés
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            Découvrez les technologies de communication inter-agents qui révolutionnent l'IA
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold text-white mb-4">Protocole A2A</h3>
              <p className="text-gray-300 mb-4">
                Communication intelligente entre agents IA avec gestion des priorités et routage intelligent
              </p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li>• Communication bidirectionnelle</li>
                <li>• Gestion des priorités</li>
                <li>• Sécurité intégrée</li>
                <li>• Scalabilité automatique</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-4">Protocole MCP</h3>
              <p className="text-gray-300 mb-4">
                Gestion avancée du contexte et de la mémoire pour une IA plus intelligente
              </p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li>• Gestion de contexte dynamique</li>
                <li>• Mémoire à long terme</li>
                <li>• Apprentissage continu</li>
                <li>• Optimisation cognitive</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="mr-2 h-5 w-5" />
                Retour à NovaIA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/nova-ia/battle">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Network className="mr-2 h-5 w-5" />
                Battle Arena
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 