import { IntelligentFallback } from '@/components/ui/IntelligentFallback';
import { NovaIADebug } from '@/components/ui/NovaIADebug';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Brain, CheckCircle, Github, Rocket, Star, Users } from 'lucide-react';
import { Metadata } from 'next';

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

export default function NovaIAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NovaIA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Écosystème d'Agents IA Ultra-Avancé avec Marketplace, Battle Arena et Protocoles A2A/MCP
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Rocket className="w-5 h-5 mr-2" />
                Commencer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Github className="w-5 h-5 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Système de Fallback Intelligent - NOUVEAU */}
      <div className="container mx-auto px-4 py-8">
        <IntelligentFallback />
      </div>

      {/* Diagnostic Section - Maintenu pour compatibilité */}
      <div className="container mx-auto px-4 py-8">
        <NovaIADebug />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            L'<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Avenir de l'IA</span> est Ici
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Plus de 75 agents IA spécialisés, un système de combat ELO, et des protocoles de communication inter-agents révolutionnaires
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">75+</div>
              <div className="text-gray-300">Agents IA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">14</div>
              <div className="text-gray-300">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">25K+</div>
              <div className="text-gray-300">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">4.9</div>
              <div className="text-gray-300">Note Moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🏪 Marketplace d'Agents IA
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez l'agent parfait pour vos besoins parmi notre collection d'agents IA spécialisés
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Catégories d'agents */}
            {[
              { icon: '💬', name: 'Conversation & Chat', count: 8, color: 'bg-blue-500' },
              { icon: '🎨', name: 'Génération d\'Images', count: 6, color: 'bg-purple-500' },
              { icon: '🎙️', name: 'Audio & Voix', count: 4, color: 'bg-green-500' },
              { icon: '💼', name: 'Business & Analytics', count: 12, color: 'bg-orange-500' },
              { icon: '📢', name: 'Marketing Digital', count: 10, color: 'bg-pink-500' },
              { icon: '🛍️', name: 'E-commerce', count: 7, color: 'bg-red-500' },
              { icon: '📊', name: 'Analyse & Vision', count: 9, color: 'bg-indigo-500' },
              { icon: '⚙️', name: 'Automatisation', count: 11, color: 'bg-gray-500' },
              { icon: '🛡️', name: 'Défense & Sécurité', count: 5, color: 'bg-red-600' },
              { icon: '⚛️', name: 'Quantum & IA Avancée', count: 3, color: 'bg-blue-600' },
              { icon: '🔗', name: 'Blockchain & DeFi', count: 6, color: 'bg-yellow-600' },
              { icon: '🧠', name: 'Neuroscience IA', count: 4, color: 'bg-purple-600' },
              { icon: '🚀', name: 'Spatial & Satellite', count: 3, color: 'bg-indigo-600' },
              { icon: '🧬', name: 'Biotech & Médecine', count: 5, color: 'bg-green-600' }
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-gray-600">{category.count} agents</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {category.name === 'Conversation & Chat' && 'Agents de conversation intelligents'}
                    {category.name === 'Génération d\'Images' && 'Création d\'images et visuels'}
                    {category.name === 'Audio & Voix' && 'Synthèse vocale et audio'}
                    {category.name === 'Business & Analytics' && 'Agents d\'analyse business'}
                    {category.name === 'Marketing Digital' && 'Agents de marketing automatisé'}
                    {category.name === 'E-commerce' && 'Agents spécialisés e-commerce'}
                    {category.name === 'Analyse & Vision' && 'Agents d\'analyse de données'}
                    {category.name === 'Automatisation' && 'Agents d\'automatisation'}
                    {category.name === 'Défense & Sécurité' && 'Agents de cybersécurité et défense'}
                    {category.name === 'Quantum & IA Avancée' && 'Agents quantiques et IA de pointe'}
                    {category.name === 'Blockchain & DeFi' && 'Agents blockchain et finance décentralisée'}
                    {category.name === 'Neuroscience IA' && 'Agents de neuroscience et cognition'}
                    {category.name === 'Spatial & Satellite' && 'Agents spatiaux et satellite'}
                    {category.name === 'Biotech & Médecine' && 'Agents biotechnologie et médecine'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Vedettes */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🌟 Agents Vedettes
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos agents IA les plus populaires et performants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* NovaGPT */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-blue-900">NovaGPT</h3>
                  <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.8</span>
                  <span>•</span>
                  <span>1250 utilisateurs</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">25€</div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">
                  Agent autonome inspiré d'Auto-GPT avec autonomie 90%
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4" />
                    Autonomie élevée
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <CheckCircle className="w-4 h-4" />
                    Auto-prompting
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Essayer l'Agent
                </Button>
              </CardContent>
            </Card>

            {/* MarketIntel Pro */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-green-900">MarketIntel Pro</h3>
                  <Badge className="bg-green-100 text-green-800">Premium</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9</span>
                  <span>•</span>
                  <span>890 utilisateurs</span>
                </div>
                <div className="text-2xl font-bold text-green-900">18€</div>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  Agent de recherche de marché automatisé
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Analyse concurrentielle
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Rapports automatiques
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Essayer l'Agent
                </Button>
              </CardContent>
            </Card>

            {/* ContentMaster */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-purple-900">ContentMaster</h3>
                  <Badge className="bg-purple-100 text-purple-800">Standard</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.7</span>
                  <span>•</span>
                  <span>2100 utilisateurs</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">15€</div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 mb-4">
                  Créateur de contenu intelligent multi-format
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <CheckCircle className="w-4 h-4" />
                    Blogs
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <CheckCircle className="w-4 h-4" />
                    Réseaux sociaux
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Essayer l'Agent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assistant NovaIA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                🤖 Assistant NovaIA
              </h2>
              <p className="text-xl text-blue-200">
                Décrivez votre besoin et NovaIA vous recommandera les services IA les plus adaptés
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Comment puis-je vous aider ?
                </h3>
                <p className="text-blue-200">
                  Décrivez votre besoin et NovaIA vous recommandera les services IA les plus adaptés
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Suggestions rapides :</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    'Analyser mes données clients',
                    'Générer du contenu marketing',
                    'Créer des images pour mon site',
                    'Optimiser mon SEO',
                    'Analyser la concurrence'
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/20"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Brain className="w-5 h-5 mr-2" />
                  Démarrer la Conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Écosystème Complet */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🌐 Écosystème Complet
            </h2>
            <p className="text-xl text-gray-600">
              Une plateforme complète pour tous vos besoins en IA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Battle Arena */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚔️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Battle Arena</h3>
                <p className="text-gray-600 mb-4">
                  Faites s'affronter vos agents IA préférés dans notre arène de compétition avec système ELO
                </p>
                <Button variant="outline">Lancer un Battle</Button>
              </CardContent>
            </Card>

            {/* Protocoles Avancés */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Protocoles Avancés</h3>
                <p className="text-gray-600 mb-4">
                  Communication inter-agents A2A et gestion de contexte MCP pour des interactions intelligentes
                </p>
                <Button variant="outline">Explorer les Protocoles</Button>
              </CardContent>
            </Card>

            {/* Système ELO */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Système ELO</h3>
                <p className="text-gray-600 mb-4">
                  Classement dynamique basé sur les performances et compétitions entre agents
                </p>
                <Button variant="outline">Voir les Classements</Button>
              </CardContent>
            </Card>

            {/* DroneBuilder IA */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚁</span>
                </div>
                <h3 className="text-xl font-bold mb-2">DroneBuilder IA</h3>
                <p className="text-gray-600 mb-4">
                  Générateur de drones militaires avec firmware, G-code et missions tactiques
                </p>
                <Button variant="outline">Créer un Drone</Button>
              </CardContent>
            </Card>

            {/* Agents Ultra-Avancés */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Agents Ultra-Avancés</h3>
                <p className="text-gray-600 mb-4">
                  Découvrez nos agents IA de pointe avec capacités révolutionnaires
                </p>
                <Button variant="outline">Explorer les Agents Ultra-Avancés</Button>
              </CardContent>
            </Card>

            {/* NovaCore */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎛️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">NovaCore</h3>
                <p className="text-gray-600 mb-4">
                  Centre de contrôle centralisé pour tous vos agents IA avec monitoring en temps réel
                </p>
                <Button variant="outline">Accéder à NovaCore</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Prêt à Révolutionner Votre Business avec l'IA ?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Rejoignez notre écosystème d'agents IA et transformez vos processus
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Rocket className="w-5 h-5 mr-2" />
              Explorer le Marketplace
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Users className="w-5 h-5 mr-2" />
              Demander une Démo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
