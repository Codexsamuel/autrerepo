import { Metadata } from 'next';
import { FaceSwapTest } from '@/components/ui/FaceSwapTest';

export const metadata: Metadata = {
  title: 'Test FaceSwap API - DL Solutions',
  description: 'Test de l\'API FaceSwap pour la transformation d\'images avec remplacement de visage',
  keywords: [
    'FaceSwap',
    'RapidAPI',
    'transformation d\'images',
    'remplacement de visage',
    'IA',
    'DL Solutions'
  ]
};

export default function TestFaceSwapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <FaceSwapTest />
        
        {/* Informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🎭 Fonctionnalités FaceSwap</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Remplacement de visage</strong> avec URLs</li>
              <li>✅ <strong>Remplacement de visage</strong> avec base64</li>
              <li>✅ <strong>Amélioration automatique</strong> d'image</li>
              <li>✅ <strong>Préservation d'expression</strong> et d'éclairage</li>
              <li>✅ <strong>Formats multiples</strong> (JPG, PNG, WebP)</li>
              <li>✅ <strong>Qualité configurable</strong></li>
              <li>✅ <strong>Vérification de compatibilité</strong></li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🛍️ Cas d'Usage E-commerce</h3>
            <ul className="space-y-2 text-sm">
              <li>🛍️ <strong>Amélioration de produits</strong> - Visages modèles</li>
              <li>📸 <strong>Création de contenu</strong> marketing</li>
              <li>🎨 <strong>Personnalisation</strong> d'avatars</li>
              <li>🔒 <strong>Protection de la vie privée</strong></li>
              <li>📱 <strong>Applications mobiles</strong> de beauté</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">💡 Utilisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">API Endpoints:</h4>
              <ul className="space-y-1">
                <li><code>GET /api/ai/faceswap?action=stats</code></li>
                <li><code>POST /api/ai/faceswap</code> (transformation)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Exemples de requêtes:</h4>
              <ul className="space-y-1">
                <li>• <code>curl -X POST /api/ai/faceswap -d '{"sourceImageUrl":"...","targetImageUrl":"..."}'</code></li>
                <li>• <code>curl "http://localhost:3002/api/ai/faceswap?action=stats"</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 