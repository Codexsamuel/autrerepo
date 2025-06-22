"use client"

import { useState } from "react"
// Removed motion import
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
  BarChart,
  LineChart,
  PieChart,
  Download,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Eye,
  Plus
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts"

type ReportType = "Ventes" | "Locations" | "Visites" | "Clients" | "Financier"

interface Report {
  id: number
  title: string
  type: ReportType
  date: string
  period: string
  data: any
}

const reports: Report[] = [
  {
    id: 1,
    title: "Rapport des ventes - Février 2024",
    type: "Ventes",
    date: "2024-02-20",
    period: "Février 2024",
    data: {
      total: 5,
      montant: 1250000,
      evolution: "+15%",
      details: [
        { name: "Jan", value: 4 },
        { name: "Fév", value: 5 },
        { name: "Mar", value: 3 },
        { name: "Avr", value: 6 },
        { name: "Mai", value: 4 },
        { name: "Jun", value: 5 }
      ]
    }
  },
  {
    id: 2,
    title: "Rapport des locations - Février 2024",
    type: "Locations",
    date: "2024-02-19",
    period: "Février 2024",
    data: {
      total: 12,
      montant: 24000,
      evolution: "+8%",
      details: [
        { name: "Jan", value: 10 },
        { name: "Fév", value: 12 },
        { name: "Mar", value: 11 },
        { name: "Avr", value: 13 },
        { name: "Mai", value: 12 },
        { name: "Jun", value: 14 }
      ]
    }
  },
  {
    id: 3,
    title: "Rapport des visites - Février 2024",
    type: "Visites",
    date: "2024-02-18",
    period: "Février 2024",
    data: {
      total: 45,
      taux: "35%",
      evolution: "+12%",
      details: [
        { name: "Jan", value: 40 },
        { name: "Fév", value: 45 },
        { name: "Mar", value: 42 },
        { name: "Avr", value: 48 },
        { name: "Mai", value: 45 },
        { name: "Jun", value: 50 }
      ]
    }
  }
]

const typeColors: Record<ReportType, string> = {
  "Ventes": "bg-blue-100 text-blue-800",
  "Locations": "bg-green-100 text-green-800",
  "Visites": "bg-yellow-100 text-yellow-800",
  "Clients": "bg-purple-100 text-purple-800",
  "Financier": "bg-red-100 text-red-800"
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function RapportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rapports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultez et gérez vos rapports immobiliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau rapport
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Générer un nouveau rapport</DialogTitle>
              <DialogDescription>
                Sélectionnez le type de rapport à générer
              </DialogDescription>
            </DialogHeader>
            {/* Formulaire de génération de rapport */}
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
                  placeholder="Rechercher un rapport..."
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
                Période
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des rapports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <Badge className={typeColors[report.type]}>
                  {report.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={report.data.details}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total
                    </p>
                    <p className="text-lg font-semibold">
                      {report.data.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Évolution
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      {report.data.evolution}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {report.date}
                  </div>
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 