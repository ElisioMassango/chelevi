import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Heart, Truck, Shield, ArrowLeft, Tag, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { formatPriceWithCurrency } from '../utils/formatPrice';

const Cart: React.FC = () => {
  const t = useTranslation();
  const { formatPrice } = useCurrency();
  const { 
    items, 
    total, 
    loading, 
    error, 
    cartData, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    applyCoupon,
    refreshCart 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    try {
      await applyCoupon(couponCode.trim());
      // Clear the input after successful application
      setCouponCode('');
    } catch (error) {
      // Error is handled in applyCoupon
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Show loading state
  if (loading && items.length === 0) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && items.length === 0) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">{t.cart.errorLoading}</h1>
            <p className="text-text-secondary mb-8">{error}</p>
            <button 
              onClick={refreshCart}
              className="btn btn-primary"
            >
              {t.cart.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{t.cart.emptyTitle}</h1>
            <p className="text-text-secondary mb-8 text-lg">
              {t.cart.emptyDescription}
            </p>
            <Link to="/products" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              {t.cart.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals - ensure all values are numbers
  // ALWAYS calculate subtotal from items to ensure accuracy, especially for variant products
  // The API sub_total may not include variant prices correctly
  const calculatedSubtotal = items.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return sum + itemTotal;
  }, 0);
  
  // Use calculated subtotal from items as primary source
  // Only fallback to API sub_total if calculatedSubtotal is 0 and we have no items
  const subtotal = calculatedSubtotal > 0 
    ? calculatedSubtotal
    : (cartData?.sub_total && typeof cartData.sub_total === 'number' && cartData.sub_total > 0)
      ? cartData.sub_total 
      : (cartData?.sub_total && parseFloat(cartData.sub_total.toString()) > 0)
        ? parseFloat(cartData.sub_total.toString())
        : total;
  
  // Calculate discount - try to get from coupon_info, or calculate from percentage
  let discount = 0;
  if (cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-') {
    if (cartData.coupon_info.coupon_discount_amount) {
      discount = parseFloat(cartData.coupon_info.coupon_discount_amount.toString());
    } else if (cartData.coupon_info.coupon_discount_type === 'percentage' && cartData.coupon_info.coupon_discount_number) {
      // Calculate discount from percentage if amount is not provided
      const discountPercent = parseFloat(cartData.coupon_info.coupon_discount_number.toString());
      discount = (subtotal * discountPercent) / 100;
    }
  }
  
  // Calculate final total - always calculate from subtotal and discount
  // This ensures the total is always correct even if API returns invalid final_price
  let finalTotal = subtotal - discount;
  
  // Only use final_price from API if it's valid, positive, and makes sense
  // Ignore if it's 0 or very different from our calculation
  if (cartData?.final_price) {
    const parsedFinalPrice = parseFloat(cartData.final_price.toString());
    const calculatedTotal = subtotal - discount;
    
    // Only use API value if:
    // 1. It's a valid number
    // 2. It's positive
    // 3. It's close to our calculation (within reasonable range)
    // 4. Our calculated total is also positive
    if (!isNaN(parsedFinalPrice) && 
        parsedFinalPrice > 0 && 
        calculatedTotal > 0 &&
        Math.abs(parsedFinalPrice - calculatedTotal) < (calculatedTotal * 0.5)) { // Within 50% tolerance
      finalTotal = parsedFinalPrice;
    } else {
      // Always use our calculation if API value doesn't make sense
      finalTotal = calculatedTotal;
    }
  }
  
  // Final safety check - ensure finalTotal is never negative or zero when there are items
  if (finalTotal <= 0 && items.length > 0 && subtotal > 0) {
    finalTotal = subtotal - discount;
  }

  return (
    <div className="cart-page py-8 md:py-12 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-primary hover:text-primary/70 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.cart.title}</h1>
              <p className="text-text-secondary mt-1">{items.length} {items.length === 1 ? t.cart.item : t.cart.items} {t.cart.itemsInCart}</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-50"
          >
            {t.cart.clearCart}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant || ''}`} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-4 md:gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-1 truncate">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-text-secondary mb-2">
                            {t.cart.variant} {item.variant}
                          </p>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {t.cart.inStock}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {t.cart.freeDelivery}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                        title={t.cart.removeItem}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-2 md:p-3 hover:bg-gray-200 transition-colors rounded-l-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1 || loading}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[50px] text-center bg-white border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 md:p-3 hover:bg-gray-200 transition-colors rounded-r-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg md:text-xl font-bold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <p className="text-xs md:text-sm text-text-secondary">
                            {formatPrice(item.price)} {t.cart.each}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.cart.continueShoppingTitle}</h3>
                  <p className="text-text-secondary text-sm">{t.cart.continueShoppingText}</p>
                </div>
                <Link to="/products" className="btn btn-outline whitespace-nowrap">
                  {t.cart.viewProducts}
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800">{t.cart.orderSummary}</h2>

              {/* Benefits */}
              <div className="space-y-3 mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck size={16} />
                  </div>
                  <span className="text-sm font-medium">{t.cart.freeShipping}</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <span className="text-sm font-medium">{t.cart.securePurchase}</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart size={16} />
                  </div>
                  <span className="text-sm font-medium">{t.cart.qualityGuarantee}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.cart.couponCode}
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder={t.cart.couponCode}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={applyingCoupon || !!cartData?.coupon_info?.coupon_id}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={applyingCoupon || !couponCode.trim() || !!cartData?.coupon_info?.coupon_id}
                    className="btn btn-secondary px-6 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {applyingCoupon ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      t.cart.apply
                    )}
                  </button>
                </div>
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-' && (
                  <div className="mt-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-green-700 font-semibold text-sm">
                            {t.cart.couponApplied}
                          </span>
                          {discount > 0 && (
                            <span className="text-green-600 font-bold text-lg">
                              -{formatPrice(discount)}
                            </span>
                          )}
                        </div>
                        <p className="text-green-600 text-sm font-medium mb-1">
                          {cartData.coupon_info.coupon_name}
                        </p>
                        <p className="text-green-500 text-xs mb-1">
                          {t.cart.code}: {cartData.coupon_info.coupon_code}
                        </p>
                        {cartData.coupon_info.coupon_discount_type === 'percentage' && cartData.coupon_info.coupon_discount_number && (
                          <p className="text-green-600 text-xs font-medium">
                            {cartData.coupon_info.coupon_discount_number}% OFF
                          </p>
                        )}
                        {discount > 0 && (
                          <p className="text-green-700 text-sm font-bold mt-2 pt-2 border-t border-green-200">
                            {t.cart.discount}: -{formatPrice(discount)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">{t.cart.subtotal} ({items.length} {items.length === 1 ? t.cart.item : t.cart.items})</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-' && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm font-medium">{t.cart.discount} ({cartData.coupon_info.coupon_name})</span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">{t.cart.shipping}</span>
                  <span className="text-green-600 font-semibold">{t.cart.free}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-800">{t.cart.total}</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                </div>
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-' && (
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {formatPrice(subtotal)} - {formatPrice(discount)} = {formatPrice(finalTotal)}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="btn btn-primary w-full text-lg py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {t.cart.checkout}
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline w-full text-center block"
                >
                  {t.cart.continueShopping}
                </Link>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-text-secondary text-center">
                  {t.cart.sslProtected}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
