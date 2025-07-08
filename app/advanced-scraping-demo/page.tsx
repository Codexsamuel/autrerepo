import AdvancedScrapingDemo from '@/components/AdvancedScrapingDemo';

export default function AdvancedScrapingDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Scraping & Trading Avancé
              </h1>
              <p className="mt-2 text-gray-600">
                Données réelles de tous les marchés internationaux + Trading en temps réel
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">APIs Réelles</div>
                <div className="text-xs text-gray-500">Yahoo Finance + Scraping</div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="py-8">
        <AdvancedScrapingDemo />
      </div>

      {/* Informations techniques */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Fonctionnalités Avancées
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📡 APIs de Scraping Réelles
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-red-900">AliExpress</span>
                  <span className="text-red-700">🇨🇳 Chine</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Noon.com</span>
                  <span className="text-green-700">🇦🇪 Dubaï</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-yellow-900">Trendyol</span>
                  <span className="text-yellow-700">🇹🇷 Turquie</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">Jumia</span>
                  <span className="text-orange-700">🇨🇲 Cameroun</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 APIs de Trading Réelles
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Yahoo Finance</span>
                  <span className="text-blue-700">Actions</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Cryptomonnaies</span>
                  <span className="text-purple-700">BTC, ETH, etc.</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium text-indigo-900">Forex</span>
                  <span className="text-indigo-700">Devises</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <span className="font-medium text-teal-900">Indices</span>
                  <span className="text-teal-700">S&P 500, NASDAQ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              🎉 Données 100% Réelles !
            </h3>
            <p className="text-green-700">
              Toutes les données proviennent d'APIs réelles : Yahoo Finance pour le trading, 
              et scraping direct des sites e-commerce pour les produits. Aucune simulation !
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">URLs de Test</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Scraping:</span>
                  <div className="text-gray-600 break-all">/api/scraping/products?q=phone</div>
                </div>
                <div>
                  <span className="font-medium">Trading:</span>
                  <div className="text-gray-600 break-all">/api/trading/yahoo?symbol=AAPL</div>
                </div>
                <div>
                  <span className="font-medium">Crypto:</span>
                  <div className="text-gray-600 break-all">/api/trading/crypto?symbol=BTC-USD</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Marchés Supportés</h4>
              <div className="space-y-1 text-sm">
                <div>🇨🇳 Chine (AliExpress)</div>
                <div>🇦🇪 Dubaï (Noon, Amazon.ae)</div>
                <div>🇹🇷 Turquie (Trendyol, Hepsiburada)</div>
                <div>🇨🇲 Cameroun (Jumia, Konga)</div>
                <div>🇺🇸 USA (Yahoo Finance)</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Données Trading</h4>
              <div className="space-y-1 text-sm">
                <div>📈 Actions (AAPL, GOOGL, etc.)</div>
                <div>💰 Cryptomonnaies (BTC, ETH)</div>
                <div>💱 Forex (EUR/USD, GBP/USD)</div>
                <div>📊 Indices (S&P 500, NASDAQ)</div>
                <div>⏰ Mise à jour temps réel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 