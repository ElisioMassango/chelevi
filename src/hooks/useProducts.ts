import { useState, useEffect } from 'react';
import { apiService, Product, ProductDetailResponse, ProductVariant, CartResponse, PaginatedResponse, ApiResponse } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Hook for product detail
export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<ProductDetailResponse>;
        
        if (user) {
          response = await apiService.getProductDetail(productId);
        } else {
          response = await apiService.getProductDetailGuest(productId);
        }
        
        if (response.status === 1) {
          setProduct(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, user]);

  return { product, loading, error };
}

// Hook for bestseller products
export function useBestsellerProducts(categoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<PaginatedResponse<Product>>;
        
        if (user) {
          response = await apiService.getBestsellerProducts(categoryId);
        } else {
          response = await apiService.getBestsellerProductsGuest(categoryId);
        }
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bestsellers');
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, [categoryId, user]);

  return { products, pagination, loading, error };
}

// Hook for featured products
export function useFeaturedProducts() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<any[]>;
        
        if (user) {
          response = await apiService.getFeaturedProducts();
        } else {
          response = await apiService.getFeaturedProductsGuest();
        }
        
        if (response.status === 1) {
          setCategories(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [user]);

  return { categories, loading, error };
}

// Hook for recent products
export function useRecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<PaginatedResponse<Product>>;
        
        if (user) {
          response = await apiService.getRecentProducts();
        } else {
          response = await apiService.getRecentProductsGuest();
        }
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recent products');
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, [user]);

  return { products, pagination, loading, error };
}

// Hook for related products
export function useRelatedProducts(productId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!productId) return;

    const fetchRelated = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<PaginatedResponse<Product>>;
        
        if (user) {
          response = await apiService.getRelatedProducts(productId);
        } else {
          response = await apiService.getRelatedProductsGuest(productId);
        }
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch related products');
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [productId, user]);

  return { products, pagination, loading, error };
}

// Hook for discount products
export function useDiscountProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getDiscountProducts();
        
        if (response.status === 1) {
          setProducts(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch discount products');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscount();
  }, []);

  return { products, pagination, loading, error };
}

// Hook for cart management
export function useCartApi(customerId: string) {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    if (!customerId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCartList(customerId);
      
      if (response.status === 1) {
        setCart(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [customerId]);

  const addToCart = async (productId: string, quantity: number, variantId?: string) => {
    try {
      const response = await apiService.addToCart({
        customerId,
        productId,
        quantity,
        variantId,
      });
      
      if (response.status === 1) {
        await fetchCart(); // Refresh cart
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      throw err;
    }
  };

  const updateQuantity = async (productId: string, quantityType: 'increase' | 'decrease', variantId?: string) => {
    try {
      const response = await apiService.updateCartQuantity({
        customerId,
        productId,
        quantityType,
        variantId,
      });
      
      if (response.status === 1) {
        await fetchCart(); // Refresh cart
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart');
      throw err;
    }
  };

  const checkCart = async () => {
    try {
      const response = await apiService.checkCart(customerId);
      return response.status === 1;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check cart');
      return false;
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    checkCart,
    refetch: fetchCart,
  };
}

// Hook for product variants
export function useProductVariants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVariantInfo = async (data: {
    productId: string;
    customerId: string;
    variant: string;
    quantity: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProductVariantList(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get variant info');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkVariantStock = async (productId: string, variantSku: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.checkVariantStock(productId, variantSku);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check variant stock');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getVariantInfo,
    checkVariantStock,
    loading,
    error,
  };
}

// Hook for product ratings
export function useProductRating() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRating = async (data: {
    productId: string;
    userId: string;
    rating: number;
    title: string;
    description: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.addProductRating(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add rating');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addRating,
    loading,
    error,
  };
}