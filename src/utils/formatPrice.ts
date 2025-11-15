/**
 * Format price with comma separator for values >= 1000
 * Example: 6400 -> "6,400" | 500 -> "500"
 * @deprecated Use useCurrency().formatPrice() instead for currency conversion
 */
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return '0';
  }
  
  // Format with comma if >= 1000
  if (numPrice >= 1000) {
    return numPrice.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  
  // Return with 2 decimal places for values < 1000
  return numPrice.toFixed(2);
};

/**
 * Format price with MT suffix (always in MT, no conversion)
 * Use this for checkout and places where MT is required
 * Example: 6400 -> "6,400 MT" | 500 -> "500.00 MT"
 */
export const formatPriceWithCurrency = (price: number | string): string => {
  const formatted = formatPrice(price);
  return `${formatted} MT`;
};

