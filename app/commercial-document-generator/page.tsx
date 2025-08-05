import { Metadata } from 'next';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { CommercialDocumentGenerator } from '@/components/ui/CommercialDocumentGenerator';
import { FileText, Brain, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Générateur de Documents Commerciaux | NovaIA - DL Solutions',
  description: 'Créez des documents commerciaux professionnels automatiquement avec l\'IA. Propositions, présentations, rapports et plans d\'action générés en quelques minutes.',
  keywords: [
    'générateur documents commerciaux',
    'proposition commerciale',
    'présentation business',
    'rapport commercial',
    'plan d\'action',
    'IA business',
    'NovaIA',
    'DL Solutions'
  ],
  openGraph: {
    title: 'Générateur de Documents Commerciaux | NovaIA',
    description: 'Créez des documents commerciaux professionnels avec l\'IA',
    images: ['/images/commercial-document-generator-og.jpg'],
  },
};

export default function CommercialDocumentGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <MainNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📄 Générateur de Documents Commerciaux
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Créez des documents commerciaux professionnels avec l'IA
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Générez automatiquement des propositions commerciales, présentations, rapports et plans d'action 
              personnalisés en quelques minutes. L'IA analyse vos besoins et crée des documents de qualité professionnelle.
            </p>
          </div>

          {/* Générateur */}
          <CommercialDocumentGenerator />

          {/* Avantages */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              🚀 Pourquoi utiliser notre générateur ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">IA Avancée</h3>
                <p className="text-sm text-gray-600">
                  Utilise les dernières technologies d'IA pour générer du contenu de qualité
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Rapide</h3>
                <p className="text-sm text-gray-600">
                  Générez des documents complets en quelques minutes au lieu d'heures
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Professionnel</h3>
                <p className="text-sm text-gray-600">
                  Documents structurés et adaptés aux standards professionnels
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Personnalisé</h3>
                <p className="text-sm text-gray-600">
                  Contenu adapté à votre secteur, ton et objectifs spécifiques
                </p>
              </div>
            </div>
          </div>

          {/* Types de documents */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              📋 Types de Documents Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">📄 Proposition Commerciale</h3>
                <p className="text-gray-600 mb-4">
                  Documents de vente complets avec argumentaire, budget et planning
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Analyse des besoins client</li>
                  <li>• Solution personnalisée</li>
                  <li>• Budget détaillé</li>
                  <li>• Planning de réalisation</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">📊 Présentation Business</h3>
                <p className="text-gray-600 mb-4">
                  Slides professionnelles pour présenter vos services et solutions
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Structure claire et logique</li>
                  <li>• Visuels générés automatiquement</li>
                  <li>• Données et métriques</li>
                  <li>• Call-to-action efficace</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">📈 Rapport Commercial</h3>
                <p className="text-gray-600 mb-4">
                  Analyses détaillées avec insights et recommandations
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Analyse de marché</li>
                  <li>• Étude concurrentielle</li>
                  <li>• Recommandations stratégiques</li>
                  <li>• KPIs et métriques</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">🎯 Plan d'Action</h3>
                <p className="text-gray-600 mb-4">
                  Plans stratégiques avec étapes concrètes et échéances
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Objectifs SMART</li>
                  <li>• Phases de réalisation</li>
                  <li>• Ressources nécessaires</li>
                  <li>• Suivi et évaluation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fonctionnalités avancées */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              ⚡ Fonctionnalités Avancées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">🎨 Personnalisation</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ton personnalisable (professionnel, créatif, technique, amical)</li>
                  <li>• Support multilingue (FR, EN, ES)</li>
                  <li>• Adaptation au secteur d'activité</li>
                  <li>• Intégration de votre branding</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">📊 Contenu Intelligent</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Génération de budget détaillé</li>
                  <li>• Planning de projet automatique</li>
                  <li>• KPIs personnalisés</li>
                  <li>• Images et visuels générés</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">💾 Export Flexible</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Export PDF haute qualité</li>
                  <li>• Format Word éditables</li>
                  <li>• Présentation PowerPoint</li>
                  <li>• Partage et collaboration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              🔧 Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold mb-2">Décrivez votre projet</h3>
                <p className="text-sm text-gray-600">
                  Remplissez le formulaire avec les informations de votre projet, objectifs et contraintes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold mb-2">L'IA génère le contenu</h3>
                <p className="text-sm text-gray-600">
                  Notre IA analyse vos besoins et crée un document complet et personnalisé
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold mb-2">Téléchargez et utilisez</h3>
                <p className="text-sm text-gray-600">
                  Récupérez votre document dans le format souhaité et utilisez-le immédiatement
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à créer votre document commercial ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Commencez maintenant et générez votre document professionnel en quelques minutes
            </p>
            <div className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors cursor-pointer">
              🚀 Commencer la Génération
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 