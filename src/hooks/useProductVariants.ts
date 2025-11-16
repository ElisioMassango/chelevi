import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface VariantInfo {
  price: string;
  sale_price: string;
  currency_name: string;
  currency: string;
  product_stock: number;
  stock_order_status: string;
  description: string;
}

export function useProductVariants() {
  const [variantInfo, setVariantInfo] = useState<VariantInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getVariantInfo = async (
    productId: string, 
    selectedVariants: { [key: string]: number }, 
    quantity: number = 1
  ) => {
    if (!user || Object.keys(selectedVariants).length === 0) {
      setVariantInfo(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert selected variants to API format
      const variantObj: any = {};
      Object.entries(selectedVariants).forEach(([variantName, variantId]) => {
        variantObj[variantName] = variantId;
      });

      const response = await apiService.getProductVariantInfo({
        customer_id: user.id.toString(),
        product_id: productId,
        variant: JSON.stringify([variantObj]),
        quantity: quantity.toString()
      });

      if (response.status === 1) {
        setVariantInfo(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch variant info');
    } finally {
      setLoading(false);
    }
  };

  // Get first variant info automatically (for default pricing)
  const getFirstVariantInfo = async (
    productId: string,
    productVariants: any[],
    quantity: number = 1
  ) => {
    if (!user || !productVariants || productVariants.length === 0) {
      setVariantInfo(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get first variant from each variant group
      const variantObj: any = {};
      productVariants.forEach((variantGroup: any) => {
        if (variantGroup.variant_list_data && variantGroup.variant_list_data.length > 0) {
          const firstVariant = variantGroup.variant_list_data[0];
          variantObj[variantGroup.variant_name] = firstVariant.name;
        }
      });

      if (Object.keys(variantObj).length === 0) {
        setVariantInfo(null);
        setLoading(false);
        return;
      }

      const response = await apiService.getProductVariantInfo({
        customer_id: user.id.toString(),
        product_id: productId,
        variant: JSON.stringify([variantObj]),
        quantity: quantity.toString()
      });

      if (response.status === 1) {
        setVariantInfo(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch variant info');
    } finally {
      setLoading(false);
    }
  };

  const getSizeNote = (
    selectedVariants: { [key: string]: number },
    productVariants: any[]
  ): string => {
    // Find size variant
    const sizeVariant = Object.entries(selectedVariants).find(([variantName]) => 
      variantName.toLowerCase().includes('tamanho') || 
      variantName.toLowerCase().includes('size')
    );

    if (!sizeVariant || !productVariants) return '';

    const [variantName, variantId] = sizeVariant;
    const variantGroup = productVariants.find((vg: any) => vg.variant_name === variantName);
    const selectedOption = variantGroup?.variant_list_data.find((v: any) => v.id === variantId);
    
    return selectedOption ? `Tamanho: ${selectedOption.name}` : '';
  };

  const getVariantSummary = (
    selectedVariants: { [key: string]: number },
    productVariants: any[]
  ): string[] => {
    if (!productVariants) return [];

    return Object.entries(selectedVariants).map(([variantName, variantId]) => {
      const variantGroup = productVariants.find((vg: any) => vg.variant_name === variantName);
      const selectedOption = variantGroup?.variant_list_data.find((v: any) => v.id === variantId);
      return selectedOption ? `${variantName}: ${selectedOption.name}` : '';
    }).filter(Boolean);
  };

  return {
    variantInfo,
    loading,
    error,
    getVariantInfo,
    getFirstVariantInfo,
    getSizeNote,
    getVariantSummary
  };
}
