"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Key,
  Mail,
  Phone,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

export default function NovaCorSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    profile: {
      firstName: "Admin",
      lastName: "DL Solutions",
      email: "admin@daveandlucesolutions.com",
      phone: "+33 1 23 45 67 89",
      company: "DL Solutions",
      role: "Super Admin",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyReports: true,
      securityAlerts: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: "24",
      passwordExpiry: "90",
      loginAttempts: "5",
    },
    system: {
      language: "fr",
      timezone: "Europe/Paris",
      dateFormat: "DD/MM/YYYY",
      currency: "EUR",
      theme: "light",
    },
  })

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "Système", icon: Settings },
    { id: "api", label: "API", icon: Key },
  ]

  const handleSave = () => {
    // Simulation de sauvegarde
    console.log("Paramètres sauvegardés:", settings)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/novacore">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Paramètres NovaCore
                </h1>
                <p className="text-sm text-gray-600">Configuration et préférences système</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-indigo-200 text-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Exporter Config
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Configuration</h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Informations du Profil</h3>
                    <Badge className="bg-green-100 text-green-700">Vérifié</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <Input
                        value={settings.profile.firstName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, firstName: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <Input
                        value={settings.profile.lastName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, lastName: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-10"
                          value={settings.profile.email}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              profile: { ...settings.profile, email: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          className="pl-10"
                          value={settings.profile.phone}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              profile: { ...settings.profile, phone: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                      <Input
                        value={settings.profile.company}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, company: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                      <Input value={settings.profile.role} disabled />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4">Photo de Profil</h4>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Changer
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Paramètres de Sécurité</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Authentification à deux facteurs</h4>
                        <p className="text-sm text-gray-600">Sécurisez votre compte avec 2FA</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactorAuth: checked },
                          })
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration de session (heures)
                        </label>
                        <Input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              security: { ...settings.security, sessionTimeout: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration mot de passe (jours)
                        </label>
                        <Input
                          type="number"
                          value={settings.security.passwordExpiry}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              security: { ...settings.security, passwordExpiry: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-4">Changer le mot de passe</h4>
                      <div className="space-y-4 max-w-md">
                        <Input type="password" placeholder="Mot de passe actuel" />
                        <Input type="password" placeholder="Nouveau mot de passe" />
                        <Input type="password" placeholder="Confirmer le nouveau mot de passe" />
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                          Mettre à jour le mot de passe
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Préférences de Notifications</h3>

                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === "emailNotifications" && "Notifications par email"}
                            {key === "pushNotifications" && "Notifications push"}
                            {key === "smsNotifications" && "Notifications SMS"}
                            {key === "weeklyReports" && "Rapports hebdomadaires"}
                            {key === "securityAlerts" && "Alertes de sécurité"}
                            {key === "marketingEmails" && "Emails marketing"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === "emailNotifications" && "Recevoir les notifications par email"}
                            {key === "pushNotifications" && "Notifications en temps réel"}
                            {key === "smsNotifications" && "Alertes importantes par SMS"}
                            {key === "weeklyReports" && "Résumé hebdomadaire des activités"}
                            {key === "securityAlerts" && "Alertes de sécurité critiques"}
                            {key === "marketingEmails" && "Offres et nouveautés"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, [key]: checked },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Paramètres Système</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.system.language}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, language: e.target.value },
                          })
                        }
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.system.timezone}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, timezone: e.target.value },
                          })
                        }
                      >
                        <option value="Europe/Paris">Europe/Paris</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="America/New_York">America/New_York</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format de date</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.system.dateFormat}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, dateFormat: e.target.value },
                          })
                        }
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={settings.system.currency}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, currency: e.target.value },
                          })
                        }
                      >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4">Thème</h4>
                    <div className="flex space-x-4">
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, theme: "light" },
                          })
                        }
                        className={`p-4 border-2 rounded-lg ${
                          settings.system.theme === "light" ? "border-indigo-500" : "border-gray-200"
                        }`}
                      >
                        <div className="w-16 h-12 bg-white border border-gray-300 rounded mb-2"></div>
                        <span className="text-sm">Clair</span>
                      </button>
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            system: { ...settings.system, theme: "dark" },
                          })
                        }
                        className={`p-4 border-2 rounded-lg ${
                          settings.system.theme === "dark" ? "border-indigo-500" : "border-gray-200"
                        }`}
                      >
                        <div className="w-16 h-12 bg-gray-800 rounded mb-2"></div>
                        <span className="text-sm">Sombre</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* API Settings */}
            {activeTab === "api" && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Configuration API</h3>

                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-2">Clé API NovaCore</h4>
                      <p className="text-sm text-blue-600 mb-4">Utilisez cette clé pour accéder aux API DL Solutions</p>
                      <div className="flex items-center space-x-2">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value="nvc_1234567890abcdef1234567890abcdef"
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-gray-800 mb-2">Endpoints Disponibles</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>NovaWorld API</span>
                              <Badge className="bg-green-100 text-green-700">Actif</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>DL Style API</span>
                              <Badge className="bg-green-100 text-green-700">Actif</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>DL Travel API</span>
                              <Badge className="bg-green-100 text-green-700">Actif</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>DL Bookmaker API</span>
                              <Badge className="bg-orange-100 text-orange-700">Bêta</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-gray-800 mb-2">Limites d'utilisation</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Requêtes/heure</span>
                              <span className="font-medium">10,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Requêtes/jour</span>
                              <span className="font-medium">100,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Utilisées aujourd'hui</span>
                              <span className="font-medium text-blue-600">2,847</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-4">Documentation API</h4>
                      <div className="flex space-x-4">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger la doc
                        </Button>
                        <Button variant="outline">
                          <Globe className="h-4 w-4 mr-2" />
                          Voir en ligne
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
