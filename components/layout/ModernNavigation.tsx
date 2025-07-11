'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import LanguageSelector from '@/components/ui/language-selector';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n/translations';
import { Briefcase, Building, ChevronDown, Home, Info, Menu, Phone, Search, Settings, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface ModernNavigationProps {
  className?: string;
}

export default function ModernNavigation({ className = '' }: ModernNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslation(language);

  const navigationItems = [
    { name: t.navigation.home, href: '/', icon: Home },
    { name: t.navigation.services, href: '/services', icon: Briefcase },
    { name: 'Formations', href: '/formations', icon: Building, dataOnboarding: 'formations' },
    { name: t.navigation.about, href: '/a-propos', icon: Info },
    { name: 'NovaCore', href: '/novacore', icon: Settings, dataOnboarding: 'novacore' },
    { name: t.navigation.intranet, href: '/intranet', icon: Building },
    { name: 'DL Trading', href: '/trading', icon: TrendingUp },
    { name: t.navigation.contact, href: '/contact', icon: Phone },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implémenter la recherche
      console.log('Recherche:', searchQuery);
      // Rediriger vers une page de résultats ou effectuer une recherche
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg ${className}`}>
      <div className="container mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="/images/dl-logo.jpg" 
              alt="DL Solutions Logo" 
              className="h-12 w-12 lg:h-16 lg:w-16 object-contain" 
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Dave and Luce
              </span>
              <span className="text-xs text-gray-500 font-medium leading-tight">
                Solutions Digitales
              </span>
            </div>
          </Link>

          {/* Barre de recherche centrale */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative w-full flex">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : 'scale-100'
              } flex-1`}>
                <Input
                  type="text"
                  placeholder={t.search.placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-full px-4 py-2 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                className="ml-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-base"
                disabled={!searchQuery.trim()}
              >
                {t.search.search || 'Rechercher'}
              </Button>
            </form>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Menu principal */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  <Menu className="w-4 h-4" />
                  <span className="font-medium">{t.navigation.menu}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                {navigationItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href} 
                      className="flex items-center space-x-3 p-3 hover:bg-blue-50"
                      {...(item.dataOnboarding ? { 'data-onboarding': item.dataOnboarding } : {})}
                    >
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sélecteur de langue */}
            <LanguageSelector variant="dropdown" />

            {/* Bouton Solutions */}
            <Link href="/solutions/selection">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                {t.navigation.solutions}
              </Button>
            </Link>

            {/* Ajout des boutons Connexion/Inscription visibles à droite si l'utilisateur n'est pas connecté */}
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-full shadow-lg text-base">
                Connexion
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg text-base">
                Créer un compte
              </Button>
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Barre de recherche mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Search className="w-5 h-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 mt-2 p-4">
                <form onSubmit={handleSearch} className="space-y-3">
                  <Input
                    type="text"
                    placeholder={t.search.placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="w-full">
                    {t.search.search}
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu hamburger */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2">
                {navigationItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href} 
                      className="flex items-center space-x-3 p-3 hover:bg-blue-50"
                      {...(item.dataOnboarding ? { 'data-onboarding': item.dataOnboarding } : {})}
                    >
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <DropdownMenuItem asChild>
                    <Link href="/solutions/selection" className="flex items-center space-x-3 p-3 hover:bg-blue-50">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{t.navigation.solutions}</span>
                    </Link>
                  </DropdownMenuItem>
                  <div className="p-3">
                    <LanguageSelector variant="dropdown" />
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
} 