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
import { Calendar } from "@/components/ui/calendar"
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Building2,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  MessageSquare,
  FileText
} from "lucide-react"

type VisitStatus = "Planifiée" | "Confirmée" | "Annulée" | "Terminée"
type VisitType = "Première visite" | "Visite de suivi" | "Visite technique"

interface Visit {
  id: number
  property: {
    id: number
    title: string
    address: string
    image: string
  }
  client: {
    id: number
    name: string
    email: string
    avatar: string
  }
  agent: {
    id: number
    name: string
    avatar: string
  }
  date: string
  time: string
  type: VisitType
  status: VisitStatus
  notes?: string
}

const visits: Visit[] = [
  {
    id: 1,
    property: {
      id: 1,
      title: "Appartement T3 centre-ville",
      address: "15 rue de la Paix, Paris",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    client: {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean"
    },
    agent: {
      id: 1,
      name: "Marie Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    date: "2024-02-25",
    time: "14:30",
    type: "Première visite",
    status: "Planifiée",
    notes: "Client intéressé par les T3"
  },
  {
    id: 2,
    property: {
      id: 2,
      title: "Maison familiale avec jardin",
      address: "8 avenue des Lilas, Lyon",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    },
    client: {
      id: 2,
      name: "Sophie Bernard",
      email: "sophie.bernard@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    },
    agent: {
      id: 1,
      name: "Marie Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    date: "2024-02-26",
    time: "10:00",
    type: "Visite de suivi",
    status: "Confirmée"
  },
  {
    id: 3,
    property: {
      id: 3,
      title: "Local commercial centre-ville",
      address: "25 rue du Commerce, Marseille",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    },
    client: {
      id: 3,
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre"
    },
    agent: {
      id: 2,
      name: "Thomas Petit",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
    },
    date: "2024-02-24",
    time: "16:00",
    type: "Visite technique",
    status: "Terminée",
    notes: "Client satisfait, demande un devis"
  }
]

const statusColors: Record<VisitStatus, string> = {
  "Planifiée": "bg-blue-100 text-blue-800",
  "Confirmée": "bg-green-100 text-green-800",
  "Annulée": "bg-red-100 text-red-800",
  "Terminée": "bg-gray-100 text-gray-800"
}

const typeColors: Record<VisitType, string> = {
  "Première visite": "bg-purple-100 text-purple-800",
  "Visite de suivi": "bg-yellow-100 text-yellow-800",
  "Visite technique": "bg-orange-100 text-orange-800"
}

export default function VisitesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<VisitStatus | "all">("all")
  const [selectedType, setSelectedType] = useState<VisitType | "all">("all")

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.property.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || visit.status === selectedStatus
    const matchesType = selectedType === "all" || visit.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visites</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez les visites de vos biens immobiliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CalendarIcon className="w-4 h-4 mr-2" />
              Planifier une visite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Planifier une nouvelle visite</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour planifier une visite
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Bien immobilier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un bien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Appartement T3 centre-ville</SelectItem>
                    <SelectItem value="2">Maison familiale avec jardin</SelectItem>
                    <SelectItem value="3">Local commercial centre-ville</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jean Dupont</SelectItem>
                    <SelectItem value="2">Sophie Bernard</SelectItem>
                    <SelectItem value="3">Pierre Durand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Heure</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Type de visite</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premiere">Première visite</SelectItem>
                    <SelectItem value="suivi">Visite de suivi</SelectItem>
                    <SelectItem value="technique">Visite technique</SelectItem>
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
                  placeholder="Rechercher une visite..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as VisitStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Planifiée">Planifiée</SelectItem>
                  <SelectItem value="Confirmée">Confirmée</SelectItem>
                  <SelectItem value="Annulée">Annulée</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as VisitType | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de visite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Première visite">Première visite</SelectItem>
                  <SelectItem value="Visite de suivi">Visite de suivi</SelectItem>
                  <SelectItem value="Visite technique">Visite technique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des visites */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bien</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date et heure</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={visit.property.image}
                          alt={visit.property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{visit.property.title}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {visit.property.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={visit.client.avatar} />
                        <AvatarFallback>
                          {visit.client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{visit.client.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {visit.client.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={visit.agent.avatar} />
                        <AvatarFallback>
                          {visit.agent.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{visit.agent.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{visit.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{visit.time}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[visit.type]}>
                      {visit.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[visit.status]}>
                      {visit.status}
                    </Badge>
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
                        {visit.status === "Planifiée" && (
                          <>
                            <DropdownMenuItem>
                              <Check className="w-4 h-4 mr-2" />
                              Confirmer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <X className="w-4 h-4 mr-2" />
                              Annuler
                            </DropdownMenuItem>
                          </>
                        )}
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