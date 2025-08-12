import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Star, 
  Shield, 
  Users, 
  Globe, 
  Zap, 
  CheckCircle,
  Smartphone,
  Play,
  Award,
  TrendingUp,
  Heart,
  Wrench
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Télécharger NovaWorld - Super App Africaine des Services Vérifiés',
  description: 'Téléchargez NovaWorld, la Super App africaine qui révolutionne l\'accès aux services. Trouvez des prestataires vérifiés : ménage, artisans, experts, livraison. Disponible sur Google Play Store.',
  keywords: [
    'NovaWorld télécharger',
    'app NovaWorld',
    'Google Play Store',
    'services africains',
    'prestataires vérifiés',
    'ménage nounou',
    'artisans électriciens',
    'livraison gaz',
    'super app afrique',
    'DL Solutions'
  ],
  openGraph: {
    title: 'Télécharger NovaWorld - Super App Africaine des Services',
    description: 'Trouvez, réservez et payez des professionnels vérifiés en quelques clics. Disponible sur Google Play Store.',
    type: 'website',
    images: ['/api/placeholder/1200/630'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Télécharger NovaWorld - Super App Africaine',
    description: 'Services vérifiés, prestataires fiables, paiement sécurisé. Disponible sur Google Play Store.',
  },
};

const features = [
  {
    icon: Shield,
    title: 'Prestataires Vérifiés',
    description: 'Tous nos professionnels sont vérifiés et notés par la communauté',
    color: 'text-green-600'
  },
  {
    icon: Zap,
    title: 'Réservation en 3 Clics',
    description: 'Trouvez et réservez un service en moins de 30 secondes',
    color: 'text-blue-600'
  },
  {
    icon: Globe,
    title: 'Urgence 24/7',
    description: 'Service d\'urgence disponible jour et nuit pour les dépannages',
    color: 'text-red-600'
  },
  {
    icon: Users,
    title: 'Réseau Social B2B',
    description: 'Connectez-vous avec d\'autres professionnels et entreprises',
    color: 'text-purple-600'
  }
];

const serviceCategories = [
  '🏠 Ménage & Services Domestiques',
  '🔧 Artisans & Techniciens',
  '👨‍💼 Experts & Cabinets',
  '🚚 Livraison & Achats',
  '💬 Communication & Chat',
  '🗺️ Géolocalisation & Carte'
];

const stats = [
  { number: '500+', label: 'Prestataires Vérifiés' },
  { number: '10k+', label: 'Services Réalisés' },
  { number: '98%', label: 'Satisfaction Client' },
  { number: '24/7', label: 'Support & Urgences' }
];

export default function NovaWorldInstallPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête principal */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-6">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                🌍 Téléchargez NovaWorld
              </h1>
              <p className="text-2xl text-gray-600">
                La Super App Africaine des Services Vérifiés
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            NovaWorld révolutionne l'accès aux services en Afrique. Trouvez, réservez et payez 
            des professionnels vérifiés en quelques clics. De la nounou à l'électricien, 
            en passant par l'avocat et la livraison de gaz, tout est possible !
          </p>

          {/* Bouton d'installation Google Play */}
          <div className="mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-6 text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-8 h-8 mr-3" />
              INSTALLER NOVAWORLD
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Disponible sur Google Play Store • Gratuit • Taille : 45 MB
            </p>
          </div>

          {/* Note et avis */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.8/5</span>
            </div>
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              <CheckCircle className="w-5 h-5 mr-2" />
              10,000+ téléchargements
            </Badge>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fonctionnalités principales */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🚀 Pourquoi Choisir NovaWorld ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${feature.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Catégories de services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🏠 Tous Nos Services Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Capture d'écran de l'app */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📱 Découvrez l'Interface NovaWorld
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center mb-4">
                  <Smartphone className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interface Moderne</h3>
                <p className="text-gray-600">Design intuitif et responsive pour tous les appareils</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center mb-4">
                  <Play className="w-16 h-16 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Navigation Simple</h3>
                <p className="text-gray-600">Accès rapide à tous les services en quelques clics</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Qualité Premium</h3>
                <p className="text-gray-600">Expérience utilisateur comparable aux meilleures apps mondiales</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Témoignages utilisateurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💬 Ce que disent nos utilisateurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Marie Nguemo</h4>
                    <p className="text-sm text-gray-500">Yaoundé, Cameroun</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "NovaWorld m'a permis de trouver une nounou anglophone en 15 minutes ! 
                  Le service est impeccable et la prestataire était parfaite."
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Wrench className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Pierre Abena</h4>
                    <p className="text-sm text-gray-500">Douala, Cameroun</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Urgence électrique à 2h du matin, NovaWorld a trouvé un électricien 
                  en 20 minutes. Service d'urgence 24/7 qui sauve la vie !"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "En tant qu'entreprise, NovaWorld nous a permis de développer notre 
                  réseau B2B et de trouver de nouveaux clients qualifiés."
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA final d'installation */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">
              🚀 Prêt à Révolutionner vos Services ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à NovaWorld 
              pour leurs besoins quotidiens. Téléchargez maintenant et découvrez 
              la Super App africaine des services vérifiés !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-6 h-6 mr-3" />
                INSTALLER NOVAWORLD
              </Button>
              
              <div className="text-center">
                <p className="text-blue-100 mb-2">Disponible sur</p>
                <div className="flex items-center justify-center space-x-2">
                  <Play className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">Google Play Store</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Made in Africa</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 