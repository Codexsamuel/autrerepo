'use client';

import { Home, ArrowLeft, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

interface UniversalNavigationProps {
  variant?: 'compact' | 'full' | 'floating';
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export function UniversalNavigation({
  variant = 'compact',
  showBackButton = true,
  showHomeButton = true,
  className = ''
}: UniversalNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ne pas afficher sur la page d'accueil
  if (pathname === '/') {
    return null;
  }

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variant compact (icônes seulement)
  if (variant === 'compact') {
    return (
      <div className={`fixed top-4 left-4 z-50 flex space-x-2 ${className}`}>
        {showHomeButton && (
          <Button
            onClick={handleHomeClick}
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Retour à l'accueil"
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
        
        {showBackButton && (
          <Button
            onClick={handleBackClick}
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  }

  // Variant flottant (boutons verticaux)
  if (variant === 'floating') {
    return (
      <div className={`fixed top-4 left-4 z-50 flex flex-col space-y-2 ${className}`}>
        {showHomeButton && (
          <Button
            onClick={handleHomeClick}
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Retour à l'accueil"
          >
            <Home className="h-5 w-5 mr-2" />
            Accueil
          </Button>
        )}
        
        {showBackButton && (
          <Button
            onClick={handleBackClick}
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
        )}
      </div>
    );
  }

  // Variant complet avec menu
  return (
    <div className={`fixed top-4 left-4 z-50 ${className}`}>
      {/* Bouton menu mobile */}
      <div className="md:hidden">
        <Button
          onClick={handleMenuToggle}
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Menu de navigation"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl p-2 min-w-[200px]">
          {showHomeButton && (
            <Button
              onClick={handleHomeClick}
              variant="ghost"
              className="w-full justify-start bg-transparent hover:bg-gray-100"
            >
              <Home className="h-4 w-4 mr-2" />
              Accueil
            </Button>
          )}
          
          {showBackButton && (
            <Button
              onClick={handleBackClick}
              variant="ghost"
              className="w-full justify-start bg-transparent hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          )}
        </div>
      )}

      {/* Menu desktop */}
      <div className="hidden md:flex flex-col space-y-2">
        {showHomeButton && (
          <Button
            onClick={handleHomeClick}
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Retour à l'accueil"
          >
            <Home className="h-5 w-5 mr-2" />
            Accueil
          </Button>
        )}
        
        {showBackButton && (
          <Button
            onClick={handleBackClick}
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
        )}
      </div>
    </div>
  );
}

// Composant par défaut (compact)
export default function UniversalNavigationDefault() {
  return <UniversalNavigation variant="compact" />;
} 