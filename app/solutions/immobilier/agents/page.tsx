"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Building2,
  Euro,
  Calendar,
  MessageSquare,
  FileText,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  StarOff
} from "lucide-react"

type AgentStatus = "Actif" | "Inactif" | "En congé"
type AgentRole = "Agent" | "Senior" | "Manager"

interface Agent {
  id: number
  name: string
  email: string
  phone: string
  role: AgentRole
  status: AgentStatus
  avatar: string
  properties: number
  clients: number
  visits: number
  sales: number
  revenue: number
  rating: number
  isFavorite?: boolean
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "+33 6 12 34 56 78",
    role: "Senior",
    status: "Actif",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    properties: 15,
    clients: 25,
    visits: 45,
    sales: 8,
    revenue: 2800000,
    rating: 4.8,
    isFavorite: true
  },
  {
    id: 2,
    name: "Thomas Petit",
    email: "thomas.petit@example.com",
    phone: "+33 6 23 45 67 89",
    role: "Agent",
    status: "Actif",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    properties: 8,
    clients: 15,
    visits: 30,
    sales: 4,
    revenue: 1200000,
    rating: 4.5
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    phone: "+33 6 34 56 78 90",
    role: "Manager",
    status: "En congé",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    properties: 20,
    clients: 35,
    visits: 60,
    sales: 12,
    revenue: 4200000,
    rating: 4.9
  }
]

const roleColors: Record<AgentRole, string> = {
  "Agent": "bg-blue-100 text-blue-800",
  "Senior": "bg-purple-100 text-purple-800",
  "Manager": "bg-green-100 text-green-800"
}

const statusColors: Record<AgentStatus, string> = {
  "Actif": "bg-green-100 text-green-800",
  "Inactif": "bg-red-100 text-red-800",
  "En congé": "bg-yellow-100 text-yellow-800"
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<AgentRole | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<AgentStatus | "all">("all")

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.phone.includes(searchQuery)
    const matchesRole = selectedRole === "all" || agent.role === selectedRole
    const matchesStatus = selectedStatus === "all" || agent.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre équipe d'agents immobiliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel agent</DialogTitle>
              <DialogDescription>
                Remplissez les informations de l'agent
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input placeholder="Prénom" />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input placeholder="Nom" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input type="tel" placeholder="+33 6 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <Label>Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un agent..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as AgentRole | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as AgentStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="En congé">En congé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des agents */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Chiffre d'affaires</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>
                          {agent.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {agent.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[agent.role]}>
                      {agent.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[agent.status]}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{agent.properties}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{agent.clients}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{agent.visits}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        <span>{agent.sales} ventes</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      <span>{agent.revenue.toLocaleString("fr-FR")} €</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{agent.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell>
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
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contacter
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Ajouter des notes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {agent.isFavorite ? (
                            <>
                              <StarOff className="w-4 h-4 mr-2" />
                              Retirer des favoris
                            </>
                          ) : (
                            <>
                              <Star className="w-4 h-4 mr-2" />
                              Ajouter aux favoris
                            </>
                          )}
                        </DropdownMenuItem>
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