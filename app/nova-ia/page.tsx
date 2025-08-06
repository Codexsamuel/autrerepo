import { Metadata } from 'next';
import { NovaIAssistant } from '@/components/ui/NovaIAssistant';
import { NovaAISelector } from '@/components/ui/NovaAISelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Star, Users, TrendingUp, Globe, Shield, Rocket, Target, Award, Crown, Sparkles, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NovaIA - Écosystème d\'Agents IA Complet | DL Solutions',
  description: 'Découvrez notre écosystème d\'agents IA ultra-avancé avec marketplace, battle arena, protocoles A2A/MCP et système ELO. Plus de 50 agents spécialisés.',
  keywords: [
    'NovaIA', 'Agents IA', 'Marketplace IA', 'Battle Arena', 'ELO Rating', 'Protocoles A2A', 'MCP', 'DL Solutions'
  ],
  openGraph: {
    title: 'NovaIA - Écosystème d\'Agents IA Complet',
    description: 'Marketplace d\'agents IA avec battle arena et protocoles avancés',
    images: ['/images/nova-ia-ecosystem-og.jpg'],
  },
};

const categories = [
  {
    id: 'conversation',
    name: 'Conversation & Chat',
    icon: '💬',
    description: 'Agents de conversation intelligents',
    count: 8,
    color: 'bg-blue-500'
  },
  {
    id: 'images',
    name: 'Génération d\'Images',
    icon: '🎨',
    description: 'Création d\'images et visuels',
    count: 6,
    color: 'bg-purple-500'
  },
  {
    id: 'voice',
    name: 'Audio & Voix',
    icon: '🎙️',
    description: 'Synthèse vocale et audio',
    count: 4,
    color: 'bg-green-500'
  },
  {
    id: 'business',
    name: 'Business & Analytics',
    icon: '💼',
    description: 'Agents d\'analyse business',
    count: 12,
    color: 'bg-orange-500'
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    icon: '📢',
    description: 'Agents de marketing automatisé',
    count: 10,
    color: 'bg-pink-500'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛍️',
    description: 'Agents spécialisés e-commerce',
    count: 7,
    color: 'bg-red-500'
  },
  {
    id: 'analysis',
    name: 'Analyse & Vision',
    icon: '📊',
    description: 'Agents d\'analyse de données',
    count: 9,
    color: 'bg-indigo-500'
  },
  {
    id: 'automation',
    name: 'Automatisation',
    icon: '⚙️',
    description: 'Agents d\'automatisation',
    count: 11,
    color: 'bg-gray-500'
  }
];

const featuredAgents = [
  {
    id: 'auto-gpt-clone',
    name: 'NovaGPT',
    description: 'Agent autonome inspiré d\'Auto-GPT avec autonomie 90%',
    category: 'automation',
    rating: 4.8,
    users: 1250,
    price: 25,
    features: ['Autonomie élevée', 'Auto-prompting', 'Exécution multi-étapes'],
    isPremium: true
  },
  {
    id: 'market-researcher',
    name: 'MarketIntel Pro',
    description: 'Agent de recherche de marché automatisé',
    category: 'business',
    rating: 4.9,
    users: 890,
    price: 18,
    features: ['Analyse concurrentielle', 'Rapports automatiques', 'Veille technologique'],
    isPremium: true
  },
  {
    id: 'content-creator',
    name: 'ContentMaster',
    description: 'Créateur de contenu intelligent multi-format',
    category: 'marketing',
    rating: 4.7,
    users: 2100,
    price: 15,
    features: ['Blogs', 'Réseaux sociaux', 'Vidéos', 'Infographies'],
    isPremium: false
  }
];

export default function NovaIAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            NovaIA - Écosystème d'Agents IA
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            Découvrez notre marketplace d'agents IA ultra-avancé avec protocoles A2A/MCP, 
            système de battle ELO et plus de 50 agents spécialisés
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Agents IA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">8</div>
              <div className="text-gray-300">Catégories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Utilisateurs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">4.8</div>
              <div className="text-gray-300">Note Moyenne</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#marketplace">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Globe className="mr-2 h-5 w-5" />
                Explorer le Marketplace
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/nova-ia/agent-genesis">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Github className="mr-2 h-5 w-5" />
                AgentGenesis
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/nova-ia/battle">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Zap className="mr-2 h-5 w-5" />
                Battle Arena
                <Crown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🏪 Marketplace d'Agents IA
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trouvez l'agent parfait pour vos besoins parmi notre collection d'agents IA spécialisés
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => (
              <Link key={category.id} href={`/nova-ia/category/${category.id}`}>
                <Card className="group hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{category.icon}</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Featured Agents */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              🌟 Agents Vedettes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.map((agent) => (
                <Card key={agent.id} className="group hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {agent.description}
                        </CardDescription>
                      </div>
                      {agent.isPremium && (
                        <Badge variant="secondary" className="bg-yellow-500 text-black">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-white">{agent.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-gray-300">{agent.users}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-white">{agent.price}€</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-blue-400 text-blue-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Rocket className="mr-2 h-4 w-4" />
                      Essayer l'Agent
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* NovaIAssistant Component */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              🤖 Assistant NovaIA
            </h3>
            <NovaIAssistant />
          </div>
        </div>
      </section>

      {/* Ecosystem Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🌐 Écosystème Complet
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une plateforme complète pour tous vos besoins en IA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-semibold text-white mb-4">Battle Arena</h3>
              <p className="text-gray-300 mb-4">
                Faites s'affronter vos agents IA préférés dans notre arène de compétition avec système ELO
              </p>
              <Link href="/nova-ia/battle">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Lancer un Battle
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-4">Protocoles Avancés</h3>
              <p className="text-gray-300 mb-4">
                Communication inter-agents A2A et gestion de contexte MCP pour des interactions intelligentes
              </p>
              <Link href="/nova-ia/protocols">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Explorer les Protocoles
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-4">Système ELO</h3>
              <p className="text-gray-300 mb-4">
                Classement dynamique basé sur les performances et compétitions entre agents
              </p>
              <Link href="/nova-ia/rankings">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Voir les Classements
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🚁</div>
              <h3 className="text-xl font-semibold text-white mb-4">DroneBuilder IA</h3>
              <p className="text-gray-300 mb-4">
                Générateur de drones militaires avec firmware, G-code et missions tactiques
              </p>
              <Link href="/nova-ia/drone-builder">
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Créer un Drone
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Révolutionner Votre Business avec l'IA ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez notre écosystème d'agents IA et transformez vos processus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#marketplace">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Brain className="mr-2 h-5 w-5" />
                Explorer le Marketplace
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Shield className="mr-2 h-5 w-5" />
                Demander une Démo
                <Target className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 