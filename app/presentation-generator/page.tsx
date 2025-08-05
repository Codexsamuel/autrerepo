import { Metadata } from 'next';
import { MainNavigation } from '@/components/layout/MainNavigation';

export const metadata: Metadata = {
  title: 'Générateur de Présentation Commerciale NovaIA | DL Solutions',
  description: 'Créez des présentations commerciales professionnelles automatiquement avec IA. Génération de slides, contenu et images avec NovaIA.',
  keywords: [
    'Générateur présentation',
    'Présentation commerciale',
    'PowerPoint IA',
    'Slides automatiques',
    'NovaIA',
    'DL Solutions'
  ]
};

export default function PresentationGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <MainNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎯 Générateur de Présentation
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Commerciale NovaIA
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Créez des présentations commerciales professionnelles automatiquement avec IA. 
              Génération de slides, contenu et images avec NovaIA.
            </p>
          </div>

          {/* Interface du générateur */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">🚀 Créez votre présentation en quelques clics</h2>
              <p className="text-gray-600">
                Définissez votre sujet, audience et ton. NovaIA génère automatiquement une présentation complète.
              </p>
            </div>

            {/* Formulaire simplifié */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Sujet de la présentation</label>
                <input
                  type="text"
                  placeholder="Ex: DL Solutions - Plateforme IA Avancée"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Audience</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="clients">Clients</option>
                    <option value="investisseurs">Investisseurs</option>
                    <option value="partenaires">Partenaires</option>
                    <option value="équipe">Équipe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ton</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="professionnel">Professionnel</option>
                    <option value="inspirant">Inspirant</option>
                    <option value="commercial">Commercial</option>
                    <option value="technique">Technique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slides</label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="8">8 slides</option>
                    <option value="10">10 slides</option>
                    <option value="12">12 slides</option>
                    <option value="15">15 slides</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeImages"
                  checked
                  className="rounded"
                />
                <label htmlFor="includeImages" className="text-sm font-medium">
                  Inclure des images générées par IA
                </label>
              </div>

              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg">
                  🎯 Générer la présentation
                </button>
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold mb-2">Contenu IA</h3>
              <p className="text-sm text-gray-600">
                Génération automatique de contenu professionnel pour chaque slide
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold mb-2">Images IA</h3>
              <p className="text-sm text-gray-600">
                Création d'images personnalisées avec style Ghibli et Face Swap
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Export PowerPoint</h3>
              <p className="text-sm text-gray-600">
                Export en format PowerPoint (.pptx) prêt à utiliser
              </p>
            </div>
          </div>

          {/* Exemples */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">💡 Exemples de présentations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">DL Solutions - Plateforme IA Avancée</h3>
                <p className="text-sm text-gray-600 mb-3">Présentation pour investisseurs</p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Investisseurs</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Professionnel</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">NovaIA - Centre d'Intelligence Artificielle</h3>
                <p className="text-sm text-gray-600 mb-3">Présentation commerciale</p>
                <div className="flex space-x-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Clients</span>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Commercial</span>
                </div>
              </div>
            </div>
          </div>

          {/* Avantages */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">🚀 Pourquoi choisir notre générateur ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Rapide</h3>
                <p className="text-sm text-gray-600">
                  Génération en quelques minutes au lieu d'heures
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Personnalisé</h3>
                <p className="text-sm text-gray-600">
                  Contenu adapté à votre audience et objectifs
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="font-semibold mb-2">Professionnel</h3>
                <p className="text-sm text-gray-600">
                  Design et contenu de niveau entreprise
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-semibold mb-2">Économique</h3>
                <p className="text-sm text-gray-600">
                  Économisez des milliers d'euros en agence
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 