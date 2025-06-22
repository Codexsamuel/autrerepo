"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, AlertTriangle, Calendar, Clock, Award, UserCheck, UserX, DollarSign, FileText, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Removed motion import

interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  avatar?: string
  status: 'active' | 'inactive' | 'on_leave'
  joinDate: Date
  salary: number
  performance: number
  lastActivity: Date
  contractEndDate?: Date
  leaveBalance: number
}

interface HRAlert {
  id: string
  type: 'contract_expiry' | 'performance_issue' | 'leave_balance' | 'salary_review' | 'birthday'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  employeeId: string
  createdAt: Date
  resolved: boolean
}

interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  onLeaveEmployees: number
  newHiresThisMonth: number
  contractsExpiringSoon: number
  averagePerformance: number
  totalSalary: number
  leaveRequests: number
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Samuel OBAM',
    email: 'samuel@dlsolutions.com',
    position: 'Directeur Général',
    department: 'Direction',
    status: 'active',
    joinDate: new Date('2020-01-15'),
    salary: 500000,
    performance: 95,
    lastActivity: new Date(),
    leaveBalance: 15
  },
  {
    id: '2',
    name: 'Marie NGUEMO',
    email: 'marie@dlsolutions.com',
    position: 'Responsable RH',
    department: 'Ressources Humaines',
    status: 'active',
    joinDate: new Date('2021-03-20'),
    salary: 350000,
    performance: 88,
    lastActivity: new Date(),
    leaveBalance: 8,
    contractEndDate: new Date('2024-12-31')
  },
  {
    id: '3',
    name: 'Jean KAMGA',
    email: 'jean@dlsolutions.com',
    position: 'Développeur Senior',
    department: 'Technique',
    status: 'active',
    joinDate: new Date('2022-06-10'),
    salary: 400000,
    performance: 92,
    lastActivity: new Date(),
    leaveBalance: 12
  },
  {
    id: '4',
    name: 'Sophie MBALLA',
    email: 'sophie@dlsolutions.com',
    position: 'Commerciale',
    department: 'Vente',
    status: 'on_leave',
    joinDate: new Date('2021-09-05'),
    salary: 280000,
    performance: 75,
    lastActivity: new Date('2024-01-15'),
    leaveBalance: 5
  },
  {
    id: '5',
    name: 'Pierre FOTSO',
    email: 'pierre@dlsolutions.com',
    position: 'Designer UI/UX',
    department: 'Design',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    salary: 320000,
    performance: 85,
    lastActivity: new Date(),
    leaveBalance: 20
  }
]

const mockAlerts: HRAlert[] = [
  {
    id: '1',
    type: 'contract_expiry',
    title: 'Contrat expirant bientôt',
    description: 'Le contrat de Marie NGUEMO expire dans 30 jours',
    severity: 'high',
    employeeId: '2',
    createdAt: new Date(),
    resolved: false
  },
  {
    id: '2',
    type: 'performance_issue',
    title: 'Performance en baisse',
    description: 'Sophie MBALLA a une performance de 75% ce mois',
    severity: 'medium',
    employeeId: '4',
    createdAt: new Date(),
    resolved: false
  },
  {
    id: '3',
    type: 'leave_balance',
    title: 'Solde de congés faible',
    description: 'Jean KAMGA n\'a plus que 2 jours de congés',
    severity: 'low',
    employeeId: '3',
    createdAt: new Date(),
    resolved: false
  },
  {
    id: '4',
    type: 'birthday',
    title: 'Anniversaire aujourd\'hui',
    description: 'C\'est l\'anniversaire de Pierre FOTSO',
    severity: 'low',
    employeeId: '5',
    createdAt: new Date(),
    resolved: false
  }
]

export function HRDashboard() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [alerts, setAlerts] = useState<HRAlert[]>(mockAlerts)
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    onLeaveEmployees: 0,
    newHiresThisMonth: 0,
    contractsExpiringSoon: 0,
    averagePerformance: 0,
    totalSalary: 0,
    leaveRequests: 0
  })
  const [aiInsights, setAiInsights] = useState<string[]>([])

  useEffect(() => {
    calculateStats()
    generateAIInsights()
  }, [employees, alerts])

  const calculateStats = () => {
    const now = new Date()
    const thisMonth = now.getMonth()
    const thisYear = now.getFullYear()

    const newStats: DashboardStats = {
      totalEmployees: employees.length,
      activeEmployees: employees.filter(e => e.status === 'active').length,
      onLeaveEmployees: employees.filter(e => e.status === 'on_leave').length,
      newHiresThisMonth: employees.filter(e => {
        const joinDate = new Date(e.joinDate)
        return joinDate.getMonth() === thisMonth && joinDate.getFullYear() === thisYear
      }).length,
      contractsExpiringSoon: employees.filter(e => {
        if (!e.contractEndDate) return false
        const daysUntilExpiry = Math.ceil((e.contractEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0
      }).length,
      averagePerformance: Math.round(employees.reduce((sum, e) => sum + e.performance, 0) / employees.length),
      totalSalary: employees.reduce((sum, e) => sum + e.salary, 0),
      leaveRequests: 3 // Simulation
    }

    setStats(newStats)
  }

  const generateAIInsights = () => {
    const insights: string[] = []
    
    // Analyse des performances
    const lowPerformers = employees.filter(e => e.performance < 80)
    if (lowPerformers.length > 0) {
      insights.push(`${lowPerformers.length} employé(s) ont une performance inférieure à 80%. Considérez un plan d'amélioration.`)
    }

    // Analyse des salaires
    const avgSalary = employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
    const highSalaryEmployees = employees.filter(e => e.salary > avgSalary * 1.5)
    if (highSalaryEmployees.length > 0) {
      insights.push(`${highSalaryEmployees.length} employé(s) ont un salaire supérieur à 150% de la moyenne.`)
    }

    // Analyse des congés
    const lowLeaveBalance = employees.filter(e => e.leaveBalance < 5)
    if (lowLeaveBalance.length > 0) {
      insights.push(`${lowLeaveBalance.length} employé(s) ont moins de 5 jours de congés restants.`)
    }

    // Analyse des contrats
    const expiringContracts = employees.filter(e => {
      if (!e.contractEndDate) return false
      const daysUntilExpiry = Math.ceil((e.contractEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 30
    })
    if (expiringContracts.length > 0) {
      insights.push(`${expiringContracts.length} contrat(s) expire(nt) dans les 30 prochains jours.`)
    }

    setAiInsights(insights)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'on_leave': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard RH</h1>
          <p className="text-gray-600">Gestion intelligente des ressources humaines</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">IA Assistant RH</span>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <UserCheck className="h-4 w-4 mr-1" />
                  {stats.activeEmployees} actifs
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserX className="h-4 w-4 mr-1" />
                  {stats.onLeaveEmployees} en congé
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Performance Moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averagePerformance}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4">
                <Progress value={stats.averagePerformance} className="h-2" />
                <p className="text-xs text-gray-600 mt-1">Objectif: 85%</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Masse Salariale</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(stats.totalSalary / 1000)}k FCFA
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Moyenne: {Math.round(stats.totalSalary / stats.totalEmployees)} FCFA
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alertes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {alerts.filter(a => !a.resolved).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {stats.contractsExpiringSoon} contrats expirant
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="employees">Employés</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="insights">IA Insights</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employés récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Employés Récents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.slice(0, 5).map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status === 'active' ? 'Actif' : 
                         employee.status === 'on_leave' ? 'En congé' : 'Inactif'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activité récente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Activité Récente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nouveau contrat signé</p>
                      <p className="text-xs text-gray-600">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Demande de congés approuvée</p>
                      <p className="text-xs text-gray-600">Il y a 4 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Évaluation de performance</p>
                      <p className="text-xs text-gray-600">Il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Formation terminée</p>
                      <p className="text-xs text-gray-600">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employés */}
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Employés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{employee.performance}%</p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{employee.leaveBalance}</p>
                        <p className="text-xs text-gray-600">Congés</p>
                      </div>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status === 'active' ? 'Actif' : 
                         employee.status === 'on_leave' ? 'En congé' : 'Inactif'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alertes */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Alertes RH</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.filter(alert => !alert.resolved).map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <p className="text-xs mt-2">
                          {alert.createdAt.toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {alert.severity === 'critical' ? 'Critique' :
                           alert.severity === 'high' ? 'Élevée' :
                           alert.severity === 'medium' ? 'Moyenne' : 'Faible'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          Résoudre
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IA Insights */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Insights IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-900">{insight}</p>
                    </div>
                  </motion.div>
                ))}
                
                {aiInsights.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun insight disponible pour le moment</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 