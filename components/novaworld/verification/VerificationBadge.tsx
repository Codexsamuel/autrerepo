'use client';

import { Badge } from '@/components/ui/badge';
import { AlertCircle, Building, CheckCircle, Crown, Shield, Star, User } from 'lucide-react';

interface VerificationBadgeProps {
  type: 'basic' | 'verified' | 'premium' | 'enterprise';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function VerificationBadge({ type, size = 'md', showLabel = true }: VerificationBadgeProps) {
  const badgeConfig = {
    basic: {
      icon: User,
      color: 'bg-gray-100 text-gray-800 border-gray-300',
      label: 'Profil basique',
      description: 'Profil standard sans vérification'
    },
    verified: {
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      label: 'Vérifié',
      description: 'Profil vérifié et authentifié'
    },
    premium: {
      icon: Star,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      label: 'Premium',
      description: 'Accès aux fonctionnalités avancées'
    },
    enterprise: {
      icon: Crown,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      label: 'Entreprise',
      description: 'Compte entreprise certifié'
    }
  };

  const config = badgeConfig[type];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge 
        variant="outline" 
        className={`${config.color} ${sizeClasses[size]} border-2 font-semibold flex items-center space-x-1`}
      >
        <IconComponent className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}`} />
        {showLabel && <span>{config.label}</span>}
      </Badge>
      {showLabel && (
        <span className="text-xs text-gray-600">{config.description}</span>
      )}
    </div>
  );
}

// Composant pour afficher le statut de vérification d'une entreprise
export function CompanyVerificationBadge({ 
  isVerified, 
  hasDocuments, 
  size = 'md' 
}: { 
  isVerified: boolean; 
  hasDocuments: boolean; 
  size?: 'sm' | 'md' | 'lg'; 
}) {
  if (!isVerified) {
    return (
      <Badge 
        variant="outline" 
        className="bg-red-100 text-red-800 border-red-300 text-xs px-2 py-1"
      >
        <AlertCircle className="w-3 h-3 mr-1" />
        Non vérifiée
      </Badge>
    );
  }

  if (!hasDocuments) {
    return (
      <Badge 
        variant="outline" 
        className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs px-2 py-1"
      >
        <Shield className="w-3 h-3 mr-1" />
        En attente de documents
      </Badge>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-green-100 text-green-800 border-green-300 text-xs px-2 py-1"
    >
      <CheckCircle className="w-3 h-3 mr-1" />
      Vérifiée
    </Badge>
  );
}

// Composant pour afficher le niveau de poste hiérarchique
export function PositionBadge({ 
  position, 
  size = 'md' 
}: { 
  position: string; 
  size?: 'sm' | 'md' | 'lg'; 
}) {
  const getPositionLevel = (pos: string) => {
    const lowerPos = pos.toLowerCase();
    
    if (lowerPos.includes('ceo') || lowerPos.includes('directeur général') || lowerPos.includes('fondateur')) {
      return { level: 'C-Level', color: 'bg-red-100 text-red-800 border-red-300', icon: Crown };
    }
    if (lowerPos.includes('directeur') || lowerPos.includes('cto') || lowerPos.includes('cfo')) {
      return { level: 'Directeur', color: 'bg-orange-100 text-orange-800 border-orange-300', icon: Star };
    }
    if (lowerPos.includes('manager') || lowerPos.includes('chef de')) {
      return { level: 'Manager', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Building };
    }
    if (lowerPos.includes('entrepreneur') || lowerPos.includes('investisseur')) {
      return { level: 'Entrepreneur', color: 'bg-purple-100 text-purple-800 border-purple-300', icon: User };
    }
    
    return { level: 'Professionnel', color: 'bg-gray-100 text-gray-800 border-gray-300', icon: User };
  };

  const { level, color, icon: IconComponent } = getPositionLevel(position);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant="outline" 
      className={`${color} ${sizeClasses[size]} border-2 font-semibold flex items-center space-x-1`}
    >
      <IconComponent className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      <span>{level}</span>
    </Badge>
  );
} 