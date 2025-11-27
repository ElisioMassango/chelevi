import React, { useState, useEffect } from 'react';
import { Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { validateMpesaNumber, getMpesaErrorMessage, formatMpesaNumber } from '../utils/phoneUtils';

interface MpesaPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const MpesaPhoneInput: React.FC<MpesaPhoneInputProps> = ({
  value,
  onChange,
  placeholder = '8X XXXXXXX',
  required = false,
  className = '',
  label,
  error
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>('');

  // Format display value
  useEffect(() => {
    if (value) {
      setDisplayValue(formatMpesaNumber(value));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  // Validate phone number
  useEffect(() => {
    if (!value) {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    const isValidPhone = validateMpesaNumber(value);
    const errorMsg = getMpesaErrorMessage(value);
    
    setIsValid(isValidPhone);
    setErrorMessage(errorMsg);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Remove all non-digit characters
    inputValue = inputValue.replace(/\D/g, '');
    
    // Limit to 9 digits
    if (inputValue.length > 9) {
      inputValue = inputValue.substring(0, 9);
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
  const showError = displayError && !isFocused && value;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Phone size={20} />
        </div>
        <input
          type="tel"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            showError
              ? 'border-red-500 focus:ring-red-500'
              : isValid === true
              ? 'border-green-500 focus:ring-green-500'
              : 'border-gray-300 focus:ring-primary'
          }`}
        />
        {isValid === true && !showError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <CheckCircle size={20} />
          </div>
        )}
        {showError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <AlertCircle size={20} />
          </div>
        )}
      </div>
      
      {showError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={16} />
          {displayError}
        </p>
      )}
      
      {!showError && value && (
        <div className="text-xs text-gray-500 space-y-1 mt-2">
          <p className="font-medium">Digite o número M-Pesa registrado (sem +258)</p>
          <p>Moçambique: 8X XXXXXXX</p>
          <p>Exemplos: 84 123 4567 ou 85 987 6543</p>
        </div>
      )}
      
      {!value && (
        <div className="text-xs text-gray-500 space-y-1 mt-2">
          <p className="font-medium">Digite o número M-Pesa registrado (sem +258)</p>
          <p>Moçambique: 8X XXXXXXX</p>
          <p>Exemplos: 84 123 4567 ou 85 987 6543</p>
        </div>
      )}
    </div>
  );
};

export default MpesaPhoneInput;

