import { Metadata } from 'next';
import { AIServicesCatalog } from '@/components/ui/AIServicesCatalog';

export const metadata: Metadata = {
  title: 'Catalogue Services IA - DL Solutions',
  description: 'Catalogue complet des services IA monétisables : génération de contenu, images, analyse, scraping et transformation',
  keywords: [
    'Services IA',
    'Génération de contenu',
    'Images IA',
    'Analyse de marché',
    'Scraping',
    'Transformation d\'images',
    'DL Solutions'
  ]
};

export default function AIServicesCatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <AIServicesCatalog />
        
        {/* Informations supplémentaires */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">🎯 Pourquoi choisir nos services IA ?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                <span><strong>Qualité professionnelle</strong> - Résultats de niveau expert</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                <span><strong>Rapidité</strong> - Traitement en quelques secondes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                <span><strong>Fiabilité</strong> - Système de fallback intelligent</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                <span><strong>Prix compétitifs</strong> - Tarifs adaptés à tous les budgets</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">💰 Modèle de tarification</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Prix unitaire</span>
                <span className="font-semibold">8€ - 30€</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Réduction 5+ services</span>
                <span className="font-semibold text-green-600">-10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Réduction 10+ services</span>
                <span className="font-semibold text-green-600">-20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Crédits inclus</span>
                <span className="font-semibold">5-20 crédits/service</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">🚀 Cas d'usage populaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🛍️</div>
              <h4 className="font-semibold mb-2">E-commerce</h4>
              <p className="text-sm text-gray-600">
                Génération de descriptions produits, amélioration d'images, analyse de marché
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-semibold mb-2">Marketing Digital</h4>
              <p className="text-sm text-gray-600">
                Création de contenu, images artistiques, validation de qualité
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h4 className="font-semibold mb-2">Entreprises</h4>
              <p className="text-sm text-gray-600">
                Analyse de données, transformation d'images, scraping intelligent
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 