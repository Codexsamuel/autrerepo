'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Crown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SessionContextType {
  isAuthenticated: boolean;
  hasSubscription: boolean;
  sessionStartTime: number | null;
  showAuthModal: boolean;
  showSubscriptionModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  setShowSubscriptionModal: (show: boolean) => void;
  login: (userData: any) => void;
  logout: () => void;
  subscribe: (plan: string) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes en millisecondes
const EXEMPT_PATHS = ['/', '/sign-in', '/sign-up', '/contact', '/a-propos'];

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const pathname = usePathname();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedSubscription = localStorage.getItem('userSubscription');
    
    if (savedUser) {
      setIsAuthenticated(true);
    }
    
    if (savedSubscription) {
      setHasSubscription(true);
    }
  }, []);

  // Démarrer le timer de session
  useEffect(() => {
    if (!isAuthenticated && !EXEMPT_PATHS.includes(pathname)) {
      const startTime = Date.now();
      setSessionStartTime(startTime);
      localStorage.setItem('sessionStartTime', startTime.toString());
    }
  }, [pathname, isAuthenticated]);

  // Vérifier le timeout de session
  useEffect(() => {
    if (!isAuthenticated && sessionStartTime && !EXEMPT_PATHS.includes(pathname)) {
      const checkTimeout = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - sessionStartTime;
        
        if (elapsed >= SESSION_TIMEOUT) {
          setShowAuthModal(true);
        }
      };

      const interval = setInterval(checkTimeout, 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, sessionStartTime, pathname]);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setSessionStartTime(null);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.removeItem('sessionStartTime');
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasSubscription(false);
    setSessionStartTime(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userSubscription');
    localStorage.removeItem('sessionStartTime');
  };

  const subscribe = (plan: string) => {
    setHasSubscription(true);
    localStorage.setItem('userSubscription', JSON.stringify({ plan, date: new Date().toISOString() }));
    setShowSubscriptionModal(false);
  };

  const value: SessionContextType = {
    isAuthenticated,
    hasSubscription,
    sessionStartTime,
    showAuthModal,
    showSubscriptionModal,
    setShowAuthModal,
    setShowSubscriptionModal,
    login,
    logout,
    subscribe,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
      
      {/* Modal de connexion forcée */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">Temps de session expiré</CardTitle>
              <p className="text-gray-600 mt-2">
                Pour continuer à naviguer, veuillez créer un compte ou vous connecter.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-3">
                <Button asChild className="flex-1">
                  <Link href="/sign-up">Créer un compte</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/sign-in">Se connecter</Link>
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthModal(false)}
                className="w-full"
              >
                Continuer en tant qu'invité (limité)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de souscription */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Accès Premium requis</CardTitle>
              <p className="text-gray-600 mt-2">
                Cette fonctionnalité nécessite un abonnement premium.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button 
                  onClick={() => subscribe('basic')}
                  className="w-full"
                >
                  Plan Basic - 29€/mois
                </Button>
                <Button 
                  onClick={() => subscribe('pro')}
                  variant="outline"
                  className="w-full"
                >
                  Plan Pro - 79€/mois
                </Button>
                <Button 
                  onClick={() => subscribe('enterprise')}
                  variant="outline"
                  className="w-full"
                >
                  Plan Enterprise - 199€/mois
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowSubscriptionModal(false)}
                className="w-full"
              >
                Plus tard
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </SessionContext.Provider>
  );
} 