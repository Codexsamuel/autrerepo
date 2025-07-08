import ScrapingConnector from '@/components/ScrapingConnector';

export default function ScrapingDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Démonstration Scraping
              </h1>
              <p className="mt-2 text-gray-600">
                Test de la connexion entre Netlify (Frontend) et Vercel (Backend)
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Architecture</div>
                <div className="text-xs text-gray-500">Netlify + Vercel</div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="py-8">
        <ScrapingConnector />
      </div>

      {/* Informations techniques */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informations Techniques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Architecture Déployée
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Frontend</span>
                  <span className="text-blue-700">Netlify</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Backend</span>
                  <span className="text-green-700">Vercel</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">APIs</span>
                  <span className="text-purple-700">Fonctionnelles</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                URLs de Test
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Frontend</div>
                  <div className="text-sm text-gray-600 break-all">
                    https://daveandlucesolutions.com
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Backend</div>
                  <div className="text-sm text-gray-600 break-all">
                    https://autrerepo-69ck.vercel.app
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Test Variables</div>
                  <div className="text-sm text-gray-600 break-all">
                    /test-env
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🎉 Le Scraping Fonctionne !
            </h3>
            <p className="text-yellow-700">
              Les variables d'environnement sont correctement lues depuis Vercel. 
              Le frontend Netlify peut maintenant communiquer avec le backend Vercel 
              pour récupérer les données de scraping en temps réel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 