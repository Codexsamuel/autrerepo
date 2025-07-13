"use client";

import {
    Activity,
    BarChart3,
    Bell,
    Globe,
    Home,
    Settings,
    Sparkles,
    TrendingUp,
    User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Éviter l'erreur d'hydratation en attendant que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      name: 'Accueil',
      href: '/',
      icon: Home
    },
    {
      name: 'Capacités',
      href: '/capacites-techniques',
      icon: Sparkles
    },
    {
      name: 'Trading',
      href: '/demo/real-trading',
      icon: TrendingUp
    },
    {
      name: 'Graphiques',
      href: '/trading-charts',
      icon: BarChart3
    },
    {
      name: 'Alertes',
      href: '/price-alerts',
      icon: Bell
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Activity
    },
    {
      name: 'Services',
      href: '/services',
      icon: Globe
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: User
    }
  ];

  // Ne pas rendre la navigation tant que le composant n'est pas monté côté client
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900">DL Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
                DL Solutions
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/admin"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 