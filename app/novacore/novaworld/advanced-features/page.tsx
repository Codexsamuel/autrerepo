import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  MessageSquare, 
  MapPin, 
  Zap, 
  Shield, 
  Globe,
  Smartphone,
  Building2,
  Users,
  Star,
  Search
} from 'lucide-react';

// Import des nouveaux composants
import CinetPayIntegration from '@/components/novaworld/payments/CinetPayIntegration';
import NovaWorldChat from '@/components/novaworld/chat/NovaWorldChat';
import NovaWorldMap from '@/components/novaworld/map/NovaWorldMap';

export const metadata: Metadata = {
  title: 'Fonctionnalités Avancées - NovaWorld',
  description: 'Découvrez les nouvelles fonctionnalités avancées de NovaWorld : paiements, chat, cartographie et plus encore',
  keywords: ['NovaWorld', 'fonctionnalités avancées', 'paiements', 'chat', 'cartographie', 'réseau social'],
};

export default function AdvancedFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">Fonctionnalités Avancées</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">
              Découvrez les nouvelles capacités de NovaWorld pour une expérience réseau social premium
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <CreditCard className="w-4 h-4 mr-2" />
                Paiements Sécurisés
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat en Temps Réel
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Cartographie Interactive
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Vue d'ensemble des fonctionnalités */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Nouvelles Capacités NovaWorld
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Paiements CinetPay</CardTitle>
                <CardDescription>
                  Paiements sécurisés en ligne avec Mobile Money, cartes bancaires et transferts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    Cryptage SSL/TLS 256-bit
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 text-green-500 mr-2" />
                    Mobile Money supporté
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-green-500 mr-2" />
                    Multi-devises (FCFA, EUR, USD)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Chat en Temps Réel</CardTitle>
                <CardDescription>
                  Communication instantanée avec statuts en ligne et notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-500 mr-2" />
                    Statuts en temps réel
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Messages non lus
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-blue-500 mr-2" />
                    Notifications instantanées
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Cartographie Interactive</CardTitle>
                <CardDescription>
                  Découverte géolocalisée des entreprises et services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 text-purple-500 mr-2" />
                    Entreprises géolocalisées
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-purple-500 mr-2" />
                    Calcul de distances
                  </div>
                  <div className="flex items-center">
                    <Search className="w-4 h-4 text-purple-500 mr-2" />
                    Recherche par proximité
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modules de démonstration */}
        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Paiements</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Cartographie</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Module de Paiement CinetPay
                </CardTitle>
                <CardDescription>
                  Testez le système de paiement sécurisé pour vos services NovaWorld
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CinetPayIntegration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Chat en Temps Réel
                </CardTitle>
                <CardDescription>
                  Communiquez instantanément avec vos contacts NovaWorld
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NovaWorldChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MapPin className="w-6 h-6 mr-3" />
                  Cartographie Interactive
                </CardTitle>
                <CardDescription>
                  Explorez les entreprises et services près de chez vous
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NovaWorldMap />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Informations techniques */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Informations Techniques
              </CardTitle>
              <CardDescription>
                Architecture et technologies utilisées pour ces nouvelles fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Technologies Utilisées
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">Frontend</span>
                      <Badge variant="outline">React + TypeScript</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">Paiements</span>
                      <Badge variant="outline">CinetPay API</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-900">Chat</span>
                      <Badge variant="outline">WebSocket + Realtime</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-900">Cartographie</span>
                      <Badge variant="outline">Leaflet/Mapbox</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sécurité et Conformité
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Paiements</div>
                      <div className="text-sm text-gray-600">
                        SSL/TLS 256-bit, PCI DSS, cryptage des données sensibles
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Communication</div>
                      <div className="text-sm text-gray-600">
                        Chiffrement end-to-end, authentification multi-facteurs
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Données</div>
                      <div className="text-sm text-gray-600">
                        RGPD, anonymisation, contrôle d'accès granulaire
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🎉 Nouvelles Fonctionnalités Actives !
                </h3>
                <p className="text-green-700">
                  NovaWorld dispose maintenant de capacités avancées de paiement, communication et cartographie. 
                  Ces modules sont entièrement fonctionnels et prêts pour la production, offrant une expérience 
                  réseau social premium comparable aux plus grandes plateformes internationales.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à utiliser NovaWorld Avancé ?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Toutes les fonctionnalités sont opérationnelles et sécurisées
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/novacore/novaworld" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  <Globe className="w-5 h-5 mr-2" />
                  Retour à NovaWorld
                </a>
                <a href="/novacore" className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                  <Building2 className="w-5 h-5 mr-2" />
                  NovaCore Principal
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 