'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Settings, 
  User, 
  Bell,
  LogOut,
  Crown
} from 'lucide-react';

interface CompanyInfo {
  name: string;
  logo?: string;
  industry: string;
  subscriptionPlan?: string;
  subscriptionStatus?: 'active' | 'trial' | 'expired';
}

interface CompanyHeaderProps {
  companyInfo?: CompanyInfo;
  onLogout?: () => void;
  onSettings?: () => void;
}

export default function CompanyHeader({ 
  companyInfo, 
  onLogout, 
  onSettings 
}: CompanyHeaderProps) {
  const [currentCompany, setCurrentCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    // Récupérer les informations de l'entreprise depuis le localStorage
    const savedCompany = localStorage.getItem('company-info');
    if (savedCompany) {
      setCurrentCompany(JSON.parse(savedCompany));
    } else if (companyInfo) {
      setCurrentCompany(companyInfo);
      localStorage.setItem('company-info', JSON.stringify(companyInfo));
    }
  }, [companyInfo]);

  const getSubscriptionBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center space-x-1 text-green-600">
            <Crown className="w-3 h-3" />
            <span className="text-xs font-medium">Actif</span>
          </div>
        );
      case 'trial':
        return (
          <div className="flex items-center space-x-1 text-orange-600">
            <Crown className="w-3 h-3" />
            <span className="text-xs font-medium">Essai</span>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center space-x-1 text-red-600">
            <Crown className="w-3 h-3" />
            <span className="text-xs font-medium">Expiré</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentCompany) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">EZEE Optimus</h1>
              <p className="text-sm text-gray-600">Système de gestion intelligent</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentCompany.logo} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {currentCompany.name ? currentCompany.name.charAt(0) : 'E'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">{currentCompany.name}</h1>
              {getSubscriptionBadge(currentCompany.subscriptionStatus)}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="capitalize">{currentCompany.industry}</span>
              {currentCompany.subscriptionPlan && (
                <span>• {currentCompany.subscriptionPlan}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onSettings}>
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-100">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 