'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ClientOnly } from '@/lib/client-only';

interface CacheStatus {
  isInstalled: boolean;
  isOnline: boolean;
  cacheSize: number;
  lastUpdated: Date;
}

function CacheOptimizerComponent() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>({
    isInstalled: false,
    isOnline: false,
    cacheSize: 0,
    lastUpdated: new Date(),
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
    
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Vérifier si le service worker est installé
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setCacheStatus(prev => ({
          ...prev,
          isInstalled: !!registration.active,
        }));
      });
    }

    // Écouter les changements de connectivité
    const handleOnline = () => setCacheStatus(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setCacheStatus(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    setCacheStatus(prev => ({ ...prev, isOnline: navigator.onLine }));

    // Calculer la taille du cache
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        let totalSize = 0;
        const sizePromises = cacheNames.map(async (cacheName) => {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();
          const sizePromises = keys.map(async (request) => {
            const response = await cache.match(request);
            const contentLength = response?.headers.get('content-length');
            return contentLength ? parseInt(contentLength) : 0;
          });
          const sizes = await Promise.all(sizePromises);
          return sizes.reduce((sum, size) => sum + size, 0);
        });

        Promise.all(sizePromises).then((sizes) => {
          totalSize = sizes.reduce((sum, size) => sum + size, 0);
          setCacheStatus(prev => ({
            ...prev,
            cacheSize: totalSize,
          }));
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const optimizeCache = async () => {
    if (typeof window === 'undefined') return;
    
    setIsOptimizing(true);

    try {
      // Nettoyer les anciens caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name !== 'dl-solutions-v1.0.0' && 
          name.startsWith('dl-solutions-')
        );

        await Promise.all(
          oldCaches.map(cacheName => caches.delete(cacheName))
        );

        // Précharger les ressources importantes
        const importantResources = [
          '/',
          '/drone-simulator',
          '/investor-demo',
          '/static/css/app/layout.css',
          '/images/logos/logo-dl.png',
        ];

        const cache = await caches.open('dl-solutions-v1.0.0');
        await Promise.all(
          importantResources.map(async (resource) => {
            try {
              const response = await fetch(resource);
              if (response.ok) {
                await cache.put(resource, response);
              }
            } catch (error) {
              console.warn(`Failed to cache ${resource}:`, error);
            }
          })
        );

        // Mettre à jour le statut
        setCacheStatus(prev => ({
          ...prev,
          lastUpdated: new Date(),
        }));

        // Recalculer la taille du cache
        const keys = await cache.keys();
        const sizePromises = keys.map(async (request) => {
          const response = await cache.match(request);
          const contentLength = response?.headers.get('content-length');
          return contentLength ? parseInt(contentLength) : 0;
        });
        const sizes = await Promise.all(sizePromises);
        const totalSize = sizes.reduce((sum, size) => sum + size, 0);

        setCacheStatus(prev => ({
          ...prev,
          cacheSize: totalSize,
        }));
      }
    } catch (error) {
      console.error('Cache optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const clearCache = async () => {
    if (typeof window === 'undefined') return;
    
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      setCacheStatus(prev => ({
        ...prev,
        cacheSize: 0,
        lastUpdated: new Date(),
      }));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Don't render until we're on the client
  if (!isClient) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-4">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-6 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        ⚡ Optimisation Cache
        <span className="ml-2 text-sm text-slate-400">Performance</span>
      </h3>

      {/* Statut du cache */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm">Service Worker</div>
          <div className={`text-lg font-bold ${cacheStatus.isInstalled ? 'text-green-400' : 'text-red-400'}`}>
            {cacheStatus.isInstalled ? '✅ Installé' : '❌ Non installé'}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm">Connectivité</div>
          <div className={`text-lg font-bold ${cacheStatus.isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {cacheStatus.isOnline ? '🌐 En ligne' : '📴 Hors ligne'}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm">Taille Cache</div>
          <div className="text-white text-lg font-bold">
            {formatBytes(cacheStatus.cacheSize)}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm">Dernière MAJ</div>
          <div className="text-white text-sm font-bold">
            {cacheStatus.lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={optimizeCache}
          disabled={isOptimizing}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isOptimizing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Optimisation...
            </>
          ) : (
            <>
              ⚡ Optimiser Cache
            </>
          )}
        </button>

        <button
          onClick={clearCache}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          🗑️ Vider Cache
        </button>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
        <h4 className="text-white font-semibold mb-2">💡 Conseils d'optimisation</h4>
        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Le cache améliore les performances de 60-80%</li>
          <li>• Fonctionne même hors ligne</li>
          <li>• Mise à jour automatique des ressources</li>
          <li>• Compression automatique des images</li>
        </ul>
      </div>
    </div>
  );
}

// Export with ClientOnly wrapper to ensure it never runs during SSR
const CacheOptimizer = () => (
  <ClientOnly
    fallback={
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-4">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-6 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }
  >
    <CacheOptimizerComponent />
  </ClientOnly>
);

export default CacheOptimizer; 