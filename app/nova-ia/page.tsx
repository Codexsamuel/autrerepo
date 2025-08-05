import { MainNavigation } from '@/components/layout/MainNavigation';
import { NovaIAssistant } from '@/components/ui/NovaIAssistant';
import { Brain } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NovaIA - Centre d\'Intelligence Artificielle | Services IA Avancés',
  description: 'Découvrez 30+ services IA spécialisés : génération de contenu, images, voix, chatbot, e-commerce, automatisation. Trouvez la solution IA parfaite pour vos besoins.',
  keywords: [
    'NovaIA',
    'Intelligence Artificielle',
    'Services IA',
    'Génération de contenu',
    'Images IA',
    'Synthèse vocale',
    'Chatbot IA',
    'E-commerce IA',
    'Automatisation',
    'Analyse IA',
    'Transformation d\'images',
    'Scraping IA',
    'DL Solutions'
  ],
  openGraph: {
    title: 'NovaIA - Centre d\'Intelligence Artificielle',
    description: '30+ services IA spécialisés pour résoudre tous vos problèmes',
    images: ['/images/nova-ia-og.jpg'],
  },
};

export default async function NovaIAPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const initialSearch = params.search || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <MainNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🧠 NovaIA
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Centre d'Intelligence Artificielle
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Décrivez votre besoin et NovaIA vous recommandera les services IA les plus adaptés. 
              30+ services spécialisés pour résoudre tous vos problèmes.
            </p>
          </div>

          {/* Assistant NovaIA */}
          <NovaIAssistant initialSearch={initialSearch} />

          {/* Section Avantages */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              🚀 Pourquoi choisir NovaIA ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Sélection Intelligente</h3>
                <p className="text-sm text-gray-600">
                  NovaIA analyse votre besoin et recommande les services les plus adaptés
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Exécution Rapide</h3>
                <p className="text-sm text-gray-600">
                  Services exécutés en quelques secondes avec résultats immédiats
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-semibold mb-2">Prix Transparents</h3>
                <p className="text-sm text-gray-600">
                  Tarification claire de 5€ à 25€ selon la complexité du service
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-semibold mb-2">Qualité Garantie</h3>
                <p className="text-sm text-gray-600">
                  Précision de 87% à 96% selon le service avec garantie de résultat
                </p>
              </div>
            </div>
          </div>

          {/* Section Services Disponibles */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              📋 Services IA Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">🤖 IA Conversationnelle</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Chat IA Avancé</li>
                  <li>• Assistant Émotionnel</li>
                  <li>• Chatbot Personnalisé</li>
                  <li>• Questions/Réponses IA</li>
                  <li>• Support multilingue</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">🎨 Génération d'Images</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Text-to-Image IA</li>
                  <li>• Style Ghibli</li>
                  <li>• Cartoonisation</li>
                  <li>• Face Swap Pro</li>
                  <li>• Suppression d'arrière-plan</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">🎙️ Audio & Voix</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Synthèse vocale naturelle</li>
                  <li>• Transcription automatique</li>
                  <li>• Détection d'émotions vocales</li>
                  <li>• Support multilingue</li>
                  <li>• Export haute qualité</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">📊 Business Intelligence</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Analyse de données</li>
                  <li>• Scraping intelligent</li>
                  <li>• Recherche avancée</li>
                  <li>• Résumé automatique</li>
                  <li>• Rapports détaillés</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">📝 Marketing & Contenu</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Génération contenu marketing</li>
                  <li>• Détection contenu IA</li>
                  <li>• Traduction multilingue</li>
                  <li>• Optimisation SEO</li>
                  <li>• Analytics de performance</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">🛒 E-commerce</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Analyse concurrents</li>
                  <li>• Génération descriptions produits</li>
                  <li>• Optimisation catalogue</li>
                  <li>• Veille concurrentielle</li>
                  <li>• Rapports business</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Comment ça marche */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              🔧 Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Décrivez votre besoin</h3>
                <p className="text-sm text-gray-600">
                  Expliquez simplement ce que vous voulez accomplir avec l'IA
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">NovaIA recommande</h3>
                <p className="text-sm text-gray-600">
                  Notre IA analyse votre demande et sélectionne les meilleurs services
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Exécution et résultats</h3>
                <p className="text-sm text-gray-600">
                  Le service s'exécute automatiquement et vous livre les résultats
                </p>
              </div>
            </div>
          </div>

          {/* Section Questions Fréquentes */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              ❓ Questions Fréquentes
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Comment fonctionne la tarification ?</h3>
                <p className="text-sm text-gray-600">
                  Chaque service a un prix fixe de 5€ à 25€ selon sa complexité. Vous payez uniquement ce que vous utilisez.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Quelle est la qualité des résultats ?</h3>
                <p className="text-sm text-gray-600">
                  Nos services ont une précision de 87% à 96% selon le type de service. Tous les résultats sont garantis.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Puis-je utiliser les résultats commercialement ?</h3>
                <p className="text-sm text-gray-600">
                  Oui, tous nos services incluent une licence d'usage commercial pour vos projets.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Combien de temps dure l'exécution ?</h3>
                <p className="text-sm text-gray-600">
                  La plupart des services s'exécutent en 5 à 30 secondes. Les services complexes peuvent prendre jusqu'à 2 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à transformer votre business avec l'IA ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines d'entreprises qui utilisent déjà NovaIA pour optimiser leurs processus.
            </p>
            <Link
              href="#"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Brain className="w-6 h-6" />
              <span>Commencer maintenant</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 