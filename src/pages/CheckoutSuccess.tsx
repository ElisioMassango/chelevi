import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Heart, ArrowRight, Sparkles, Gift, Mail, Phone, Calendar, CreditCard, Clock } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

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

  const orderDetails = {
    id: orderId ? `#${orderId}` : 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: typeof orderData?.subTotal === 'number' ? orderData.subTotal : (typeof orderData?.finalPrice === 'number' ? orderData.finalPrice : parseFloat(orderData?.subTotal || orderData?.finalPrice || 0)),
    items: orderData?.items?.length || 0,
    estimatedDelivery: '2-3 business days',
    paymentMethod: orderData?.paymentType || 'M-Pesa',
    orderDate: new Date().toLocaleDateString('pt-BR'),
    orderTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };

  return (
    <div className="checkout-success-page min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Effects - Subtle */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-3" style={{
        backgroundImage: `url("https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG")`,
      }}></div>

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
                  </div>
                </div>
              </div>
            </div>
          </div>
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