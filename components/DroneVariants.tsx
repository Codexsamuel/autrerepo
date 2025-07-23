"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Award,
    Battery,
    Eye,
    MapPin,
    Settings,
    Star,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface DroneVariant {
  id: string;
  name: string;
  category: 'military' | 'industrial' | 'agriculture' | 'surveillance' | 'delivery' | 'research';
  baseModel: 'sentinel' | 'atlas';
  description: string;
  icon: string;
  color: string;
  status: 'production' | 'prototype' | 'concept';
  specs: {
    weight: string;
    maxSpeed: string;
    range: string;
    payload: string;
    endurance: string;
    maxAltitude: string;
  };
  features: string[];
  applications: string[];
  price: string;
  availability: string;
}

const droneVariants: DroneVariant[] = [
  // Variantes Sentinel (Militaire)
  {
    id: 'sentinel-v1-stealth',
    name: 'Sentinel V1 Stealth',
    category: 'military',
    baseModel: 'sentinel',
    description: 'Version furtive avancée avec signature radar réduite et camouflage thermique',
    icon: '🕵️',
    color: '#1f2937',
    status: 'production',
    specs: {
      weight: '2.8 kg',
      maxSpeed: '95 km/h',
      range: '25 km',
      payload: '1.2 kg',
      endurance: '50 min',
      maxAltitude: '6000m'
    },
    features: [
      'Signature radar -30dB',
      'Camouflage thermique',
      'Mode furtif complet',
      'Cryptage militaire AES-256',
      'Autodestruction programmée'
    ],
    applications: [
      'Reconnaissance militaire',
      'Surveillance furtive',
      'Opérations spéciales',
      'Contre-terrorisme'
    ],
    price: '45,000 €',
    availability: 'Livraison 4-6 semaines'
  },
  {
    id: 'sentinel-v1-heavy',
    name: 'Sentinel V1 Heavy',
    category: 'military',
    baseModel: 'sentinel',
    description: 'Version lourde avec capacité de charge militaire et armement léger',
    icon: '⚔️',
    color: '#dc2626',
    status: 'prototype',
    specs: {
      weight: '4.2 kg',
      maxSpeed: '85 km/h',
      range: '20 km',
      payload: '2.5 kg',
      endurance: '40 min',
      maxAltitude: '5000m'
    },
    features: [
      'Port de charge militaire',
      'Système de largage',
      'Stabilisation avancée',
      'Capteurs de cible',
      'Interface tactique'
    ],
    applications: [
      'Transport militaire',
      'Largage de charges',
      'Support tactique',
      'Logistique avancée'
    ],
    price: '55,000 €',
    availability: 'Prototype - Tests en cours'
  },

  // Variantes Atlas (Industriel)
  {
    id: 'atlas-x1-precision',
    name: 'Atlas X1 Precision',
    category: 'agriculture',
    baseModel: 'atlas',
    description: 'Spécialisé dans l\'agriculture de précision avec capteurs multispectraux',
    icon: '🌱',
    color: '#059669',
    status: 'production',
    specs: {
      weight: '3.5 kg',
      maxSpeed: '25 km/h',
      range: '15 km',
      payload: '3.5 kg',
      endurance: '60 min',
      maxAltitude: '3000m'
    },
    features: [
      'Capteurs multispectraux',
      'Cartographie NDVI',
      'Pulvérisation de précision',
      'IA de détection des maladies',
      'Cartographie 3D des cultures'
    ],
    applications: [
      'Agriculture de précision',
      'Détection de maladies',
      'Optimisation des rendements',
      'Cartographie des sols'
    ],
    price: '32,000 €',
    availability: 'En stock'
  },
  {
    id: 'atlas-x1-medical',
    name: 'Atlas X1 Medical',
    category: 'delivery',
    baseModel: 'atlas',
    description: 'Spécialisé dans le transport médical d\'urgence et de médicaments',
    icon: '🚑',
    color: '#f59e0b',
    status: 'production',
    specs: {
      weight: '3.8 kg',
      maxSpeed: '40 km/h',
      range: '18 km',
      payload: '4.0 kg',
      endurance: '45 min',
      maxAltitude: '4000m'
    },
    features: [
      'Compartiment réfrigéré',
      'Système de largage sécurisé',
      'GPS haute précision',
      'Communication d\'urgence',
      'Certification médicale'
    ],
    applications: [
      'Transport de médicaments',
      'Livraison d\'urgence',
      'Support médical',
      'Logistique hospitalière'
    ],
    price: '38,000 €',
    availability: 'Livraison 2-3 semaines'
  },
  {
    id: 'atlas-x1-survey',
    name: 'Atlas X1 Survey',
    category: 'research',
    baseModel: 'atlas',
    description: 'Dédié à la recherche scientifique et aux études environnementales',
    icon: '🔬',
    color: '#8b5cf6',
    status: 'prototype',
    specs: {
      weight: '3.2 kg',
      maxSpeed: '30 km/h',
      range: '22 km',
      payload: '2.8 kg',
      endurance: '70 min',
      maxAltitude: '4500m'
    },
    features: [
      'Capteurs environnementaux',
      'Collecte d\'échantillons',
      'Cartographie thermique',
      'Analyse de l\'air',
      'Enregistrement multispectral'
    ],
    applications: [
      'Recherche environnementale',
      'Études climatiques',
      'Cartographie scientifique',
      'Surveillance écologique'
    ],
    price: '42,000 €',
    availability: 'Prototype - Disponible sur demande'
  },

  // Nouvelles variantes conceptuelles
  {
    id: 'sentinel-v2-ai',
    name: 'Sentinel V2 AI',
    category: 'surveillance',
    baseModel: 'sentinel',
    description: 'Nouvelle génération avec IA embarquée et reconnaissance faciale',
    icon: '🤖',
    color: '#3b82f6',
    status: 'concept',
    specs: {
      weight: '2.5 kg',
      maxSpeed: '110 km/h',
      range: '30 km',
      payload: '1.0 kg',
      endurance: '65 min',
      maxAltitude: '7000m'
    },
    features: [
      'IA embarquée NVIDIA Jetson',
      'Reconnaissance faciale',
      'Analyse comportementale',
      'Prédiction de mouvements',
      'Apprentissage continu'
    ],
    applications: [
      'Surveillance intelligente',
      'Sécurité urbaine',
      'Recherche de personnes',
      'Analyse de foule'
    ],
    price: '65,000 €',
    availability: 'Concept - Développement en cours'
  },
  {
    id: 'atlas-x2-hybrid',
    name: 'Atlas X2 Hybrid',
    category: 'industrial',
    baseModel: 'atlas',
    description: 'Propulsion hybride électrique-hydrogène pour autonomie étendue',
    icon: '⚡',
    color: '#10b981',
    status: 'concept',
    specs: {
      weight: '4.5 kg',
      maxSpeed: '35 km/h',
      range: '50 km',
      payload: '5.0 kg',
      endurance: '120 min',
      maxAltitude: '3500m'
    },
    features: [
      'Propulsion hybride',
      'Pile à combustible H2',
      'Autonomie étendue',
      'Recharge rapide',
      'Émissions zéro'
    ],
    applications: [
      'Livraison longue distance',
      'Surveillance étendue',
      'Transport de fret',
      'Missions d\'endurance'
    ],
    price: '75,000 €',
    availability: 'Concept - Tests préliminaires'
  }
];

interface DroneVariantsProps {
  onVariantSelect: (variant: DroneVariant) => void;
  selectedVariant?: DroneVariant | null;
}

export default function DroneVariants({ onVariantSelect, selectedVariant }: DroneVariantsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Toutes', icon: '🚁' },
    { id: 'military', name: 'Militaire', icon: '🛡️' },
    { id: 'industrial', name: 'Industriel', icon: '🏭' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
    { id: 'surveillance', name: 'Surveillance', icon: '👁️' },
    { id: 'delivery', name: 'Livraison', icon: '📦' },
    { id: 'research', name: 'Recherche', icon: '🔬' }
  ];

  const filteredVariants = activeCategory === 'all' 
    ? droneVariants 
    : droneVariants.filter(variant => variant.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'bg-green-500';
      case 'prototype': return 'bg-yellow-500';
      case 'concept': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'production': return 'Production';
      case 'prototype': return 'Prototype';
      case 'concept': return 'Concept';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Variantes de Drones</h3>
        <p className="text-gray-400">Découvrez notre gamme complète de drones spécialisés</p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2"
          >
            <span>{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Grille des variantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVariants.map((variant) => (
          <Card 
            key={variant.id} 
            className="bg-[#181f2a] border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => onVariantSelect(variant)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{variant.icon}</span>
                  <div>
                    <CardTitle className="text-white text-lg">{variant.name}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      Basé sur {variant.baseModel === 'sentinel' ? 'Sentinel V1' : 'Atlas X1'}
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  className={getStatusColor(variant.status)}
                  variant="secondary"
                >
                  {getStatusText(variant.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">{variant.description}</p>
              
              {/* Spécifications principales */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-800 rounded">
                  <Target className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                  <p className="text-xs text-gray-400">Vitesse</p>
                  <p className="text-sm font-semibold">{variant.specs.maxSpeed}</p>
                </div>
                <div className="text-center p-2 bg-gray-800 rounded">
                  <MapPin className="h-4 w-4 mx-auto mb-1 text-green-400" />
                  <p className="text-xs text-gray-400">Portée</p>
                  <p className="text-sm font-semibold">{variant.specs.range}</p>
                </div>
                <div className="text-center p-2 bg-gray-800 rounded">
                  <Battery className="h-4 w-4 mx-auto mb-1 text-yellow-400" />
                  <p className="text-xs text-gray-400">Autonomie</p>
                  <p className="text-sm font-semibold">{variant.specs.endurance}</p>
                </div>
                <div className="text-center p-2 bg-gray-800 rounded">
                  <Zap className="h-4 w-4 mx-auto mb-1 text-red-400" />
                  <p className="text-xs text-gray-400">Charge</p>
                  <p className="text-sm font-semibold">{variant.specs.payload}</p>
                </div>
              </div>

              {/* Fonctionnalités principales */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-semibold text-white">Fonctionnalités clés:</h4>
                {variant.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {feature}
                  </div>
                ))}
                {variant.features.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{variant.features.length - 3} autres fonctionnalités
                  </div>
                )}
              </div>

              {/* Prix et disponibilité */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div>
                  <p className="text-lg font-bold text-white">{variant.price}</p>
                  <p className="text-xs text-gray-400">{variant.availability}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <p className="text-2xl font-bold text-white">{droneVariants.length}</p>
          <p className="text-sm text-gray-400">Variantes disponibles</p>
        </div>
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <Award className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-sm text-gray-400">En production</p>
        </div>
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
          <p className="text-2xl font-bold text-white">2</p>
          <p className="text-sm text-gray-400">Prototypes</p>
        </div>
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <Eye className="h-8 w-8 mx-auto mb-2 text-purple-400" />
          <p className="text-2xl font-bold text-white">2</p>
          <p className="text-sm text-gray-400">Concepts</p>
        </div>
      </div>
    </div>
  );
} 