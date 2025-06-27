"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Workflow, Play, Plus, List, Zap, FileText } from 'lucide-react';

const workflows = [
  { id: 1, name: "Sync CRM vers Supabase", status: "actif", runs: 12, lastRun: "2024-06-27 10:00" },
  { id: 2, name: "Import produits DL Style", status: "actif", runs: 8, lastRun: "2024-06-26 18:30" },
  { id: 3, name: "Alertes sécurité", status: "inactif", runs: 3, lastRun: "2024-06-25 14:10" },
];

const logs = [
  { id: 1, workflow: "Sync CRM vers Supabase", action: "Exécution réussie", date: "2024-06-27 10:00" },
  { id: 2, workflow: "Import produits DL Style", action: "Erreur d'import", date: "2024-06-26 18:30" },
  { id: 3, workflow: "Alertes sécurité", action: "Exécution réussie", date: "2024-06-25 14:10" },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workflows n8n</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau workflow
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Liste des workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflows.map((wf) => (
                <div key={wf.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{wf.name}</h3>
                    <p className="text-xs text-gray-500">Dernière exécution: {wf.lastRun}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${wf.status === 'actif' ? 'text-green-600' : 'text-gray-400'}`}>{wf.status}</span>
                    <span className="text-xs text-gray-400">{wf.runs} runs</span>
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs d'exécution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex justify-between text-sm border-b py-2">
                  <span>{log.workflow}</span>
                  <span>{log.action}</span>
                  <span className="text-gray-500">{log.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 