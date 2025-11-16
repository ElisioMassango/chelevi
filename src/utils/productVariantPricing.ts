import { apiService } from '../services/api';
import { Product } from '../services/api';

export interface VariantPriceInfo {
  price: number;
  salePrice: number | null;
  hasVariants: boolean;
}

/**
 * Get the price for a product, fetching first variant price if product has variants
 */
export async function getProductPrice(
  product: Product,
  userId: string | null
): Promise<VariantPriceInfo> {
  // If product doesn't have variants, return product price
  if (product.variant_product !== 1) {
    return {
      price: parseFloat((product.final_price || product.price || '0').toString()),
      salePrice: product.sale_price ? parseFloat(product.sale_price.toString()) : null,
      hasVariants: false,
    };
  }

  // For products with variants, only fetch variant price if user is authenticated
  // For guest users, try to get original price from product detail
  if (!userId) {
    // Helper function to safely parse price
    const safeParsePrice = (value: any): number => {
      if (value === null || value === undefined || value === '') return 0;
      if (typeof value === 'number') {
        return isNaN(value) ? 0 : value;
      }
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[^\d.-]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    let originalPrice = 0;
    
    // For guest users, try to fetch product detail to get original price
    try {
      const productDetailResponse = await apiService.getProductDetailGuest(product.id.toString());
      if (productDetailResponse.status === 1 && productDetailResponse.data?.product_info) {
        const productInfo = productDetailResponse.data.product_info;
        
        // Try different price fields
        originalPrice = safeParsePrice(productInfo.price);
        if (originalPrice === 0 && (productInfo as any).orignal_price) {
          originalPrice = safeParsePrice((productInfo as any).orignal_price);
        }
        if (originalPrice === 0 && (productInfo as any).original_price) {
          originalPrice = safeParsePrice((productInfo as any).original_price);
        }
      }
    } catch (error) {
      console.error(`Error fetching product detail for guest user (product ${product.id}):`, error);
    }
    
    // Fallback to product fields
    if (originalPrice === 0) {
      originalPrice = safeParsePrice(product.price);
    }
    if (originalPrice === 0) {
      originalPrice = safeParsePrice(product.final_price);
    }
    
    // If still 0, use default price of 7300 for variant products (guest users)
    if (originalPrice === 0 && product.variant_product === 1) {
      originalPrice = 7300;
    }
    
    return {
      price: originalPrice,
      salePrice: product.sale_price ? parseFloat(product.sale_price.toString()) : null,
      hasVariants: true, // Mark as having variants so UI can show "select variant" message
    };
  }

  // Product has variants and user is authenticated - fetch variant price
  try {
    // First, get product detail to fetch variant list
    const productDetailResponse = await apiService.getProductDetail(product.id.toString());
    
    if (productDetailResponse.status === 1 && productDetailResponse.data) {
      const variantData = (productDetailResponse.data as any).variant;
      
      if (variantData && Array.isArray(variantData) && variantData.length > 0) {
        // Get first variant from each variant group
        const variantObj: any = {};
        variantData.forEach((variantGroup: any) => {
          if (variantGroup.variant_list_data && variantGroup.variant_list_data.length > 0) {
            const firstVariant = variantGroup.variant_list_data[0];
            variantObj[variantGroup.variant_name] = firstVariant.name;
          }
        });

        if (Object.keys(variantObj).length > 0) {
          // Fetch variant price
          const variantResponse = await apiService.getProductVariantInfo({
            customer_id: userId,
            product_id: product.id.toString(),
            variant: JSON.stringify([variantObj]),
            quantity: '1',
          });

          if (variantResponse.status === 1 && variantResponse.data) {
            return {
              price: parseFloat(variantResponse.data.price.toString()),
              salePrice: variantResponse.data.sale_price
                ? parseFloat(variantResponse.data.sale_price.toString())
                : null,
              hasVariants: true,
            };
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error fetching variant price for product ${product.id}:`, error);
  }

  // Fallback to product price if variant fetch fails
  return {
    price: parseFloat((product.final_price || product.price || '0').toString()),
    salePrice: product.sale_price ? parseFloat(product.sale_price.toString()) : null,
    hasVariants: product.variant_product === 1,
  };
}

/**
 * Batch fetch prices for multiple products with variants
 */
export async function getProductsPrices(
  products: Product[],
  userId: string | null
): Promise<Map<number, VariantPriceInfo>> {
  const priceMap = new Map<number, VariantPriceInfo>();

  // Process products in parallel (with limit to avoid overwhelming the API)
  const batchSize = 5;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const promises = batch.map((product) =>
      getProductPrice(product, userId).then((priceInfo) => ({
        productId: product.id,
        priceInfo,
      }))
    );

    const results = await Promise.all(promises);
    results.forEach(({ productId, priceInfo }) => {
      priceMap.set(productId, priceInfo);
    });
  }

  return priceMap;
}

