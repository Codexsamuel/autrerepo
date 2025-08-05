"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Euro, Coins } from 'lucide-react';

// Types pour la gestion des devises
interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

interface PricingInfo {
  originalPrice: number;
  originalCurrency: string;
  sellingPrice: number;
  sellingCurrency: string;
  profitMargin: number;
  profitAmount: number;
  markupPercentage: number;
  source: string;
}

interface CurrencyContextType {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  calculatePrice: (originalPrice: number, originalCurrency: string, source: string) => Promise<PricingInfo>;
  formatPrice: (price: number, currency?: string) => string;
  getCurrencySymbol: (currency?: string) => string;
  availableCurrencies: Currency[];
  isLoading: boolean;
  isAdmin: boolean;
}

// Devises supportées
const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'FCFA', name: 'Franc CFA', symbol: 'FCFA', flag: '🇨🇲' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' }
];

// Créer le contexte
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Composant principal du provider
interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: string;
  isAdmin?: boolean;
}

export function CurrencyProvider({ 
  children, 
  defaultCurrency = 'EUR',
  isAdmin = false 
}: CurrencyProviderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(SUPPORTED_CURRENCIES);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour changer de devise
  const setCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-currency', currency);
    }
  };

  // Fonction pour calculer le prix avec marge
  const calculatePrice = async (
    originalPrice: number, 
    originalCurrency: string, 
    source: string
  ): Promise<PricingInfo> => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/pricing?action=calculate&price=${originalPrice}&currency=${originalCurrency}&targetCurrency=${selectedCurrency}&source=${source}&admin=${isAdmin}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.data;
        }
      }

      // Fallback en cas d'erreur
      return {
        originalPrice,
        originalCurrency,
        sellingPrice: originalPrice,
        sellingCurrency: selectedCurrency,
        profitMargin: 0.35,
        profitAmount: originalPrice * 0.35,
        markupPercentage: 35,
        source
      };
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      
      // Fallback en cas d'erreur
      return {
        originalPrice,
        originalCurrency,
        sellingPrice: originalPrice,
        sellingCurrency: selectedCurrency,
        profitMargin: 0.35,
        profitAmount: originalPrice * 0.35,
        markupPercentage: 35,
        source
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour formater le prix
  const formatPrice = (price: number, currency?: string): string => {
    const targetCurrency = currency || selectedCurrency;
    const currencyInfo = availableCurrencies.find(c => c.code === targetCurrency);
    
    if (!currencyInfo) {
      return `${price.toFixed(2)} ${targetCurrency}`;
    }

    // Formatage spécial pour FCFA
    if (targetCurrency === 'FCFA') {
      return `${price.toLocaleString('fr-FR')} FCFA`;
    }

    // Formatage pour les autres devises
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return formatter.format(price);
  };

  // Fonction pour obtenir le symbole de la devise
  const getCurrencySymbol = (currency?: string): string => {
    const targetCurrency = currency || selectedCurrency;
    const currencyInfo = availableCurrencies.find(c => c.code === targetCurrency);
    return currencyInfo?.symbol || targetCurrency;
  };

  // Charger la devise préférée depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('preferred-currency');
      if (savedCurrency) {
        setSelectedCurrency(savedCurrency);
      }
    }
  }, []);

  const value: CurrencyContextType = {
    selectedCurrency,
    setCurrency,
    calculatePrice,
    formatPrice,
    getCurrencySymbol,
    availableCurrencies,
    isLoading,
    isAdmin
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Composant de sélection de devise
interface CurrencySelectorProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'compact';
}

export function CurrencySelector({ 
  className = '', 
  showIcon = true, 
  variant = 'default' 
}: CurrencySelectorProps) {
  const { selectedCurrency, setCurrency, availableCurrencies, isLoading } = useCurrency();

  const currentCurrency = availableCurrencies.find(curr => curr.code === selectedCurrency);

  if (variant === 'compact') {
    return (
      <Select value={selectedCurrency} onValueChange={setCurrency} disabled={isLoading}>
        <SelectTrigger className={`w-20 ${className}`}>
          <SelectValue>
            {showIcon && <Coins className="h-3 w-3 mr-1" />}
            {currentCurrency?.symbol || currentCurrency?.code}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{currency.symbol}</span>
                <span className="text-xs text-gray-500">({currency.code})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select value={selectedCurrency} onValueChange={setCurrency} disabled={isLoading}>
      <SelectTrigger className={`w-48 ${className}`}>
        <SelectValue>
          <div className="flex items-center space-x-2">
            {showIcon && <DollarSign className="h-4 w-4" />}
            <span>{currentCurrency?.name}</span>
            <span className="text-gray-500">({currentCurrency?.symbol})</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableCurrencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{currency.name}</span>
                <span className="text-gray-500">({currency.symbol})</span>
              </div>
              <span className="text-xs text-gray-400">{currency.code}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Composant pour afficher un prix avec marge
interface PricedProductProps {
  originalPrice: number;
  originalCurrency: string;
  source: string;
  className?: string;
  showOriginalPrice?: boolean;
  showProfitInfo?: boolean;
}

export function PricedProduct({ 
  originalPrice, 
  originalCurrency, 
  source, 
  className = '',
  showOriginalPrice = false,
  showProfitInfo = false 
}: PricedProductProps) {
  const { calculatePrice, formatPrice, isLoading, isAdmin } = useCurrency();
  const [pricingInfo, setPricingInfo] = useState<PricingInfo | null>(null);

  useEffect(() => {
    async function loadPricing() {
      const pricing = await calculatePrice(originalPrice, originalCurrency, source);
      setPricingInfo(pricing);
    }

    loadPricing();
  }, [originalPrice, originalCurrency, source, calculatePrice]);

  if (isLoading || !pricingInfo) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">
          {formatPrice(pricingInfo.sellingPrice)}
        </span>
        
        {showOriginalPrice && (
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(pricingInfo.originalPrice, pricingInfo.originalCurrency)}
          </span>
        )}
      </div>

      {showProfitInfo && isAdmin && (
        <div className="mt-1 text-xs text-gray-600">
          <div>Marge: {pricingInfo.markupPercentage}%</div>
          <div>Bénéfice: {formatPrice(pricingInfo.profitAmount)}</div>
          <div>Source: {pricingInfo.source}</div>
        </div>
      )}

      {!showOriginalPrice && pricingInfo.originalPrice !== pricingInfo.sellingPrice && (
        <Badge variant="secondary" className="mt-1 text-xs">
          -{Math.round(((pricingInfo.originalPrice - pricingInfo.sellingPrice) / pricingInfo.originalPrice) * 100)}%
        </Badge>
      )}
    </div>
  );
}

// Composant pour afficher les informations de marge (admin uniquement)
interface ProfitInfoProps {
  pricingInfo: PricingInfo;
  className?: string;
}

export function ProfitInfo({ pricingInfo, className = '' }: ProfitInfoProps) {
  const { formatPrice, isAdmin } = useCurrency();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={`${className} p-3 bg-gray-50 rounded-lg border`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Informations de Marge (Admin)</h4>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Prix original:</span>
          <span>{formatPrice(pricingInfo.originalPrice, pricingInfo.originalCurrency)}</span>
        </div>
        <div className="flex justify-between">
          <span>Prix de vente:</span>
          <span>{formatPrice(pricingInfo.sellingPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Marge bénéficiaire:</span>
          <span>{pricingInfo.markupPercentage}%</span>
        </div>
        <div className="flex justify-between">
          <span>Bénéfice:</span>
          <span>{formatPrice(pricingInfo.profitAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Source:</span>
          <span className="capitalize">{pricingInfo.source}</span>
        </div>
      </div>
    </div>
  );
} 