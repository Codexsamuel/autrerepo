import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Briefcase,
  BarChart3
} from 'lucide-react';

export default function IntranetPage() {
  const stats = [
    { label: 'Employés actifs', value: '127', icon: Users, change: '+3%', color: 'text-blue-600' },
    { label: 'Congés en cours', value: '23', icon: Calendar, change: '-5%', color: 'text-green-600' },
    { label: 'Documents en attente', value: '8', icon: FileText, change: '+12%', color: 'text-orange-600' },
    { label: 'Budget RH', value: '€45.2K', icon: DollarSign, change: '+8%', color: 'text-purple-600' },
  ];

  const recentActivities = [
    { 
      type: 'embauche', 
      message: 'Nouvelle embauche : Marie Dubois - Développeuse Frontend',
      time: 'Il y a 2 heures',
      icon: UserPlus,
      color: 'text-green-600'
    },
    { 
      type: 'congé', 
      message: 'Demande de congé approuvée pour Jean Martin',
      time: 'Il y a 4 heures',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    { 
      type: 'formation', 
      message: 'Formation React avancée programmée pour la semaine prochaine',
      time: 'Il y a 6 heures',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    { 
      type: 'alerte', 
      message: 'Contrats à renouveler : 5 employés',
      time: 'Il y a 1 jour',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
  ];

  const quickActions = [
    { label: 'Gérer les employés', href: '/intranet/rh', icon: Users },
    { label: 'Planifier les congés', href: '/intranet/rh', icon: Calendar },
    { label: 'Gérer la paie', href: '/intranet/rh', icon: DollarSign },
    { label: 'Formations', href: '/intranet/rh', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DL</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Intranet
                </span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/intranet" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/intranet/rh" className="text-gray-700 hover:text-blue-600 transition-colors">RH</Link>
              <Link href="/intranet/admin" className="text-gray-700 hover:text-blue-600 transition-colors">Administration</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur l'Intranet DL Solutions
          </h1>
          <p className="text-gray-600">
            Gérez vos ressources humaines et votre administration en toute simplicité
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <action.icon className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activités récentes</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendrier RH</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Entretiens annuels</p>
                  <p className="text-sm text-blue-700">15-20 décembre 2024</p>
                </div>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Formation sécurité</p>
                  <p className="text-sm text-green-700">22 décembre 2024</p>
                </div>
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance RH</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Taux de satisfaction</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Taux de rétention</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}