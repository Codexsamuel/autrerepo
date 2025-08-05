import { Metadata } from 'next';
import ModernNavigation from '@/components/layout/ModernNavigation';
import { Home, Building, MapPin, Bed, Bath, Square, Star, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Immobilier - Appartement, Maison, Location, Vente | Biens Immobiliers',
  description: 'Découvrez nos biens immobiliers : appartement, maison, location, vente. Large sélection de biens avec photos, descriptions détaillées et visites virtuelles.',
  keywords: 'immobilier, appartement, maison, location, vente, bien immobilier, logement, studio, T2, T3, T4, villa, maison individuelle, location meublée, achat immobilier, investissement immobilier',
  openGraph: {
    title: 'Immobilier - Appartements et Maisons à Vendre et à Louer',
    description: 'Large sélection de biens immobiliers : appartements, maisons, locations, ventes.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const properties = [
  {
    category: "🏠 Maisons Individuelles",
    properties: [
      { 
        name: "Maison 4 Pièces", 
        price: "250,000€", 
        location: "Douala Centre",
        details: "4 chambres, 2 salles de bain, 150m², jardin",
        type: "Vente"
      },
      { 
        name: "Villa 5 Pièces", 
        price: "350,000€", 
        location: "Douala Akwa",
        details: "5 chambres, 3 salles de bain, 200m², piscine",
        type: "Vente"
      },
      { 
        name: "Maison 3 Pièces", 
        price: "1,200€/mois", 
        location: "Douala Deido",
        details: "3 chambres, 1 salle de bain, 100m², terrasse",
        type: "Location"
      }
    ]
  },
  {
    category: "🏢 Appartements",
    properties: [
      { 
        name: "Studio Meublé", 
        price: "500€/mois", 
        location: "Douala Centre",
        details: "1 pièce, 1 salle de bain, 25m², meublé",
        type: "Location"
      },
      { 
        name: "T3 3 Pièces", 
        price: "180,000€", 
        location: "Douala Akwa",
        details: "3 chambres, 2 salles de bain, 80m², balcon",
        type: "Vente"
      },
      { 
        name: "T4 4 Pièces", 
        price: "900€/mois", 
        location: "Douala Deido",
        details: "4 chambres, 2 salles de bain, 120m², parking",
        type: "Location"
      }
    ]
  },
  {
    category: "🏗️ Bureaux et Locaux",
    properties: [
      { 
        name: "Bureau 50m²", 
        price: "800€/mois", 
        location: "Douala Centre",
        details: "Bureau équipé, 50m², climatisation, parking",
        type: "Location"
      },
      { 
        name: "Local Commercial", 
        price: "1,500€/mois", 
        location: "Douala Akwa",
        details: "Local commercial, 100m², vitrine, entrepôt",
        type: "Location"
      }
    ]
  }
];

export default function ImmobilierPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <ModernNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header SEO Optimisé */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Immobilier
            </h1>
            <p className="text-2xl text-gray-700 mb-4">
              Appartements et Maisons à Vendre et à Louer
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Découvrez notre sélection de biens immobiliers : appartement, maison, location, vente. 
              Large gamme de biens avec photos, descriptions détaillées et visites virtuelles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Home className="w-6 h-6" />
                <span>Voir nos Biens</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-orange-600 hover:bg-orange-50 transition-all duration-300"
              >
                Estimer mon Bien
              </Link>
            </div>
          </div>

          {/* Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">Garantie</div>
              <div className="text-gray-600">Biens vérifiés</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">Localisation</div>
              <div className="text-gray-600">Précise</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">Qualité</div>
              <div className="text-gray-600">Premium</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Home className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-gray-900 mb-2">+500</div>
              <div className="text-gray-600">Biens disponibles</div>
            </div>
          </div>

          {/* Biens par Catégorie */}
          <div className="space-y-16">
            {properties.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {category.category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.properties.map((property, propertyIndex) => (
                    <div key={propertyIndex} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-gray-900">{property.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          property.type === 'Vente' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.type}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prix :</span>
                          <span className="font-bold text-orange-600">{property.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Localisation :</span>
                          <span className="font-semibold">{property.location}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {property.details}
                        </div>
                      </div>
                      
                      <Link
                        href="/contact"
                        className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors text-center block"
                      >
                        Voir Détails
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Vendre ou Louer votre Bien ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Confiez-nous votre bien immobilier. Estimation gratuite et accompagnement personnalisé.
            </p>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Home className="w-6 h-6" />
              <span>Nous Contacter</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 