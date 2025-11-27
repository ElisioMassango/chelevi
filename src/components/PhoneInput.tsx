import React, { useState, useEffect } from 'react';
import { Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { validatePhoneNumber, validateWhatsAppNumber, formatPhoneForDisplay, getPhoneErrorMessage, getWhatsAppErrorMessage } from '../utils/phoneUtils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  whatsappOnly?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = 'Seu número de telefone',
  required = false,
  whatsappOnly = false,
  className = '',
  label,
  error
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // Validate phone number
  useEffect(() => {
    if (!value) {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    const isValidPhone = whatsappOnly ? validateWhatsAppNumber(value) : validatePhoneNumber(value);
    const errorMsg = whatsappOnly ? getWhatsAppErrorMessage(value) : getPhoneErrorMessage(value);
    
    setIsValid(isValidPhone);
    setErrorMessage(errorMsg);
  }, [value, whatsappOnly]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Remove all non-digit characters except +
    inputValue = inputValue.replace(/[^\d+]/g, '');
    
    // Limit length
    if (inputValue.length > 15) {
      inputValue = inputValue.substring(0, 15);
    }
    
    onChange(inputValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const displayError = error || errorMessage;
  const showError = displayError && !isFocused;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone size={18} className="text-gray-400" />
        </div>
        
        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`
            w-full pl-10 pr-10 py-3 border rounded-lg transition-colors
            ${showError 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : isValid === true 
                ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${className}
          `}
        />
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isValid === true && (
            <CheckCircle size={18} className="text-green-500" />
          )}
          {isValid === false && value && (
            <AlertCircle size={18} className="text-red-500" />
          )}
        </div>
      </div>
      
      {showError && (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{displayError}</span>
        </div>
      )}
      
      {isValid === true && value && (
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle size={14} />
          <span>
            {whatsappOnly ? 'Número WhatsApp válido' : 'Número de telefone válido'}
          </span>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-1">
        <p className="font-medium">Deve ser um número válido do WhatsApp</p>
        <p className="mt-1">Moçambique: +258 8X XXX XXX ou 8X XXX XXX</p>
        <p>Portugal: +351 9XX XXX XXX ou 9XX XXX XXX</p>
        <p className="mt-1 text-gray-400">Exemplos: +258 84 123 456 ou +351 912 345 678</p>
      </div>
    </div>
  );
};

export default PhoneInput;
