"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, Activity, User, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ActivityLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  details: any
  ip_address: string
  user_agent: string
  created_at: string
  module: string
  severity: string
  user?: {
    full_name: string
    email: string
  }
}

const SEVERITY_COLORS = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  critical: "bg-red-200 text-red-900",
}

const ACTION_ICONS = {
  login: "🔐",
  logout: "🚪",
  create: "➕",
  update: "✏️",
  delete: "🗑️",
  view: "👁️",
  export: "📤",
  import: "📥",
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const logsPerPage = 20

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLogs()
  }, [currentPage, selectedModule, selectedSeverity, searchTerm])

  const fetchLogs = async () => {
    try {
      setLoading(true)

      let query = supabase
        .from("activity_logs")
        .select(`
          *,
          user:users!activity_logs_user_id_fkey(full_name, email)
        `)
        .order("created_at", { ascending: false })

      // Filtres
      if (selectedModule !== "all") {
        query = query.eq("module", selectedModule)
      }

      if (selectedSeverity !== "all") {
        query = query.eq("severity", selectedSeverity)
      }

      if (searchTerm) {
        query = query.or(`action.ilike.%${searchTerm}%,entity_type.ilike.%${searchTerm}%`)
      }

      // Pagination
      const from = (currentPage - 1) * logsPerPage
      const to = from + logsPerPage - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      setLogs(data || [])
      setTotalPages(Math.ceil((count || 0) / logsPerPage))
    } catch (error) {
      console.error("Erreur lors du chargement des logs:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les logs d'activité",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActionIcon = (action: string) => {
    return ACTION_ICONS[action as keyof typeof ACTION_ICONS] || "📝"
  }

  const getSeverityBadge = (severity: string) => {
    const colorClass = SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || "bg-gray-100 text-gray-800"
    return <Badge className={colorClass}>{severity.toUpperCase()}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Chargement des logs d'activité...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Logs d'Activité</h2>
          <p className="text-muted-foreground">Surveillez toutes les actions effectuées dans le système</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Recherche</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les modules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les modules</SelectItem>
                  <SelectItem value="auth">Authentification</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="invoices">Factures</SelectItem>
                  <SelectItem value="studio">Studio IA</SelectItem>
                  <SelectItem value="users">Utilisateurs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sévérité</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les sévérités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sévérités</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchLogs} className="w-full">
                Actualiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des logs */}
      <div className="space-y-2">
        {logs.map((log) => (
          <Card key={log.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">{getActionIcon(log.action)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{log.action}</span>
                      <span className="text-muted-foreground">sur</span>
                      <Badge variant="outline">{log.entity_type}</Badge>
                      {getSeverityBadge(log.severity)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.user?.full_name || "Utilisateur inconnu"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(log.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {log.module}
                        </Badge>
                      </div>
                    </div>
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        <strong>Détails:</strong> {JSON.stringify(log.details, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>IP: {log.ip_address}</div>
                  <div className="max-w-32 truncate" title={log.user_agent}>
                    {log.user_agent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}

      {logs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Aucun log trouvé</h3>
            <p className="text-muted-foreground">Aucune activité ne correspond à vos critères de recherche</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
