import React, { useState, useRef, useEffect } from 'react';
import { DollarSign, ChevronDown } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currencies = [
    { code: 'MT' as const, name: 'Metical', symbol: 'MT', flag: '🇲🇿' },
    { code: 'EUR' as const, name: 'Euro', symbol: '€', flag: '🇪🇺' },
  ];

  const currentCurrency = currencies.find(curr => curr.code === currency) || currencies[0];

  const handleCurrencyChange = (currCode: 'MT' | 'EUR') => {
    setCurrency(currCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
        aria-label="Select currency"
      >
        <DollarSign size={16} />
        <span className="hidden sm:inline">{currentCurrency.flag} {currentCurrency.symbol}</span>
        <span className="sm:hidden">{currentCurrency.symbol}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[140px] z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleCurrencyChange(curr.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                currency === curr.code ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <span>{curr.flag}</span>
              <span className="text-black">{curr.name} ({curr.symbol})</span>
              {currency === curr.code && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;

