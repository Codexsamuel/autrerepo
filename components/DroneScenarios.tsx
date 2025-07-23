"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CheckCircle,
    Clock,
    MapPin,
    Play,
    RotateCcw,
    Target,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  droneType: 'sentinel' | 'atlas';
  icon: string;
  color: string;
  duration: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  objectives: string[];
  parameters: {
    altitude: number;
    speed: number;
    battery: number;
    signal: number;
    windSpeed: number;
    weather: 'clear' | 'cloudy' | 'rain' | 'storm';
    timeOfDay: 'day' | 'night';
  };
  events: Array<{
    time: number;
    type: 'alert' | 'objective' | 'weather' | 'system';
    message: string;
    severity?: 'low' | 'medium' | 'high';
  }>;
}

const scenarios: Scenario[] = [
  {
    id: 'military-patrol',
    name: 'Patrouille Militaire',
    description: 'Surveillance d\'une zone sensible avec détection d\'intrus',
    droneType: 'sentinel',
    icon: '🛡️',
    color: '#dc2626',
    duration: 180,
    difficulty: 'difficile',
    objectives: [
      'Scanner la zone de 2km²',
      'Détecter les mouvements suspects',
      'Maintenir la furtivité',
      'Rapporter les anomalies'
    ],
    parameters: {
      altitude: 80,
      speed: 35,
      battery: 100,
      signal: 95,
      windSpeed: 8,
      weather: 'clear',
      timeOfDay: 'night'
    },
    events: [
      { time: 30, type: 'objective', message: 'Zone de surveillance atteinte' },
      { time: 60, type: 'alert', message: 'Mouvement détecté à 500m', severity: 'medium' },
      { time: 90, type: 'weather', message: 'Brouillard s\'épaissit' },
      { time: 120, type: 'system', message: 'Batterie à 60%' },
      { time: 150, type: 'objective', message: 'Mission accomplie' }
    ]
  },
  {
    id: 'agriculture-spraying',
    name: 'Pulvérisation Agricole',
    description: 'Traitement phytosanitaire d\'un champ de maïs',
    droneType: 'atlas',
    icon: '🌾',
    color: '#059669',
    duration: 240,
    difficulty: 'moyen',
    objectives: [
      'Couvrir 5 hectares',
      'Maintenir la précision de pulvérisation',
      'Éviter les zones sensibles',
      'Optimiser la consommation'
    ],
    parameters: {
      altitude: 30,
      speed: 20,
      battery: 100,
      signal: 90,
      windSpeed: 5,
      weather: 'clear',
      timeOfDay: 'day'
    },
    events: [
      { time: 45, type: 'objective', message: 'Début de la pulvérisation' },
      { time: 90, type: 'alert', message: 'Zone sensible détectée', severity: 'low' },
      { time: 135, type: 'weather', message: 'Vent modéré détecté' },
      { time: 180, type: 'system', message: 'Réservoir à 40%' },
      { time: 210, type: 'objective', message: 'Traitement terminé' }
    ]
  },
  {
    id: 'emergency-rescue',
    name: 'Secours d\'Urgence',
    description: 'Transport de kit médical vers zone inaccessible',
    droneType: 'atlas',
    icon: '🚑',
    color: '#f59e0b',
    duration: 120,
    difficulty: 'difficile',
    objectives: [
      'Atteindre la zone d\'urgence',
      'Livrer le kit médical',
      'Éviter les obstacles',
      'Retour sécurisé'
    ],
    parameters: {
      altitude: 60,
      speed: 45,
      battery: 100,
      signal: 85,
      windSpeed: 12,
      weather: 'rain',
      timeOfDay: 'day'
    },
    events: [
      { time: 20, type: 'objective', message: 'Décollage d\'urgence' },
      { time: 40, type: 'alert', message: 'Conditions météo difficiles', severity: 'high' },
      { time: 60, type: 'weather', message: 'Pluie intense' },
      { time: 80, type: 'objective', message: 'Livraison effectuée' },
      { time: 100, type: 'system', message: 'Retour à la base' }
    ]
  },
  {
    id: 'surveillance-urban',
    name: 'Surveillance Urbaine',
    description: 'Monitoring de sécurité dans un quartier résidentiel',
    droneType: 'sentinel',
    icon: '🏙️',
    color: '#3b82f6',
    duration: 150,
    difficulty: 'moyen',
    objectives: [
      'Surveiller 10 pâtés de maisons',
      'Identifier les comportements suspects',
      'Maintenir la discrétion',
      'Documenter les incidents'
    ],
    parameters: {
      altitude: 50,
      speed: 25,
      battery: 100,
      signal: 92,
      windSpeed: 6,
      weather: 'clear',
      timeOfDay: 'day'
    },
    events: [
      { time: 30, type: 'objective', message: 'Zone de surveillance active' },
      { time: 60, type: 'alert', message: 'Activité suspecte détectée', severity: 'medium' },
      { time: 90, type: 'system', message: 'Enregistrement vidéo' },
      { time: 120, type: 'objective', message: 'Patrouille terminée' }
    ]
  },
  {
    id: 'precision-agriculture',
    name: 'Agriculture de Précision',
    description: 'Analyse multispectrale d\'un champ pour optimisation',
    droneType: 'atlas',
    icon: '🔬',
    color: '#8b5cf6',
    duration: 200,
    difficulty: 'facile',
    objectives: [
      'Scanner le champ complet',
      'Collecter les données multispectrales',
      'Identifier les zones stressées',
      'Générer le rapport d\'analyse'
    ],
    parameters: {
      altitude: 40,
      speed: 15,
      battery: 100,
      signal: 88,
      windSpeed: 3,
      weather: 'clear',
      timeOfDay: 'day'
    },
    events: [
      { time: 40, type: 'objective', message: 'Début de l\'analyse' },
      { time: 80, type: 'system', message: 'Données collectées' },
      { time: 120, type: 'objective', message: 'Zones stressées identifiées' },
      { time: 160, type: 'system', message: 'Rapport généré' }
    ]
  }
];

interface DroneScenariosProps {
  onScenarioSelect: (scenario: Scenario) => void;
  onScenarioStart: (scenario: Scenario) => void;
  currentScenario?: Scenario | null;
  isRunning?: boolean;
}

export default function DroneScenarios({ 
  onScenarioSelect, 
  onScenarioStart, 
  currentScenario,
  isRunning = false 
}: DroneScenariosProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    onScenarioSelect(scenario);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-500';
      case 'moyen': return 'bg-yellow-500';
      case 'difficile': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'Facile';
      case 'moyen': return 'Moyen';
      case 'difficile': return 'Difficile';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scénario actuel */}
      {currentScenario && (
        <Card className="bg-[#181f2a] border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentScenario.icon}</span>
                <div>
                  <CardTitle className="text-white">{currentScenario.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Scénario en cours
                  </CardDescription>
                </div>
              </div>
              <Badge 
                className={getDifficultyColor(currentScenario.difficulty)}
                variant="secondary"
              >
                {getDifficultyText(currentScenario.difficulty)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">{currentScenario.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                <p className="text-xs text-gray-400">Durée</p>
                <p className="text-sm font-semibold">{currentScenario.duration}s</p>
              </div>
              <div className="text-center">
                <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-400" />
                <p className="text-xs text-gray-400">Batterie</p>
                <p className="text-sm font-semibold">{currentScenario.parameters.battery}%</p>
              </div>
              <div className="text-center">
                <MapPin className="h-5 w-5 mx-auto mb-1 text-green-400" />
                <p className="text-xs text-gray-400">Altitude</p>
                <p className="text-sm font-semibold">{currentScenario.parameters.altitude}m</p>
              </div>
              <div className="text-center">
                <Target className="h-5 w-5 mx-auto mb-1 text-red-400" />
                <p className="text-xs text-gray-400">Vitesse</p>
                <p className="text-sm font-semibold">{currentScenario.parameters.speed} km/h</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onScenarioStart(currentScenario)}
                disabled={isRunning}
                className="flex-1"
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'En cours...' : 'Démarrer'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedScenario(null)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Changer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des scénarios */}
      {!currentScenario && (
        <>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Scénarios de Simulation</h3>
            <p className="text-gray-400">Choisissez un scénario prédéfini pour tester vos drones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className="bg-[#181f2a] border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                onClick={() => handleScenarioSelect(scenario)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{scenario.icon}</span>
                      <div>
                        <CardTitle className="text-white text-lg">{scenario.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          {scenario.droneType === 'sentinel' ? 'Sentinel V1' : 'Atlas X1'}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      className={getDifficultyColor(scenario.difficulty)}
                      variant="secondary"
                    >
                      {getDifficultyText(scenario.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">{scenario.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>⏱️ {scenario.duration}s</span>
                    <span>🎯 {scenario.objectives.length} objectifs</span>
                  </div>

                  <div className="space-y-2">
                    {scenario.objectives.slice(0, 2).map((objective, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {objective}
                      </div>
                    ))}
                    {scenario.objectives.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{scenario.objectives.length - 2} autres objectifs
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 