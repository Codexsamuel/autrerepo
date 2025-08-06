import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, ExternalLink, Zap, Star, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AgentGenesis - Intégration Agents IA | NovaIA | DL Solutions',
  description: 'Découvrez et intégrez les meilleurs agents IA d\'AgentGenesis dans votre écosystème NovaIA. Plus de 50 agents spécialisés pour l\'Afrique.',
  keywords: [
    'AgentGenesis', 'Agents IA', 'Intégration', 'NovaIA', 'DL Solutions', 'Afrique'
  ],
};

const agentGenesisAgents = [
  {
    id: 'zapier-agents',
    name: 'Zapier Agents',
    description: 'Automatisation de workflows no-code pour connecter WhatsApp, email, CRM, Google Sheets',
    category: 'automation',
    tags: ['no-code', 'workflow', 'integration', 'africa'],
    complexity: 'beginner',
    pricing: 'freemium',
    stars: 119,
    forks: 36,
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'sitegpt',
    name: 'SiteGPT',
    description: 'Chatbot IA connecté à votre site web avec support multilingue',
    category: 'ai-assistant',
    tags: ['chatbot', 'customer-support', 'multilingual'],
    complexity: 'beginner',
    pricing: 'paid',
    stars: 89,
    forks: 23,
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: '3commas',
    name: '3Commas',
    description: 'Agent de trading crypto automatique avec bots intégrés',
    category: 'trading',
    tags: ['crypto', 'trading', 'automation', 'binance'],
    complexity: 'intermediate',
    pricing: 'paid',
    stars: 156,
    forks: 45,
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'IDE IA collaboratif pour développement avec assistance IA',
    category: 'coding',
    tags: ['ide', 'development', 'collaboration', 'ai-assistant'],
    complexity: 'intermediate',
    pricing: 'freemium',
    stars: 234,
    forks: 67,
    novaiaCompatible: true,
    africaOptimized: false
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'Génération vidéo IA pour publicités et clips promotionnels',
    category: 'content',
    tags: ['video-generation', 'marketing', 'advertising'],
    complexity: 'intermediate',
    pricing: 'paid',
    stars: 178,
    forks: 52,
    novaiaCompatible: true,
    africaOptimized: true
  },
  {
    id: 'guardrails-ai',
    name: 'Guardrails AI',
    description: 'Sécurité et gouvernance IA pour prévenir les dérives',
    category: 'security',
    tags: ['security', 'governance', 'ai-safety'],
    complexity: 'advanced',
    pricing: 'enterprise',
    stars: 89,
    forks: 34,
    novaiaCompatible: true,
    africaOptimized: false
  }
];

const categories = [
  { id: 'automation', name: 'Automatisation', icon: '⚙️', count: 12 },
  { id: 'ai-assistant', name: 'Assistants IA', icon: '🤖', count: 8 },
  { id: 'trading', name: 'Trading & Finance', icon: '📈', count: 6 },
  { id: 'coding', name: 'Développement', icon: '💻', count: 10 },
  { id: 'content', name: 'Création de Contenu', icon: '🎨', count: 7 },
  { id: 'security', name: 'Sécurité', icon: '🛡️', count: 5 }
];

export default function AgentGenesisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">🧬</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AgentGenesis Integration
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
            Intégrez les meilleurs agents IA d'AgentGenesis dans votre écosystème NovaIA. 
            Plus de 50 agents spécialisés, optimisés pour l'Afrique.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Agents IA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">119</div>
              <div className="text-gray-300">GitHub Stars</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">36</div>
              <div className="text-gray-300">Forks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">MIT</div>
              <div className="text-gray-300">License</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/DeadmanAbir/AgentGenesis" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Github className="mr-2 h-5 w-5" />
                Voir sur GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/nova-ia">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <ArrowRight className="mr-2 h-5 w-5" />
                Retour à NovaIA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📂 Catégories d'Agents
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explorez les agents IA par catégorie et trouvez celui qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer bg-white/10 backdrop-blur-sm border-white/20">
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
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🌟 Agents Vedettes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Les agents les plus populaires et optimisés pour l'écosystème NovaIA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentGenesisAgents.map((agent) => (
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
                    {agent.africaOptimized && (
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        <Globe className="w-3 h-3 mr-1" />
                        Afrique
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white">{agent.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-gray-300">{agent.forks}</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-white">{agent.complexity}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-400 text-blue-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Zap className="mr-2 h-4 w-4" />
                      Intégrer
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🔗 Avantages de l'Intégration
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pourquoi intégrer AgentGenesis dans votre écosystème NovaIA ?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-4">Intégration Rapide</h3>
              <p className="text-gray-300 mb-4">
                Connectez les agents en quelques clics via API, SDK ou iframe
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-4">Optimisé Afrique</h3>
              <p className="text-gray-300 mb-4">
                Agents spécialement adaptés aux besoins du marché africain
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-4">Sécurisé</h3>
              <p className="text-gray-300 mb-4">
                Intégration sécurisée avec authentification et chiffrement
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-4">Analytics</h3>
              <p className="text-gray-300 mb-4">
                Suivi des performances et utilisation des agents intégrés
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-4">Pricing Flexible</h3>
              <p className="text-gray-300 mb-4">
                Modèles de prix adaptés : gratuit, freemium, payant, entreprise
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-4">Mise à Jour</h3>
              <p className="text-gray-300 mb-4">
                Agents constamment mis à jour avec les dernières fonctionnalités
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Intégrer AgentGenesis ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez l'écosystème NovaIA et accédez à plus de 50 agents IA spécialisés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nova-ia">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Zap className="mr-2 h-5 w-5" />
                Explorer NovaIA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://github.com/DeadmanAbir/AgentGenesis" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Github className="mr-2 h-5 w-5" />
                Voir AgentGenesis
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
