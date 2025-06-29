'use client';

import { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';
import CompanyHeader from '../layout/CompanyHeader';
import { useSubscriptionPopup } from '@/hooks/useSubscriptionPopup';

interface CompanyInfo {
  name: string;
  logo?: string;
  industry: string;
  size: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: 'active' | 'trial' | 'expired';
}

interface SubscriptionWrapperProps {
  children: React.ReactNode;
  showHeader?: boolean;
  delayMinutes?: number;
}

export default function SubscriptionWrapper({ 
  children, 
  showHeader = true,
  delayMinutes = 5 
}: SubscriptionWrapperProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { showPopup, closePopup } = useSubscriptionPopup({
    delayMinutes,
    onShow: () => {
      console.log('Popup de souscription affiché après', delayMinutes, 'minutes');
    }
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà abonné
    const savedCompany = localStorage.getItem('company-info');
    if (savedCompany) {
      const company = JSON.parse(savedCompany);
      setCompanyInfo(company);
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (plan: any, companyData: CompanyInfo) => {
    // Sauvegarder les informations de l'entreprise
    const companyWithPlan: CompanyInfo = {
      ...companyData,
      subscriptionPlan: plan.name,
      subscriptionStatus: plan.id === 'direct-access' ? 'active' : 'trial'
    };
    
    setCompanyInfo(companyWithPlan);
    setIsSubscribed(true);
    localStorage.setItem('company-info', JSON.stringify(companyWithPlan));
    
    // Simuler un paiement réussi
    if (plan.id !== 'direct-access') {
      // Ici vous intégreriez votre système de paiement (Stripe, etc.)
      console.log('Paiement traité pour:', plan.name, '€', plan.price);
    }
    
    closePopup();
    
    // Afficher une notification de succès
    alert(`Souscription réussie ! Bienvenue chez ${companyData.name}`);
  };

  const handleLogout = () => {
    setCompanyInfo(null);
    setIsSubscribed(false);
    localStorage.removeItem('company-info');
    localStorage.removeItem('subscription-popup-shown');
    window.location.reload();
  };

  const handleSettings = () => {
    // Ouvrir les paramètres de l'entreprise
    console.log('Ouvrir les paramètres');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <CompanyHeader
          companyInfo={companyInfo || undefined}
          onLogout={handleLogout}
          onSettings={handleSettings}
        />
      )}
      
      <main>
        {children}
      </main>

      {/* Popup de souscription */}
      <SubscriptionModal
        isOpen={showPopup && !isSubscribed}
        onClose={closePopup}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
} 