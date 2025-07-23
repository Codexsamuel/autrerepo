'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  fmp?: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher le moniteur en mode développement
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    // Mesurer les métriques de performance
    const measurePerformance = () => {
      if ('PerformanceObserver' in window) {
        // First Contentful Paint (FCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const fcp = entries[entries.length - 1];
          if (fcp) {
            setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            const firstInput = entry as any;
            if (firstInput.processingStart && firstInput.startTime) {
              const fid = firstInput.processingStart - firstInput.startTime;
              setMetrics(prev => ({ ...prev, fid }));
            }
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const layoutShift = entry as any;
            if (!layoutShift.hadRecentInput) {
              clsValue += layoutShift.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Time to First Byte (TTFB)
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }

      // First Meaningful Paint (FMP) - approximation
      const paintEntries = performance.getEntriesByType('paint');
      const fmp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fmp) {
        setMetrics(prev => ({ ...prev, fmp: fmp.startTime }));
      }
    };

    // Mesurer après le chargement complet
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  if (!isVisible || !metrics) return null;

  const getScore = (value: number, threshold: number) => {
    if (value <= threshold * 0.5) return '🟢 Excellent';
    if (value <= threshold) return '🟡 Bon';
    return '🔴 À améliorer';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700 max-w-sm z-50">
      <h3 className="text-sm font-bold mb-2">📊 Performance Monitor</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={metrics.fcp && metrics.fcp < 1800 ? 'text-green-400' : 'text-red-400'}>
            {metrics.fcp?.toFixed(0) || 'N/A'}ms {metrics.fcp ? getScore(metrics.fcp, 1800) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={metrics.lcp && metrics.lcp < 2500 ? 'text-green-400' : 'text-red-400'}>
            {metrics.lcp?.toFixed(0) || 'N/A'}ms {metrics.lcp ? getScore(metrics.lcp, 2500) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={metrics.fid && metrics.fid < 100 ? 'text-green-400' : 'text-red-400'}>
            {metrics.fid?.toFixed(0) || 'N/A'}ms {metrics.fid ? getScore(metrics.fid, 100) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={metrics.cls && metrics.cls < 0.1 ? 'text-green-400' : 'text-red-400'}>
            {metrics.cls?.toFixed(3) || 'N/A'} {metrics.cls ? getScore(metrics.cls, 0.1) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={metrics.ttfb && metrics.ttfb < 600 ? 'text-green-400' : 'text-red-400'}>
            {metrics.ttfb?.toFixed(0) || 'N/A'}ms {metrics.ttfb ? getScore(metrics.ttfb, 600) : 'N/A'}
          </span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-slate-400 hover:text-white"
      >
        ×
      </button>
    </div>
  );
} 