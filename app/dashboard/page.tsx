'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, User } from '@/lib/auth-simple';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Activity,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/sign-in');
      return;
    }

    const currentUser = auth.verifyToken(token);
    if (!currentUser) {
      localStorage.removeItem('authToken');
      router.push('/sign-in');
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/sign-in');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Portfolio Total',
      value: '$125,430',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Trades Aujourd\'hui',
      value: '24',
      change: '+8.2%',
      changeType: 'positive',
      icon: Activity
    },
    {
      title: 'Performance',
      value: '+18.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Actifs Suivis',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: BarChart3
    }
  ];

  const quickActions = [
    {
      title: 'Nouveau Trade',
      description: 'Ouvrir une nouvelle position',
      icon: TrendingUp,
      href: '/trading-charts',
      color: 'bg-blue-500'
    },
    {
      title: 'Analyser Marché',
      description: 'Voir les graphiques en temps réel',
      icon: BarChart3,
      href: '/demo/real-trading',
      color: 'bg-green-500'
    },
    {
      title: 'Mon Portfolio',
      description: 'Gérer vos investissements',
      icon: DollarSign,
      href: '/portfolio',
      color: 'bg-purple-500'
    },
    {
      title: 'Paramètres',
      description: 'Configurer votre compte',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Trading
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {user.name} ! 👋
          </h2>
          <p className="text-gray-600">
            Voici un aperçu de votre activité de trading aujourd'hui
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <stat.icon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs hier</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Actions Rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className={`p-3 rounded-full ${action.color} w-fit mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Activité Récente
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Achat AAPL +10 actions
                  </p>
                  <p className="text-sm text-gray-500">
                    Il y a 2 heures
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +$1,250
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Vente TSLA -5 actions
                  </p>
                  <p className="text-sm text-gray-500">
                    Il y a 4 heures
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  -$850
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Ajout Bitcoin au watchlist
                  </p>
                  <p className="text-sm text-gray-500">
                    Il y a 6 heures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 