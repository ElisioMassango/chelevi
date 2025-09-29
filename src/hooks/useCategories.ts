import { useState, useEffect } from 'react';
import { apiService, Category, Product, PaginatedResponse, ApiResponse } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Hook for categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getMainCategoryList();
        
        if (response.status === 1) {
          setCategories(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook for trending categories
export function useTrendingCategories() {
  const [trendingCategories, setTrendingCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getTrendingCategories();
        
        if (response.status === 1) {
          setTrendingCategories(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending categories');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCategories();
  }, []);

  return { trendingCategories, loading, error };
}

// Hook for category products
export function useCategoryProducts(categoryId: string, subcategoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<PaginatedResponse<Product>>;
        
        if (user) {
          response = await apiService.getCategoryProducts(categoryId, subcategoryId);
        } else {
          response = await apiService.getCategoryProductsGuest(categoryId, subcategoryId);
        }
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId, user]);

  return { products, pagination, loading, error };
}

// Hook for trending category products
export function useTrendingCategoryProducts(mainCategoryId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!mainCategoryId) return;

    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<PaginatedResponse<Product>>;
        
        if (user) {
          response = await apiService.getTrendingCategoryProducts(mainCategoryId);
        } else {
          response = await apiService.getTrendingCategoryProductsGuest(mainCategoryId);
        }
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending products');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, [mainCategoryId, user]);

  return { products, pagination, loading, error };
}

// Hook for paginated categories
export function usePaginatedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Category> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getCategories();
        
        if (response.status === 1) {
          setCategories(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, pagination, loading, error };
}