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
  FileText,
  Plus,
  MoreVertical,
  Search,
  Filter,
  Building2,
  Users,
  Calendar,
  Download,
  Edit,
  Trash2,
  Eye,
  Upload
} from "lucide-react"

type DocumentType = "Bail" | "Contrat" | "Facture" | "Photo" | "Autre"
type DocumentStatus = "En attente" | "Signé" | "Expiré" | "Archivé"

interface Document {
  id: number
  name: string
  type: DocumentType
  status: DocumentStatus
  property: string
  client: string
  date: string
  size: string
  url: string
}

const documents: Document[] = [
  {
    id: 1,
    name: "Bail de location - Appartement T3",
    type: "Bail",
    status: "Signé",
    property: "Appartement T3 - Centre ville",
    client: "Marie Dupont",
    date: "2024-02-15",
    size: "2.5 MB",
    url: "/documents/bail-t3.pdf"
  },
  {
    id: 2,
    name: "Contrat de vente - Maison",
    type: "Contrat",
    status: "En attente",
    property: "Maison de ville - Quartier calme",
    client: "Jean Martin",
    date: "2024-02-18",
    size: "3.1 MB",
    url: "/documents/contrat-vente.pdf"
  },
  {
    id: 3,
    name: "Facture de loyer - Studio",
    type: "Facture",
    status: "Archivé",
    property: "Studio moderne - Proche gare",
    client: "Sophie Bernard",
    date: "2024-01-15",
    size: "1.2 MB",
    url: "/documents/facture-studio.pdf"
  }
]

const typeColors: Record<DocumentType, string> = {
  "Bail": "bg-blue-100 text-blue-800",
  "Contrat": "bg-purple-100 text-purple-800",
  "Facture": "bg-green-100 text-green-800",
  "Photo": "bg-yellow-100 text-yellow-800",
  "Autre": "bg-gray-100 text-gray-800"
}

const statusColors: Record<DocumentStatus, string> = {
  "En attente": "bg-yellow-100 text-yellow-800",
  "Signé": "bg-green-100 text-green-800",
  "Expiré": "bg-red-100 text-red-800",
  "Archivé": "bg-gray-100 text-gray-800"
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez vos documents immobiliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Nouveau document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau document</DialogTitle>
              <DialogDescription>
                Téléchargez un document ou créez-en un nouveau
              </DialogDescription>
            </DialogHeader>
            {/* Formulaire d'ajout de document */}
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
                  placeholder="Rechercher un document..."
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Bien</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">{document.name}</TableCell>
                  <TableCell>
                    <Badge className={typeColors[document.type]}>
                      {document.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[document.status]}>
                      {document.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {document.property}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {document.client}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {document.date}
                    </div>
                  </TableCell>
                  <TableCell>{document.size}</TableCell>
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
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
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