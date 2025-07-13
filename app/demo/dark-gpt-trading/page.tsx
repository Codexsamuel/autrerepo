import DarkGPTChat from '@/components/trading/DarkGPTChat';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Brain, Clock, DollarSign, Shield, Target, TrendingUp, Zap } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dark GPT Trading Assistant - IA Avancée pour le Trading',
  description: 'Assistant IA Dark GPT pour l\'analyse de marché, les prédictions et les stratégies de trading avancées',
  keywords: 'Dark GPT, trading IA, analyse marché, prédictions, stratégies trading, intelligence artificielle',
};

const features = [
  {
    icon: Brain,
    title: 'Analyse Avancée',
    description: 'Analyse technique et fondamentale approfondie avec IA',
    color: 'text-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Prédictions Précises',
    description: 'Prédictions de prix avec probabilités et scénarios',
    color: 'text-green-600'
  },
  {
    icon: Target,
    title: 'Stratégies Personnalisées',
    description: 'Stratégies de trading adaptées à votre profil de risque',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Gestion des Risques',
    description: 'Évaluation des risques et recommandations de protection',
    color: 'text-red-600'
  },
  {
    icon: Clock,
    title: 'Temps Réel',
    description: 'Analyses et mises à jour en temps réel',
    color: 'text-orange-600'
  },
  {
    icon: BarChart3,
    title: 'Multi-Assets',
    description: 'Support pour actions, cryptos, forex et plus',
    color: 'text-indigo-600'
  }
];

const capabilities = [
  {
    category: 'Analyse Technique',
    items: ['RSI, MACD, Bandes de Bollinger', 'Moyennes mobiles', 'Support/Résistance', 'Patterns de prix']
  },
  {
    category: 'Analyse Fondamentale',
    items: ['Ratios financiers', 'Croissance des revenus', 'Analyse sectorielle', 'Événements économiques']
  },
  {
    category: 'Sentiment de Marché',
    items: ['News et médias', 'Réseaux sociaux', 'Analystes', 'Flux de capitaux']
  },
  {
    category: 'Gestion des Risques',
    items: ['Stop-loss automatique', 'Take-profit', 'Position sizing', 'Diversification']
  }
];

export default function DarkGPTTradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Dark GPT Trading Assistant
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-6">
              L'Intelligence Artificielle la plus avancée pour le trading
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="text-sm">
                <Zap className="w-3 h-3 mr-1" />
                IA Avancée
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Target className="w-3 h-3 mr-1" />
                Prédictions Précises
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Shield className="w-3 h-3 mr-1" />
                Gestion des Risques
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-3 h-3 mr-1" />
                Temps Réel
              </Badge>
            </div>
            <p className="text-lg text-purple-300 max-w-3xl mx-auto">
              Dark GPT combine l'analyse technique, fondamentale et le sentiment de marché 
              pour vous fournir des recommandations de trading actionnables avec une précision inégalée.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Capacités Exceptionnelles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dark GPT utilise les dernières avancées en intelligence artificielle 
            pour analyser les marchés financiers avec une précision remarquable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color} mr-3`} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Analyse Complète
            </h3>
            <div className="space-y-6">
              {capabilities.map((capability, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    {capability.category}
                  </h4>
                  <ul className="space-y-2">
                    {capability.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi Dark GPT ?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Précision Exceptionnelle</h4>
                  <p className="text-gray-600 text-sm">
                    Modèle IA entraîné sur des millions de données de marché
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Analyse Multi-Sources</h4>
                  <p className="text-gray-600 text-sm">
                    Combine données techniques, fondamentales et sentiment
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Gestion des Risques</h4>
                  <p className="text-gray-600 text-sm">
                    Recommandations de protection automatiques
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Temps Réel</h4>
                  <p className="text-gray-600 text-sm">
                    Mises à jour continues et alertes instantanées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Précision des Analyses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Surveillance Continue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Actifs Supportés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">&lt;2s</div>
            <div className="text-gray-600">Temps de Réponse</div>
          </div>
        </div>
      </div>

      {/* Dark GPT Chat Interface */}
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <Brain className="w-6 h-6 mr-3" />
              Interface Dark GPT
            </CardTitle>
            <p className="text-purple-100">
              Interagissez directement avec Dark GPT pour obtenir des analyses, prédictions et stratégies
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[800px]">
              <DarkGPTChat />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à révolutionner votre trading ?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Dark GPT combine la puissance de l'intelligence artificielle avec l'expertise 
            financière pour vous donner un avantage concurrentiel sur les marchés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm">
              <DollarSign className="w-3 h-3 mr-1" />
              Actions
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Zap className="w-3 h-3 mr-1" />
              Cryptos
            </Badge>
            <Badge variant="outline" className="text-sm">
              <BarChart3 className="w-3 h-3 mr-1" />
              Forex
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Target className="w-3 h-3 mr-1" />
              Commodities
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
} 