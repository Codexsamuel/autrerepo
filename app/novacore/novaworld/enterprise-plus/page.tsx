import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Zap, 
  Globe,
  Brain,
  Database,
  Lock,
  TrendingUp,
  Users,
  Building2,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NovaWorld Enterprise++ - Fonctionnalités Avancées',
  description: 'Découvrez les fonctionnalités Enterprise++ de NovaWorld : recherche IA, rappels intelligents, audit inviolable et plus encore',
  keywords: ['NovaWorld', 'Enterprise++', 'IA', 'pgvector', 'audit', 'rappels', 'recherche sémantique'],
};

export default function EnterprisePlusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Enterprise++ */}
      <div className="bg-gradient-to-r from-slate-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-16 h-16 mr-4 text-yellow-400" />
              <h1 className="text-6xl font-bold">NovaWorld Enterprise++</h1>
            </div>
            <p className="text-2xl opacity-90 mb-8">
              Plateforme réseau social africaine de niveau entreprise avec IA, sécurité et performance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-100 text-yellow-800">
                <Brain className="w-4 h-4 mr-2" />
                IA Sémantique
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-2" />
                Audit Inviolable
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                <Calendar className="w-4 h-4 mr-2" />
                Rappels Intelligents
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-100 text-purple-800">
                <Lock className="w-4 h-4 mr-2" />
                Idempotency
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Vue d'ensemble des fonctionnalités Enterprise++ */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
            Fonctionnalités Enterprise++ Déployées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Recherche IA Sémantique */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl">Recherche IA Sémantique</CardTitle>
                <CardDescription>
                  pgvector + embeddings 1536-dimensions pour des résultats pertinents
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Index ANN optimisé
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Seuil de similarité configurable
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    API REST sécurisée
                  </div>
                </div>
                <Badge className="mt-4 bg-blue-100 text-blue-800">
                  <Database className="w-3 h-3 mr-1" />
                  pgvector
                </Badge>
              </CardContent>
            </Card>

            {/* Export .ics + Rappels */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl">Export .ics + Rappels</CardTitle>
                <CardDescription>
                  Intégration calendrier et notifications WhatsApp/SMS
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Export .ics standard
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Rappels 24h/2h/15min
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    WhatsApp + SMS
                  </div>
                </div>
                <Badge className="mt-4 bg-green-100 text-green-800">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Multi-canal
                </Badge>
              </CardContent>
            </Card>

            {/* Idempotency */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl">Idempotency</CardTitle>
                <CardDescription>
                  Protection contre les doublons et opérations répétées
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Clés uniques par opération
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Nettoyage automatique
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Middleware intégré
                  </div>
                </div>
                <Badge className="mt-4 bg-orange-100 text-orange-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Anti-doublon
                </Badge>
              </CardContent>
            </Card>

            {/* Audit Chain */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl">Audit Chain</CardTitle>
                <CardDescription>
                  Chaîne de logs inviolable avec hash cryptographique
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Hash SHA-256 chaîné
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Vérification d'intégrité
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Traçabilité complète
                  </div>
                </div>
                <Badge className="mt-4 bg-purple-100 text-purple-800">
                  <Lock className="w-3 h-3 mr-1" />
                  Inviolable
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Détails techniques */}
        <Tabs defaultValue="architecture" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="architecture" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Déploiement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architecture">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Building2 className="w-6 h-6 mr-3" />
                  Architecture Enterprise++
                </CardTitle>
                <CardDescription>
                  Architecture modulaire et scalable pour les entreprises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Composants Principaux</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Database className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium text-blue-900">Base de Données</div>
                          <div className="text-sm text-blue-700">Supabase + pgvector + RLS</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <Search className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <div className="font-medium text-green-900">Recherche IA</div>
                          <div className="text-sm text-green-700">Embeddings 1536D + ANN</div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                        <Shield className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <div className="font-medium text-purple-900">Sécurité</div>
                          <div className="text-sm text-purple-700">Audit + Idempotency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">APIs et Services</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">Recherche Sémantique</div>
                        <div className="text-sm text-gray-600">POST /api/search/semantic</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">Export Calendrier</div>
                        <div className="text-sm text-gray-600">GET /api/ics/[bookingId]</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">Rappels</div>
                        <div className="text-sm text-gray-600">POST /api/reminders/send</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Sécurité et Conformité
                </CardTitle>
                <CardDescription>
                  Protection des données et traçabilité complète
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Protection des Données</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-800">Chiffrement AES-256</span>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-800">RLS (Row Level Security)</span>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-800">Authentification JWT</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit et Traçabilité</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900">Chaîne d'Audit</div>
                        <div className="text-sm text-blue-700">Hash SHA-256 chaîné inviolable</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900">Idempotency</div>
                        <div className="text-sm text-blue-700">Protection contre les doublons</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900">Logs Complets</div>
                        <div className="text-sm text-blue-700">Toutes les actions tracées</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Zap className="w-6 h-6 mr-3" />
                  Performance et Scalabilité
                </CardTitle>
                <CardDescription>
                  Optimisations pour les charges élevées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimisations Base</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-900">Index pgvector</div>
                        <div className="text-sm text-yellow-700">IVFFlat avec 100 listes</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-900">Requêtes optimisées</div>
                        <div className="text-sm text-yellow-700">RPC et vues matérialisées</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm font-medium text-yellow-900">Cache intelligent</div>
                        <div className="text-sm text-yellow-700">Redis + Supabase cache</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-900">Métriques Temps Réel</div>
                        <div className="text-sm text-purple-700">Latence, débit, erreurs</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-900">Alertes Automatiques</div>
                        <div className="text-sm text-purple-700">Seuils configurables</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-900">Profiling</div>
                        <div className="text-sm text-purple-700">Analyse des goulots d'étranglement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Globe className="w-6 h-6 mr-3" />
                  Déploiement et Maintenance
                </CardTitle>
                <CardDescription>
                  Infrastructure et processus de déploiement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="text-sm font-medium text-indigo-900">Frontend</div>
                        <div className="text-sm text-indigo-700">Netlify (Next.js 15)</div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="text-sm font-medium text-indigo-900">Backend</div>
                        <div className="text-sm text-indigo-700">Vercel (API Routes)</div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="text-sm font-medium text-indigo-900">Base de Données</div>
                        <div className="text-sm text-indigo-700">Supabase (PostgreSQL + pgvector)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <div className="text-sm font-medium text-teal-900">Mises à jour</div>
                        <div className="text-sm text-teal-700">Automatiques via CI/CD</div>
                      </div>
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <div className="text-sm font-medium text-teal-900">Sauvegardes</div>
                        <div className="text-sm text-teal-700">Quotidiennes + point-in-time</div>
                      </div>
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <div className="text-sm font-medium text-teal-900">Monitoring</div>
                        <div className="text-sm text-teal-700">24/7 avec alertes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Enterprise++ */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-900 to-purple-900 text-white">
            <CardContent className="p-16">
              <h2 className="text-4xl font-bold mb-6">
                NovaWorld Enterprise++ est Prêt !
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Toutes les fonctionnalités Enterprise++ sont déployées et opérationnelles. 
                NovaWorld dispose maintenant des capacités d'une plateforme de niveau entreprise 
                avec IA, sécurité inviolable et performance optimale.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/novacore/novaworld" className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors text-lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Retour à NovaWorld
                </a>
                <a href="/novacore" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-colors text-lg">
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