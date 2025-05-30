"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Plus, Save, Trash2 } from "lucide-react"
import { useBusinessRules } from "@/lib/hooks/use-business-rules"
import type { BusinessRule, BusinessRuleCondition, BusinessRuleAction } from "@/lib/types/governance"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

const conditionTypes = [
  { value: "equals", label: "Égal à" },
  { value: "not_equals", label: "Différent de" },
  { value: "greater_than", label: "Supérieur à" },
  { value: "less_than", label: "Inférieur à" },
  { value: "contains", label: "Contient" },
  { value: "starts_with", label: "Commence par" },
  { value: "ends_with", label: "Termine par" },
  { value: "is_empty", label: "Est vide" },
  { value: "is_not_empty", label: "N'est pas vide" },
]

const actionTypes = [
  { value: "notification", label: "Envoyer une notification" },
  { value: "email", label: "Envoyer un email" },
  { value: "sms", label: "Envoyer un SMS" },
  { value: "status_change", label: "Changer le statut" },
  { value: "tag", label: "Ajouter un tag" },
  { value: "assign", label: "Assigner à un utilisateur" },
  { value: "webhook", label: "Déclencher un webhook" },
  { value: "block", label: "Bloquer l'action" },
]

const entityTypes = [
  { value: "invoice", label: "Facture" },
  { value: "client", label: "Client" },
  { value: "transaction", label: "Transaction" },
  { value: "product", label: "Produit" },
  { value: "stock", label: "Stock" },
  { value: "user", label: "Utilisateur" },
]

const emptyCondition: BusinessRuleCondition = {
  field: "",
  operator: "equals",
  value: "",
  entity_type: "invoice",
}

const emptyAction: BusinessRuleAction = {
  type: "notification",
  target: "",
  message: "",
  data: {},
}

export default function BusinessRulesEditor() {
  const { rules, isLoading, error, createRule, updateRule, deleteRule } = useBusinessRules()
  const [selectedRule, setSelectedRule] = useState<BusinessRule | null>(null)
  const [conditions, setConditions] = useState<BusinessRuleCondition[]>([emptyCondition])
  const [actions, setActions] = useState<BusinessRuleAction[]>([emptyAction])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [priority, setPriority] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (selectedRule) {
      setName(selectedRule.name)
      setDescription(selectedRule.description || "")
      setIsActive(selectedRule.is_active)
      setPriority(selectedRule.priority || 0)
      setConditions(selectedRule.condition_json.conditions || [emptyCondition])
      setActions(selectedRule.action_json.actions || [emptyAction])
      setIsEditing(true)
    } else {
      resetForm()
    }
  }, [selectedRule])

  const resetForm = () => {
    setName("")
    setDescription("")
    setIsActive(true)
    setPriority(0)
    setConditions([emptyCondition])
    setActions([emptyAction])
    setIsEditing(false)
    setSelectedRule(null)
  }

  const handleAddCondition = () => {
    setConditions([...conditions, { ...emptyCondition }])
  }

  const handleRemoveCondition = (index: number) => {
    const newConditions = [...conditions]
    newConditions.splice(index, 1)
    setConditions(newConditions)
  }

  const handleConditionChange = (index: number, field: keyof BusinessRuleCondition, value: string) => {
    const newConditions = [...conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setConditions(newConditions)
  }

  const handleAddAction = () => {
    setActions([...actions, { ...emptyAction }])
  }

  const handleRemoveAction = (index: number) => {
    const newActions = [...actions]
    newActions.splice(index, 1)
    setActions(newActions)
  }

  const handleActionChange = (index: number, field: keyof BusinessRuleAction, value: string | object) => {
    const newActions = [...actions]
    newActions[index] = { ...newActions[index], [field]: value }
    setActions(newActions)
  }

  const handleSubmit = async () => {
    try {
      const ruleData: Partial<BusinessRule> = {
        name,
        description,
        is_active: isActive,
        priority,
        condition_json: { conditions, operator: "AND" },
        action_json: { actions },
      }

      if (isEditing && selectedRule) {
        await updateRule(selectedRule.id, ruleData)
        toast({
          title: "Règle mise à jour",
          description: "La règle métier a été mise à jour avec succès.",
          variant: "default",
        })
      } else {
        await createRule(ruleData)
        toast({
          title: "Règle créée",
          description: "La nouvelle règle métier a été créée avec succès.",
          variant: "default",
        })
      }

      resetForm()
    } catch (error) {
      console.error("Error saving business rule:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la règle.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRule = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette règle ?")) {
      try {
        await deleteRule(id)
        toast({
          title: "Règle supprimée",
          description: "La règle métier a été supprimée avec succès.",
          variant: "default",
        })
        resetForm()
      } catch (error) {
        console.error("Error deleting business rule:", error)
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de la règle.",
          variant: "destructive",
        })
      }
    }
  }

  const filteredRules = rules?.filter((rule) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return rule.is_active
    if (activeTab === "inactive") return !rule.is_active
    return true
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Chargement des règles métier...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors du chargement des règles métier. Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Moteur de Règles Métier</h2>
        <Button onClick={resetForm} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Nouvelle règle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Règles existantes</CardTitle>
              <CardDescription>{rules?.length || 0} règles configurées</CardDescription>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="active">Actives</TabsTrigger>
                  <TabsTrigger value="inactive">Inactives</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredRules?.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">Aucune règle trouvée</div>
                ) : (
                  filteredRules?.map((rule) => (
                    <div
                      key={rule.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedRule?.id === rule.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedRule(rule)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{rule.name}</div>
                        <div className="flex items-center space-x-2">
                          {rule.is_active ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                              Inactive
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Priorité {rule.priority || 0}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {rule.description || "Aucune description"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Modifier la règle" : "Nouvelle règle"}</CardTitle>
              <CardDescription>
                {isEditing
                  ? "Modifiez les paramètres de la règle existante"
                  : "Configurez une nouvelle règle métier automatisée"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom de la règle</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Alerte dépassement budget"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Décrivez le but de cette règle..."
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                      <Label htmlFor="active">Règle active</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select
                        value={priority.toString()}
                        onValueChange={(value) => setPriority(Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5].map((p) => (
                            <SelectItem key={p} value={p.toString()}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Conditions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Définissez les conditions qui déclencheront cette règle
                  </p>

                  {conditions.map((condition, index) => (
                    <div key={index} className="p-4 border rounded-md mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <Label>Type d'entité</Label>
                          <Select
                            value={condition.entity_type}
                            onValueChange={(value) => handleConditionChange(index, "entity_type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              {entityTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Champ</Label>
                          <Input
                            value={condition.field}
                            onChange={(e) => handleConditionChange(index, "field", e.target.value)}
                            placeholder="Ex: montant, statut..."
                          />
                        </div>

                        <div>
                          <Label>Opérateur</Label>
                          <Select
                            value={condition.operator}
                            onValueChange={(value) => handleConditionChange(index, "operator", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              {conditionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label>Valeur</Label>
                        <Input
                          value={condition.value}
                          onChange={(e) => handleConditionChange(index, "value", e.target.value)}
                          placeholder="Valeur à comparer..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCondition(index)}
                          disabled={conditions.length === 1}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" onClick={handleAddCondition} className="mb-6">
                    <Plus className="h-4 w-4 mr-1" /> Ajouter une condition
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Actions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Définissez les actions à exécuter lorsque les conditions sont remplies
                  </p>

                  {actions.map((action, index) => (
                    <div key={index} className="p-4 border rounded-md mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Type d'action</Label>
                          <Select
                            value={action.type}
                            onValueChange={(value) => handleActionChange(index, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              {actionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Cible</Label>
                          <Input
                            value={action.target}
                            onChange={(e) => handleActionChange(index, "target", e.target.value)}
                            placeholder="Ex: email@example.com, user_id..."
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label>Message</Label>
                        <Textarea
                          value={action.message}
                          onChange={(e) => handleActionChange(index, "message", e.target.value)}
                          placeholder="Message à envoyer ou détails de l'action..."
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAction(index)}
                          disabled={actions.length === 1}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" onClick={handleAddAction} className="mb-6">
                    <Plus className="h-4 w-4 mr-1" /> Ajouter une action
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Annuler
              </Button>
              <div className="flex space-x-2">
                {isEditing && selectedRule && (
                  <Button variant="destructive" onClick={() => handleDeleteRule(selectedRule.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                  </Button>
                )}
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-1" /> {isEditing ? "Mettre à jour" : "Créer la règle"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
