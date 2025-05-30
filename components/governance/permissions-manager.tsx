"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRoles } from "@/lib/hooks/use-roles"
import { usePermissions } from "@/lib/hooks/use-permissions"
import type { Role } from "@/lib/types/governance"
import { AlertCircle, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const modules = [
  { id: "clients", name: "Clients & Groupes" },
  { id: "invoices", name: "Factures" },
  { id: "contracts", name: "Contrats" },
  { id: "products", name: "Produits" },
  { id: "inventory", name: "Inventaire" },
  { id: "reports", name: "Rapports" },
  { id: "analytics", name: "Analytics" },
  { id: "users", name: "Utilisateurs" },
  { id: "roles", name: "Rôles" },
  { id: "departments", name: "Départements" },
  { id: "settings", name: "Paramètres" },
  { id: "surveillance", name: "Surveillance IA" },
]

const permissions = [
  { id: "read", name: "Lecture", description: "Voir les données" },
  { id: "create", name: "Création", description: "Créer de nouvelles données" },
  { id: "update", name: "Modification", description: "Modifier les données existantes" },
  { id: "delete", name: "Suppression", description: "Supprimer des données" },
  { id: "export", name: "Export", description: "Exporter des données" },
  { id: "import", name: "Import", description: "Importer des données" },
]

export default function PermissionsManager() {
  const { roles, isLoading: rolesLoading, error: rolesError } = useRoles()
  const { updatePermissions } = usePermissions()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [permissionsState, setPermissionsState] = useState<Record<string, Record<string, boolean>>>({})
  const [activeTab, setActiveTab] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (roles && roles.length > 0 && !selectedRole) {
      setSelectedRole(roles[0])
      setActiveTab(modules[0].id)
    }
  }, [roles, selectedRole])

  useEffect(() => {
    if (selectedRole) {
      // Initialize permissions state from role
      const initialState: Record<string, Record<string, boolean>> = {}

      modules.forEach((module) => {
        initialState[module.id] = {}
        permissions.forEach((permission) => {
          initialState[module.id][permission.id] = selectedRole.permissions?.[module.id]?.[permission.id] || false
        })
      })

      setPermissionsState(initialState)
    }
  }, [selectedRole])

  const handlePermissionChange = (module: string, permission: string, checked: boolean) => {
    setPermissionsState((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: checked,
      },
    }))
  }

  const handleSavePermissions = async () => {
    if (!selectedRole) return

    setIsSaving(true)
    try {
      await updatePermissions(selectedRole.id, permissionsState)
      toast({
        title: "Permissions mises à jour",
        description: `Les permissions pour le rôle ${selectedRole.name} ont été mises à jour avec succès.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error updating permissions:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des permissions.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (rolesLoading) {
    return <div className="flex justify-center items-center h-64">Chargement des rôles...</div>
  }

  if (rolesError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors du chargement des rôles. Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestion des Permissions</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Rôles</CardTitle>
              <CardDescription>Sélectionnez un rôle pour gérer ses permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles?.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedRole?.id === role.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{role.description || "Aucune description"}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedRole ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Permissions pour {selectedRole.name}</CardTitle>
                    <CardDescription>Configurez les permissions granulaires par module et ressource</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {Object.values(permissionsState).reduce(
                      (count, modulePerms) => count + Object.values(modulePerms).filter(Boolean).length,
                      0,
                    )}{" "}
                    permissions actives
                  </Badge>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1">
                    {modules.map((module) => (
                      <TabsTrigger key={module.id} value={module.id} className="text-xs">
                        {module.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {modules.map((module) => (
                  <TabsContent key={module.id} value={module.id} className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Permissions pour {module.name}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2 p-3 border rounded-md">
                              <Checkbox
                                id={`${module.id}-${permission.id}`}
                                checked={permissionsState[module.id]?.[permission.id] || false}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(module.id, permission.id, checked === true)
                                }
                              />
                              <div className="grid gap-1.5">
                                <Label htmlFor={`${module.id}-${permission.id}`} className="font-medium">
                                  {permission.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSavePermissions} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-1" />
                  {isSaving ? "Enregistrement..." : "Enregistrer les permissions"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Sélectionnez un rôle pour gérer ses permissions</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
