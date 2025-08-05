import { Metadata } from 'next';
import { SupabaseProducts } from '@/components/ui/SupabaseProducts';

export const metadata: Metadata = {
  title: 'Démonstration Supabase + Traduction + Marges - DL Solutions',
  description: 'Démonstration complète du système de scraping avec sauvegarde Supabase, traduction automatique et calcul des marges bénéficiaires',
  keywords: [
    'supabase',
    'traduction automatique',
    'marges bénéficiaires',
    'scraping',
    'APIs réelles',
    'DL Solutions',
    'e-commerce',
    'base de données'
  ]
};

export default function DemoSupabasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Démonstration Complète : Supabase + Traduction + Marges
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Système complet de scraping avec sauvegarde dans Supabase, traduction automatique 
            en français et calcul automatique des marges bénéficiaires.
            <br />
            <span className="text-green-600 font-semibold">
              Seul l'administrateur connaît les prix d'origine !
            </span>
          </p>
        </div>

        {/* Fonctionnalités principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">🗄️ Sauvegarde Supabase</h3>
            <p className="text-blue-700 text-sm">
              Stockage sécurisé des produits avec métadonnées complètes, 
              historique des mises à jour et gestion des doublons
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900 mb-2">🌐 Traduction Automatique</h3>
            <p className="text-green-700 text-sm">
              Traduction automatique des titres et descriptions en français 
              via Google Translate API intégrée
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-900 mb-2">💰 Marges Bénéficiaires</h3>
            <p className="text-purple-700 text-sm">
              Calcul automatique des marges selon la source (15-35%), 
              prix d'origine masqué aux clients
            </p>
          </div>
        </div>

        {/* Composant principal */}
        <SupabaseProducts showScrapingControls={true} />

        {/* Avantages du système */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">🎯 Avantages du Système Complet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">✅ Pour l'Administrateur</h3>
              <ul className="space-y-2 text-sm">
                <li>• Accès aux prix d'origine et marges</li>
                <li>• Traduction automatique des produits</li>
                <li>• Base de données centralisée</li>
                <li>• Historique des mises à jour</li>
                <li>• Statistiques détaillées</li>
                <li>• Gestion des sources multiples</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">✅ Pour les Clients</h3>
              <ul className="space-y-2 text-sm">
                <li>• Produits traduits en français</li>
                <li>• Prix unifiés en EUR/USD/FCFA</li>
                <li>• Interface moderne et intuitive</li>
                <li>• Recherche avancée</li>
                <li>• Informations détaillées</li>
                <li>• Expérience utilisateur optimale</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration technique */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">🔧 Configuration Technique</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">APIs Intégrées :</span>
                <span className="text-gray-600 ml-2">AliExpress, eBay, Taobao, 1688, Google Shopping</span>
              </div>
              <div>
                <span className="font-medium">Base de Données :</span>
                <span className="text-gray-600 ml-2">Supabase PostgreSQL</span>
              </div>
              <div>
                <span className="font-medium">Traduction :</span>
                <span className="text-gray-600 ml-2">Google Translate API</span>
              </div>
              <div>
                <span className="font-medium">Devises Supportées :</span>
                <span className="text-gray-600 ml-2">EUR, USD, FCFA</span>
              </div>
              <div>
                <span className="font-medium">Marges Configurées :</span>
                <span className="text-gray-600 ml-2">15% - 35% selon la source</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">📊 Métriques de Performance</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Temps de Scraping :</span>
                <span className="text-gray-600 ml-2">2-5 secondes par source</span>
              </div>
              <div>
                <span className="font-medium">Traduction :</span>
                <span className="text-gray-600 ml-2">Automatique en temps réel</span>
              </div>
              <div>
                <span className="font-medium">Sauvegarde :</span>
                <span className="text-gray-600 ml-2">Immédiate avec gestion des doublons</span>
              </div>
              <div>
                <span className="font-medium">Disponibilité :</span>
                <span className="text-gray-600 ml-2">24/7 avec fallback</span>
              </div>
              <div>
                <span className="font-medium">Scalabilité :</span>
                <span className="text-gray-600 ml-2">Illimitée avec Supabase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className="mt-12 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-semibold text-yellow-900 mb-4">📋 Instructions d'Utilisation</h3>
          <div className="space-y-3 text-sm text-yellow-800">
            <div className="flex items-start gap-2">
              <span className="font-medium">1.</span>
              <span>Entrez un mot-clé dans le champ "Mot-clé à scraper" (ex: iphone, laptop, chaussures)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">2.</span>
              <span>Sélectionnez la source (ou "Toutes les sources" pour tout scraper)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">3.</span>
              <span>Cliquez sur "Scraper & Sauvegarder" pour récupérer et sauvegarder les produits</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">4.</span>
              <span>Les produits sont automatiquement traduits et les marges calculées</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">5.</span>
              <span>Utilisez la recherche pour retrouver les produits sauvegardés</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">6.</span>
              <span>Changez la devise pour voir les prix dans différentes monnaies</span>
            </div>
          </div>
        </div>

        {/* Sécurité et confidentialité */}
        <div className="mt-12 bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
          <h3 className="font-semibold text-red-900 mb-4">🔒 Sécurité et Confidentialité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-red-800">
            <div>
              <h4 className="font-medium mb-2">Protection des Prix d'Origine</h4>
              <ul className="space-y-1">
                <li>• Seul l'administrateur voit les prix d'origine</li>
                <li>• Les clients voient uniquement les prix avec marge</li>
                <li>• Base de données sécurisée avec Supabase</li>
                <li>• Accès contrôlé via service role</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sécurité des Données</h4>
              <ul className="space-y-1">
                <li>• Chiffrement des données en transit et au repos</li>
                <li>• Authentification sécurisée</li>
                <li>• Logs d'audit complets</li>
                <li>• Sauvegarde automatique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 