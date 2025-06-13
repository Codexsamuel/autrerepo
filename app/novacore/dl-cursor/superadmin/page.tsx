import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Settings,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Terminal,
  Play,
  Save,
  RefreshCw,
  Bug,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  FileText,
  FolderOpen,
  Search,
  Plus,
  Shield,
  Lock,
  Key,
  Cloud,
  Server,
  Database,
  Code2,
  Layout,
  Image,
  FileJson,
  Package,
  Globe,
  Users,
  Activity,
  BarChart3,
  Settings2,
  Wrench,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface DeploymentConfig {
  platform: "github" | "vercel" | "netlify";
  status: "connected" | "disconnected";
  lastDeploy: Date;
  branch: string;
  environment: string;
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  lastUpdate: Date;
  version: string;
}

interface UpdateLog {
  id: string;
  type: "deployment" | "update" | "maintenance";
  status: "success" | "failed" | "in_progress";
  timestamp: Date;
  details: string;
}

interface AdvancedFeature {
  id: string;
  name: string;
  description: string;
  status: "enabled" | "disabled";
  settings: {
    [key: string]: any;
  };
}

export default function SuperAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [deploymentConfigs, setDeploymentConfigs] = useState<DeploymentConfig[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [advancedFeatures, setAdvancedFeatures] = useState<AdvancedFeature[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simuler le chargement des données
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDeploymentConfigs([
          {
            platform: "github",
            status: "connected",
            lastDeploy: new Date(),
            branch: "main",
            environment: "production",
          },
          {
            platform: "vercel",
            status: "connected",
            lastDeploy: new Date(),
            branch: "staging",
            environment: "preview",
          },
          {
            platform: "netlify",
            status: "disconnected",
            lastDeploy: new Date(),
            branch: "develop",
            environment: "development",
          },
        ]);

        setServices([
          {
            name: "NovaCore",
            status: "operational",
            lastUpdate: new Date(),
            version: "1.0.0",
          },
          {
            name: "DL Style",
            status: "operational",
            lastUpdate: new Date(),
            version: "1.2.0",
          },
          {
            name: "DL Travel",
            status: "degraded",
            lastUpdate: new Date(),
            version: "1.1.0",
          },
        ]);

        setUpdateLogs([
          {
            id: "1",
            type: "deployment",
            status: "success",
            timestamp: new Date(),
            details: "Déploiement réussi sur Vercel",
          },
          {
            id: "2",
            type: "update",
            status: "in_progress",
            timestamp: new Date(),
            details: "Mise à jour de DL Travel en cours",
          },
        ]);

        setAdvancedFeatures([
          {
            id: "1",
            name: "AI Code Assistant Pro",
            description: "Assistant de code IA avancé avec apprentissage personnalisé",
            status: "enabled",
            settings: {
              model: "gpt-4",
              contextSize: "large",
              customPrompts: true
            }
          },
          {
            id: "2",
            name: "Auto Deployment Pipeline",
            description: "Pipeline de déploiement automatique avec tests et validation",
            status: "enabled",
            settings: {
              autoTest: true,
              stagingEnvironment: true,
              rollbackEnabled: true
            }
          },
          {
            id: "3",
            name: "Team Collaboration Suite",
            description: "Outils de collaboration en temps réel pour les équipes",
            status: "enabled",
            settings: {
              realTimeEditing: true,
              codeReview: true,
              pairProgramming: true
            }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <Link href="/novacore/dl-cursor" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à Cursor
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SuperAdmin Panel
            </h1>
            <p className="text-gray-600 text-lg">Gestion complète du projet</p>
          </div>
          <Badge className="bg-red-100 text-red-800 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Mode SuperAdmin
          </Badge>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Services et Statut */}
          <div className="col-span-4">
            <Card className="border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className={`p-4 rounded-lg transition-all duration-300 ${
                        selectedService === service.name
                          ? 'bg-indigo-100'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedService(service.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <Badge
                          className={
                            service.status === "operational"
                              ? "bg-green-100 text-green-800"
                              : service.status === "degraded"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Version: {service.version}</p>
                        <p>Dernière mise à jour: {service.lastUpdate.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration et Déploiement */}
          <div className="col-span-8">
            <div className="space-y-6">
              {/* Configuration des Déploiements */}
              <Card className="border-none bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Configuration des Déploiements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {deploymentConfigs.map((config) => (
                      <div key={config.platform} className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold capitalize">{config.platform}</h3>
                          <Badge
                            className={
                              config.status === "connected"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {config.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Branche: {config.branch}</p>
                          <p>Environnement: {config.environment}</p>
                          <p>Dernier déploiement: {config.lastDeploy.toLocaleString()}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings2 className="h-4 w-4 mr-2" />
                            Configurer
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Mettre à jour
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Outils de Maintenance */}
              <Card className="border-none bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Outils de Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Code2 className="h-6 w-6 mb-2" />
                      <span>Éditeur de Code</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Layout className="h-6 w-6 mb-2" />
                      <span>Structure</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Image className="h-6 w-6 mb-2" />
                      <span>Médias</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <FileJson className="h-6 w-6 mb-2" />
                      <span>Configuration</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Package className="h-6 w-6 mb-2" />
                      <span>Dépendances</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Database className="h-6 w-6 mb-2" />
                      <span>Base de données</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Server className="h-6 w-6 mb-2" />
                      <span>Serveurs</span>
                    </Button>
                    <Button className="flex flex-col items-center p-4 h-auto">
                      <Users className="h-6 w-6 mb-2" />
                      <span>Utilisateurs</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Journal des Mises à Jour */}
              <Card className="border-none bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Journal des Mises à Jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {updateLogs.map((log) => (
                      <div key={log.id} className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {log.type === "deployment" ? (
                              <Cloud className="h-4 w-4 text-blue-600" />
                            ) : log.type === "update" ? (
                              <RefreshCw className="h-4 w-4 text-indigo-600" />
                            ) : (
                              <Wrench className="h-4 w-4 text-gray-600" />
                            )}
                            <span className="font-semibold capitalize">{log.type}</span>
                          </div>
                          <Badge
                            className={
                              log.status === "success"
                                ? "bg-green-100 text-green-800"
                                : log.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{log.details}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {log.timestamp.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fonctionnalités Avancées */}
              <Card className="border-none bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Fonctionnalités Avancées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {advancedFeatures.map((feature) => (
                      <div key={feature.id} className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{feature.name}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                          <Badge
                            className={
                              feature.status === "enabled"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {feature.status}
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Configuration</h4>
                            <div className="space-y-2">
                              {Object.entries(feature.settings).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">{key}</span>
                                  <span className="text-sm font-medium">{value.toString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col justify-end space-y-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <Settings2 className="h-4 w-4 mr-2" />
                              Configurer
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`w-full ${
                                feature.status === "enabled"
                                  ? "text-red-600 hover:text-red-700"
                                  : "text-green-600 hover:text-green-700"
                              }`}
                            >
                              {feature.status === "enabled" ? "Désactiver" : "Activer"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 