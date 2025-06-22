"use client"

import { useState } from "react"
// Removed motion import
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
  Calendar,
  FileText,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Building2,
  Euro
} from "lucide-react"

type ClientType = "Acheteur" | "Vendeur" | "Locataire" | "Bailleur"
type ClientStatus = "Actif" | "Inactif" | "En attente"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  type: ClientType
  status: ClientStatus
  budget?: number
  properties: number
  visits: number
  lastContact: string
  avatar?: string
}

const clients: Client[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    type: "Acheteur",
    status: "Actif",
    budget: 350000,
    properties: 3,
    visits: 5,
    lastContact: "2024-02-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean"
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "+33 6 23 45 67 89",
    type: "Vendeur",
    status: "Actif",
    properties: 1,
    visits: 2,
    lastContact: "2024-02-19",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    phone: "+33 6 34 56 78 90",
    type: "Locataire",
    status: "En attente",
    budget: 1200,
    properties: 2,
    visits: 3,
    lastContact: "2024-02-18",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre"
  },
  {
    id: 4,
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    phone: "+33 6 45 67 89 01",
    type: "Bailleur",
    status: "Inactif",
    properties: 1,
    visits: 0,
    lastContact: "2024-02-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
  }
]

const typeColors: Record<ClientType, string> = {
  "Acheteur": "bg-blue-100 text-blue-800",
  "Vendeur": "bg-green-100 text-green-800",
  "Locataire": "bg-yellow-100 text-yellow-800",
  "Bailleur": "bg-purple-100 text-purple-800"
}

const statusColors: Record<ClientStatus, string> = {
  "Actif": "bg-green-100 text-green-800",
  "Inactif": "bg-red-100 text-red-800",
  "En attente": "bg-yellow-100 text-yellow-800"
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<ClientType | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus | "all">("all")

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery)
    const matchesType = selectedType === "all" || client.type === selectedType
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre base de clients
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau client</DialogTitle>
              <DialogDescription>
                Remplissez les informations du client
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
                <Label>Type de client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acheteur">Acheteur</SelectItem>
                    <SelectItem value="vendeur">Vendeur</SelectItem>
                    <SelectItem value="locataire">Locataire</SelectItem>
                    <SelectItem value="bailleur">Bailleur</SelectItem>
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
                  placeholder="Rechercher un client..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as ClientType | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Acheteur">Acheteur</SelectItem>
                  <SelectItem value="Vendeur">Vendeur</SelectItem>
                  <SelectItem value="Locataire">Locataire</SelectItem>
                  <SelectItem value="Bailleur">Bailleur</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as ClientStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des clients */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Biens</TableHead>
                <TableHead>Visites</TableHead>
                <TableHead>Dernier contact</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[client.type]}>
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[client.status]}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {client.budget && (
                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4" />
                        <span>{client.budget.toLocaleString("fr-FR")} €</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{client.properties}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{client.visits}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {client.lastContact}
                    </p>
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
                          <Calendar className="w-4 h-4 mr-2" />
                          Planifier un rendez-vous
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