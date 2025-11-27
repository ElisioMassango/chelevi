import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Heart, ArrowRight, Sparkles, Gift, Mail, Phone, Calendar, CreditCard, Clock } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { env } from '../config/environment';

const CheckoutSuccess: React.FC = () => {
  const t = useTranslation();
  const [showAnimation, setShowAnimation] = useState(false);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  // Calculate subtotal from products
  const calculateSubtotal = () => {
    if (orderData?.products && Array.isArray(orderData.products) && orderData.products.length > 0) {
      const totalFromProducts = orderData.products.reduce((sum: number, item: any) => {
        let price = 0;
        // Try final_price first
        if (item.final_price && parseFloat(item.final_price) > 0) {
          price = parseFloat(item.final_price);
        } 
        // If final_price is 0 or missing, try total_orignal_price
        else if (item.total_orignal_price && parseFloat(item.total_orignal_price) > 0) {
          price = parseFloat(item.total_orignal_price);
        } 
        // If both are 0, calculate from orignal_price * qty
        else if (item.orignal_price && parseFloat(item.orignal_price) > 0) {
          const qty = parseInt(item.qty) || 1;
          price = parseFloat(item.orignal_price) * qty;
        }
        return sum + price;
      }, 0);
      
      if (totalFromProducts > 0) {
        return totalFromProducts;
      }
    }
    
    // Fallback to API subtotal
    if (orderData?.subTotal && parseFloat(orderData.subTotal.toString()) > 0) {
      return parseFloat(orderData.subTotal.toString());
    }
    
    return 0;
  };

  // Calculate total correctly, considering products with variants and coupon discount
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const couponDiscount = orderData?.couponInfo?.discount_amount 
      ? parseFloat(orderData.couponInfo.discount_amount.toString()) 
      : 0;
    const deliveryCharge = orderData?.deliveryCharge ? parseFloat(orderData.deliveryCharge.toString()) : 0;
    const taxPrice = orderData?.tax?.tax_price ? parseFloat(orderData.tax.tax_price.toString()) : 0;
    
    // Calculate: Subtotal - Discount + Delivery + Tax
    const calculatedTotal = subtotal - couponDiscount + deliveryCharge + taxPrice;
    
    // Use calculated total if > 0, otherwise try orderData.finalPrice
    if (calculatedTotal > 0) {
      return calculatedTotal;
    }
    
    // Fallback to API finalPrice if available
    if (orderData?.finalPrice && parseFloat(orderData.finalPrice.toString()) > 0) {
      return parseFloat(orderData.finalPrice.toString());
    }
    
    return 0;
  };

  const orderDetails = {
    id: orderId ? `#${orderId}` : 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: calculateTotal(),
    subtotal: calculateSubtotal(),
    items: orderData?.products?.length || orderData?.items?.length || 0,
    estimatedDelivery: '2-3 business days',
    paymentMethod: orderData?.paymentType || 'M-Pesa',
    orderDate: new Date().toLocaleDateString('pt-BR'),
    orderTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    products: orderData?.products || []
  };

  // Get API base URL for images
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const apiBaseUrl = env.api.baseUrl.replace('/api', '');
    return `${apiBaseUrl}/${imagePath}`;
  };

  // Get product price correctly
  const getProductPrice = (item: any) => {
    if (item.final_price && parseFloat(item.final_price) > 0) {
      return parseFloat(item.final_price);
    }
    if (item.total_orignal_price && parseFloat(item.total_orignal_price) > 0) {
      return parseFloat(item.total_orignal_price);
    }
    if (item.orignal_price && parseFloat(item.orignal_price) > 0) {
      const qty = parseInt(item.qty) || 1;
      return parseFloat(item.orignal_price) * qty;
    }
    return 0;
  };

  return (
    <div className="checkout-success-page min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Effects - Subtle */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      {/* Pattern Overlay - Removed background image */}

      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Success Animation - Luxurious */}
        <div className={`text-center mb-12 transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative inline-block">
            {/* Main Success Icon */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={64} className="text-text-primary" strokeWidth={2.5} />
              </div>
              {/* Animated rings - subtle */}
              <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 rounded-full animate-ping"></div>
              <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 border-2 border-secondary/30 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Success Message - Premium */}
          <div className={`transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-text-secondary/60 mb-4 block">
                {t.checkoutSuccess.orderConfirmed}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {t.checkoutSuccess.thankYou}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.checkoutSuccess.confirmationText}
            </p>
          </div>
        </div>

        {/* Order Summary - Luxurious Card */}
        <div className={`bg-white rounded-3xl p-8 md:p-10 mb-8 border border-gray-200 shadow-lg transition-all duration-1000 delay-500 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Gift className="text-text-primary" size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{t.checkoutSuccess.orderSummary}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Number - Highlighted */}
            <div className="md:col-span-2 bg-secondary/50 rounded-2xl p-6 border border-primary/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center">
                  <Package className="text-text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary/70 uppercase tracking-wide">{t.checkoutSuccess.orderNumber}</p>
                  <p className="text-2xl font-bold text-text-primary">#{orderDetails.id}</p>
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Calendar className="text-text-secondary/60 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary/70 mb-1">{t.checkoutSuccess.orderDate}</p>
                  <p className="text-base font-semibold text-text-primary">{orderDetails.orderDate} {t.checkoutSuccess.at} {orderDetails.orderTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <CreditCard className="text-text-secondary/60 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary/70 mb-1">{t.checkoutSuccess.paymentMethod}</p>
                  <p className="text-base font-semibold text-text-primary">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Package className="text-text-secondary/60 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary/70 mb-1">{t.checkoutSuccess.items}</p>
                  <p className="text-base font-semibold text-text-primary">{orderDetails.items} {t.checkoutSuccess.products}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Clock className="text-text-secondary/60 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary/70 mb-1">{t.checkoutSuccess.estimatedDelivery}</p>
                  <p className="text-base font-semibold text-text-primary">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Coupon Information - If Applied */}
            {orderData?.couponInfo && orderData.couponInfo.status && (
              <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-200">
                <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Gift className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-800 uppercase tracking-wide">Cupom Aplicado</p>
                      <p className="text-lg font-bold text-green-700">{orderData.couponInfo.code}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-green-700">
                      {orderData.couponInfo.discount_string || `Desconto de ${orderData.couponInfo.discount}%`}
                    </p>
                    <p className="text-base font-semibold text-green-800">
                      Desconto: -MT{parseFloat(orderData.couponInfo.discount_amount || '0').toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Total - Premium Highlight */}
            <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between p-6 bg-primary/10 rounded-2xl border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Gift className="text-text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary/70 uppercase tracking-wide">{t.checkoutSuccess.total}</p>
                    <p className="text-3xl md:text-4xl font-bold text-text-primary">MT{orderDetails.total.toFixed(2)}</p>
                    {orderData?.couponInfo && orderData.couponInfo.status && (
                      <p className="text-xs text-text-secondary/60 mt-1 line-through">
                        MT{calculateSubtotal().toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products List - New Section */}
          {orderDetails.products && orderDetails.products.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                <Package className="text-text-primary" size={24} />
                {t.checkoutSuccess.productsPurchased}
              </h4>
              <div className="space-y-4">
                {orderDetails.products.map((product: any, index: number) => {
                  const productPrice = getProductPrice(product);
                  const variantInfo = product.variant_name && product.variant_name.trim() 
                    ? ` (${product.variant_name})` 
                    : '';
                  
                  return (
                    <div 
                      key={product.cart_id || product.product_id || index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 transition-all"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-white border border-gray-200">
                        <img 
                          src={getImageUrl(product.image)} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.png';
                          }}
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base md:text-lg font-semibold text-text-primary mb-1 truncate">
                          {product.name}{variantInfo}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>Qty: {product.qty}</span>
                          {product.variant_name && product.variant_name.trim() && (
                            <span className="px-2 py-1 bg-primary/10 rounded text-text-primary text-xs">
                              {product.variant_name}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Product Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg md:text-xl font-bold text-text-primary">
                          MT{productPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Next Steps - Premium Cards */}
        <div className={`mb-8 transition-all duration-1000 delay-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 text-center">{t.checkoutSuccess.nextSteps}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preparation */}
            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                  <Package className="text-text-primary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{t.checkoutSuccess.preparation}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t.checkoutSuccess.preparationText}
                </p>
              </div>
            </div>

            {/* Shipping */}
            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary/40 transition-colors duration-300">
                  <Truck className="text-text-primary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{t.checkoutSuccess.shipping}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t.checkoutSuccess.shippingText}
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-300">
                  <Heart className="text-text-primary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{t.checkoutSuccess.delivery}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t.checkoutSuccess.deliveryText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Premium */}
        <div className={`space-y-4 transition-all duration-1000 delay-1000 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Link
            to={`/order-tracking/${orderId || orderDetails.id}`}
            className="group block w-full bg-primary text-text-primary font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Package size={20} />
            <span>{t.checkoutSuccess.trackOrder}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/products"
              className="group block w-full bg-white text-text-primary font-semibold py-4 px-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>{t.checkoutSuccess.continueShopping}</span>
            </Link>
            <Link
              to="/profile"
              className="group block w-full bg-white text-text-primary font-semibold py-4 px-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Heart size={18} />
              <span>{t.checkoutSuccess.myOrders}</span>
            </Link>
          </div>
        </div>

        {/* Contact Info - Premium */}
        <div className={`mt-12 pt-8 border-t border-gray-200 text-center transition-all duration-1000 delay-1200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-base text-text-secondary mb-6">
            {t.checkoutSuccess.orderQuestions}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://wa.me/258852232423" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white text-text-primary font-semibold rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Phone size={18} />
              <span>{t.checkoutSuccess.whatsapp}</span>
            </a>
            <a 
              href="mailto:suporte@chelevi.com"
              className="group flex items-center gap-3 px-6 py-3 bg-white text-text-primary font-semibold rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Mail size={18} />
              <span>{t.checkoutSuccess.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;