import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { logger } from '../utils/logger';

export function useShippingDebug() {
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        
        logger.userAction('Fetching shipping methods for debug');
        
        const response = await apiService.getShippingMethods();
        
        if (response.status === 1) {
          setShippingMethods(response.data);
          logger.userAction('Shipping methods loaded', { 
            count: response.data.length,
            methods: response.data.map(m => ({ id: m.id, name: m.method_name }))
          });
        } else {
          setError(response.message);
          logger.warn('Failed to load shipping methods', { error: response.message });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch shipping methods';
        setError(errorMessage);
        logger.error('Shipping methods fetch error', { error: err });
      } finally {
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, []);

  return {
    shippingMethods,
    loading,
    error,
    debugInfo: {
      totalMethods: shippingMethods.length,
      methodIds: shippingMethods.map(m => m.id),
      methodNames: shippingMethods.map(m => m.method_name)
    }
  };
}

