import { Metadata } from 'next';
import { ProductionScrapingTest } from '@/components/ui/ProductionScrapingTest';

export const metadata: Metadata = {
  title: 'Test Scraping Production Ready - DL Solutions',
  description: 'Système de scraping e-commerce production ready avec fallback automatique et données réelles',
  keywords: [
    'scraping production',
    'e-commerce',
    'fallback automatique',
    'données réelles',
    'AliExpress',
    'eBay',
    '1688',
    'Taobao',
    'Google Shopping',
    'DL Solutions'
  ]
};

export default function TestProductionScrapingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <ProductionScrapingTest />
        
        {/* Informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🚀 Fonctionnalités Production Ready</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Fallback automatique</strong> entre APIs</li>
              <li>✅ <strong>Données réelles</strong> (pas de simulation)</li>
              <li>✅ <strong>Gestion d'erreurs robuste</strong></li>
              <li>✅ <strong>Normalisation des données</strong></li>
              <li>✅ <strong>Calcul automatique des marges</strong></li>
              <li>✅ <strong>Scoring intelligent</strong> des produits</li>
              <li>✅ <strong>Parallélisation</strong> des requêtes</li>
              <li>✅ <strong>Interface moderne</strong> et responsive</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📊 Sources Disponibles</h3>
            <ul className="space-y-2 text-sm">
              <li>🛒 <strong>AliExpress</strong> - 3 APIs de fallback (25% marge)</li>
              <li>🏪 <strong>eBay</strong> - 2 APIs de fallback (20% marge)</li>
              <li>🏭 <strong>1688.com</strong> - 1 API + fallback (35% marge)</li>
              <li>🛍️ <strong>Taobao</strong> - 1 API (30% marge)</li>
              <li>🔍 <strong>Google Shopping</strong> - 1 API (15% marge)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">💡 Utilisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">API Endpoints:</h4>
              <ul className="space-y-1">
                <li><code>GET /api/scrape-production?keyword=iphone&limit=20</code></li>
                <li><code>GET /api/scrape-production?keyword=iphone&source=aliexpress</code></li>
                <li><code>GET /api/scrape-production?stats=true</code></li>
                <li><code>POST /api/scrape-production</code> (avec body JSON)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Exemples de requêtes:</h4>
              <ul className="space-y-1">
                <li>• <code>curl "http://localhost:3002/api/scrape-production?keyword=laptop&limit=10"</code></li>
                <li>• <code>curl "http://localhost:3002/api/scrape-production?keyword=chaussures&source=ebay"</code></li>
                <li>• <code>curl "http://localhost:3002/api/scrape-production?stats=true"</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 