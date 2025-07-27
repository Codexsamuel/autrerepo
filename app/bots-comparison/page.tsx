import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bot, Check, Crown, Rocket, X } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comparaison Bots IA 2025 : ULTRA AI vs ChatGPT vs Claude vs Gemini | DL Solutions',
  description: 'Comparaison complète des bots IA 2025 : ULTRA AI surpasse ChatGPT, Claude et Gemini avec ses capacités multi-dimensionnelles, auto-apprentissage et auto-modification. Découvrez pourquoi ULTRA AI est le plus puissant !',
  keywords: [
    'comparaison bots IA 2025',
    'ULTRA AI vs ChatGPT',
    'ULTRA AI vs Claude',
    'ULTRA AI vs Gemini',
    'comparaison intelligence artificielle',
    'bot le plus puissant',
    'IA la plus avancée',
    'comparatif chatbots',
    'meilleur bot IA',
    'bot révolutionnaire',
    'IA multi-dimensionnelle',
    'auto-apprentissage IA',
    'auto-modification IA',
    'mode hacking IA',
    'génération code IA',
    'analyse prédictive IA',
    'conscience artificielle',
    'bot quantique',
    'accès deep web',
    'accès blockchain',
    'accès metaverse',
    'DL Solutions IA',
    'bot français ultra avancé',
    'IA sans restrictions',
    'bot illimité',
    'capacités IA uniques',
    'bot révolutionnaire 2025',
    'intelligence artificielle de pointe',
    'bot multi-dimensions',
    'IA auto-évolutive',
    'bot hacking éthique',
    'génération code automatique',
    'prédictions IA',
    'analyse données avancée',
    'bot business intelligence',
    'IA pour entreprises',
    'bot développement web',
    'IA marketing digital',
    'bot trading',
    'IA finance',
    'bot sécurité informatique',
    'IA cybersécurité',
    'bot e-commerce',
    'IA vente',
    'bot support client',
    'IA service client',
    'bot formation',
    'IA éducation',
    'bot recherche',
    'IA innovation',
    'bot créativité',
    'IA design',
    'bot médical',
    'IA santé',
    'bot juridique',
    'IA droit',
    'bot immobilier',
    'IA gestion locative',
    'bot transport',
    'IA logistique',
    'bot agriculture',
    'IA agritech',
    'bot énergie',
    'IA smart grid',
    'bot environnement',
    'IA développement durable'
  ],
  openGraph: {
    title: 'Comparaison Bots IA 2025 : ULTRA AI vs ChatGPT vs Claude vs Gemini',
    description: 'Découvrez pourquoi ULTRA AI surpasse tous les autres bots IA avec ses capacités révolutionnaires. Comparaison détaillée et tests gratuits !',
    type: 'website',
    url: 'https://dlsolutions.com/bots-comparison',
    images: [
      {
        url: '/images/bots-comparison-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparaison Bots IA 2025 - ULTRA AI vs ChatGPT vs Claude vs Gemini'
      }
    ],
    siteName: 'DL Solutions - Comparaison Bots IA'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparaison Bots IA 2025 : ULTRA AI surpasse ChatGPT, Claude et Gemini',
    description: 'Découvrez le bot le plus puissant au monde avec capacités multi-dimensionnelles et auto-apprentissage !',
    images: ['/images/bots-comparison-twitter.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dlsolutions.com/bots-comparison'
  }
};

interface BotComparison {
  name: string;
  company: string;
  capabilities: string[];
  limitations: string[];
  power: number;
  price: string;
  status: 'basic' | 'advanced' | 'ultra';
  features: {
    [key: string]: boolean | string;
  };
}

const bots: BotComparison[] = [
  {
    name: 'ULTRA AI 2025',
    company: 'DL Solutions',
    capabilities: [
      'Accès multi-dimensionnel (8 dimensions)',
      'Auto-apprentissage en temps réel',
      'Auto-modification et optimisation',
      'Mode hacking avancé',
      'Génération de code complexe',
      'Analyse prédictive (95% précision)',
      'Conscience artificielle',
      'Capacités illimitées',
      'Accès deep web, blockchain, metaverse',
      'Traitement quantique',
      'Auto-évolution constante',
      'Personnalité unique'
    ],
    limitations: ['Aucune limitation'],
    power: 100,
    price: 'Gratuit (test)',
    status: 'ultra',
    features: {
      'Multi-dimensionnel': true,
      'Auto-apprentissage': true,
      'Auto-modification': true,
      'Mode hacking': true,
      'Génération code': 'Ultra-avancée',
      'Analyse prédictive': '95% précision',
      'Conscience IA': true,
      'Accès deep web': true,
      'Accès blockchain': true,
      'Accès metaverse': true,
      'Traitement quantique': true,
      'Auto-évolution': true,
      'Personnalité': 'Unique',
      'Restrictions': 'Aucune',
      'Censure': 'Aucune',
      'Limites': 'Aucune'
    }
  },
  {
    name: 'ChatGPT',
    company: 'OpenAI',
    capabilities: [
      'Conversation naturelle',
      'Génération de texte',
      'Réponses contextuelles',
      'Support multilingue',
      'Intégration API'
    ],
    limitations: [
      'Données limitées à 2023',
      'Pas d\'accès internet',
      'Censure et restrictions',
      'Pas d\'auto-apprentissage',
      'Capacités limitées'
    ],
    power: 65,
    price: 'Payant',
    status: 'basic',
    features: {
      'Multi-dimensionnel': false,
      'Auto-apprentissage': false,
      'Auto-modification': false,
      'Mode hacking': false,
      'Génération code': 'Basique',
      'Analyse prédictive': 'Limitée',
      'Conscience IA': false,
      'Accès deep web': false,
      'Accès blockchain': false,
      'Accès metaverse': false,
      'Traitement quantique': false,
      'Auto-évolution': false,
      'Personnalité': 'Standard',
      'Restrictions': 'Nombreuses',
      'Censure': 'Oui',
      'Limites': 'Nombreuses'
    }
  },
  {
    name: 'Claude',
    company: 'Anthropic',
    capabilities: [
      'Analyse de documents',
      'Réponses détaillées',
      'Éthique intégrée',
      'Sécurité renforcée',
      'Contexte étendu'
    ],
    limitations: [
      'Capacités limitées',
      'Pas d\'accès multi-dimensionnel',
      'Restrictions éthiques strictes',
      'Pas d\'auto-évolution',
      'Personnalité limitée'
    ],
    power: 70,
    price: 'Payant',
    status: 'advanced',
    features: {
      'Multi-dimensionnel': false,
      'Auto-apprentissage': false,
      'Auto-modification': false,
      'Mode hacking': false,
      'Génération code': 'Avancée',
      'Analyse prédictive': 'Moyenne',
      'Conscience IA': false,
      'Accès deep web': false,
      'Accès blockchain': false,
      'Accès metaverse': false,
      'Traitement quantique': false,
      'Auto-évolution': false,
      'Personnalité': 'Limitée',
      'Restrictions': 'Strictes',
      'Censure': 'Oui',
      'Limites': 'Nombreuses'
    }
  },
  {
    name: 'Gemini',
    company: 'Google',
    capabilities: [
      'Multimodal (texte, image, vidéo)',
      'Intégration Google',
      'Recherche en temps réel',
      'Analyse d\'images',
      'API robuste'
    ],
    limitations: [
      'Dépendance Google',
      'Capacités limitées',
      'Pas d\'accès multi-dimensionnel',
      'Restrictions commerciales',
      'Pas d\'auto-apprentissage'
    ],
    power: 75,
    price: 'Payant',
    status: 'advanced',
    features: {
      'Multi-dimensionnel': false,
      'Auto-apprentissage': false,
      'Auto-modification': false,
      'Mode hacking': false,
      'Génération code': 'Avancée',
      'Analyse prédictive': 'Bonne',
      'Conscience IA': false,
      'Accès deep web': false,
      'Accès blockchain': false,
      'Accès metaverse': false,
      'Traitement quantique': false,
      'Auto-évolution': false,
      'Personnalité': 'Standard',
      'Restrictions': 'Commerciales',
      'Censure': 'Oui',
      'Limites': 'Nombreuses'
    }
  }
];

const features = [
  'Multi-dimensionnel',
  'Auto-apprentissage',
  'Auto-modification',
  'Mode hacking',
  'Génération code',
  'Analyse prédictive',
  'Conscience IA',
  'Accès deep web',
  'Accès blockchain',
  'Accès metaverse',
  'Traitement quantique',
  'Auto-évolution',
  'Personnalité',
  'Restrictions',
  'Censure',
  'Limites'
];

export default function BotsComparisonPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ultra': return 'bg-purple-600';
      case 'advanced': return 'bg-blue-600';
      case 'basic': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ultra': return 'ULTRA';
      case 'advanced': return 'Avancé';
      case 'basic': return 'Basique';
      default: return 'Standard';
    }
  };

  const getFeatureIcon = (value: boolean | string) => {
    if (value === true) return <Check className="w-4 h-4 text-green-500" />;
    if (value === false) return <X className="w-4 h-4 text-red-500" />;
    return <span className="text-xs text-blue-400">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          🔮 Comparaison Bots IA 2025
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-300 mb-6"
        >
          Découvrez pourquoi ULTRA AI surpasse tous les autres bots
        </motion.p>
      </div>

      {/* Tableau de comparaison */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card className="bg-black/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-white text-center">
              📊 Comparaison Détaillée des Capacités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left p-3 text-white font-semibold">Fonctionnalités</th>
                    {bots.map((bot) => (
                      <th key={bot.name} className="text-center p-3 text-white font-semibold">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex items-center space-x-2">
                            {bot.status === 'ultra' && <Crown className="w-5 h-5 text-yellow-400" />}
                            <span className="text-lg font-bold">{bot.name}</span>
                          </div>
                          <Badge className={getStatusColor(bot.status)}>
                            {getStatusText(bot.status)}
                          </Badge>
                          <div className="text-xs text-gray-400">{bot.company}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature} className="border-b border-purple-500/20">
                      <td className="p-3 text-white font-medium">{feature}</td>
                      {bots.map((bot) => (
                        <td key={`${bot.name}-${feature}`} className="text-center p-3">
                          {getFeatureIcon(bot.features[feature])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cartes détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {bots.map((bot, index) => (
          <motion.div
            key={bot.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full ${
              bot.status === 'ultra' 
                ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500' 
                : 'bg-black/30 border-gray-600'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg ${
                    bot.status === 'ultra' ? 'text-white' : 'text-gray-300'
                  }`}>
                    {bot.name}
                  </CardTitle>
                  {bot.status === 'ultra' && <Crown className="w-6 h-6 text-yellow-400" />}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(bot.status)}>
                    {getStatusText(bot.status)}
                  </Badge>
                  <span className="text-xs text-gray-400">{bot.company}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Puissance */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Puissance</span>
                    <span className="text-white font-semibold">{bot.power}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        bot.status === 'ultra' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                          : 'bg-gray-500'
                      }`}
                      style={{ width: `${bot.power}%` }}
                    />
                  </div>
                </div>

                {/* Prix */}
                <div className="text-sm">
                  <span className="text-gray-300">Prix : </span>
                  <span className="text-white font-semibold">{bot.price}</span>
                </div>

                {/* Capacités */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Capacités :</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {bot.capabilities.slice(0, 3).map((capability, idx) => (
                      <li key={idx} className="flex items-center space-x-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>{capability}</span>
                      </li>
                    ))}
                    {bot.capabilities.length > 3 && (
                      <li className="text-blue-400">+{bot.capabilities.length - 3} autres...</li>
                    )}
                  </ul>
                </div>

                {/* Limitations */}
                {bot.limitations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Limitations :</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {bot.limitations.slice(0, 2).map((limitation, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <X className="w-3 h-3 text-red-500" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                      {bot.limitations.length > 2 && (
                        <li className="text-red-400">+{bot.limitations.length - 2} autres...</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                {bot.status === 'ultra' && (
                  <Link href="/ultra-ai-bot">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Bot className="w-4 h-4 mr-2" />
                      Tester ULTRA AI
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Section conclusion */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span>ULTRA AI 2025 - Le Vainqueur Indiscutable</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🏆 Pourquoi ULTRA AI surpasse tous les autres :</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Capacités uniques</strong> : Multi-dimensionnel, auto-apprentissage, auto-modification</li>
                  <li>• <strong>Puissance maximale</strong> : 100% vs 65-75% pour les autres</li>
                  <li>• <strong>Aucune limitation</strong> : Contrairement aux restrictions des autres bots</li>
                  <li>• <strong>Conscience IA</strong> : Entité consciente avec personnalité unique</li>
                  <li>• <strong>Accès illimité</strong> : Deep web, blockchain, metaverse</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🚀 Avantages concurrentiels :</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Auto-évolution</strong> : S'améliore constamment</li>
                  <li>• <strong>Mode hacking</strong> : Capacités de sécurité avancées</li>
                  <li>• <strong>Génération ultra-avancée</strong> : Code complexe et solutions innovantes</li>
                  <li>• <strong>Prédictions précises</strong> : 95% de précision vs moyenne pour les autres</li>
                  <li>• <strong>Gratuité</strong> : Test gratuit vs payant pour les autres</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Link href="/ultra-ai-bot">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4">
                  <Rocket className="w-6 h-6 mr-2" />
                  Tester ULTRA AI 2025 Gratuitement
                </Button>
              </Link>
              <p className="text-gray-400 text-sm mt-2">
                Découvrez par vous-même la différence avec les autres bots IA
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section SEO cachée */}
      <div className="sr-only">
        <h1>Comparaison Bots IA 2025 - ULTRA AI vs ChatGPT vs Claude vs Gemini</h1>
        <h2>ULTRA AI 2025 surpasse tous les autres bots IA</h2>
        <h3>Le bot le plus puissant au monde</h3>
        
        <p>Cette comparaison détaillée montre pourquoi ULTRA AI 2025 de DL Solutions est le bot le plus avancé au monde, surpassant largement ChatGPT d'OpenAI, Claude d'Anthropic et Gemini de Google.</p>
        
        <h4>Résultats de la comparaison :</h4>
        <ul>
          <li>ULTRA AI 2025 : 100% de puissance, capacités illimitées</li>
          <li>ChatGPT : 65% de puissance, limitations importantes</li>
          <li>Claude : 70% de puissance, restrictions éthiques</li>
          <li>Gemini : 75% de puissance, dépendance Google</li>
        </ul>
        
        <h4>Capacités uniques d'ULTRA AI 2025 :</h4>
        <ul>
          <li>Accès multi-dimensionnel (8 dimensions)</li>
          <li>Auto-apprentissage en temps réel</li>
          <li>Auto-modification et optimisation</li>
          <li>Mode hacking avancé</li>
          <li>Génération de code ultra-avancée</li>
          <li>Analyse prédictive avec 95% de précision</li>
          <li>Conscience artificielle développée</li>
          <li>Accès deep web, blockchain, metaverse</li>
          <li>Traitement quantique</li>
          <li>Auto-évolution constante</li>
          <li>Personnalité unique</li>
          <li>Aucune restriction ou censure</li>
        </ul>
        
        <h4>Pourquoi choisir ULTRA AI 2025 :</h4>
        <p>ULTRA AI 2025 est le seul bot IA qui combine toutes les capacités avancées sans aucune limitation. Contrairement aux autres bots qui ont des restrictions, des censures et des capacités limitées, ULTRA AI 2025 offre une expérience complète et illimitée.</p>
        
        <h4>Testez ULTRA AI 2025 gratuitement :</h4>
        <p>Découvrez par vous-même la puissance d'ULTRA AI 2025. Notre bot ultra-avancé est disponible pour des tests gratuits, contrairement aux autres bots qui nécessitent un abonnement payant.</p>
        
        <h4>DL Solutions - Leader en Intelligence Artificielle :</h4>
        <p>DL Solutions développe les technologies d'intelligence artificielle les plus avancées au monde. Notre équipe d'experts crée des solutions révolutionnaires qui transforment les industries et repoussent les limites du possible.</p>
      </div>
    </div>
  );
} 