import ArtisansTechnicians from '@/components/novaworld/services/ArtisansTechnicians';
import DomesticServices from '@/components/novaworld/services/DomesticServices';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Building2,
    Car,
    Fuel,
    Globe,
    Home,
    ShoppingCart,
    Truck,
    Users,
    Wrench,
    Zap
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services NovaWorld - Prestations Vérifiées',
  description: 'Trouvez rapidement des professionnels fiables pour tous vos besoins : ménage, nounou, artisans, experts, livraison et plus encore.',
  keywords: ['services', 'prestations', 'artisans', 'experts', 'livraison', 'NovaWorld', 'DL Solutions'],
};

const serviceCategories = [
  {
    id: 'domestic',
    name: 'Prestations Domestiques',
    icon: Home,
    description: 'Ménage, nounou, cuisinier, jardinier',
    color: 'bg-blue-500',
    features: ['Vérifiés et notés', 'Réservation rapide', 'Prix transparents']
  },
  {
    id: 'artisans',
    name: 'Artisans & Techniciens',
    icon: Wrench,
    description: 'Électricien, plombier, menuisier, mécanicien',
    color: 'bg-orange-500',
    features: ['Urgence 24/7', 'Carte interactive', 'Diagnostic photo/vidéo']
  },
  {
    id: 'experts',
    name: 'Experts & Cabinets',
    icon: Users,
    description: 'Avocats, médecins, coachs, comptables',
    color: 'bg-purple-500',
    features: ['Calendrier intégré', 'Visioconsultation', 'Facturation auto']
  },
  {
    id: 'logistics',
    name: 'Livraison & Achats',
    icon: Truck,
    description: 'Gaz, eau, courses, pièces auto',
    color: 'bg-green-500',
    features: ['Suivi temps réel', 'Livraison express', 'Paiement sécurisé']
  }
];

export default function NovaWorldServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête des services NovaWorld */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🌍 Services NovaWorld
              </h1>
              <p className="text-xl text-gray-600">
                La Super App Africaine des Prestations Vérifiées
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            NovaWorld révolutionne l'accès aux services en Afrique. Trouvez, réservez et payez 
            des professionnels vérifiés en quelques clics. De la nounou à l'électricien, 
            en passant par l'avocat et la livraison de gaz, tout est possible !
          </p>
        </div>

        {/* Catégories de services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🚀 Nos Catégories de Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center">
                          <Zap className="w-3 h-3 text-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Statistiques et impact */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Prestataires Vérifiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10k+</div>
                <div className="text-blue-100">Services Réalisés</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Satisfaction Client</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support & Urgences</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interface des services avec onglets */}
        <div className="mb-12">
          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="domestic" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Domestiques</span>
              </TabsTrigger>
              <TabsTrigger value="artisans" className="flex items-center space-x-2">
                <Wrench className="w-4 h-4" />
                <span>Artisans</span>
              </TabsTrigger>
              <TabsTrigger value="experts" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Experts</span>
              </TabsTrigger>
              <TabsTrigger value="logistics" className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Logistique</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="domestic">
              <DomesticServices />
            </TabsContent>

            <TabsContent value="artisans">
              <ArtisansTechnicians />
            </TabsContent>

            <TabsContent value="experts">
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Module Experts & Cabinets
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Consultation d'avocats, médecins, coachs et experts-comptables. 
                  Prise de rendez-vous en ligne, visioconsultation intégrée et facturation automatique.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Building2 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Avocats & Juristes</h4>
                      <p className="text-sm text-gray-600">Conseil juridique, rédaction de contrats, représentation</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Médecins & Santé</h4>
                      <p className="text-sm text-gray-600">Consultation, diagnostic, suivi médical</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Coachs & Experts</h4>
                      <p className="text-sm text-gray-600">Développement personnel, formation, conseil</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logistics">
              <div className="text-center py-16">
                <Truck className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Module Livraison & Achats
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Commande et livraison de gaz domestique, eau, courses et pièces automobiles. 
                  Suivi en temps réel et paiement sécurisé.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Fuel className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Gaz Domestique</h4>
                      <p className="text-sm text-gray-600">Livraison express de bouteilles de gaz</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <ShoppingCart className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Courses & Achats</h4>
                      <p className="text-sm text-gray-600">Commande de produits spécifiques</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Car className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Pièces Auto</h4>
                      <p className="text-sm text-gray-600">Achat et livraison de pièces détachées</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA final */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              🚀 Prêt à Découvrir NovaWorld ?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à NovaWorld pour leurs besoins quotidiens. 
              Téléchargez l'app ou utilisez la version web dès maintenant !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                📱 Télécharger l'App
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                🌐 Utiliser la Version Web
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 