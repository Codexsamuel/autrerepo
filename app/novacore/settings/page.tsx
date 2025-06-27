"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Settings, Bell, User, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paramètres système</h1>
        <Settings className="h-8 w-8 text-slate-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration générale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nom de la plateforme</label>
              <Input defaultValue="Univers Digital DL Solutions" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email de contact</label>
              <Input defaultValue="contact@dlsolutions.com" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Alertes système</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications email</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications push</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Préférences utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Mode sombre</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Langue</span>
              <Input defaultValue="Français" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Double authentification (MFA)</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Alertes de connexion</span>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}