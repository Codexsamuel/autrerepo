"use client"

import type React from "react"

import { useState } from "react"
import { useRoles } from "@/lib/hooks/use-roles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function RoleManagement() {
  const { roles, loading, createRole, updateRole, deleteRole } = useRoles()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: {
      clients: { read: false, write: false, delete: false },
      invoices: { read: false, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      reports: { read: false, write: false, delete: false },
      studio: { read: false, write: false, delete: false },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingRole) {
        await updateRole(editingRole.id, formData)
        toast({ title: "Rôle mis à jour avec succès" })
        setEditingRole(null)
      } else {
        await createRole(formData)
        toast({ title: "Rôle créé avec succès" })
        setIsCreateDialogOpen(false)
      }
      setFormData({
        name: "",
        description: "",
        permissions: {
          clients: { read: false, write: false, delete: false },
          invoices: { read: false, write: false, delete: false },
          users: { read: false, write: false, delete: false },
          reports: { read: false, write: false, delete: false },
          studio: { read: false, write: false, delete: false },
        },
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le rôle",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (role: any) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rôle ?")) {
      try {
        await deleteRole(id)
        toast({ title: "Rôle supprimé avec succès" })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le rôle",
          variant: "destructive",
        })
      }
    }
  }

  const updatePermission = (module: string, action: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [action]: value,
        },
      },
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Rôles</h2>
          <p className="text-muted-foreground">Gérez les rôles et permissions des utilisateurs</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Rôle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau rôle</DialogTitle>
              <DialogDescription>Définissez les permissions pour ce nouveau rôle</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du rôle</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Permissions</h4>
                {Object.entries(formData.permissions).map(([module, perms]) => (
                  <Card key={module}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm capitalize">{module}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(perms).map(([action, value]) => (
                        <div key={action} className="flex items-center justify-between">
                          <Label className="capitalize">{action}</Label>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => updatePermission(module, action, checked)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <DialogFooter>
                <Button type="submit">Créer le rôle</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {role.name}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(role.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h5 className="font-medium">Permissions :</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(role.permissions).map(([module, perms]: [string, any]) => (
                    <Badge key={module} variant="secondary" className="text-xs">
                      {module}:{" "}
                      {Object.entries(perms)
                        .filter(([_, allowed]) => allowed)
                        .map(([action]) => action)
                        .join(", ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog d'édition */}
      <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le rôle</DialogTitle>
            <DialogDescription>Modifiez les permissions pour ce rôle</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nom du rôle</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Permissions</h4>
              {Object.entries(formData.permissions).map(([module, perms]) => (
                <Card key={module}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm capitalize">{module}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(perms).map(([action, value]) => (
                      <div key={action} className="flex items-center justify-between">
                        <Label className="capitalize">{action}</Label>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => updatePermission(module, action, checked)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
