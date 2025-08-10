"use client";

import { AdvancedSEO } from '@/components/seo';
import { generateSEOProps } from '@/components/seo/seoConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Search, 
  Share2, 
  Smartphone, 
  Shield, 
  Zap,
  Eye,
  Code,
  Database,
  BarChart3
} from 'lucide-react';

export default function TestSEOPage() {
  return (
    <>
      {/* SEO pour cette page de test */}
      <AdvancedSEO
        {...generateSEOProps(
          "Test SEO Avancé - Composant DL Solutions | Démonstration Complète",
          "Page de démonstration du composant SEO avancé DL Solutions. Testez toutes les fonctionnalités SEO, Open Graph, données structurées et optimisation mobile.",
          ["test SEO", "démonstration", "composant", "optimisation", "référencement"],
          "/test-seo",
          "/images/test-seo-og.jpg"
        )}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              🚀 Test du Composant SEO Avancé
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Démonstration complète des fonctionnalités SEO, Open Graph, données structurées 
              et optimisation mobile de notre composant DL Solutions
            </p>
            <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
              Version 2.0 - Next.js 15
            </Badge>
          </div>

          {/* Fonctionnalités principales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>SEO Avancé</CardTitle>
                <CardDescription>
                  Meta tags dynamiques, URL canonique, contrôle des robots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Title et description optimisés</li>
                  <li>• Mots-clés ciblés</li>
                  <li>• URL canonique automatique</li>
                  <li>• Gestion des robots (noindex, nofollow)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Open Graph</CardTitle>
                <CardDescription>
                  Optimisation réseaux sociaux et partage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Meta tags Open Graph complets</li>
                  <li>• Twitter Cards optimisées</li>
                  <li>• Images sociales 1200x630px</li>
                  <li>• Support multi-réseaux</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Données Structurées</CardTitle>
                <CardDescription>
                  Schema.org et Rich Snippets Google
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Organisation et site web</li>
                  <li>• Articles et produits</li>
                  <li>• Navigation breadcrumbs</li>
                  <li>• Informations de contact</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Performance</CardTitle>
                <CardDescription>
                  Optimisation vitesse et Core Web Vitals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Préchargement ressources</li>
                  <li>• DNS prefetch</li>
                  <li>• Meta tags performance</li>
                  <li>• Support PWA</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Mobile & PWA</CardTitle>
                <CardDescription>
                  Optimisation mobile et Progressive Web App
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Viewport optimisé</li>
                  <li>• Apple Touch Icons</li>
                  <li>• Manifest PWA</li>
                  <li>• Thème adaptatif</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Headers de sécurité et protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• X-Frame-Options</li>
                  <li>• X-Content-Type-Options</li>
                  <li>• X-XSS-Protection</li>
                  <li>• Permissions Policy</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Section de test des fonctionnalités */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              🧪 Test des Fonctionnalités
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Vérification Meta Tags
                </h3>
                <p className="text-gray-600 mb-4">
                  Inspectez le code source de cette page pour voir tous les meta tags générés automatiquement.
                </p>
                <Button variant="outline" onClick={() => window.open('view-source:' + window.location.href)}>
                  Voir le Code Source
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-600" />
                  Données Structurées
                </h3>
                <p className="text-gray-600 mb-4">
                  Testez les données structurées avec l'outil Google Rich Results Test.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://search.google.com/test/rich-results')}
                >
                  Tester Rich Results
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-purple-600" />
                  Test Open Graph
                </h3>
                <p className="text-gray-600 mb-4">
                  Vérifiez l'apparence sur les réseaux sociaux avec Facebook Sharing Debugger.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://developers.facebook.com/tools/debug/')}
                >
                  Tester Open Graph
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                  Performance
                </h3>
                <p className="text-gray-600 mb-4">
                  Analysez les performances avec Google PageSpeed Insights.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://pagespeed.web.dev/')}
                >
                  Test PageSpeed
                </Button>
              </div>
            </div>
          </div>

          {/* Section d'implémentation */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">
              💻 Implémentation
            </h2>
            
            <div className="bg-black/20 rounded-lg p-6 font-mono text-sm">
              <p className="text-blue-200 mb-4">// Import du composant</p>
              <p className="text-white mb-2">import {'{'} AdvancedSEO {'}'} from '@/components/seo';</p>
              <p className="text-white mb-2">import {'{'} generateSEOProps {'}'} from '@/components/seo/seoConfig';</p>
              
              <p className="text-blue-200 mt-6 mb-4">// Utilisation dans votre composant</p>
              <p className="text-white mb-2">{'<'}AdvancedSEO</p>
              <p className="text-white mb-2">  {'{'}...generateSEOProps(</p>
              <p className="text-white mb-2">    "Titre de la page",</p>
              <p className="text-white mb-2">    "Description optimisée",</p>
              <p className="text-white mb-2">    ["mot-clé1", "mot-clé2"],</p>
              <p className="text-white mb-2">    "/chemin-page"</p>
              <p className="text-white mb-2">  )}</p>
              <p className="text-white mb-2">{'/>'}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">
              Composant SEO Avancé développé par DL Solutions
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Retour
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                Accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 