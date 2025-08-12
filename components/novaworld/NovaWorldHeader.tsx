'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Globe, 
  Settings, 
  User,
  Plus,
  Home,
  Network,
  Briefcase,
  Building,
  Users,
  Menu
} from 'lucide-react';
import Link from 'next/link';

export function NovaWorldHeader() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Header Principal */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo NovaWorld */}
            <Link href="/novaworld" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NW</span>
              </div>
              <span className="text-xl font-bold text-gray-900">NovaWorld</span>
            </Link>

            {/* Navigation Principale */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/novaworld" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </Link>
              <Link href="/novaworld/network" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Network className="w-4 h-4" />
                <span>Mon Réseau</span>
              </Link>
              <Link href="/novaworld/jobs" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Briefcase className="w-4 h-4" />
                <span>Emplois</span>
              </Link>
              <Link href="/novaworld/companies" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Building className="w-4 h-4" />
                <span>Entreprises</span>
              </Link>
              <Link href="/novaworld/people" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <Users className="w-4 h-4" />
                <span>Personnes</span>
              </Link>
            </nav>
          </div>

          {/* Barre de Recherche */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher entreprises, emplois, personnes..."
                className={`pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full transition-all ${
                  isSearchFocused ? 'ring-2 ring-blue-200' : ''
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions Utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Bouton Créer */}
            <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2 border-gray-300 hover:border-blue-500 hover:text-blue-600">
              <Plus className="w-4 h-4" />
              <span>Créer</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="sm" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
              <MessageSquare className="w-5 h-5" />
              {messages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
                  {messages}
                </Badge>
              )}
            </Button>

            {/* Profil Utilisateur */}
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all">
                <AvatarImage src="/avatars/user.jpg" alt="Profil utilisateur" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                  U
                </AvatarFallback>
              </Avatar>
              
              {/* Menu Profil */}
              <div className="hidden md:block">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  <span className="text-sm font-medium">Mon Profil</span>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Menu Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Barre de Navigation Secondaire */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-600">Afrique</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">B2B</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">Entrepreneurs</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/novaworld/help" className="text-gray-600 hover:text-blue-600">
                Aide
              </Link>
              <Link href="/novaworld/about" className="text-gray-600 hover:text-blue-600">
                À propos
              </Link>
              <Link href="/novaworld/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 