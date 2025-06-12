'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Activity, FileCheck, BarChart3 } from "lucide-react";

const features = {
  access: {
    title: "Gestion des accès",
    icon: Shield,
    items: [
      "Interface de gestion des rôles et permissions",
      "Contrôle granulaire des accès par fonctionnalité",
      "Authentification à deux facteurs",
      "Gestion des sessions et des connexions"
    ]
  },
  activity: {
    title: "Journalisation des activités",
    icon: Activity,
    items: [
      "Traçabilité complète des actions utilisateurs",
      "Horodatage et identification des modifications",
      "Export des logs au format PDF/CSV",
      "Alertes sur actions sensibles"
    ]
  },
  compliance: {
    title: "Conformité réglementaire",
    icon: FileCheck,
    items: [
      "Conformité RGPD et normes hôtelières",
      "Gestion des consentements clients",
      "Protection des données personnelles",
      "Audit et rapports de conformité"
    ]
  },
  dashboard: {
    title: "Tableaux de bord",
    icon: BarChart3,
    items: [
      "KPIs de sécurité et conformité",
      "Statistiques d'utilisation",
      "Alertes et notifications",
      "Rapports personnalisables"
    ]
  }
};

export default function GovernancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Module de Gouvernance</h1>
      
      <Tabs defaultValue="access" className="space-y-4">
        <TabsList>
          {Object.entries(features).map(([key, feature]) => (
            <TabsTrigger key={key} value={key}>
              <feature.icon className="w-4 h-4 mr-2" />
              {feature.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className="w-5 h-5 mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 