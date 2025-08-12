import { Metadata } from 'next';
import { SentinelZeroRequest } from '@/components/ui/SentinelZeroRequest';

export const metadata: Metadata = {
  title: 'Demande d\'Accès Sentinel Zero - DL Solutions',
  description: 'Formulaire de candidature pour accéder aux outils ultra-sécurisés Sentinel Zero - Évaluation professionnelle requise',
  keywords: ['Sentinel Zero', 'Accès sécurisé', 'Demande d\'accès', 'Sécurité', 'DL Solutions'],
};

export default function SentinelZeroRequestPage() {
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
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Demande d'Accès aux Outils Ultra-Sécurisés
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-400 mb-6">
                Sentinel Zero est notre plateforme d'agents IA ultra-avancés avec des capacités de cybersécurité, 
                d'analyse de données et d'automatisation de niveau militaire.
              </p>
              <div className="bg-red-600/20 border border-red-500/30 rounded-lg px-6 py-4 inline-block">
                <span className="text-red-300 font-semibold">
                  🔒 Accès strictement contrôlé - Évaluation professionnelle requise
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations sur le processus */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">1. Soumission</h3>
            <p className="text-gray-400">
              Remplissez le formulaire avec vos informations professionnelles et motivation
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">2. Évaluation</h3>
            <p className="text-gray-400">
              Notre équipe de sécurité évalue votre candidature sous 24-48h
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">3. Décision</h3>
            <p className="text-gray-400">
              Si approuvé, vous recevez vos identifiants d'accès par email
            </p>
          </div>
        </div>

        {/* Critères d'évaluation */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            🎯 Critères d'Évaluation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">✅ Facteurs Positifs :</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Expérience professionnelle pertinente</li>
                <li>• Motivation claire et justifiée</li>
                <li>• Cas d'usage concret et éthique</li>
                <li>• Formation ou certification en cybersécurité</li>
                <li>• Références professionnelles vérifiables</li>
                <li>• Engagement envers la sécurité informatique</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-400 mb-3">❌ Facteurs de Rejet :</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Informations falsifiées ou incomplètes</li>
                <li>• Cas d'usage non éthique ou illégal</li>
                <li>• Manque de motivation ou de justification</li>
                <li>• Expérience insuffisante dans le domaine</li>
                <li>• Antécédents de sécurité compromis</li>
                <li>• Demande de niveau d'accès inapproprié</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formulaire de demande */}
        <div className="max-w-4xl mx-auto">
          <SentinelZeroRequest />
        </div>

        {/* Informations de contact */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 inline-block">
            <h3 className="text-xl font-semibold text-white mb-4">
              📞 Besoin d'Aide ?
            </h3>
            <p className="text-gray-400 mb-4">
              Pour toute question sur le processus de demande ou Sentinel Zero
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Email :</strong> security@dlsolutionssarl.tech</p>
              <p><strong>Support :</strong> support@dlsolutionssarl.tech</p>
              <p><strong>Urgences :</strong> +33 1 XX XX XX XX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer de sécurité */}
      <div className="bg-black/50 border-t border-red-500/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              🚨 SENTINEL ZERO - Système de Sécurité Multi-Niveaux
            </p>
            <p className="text-xs mt-2">
              Toutes les demandes sont évaluées individuellement et enregistrées pour audit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 