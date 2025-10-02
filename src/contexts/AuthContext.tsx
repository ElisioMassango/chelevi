import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { apiService, User as ApiUser } from '../services/api';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';

interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  image?: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (phone: string, otp: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (phone: string, email?: string) => Promise<void>;
  registerWithEmail: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    mobile: string;
  }) => Promise<void>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  verifyForgotPasswordOtp: (email: string, otp: string) => Promise<any>;
  resetPassword: (email: string, password: string) => Promise<any>;
  clearError: () => void;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' };

// Load user from localStorage on initialization
const loadUserFromStorage = (): User | null => {
  try {
    const storedUser = localStorage.getItem('chelevi_user');
    const storedToken = localStorage.getItem('chelevi_token');
    
    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      user.token = storedToken;
      
      // Set token in API service
      apiService.setToken(storedToken);
      
      return user;
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
    // Clear corrupted data
    localStorage.removeItem('chelevi_user');
    localStorage.removeItem('chelevi_token');
  }
  return null;
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      // Save user to localStorage
      try {
        const userToStore = { ...action.payload };
        const token = userToStore.token;
        delete userToStore.token; // Don't store token in user object
        
        localStorage.setItem('chelevi_user', JSON.stringify(userToStore));
        if (token) {
          localStorage.setItem('chelevi_token', token);
        }
      } catch (error) {
        console.error('Error saving user to storage:', error);
      }
      return { ...state, user: action.payload, isLoading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      // Clear localStorage
      localStorage.removeItem('chelevi_user');
      localStorage.removeItem('chelevi_token');
      return { ...state, user: null, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const sendOTP = async (phone: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // For phone-based OTP, we'll simulate for now
      // In production, integrate with WhatsApp/SMS service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send OTP. Please try again.' });
    }
  };

  const login = async (phone: string, otp: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    logger.userAction('Login attempt', { phone, method: 'OTP' });
    
    try {
      const response = await apiService.verifyOTP(phone, otp);
      
      if (response.status === 1) {
        const user: User = {
          id: response.data.id.toString(),
          phone: response.data.mobile,
          email: response.data.email,
          name: response.data.name,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          image: response.data.image,
          token: response.data.token
        };
        
        dispatch({ type: 'SET_USER', payload: user });
        toastService.userLoggedIn();
        logger.userAction('Login successful', { userId: user.id });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        toastService.error(response.message);
        logger.warn('Login failed', { phone, error: response.message });
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Login error', { phone, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    logger.userAction('Email login attempt', { email });
    
    try {
      const response = await apiService.login(email, password);
      
      if (response.status === 1) {
        const user: User = {
          id: response.data.id.toString(),
          phone: response.data.mobile,
          email: response.data.email,
          name: response.data.name,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          image: response.data.image,
          token: response.data.token
        };
        
        dispatch({ type: 'SET_USER', payload: user });
        toastService.userLoggedIn();
        logger.userAction('Email login successful', { userId: user.id });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        toastService.error(response.message);
        logger.warn('Email login failed', { email, error: response.message });
      }
    } catch (error) {
      const errorMessage = 'Email login failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Email login error', { email, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const forgotPassword = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.forgotPasswordSendOtp(email);
      if (response.status === 1) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send OTP. Please try again.' });
      throw error;
    }
  };

  const verifyForgotPasswordOtp = async (email: string, otp: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.forgotPasswordVerifyOtp(email, otp);
      if (response.status === 1) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid OTP. Please try again.' });
      throw error;
    }
  };

  const resetPassword = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiService.forgotPasswordSave(email, password);
      if (response.status === 1) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to reset password. Please try again.' });
      throw error;
    }
  };


  const register = async (phone: string, email?: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    logger.userAction('Phone registration attempt', { phone, email });
    
    try {
      // This is for phone-based registration, redirect to OTP verification
      await sendOTP(phone);
    } catch (error) {
      const errorMessage = 'Registration failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Phone registration error', { phone, error });
    }
  };

  const registerWithEmail = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    mobile: string;
  }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    logger.userAction('Email registration attempt', { email: data.email });
    
    try {
      const response = await apiService.register(data);
      
      if (response.status === 1) {
        const user: User = {
          id: response.data.id.toString(),
          phone: response.data.mobile,
          email: response.data.email,
          name: response.data.name,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          image: response.data.image,
          token: response.data.token
        };
        
        dispatch({ type: 'SET_USER', payload: user });
        toastService.userRegistered();
        logger.userAction('Email registration successful', { userId: user.id });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        toastService.error(response.message);
        logger.warn('Email registration failed', { email: data.email, error: response.message });
      }
    } catch (error) {
      const errorMessage = 'Registration failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toastService.error(errorMessage);
      logger.error('Email registration error', { email: data.email, error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    if (state.user?.id) {
      logger.userAction('Logout attempt', { userId: state.user.id });
      // Call logout API
      apiService.logout(state.user.id)
        .then(() => {
          logger.userAction('Logout successful', { userId: state.user?.id });
          toastService.userLoggedOut();
        })
        .catch((error) => {
          logger.error('Logout API error', { userId: state.user?.id, error });
          // Still proceed with local logout even if API fails
          toastService.userLoggedOut();
        });
    }
    // Clear API token
    apiService.clearToken();
    // Clear localStorage
    localStorage.removeItem('chelevi_user');
    localStorage.removeItem('chelevi_token');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithEmail,
        registerWithEmail,
        register,
        logout,
        sendOTP,
        forgotPassword,
        verifyForgotPasswordOtp,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};