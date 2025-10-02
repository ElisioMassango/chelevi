import toast from 'react-hot-toast';
import { logger } from './logger';

export interface ToastOptions {
  duration?: number;
  position?: 'top-center' | 'top-right' | 'top-left' | 'bottom-center' | 'bottom-right' | 'bottom-left';
  icon?: string;
  style?: React.CSSProperties;
  className?: string;
}

class ToastService {
  // Success toast
  success(message: string, options?: ToastOptions): void {
    logger.info('Toast Success', { message, options });
    toast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        ...options?.style,
      },
      ...options,
    });
  }

  // Error toast
  error(message: string, options?: ToastOptions): void {
    logger.error('Toast Error', { message, options });
    toast.error(message, {
      duration: options?.duration || 5000,
      position: options?.position || 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        ...options?.style,
      },
      ...options,
    });
  }

  // Warning toast
  warning(message: string, options?: ToastOptions): void {
    logger.warn('Toast Warning', { message, options });
    toast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#fff',
        ...options?.style,
      },
      ...options,
    });
  }

  // Info toast
  info(message: string, options?: ToastOptions): void {
    logger.info('Toast Info', { message, options });
    toast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3B82F6',
        color: '#fff',
        ...options?.style,
      },
      ...options,
    });
  }

  // Loading toast
  loading(message: string, options?: ToastOptions): string {
    logger.info('Toast Loading', { message, options });
    return toast.loading(message, {
      position: options?.position || 'top-right',
      style: {
        background: '#6B7280',
        color: '#fff',
        ...options?.style,
      },
      ...options,
    });
  }

  // Promise toast
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ): Promise<T> {
    logger.info('Toast Promise', { messages, options });
    return toast.promise(promise, messages, {
      position: options?.position || 'top-right',
      style: {
        ...options?.style,
      },
      ...options,
    });
  }

  // Dismiss toast
  dismiss(toastId?: string): void {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }

  // Remove all toasts
  remove(): void {
    toast.remove();
  }

  // API specific toasts
  apiSuccess(operation: string, message?: string): void {
    this.success(message || `${operation} completed successfully`);
  }

  apiError(operation: string, error: any, message?: string): void {
    const errorMessage = message || `${operation} failed: ${error?.message || error}`;
    this.error(errorMessage);
  }

  // User action toasts
  userRegistered(): void {
    this.success('Account created successfully! Welcome!');
  }

  userLoggedIn(): void {
    this.success('Welcome back!');
  }

  userLoggedOut(): void {
    this.info('You have been logged out');
  }

  profileUpdated(): void {
    this.success('Profile updated successfully');
  }

  passwordChanged(): void {
    this.success('Password changed successfully');
  }

  addressAdded(): void {
    this.success('Address added successfully');
  }

  addressUpdated(): void {
    this.success('Address updated successfully');
  }

  addressDeleted(): void {
    this.success('Address deleted successfully');
  }

  orderPlaced(): void {
    this.success('Order placed successfully!');
  }

  orderCancelled(): void {
    this.info('Order cancelled successfully');
  }

  productAddedToCart(): void {
    this.success('Product added to cart');
  }

  productRemovedFromCart(): void {
    this.info('Product removed from cart');
  }

  couponApplied(): void {
    this.success('Coupon applied successfully');
  }

  couponRemoved(): void {
    this.info('Coupon removed');
  }

  // Cart specific toasts
  itemAddedToCart(): void {
    this.success('Produto adicionado ao carrinho!', {
      duration: 3000,
      icon: '🛒',
    });
  }

  cartUpdated(): void {
    this.success('Carrinho atualizado!', {
      duration: 2000,
      icon: '✅',
    });
  }

  itemRemovedFromCart(): void {
    this.success('Produto removido do carrinho!', {
      duration: 3000,
      icon: '🗑️',
    });
  }
}

// Create a singleton instance
export const toastService = new ToastService();
export default toastService;
