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
    <div className="checkout-success-page min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG")`,
      }}></div>

      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Success Animation - Luxurious */}
        <div className={`text-center mb-12 transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative inline-block">
            {/* Main Success Icon */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 border-4 border-green-400/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 border-2 border-green-300/40 rounded-full animate-pulse"></div>
              {/* Sparkles */}
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={24} />
              <Sparkles className="absolute -bottom-2 -left-2 text-yellow-400 animate-pulse delay-300" size={20} />
            </div>
          </div>

          {/* Success Message - Premium */}
          <div className={`transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-gray-400 mb-4 block">
                {t.checkoutSuccess.orderConfirmed}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.checkoutSuccess.thankYou}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.checkoutSuccess.confirmationText}
            </p>
          </div>
        </div>

        {/* Order Summary - Luxurious Card */}
        <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 mb-8 border border-white/20 shadow-2xl transition-all duration-1000 delay-500 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Gift className="text-white" size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{t.checkoutSuccess.orderSummary}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Number - Highlighted */}
            <div className="md:col-span-2 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-green-400/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <Package className="text-green-300" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">{t.checkoutSuccess.orderNumber}</p>
                  <p className="text-2xl font-bold text-white">#{orderDetails.id}</p>
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Calendar className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{t.checkoutSuccess.orderDate}</p>
                  <p className="text-base font-semibold text-white">{orderDetails.orderDate} {t.checkoutSuccess.at} {orderDetails.orderTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CreditCard className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{t.checkoutSuccess.paymentMethod}</p>
                  <p className="text-base font-semibold text-white">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Package className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{t.checkoutSuccess.items}</p>
                  <p className="text-base font-semibold text-white">{orderDetails.items} {t.checkoutSuccess.products}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Clock className="text-gray-400 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{t.checkoutSuccess.estimatedDelivery}</p>
                  <p className="text-base font-semibold text-white">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Total - Premium Highlight */}
            <div className="md:col-span-2 mt-4 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-2xl border border-green-400/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Gift className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 uppercase tracking-wide">{t.checkoutSuccess.total}</p>
                    <p className="text-3xl md:text-4xl font-bold text-white">MT{orderDetails.total.toFixed(2)}</p>
                  </div>
                </div>
                <Sparkles className="text-yellow-400 hidden md:block" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps - Premium Cards */}
        <div className={`mb-8 transition-all duration-1000 delay-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">{t.checkoutSuccess.nextSteps}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preparation */}
            <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="text-white" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t.checkoutSuccess.preparation}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t.checkoutSuccess.preparationText}
                </p>
              </div>
            </div>

            {/* Shipping */}
            <div className="group bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="text-white" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t.checkoutSuccess.shipping}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t.checkoutSuccess.shippingText}
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="group bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="text-white" size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t.checkoutSuccess.delivery}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
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
            className="group block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Package size={20} />
            <span>{t.checkoutSuccess.trackOrder}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/products"
              className="group block w-full bg-white/10 backdrop-blur-xl text-white font-semibold py-4 px-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>{t.checkoutSuccess.continueShopping}</span>
            </Link>
            <Link
              to="/profile"
              className="group block w-full bg-white/10 backdrop-blur-xl text-white font-semibold py-4 px-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Heart size={18} />
              <span>{t.checkoutSuccess.myOrders}</span>
            </Link>
          </div>
        </div>

        {/* Contact Info - Premium */}
        <div className={`mt-12 pt-8 border-t border-white/20 text-center transition-all duration-1000 delay-1200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-base text-gray-300 mb-6">
            {t.checkoutSuccess.orderQuestions}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://wa.me/258852232423" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-green-600/20 hover:bg-green-600/30 text-white font-semibold rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
            >
              <Phone size={18} />
              <span>{t.checkoutSuccess.whatsapp}</span>
            </a>
            <a 
              href="mailto:suporte@chelevi.com"
              className="group flex items-center gap-3 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-white font-semibold rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
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