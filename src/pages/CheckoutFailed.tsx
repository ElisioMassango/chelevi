import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw, Home, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const CheckoutFailed: React.FC = () => {
  const t = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get error message from navigation state
  const errorMessage = location.state?.error || t.checkoutFailed.defaultError;

  const handleRetry = () => {
    navigate('/checkout');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          
          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.checkoutFailed.title}
          </h1>
          
          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">
              {errorMessage}
            </p>
          </div>
          
          {/* Help Text */}
          <p className="text-gray-600 mb-8">
            {t.checkoutFailed.helpText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Retry Button */}
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>{t.checkoutFailed.tryAgain}</span>
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoToCart}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span>{t.checkoutFailed.viewCart}</span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Home size={18} />
              <span>{t.checkoutFailed.home}</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            {t.checkoutFailed.needHelp}
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            {t.checkoutFailed.helpText}
          </p>
          <div className="space-y-1 text-sm text-blue-800">
            <p>📧 Email: info@chelevi.com</p>
            <p>📱 WhatsApp: +258 85 22 32 423</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowLeft size={16} />
            <span>{t.checkoutFailed.back}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailed;
