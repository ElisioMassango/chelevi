import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pt } from '../locales/pt';
import { en } from '../locales/en';

type Language = 'pt' | 'en';

type Translations = typeof pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt,
  en,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get language from localStorage or default to 'pt'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('chelevi_language') as Language;
    return saved && (saved === 'pt' || saved === 'en') ? saved : 'pt';
  });

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem('chelevi_language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for easy translation access
export const useTranslation = () => {
  const { t } = useLanguage();
  return t;
};

