import { Building, Clock, Home, MapPin, Phone, Star, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Immobilier DL Solutions - Location, Vente, Gestion Immobilière au Cameroun | Appartements, Maisons, Villas',
  description: 'Services immobiliers complets au Cameroun : location, vente, gestion locative. Appartements, maisons, villas, bureaux, terrains. DL Solutions - Expert immobilier Yaoundé, Douala. Contactez-nous !',
  keywords: [
    'immobilier Cameroun',
    'location appartement Yaoundé',
    'vente maison Douala',
    'gestion locative Cameroun',
    'appartement à louer',
    'maison à vendre',
    'villa Cameroun',
    'bureau commercial',
    'terrain constructible',
    'investissement immobilier',
    'agence immobilière',
    'promoteur immobilier',
    'syndic Cameroun',
    'notaire immobilier',
    'expertise immobilière',
    'estimation immobilière',
    'visite virtuelle',
    'photographie immobilière',
    'immobilier neuf',
    'immobilier ancien',
    'location courte durée',
    'location longue durée',
    'terrain titré',
    'terrain non titré',
    'appartement T1 T2 T3 T4',
    'villa de standing',
    'local commercial',
    'entrepôt location',
    'DL Solutions immobilier',
    'plateforme immobilière',
    'immobilier Yaoundé',
    'immobilier Douala',
    'immobilier Kribi',
    'immobilier Bafoussam',
    'immobilier Bamenda'
  ],
  openGraph: {
    title: 'Immobilier DL Solutions - Services Immobiliers Complets au Cameroun',
    description: 'Location, vente, gestion locative. Appartements, maisons, villas, bureaux, terrains. Expert immobilier Yaoundé, Douala.',
    type: 'website',
    url: 'https://dlsolutions.com/immobilier',
    images: [
      {
        url: '/images/immobilier/immobilier-services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Services Immobiliers DL Solutions Cameroun'
      }
    ],
    siteName: 'DL Solutions - Services Immobiliers'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immobilier DL Solutions - Services Immobiliers Complets au Cameroun',
    description: 'Location, vente, gestion locative. Appartements, maisons, villas, bureaux, terrains. Expert immobilier.',
    images: ['/images/immobilier/immobilier-services-twitter.jpg']
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
    canonical: 'https://dlsolutions.com/immobilier'
  }
};

const immobilierServices = [
  {
    icon: Home,
    title: 'Location Immobilière',
    description: 'Location d\'appartements, maisons, villas meublées et non meublées au Cameroun',
    features: ['Appartements T1 à T5', 'Maisons individuelles', 'Villas de standing', 'Bureaux commerciaux'],
    price: 'À partir de 50 000 FCFA/mois'
  },
  {
    icon: Building,
    title: 'Vente Immobilière',
    description: 'Vente d\'appartements, maisons, villas, terrains constructibles et locaux commerciaux',
    features: ['Immobilier neuf', 'Immobilier ancien', 'Terrains titrés', 'Locaux commerciaux'],
    price: 'À partir de 15 000 000 FCFA'
  },
  {
    icon: Users,
    title: 'Gestion Locative',
    description: 'Gestion complète de vos biens immobiliers : location, entretien, administration',
    features: ['Recherche locataires', 'Gestion administrative', 'Entretien des biens', 'Suivi des paiements'],
    price: '20% du loyer ou 100 000 FCFA/3 mois'
  },
  {
    icon: MapPin,
    title: 'Investissement Immobilier',
    description: 'Conseil en investissement immobilier et accompagnement pour vos projets',
    features: ['Études de marché', 'Analyse de rentabilité', 'Accompagnement juridique', 'Gestion de projet'],
    price: 'À partir de 200 000 FCFA/projet'
  },
  {
    icon: Star,
    title: 'Expertise Immobilière',
    description: 'Estimation, expertise et évaluation de biens immobiliers au Cameroun',
    features: ['Estimation de valeur', 'Expertise technique', 'Rapports détaillés', 'Conseil juridique'],
    price: 'À partir de 100 000 FCFA/expertise'
  },
  {
    icon: Clock,
    title: 'Visites Virtuelles',
    description: 'Visites virtuelles 360° et photographies professionnelles de vos biens',
    features: ['Visites 360°', 'Photos HD', 'Vidéos immersives', 'Plans interactifs'],
    price: 'À partir de 50 000 FCFA/visite'
  }
];

const proprieteTypes = [
  {
    name: 'Appartements',
    description: 'T1, T2, T3, T4, T5 - Meublés et non meublés',
    prix: '50 000 - 500 000 FCFA/mois',
    image: '/images/immobilier/appartements.jpg'
  },
  {
    name: 'Maisons',
    description: 'Maisons individuelles, villas, duplex',
    prix: '100 000 - 1 000 000 FCFA/mois',
    image: '/images/immobilier/maisons.jpg'
  },
  {
    name: 'Bureaux',
    description: 'Locaux commerciaux, bureaux, entrepôts',
    prix: '75 000 - 800 000 FCFA/mois',
    image: '/images/immobilier/bureaux.jpg'
  },
  {
    name: 'Terrains',
    description: 'Terrains constructibles, titrés et non titrés',
    prix: '5 000 000 - 50 000 000 FCFA',
    image: '/images/immobilier/terrains.jpg'
  }
];

export default function ImmobilierPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🏠 Services Immobiliers Complets
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Solutions immobilières innovantes au Cameroun : location, vente, gestion locative, 
            investissement immobilier. Expertise locale et service premium.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Home className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">+500 Biens</p>
              <p className="text-blue-200 text-sm">Disponibles</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">+1000 Clients</p>
              <p className="text-blue-200 text-sm">Satisfaits</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">15 Ans</p>
              <p className="text-blue-200 text-sm">d\'Expérience</p>
            </div>
          </div>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Consulter nos Biens
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nos Services Immobiliers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {immobilierServices.map((service, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <service.icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-blue-200 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-blue-200 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
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

      {/* Property Types Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Types de Propriétés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proprieteTypes.map((type, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                <p className="text-blue-200 text-sm mb-4">{type.description}</p>
                <p className="text-green-400 font-bold">{type.prix}</p>
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
              <h3 className="text-2xl font-bold text-white mb-4">Pour les Propriétaires</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="text-white font-semibold">Option 1 : Commission</h4>
                  <p className="text-blue-200">20% du loyer total (12 mois + caution)</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="text-white font-semibold">Option 2 : Abonnement</h4>
                  <p className="text-blue-200">100 000 FCFA tous les 3 mois</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Pour les Locataires</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold">Frais d'Inscription</h4>
                  <p className="text-blue-200">5 000 FCFA (inscription + 2 mois d'abonnement)</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="text-white font-semibold">Paiement</h4>
                  <p className="text-blue-200">Mobile Money : 694341586</p>
                  <p className="text-blue-200">Banque : 10039100290027774160164</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Trouvez Votre Bien Idéal
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Contactez DL Solutions Immobilier pour vos projets immobiliers. Consultation gratuite et accompagnement personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                <Phone className="w-4 h-4 inline mr-2" />
                Nous Contacter
              </button>
            </Link>
            <Link href="/dl-immobilier">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg border border-white/30 transition-all duration-300">
                <Building className="w-4 h-4 inline mr-2" />
                Voir nos Biens
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <div className="sr-only">
        <h1>Services Immobiliers Complets au Cameroun - DL Solutions</h1>
        <h2>Expert en Solutions Immobilières Innovantes</h2>
        <h3>Location, Vente, Gestion Locative, Investissement Immobilier</h3>
        
        <p>DL Solutions est le leader des services immobiliers au Cameroun. Notre expertise couvre la location, la vente, la gestion locative, l'investissement immobilier et l'expertise immobilière.</p>
        
        <h4>Services Immobiliers Disponibles :</h4>
        <ul>
          <li>Location d'appartements, maisons, villas meublées et non meublées</li>
          <li>Vente d'appartements, maisons, villas, terrains constructibles</li>
          <li>Gestion locative complète de vos biens immobiliers</li>
          <li>Conseil en investissement immobilier</li>
          <li>Expertise et estimation immobilière</li>
          <li>Visites virtuelles 360° et photographies professionnelles</li>
        </ul>
        
        <h4>Zones de Service :</h4>
        <p>Yaoundé, Douala, Kribi, Bafoussam, Bamenda, Garoua, Maroua, Bertoua, Ebolowa, Kumba, Ngaoundéré, Buea, Limbe, Mbalmayo, Sangmelima, Kribi, Edea, Foumban, Bafang, Mbouda, Dschang, Bafang, Bangangte, Bafoussam, Kribi, Douala, Yaoundé, Cameroun.</p>
        
        <h4>Contact DL Solutions Immobilier :</h4>
        <p>Téléphone : +237 694 341 586 | Email : immobilier@dlsolutions.com | Adresse : École de Police, Yaoundé, Cameroun</p>
        
        <h4>Pourquoi Choisir DL Solutions Immobilier :</h4>
        <ul>
          <li>Plus de 500 biens immobiliers disponibles</li>
          <li>Plus de 1000 clients satisfaits</li>
          <li>15 ans d'expérience dans l'immobilier</li>
          <li>Équipe d'experts immobiliers certifiés</li>
          <li>Service client 24/7</li>
          <li>Garantie et assurance incluses</li>
        </ul>
      </div>
    </div>
  );
} 