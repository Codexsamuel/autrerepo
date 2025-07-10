'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Bell, Globe, Lock, Mail, Shield, Smartphone, Sparkles, User } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Paramètres</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                Sécurité & notifications
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Notifications par email</span>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span>Notifications SMS</span>
                  </div>
                  <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span>Notifications push</span>
                  </div>
                  <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-600" />
                    <span>Newsletter</span>
                  </div>
                  <Switch checked={newsletter} onCheckedChange={setNewsletter} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span>Authentification à deux facteurs (2FA)</span>
                  </div>
                  <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Alertes de connexion inhabituelle</span>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>Notifications de sécurité</span>
                  </div>
                  <Switch checked={true} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span>Mode sombre</span>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Onboarding interactif</span>
                  <Switch checked={true} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span>Notifications de nouveaux modules</span>
                  <Switch checked={true} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 