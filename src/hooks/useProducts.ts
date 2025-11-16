import { useState, useEffect } from 'react';
import { apiService, Product, ProductDetailResponse, CartResponse, PaginatedResponse, ApiResponse, ShippingMethod, LoyaltyProgram, Order, OrderDetail, BillingInfo } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { getProductsPrices, VariantPriceInfo } from '../utils/productVariantPricing';

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
  const [variantPrices, setVariantPrices] = useState<Map<number, VariantPriceInfo>>(new Map());
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
          const fetchedProducts = response.data.data;
          setProducts(fetchedProducts);
          setPagination(response.data);
          
          // Fetch variant prices for products with variants (only for authenticated users)
          if (user && fetchedProducts.length > 0) {
            const prices = await getProductsPrices(fetchedProducts, user.id);
            setVariantPrices(prices);
          }
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

  return { products, pagination, loading, error, variantPrices };
}

// Hook for category products
export function useCategoryProducts(categoryId?: string, subcategoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [variantPrices, setVariantPrices] = useState<Map<number, VariantPriceInfo>>(new Map());
  const { user } = useAuth();

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryProducts = async () => {
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
          const fetchedProducts = response.data.data;
          setProducts(fetchedProducts);
          setPagination(response.data);
          
          // Fetch variant prices for products with variants (only for authenticated users)
          if (user && fetchedProducts.length > 0) {
            const prices = await getProductsPrices(fetchedProducts, user.id);
            setVariantPrices(prices);
          }
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch category products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, subcategoryId, user]);

  return { products, pagination, loading, error, variantPrices };
}

// Hook for featured products
export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [variantPrices, setVariantPrices] = useState<Map<number, VariantPriceInfo>>(new Map());
  const { user } = useAuth();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response: ApiResponse<any>;
        
        if (user) {
          response = await apiService.getFeaturedProducts();
        } else {
          response = await apiService.getFeaturedProductsGuest();
        }
        
        if (response.status === 1) {
          // Debug log to see what's being returned
          console.log('Featured products response:', response.data);
          
          let fetchedProducts: Product[] = [];
          
          // Check if the response contains products or categories
          if (Array.isArray(response.data)) {
            // If it's an array, check if first item looks like a product
            if (response.data.length > 0 && response.data[0].hasOwnProperty('name') && response.data[0].hasOwnProperty('final_price')) {
              fetchedProducts = response.data;
            } else {
              console.log('API returned categories instead of products');
              setError('API returned categories instead of products');
              return;
            }
          } else if (response.data.data && Array.isArray(response.data.data)) {
            // Paginated response
            fetchedProducts = response.data.data;
          } else {
            console.log('Unexpected response structure for featured products:', response.data);
            setError('Unexpected response structure');
            return;
          }
          
          setProducts(fetchedProducts);
          
          // Fetch variant prices for products with variants (only for authenticated users)
          if (user && fetchedProducts.length > 0) {
            const prices = await getProductsPrices(fetchedProducts, user.id);
            setVariantPrices(prices);
          }
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

  return { products, loading, error, variantPrices };
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

// Hook for shipping methods
export function useShippingMethods() {
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getShippingMethods();
        
        if (response.status === 1) {
          setMethods(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch shipping methods');
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  return { methods, loading, error };
}

// Hook for delivery methods
export function useDeliveryMethods() {
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getDeliveryMethods();
        
        if (response.status === 1) {
          setMethods(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch delivery methods');
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  return { methods, loading, error };
}

// Hook for delivery charge calculation
export function useDeliveryCharge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCharge = async (data: {
    methodId: string;
    countryId: string;
    stateId: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.calculateDeliveryCharge(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate delivery charge');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    calculateCharge,
    loading,
    error,
  };
}

// Hook for loyalty program
export function useLoyaltyProgram() {
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getLoyaltyProgram();
        
        if (response.status === 1) {
          setProgram(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch loyalty program');
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, []);

  return { program, loading, error };
}

// Hook for customer orders
export function useCustomerOrders(customerId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Order> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getCustomerOrders(customerId);
        
        if (response.status === 1) {
          setOrders(response.data.data);
          setPagination(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  return { orders, pagination, loading, error };
}

// Hook for order detail
export function useOrderDetail(orderId: string) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getOrderDetail(orderId);
        
        if (response.status === 1) {
          setOrder(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order detail');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
}

// Hook for order management
export function useOrderManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async (data: {
    paymentType: string;
    billingInfo: BillingInfo;
    couponInfo?: any;
    deliveryComment?: string;
    userId: string;
    customerId: string;
    paymentComment?: string;
    deliveryId: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.placeOrder(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmOrder = async (data: {
    paymentType: string;
    billingInfo: BillingInfo;
    deliveryId: string;
    couponInfo?: string;
    deliveryComment?: string;
    paymentComment?: string;
    price: string;
    shippingId: string;
    userId: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.confirmOrder(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string, userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.cancelOrder(orderId, userId);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const returnProduct = async (data: {
    productId: string;
    variantId: string;
    orderId: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.returnProduct(data);
      
      if (response.status === 1) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to return product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    placeOrder,
    confirmOrder,
    cancelOrder,
    returnProduct,
    loading,
    error,
  };
}

// Hook for all products
export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get bestseller products first, then featured as fallback
        let response: ApiResponse<any>;
        
        try {
          if (user) {
            response = await apiService.getBestsellerProducts();
          } else {
            response = await apiService.getBestsellerProductsGuest();
          }
        } catch (bestsellerError) {
          // Fallback to recent products if bestsellers fail
          console.log('Bestsellers failed, trying recent products:', bestsellerError);
          if (user) {
            response = await apiService.getRecentProducts();
          } else {
            response = await apiService.getRecentProductsGuest();
          }
        }
        
        if (response.status === 1) {
          // Check if response is paginated or direct array
          if (response.data.data) {
            setProducts(response.data.data);
            setPagination(response.data);
          } else if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            console.log('Unexpected response structure:', response.data);
            setError('Unexpected response structure');
          }
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [user]);

  return { products, pagination, loading, error };
}