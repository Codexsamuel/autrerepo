import IndustrialProducts from '@/components/IndustrialProducts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produits Industriels - Technologies et Pièces d\'Engins | DL Solutions',
  description: 'Découvrez notre sélection de produits industriels, technologies et pièces d\'engins depuis les marchés internationaux. Drones, imprimantes 3D, composants électroniques et plus.',
  keywords: 'produits industriels, technologies, pièces d\'engins, drones, imprimantes 3D, composants électroniques, machines-outils, équipements industriels',
  openGraph: {
    title: 'Produits Industriels - Technologies et Pièces d\'Engins',
    description: 'Technologies et pièces d\'engins depuis les marchés internationaux',
    type: 'website',
  },
};

export default function IndustrialProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Produits Industriels
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Technologies et Pièces d'Engins depuis les Marchés Internationaux
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">🏭 Machines Industrielles</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">💻 Technologies</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⚙️ Pièces d'Engins</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🔌 Composants Électroniques</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🔧 Outils Professionnels</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <IndustrialProducts />
      </div>

      {/* Section Informations */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Marchés Internationaux</h3>
              <p className="text-gray-600">
                Produits sourcés depuis la Chine, Dubaï, Turquie, Allemagne, Japon, USA et Italie
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison express disponible pour la plupart des produits industriels
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-gray-600">
                Tous nos produits sont testés et certifiés selon les standards internationaux
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 