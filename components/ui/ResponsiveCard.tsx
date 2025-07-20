'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  loading?: boolean;
  error?: boolean;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  loading = false,
  error = false
}) => {
  const paddingClasses = {
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200' : '';

  const cardClasses = cn(
    'bg-white rounded-xl border border-gray-200',
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    'mobile-card', // Classe pour les styles mobiles spécifiques
    className
  );

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(cardClasses, 'border-red-200 bg-red-50')}>
        <div className="flex items-center space-x-2 text-red-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Erreur de chargement</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default ResponsiveCard; 