"use client";

import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Section Hero Simplifiée */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Contenu Hero */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DL Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Écosystème Digital Complet - Davy & Lucie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="mr-2 h-5 w-5" />
                NovaIA - Intelligence Artificielle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Nos Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section NovaIA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🧠</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">NovaIA - Centre d'Intelligence Artificielle</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre écosystème d'agents IA ultra-avancé avec protocoles A2A/MCP et système de battle ELO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Battle Arena Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Battle Arena</h3>
              <p className="text-gray-300 mb-4">
                Faites s'affronter vos agents IA préférés dans notre arène de compétition
              </p>
              <Link href="/nova-ia/battle">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Lancer un Battle
                </Button>
              </Link>
            </div>

            {/* Protocoles Avancés Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-4">Protocoles Avancés</h3>
              <p className="text-gray-300 mb-4">
                Communication inter-agents A2A et gestion de contexte MCP
              </p>
              <Link href="/nova-ia">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Explorer les Protocoles
                </Button>
              </Link>
            </div>

            {/* Agents IA Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-4">Agents IA</h3>
              <p className="text-gray-300 mb-4">
                12 agents spécialisés avec précision 87-96% et système ELO
              </p>
              <Link href="/nova-ia">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Découvrir les Agents
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Brain className="mr-2 h-5 w-5" />
                Accéder à NovaIA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Transformer Votre Entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactez-nous pour discuter de vos projets et découvrir nos solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Brain className="mr-2 h-5 w-5" />
                Essayer NovaIA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Nous Contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
