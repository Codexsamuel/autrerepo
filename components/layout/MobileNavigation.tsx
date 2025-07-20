'use client';

import { GraduationCap, Home, Mail, Menu, Phone, Settings, ShoppingCart, Users, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Fermer le menu quand on clique sur l'overlay
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const navigationItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/services', label: 'Services', icon: Settings },
    { href: '/dl-style', label: 'Boutique', icon: ShoppingCart },
    { href: '/formations', label: 'Formations', icon: GraduationCap },
    { href: '/contact', label: 'Contact', icon: Phone },
    { href: '/a-propos', label: 'À propos', icon: Users },
  ];

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="mobile-menu-toggle lg:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Ouvrir le menu de navigation"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleOverlayClick}
      />

      {/* Menu mobile */}
      <div
        className={`sidebar lg:hidden fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header du menu */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DL</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">DL Solutions</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Fermer le menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
                >
                  <Icon size={20} className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Section contact rapide */}
          <div className="px-4 mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Rapide</h3>
            <div className="space-y-2">
              <a
                href="tel:+237-XXX-XXX-XXX"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200 group"
              >
                <Phone size={18} className="text-gray-500 group-hover:text-green-600" />
                <span className="text-sm">Appeler</span>
              </a>
              <a
                href="mailto:contact@dlsolutions.com"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
              >
                <Mail size={18} className="text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Footer du menu */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">DL Solutions</p>
            <p className="text-xs text-gray-400">Écosystème Digital Complet</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation; 