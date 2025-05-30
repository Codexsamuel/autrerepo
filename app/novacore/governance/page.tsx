import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RoleManagement from "@/components/governance/role-management"
import DepartmentTree from "@/components/governance/department-tree"
import ActivityLogs from "@/components/governance/activity-logs"
import BusinessRulesEditor from "@/components/governance/business-rules-editor"
import PermissionsManager from "@/components/governance/permissions-manager"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gouvernance | NovaCore CRM",
  description: "Module de gouvernance pour la gestion des rôles, permissions et règles métier",
}

export default function GovernancePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Gouvernance</h1>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="departments">Départements</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="rules">Règles Métier</TabsTrigger>
          <TabsTrigger value="logs">Journaux d'Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Rôles</CardTitle>
              <CardDescription>Créez et gérez les rôles utilisateurs dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <RoleManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Structure Organisationnelle</CardTitle>
              <CardDescription>Visualisez et gérez la hiérarchie des départements</CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentTree />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <PermissionsManager />
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <BusinessRulesEditor />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Journaux d'Activité</CardTitle>
              <CardDescription>Consultez l'historique des actions utilisateurs dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLogs />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
