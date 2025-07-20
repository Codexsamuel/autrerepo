'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  autoFit?: boolean;
  autoFill?: boolean;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  autoFit = false,
  autoFill = false
}) => {
  // Classes de grille responsive
  const gridColsClasses = autoFit 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : autoFill
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
    : `grid-cols-${cols.mobile || 1} md:grid-cols-${cols.tablet || 2} lg:grid-cols-${cols.desktop || 3}`;

  const gapClasses = `gap-${gap.mobile || 4} md:gap-${gap.tablet || 6} lg:gap-${gap.desktop || 8}`;

  const gridClasses = cn(
    'grid',
    gridColsClasses,
    gapClasses,
    'mobile-grid', // Classe pour les styles mobiles spécifiques
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;

// Composant pour les éléments de grille
interface ResponsiveGridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function ResponsiveGridItem({
  children,
  className = '',
  span = { mobile: 1, tablet: 1, desktop: 1 }
}: ResponsiveGridItemProps) {
  const getGridSpan = () => {
    return cn(
      `col-span-${span.mobile || 1}`,
      `md:col-span-${span.tablet || span.mobile || 1}`,
      `lg:col-span-${span.desktop || span.tablet || span.mobile || 1}`
    )
  }

  return (
    <div className={cn(
      'mobile:col-span-1',
      getGridSpan(),
      className
    )}>
      {children}
    </div>
  )
} 