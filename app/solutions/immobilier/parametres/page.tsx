"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Bell,
  Lock,
  Mail,
  Globe,
  Palette,
  FileText,
  Shield,
  Key,
  Trash2,
  Image as ImageIcon
} from "lucide-react"

export default function ParametresPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    visits: true,
    clients: true,
    properties: true,
    sales: true
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gérez les paramètres de votre application
        </p>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Building2 className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Apparence
          </TabsTrigger>
        </TabsList>

        {/* Paramètres généraux */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'agence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'agence</Label>
                    <Input placeholder="Nom de l'agence" />
                  </div>
                  <div className="space-y-2">
                    <Label>SIRET</Label>
                    <Input placeholder="Numéro SIRET" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input placeholder="Adresse de l'agence" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input placeholder="Ville" />
                  </div>
                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input placeholder="Code postal" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input placeholder="Numéro de téléphone" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email de l'agence" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input placeholder="URL du site web" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lundi - Vendredi</Label>
                    <div className="flex items-center gap-2">
                      <Input type="time" />
                      <span>-</span>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Samedi</Label>
                    <div className="flex items-center gap-2">
                      <Input type="time" />
                      <span>-</span>
                      <Input type="time" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dimanche</Label>
                  <div className="flex items-center gap-2">
                    <Input type="time" />
                    <span>-</span>
                    <Input type="time" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Paramètres de notification */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Canaux de notification</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recevoir les notifications par email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications SMS</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recevoir les notifications par SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications push</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recevoir les notifications push
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Types de notification</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Visites</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Notifications pour les visites
                      </p>
                    </div>
                    <Switch
                      checked={notifications.visits}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, visits: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Clients</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Notifications pour les clients
                      </p>
                    </div>
                    <Switch
                      checked={notifications.clients}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, clients: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Biens</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Notifications pour les biens
                      </p>
                    </div>
                    <Switch
                      checked={notifications.properties}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, properties: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Ventes</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Notifications pour les ventes
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sales}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sales: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de sécurité */}
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Mot de passe actuel</Label>
                  <Input type="password" placeholder="Mot de passe actuel" />
                </div>
                <div className="space-y-2">
                  <Label>Nouveau mot de passe</Label>
                  <Input type="password" placeholder="Nouveau mot de passe" />
                </div>
                <div className="space-y-2">
                  <Label>Confirmer le mot de passe</Label>
                  <Input type="password" placeholder="Confirmer le mot de passe" />
                </div>
                <Button>Changer le mot de passe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activer l'authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ajouter une couche de sécurité supplémentaire à votre compte
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Numéro de téléphone</Label>
                  <Input type="tel" placeholder="Numéro de téléphone" />
                </div>
                <Button>Configurer l'authentification</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appareils connectés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">Chrome sur MacBook Pro</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dernière connexion : Il y a 2 heures
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Déconnecter
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">Safari sur iPhone</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dernière connexion : Il y a 1 jour
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Déconnecter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Paramètres d'apparence */}
        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thème</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Mode</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Couleur principale</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Bleu</SelectItem>
                      <SelectItem value="green">Vert</SelectItem>
                      <SelectItem value="purple">Violet</SelectItem>
                      <SelectItem value="red">Rouge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personnalisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo de l'agence</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg border flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <Button variant="outline">Changer le logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <Button variant="outline">Changer le favicon</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions dangereuses */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600">Zone dangereuse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Supprimer le compte</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Soyez certain.
            </p>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer le compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 