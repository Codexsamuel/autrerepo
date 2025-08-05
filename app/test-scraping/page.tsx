import { Metadata } from 'next';
import { ScrapingTest } from '@/components/ui/ScrapingTest';

export const metadata: Metadata = {
  title: 'Test Scraping APIs Réelles - DL Solutions',
  description: 'Testez les vraies APIs RapidAPI pour récupérer des produits de vrais marchés (AliExpress, eBay, Taobao, 1688, Google Shopping)',
  keywords: [
    'test scraping',
    'APIs réelles',
    'RapidAPI',
    'AliExpress',
    'eBay',
    'Taobao',
    '1688',
    'Google Shopping',
    'produits vrais marchés',
    'DL Solutions'
  ]
};

export default function TestScrapingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Test des APIs de Scraping Réelles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testez les vraies APIs RapidAPI pour récupérer des produits de vrais marchés.
            <br />
            AliExpress, eBay, Taobao, 1688, Google Shopping - Tout en temps réel !
          </p>
        </div>

        <ScrapingTest />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔍 AliExpress</h3>
            <p className="text-blue-700 text-sm">
              Produits chinois avec prix compétitifs et livraison mondiale
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🏪 eBay</h3>
            <p className="text-green-700 text-sm">
              Enchères et produits neufs/occasion du monde entier
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">🛒 Taobao</h3>
            <p className="text-red-700 text-sm">
              Marketplace chinoise avec millions de produits
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🏭 1688</h3>
            <p className="text-purple-700 text-sm">
              Plateforme B2B chinoise pour grossistes
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">🔎 Google Shopping</h3>
            <p className="text-yellow-700 text-sm">
              Comparateur de prix et recherche de produits
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Temps Réel</h3>
            <p className="text-gray-700 text-sm">
              Données mises à jour en temps réel via RapidAPI
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🎯 Fonctionnalités Avancées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">✅ APIs Réelles</h3>
              <ul className="text-sm space-y-1">
                <li>• Clé RapidAPI intégrée</li>
                <li>• Requêtes authentiques</li>
                <li>• Données de vrais marchés</li>
                <li>• Gestion d'erreurs robuste</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Performance</h3>
              <ul className="text-sm space-y-1">
                <li>• Requêtes parallèles</li>
                <li>• Cache intelligent</li>
                <li>• Fallback automatique</li>
                <li>• Interface réactive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 