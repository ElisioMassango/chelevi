import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { apiService, User as ApiUser } from '../services/api';

interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (phone: string, otp: string) => Promise<void>;
  register: (phone: string, email?: string) => Promise<void>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<void>;
  clearError: () => void;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isLoading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
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
    try {
      // For phone-based login, simulate for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === '123456') {
        const user: User = {
          id: '1',
          phone,
          email: 'info@chelevi.com',
          name: 'CheLevi User'
        };
        dispatch({ type: 'SET_USER', payload: user });
        
        // Send welcome message via Venombot API (in real implementation)
        // await sendWelcomeMessage(phone);
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid OTP. Please try again.' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // For now, simulate email login
      // In production, implement proper email/password authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: '1',
        phone: '+258 84 123 4567',
        email,
        name: 'CheLevi User'
      };
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
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
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Date.now().toString(),
        phone,
        email,
        name: 'New User'
      };
      dispatch({ type: 'SET_USER', payload: user });
      
      // Send welcome message via Venombot API (in real implementation)
      // await sendWelcomeMessage(phone);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed. Please try again.' });
    }
  };

  const logout = () => {
    // Clear API token
    apiService.clearToken();
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