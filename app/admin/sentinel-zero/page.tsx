import { SentinelZeroBypass } from '@/components/ui/SentinelZeroBypass';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration Sentinel Zero - DL Solutions',
  description: 'Interface d\'administration pour le système Sentinel Zero - Gestion des accès et génération d\'identifiants',
};

export default function SentinelZeroAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                🚨 SENTINEL ZERO
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Système d'Administration et Bypass - Contrôle Total des Accès
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-red-600/20 border border-red-500/30 rounded-lg px-6 py-3">
                <span className="text-red-300 font-semibold">🔒 Accès Restreint - Super Admin Uniquement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <SentinelZeroBypass />
      </div>

      {/* Footer de sécurité */}
      <div className="bg-black/50 border-t border-red-500/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              🚨 SENTINEL ZERO - Système de Sécurité Multi-Niveaux
            </p>
            <p className="text-xs mt-2">
              Tous les accès sont surveillés et enregistrés pour des raisons de sécurité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 