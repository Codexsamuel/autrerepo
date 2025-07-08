'use client';

import { useEffect, useState } from 'react';

export default function TestEnvPage() {
  const [envData, setEnvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testEnvironmentVariables = async () => {
      try {
        setLoading(true);
        
        // Test 1: Variables côté client (NEXT_PUBLIC_*)
        const clientVars = {
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configuré' : '❌ Manquant',
          NODE_ENV: process.env.NODE_ENV,
        };

        // Test 2: Test des APIs de scraping
        const testScraping = async () => {
          try {
            const response = await fetch('/api/scraping/products?q=phone');
            const data = await response.json();
            return { success: true, data };
          } catch (err) {
            return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' };
          }
        };

        // Test 3: Test des APIs chinese-stores
        const testChineseStores = async () => {
          try {
            const response = await fetch('/api/scraping/chinese-stores?action=stats');
            const data = await response.json();
            return { success: true, data };
          } catch (err) {
            return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' };
          }
        };

        // Test 4: Test de l'API debug
        const testDebugAPI = async () => {
          try {
            const response = await fetch('/api/debug/env');
            const data = await response.json();
            return { success: true, data };
          } catch (err) {
            return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' };
          }
        };

        const [scrapingResult, chineseStoresResult, debugResult] = await Promise.all([
          testScraping(),
          testChineseStores(),
          testDebugAPI()
        ]);

        setEnvData({
          clientVariables: clientVars,
          scrapingAPI: scrapingResult,
          chineseStoresAPI: chineseStoresResult,
          debugAPI: debugResult,
          timestamp: new Date().toISOString()
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    testEnvironmentVariables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Test des variables d'environnement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test des Variables d'Environnement
          </h1>
          <p className="text-gray-600">
            Diagnostic complet de la configuration en production
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Timestamp: {envData?.timestamp}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Variables côté client */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Variables Côté Client (NEXT_PUBLIC_*)
            </h2>
            <div className="space-y-3">
              {Object.entries(envData?.clientVariables || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{key}:</span>
                  <span className={`text-sm ${value === '❌ Manquant' ? 'text-red-600' : 'text-green-600'}`}>
                    {value || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* API Scraping */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              API Scraping
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <span className={`text-sm ${envData?.scrapingAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                  {envData?.scrapingAPI?.success ? '✅ Fonctionne' : '❌ Échec'}
                </span>
              </div>
              {envData?.scrapingAPI?.success && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Produits trouvés:</span>
                  <span className="text-sm text-gray-600">
                    {envData?.scrapingAPI?.data?.products?.length || 0}
                  </span>
                </div>
              )}
              {envData?.scrapingAPI?.error && (
                <div className="text-sm text-red-600">
                  Erreur: {envData.scrapingAPI.error}
                </div>
              )}
            </div>
          </div>

          {/* API Chinese Stores */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              API Chinese Stores
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <span className={`text-sm ${envData?.chineseStoresAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                  {envData?.chineseStoresAPI?.success ? '✅ Fonctionne' : '❌ Échec'}
                </span>
              </div>
              {envData?.chineseStoresAPI?.success && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Stats:</span>
                  <span className="text-sm text-gray-600">
                    {JSON.stringify(envData?.chineseStoresAPI?.data?.data || 'N/A')}
                  </span>
                </div>
              )}
              {envData?.chineseStoresAPI?.error && (
                <div className="text-sm text-red-600">
                  Erreur: {envData.chineseStoresAPI.error}
                </div>
              )}
            </div>
          </div>

          {/* API Debug */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              API Debug (Variables Serveur)
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <span className={`text-sm ${envData?.debugAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                  {envData?.debugAPI?.success ? '✅ Fonctionne' : '❌ Échec'}
                </span>
              </div>
              {envData?.debugAPI?.success && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Environment:</span>
                    <span className="text-sm text-gray-600">
                      {envData?.debugAPI?.data?.environment || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">SUPABASE_URL:</span>
                    <span className="text-sm text-gray-600">
                      {envData?.debugAPI?.data?.variables?.NEXT_PUBLIC_SUPABASE_URL || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">OPENAI_API_KEY:</span>
                    <span className="text-sm text-gray-600">
                      {envData?.debugAPI?.data?.variables?.OPENAI_API_KEY || 'N/A'}
                    </span>
                  </div>
                </>
              )}
              {envData?.debugAPI?.error && (
                <div className="text-sm text-red-600">
                  Erreur: {envData.debugAPI.error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Résumé */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Résumé</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${envData?.clientVariables?.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}`}>
                {envData?.clientVariables?.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}
              </div>
              <p className="text-sm text-gray-600">Supabase URL</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${envData?.scrapingAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                {envData?.scrapingAPI?.success ? '✅' : '❌'}
              </div>
              <p className="text-sm text-gray-600">API Scraping</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${envData?.chineseStoresAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                {envData?.chineseStoresAPI?.success ? '✅' : '❌'}
              </div>
              <p className="text-sm text-gray-600">API Chinese Stores</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${envData?.debugAPI?.success ? 'text-green-600' : 'text-red-600'}`}>
                {envData?.debugAPI?.success ? '✅' : '❌'}
              </div>
              <p className="text-sm text-gray-600">API Debug</p>
            </div>
          </div>
        </div>

        {/* Actions recommandées */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Actions Recommandées</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            {!envData?.clientVariables?.NEXT_PUBLIC_SUPABASE_URL && (
              <li>• Configurer NEXT_PUBLIC_SUPABASE_URL dans les variables d'environnement Netlify</li>
            )}
            {!envData?.scrapingAPI?.success && (
              <li>• Vérifier le déploiement des fonctions Netlify</li>
            )}
            {!envData?.chineseStoresAPI?.success && (
              <li>• Vérifier la configuration des redirections API dans netlify.toml</li>
            )}
            {!envData?.debugAPI?.success && (
              <li>• Vérifier que toutes les variables d'environnement sont configurées sur Netlify</li>
            )}
            <li>• Redéployer l'application après modification des variables d'environnement</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 