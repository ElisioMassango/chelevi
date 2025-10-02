import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { apiService, CartResponse, CartItem as ApiCartItem } from '../services/api';
import { useAuth } from './AuthContext';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  variantId?: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  cartData: CartResponse | null;
}

interface CartContextType extends CartState {
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  toggleCart: () => void;
  applyCoupon: (couponCode: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART_DATA'; payload: CartResponse }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
  loading: false,
  error: null,
  cartData: null,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'SET_CART_DATA': {
      const cartData = action.payload;
      const items: CartItem[] = cartData.product_list.map((item: ApiCartItem) => ({
        id: item.product_id,
        name: item.name,
        price: parseFloat(item.final_price),
        image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
        quantity: item.qty,
        variant: item.variant_name,
      }));

      return {
        ...state,
        cartData,
        items,
        total: parseFloat(cartData.final_price),
        loading: false,
        error: null,
      };
    }

    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        cartData: null,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Load cart data when user changes
  useEffect(() => {
    if (user?.id) {
      // Only refresh if we don't already have cart data and no items
      if (!state.cartData && state.items.length === 0) {
        refreshCart();
      }
    } else {
      // Load guest cart from localStorage
      loadGuestCart();
    }
  }, [user?.id, state.cartData, state.items.length]);

  // Load guest cart from localStorage
  const loadGuestCart = () => {
    try {
      const guestCart = localStorage.getItem('chelevi_guest_cart');
      if (guestCart) {
        const items = JSON.parse(guestCart);
        dispatch({ type: 'SET_ITEMS', payload: items });
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
    }
  };

  // Save guest cart to localStorage
  const saveGuestCart = (items: CartItem[]) => {
    try {
      localStorage.setItem('chelevi_guest_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  const refreshCart = async () => {
    if (!user?.id) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Only migrate guest cart if there are items and no existing cart data
      const guestCart = localStorage.getItem('chelevi_guest_cart');
      if (guestCart && !state.cartData) {
        const guestItems = JSON.parse(guestCart);
        if (guestItems.length > 0) {
          await migrateGuestCartToUser();
        }
      }
      
      const response = await apiService.getCartList(user.id.toString());
      
      if (response.status === 1) {
        dispatch({ type: 'SET_CART_DATA', payload: response.data });
        
        // Update items from the response
        if (response.data.product_list && response.data.product_list.length > 0) {
          const updatedItems = response.data.product_list.map((item: any) => ({
            id: item.product_id,
            name: item.name,
            price: parseFloat(item.final_price),
            image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
            quantity: item.qty,
            variant: item.variant_name || ''
          }));
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Migrate guest cart to user cart when user logs in
  const migrateGuestCartToUser = async () => {
    try {
      const guestCart = localStorage.getItem('chelevi_guest_cart');
      if (guestCart && user?.id) {
        const guestItems = JSON.parse(guestCart);
        
        // Only migrate if there are items and we haven't already migrated
        if (guestItems.length > 0) {
          // Add each guest item to user cart via API
          for (const item of guestItems) {
            try {
              await apiService.addToCart({
                customerId: user.id.toString(),
                productId: item.id.toString(),
                quantity: item.quantity,
                variantId: item.variant || '0',
              });
            } catch (error) {
              console.warn('Failed to migrate item to user cart:', error);
            }
          }
          
          // Clear guest cart after migration
          localStorage.removeItem('chelevi_guest_cart');
          logger.userAction('Guest cart migrated to user cart', { itemCount: guestItems.length });
        }
      }
    } catch (error) {
      console.error('Error migrating guest cart:', error);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.userAction('Adding item to cart', { productId: item.id, quantity: item.quantity || 1, isGuest: !user?.id });
      
      if (user?.id) {
        // Authenticated user - use API
        const response = await apiService.addToCart({
          customerId: user.id.toString(),
          productId: item.id.toString(),
          quantity: item.quantity || 1,
          variantId: item.variantId?.toString() || '0',
        });

        if (response.status === 1) {
          await refreshCart();
          toastService.itemAddedToCart();
          logger.userAction('Item added to cart successfully', { productId: item.id });
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
          toastService.error(response.message);
          logger.warn('Failed to add item to cart', { productId: item.id, error: response.message });
        }
      } else {
        // Guest user - use localStorage
        const newItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity || 1,
          variant: item.variant,
          variantId: item.variantId
        };

        const existingItemIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
        let updatedItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Add new item
          updatedItems = [...state.items, newItem];
        }

        dispatch({ type: 'SET_ITEMS', payload: updatedItems });
        saveGuestCart(updatedItems);
          toastService.itemAddedToCart();
        logger.userAction('Item added to guest cart successfully', { productId: item.id });
      }
    } catch (error) {
      const errorMessage = 'Falha ao adicionar item ao carrinho';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Error adding item to cart', { productId: item.id, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user?.id) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // For now, we'll use updateQuantity with 0 to remove
      // This might need a specific remove API endpoint
      await updateQuantity(id, 0);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.userAction('Updating cart quantity', { productId: id, quantity, isGuest: !user?.id });
      
      if (user?.id) {
        // Authenticated user - use API
        if (quantity === 0) {
          // Remove item logic here
          dispatch({ type: 'SET_ERROR', payload: 'Remove functionality not implemented' });
          toastService.error('Funcionalidade de remoção não implementada');
          return;
        }

        const currentItem = state.items.find(item => item.id === id);
        if (!currentItem) return;

        const quantityType = quantity > currentItem.quantity ? 'increase' : 'decrease';
        const response = await apiService.updateCartQuantity({
          customerId: user.id.toString(),
          productId: id.toString(),
          quantityType,
          variantId: currentItem.variant || '0',
        });

        if (response.status === 1) {
          await refreshCart();
          toastService.cartUpdated();
          logger.userAction('Cart quantity updated successfully', { productId: id, quantity });
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
          toastService.error(response.message);
          logger.warn('Failed to update cart quantity', { productId: id, error: response.message });
        }
      } else {
        // Guest user - use localStorage
        if (quantity === 0) {
          // Remove item
          const updatedItems = state.items.filter(item => item.id !== id);
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
          saveGuestCart(updatedItems);
          toastService.itemRemovedFromCart();
          logger.userAction('Item removed from guest cart', { productId: id });
        } else {
          // Update quantity
          const updatedItems = state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
          saveGuestCart(updatedItems);
          toastService.cartUpdated();
          logger.userAction('Guest cart quantity updated successfully', { productId: id, quantity });
        }
      }
    } catch (error) {
      const errorMessage = 'Falha ao atualizar quantidade';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Error updating cart quantity', { productId: id, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const applyCoupon = async (couponCode: string) => {
    if (!user?.id) {
      dispatch({ type: 'SET_ERROR', payload: 'Please login to apply coupon' });
      toastService.error('Por favor, faça login para aplicar cupom');
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.userAction('Applying coupon', { couponCode });
      
      const response = await apiService.applyCoupon(couponCode);
      
      if (response.status === 1) {
        // Update cart data without triggering refresh
        dispatch({ type: 'SET_CART_DATA', payload: response.data });
        toastService.couponApplied();
        logger.userAction('Coupon applied successfully', { couponCode });
        
        // Check if product_list is empty but we have cart_total_product > 0
        if (response.data.product_list && response.data.product_list.length > 0) {
          const updatedItems = response.data.product_list.map((item: any) => ({
            id: item.product_id,
            name: item.name,
            price: parseFloat(item.final_price),
            image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
            quantity: item.qty,
            variant: item.variant_name || ''
          }));
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
        } else if (response.data.cart_total_product > 0) {
          // If product_list is empty but cart_total_product > 0, keep current items
          console.log('Product list is empty but cart has products, keeping current items');
          // Don't update items, just keep the current ones
        } else {
          // If no products at all, clear items
          console.log('No products in cart, clearing items');
          dispatch({ type: 'SET_ITEMS', payload: [] });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        toastService.error(response.message);
        logger.warn('Failed to apply coupon', { couponCode, error: response.message });
      }
    } catch (error) {
      const errorMessage = 'Falha ao aplicar cupom';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Error applying coupon', { couponCode, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    // Clear guest cart from localStorage
    localStorage.removeItem('chelevi_guest_cart');
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        applyCoupon,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};