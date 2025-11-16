import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'MT' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number; // 1 EUR = 75.33 MT
  convertToDisplay: (priceInMT: number) => number; // Converte MT para a moeda selecionada
  formatPrice: (priceInMT: number) => string; // Formata o preço na moeda selecionada
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE = 75.33; // 1 EUR = 75.33 MT

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // Load from localStorage or default to MT
    const saved = localStorage.getItem('chelevi_currency');
    return (saved === 'EUR' || saved === 'MT') ? saved : 'MT';
  });

  useEffect(() => {
    // Save to localStorage when currency changes
    localStorage.setItem('chelevi_currency', currency);
  }, [currency]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const convertToDisplay = (priceInMT: number): number => {
    if (currency === 'EUR') {
      return priceInMT / EXCHANGE_RATE;
    }
    return priceInMT;
  };

  const formatPrice = (priceInMT: number): string => {
    const displayPrice = convertToDisplay(priceInMT);
    
    // Format with comma for values >= 1000
    let formatted: string;
    if (displayPrice >= 1000) {
      formatted = displayPrice.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    } else {
      formatted = displayPrice.toFixed(2);
    }

    // Add currency symbol
    return `${formatted} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate: EXCHANGE_RATE,
        convertToDisplay,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};


