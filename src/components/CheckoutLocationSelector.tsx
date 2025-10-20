import React from 'react';
import { useLocationSelectionFiltered } from '../hooks/useLocationFiltered';
import { ChevronDown } from 'lucide-react';

interface CheckoutLocationSelectorProps {
  onLocationChange?: (location: {
    country: string;
    state: string;
    city: string;
  }) => void;
  className?: string;
  showLabels?: boolean;
  required?: boolean;
}

const CheckoutLocationSelector: React.FC<CheckoutLocationSelectorProps> = ({
  onLocationChange,
  className = '',
  showLabels = true,
  required = false,
}) => {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    countriesLoading,
    statesLoading,
    citiesLoading,
    countriesError,
    statesError,
    citiesError,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useLocationSelectionFiltered();

  // Notify parent component when location changes
  React.useEffect(() => {
    if (onLocationChange && selectedCountry && selectedState && selectedCity) {
      onLocationChange({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      });
    }
  }, [selectedCountry, selectedState, selectedCity]); // Removed onLocationChange from dependencies

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Selection */}
      <div className="form-group">
        {showLabels && (
          <label className="form-label">
            País {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="form-input pr-10 appearance-none"
            required={required}
            disabled={countriesLoading}
          >
            <option value="">
              {countriesLoading ? 'Carregando países...' : 'Selecione um país'}
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id.toString()}>
                {country.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
        {countriesError && (
          <p className="text-red-500 text-sm mt-1">{countriesError}</p>
        )}
      </div>

      {/* State Selection */}
      {selectedCountry && (
        <div className="form-group">
          {showLabels && (
            <label className="form-label">
              {selectedCountry === '150' ? 'Província' : 'Distrito'} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="form-input pr-10 appearance-none"
              required={required}
              disabled={statesLoading}
            >
              <option value="">
                {statesLoading ? 'Carregando...' : `Selecione uma ${selectedCountry === '150' ? 'província' : 'distrito'}`}
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.id.toString()}>
                  {state.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          {statesError && (
            <p className="text-red-500 text-sm mt-1">{statesError}</p>
          )}
        </div>
      )}

      {/* City Selection */}
      {selectedState && (
        <div className="form-group">
          {showLabels && (
            <label className="form-label">
              Cidade {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="form-input pr-10 appearance-none"
              required={required}
              disabled={citiesLoading}
            >
              <option value="">
                {citiesLoading ? 'Carregando cidades...' : 'Selecione uma cidade'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id.toString()}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          {citiesError && (
            <p className="text-red-500 text-sm mt-1">{citiesError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutLocationSelector;
