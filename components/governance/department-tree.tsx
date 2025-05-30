"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, ChevronRight, ChevronDown, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Department {
  id: string
  name: string
  description: string
  parent_id: string | null
  manager_id: string | null
  created_at: string
  updated_at: string
  children?: Department[]
  manager?: {
    full_name: string
    email: string
  }
  user_count?: number
}

export default function DepartmentTree() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      setLoading(true)

      // Récupérer tous les départements avec leurs managers
      const { data: deptData, error: deptError } = await supabase
        .from("departments")
        .select(`
          *,
          manager:users!departments_manager_id_fkey(full_name, email)
        `)
        .order("name")

      if (deptError) throw deptError

      // Récupérer le nombre d'utilisateurs par département
      const { data: userCounts, error: userError } = await supabase
        .from("users")
        .select("department")
        .not("department", "is", null)

      if (userError) throw userError

      // Compter les utilisateurs par département
      const countByDept = userCounts.reduce((acc: Record<string, number>, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1
        return acc
      }, {})

      // Construire l'arbre hiérarchique
      const deptMap = new Map<string, Department>()
      const rootDepts: Department[] = []

      // Ajouter le nombre d'utilisateurs à chaque département
      deptData.forEach((dept) => {
        const deptWithCount = {
          ...dept,
          user_count: countByDept[dept.name] || 0,
          children: [],
        }
        deptMap.set(dept.id, deptWithCount)
      })

      // Construire la hiérarchie
      deptData.forEach((dept) => {
        const deptWithCount = deptMap.get(dept.id)!
        if (dept.parent_id) {
          const parent = deptMap.get(dept.parent_id)
          if (parent) {
            parent.children = parent.children || []
            parent.children.push(deptWithCount)
          }
        } else {
          rootDepts.push(deptWithCount)
        }
      })

      setDepartments(rootDepts)
    } catch (error) {
      console.error("Erreur lors du chargement des départements:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les départements",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleExpanded = (deptId: string) => {
    setExpandedDepts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(deptId)) {
        newSet.delete(deptId)
      } else {
        newSet.add(deptId)
      }
      return newSet
    })
  }

  const renderDepartment = (dept: Department, level = 0) => {
    const isExpanded = expandedDepts.has(dept.id)
    const hasChildren = dept.children && dept.children.length > 0

    return (
      <div key={dept.id} className="space-y-2">
        <Card className={`transition-all duration-200 ${level > 0 ? "ml-6 border-l-2 border-l-blue-200" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasChildren && (
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(dept.id)} className="p-1 h-6 w-6">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {dept.user_count || 0}
                </Badge>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                {dept.manager ? (
                  <span>
                    <strong>Manager:</strong> {dept.manager.full_name} ({dept.manager.email})
                  </span>
                ) : (
                  <span className="text-orange-600">Aucun manager assigné</span>
                )}
              </div>
              <div>Créé le {new Date(dept.created_at).toLocaleDateString("fr-FR")}</div>
            </div>
          </CardContent>
        </Card>

        {/* Départements enfants */}
        {hasChildren && isExpanded && (
          <div className="space-y-2">{dept.children!.map((child) => renderDepartment(child, level + 1))}</div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Building2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Chargement de l'organigramme...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Structure Organisationnelle</h2>
          <p className="text-muted-foreground">Visualisez et gérez la hiérarchie des départements</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Département
        </Button>
      </div>

      <div className="space-y-4">
        {departments.length > 0 ? (
          departments.map((dept) => renderDepartment(dept))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Aucun département trouvé</h3>
              <p className="text-muted-foreground mb-4">Commencez par créer votre premier département</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer un département
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
