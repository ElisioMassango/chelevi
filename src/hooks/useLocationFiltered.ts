import { useState, useEffect, useCallback } from 'react';
import { apiService, Country, State, City } from '../services/api';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';

// Hook for filtered countries (only Mozambique and Portugal)
export function useCountriesFiltered() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      logger.userAction('Fetching filtered countries list');
      
      const response = await apiService.getCountryList();
      
      if (response.status === 1) {
        // Filter only Mozambique (id: 150) and Portugal (id: 177)
        const filteredCountries = response.data.filter(
          country => country.id === 150 || country.id === 177
        );
        setCountries(filteredCountries);
        logger.info('Filtered countries fetched successfully', { count: filteredCountries.length });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to fetch countries', { error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch countries';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Error fetching countries', { error: err });
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array is correct here

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return { countries, loading, error, refetch: fetchCountries };
}

// Hook for state list
export function useStates(countryId?: string) {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStates = useCallback(async (id: string) => {
    if (!id) {
      setStates([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      logger.userAction('Fetching states list', { countryId: id });
      
      const response = await apiService.getStateList(id);
      
      if (response.status === 1) {
        setStates(response.data);
        logger.info('States fetched successfully', { countryId: id, count: response.data.length });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to fetch states', { countryId: id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch states';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Error fetching states', { countryId: id, error: err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (countryId) {
      fetchStates(countryId);
    } else {
      setStates([]);
    }
  }, [countryId, fetchStates]);

  return { states, loading, error, refetch: fetchStates };
}

// Hook for city list
export function useCities(stateId?: string) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async (id: string) => {
    if (!id) {
      setCities([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      logger.userAction('Fetching cities list', { stateId: id });
      
      const response = await apiService.getCityList(id);
      
      if (response.status === 1) {
        setCities(response.data);
        logger.info('Cities fetched successfully', { stateId: id, count: response.data.length });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to fetch cities', { stateId: id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch cities';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Error fetching cities', { stateId: id, error: err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (stateId) {
      fetchCities(stateId);
    } else {
      setCities([]);
    }
  }, [stateId, fetchCities]);

  return { cities, loading, error, refetch: fetchCities };
}

// Combined hook for location selection with filtered countries
export function useLocationSelectionFiltered() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const { countries, loading: countriesLoading, error: countriesError } = useCountriesFiltered();
  const { states, loading: statesLoading, error: statesError } = useStates(selectedCountry);
  const { cities, loading: citiesLoading, error: citiesError } = useCities(selectedState);

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    setSelectedState(''); // Reset state when country changes
    setSelectedCity(''); // Reset city when country changes
  };

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setSelectedCity(''); // Reset city when state changes
  };

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const reset = () => {
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
  };

  return {
    // Data
    countries,
    states,
    cities,
    
    // Selected values
    selectedCountry,
    selectedState,
    selectedCity,
    
    // Loading states
    countriesLoading,
    statesLoading,
    citiesLoading,
    loading: countriesLoading || statesLoading || citiesLoading,
    
    // Error states
    countriesError,
    statesError,
    citiesError,
    error: countriesError || statesError || citiesError,
    
    // Handlers
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    reset,
  };
}
