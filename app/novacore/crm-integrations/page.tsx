"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Plus, Trash2, Eye } from 'lucide-react';

const integrations = [
  { id: 1, name: "Salesforce", status: "connecté", details: "Synchronisation quotidienne", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif" },
  { id: 2, name: "HubSpot", status: "connecté", details: "Mise à jour en temps réel", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg" },
  { id: 3, name: "Zoho CRM", status: "déconnecté", details: "Erreur d'authentification", logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg" },
];

export default function CRMIntegrationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Intégrations CRM</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle intégration
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <img src={integration.logo} alt={integration.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <p className="text-xs text-gray-500">{integration.details}</p>
                </div>
              </div>
              <span className={`text-xs font-medium ${integration.status === 'connecté' ? 'text-green-600' : 'text-red-600'}`}>{integration.status}</span>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 