"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CheckSquare,
  Plus,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  Users,
  Building2,
  Clock,
  FileText,
  Edit,
  Trash2,
  Eye,
  ListTodo
} from "lucide-react"

type TaskPriority = "Basse" | "Normale" | "Haute" | "Urgente"
type TaskStatus = "À faire" | "En cours" | "Terminée" | "Annulée"

interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
  assignedTo: string
  property: string
  client: string
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Préparer le dossier de vente",
    description: "Rassembler tous les documents nécessaires pour la vente",
    priority: "Haute",
    status: "En cours",
    dueDate: "2024-02-25",
    assignedTo: "Jean Martin",
    property: "Appartement T3 - Centre ville",
    client: "Marie Dupont"
  },
  {
    id: 2,
    title: "Organiser la visite",
    description: "Préparer l'appartement pour la visite",
    priority: "Normale",
    status: "À faire",
    dueDate: "2024-02-22",
    assignedTo: "Sophie Bernard",
    property: "Maison de ville - Quartier calme",
    client: "Jean Martin"
  },
  {
    id: 3,
    title: "Suivi des paiements",
    description: "Vérifier les paiements de loyer",
    priority: "Urgente",
    status: "À faire",
    dueDate: "2024-02-20",
    assignedTo: "Pierre Durand",
    property: "Studio moderne - Proche gare",
    client: "Sophie Bernard"
  }
]

const priorityColors: Record<TaskPriority, string> = {
  "Basse": "bg-gray-100 text-gray-800",
  "Normale": "bg-blue-100 text-blue-800",
  "Haute": "bg-yellow-100 text-yellow-800",
  "Urgente": "bg-red-100 text-red-800"
}

const statusColors: Record<TaskStatus, string> = {
  "À faire": "bg-gray-100 text-gray-800",
  "En cours": "bg-blue-100 text-blue-800",
  "Terminée": "bg-green-100 text-green-800",
  "Annulée": "bg-red-100 text-red-800"
}

export default function TachesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tâches</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez vos tâches immobilières
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <ListTodo className="w-4 h-4 mr-2" />
              Nouvelle tâche
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
              <DialogDescription>
                Créez une nouvelle tâche à effectuer
              </DialogDescription>
            </DialogHeader>
            {/* Formulaire d'ajout de tâche */}
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher une tâche..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Calendrier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des tâches */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des tâches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tâche</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'échéance</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {task.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {task.property}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {task.client}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Marquer comme terminée
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 