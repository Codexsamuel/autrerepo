'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Star, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Filter,
  Search,
  Zap,
  Brain,
  BarChart3
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  assignee: string;
  dueDate: Date;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  aiInsights?: string[];
  automationLevel: 'manual' | 'semi_auto' | 'full_auto';
  createdAt: Date;
  updatedAt: Date;
}

interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  efficiency: number;
  productivity: number;
  teamWorkload: { [key: string]: number };
  priorityDistribution: { [key: string]: number };
}

export default function IntelligentTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [analytics, setAnalytics] = useState<TaskAnalytics>({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    efficiency: 0,
    productivity: 0,
    teamWorkload: {},
    priorityDistribution: {}
  });

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assignee: '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
    estimatedHours: 1,
    tags: [],
    automationLevel: 'manual'
  });

  const priorities = [
    { value: 'low', label: 'Faible', color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'medium', label: 'Moyenne', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { value: 'high', label: 'Élevée', color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { value: 'urgent', label: 'Urgente', color: 'text-red-600', bgColor: 'bg-red-100' }
  ];

  const statuses = [
    { value: 'todo', label: 'À faire', icon: Circle, color: 'text-gray-600' },
    { value: 'in_progress', label: 'En cours', icon: Clock, color: 'text-blue-600' },
    { value: 'review', label: 'En révision', icon: AlertTriangle, color: 'text-yellow-600' },
    { value: 'completed', label: 'Terminé', icon: CheckCircle, color: 'text-green-600' }
  ];

  const automationLevels = [
    { value: 'manual', label: 'Manuel', icon: Circle },
    { value: 'semi_auto', label: 'Semi-automatique', icon: Zap },
    { value: 'full_auto', label: 'Automatique', icon: Brain }
  ];

  useEffect(() => {
    // Charger des tâches d'exemple
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Rapport mensuel de ventes',
        description: 'Analyser et compiler les données de ventes du mois',
        priority: 'high',
        status: 'in_progress',
        assignee: 'Marie Dubois',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        estimatedHours: 4,
        actualHours: 2,
        tags: ['rapport', 'ventes', 'analyse'],
        aiInsights: ['Optimisation possible des processus de collecte de données'],
        automationLevel: 'semi_auto',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Mise à jour du site web',
        description: 'Intégrer les nouvelles fonctionnalités demandées',
        priority: 'medium',
        status: 'todo',
        assignee: 'Jean Martin',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        estimatedHours: 8,
        tags: ['développement', 'web', 'fonctionnalités'],
        automationLevel: 'manual',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Formation équipe RH',
        description: 'Former l\'équipe aux nouveaux outils de gestion',
        priority: 'low',
        status: 'completed',
        assignee: 'Sophie Bernard',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        estimatedHours: 6,
        actualHours: 5,
        tags: ['formation', 'RH', 'outils'],
        automationLevel: 'manual',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      }
    ];

    setTasks(sampleTasks);
    calculateAnalytics(sampleTasks);
  }, []);

  const calculateAnalytics = (taskList: Task[]) => {
    const total = taskList.length;
    const completed = taskList.filter(t => t.status === 'completed').length;
    const overdue = taskList.filter(t => t.dueDate < new Date() && t.status !== 'completed').length;
    
    const efficiency = total > 0 ? (completed / total) * 100 : 0;
    const productivity = taskList.reduce((acc, task) => {
      if (task.actualHours && task.estimatedHours) {
        return acc + (task.estimatedHours / task.actualHours);
      }
      return acc;
    }, 0) / completed || 0;

    const workload: { [key: string]: number } = {};
    const priorityDist: { [key: string]: number } = {};

    taskList.forEach(task => {
      workload[task.assignee] = (workload[task.assignee] || 0) + 1;
      priorityDist[task.priority] = (priorityDist[task.priority] || 0) + 1;
    });

    setAnalytics({
      totalTasks: total,
      completedTasks: completed,
      overdueTasks: overdue,
      efficiency: Math.round(efficiency),
      productivity: Math.round(productivity * 100),
      teamWorkload: workload,
      priorityDistribution: priorityDist
    });
  };

  const createTask = () => {
    if (!newTask.title || !newTask.assignee) return;

    const task: Task = {
      id: `task_${Date.now()}`,
      title: newTask.title!,
      description: newTask.description || '',
      priority: newTask.priority!,
      status: newTask.status!,
      assignee: newTask.assignee!,
      dueDate: newTask.dueDate!,
      estimatedHours: newTask.estimatedHours!,
      tags: newTask.tags || [],
      automationLevel: newTask.automationLevel!,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTasks(prev => [task, ...prev]);
    calculateAnalytics([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      assignee: '',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedHours: 1,
      tags: [],
      automationLevel: 'manual'
    });
    setIsCreating(false);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus, updatedAt: new Date() };
      }
      return task;
    }));
    calculateAnalytics(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    calculateAnalytics(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityInfo = (priority: Task['priority']) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const getStatusInfo = (status: Task['status']) => {
    return statuses.find(s => s.value === status) || statuses[0];
  };

  const getAutomationIcon = (level: Task['automationLevel']) => {
    return automationLevels.find(a => a.value === level)?.icon || Circle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestionnaire de Tâches IA</h2>
          <p className="text-gray-600">Optimisez vos workflows avec l'intelligence artificielle</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle tâche
        </motion.button>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total des tâches</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600">{analytics.completedTasks}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En retard</p>
              <p className="text-2xl font-bold text-red-600">{analytics.overdueTasks}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efficacité</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.efficiency}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher des tâches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tous les statuts</option>
          {statuses.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Create Task Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-xl shadow-lg border"
          >
            <h3 className="text-lg font-semibold mb-4">Créer une nouvelle tâche</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la tâche
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Rapport mensuel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigné à
                </label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom du collaborateur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={newTask.dueDate?.toISOString().split('T')[0]}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: new Date(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heures estimées
                </label>
                <input
                  type="number"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0.5"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau d'automatisation
                </label>
                <select
                  value={newTask.automationLevel}
                  onChange={(e) => setNewTask(prev => ({ ...prev, automationLevel: e.target.value as Task['automationLevel'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {automationLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Description détaillée de la tâche..."
              />
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createTask}
                disabled={!newTask.title || !newTask.assignee}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Créer la tâche
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const priorityInfo = getPriorityInfo(task.priority);
          const statusInfo = getStatusInfo(task.status);
          const AutomationIcon = getAutomationIcon(task.automationLevel);
          const isOverdue = task.dueDate < new Date() && task.status !== 'completed';

          return (
            <motion.div
              key={task.id}
              whileHover={{ y: -2 }}
              className={`bg-white p-6 rounded-xl shadow-lg border transition-all ${
                isOverdue ? 'border-red-200 bg-red-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </motion.button>
                    
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}>
                      {priorityInfo.label}
                    </span>
                    
                    <AutomationIcon className="w-4 h-4 text-gray-400" />
                  </div>

                  <p className="text-gray-600 mb-3">{task.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {task.dueDate.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.estimatedHours}h
                    </div>
                    {task.actualHours && (
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {task.actualHours}h réelles
                      </div>
                    )}
                  </div>

                  {task.aiInsights && task.aiInsights.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Insights IA</span>
                      </div>
                      <p className="text-sm text-blue-700">{task.aiInsights[0]}</p>
                    </div>
                  )}

                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTask(task)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && !isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Target className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune tâche trouvée</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filter !== 'all' 
              ? 'Aucune tâche ne correspond à vos critères de recherche'
              : 'Commencez par créer votre première tâche intelligente'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer une tâche
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
} 