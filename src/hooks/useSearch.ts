import { useState, useCallback } from 'react';
import { apiService, Product } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { logger } from '../utils/logger';

interface UseSearchReturn {
  results: Product[];
  isSearching: boolean;
  error: string | null;
  searchProducts: (query: string) => Promise<void>;
  clearResults: () => void;
  hasSearched: boolean;
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    
    logger.userAction('Product search', { query, isAuthenticated: !!user });

    try {
      let response;
      
      if (user) {
        response = await apiService.searchProducts(query);
      } else {
        response = await apiService.searchProductsGuest(query);
      }

      if (response.status === 1) {
        setResults(response.data);
        logger.userAction('Search completed', { 
          query, 
          resultsCount: response.data.length,
          isAuthenticated: !!user 
        });
      } else {
        setError(response.message);
        setResults([]);
        logger.warn('Search failed', { query, error: response.message });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      setResults([]);
      logger.error('Search error', { query, error: err });
    } finally {
      setIsSearching(false);
    }
  }, [user]);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    results,
    isSearching,
    error,
    searchProducts,
    clearResults,
    hasSearched
  };
}

// Debounced version of useSearch for real-time search
export function useSearchDebounced(delay: number = 300): UseSearchReturn {
  const search = useSearch();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(async (query: string) => {
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      search.searchProducts(query);
    }, delay);
    
    setTimeoutId(newTimeoutId);
  }, [search, delay, timeoutId]);

  return {
    ...search,
    searchProducts: debouncedSearch
  };
}
