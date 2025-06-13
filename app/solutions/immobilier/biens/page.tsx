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
  Building2,
  MapPin,
  Euro,
  Ruler,
  Bed,
  Bath,
  Car,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Star,
  StarOff
} from "lucide-react"

type PropertyType = "Appartement" | "Maison" | "Local commercial" | "Terrain"
type PropertyStatus = "Disponible" | "Réservé" | "Vendu" | "Loué"
type PropertyTransaction = "Vente" | "Location"

interface Property {
  id: number
  title: string
  type: PropertyType
  status: PropertyStatus
  transaction: PropertyTransaction
  price: number
  surface: number
  rooms: number
  bedrooms: number
  bathrooms: number
  parking: number
  address: string
  city: string
  postalCode: string
  description: string
  features: string[]
  images: string[]
  agent: {
    id: number
    name: string
    avatar: string
  }
  visits: number
  favorites: number
  createdAt: string
  isFavorite?: boolean
}

const properties: Property[] = [
  {
    id: 1,
    title: "Appartement T3 centre-ville",
    type: "Appartement",
    status: "Disponible",
    transaction: "Vente",
    price: 350000,
    surface: 75,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    address: "15 rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    description: "Bel appartement lumineux au cœur du centre-ville, entièrement rénové avec des matériaux de qualité.",
    features: ["Ascenseur", "Balcon", "Cuisine équipée", "Double vitrage"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9"
    ],
    agent: {
      id: 1,
      name: "Marie Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    visits: 12,
    favorites: 8,
    createdAt: "2024-02-01",
    isFavorite: true
  },
  {
    id: 2,
    title: "Maison familiale avec jardin",
    type: "Maison",
    status: "Réservé",
    transaction: "Vente",
    price: 450000,
    surface: 150,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    address: "8 avenue des Lilas",
    city: "Lyon",
    postalCode: "69003",
    description: "Spacieuse maison familiale avec grand jardin, idéale pour une famille nombreuse.",
    features: ["Jardin", "Terrasse", "Cave", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83"
    ],
    agent: {
      id: 1,
      name: "Marie Martin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    visits: 8,
    favorites: 5,
    createdAt: "2024-01-15"
  },
  {
    id: 3,
    title: "Local commercial centre-ville",
    type: "Local commercial",
    status: "Disponible",
    transaction: "Location",
    price: 2500,
    surface: 120,
    rooms: 3,
    bedrooms: 0,
    bathrooms: 1,
    parking: 0,
    address: "25 rue du Commerce",
    city: "Marseille",
    postalCode: "13001",
    description: "Local commercial idéalement situé en centre-ville, parfait pour un commerce ou un bureau.",
    features: ["Vitrine", "Mezzanine", "Climatisation", "Alarme"],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1497366216548-37526070297c"
    ],
    agent: {
      id: 2,
      name: "Thomas Petit",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
    },
    visits: 5,
    favorites: 3,
    createdAt: "2024-02-10"
  }
]

const typeColors: Record<PropertyType, string> = {
  "Appartement": "bg-blue-100 text-blue-800",
  "Maison": "bg-green-100 text-green-800",
  "Local commercial": "bg-purple-100 text-purple-800",
  "Terrain": "bg-yellow-100 text-yellow-800"
}

const statusColors: Record<PropertyStatus, string> = {
  "Disponible": "bg-green-100 text-green-800",
  "Réservé": "bg-yellow-100 text-yellow-800",
  "Vendu": "bg-gray-100 text-gray-800",
  "Loué": "bg-blue-100 text-blue-800"
}

const transactionColors: Record<PropertyTransaction, string> = {
  "Vente": "bg-red-100 text-red-800",
  "Location": "bg-blue-100 text-blue-800"
}

export default function BiensPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<PropertyStatus | "all">("all")
  const [selectedTransaction, setSelectedTransaction] = useState<PropertyTransaction | "all">("all")

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || property.type === selectedType
    const matchesStatus = selectedStatus === "all" || property.status === selectedStatus
    const matchesTransaction = selectedTransaction === "all" || property.transaction === selectedTransaction
    return matchesSearch && matchesType && matchesStatus && matchesTransaction
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Biens immobiliers</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre catalogue de biens immobiliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un bien
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau bien</DialogTitle>
              <DialogDescription>
                Remplissez les informations du bien immobilier
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input placeholder="Titre du bien" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appartement">Appartement</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                      <SelectItem value="local">Local commercial</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Transaction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une transaction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vente">Vente</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prix</Label>
                  <Input type="number" placeholder="Prix" />
                </div>
                <div className="space-y-2">
                  <Label>Surface (m²)</Label>
                  <Input type="number" placeholder="Surface" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Pièces</Label>
                  <Input type="number" placeholder="Nombre de pièces" />
                </div>
                <div className="space-y-2">
                  <Label>Chambres</Label>
                  <Input type="number" placeholder="Nombre de chambres" />
                </div>
                <div className="space-y-2">
                  <Label>Salles de bain</Label>
                  <Input type="number" placeholder="Nombre de salles de bain" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input placeholder="Adresse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input placeholder="Ville" />
                </div>
                <div className="space-y-2">
                  <Label>Code postal</Label>
                  <Input placeholder="Code postal" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="Description" />
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
                  placeholder="Rechercher un bien..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as PropertyType | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Local commercial">Local commercial</SelectItem>
                  <SelectItem value="Terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as PropertyStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Réservé">Réservé</SelectItem>
                  <SelectItem value="Vendu">Vendu</SelectItem>
                  <SelectItem value="Loué">Loué</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedTransaction}
                onValueChange={(value) => setSelectedTransaction(value as PropertyTransaction | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Transaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les transactions</SelectItem>
                  <SelectItem value="Vente">Vente</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des biens */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bien</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Surface</TableHead>
                <TableHead>Caractéristiques</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {property.address}, {property.city}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[property.type]}>
                      {property.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={transactionColors[property.transaction]}>
                      {property.transaction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      <span>{property.price.toLocaleString("fr-FR")} €</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      <span>{property.surface} m²</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        <span>{property.parking}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[property.status]}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={property.agent.avatar} />
                        <AvatarFallback>
                          {property.agent.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{property.agent.name}</p>
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
                          <Calendar className="w-4 h-4 mr-2" />
                          Planifier une visite
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contacter
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Gérer les photos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Ajouter des notes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {property.isFavorite ? (
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