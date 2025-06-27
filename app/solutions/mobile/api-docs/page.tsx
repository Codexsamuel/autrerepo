'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Smartphone, Globe, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function APIDocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copié !', description: 'Code copié dans le presse-papiers' });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documentation API REST</h1>
        <p className="text-gray-600 mt-2">Documentation complète pour l'intégration mobile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="authentication" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="authentication">Authentification</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Exemples</TabsTrigger>
              <TabsTrigger value="errors">Erreurs</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Authentification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">L'API utilise l'authentification Bearer Token via Clerk.</p>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Headers requis :</h4>
                    <code className="text-sm">
                      Authorization: Bearer YOUR_CLERK_TOKEN
                    </code>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Exemple de requête :</h4>
                    <pre className="text-sm overflow-x-auto">
{`curl -X GET "https://api.dlsolutions.com/mobile/users" \\
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Endpoints Principaux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Utilisateurs</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">GET /api/mobile/users</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">200</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">GET /api/mobile/users/{'{id}'}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">200</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">PUT /api/mobile/users/{'{id}'}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">200</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Données</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">GET /api/mobile/data/dashboard</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">200</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">GET /api/mobile/data/notifications</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">200</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Actions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">POST /api/mobile/actions/sync</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">201</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-mono text-sm">POST /api/mobile/actions/upload</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">201</span>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exemples d'utilisation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-3">Récupérer les données du dashboard</h3>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">JavaScript (Fetch)</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(`fetch('https://api.dlsolutions.com/mobile/data/dashboard', {
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
{`fetch('https://api.dlsolutions.com/mobile/data/dashboard', {
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Synchroniser les données</h3>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">JavaScript (Fetch)</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(`fetch('https://api.dlsolutions.com/mobile/actions/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    lastSync: '2024-01-15T10:30:00Z'
  })
})
.then(response => response.json())
.then(data => console.log(data));`)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
{`fetch('https://api.dlsolutions.com/mobile/actions/sync', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    lastSync: '2024-01-15T10:30:00Z'
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
                      </pre>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Codes d'erreur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <span className="font-semibold">401</span>
                        <span className="ml-2">Non autorisé</span>
                      </div>
                      <span className="text-sm text-gray-600">Token invalide ou expiré</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <span className="font-semibold">403</span>
                        <span className="ml-2">Accès interdit</span>
                      </div>
                      <span className="text-sm text-gray-600">Permissions insuffisantes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <span className="font-semibold">404</span>
                        <span className="ml-2">Non trouvé</span>
                      </div>
                      <span className="text-sm text-gray-600">Ressource introuvable</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <span className="font-semibold">500</span>
                        <span className="ml-2">Erreur serveur</span>
                      </div>
                      <span className="text-sm text-gray-600">Erreur interne du serveur</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Informations Mobile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Base URL</h4>
                  <code className="text-sm bg-gray-100 p-2 rounded block">
                    https://api.dlsolutions.com/mobile
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Version API</h4>
                  <span className="text-sm">v1.0.0</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Format</h4>
                  <span className="text-sm">JSON</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rate Limit</h4>
                  <span className="text-sm">1000 req/hour</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                SDKs Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  React Native SDK
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Flutter SDK
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  iOS SDK
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Android SDK
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 