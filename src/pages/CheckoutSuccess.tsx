import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Heart, ArrowRight } from 'lucide-react';

const CheckoutSuccess: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  const orderDetails = {
    id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: 1250,
    items: 3,
    estimatedDelivery: '2-3 dias úteis'
  };

  return (
    <div className="checkout-success-page min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          {/* Success Animation */}
          <div className={`mb-8 transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full animate-ping"></div>
              <div className="absolute inset-2 w-20 h-20 border-2 border-green-300 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h1 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">
              Pedido Confirmado!
            </h1>
            <p className="text-xl text-text-secondary mb-2">
              Obrigado pela sua compra!
            </p>
            <p className="text-text-secondary">
              Seu pedido foi processado com sucesso e você receberá uma confirmação por WhatsApp em breve.
            </p>
          </div>

          {/* Order Summary */}
          <div className={`bg-gray-50 rounded-xl p-6 mb-8 transition-all duration-1000 delay-500 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Número do Pedido:</span>
                <span className="font-bold">#{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold text-green-600">MT{orderDetails.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Itens:</span>
                <span>{orderDetails.items} produtos</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega Estimada:</span>
                <span className="font-medium">{orderDetails.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className={`mb-8 transition-all duration-1000 delay-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="text-lg font-semibold mb-4">Próximos Passos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <Package className="text-blue-600 mb-2" size={32} />
                <h4 className="font-medium mb-1">Preparação</h4>
                <p className="text-sm text-text-secondary text-center">
                  Seus produtos estão sendo separados
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg">
                <Truck className="text-orange-600 mb-2" size={32} />
                <h4 className="font-medium mb-1">Envio</h4>
                <p className="text-sm text-text-secondary text-center">
                  Enviaremos o código de rastreamento
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <Heart className="text-green-600 mb-2" size={32} />
                <h4 className="font-medium mb-1">Entrega</h4>
                <p className="text-sm text-text-secondary text-center">
                  Receba seus produtos em casa
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-4 transition-all duration-1000 delay-1000 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Link
              to={`/order-tracking/${orderDetails.id}`}
              className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
            >
              Rastrear Pedido
              <ArrowRight size={20} />
            </Link>
            
            <div className="flex gap-4">
              <Link
                to="/products"
                className="btn btn-outline flex-1"
              >
                Continuar Comprando
              </Link>
              <Link
                to="/profile"
                className="btn btn-secondary flex-1"
              >
                Meus Pedidos
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`mt-8 pt-8 border-t text-center transition-all duration-1000 delay-1200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-sm text-text-secondary mb-2">
              Dúvidas sobre seu pedido?
            </p>
            <div className="flex justify-center gap-4">
              <button className="text-accent hover:underline text-sm">
                WhatsApp: +258 84 123 4567
              </button>
              <button className="text-accent hover:underline text-sm">
                Email: suporte@shopfcc.store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;