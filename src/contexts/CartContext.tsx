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
  sizeNote?: string;
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
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number; sizeNote?: string }) => Promise<void>;
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
      
      // Only update items if product_list exists and has items
      // If product_list is empty/null/undefined, preserve current items
      let items = state.items;
      if (cartData.product_list && Array.isArray(cartData.product_list) && cartData.product_list.length > 0) {
        items = cartData.product_list.map((item: ApiCartItem) => {
          // For products with variants, if final_price is 0, use orignal_price
          let price = parseFloat(item.final_price);
          if (price === 0 && item.variant_id && item.variant_id > 0 && item.orignal_price) {
            price = parseFloat(item.orignal_price);
          } else if (price === 0 && item.orignal_price) {
            // Fallback: if final_price is 0 but we have orignal_price, use it
            price = parseFloat(item.orignal_price);
          }
          
          return {
            id: item.product_id,
            name: item.name,
            price,
            image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
            quantity: item.qty,
            variant: item.variant_name,
            variantId: item.variant_id || undefined,
          };
        });
      }
      // If product_list is explicitly an empty array and we have items, preserve current items
      // This handles the case where API returns empty product_list but cart still has products

      // Preserve coupon_info if it exists in the new cartData, otherwise keep the existing one
      const preservedCartData: any = {
        ...cartData,
        coupon_info: cartData.coupon_info || state.cartData?.coupon_info || null,
      };
      
      // Only set product_list if it was explicitly provided in the payload
      // If undefined, don't include it so reducer preserves existing items
      if (cartData.product_list !== undefined) {
        preservedCartData.product_list = cartData.product_list;
      } else if (state.cartData?.product_list) {
        // Preserve existing product_list if not provided
        preservedCartData.product_list = state.cartData.product_list;
      }

      return {
        ...state,
        cartData: preservedCartData,
        items, // Use updated items if product_list exists, otherwise keep current items
        total: cartData.final_price ? parseFloat(cartData.final_price.toString()) : state.total,
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
      // Only load guest cart if we don't have items yet
      if (state.items.length === 0) {
        loadGuestCart();
      }
    }
  }, [user?.id, state.cartData]);

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
          const updatedItems = response.data.product_list.map((item: any) => {
            // For products with variants, if final_price is 0, use orignal_price
            let price = parseFloat(item.final_price);
            if (price === 0 && item.variant_id && item.variant_id > 0 && item.orignal_price) {
              price = parseFloat(item.orignal_price);
            } else if (price === 0 && item.orignal_price) {
              // Fallback: if final_price is 0 but we have orignal_price, use it
              price = parseFloat(item.orignal_price);
            }
            
            return {
              id: item.product_id,
              name: item.name,
              price,
              image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
              quantity: item.qty,
              variant: item.variant_name || '',
              variantId: item.variant_id || undefined,
            };
          });
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
                variantId: item.variantId?.toString() || item.variant || '0',
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
          variantId: item.variantId,
          sizeNote: item.sizeNote
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
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.userAction('Removing item from cart', { productId: id, isGuest: !user?.id });
      
      if (user?.id) {
        // Authenticated user - use API
        const currentItem = state.items.find(item => item.id === id);
        if (!currentItem) return;

        const response = await apiService.removeFromCart({
          customerId: user.id.toString(),
          productId: id.toString(),

        });

        if (response.status === 1) {
          await refreshCart();
          toastService.itemRemovedFromCart();
          logger.userAction('Item removed from cart successfully', { productId: id });
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
          toastService.error(response.message);
          logger.warn('Failed to remove item from cart', { productId: id, error: response.message });
        }
      } else {
        // Guest user - remove from localStorage
        logger.userAction('Starting guest cart removal', { 
          productId: id, 
          currentItems: state.items.length,
          currentTotal: state.total 
        });
        
        const updatedItems = state.items.filter(item => item.id !== id);
        logger.userAction('Items after filtering', { 
          originalCount: state.items.length,
          filteredCount: updatedItems.length,
          removedItem: id
        });
        
        // Update localStorage first
        localStorage.setItem('chelevi_guest_cart', JSON.stringify(updatedItems));
        
        // Recalculate total
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        logger.userAction('Recalculated total', { 
          oldTotal: state.total,
          newTotal: newTotal,
          itemCount: updatedItems.length
        });
        
        // Update state with both items and cart data
        dispatch({ type: 'SET_ITEMS', payload: updatedItems });
        
        // Only update cartData if it exists
        if (state.cartData) {
          dispatch({ type: 'SET_CART_DATA', payload: { 
            ...state.cartData, 
            final_price: newTotal.toString(),
            cart_total_product: updatedItems.length
          } });
        }
        
        toastService.itemRemovedFromCart();
        logger.userAction('Item removed from guest cart successfully', { 
          productId: id, 
          remainingItems: updatedItems.length,
          newTotal: newTotal
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
      toastService.error('Falha ao remover item do carrinho');
      logger.error('Remove from cart error', { productId: id, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.userAction('Updating cart quantity', { productId: id, quantity, isGuest: !user?.id });
      
      if (user?.id) {
        // Authenticated user - use API
        if (quantity === 0) {
          // Use removeFromCart for quantity 0
          await removeFromCart(id);
          return;
        }

        const currentItem = state.items.find(item => item.id === id);
        if (!currentItem) return;

        const quantityType = quantity > currentItem.quantity ? 'increase' : 'decrease';
        const response = await apiService.updateCartQuantity({
          customerId: user.id.toString(),
          productId: id.toString(),
          quantityType,
          variantId: currentItem.variantId?.toString() || currentItem.variant || '0',
        });

        if (response.status === 1) {
          // Update only the specific item without full refresh
          const updatedItems = state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
          
          // Update items first
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
          
          // Update cartData total if it exists (updateCartQuantity doesn't return full cart data)
          // IMPORTANT: Don't use SET_CART_DATA here as it might clear items if product_list is missing
          // Instead, update cartData without product_list to preserve existing items
          if (state.cartData) {
            const newSubtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const discount = state.cartData.coupon_info?.coupon_discount_amount 
              ? parseFloat(state.cartData.coupon_info.coupon_discount_amount.toString()) 
              : 0;
            const newTotal = newSubtotal - discount;
            
            // Update cartData WITHOUT product_list to preserve existing items in reducer
            // Create a new object without product_list so reducer preserves existing items
            const { product_list, ...cartDataWithoutProductList } = state.cartData;
            const updatedCartData: any = {
              ...cartDataWithoutProductList,
              sub_total: newSubtotal,
              final_price: newTotal.toString(),
              cart_total_product: updatedItems.length
            };
            // Don't include product_list - reducer will preserve existing items
            
            dispatch({ type: 'SET_CART_DATA', payload: updatedCartData });
          }
          
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
        // Log the response to debug
        console.log('Coupon response data:', response.data);
        console.log('Coupon info:', response.data?.coupon_info);
        
        // Update cart data with coupon info - this will preserve items if product_list is empty
        dispatch({ type: 'SET_CART_DATA', payload: response.data });
        toastService.couponApplied();
        logger.userAction('Coupon applied successfully', { couponCode, couponInfo: response.data?.coupon_info });
        
        // Only update items if product_list exists and has items
        // If product_list is empty but cart_total_product > 0, keep current items
        if (response.data.product_list && Array.isArray(response.data.product_list) && response.data.product_list.length > 0) {
          const updatedItems = response.data.product_list.map((item: any) => {
            // For products with variants, if final_price is 0, use orignal_price
            let price = parseFloat(item.final_price || item.price || '0');
            if (price === 0 && item.variant_id && item.variant_id > 0 && item.orignal_price) {
              price = parseFloat(item.orignal_price);
            } else if (price === 0 && item.orignal_price) {
              // Fallback: if final_price is 0 but we have orignal_price, use it
              price = parseFloat(item.orignal_price);
            }
            
            return {
              id: item.product_id,
              name: item.name,
              price,
              image: item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg',
              quantity: item.qty || item.quantity || 1,
              variant: item.variant_name || '',
              variantId: item.variant_id || undefined,
            };
          });
          dispatch({ type: 'SET_ITEMS', payload: updatedItems });
        }
        // If product_list is empty/null but cart_total_product > 0, keep current items (don't clear)
        // This handles the case where API returns empty product_list but cart still has products
      } else {
        // Status 0 means invalid coupon
        const errorMessage = response.message || 'Cupom inválido';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        toastService.error('Cupom inválido');
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