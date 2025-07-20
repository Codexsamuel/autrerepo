'use client';

import React from 'react';
import MobileNavigation from './MobileNavigation';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`responsive-layout ${className}`}>
      {/* Navigation mobile */}
      <MobileNavigation />
      
      {/* Contenu principal avec padding adaptatif */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default ResponsiveLayout; 