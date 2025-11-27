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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl">
  
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 p-8 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
  
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
  
          <h2 className="text-2xl font-bold text-white mb-2">
            Bem-vindo à CheLeVi!
          </h2>
  
          <p className="text-white/90">
            Olá {userName}, é um prazer tê-lo connosco.
          </p>
        </div>
  
        {/* Content (all white text) */}
        <div className="p-6 text-gray-800">
  
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Produtos Exclusivos</h3>
                <p className="text-sm text-gray-600">Acesso à nossa coleção única</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Qualidade Premium</h3>
                <p className="text-sm text-gray-600">Peças seleccionadas com rigor</p>
              </div>
            </div>
  
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Entrega Segura</h3>
                <p className="text-sm text-gray-600">Envios para todo o país</p>
              </div>
            </div>
          </div>
  
          {/* Countdown */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Este ecrã fechará automaticamente em{" "}
              <span className="font-bold text-gray-800">{countdown}s</span>
            </p>
  
            <button
              onClick={handleClose}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-black transition-all duration-200"
            >
              Entrar na Loja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default WelcomePopup;
