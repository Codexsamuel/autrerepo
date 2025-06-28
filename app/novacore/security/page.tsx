"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, List, User, Lock, AlertTriangle } from 'lucide-react';

const accessLogs = [
  { id: 1, user: "Samuel OBAM DAY", action: "Connexion réussie", date: "2024-06-27 10:30" },
  { id: 2, user: "NGA SABINE LUCIE", action: "Échec de connexion", date: "2024-06-27 09:15" },
  { id: 3, user: "Pierre ESSOMBA", action: "Modification MFA", date: "2024-06-27 08:45" },
];

const mfaStatus = [
  { user: "Samuel OBAM DAY", enabled: true },
  { user: "NGA SABINE LUCIE", enabled: false },
  { user: "Pierre ESSOMBA", enabled: true },
];

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sécurité & Accès</h1>
        <Shield className="h-8 w-8 text-gray-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Logs d'accès</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {accessLogs.map((log: any) => (
                <div key={log.id} className="flex justify-between text-sm border-b py-2">
                  <span>{log.user}</span>
                  <span>{log.action}</span>
                  <span className="text-gray-500">{log.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Multi-Factor Auth (MFA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mfaStatus.map((mfa, idx) => (
                <div key={idx} className="flex justify-between items-center border-b py-2">
                  <span>{mfa.user}</span>
                  <span className={mfa.enabled ? 'text-green-600' : 'text-red-600'}>
                    {mfa.enabled ? 'Activé' : 'Non activé'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Audit & Alertes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Aucune alerte critique détectée.</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Audit de sécurité effectué le 26/06/2024.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}