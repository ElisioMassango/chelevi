import { useState, useEffect } from 'react';
import { apiService, ApiResponse } from '../services/api';

// Custom hook for API calls with loading and error states
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      
      if (response.status === 1) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

// Hook for manual API calls (e.g., form submissions)
export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    apiCall: (params: P) => Promise<ApiResponse<T>>,
    params: P
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(params);
      
      if (response.status === 1) {
        return response.data;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

// Hook for address management
export function useAddresses(customerId: string) {
  const { data: addresses, loading, error, refetch } = useApi(
    () => apiService.getAddressList(customerId),
    [customerId]
  );

  const { mutate: addAddress, loading: addingAddress } = useApiMutation();
  const { mutate: updateAddress, loading: updatingAddress } = useApiMutation();
  const { mutate: deleteAddress, loading: deletingAddress } = useApiMutation();

  const handleAddAddress = async (addressData: any) => {
    const result = await addAddress(apiService.addAddress.bind(apiService), {
      customer_id: customerId,
      ...addressData,
    });
    if (result) {
      refetch();
    }
    return result;
  };

  const handleUpdateAddress = async (addressId: string, addressData: any) => {
    const result = await updateAddress(apiService.updateAddress.bind(apiService), {
      address_id: addressId,
      customer_id: customerId,
      ...addressData,
    });
    if (result) {
      refetch();
    }
    return result;
  };

  const handleDeleteAddress = async (addressId: string) => {
    const result = await deleteAddress(apiService.deleteAddress.bind(apiService), addressId);
    if (result) {
      refetch();
    }
    return result;
  };

  return {
    addresses: addresses?.data || [],
    loading,
    error,
    addAddress: handleAddAddress,
    updateAddress: handleUpdateAddress,
    deleteAddress: handleDeleteAddress,
    addingAddress,
    updatingAddress,
    deletingAddress,
    refetch,
  };
}

// Hook for user profile management
export function useUserProfile(customerId: string) {
  const { data: user, loading, error, refetch } = useApi(
    () => apiService.getUserDetail(customerId),
    [customerId]
  );

  const { mutate: updateProfile, loading: updatingProfile } = useApiMutation();
  const { mutate: changePassword, loading: changingPassword } = useApiMutation();
  const { mutate: updateImage, loading: updatingImage } = useApiMutation();

  const handleUpdateProfile = async (profileData: any) => {
    const result = await updateProfile(apiService.updateProfile.bind(apiService), {
      customer_id: customerId,
      ...profileData,
    });
    if (result) {
      refetch();
    }
    return result;
  };

  const handleChangePassword = async (password: string) => {
    return await changePassword(apiService.changePassword.bind(apiService), {
      customer_id: customerId,
      new_password: password,
    });
  };

  const handleUpdateImage = async (imageFile: File) => {
    const result = await updateImage((params: any) => apiService.updateUserImage(params.customerId, params.imageFile), {
      customerId,
      imageFile,
    });
    if (result) {
      refetch();
    }
    return result;
  };

  return {
    user,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    updateImage: handleUpdateImage,
    updatingProfile,
    changingPassword,
    updatingImage,
    refetch,
  };
}