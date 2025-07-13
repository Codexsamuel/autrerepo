import AdvancedAIChatbot from '@/components/ai/AdvancedAIChatbot';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bot,
    Brain,
    CheckCircle,
    Code,
    Layers,
    Moon,
    Shield,
    Sparkles,
    Zap
} from 'lucide-react';

export default function AIChatbotPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assistant IA Avancé
            </h1>
            <p className="text-lg text-gray-600">Multi-modèles avec mode Dark</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Bot className="w-3 h-3" />
            <span>OpenAI GPT-4</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Brain className="w-3 h-3" />
            <span>Google Gemini</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Moon className="w-3 h-3" />
            <span>Dark GPT</span>
          </Badge>
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Multi-Modèles</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Accès à plusieurs modèles IA : GPT-4, Gemini Pro, et Dark GPT pour des réponses optimisées selon vos besoins.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Moon className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Mode Dark</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Activez le mode Dark pour des capacités étendues : génération de code avancée, analyse approfondie, et automatisation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4 text-green-600" />
              </div>
              <CardTitle className="text-lg">Génération de Code</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Génération de code intelligent avec analyse syntaxique, optimisation et suggestions d'amélioration.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Analyse Avancée</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Analyse technique approfondie avec métriques de confiance, coûts et performances en temps réel.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <CardTitle className="text-lg">Sécurité Éthique</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Contrôles de sécurité et restrictions éthiques pour un usage responsable de l'IA.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Métriques Temps Réel</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Suivi en temps réel des tokens, coûts, latence et performances pour optimiser vos interactions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Niveaux du Mode Dark */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="w-5 h-5" />
            <span>Niveaux du Mode Dark</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Basic</Badge>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Niveau Basic</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Analyse technique approfondie</li>
                <li>• Génération de code complexe</li>
                <li>• Résolution de problèmes avancés</li>
                <li>• Suggestions d'optimisation</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Advanced</Badge>
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
              <h4 className="font-medium mb-2">Niveau Advanced</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Capacités système étendues</li>
                <li>• Optimisation de performances</li>
                <li>• Automatisation de tâches</li>
                <li>• Analyse de sécurité</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">Extreme</Badge>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <h4 className="font-medium mb-2">Niveau Extreme</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Capacités maximales</li>
                <li>• Analyse système avancée</li>
                <li>• Automatisation complète</li>
                <li>• Architecture complexe</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Comment utiliser</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Activation du Mode Dark</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Dites "Activer le mode Dark" pour le niveau basic</p>
                <p>• Dites "Activer le mode Dark advanced" pour plus de capacités</p>
                <p>• Dites "Activer le mode Dark extreme" pour les capacités maximales</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Exemples de prompts</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• "Générer une API REST avec Node.js"</p>
                <p>• "Analyser cette fonction et l'optimiser"</p>
                <p>• "Créer un système de cache intelligent"</p>
                <p>• "Déboguer ce code JavaScript"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chatbot */}
      <div className="h-[800px]">
        <AdvancedAIChatbot />
      </div>
    </div>
  );
} 