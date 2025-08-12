'use client';

import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './button';

interface HomeButtonProps {
  variant?: 'home' | 'back';
  className?: string;
  showText?: boolean;
}

export function HomeButton({ 
  variant = 'home', 
  className = '',
  showText = true 
}: HomeButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (variant === 'back') {
      router.back();
    } else {
      router.push('/');
    }
  };

  const buttonContent = (
    <>
      {variant === 'home' ? (
        <Home className="h-5 w-5" />
      ) : (
        <ArrowLeft className="h-5 w-5" />
      )}
      {showText && (
        <span className="ml-2">
          {variant === 'home' ? 'Accueil' : 'Retour'}
        </span>
      )}
    </>
  );

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className={`fixed top-4 left-4 z-50 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
      aria-label={variant === 'home' ? 'Retour à l\'accueil' : 'Retour à la page précédente'}
    >
      {buttonContent}
    </Button>
  );
}

// Composant de navigation flottante avec bouton accueil et retour
export function FloatingNavigation() {
  const router = useRouter();

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col space-y-2">
      {/* Bouton Accueil */}
      <Button
        onClick={() => router.push('/')}
        variant="ghost"
        size="sm"
        className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Retour à l'accueil"
      >
        <Home className="h-5 w-5 mr-2" />
        Accueil
      </Button>

      {/* Bouton Retour */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        size="sm"
        className="bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Retour à la page précédente"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour
      </Button>
    </div>
  );
}

// Composant de navigation compacte (icônes seulement)
export function CompactHomeButton() {
  const router = useRouter();

  return (
    <div className="fixed top-4 left-4 z-50 flex space-x-2">
      {/* Bouton Accueil Compact */}
      <Button
        onClick={() => router.push('/')}
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Retour à l'accueil"
      >
        <Home className="h-5 w-5" />
      </Button>

      {/* Bouton Retour Compact */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Retour à la page précédente"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
    </div>
  );
} 