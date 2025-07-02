'use client';

import { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
  status: string;
  [key: string]: any;
}

export default function ApiTestPage() {
  const [apiData, setApiData] = useState<{ [key: string]: ApiResponse }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  const apis = [
    { name: 'Hello API', endpoint: '/api/hello' },
    { name: 'Trading API', endpoint: '/api/trading' },
    { name: 'Symbols API', endpoint: '/api/trading/symbols' },
    { name: 'Portfolio API', endpoint: '/api/trading/portfolio' }
  ];

  const testApi = async (endpoint: string) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }));
    setError(prev => ({ ...prev, [endpoint]: '' }));
    
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setApiData(prev => ({ ...prev, [endpoint]: data }));
    } catch (err) {
      setError(prev => ({ ...prev, [endpoint]: err instanceof Error ? err.message : 'Unknown error' }));
    } finally {
      setLoading(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  const testAllApis = () => {
    apis.forEach(api => testApi(api.endpoint));
  };

  useEffect(() => {
    testAllApis();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            API Test Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Test des APIs de la plateforme DL Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apis.map((api) => (
            <div key={api.endpoint} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {api.name}
                </h2>
                <button
                  onClick={() => testApi(api.endpoint)}
                  disabled={loading[api.endpoint]}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading[api.endpoint] ? 'Testing...' : 'Test'}
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">{api.endpoint}</code>
              </div>

              {loading[api.endpoint] && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {error[api.endpoint] && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="text-red-800 font-medium">Error:</div>
                  <div className="text-red-600 text-sm mt-1">{error[api.endpoint]}</div>
                </div>
              )}

              {apiData[api.endpoint] && !loading[api.endpoint] && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="text-green-800 font-medium mb-2">Response:</div>
                  <pre className="text-sm text-green-700 overflow-auto max-h-64">
                    {JSON.stringify(apiData[api.endpoint], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={testAllApis}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Test All APIs
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Instructions de test
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Cliquez sur "Test" pour tester une API individuelle</li>
            <li>• Cliquez sur "Test All APIs" pour tester toutes les APIs</li>
            <li>• Les réponses JSON s'afficheront dans les boîtes vertes</li>
            <li>• Les erreurs s'afficheront dans les boîtes rouges</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 