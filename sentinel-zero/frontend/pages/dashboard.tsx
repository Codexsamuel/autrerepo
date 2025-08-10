import React, { useState, useEffect } from 'react';

interface Scan {
  id: string;
  target: string;
  status: string;
  type: string;
}

const SentinelDashboard: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setScans([
        { id: '1', target: 'example.com', status: 'COMPLETED', type: 'full' },
        { id: '2', target: 'test.com', status: 'RUNNING', type: 'stealth' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sentinel Zero Dashboard
          </h1>
          <p className="text-red-200">
            Contrôle centralisé - Agent Red Team IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Scans Actifs</h3>
            <p className="text-3xl font-bold text-red-400">{scans.filter(s => s.status === 'RUNNING').length}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Scans Complétés</h3>
            <p className="text-3xl font-bold text-green-400">{scans.filter(s => s.status === 'COMPLETED').length}</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Vulnérabilités</h3>
            <p className="text-3xl font-bold text-yellow-400">12</p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
          <h2 className="text-2xl font-bold text-white mb-6">Scans Récents</h2>
          <div className="space-y-4">
            {scans.map((scan) => (
              <div key={scan.id} className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">{scan.target}</h3>
                  <p className="text-gray-300">Type: {scan.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  scan.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {scan.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentinelDashboard;
