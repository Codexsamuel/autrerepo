import { Car, Clock, MapPin, Phone, Shield, Star, Truck, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transport DL Solutions - Services de Transport Premium au Cameroun | Livraison, Logistique, Chauffeur Privé',
  description: 'Services de transport premium au Cameroun : livraison, logistique, chauffeur privé, transport de marchandises. DL Solutions - Expert en solutions de transport innovantes. Contactez-nous !',
  keywords: [
    'transport Cameroun',
    'services transport',
    'livraison Cameroun',
    'logistique Cameroun',
    'chauffeur privé',
    'transport marchandises',
    'transport Yaoundé',
    'transport Douala',
    'livraison express',
    'transport international',
    'transport local',
    'transport urbain',
    'transport interurbain',
    'location véhicule',
    'transport VIP',
    'transport événementiel',
    'transport médical',
    'transport scolaire',
    'transport entreprise',
    'transport personnel',
    'DL Solutions transport',
    'transport innovant',
    'logistique intégrée',
    'solutions transport',
    'expertise transport',
    'projets transport',
    'consultation transport',
    'installation transport',
    'maintenance transport',
    'transport haute performance'
  ],
  openGraph: {
    title: 'Transport DL Solutions - Services de Transport Premium au Cameroun',
    description: 'Livraison, logistique, chauffeur privé, transport de marchandises. Expert en solutions de transport innovantes au Cameroun.',
    type: 'website',
    url: 'https://dlsolutions.com/transport',
    images: [
      {
        url: '/images/transport/transport-services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Services de Transport DL Solutions Cameroun'
      }
    ],
    siteName: 'DL Solutions - Services de Transport'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transport DL Solutions - Services de Transport Premium au Cameroun',
    description: 'Livraison, logistique, chauffeur privé, transport de marchandises. Expert en solutions de transport innovantes.',
    images: ['/images/transport/transport-services-twitter.jpg']
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
  alternates: {
    canonical: 'https://dlsolutions.com/transport'
  }
};

const transportServices = [
  {
    icon: Car,
    title: 'Transport Personnel',
    description: 'Service de chauffeur privé avec véhicules premium pour vos déplacements personnels et professionnels',
    features: ['Véhicules haut de gamme', 'Chauffeurs expérimentés', 'Service 24/7', 'Réservation en ligne'],
    price: 'À partir de 5 000 FCFA/heure'
  },
  {
    icon: Truck,
    title: 'Livraison & Logistique',
    description: 'Services de livraison express et logistique complète pour entreprises et particuliers',
    features: ['Livraison express', 'Suivi GPS temps réel', 'Assurance incluse', 'Service national'],
    price: 'À partir de 2 500 FCFA/colis'
  },
  {
    icon: Users,
    title: 'Transport Événementiel',
    description: 'Transport de groupe pour événements, mariages, séminaires et manifestations',
    features: ['Bus climatisés', 'Minibus VIP', 'Chauffeurs professionnels', 'Service personnalisé'],
    price: 'À partir de 25 000 FCFA/jour'
  },
  {
    icon: Shield,
    title: 'Transport Médical',
    description: 'Transport médical spécialisé avec équipements et personnel qualifié',
    features: ['Ambulances équipées', 'Personnel médical', 'Urgences 24/7', 'Transferts inter-hôpitaux'],
    price: 'À partir de 15 000 FCFA/trajet'
  },
  {
    icon: Clock,
    title: 'Transport Express',
    description: 'Livraison express et transport urgent dans tout le Cameroun',
    features: ['Livraison en 2h', 'Service national', 'Suivi en temps réel', 'Garantie de délai'],
    price: 'À partir de 5 000 FCFA/express'
  },
  {
    icon: MapPin,
    title: 'Transport International',
    description: 'Services de transport et logistique internationale vers l\'Afrique et l\'Europe',
    features: ['Transport maritime', 'Transport aérien', 'Douane incluse', 'Suivi complet'],
    price: 'Sur devis'
  }
];

const vehicleTypes = [
  {
    name: 'Berlines Premium',
    description: 'Peugeot 3008, 508, 208 - Confort et élégance',
    capacite: '4-5 passagers',
    prix: '5 000 - 8 000 FCFA/h',
    image: '/images/transport/berlines.jpg'
  },
  {
    name: 'SUVs & 4x4',
    description: 'Véhicules tout-terrain pour tous types de terrains',
    capacite: '6-8 passagers',
    prix: '6 500 - 10 000 FCFA/h',
    image: '/images/transport/suvs.jpg'
  },
  {
    name: 'Camions & Utilitaires',
    description: 'Transport de marchandises et déménagement',
    capacite: 'Jusqu\'à 5 tonnes',
    prix: '8 000 - 15 000 FCFA/h',
    image: '/images/transport/camions.jpg'
  },
  {
    name: 'Bus & Minibus',
    description: 'Transport de groupe et événementiel',
    capacite: '15-50 passagers',
    prix: '25 000 - 50 000 FCFA/jour',
    image: '/images/transport/bus.jpg'
  }
];

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🚛 Services de Transport Premium
          </h1>
          <p className="text-xl text-orange-200 mb-8 max-w-3xl mx-auto">
            Solutions de transport innovantes au Cameroun : livraison, logistique, chauffeur privé, 
            transport événementiel. Expertise locale et service premium.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Truck className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">+100 Véhicules</p>
              <p className="text-orange-200 text-sm">Flotte moderne</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-white font-semibold">+5000 Livraisons</p>
              <p className="text-orange-200 text-sm">Réalisées</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">100% Punctualité</p>
              <p className="text-orange-200 text-sm">Garantie</p>
            </div>
          </div>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Réserver un Transport
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nos Services de Transport
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transportServices.map((service, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <service.icon className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-orange-200 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-orange-200 flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-green-400 font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Types de Véhicules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">{vehicle.name}</h3>
                <p className="text-orange-200 text-sm mb-2">{vehicle.description}</p>
                <p className="text-orange-200 text-xs mb-3">Capacité : {vehicle.capacite}</p>
                <p className="text-green-400 font-bold">{vehicle.prix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Tarifs et Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Tarifs Horaire</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="text-white font-semibold">Berline Premium</h4>
                  <p className="text-orange-200">5 000 - 8 000 FCFA/heure</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="text-white font-semibold">SUV & 4x4</h4>
                  <p className="text-orange-200">6 500 - 10 000 FCFA/heure</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold">Camions & Utilitaires</h4>
                  <p className="text-orange-200">8 000 - 15 000 FCFA/heure</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Tarifs Journalier</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="text-white font-semibold">Berline Premium</h4>
                  <p className="text-orange-200">45 000 - 65 000 FCFA/jour</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="text-white font-semibold">SUV & 4x4</h4>
                  <p className="text-orange-200">55 000 - 75 000 FCFA/jour</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="text-white font-semibold">Bus & Minibus</h4>
                  <p className="text-orange-200">25 000 - 50 000 FCFA/jour</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-green-500/20 rounded-xl">
            <p className="text-green-300 text-center font-medium">
              💡 Offre spéciale : Réduction de 15% pour les réservations de plus de 3 jours
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Besoin d'un Transport Fiable ?
          </h2>
          <p className="text-xl text-orange-200 mb-8">
            Contactez DL Solutions Transport pour vos besoins de transport. Réservation en ligne et service client 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                <Phone className="w-4 h-4 inline mr-2" />
                Nous Contacter
              </button>
            </Link>
            <Link href="/dl-transport">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg border border-white/30 transition-all duration-300">
                <Truck className="w-4 h-4 inline mr-2" />
                Réserver en Ligne
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <div className="sr-only">
        <h1>Services de Transport Premium au Cameroun - DL Solutions</h1>
        <h2>Expert en Solutions de Transport Innovantes</h2>
        <h3>Livraison, Logistique, Chauffeur Privé, Transport Événementiel</h3>
        
        <p>DL Solutions est le leader des services de transport au Cameroun. Notre expertise couvre la livraison, la logistique, le chauffeur privé, le transport événementiel et le transport médical.</p>
        
        <h4>Services de Transport Disponibles :</h4>
        <ul>
          <li>Transport personnel avec chauffeur privé et véhicules premium</li>
          <li>Livraison express et logistique complète</li>
          <li>Transport événementiel pour groupes et manifestations</li>
          <li>Transport médical spécialisé avec équipements</li>
          <li>Transport express et urgent dans tout le Cameroun</li>
          <li>Transport international vers l'Afrique et l'Europe</li>
        </ul>
        
        <h4>Zones de Service :</h4>
        <p>Yaoundé, Douala, Kribi, Bafoussam, Bamenda, Garoua, Maroua, Bertoua, Ebolowa, Kumba, Ngaoundéré, Buea, Limbe, Mbalmayo, Sangmelima, Kribi, Edea, Foumban, Bafang, Mbouda, Dschang, Bafang, Bangangte, Bafoussam, Kribi, Douala, Yaoundé, Cameroun.</p>
        
        <h4>Contact DL Solutions Transport :</h4>
        <p>Téléphone : +237 694 341 586 | Email : transport@dlsolutions.com | Adresse : École de Police, Yaoundé, Cameroun</p>
        
        <h4>Pourquoi Choisir DL Solutions Transport :</h4>
        <ul>
          <li>Flotte de plus de 100 véhicules modernes</li>
          <li>Plus de 5000 livraisons réalisées avec succès</li>
          <li>100% de ponctualité garantie</li>
          <li>Chauffeurs expérimentés et certifiés</li>
          <li>Service client 24/7</li>
          <li>Assurance et garantie incluses</li>
        </ul>
      </div>
    </div>
  );
} 