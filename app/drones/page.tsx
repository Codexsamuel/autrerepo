import { Camera, Clock, MapPin, Rocket, Shield, Star, Users, Zap } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Drones DL Solutions - Services de Drones Professionnels au Cameroun | Surveillance, Photographie, Livraison',
  description: 'Services de drones professionnels au Cameroun : surveillance, photographie aérienne, livraison, cartographie. DL Solutions - Expert en solutions drones innovantes. Contactez-nous pour vos projets drones.',
  keywords: [
    'drones Cameroun',
    'services drones',
    'drone surveillance',
    'photographie aérienne',
    'drone livraison',
    'cartographie drone',
    'drone professionnel',
    'drone Yaoundé',
    'drone Douala',
    'inspection drone',
    'mapping drone',
    'drone agricole',
    'drone sécurité',
    'formation drone',
    'location drone',
    'achat drone',
    'réparation drone',
    'maintenance drone',
    'pilote drone',
    'certification drone',
    'DL Solutions drones',
    'drones innovants',
    'technologie drone',
    'solutions drones',
    'expertise drone',
    'projets drones',
    'consultation drone',
    'installation drone',
    'calibration drone',
    'drone haute performance'
  ],
  openGraph: {
    title: 'Drones DL Solutions - Services de Drones Professionnels au Cameroun',
    description: 'Surveillance, photographie aérienne, livraison, cartographie. Expert en solutions drones innovantes au Cameroun.',
    type: 'website',
    url: 'https://dlsolutions.com/drones',
    images: [
      {
        url: '/images/drones/drone-services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Services de Drones DL Solutions Cameroun'
      }
    ],
    siteName: 'DL Solutions - Services Drones'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drones DL Solutions - Services de Drones Professionnels au Cameroun',
    description: 'Surveillance, photographie aérienne, livraison, cartographie. Expert en solutions drones innovantes.',
    images: ['/images/drones/drone-services-twitter.jpg']
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
    canonical: 'https://dlsolutions.com/drones'
  }
};

const droneServices = [
  {
    icon: Shield,
    title: 'Surveillance & Sécurité',
    description: 'Surveillance de sites industriels, événements, propriétés privées avec drones haute performance',
    features: ['Vision nocturne', 'Détection de mouvement', 'Enregistrement HD', 'Transmission temps réel'],
    price: 'À partir de 50 000 FCFA/jour'
  },
  {
    icon: Camera,
    title: 'Photographie & Vidéo Aérienne',
    description: 'Captures aériennes professionnelles pour immobilier, événements, publicité et documentation',
    features: ['Caméra 4K', 'Stabilisation gyroscopique', 'Photos panoramiques', 'Vidéos immersives'],
    price: 'À partir de 75 000 FCFA/projet'
  },
  {
    icon: MapPin,
    title: 'Cartographie & Topographie',
    description: 'Cartographie précise, modélisation 3D, études topographiques pour projets de construction',
    features: ['Cartographie haute précision', 'Modélisation 3D', 'Orthophotographie', 'Calculs volumétriques'],
    price: 'À partir de 150 000 FCFA/hectare'
  },
  {
    icon: Zap,
    title: 'Inspection Industrielle',
    description: 'Inspection de toitures, pylônes, éoliennes, pipelines avec drones spécialisés',
    features: ['Inspection rapprochée', 'Thermographie', 'Rapports détaillés', 'Maintenance préventive'],
    price: 'À partir de 100 000 FCFA/inspection'
  },
  {
    icon: Users,
    title: 'Formation Pilote Drone',
    description: 'Formation certifiante pour devenir pilote de drone professionnel au Cameroun',
    features: ['Théorie et pratique', 'Certification officielle', 'Simulateur de vol', 'Accompagnement post-formation'],
    price: 'À partir de 250 000 FCFA/formation'
  },
  {
    icon: Clock,
    title: 'Location de Drones',
    description: 'Location de drones professionnels avec pilote pour vos projets ponctuels',
    features: ['Drones haute performance', 'Pilote expérimenté', 'Assurance incluse', 'Équipement complet'],
    price: 'À partir de 30 000 FCFA/jour'
  }
];

const droneModels = [
  {
    name: 'DJI Mavic 3 Pro',
    category: 'Photographie',
    specs: 'Caméra Hasselblad, 4K/60fps, 46 min de vol',
    price: '2 500 000 FCFA'
  },
  {
    name: 'DJI Matrice 300 RTK',
    category: 'Professionnel',
    specs: 'Précision centimétrique, 55 min de vol, charge 2.7kg',
    price: '8 500 000 FCFA'
  },
  {
    name: 'Parrot Anafi USA',
    category: 'Sécurité',
    specs: 'Zoom 32x, thermique, résistant aux intempéries',
    price: '4 200 000 FCFA'
  },
  {
    name: 'DJI Agras T30',
    category: 'Agricole',
    specs: 'Pulvérisation, 30L de charge, 16m d\'envergure',
    price: '15 000 000 FCFA'
  }
];

export default function DronesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🚁 Services de Drones Professionnels
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Solutions drones innovantes au Cameroun : surveillance, photographie aérienne, cartographie, 
            inspection industrielle. Expertise technique et service premium.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
                         <div className="bg-white/10 rounded-lg p-4 text-center">
               <Rocket className="w-8 h-8 text-blue-400 mx-auto mb-2" />
               <p className="text-white font-semibold">+50 Drones</p>
               <p className="text-blue-200 text-sm">Flotte professionnelle</p>
             </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">+200 Projets</p>
              <p className="text-blue-200 text-sm">Réalisés avec succès</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">100% Satisfaction</p>
              <p className="text-blue-200 text-sm">Clients satisfaits</p>
            </div>
          </div>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Demander un Devis Gratuit
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nos Services de Drones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {droneServices.map((service, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <service.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-blue-200 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-blue-200 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
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

      {/* Drone Models Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nos Modèles de Drones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {droneModels.map((drone, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">{drone.name}</h3>
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-3">
                  {drone.category}
                </span>
                <p className="text-blue-200 text-sm mb-4">{drone.specs}</p>
                <p className="text-green-400 font-bold">{drone.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à Découvrir le Monde Vu du Ciel ?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Contactez DL Solutions pour vos projets drones. Devis gratuit et consultation personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Demander un Devis
              </button>
            </Link>
            <Link href="/drone-simulator">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg border border-white/30 transition-all duration-300">
                Essayer le Simulateur
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <div className="sr-only">
        <h1>Services de Drones Professionnels au Cameroun - DL Solutions</h1>
        <h2>Expert en Solutions Drones Innovantes</h2>
        <h3>Surveillance, Photographie Aérienne, Cartographie, Inspection Industrielle</h3>
        
        <p>DL Solutions est le leader des services de drones professionnels au Cameroun. Notre expertise couvre la surveillance, la photographie aérienne, la cartographie, l'inspection industrielle et la formation de pilotes.</p>
        
        <h4>Services de Drones Disponibles :</h4>
        <ul>
          <li>Surveillance et sécurité avec drones haute performance</li>
          <li>Photographie et vidéo aérienne professionnelle</li>
          <li>Cartographie et topographie précise</li>
          <li>Inspection industrielle spécialisée</li>
          <li>Formation pilote drone certifiante</li>
          <li>Location de drones avec pilote</li>
        </ul>
        
        <h4>Zones de Service :</h4>
        <p>Yaoundé, Douala, Kribi, Bafoussam, Bamenda, Garoua, Maroua, Bertoua, Ebolowa, Kumba, Ngaoundéré, Buea, Limbe, Mbalmayo, Sangmelima, Kribi, Edea, Foumban, Bafang, Mbouda, Dschang, Bafang, Bangangte, Bafoussam, Kribi, Douala, Yaoundé, Cameroun.</p>
        
        <h4>Contact DL Solutions Drones :</h4>
        <p>Téléphone : +237 694 341 586 | Email : drones@dlsolutions.com | Adresse : École de Police, Yaoundé, Cameroun</p>
        
        <h4>Pourquoi Choisir DL Solutions pour vos Drones :</h4>
        <ul>
          <li>Flotte de plus de 50 drones professionnels</li>
          <li>Plus de 200 projets réalisés avec succès</li>
          <li>Pilotes certifiés et expérimentés</li>
          <li>Équipements de dernière génération</li>
          <li>Service client 24/7</li>
          <li>Garantie et assurance incluses</li>
        </ul>
      </div>
    </div>
  );
} 