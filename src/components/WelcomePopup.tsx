import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Gift, Star, Truck, Heart } from 'lucide-react';

interface WelcomePopupProps {
  userName: string;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ userName, onClose }) => {
  const [countdown, setCountdown] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-close after 6 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Bem-vindo à Chelevi!
          </h2>
          <p className="text-white text-opacity-90">
            Olá {userName}, é um prazer tê-lo connosco!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Produtos Exclusivos</h3>
                <p className="text-sm text-gray-600">Acesso à nossa coleção única</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ofertas Especiais</h3>
                <p className="text-sm text-gray-600">Descontos exclusivos para membros</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Entrega Rápida</h3>
                <p className="text-sm text-gray-600">Em todo o país</p>
              </div>
            </div>
          </div>

          {/* Discount Code */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <h4 className="font-bold text-gray-900 mb-2">🎁 Oferta de Boas-vindas</h4>
              <div className="bg-white rounded-lg p-3 border-2 border-dashed border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Use o código:</p>
                <p className="text-xl font-bold text-purple-600">WELCOME10</p>
                <p className="text-sm text-gray-600">10% de desconto na primeira compra</p>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Esta janela fechará automaticamente em <span className="font-bold text-purple-600">{countdown}s</span>
            </p>
            
            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Explorar Loja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
