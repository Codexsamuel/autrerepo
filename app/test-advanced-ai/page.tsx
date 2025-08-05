import { Metadata } from 'next';
import { AdvancedAITest } from '@/components/ui/AdvancedAITest';

export const metadata: Metadata = {
  title: 'Test IA Avancée - DL Solutions',
  description: 'Test de toutes les fonctionnalités IA avancées : Ghibli, Content Detector, FaceSwap',
  keywords: [
    'IA Avancée',
    'Ghibli',
    'Content Detector',
    'FaceSwap',
    'RapidAPI',
    'DL Solutions'
  ]
};

export default function TestAdvancedAIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <AdvancedAITest />
        
        {/* Informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🎨 Ghibli Generator</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Génération d'images</strong> style Studio Ghibli</li>
              <li>✅ <strong>5 styles différents</strong> disponibles</li>
              <li>✅ <strong>Génération rapide</strong> et asynchrone</li>
              <li>✅ <strong>Images produits</strong> stylisées</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🔍 Content Detector</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Détection IA</strong> avec 95% de précision</li>
              <li>✅ <strong>Analyse détaillée</strong> de contenu</li>
              <li>✅ <strong>Validation e-commerce</strong> automatique</li>
              <li>✅ <strong>Recommandations</strong> d'amélioration</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🎭 FaceSwap</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Remplacement de visage</strong> réaliste</li>
              <li>✅ <strong>Amélioration automatique</strong> d'images</li>
              <li>✅ <strong>Préservation d'expression</strong> et d'éclairage</li>
              <li>✅ <strong>Qualité configurable</strong></li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🚀 API Unifiée</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Endpoint unique</strong> pour toutes les IA</li>
              <li>✅ <strong>Gestion d'erreurs</strong> robuste</li>
              <li>✅ <strong>Performance optimisée</strong></li>
              <li>✅ <strong>Documentation complète</strong></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">💡 Utilisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">API Endpoints:</h4>
              <ul className="space-y-1">
                <li><code>GET /api/ai/advanced?action=stats</code></li>
                <li><code>POST /api/ai/advanced</code> (toutes les actions)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Actions disponibles:</h4>
              <ul className="space-y-1">
                <li>• <code>ghibli-quick</code> - Génération rapide Ghibli</li>
                <li>• <code>content-analyze</code> - Analyse de contenu</li>
                <li>• <code>content-validate</code> - Validation e-commerce</li>
                <li>• <code>faceswap</code> - Face swap d'images</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 