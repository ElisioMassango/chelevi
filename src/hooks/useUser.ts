import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';
import { useAuth } from '../contexts/AuthContext';

// User profile management hooks
export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    logger.userAction('Fetching user profile', { userId: user.id });
    
    try {
      const response = await apiService.getUserDetails(user.id);
      
      if (response.status === 1) {
        setProfile(response.data);
        logger.userAction('Profile fetched successfully', { userId: user.id });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to fetch profile', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch profile';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Profile fetch error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
  }) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Updating user profile', { userId: user.id, data });
    
    try {
      const response = await apiService.updateProfile({
        customer_id: user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        telephone: data.telephone,
      });
      
      if (response.status === 1) {
        toastService.profileUpdated();
        logger.userAction('Profile updated successfully', { userId: user.id });
        await fetchProfile(); // Refresh profile data
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to update profile', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Profile update error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (customerId: string, newPassword: string) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Changing password', { userId: user.id });
    
    try {
      const response = await apiService.changePassword({
        customer_id: customerId,
        new_password: newPassword
      });
      
      if (response.status === 1) {
        toastService.passwordChanged();
        logger.userAction('Password changed successfully', { userId: user.id });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to change password', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to change password';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Password change error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const updateProfileImage = async (imageFile: File) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Updating profile image', { userId: user.id });
    
    try {
      const response = await apiService.updateUserImage(user.id, imageFile);
      
      if (response.status === 1) {
        toastService.success('Profile image updated successfully');
        logger.userAction('Profile image updated successfully', { userId: user.id });
        await fetchProfile(); // Refresh profile data
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to update profile image', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile image';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Profile image update error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Deleting user account', { userId: user.id });
    
    try {
      const response = await apiService.deleteUser(user.id);
      
      if (response.status === 1) {
        toastService.success('Account deleted successfully');
        logger.userAction('Account deleted successfully', { userId: user.id });
        // The user will be logged out by the auth context
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to delete account', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to delete account';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Account deletion error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
    updateProfileImage,
    deleteAccount,
  };
}

// Address management hooks
export function useAddresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAddresses = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Fetching addresses', { userId: user.id });
    
    try {
      const response = await apiService.getAddressList(user.id);
      
      if (response.status === 1) {
        setAddresses(response.data.data);
        logger.userAction('Addresses fetched successfully', { userId: user.id, count: response.data.data.length });
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to fetch addresses', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch addresses';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Address fetch error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (data: {
    title: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    default_address: string;
  }) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Adding address', { userId: user.id, data });
    
    try {
      const response = await apiService.addAddress({
        customer_id: user.id,
        ...data,
      });
      
      if (response.status === 1) {
        toastService.addressAdded();
        logger.userAction('Address added successfully', { userId: user.id });
        await fetchAddresses(); // Refresh addresses
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to add address', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to add address';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Address add error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (data: {
    address_id: string;
    title: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    default_address: string;
  }) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    logger.userAction('Updating address', { userId: user.id, data });
    
    try {
      const response = await apiService.updateAddress({
        customer_id: user.id,
        ...data,
      });
      
      if (response.status === 1) {
        toastService.addressUpdated();
        logger.userAction('Address updated successfully', { userId: user.id });
        await fetchAddresses(); // Refresh addresses
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to update address', { userId: user.id, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to update address';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Address update error', { userId: user.id, error: err });
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    setLoading(true);
    setError(null);
    logger.userAction('Deleting address', { addressId });
    
    try {
      const response = await apiService.deleteAddress(addressId);
      
      if (response.status === 1) {
        toastService.addressDeleted();
        logger.userAction('Address deleted successfully', { addressId });
        await fetchAddresses(); // Refresh addresses
      } else {
        setError(response.message);
        toastService.error(response.message);
        logger.warn('Failed to delete address', { addressId, error: response.message });
      }
    } catch (err) {
      const errorMessage = 'Failed to delete address';
      setError(errorMessage);
      toastService.error(errorMessage);
      logger.error('Address delete error', { addressId, error: err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}
