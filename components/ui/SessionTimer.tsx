'use client';

import { useSession } from '@/components/providers/SessionProvider';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes

export function SessionTimer() {
  const [isClient, setIsClient] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
    try {
      const { isAuthenticated, sessionStartTime } = useSession();
      setSessionData({ isAuthenticated, sessionStartTime });
    } catch (error) {
      // Ignore useSession error during SSR
      setSessionData({ isAuthenticated: false, sessionStartTime: null });
    }
  }, []);

  useEffect(() => {
    if (!isClient || !sessionData) return;

    const { isAuthenticated, sessionStartTime } = sessionData;
    
    if (isAuthenticated || !sessionStartTime) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - sessionStartTime;
      const remaining = Math.max(0, SESSION_TIMEOUT - elapsed);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isClient, sessionData]);

  // During SSR or before client hydration, render nothing
  if (!isClient || !sessionData) {
    return null;
  }

  const { isAuthenticated } = sessionData;

  if (isAuthenticated || timeLeft === 0) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const isWarning = timeLeft < 60000; // Moins d'1 minute

  return (
    <div className={`fixed top-4 right-4 z-40 transition-all duration-300 ${
      isWarning ? 'animate-pulse' : ''
    }`}>
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg ${
        isWarning 
          ? 'bg-red-500 text-white' 
          : 'bg-yellow-500 text-white'
      }`}>
        {isWarning ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Clock className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
        <div className="flex space-x-1">
          <Button 
            asChild 
            size="sm" 
            variant="outline" 
            className={`text-xs ${
              isWarning 
                ? 'border-white text-white hover:bg-white hover:text-red-500' 
                : 'border-white text-white hover:bg-white hover:text-yellow-500'
            }`}
          >
            <Link href="/sign-in">Connexion</Link>
          </Button>
          <Button 
            asChild 
            size="sm" 
            variant="outline" 
            className={`text-xs ${
              isWarning 
                ? 'border-white text-white hover:bg-white hover:text-red-500' 
                : 'border-white text-white hover:bg-white hover:text-yellow-500'
            }`}
          >
            <Link href="/sign-up">Inscription</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 