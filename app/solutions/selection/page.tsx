"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight,
    Banknote,
    Building,
    CheckCircle,
    Home,
    Megaphone,
    Shield,
    ShoppingCart,
    Star,
    Users,
    Utensils,
    Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const crmModules = [
  {
    id: 'hospitality',
    name: 'Hospitalité & Hôtellerie',
    description: 'Gestion complète des hôtels, réservations, chambres et services hôteliers',
    icon: Building,
    color: 'from-blue-500 to-cyan-500',
    features: ['Réservations', 'Gestion des chambres', 'Facturation', 'Services clients'],
    status: 'active',
    demo: '/demo/ezee-optimus'
  },
  {
    id: 'restaurant',
    name: 'Restauration',
    description: 'CRM spécialisé pour restaurants, commandes, tables et gestion des stocks',
    icon: Utensils,
    color: 'from-orange-500 to-red-500',
    features: ['Gestion des tables', 'Commandes', 'Stock', 'Cuisine'],
    status: 'active',
    demo: '/demo/dl-restaurant'
  },
  {
    id: 'insurance',
    name: 'Assurance',
    description: 'Gestion des contrats, sinistres et clients pour les compagnies d\'assurance',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    features: ['Contrats', 'Sinistres', 'Clients', 'Devis'],
    status: 'active',
    demo: '/demo/dl-assurance'
  },
  {
    id: 'real-estate',
    name: 'Agence Immobilière',
    description: 'Gestion des biens, clients et transactions immobilières',
    icon: Home,
    color: 'from-purple-500 to-pink-500',
    features: ['Biens', 'Clients', 'Transactions', 'Visites'],
    status: 'active',
    demo: '/demo/dl-immobilier'
  },
  {
    id: 'banking',
    name: 'Banque',
    description: 'Solutions bancaires et financières pour la gestion des comptes et crédits',
    icon: Banknote,
    color: 'from-yellow-500 to-orange-500',
    features: ['Comptes', 'Crédits', 'Investissements', 'Rapports'],
    status: 'active',
    demo: '/demo/dl-banque'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    description: 'E-commerce et gestion de boutique avec inventaire et ventes',
    icon: ShoppingCart,
    color: 'from-indigo-500 to-purple-500',
    features: ['Produits', 'Ventes', 'Inventaire', 'Clients'],
    status: 'active',
    demo: '/demo/dl-commerce'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Campagnes marketing, leads et analytics pour optimiser vos ventes',
    icon: Megaphone,
    color: 'from-pink-500 to-rose-500',
    features: ['Campagnes', 'Leads', 'Analytics', 'ROI'],
    status: 'active',
    demo: '/demo/dl-marketing'
  },
  {
    id: 'community-manager',
    name: 'Community Manager',
    description: 'Gestion des réseaux sociaux et communication digitale',
    icon: Users,
    color: 'from-teal-500 to-cyan-500',
    features: ['Réseaux sociaux', 'Contenu', 'Engagement', 'Analytics'],
    status: 'active',
    demo: '/demo/dl-community-manager'
  }
];

export default function CRMSSelectionPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/logo.svg"
                    alt="NovaCore Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      NovaCore
                    </span>
                    <span className="text-xs text-gray-500">Sélection CRM</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Tous les modules actifs
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connectez Tout avec DL Solutions
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Choisissez le CRM adapté à votre secteur d'activité. Tous nos modules sont interconnectés 
              pour une gestion complète de votre entreprise.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Déploiement rapide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-blue-500" />
                <span>Modules premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Support 24/7</span>
              </div>
            </div>
          </div>

          {/* CRM Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {crmModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.id} 
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${
                    selectedModule === module.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant={module.status === 'active' ? 'default' : 'secondary'}
                        className={module.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {module.status === 'active' ? 'Actif' : 'En développement'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mt-4">
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {module.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                      >
                        <Link href={module.demo}>
                          Voir la démo
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/solutions/${module.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos experts sont là pour vous accompagner dans le choix et la mise en place 
              du CRM parfait pour votre activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Zap className="w-5 h-5 mr-2" />
                Commencer maintenant
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Parler à un expert
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 