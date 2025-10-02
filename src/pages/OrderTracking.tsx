import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useOrderDetail, useOrderManagement } from '../hooks/useProducts';
import { useAuth } from '../contexts/AuthContext';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading, error } = useOrderDetail(orderId || '');
  const { cancelOrder } = useOrderManagement();
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
      case 'comfirmed': // Typo fix
        return 'text-blue-600 bg-blue-100';
      case 'picked up':
        return 'text-orange-600 bg-orange-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrackingSteps = (orderStatus: number) => {
    // Mapear status numérico para etapas
    const steps = [
      {
        id: 1,
        title: 'Pedido Confirmado',
        description: 'Seu pedido foi confirmado e está sendo preparado',
        completed: orderStatus >= 1,
        current: orderStatus === 1,
        icon: <CheckCircle size={20} />
      },
      {
        id: 2,
        title: 'Picked Up',
        description: 'Seus produtos foram coletados e estão sendo preparados',
        completed: orderStatus >= 2,
        current: orderStatus === 2,
        icon: <Package size={20} />
      },
      {
        id: 3,
        title: 'Enviado',
        description: 'Seu pedido foi enviado e está a caminho',
        completed: orderStatus >= 3,
        current: orderStatus === 3,
        icon: <Truck size={20} />
      },
      {
        id: 4,
        title: 'Entregue',
        description: 'Seu pedido foi entregue com sucesso',
        completed: orderStatus >= 4,
        current: orderStatus === 4,
        icon: <CheckCircle size={20} />
      }
    ];
    return steps;
  };

  const handleCancelOrder = async () => {
    if (!user?.id || !orderId) return;
    
    if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      try {
        await cancelOrder(orderId, user.id.toString());
        alert('Pedido cancelado com sucesso!');
      } catch (error) {
        console.error('Failed to cancel order:', error);
        alert('Falha ao cancelar pedido. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="order-tracking-page py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-tracking-page py-12">
        <div className="container max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
            <p className="text-text-secondary mb-8">O pedido que você está procurando não existe.</p>
            <Link to="/orders" className="btn btn-primary">
              Voltar aos Pedidos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps(order.order_status || 0);

  return (
    <div className="order-tracking-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/orders" className="inline-flex items-center gap-2 text-accent hover:text-accent/70 transition-colors mb-4">
            <ArrowLeft size={20} />
            Voltar aos Pedidos
          </Link>
          <h1 className="text-3xl font-bold mb-4">Rastreamento do Pedido</h1>
          <p className="text-xl text-text-secondary">{order.order_id}</p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Status do Pedido</h2>
              <p className="text-text-secondary">
                Pedido realizado em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-2xl font-bold">MT{parseFloat(order.final_price).toFixed(2)}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(order.order_status_text)}`}>
                {order.order_status_text}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-secondary transition-all duration-1000"
              style={{ height: `${(trackingSteps.filter(step => step.completed).length / trackingSteps.length) * 100}%` }}
            ></div>

            <div className="space-y-8">
              {trackingSteps.map((step) => (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.completed 
                      ? 'bg-secondary text-text-primary' 
                      : step.current
                      ? 'bg-accent text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.completed || step.current ? 'text-text-primary' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-sm ${
                        step.completed || step.current ? 'text-text-secondary' : 'text-gray-400'
                      }`}>
                        {step.completed ? 'Concluído' : 'Pendente'}
                      </span>
                    </div>
                    <p className={`${
                      step.completed || step.current ? 'text-text-secondary' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {step.current && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">
                          🚚 Seu pedido está sendo transportado e chegará em breve!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Itens do Pedido</h3>
            <div className="space-y-4">
              {order.product.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={ item.image ? (item.image.startsWith('http') ? item.image : `https://dashboard.sparktechnology.cloud/${item.image}`) : '/placeholder-image.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-text-secondary">Quantidade: {item.qty}</p>
                    {item.variant_name && (
                      <p className="text-sm text-text-secondary">Variante: {item.variant_name}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">MT{parseFloat(item.final_price).toFixed(2)}</p>
                    <p className="text-sm text-text-secondary">MT{parseFloat(item.orignal_price).toFixed(2)} cada</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Informações de Entrega</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary mt-1" size={20} />
                <div>
                  <p className="font-semibold">{order.delivery_informations.name}</p>
                  <p className="text-text-secondary">{order.delivery_informations.address}</p>
                  <p className="text-text-secondary">{order.delivery_informations.city}, {order.delivery_informations.state}</p>
                  <p className="text-text-secondary">{order.delivery_informations.country}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-secondary" size={20} />
                <p className="text-text-secondary">{order.delivery_informations.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-secondary" size={20} />
                <p className="text-text-secondary">{order.delivery_informations.email}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Precisa de Ajuda?</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-2 text-accent hover:underline">
                  <Phone size={16} />
                  Ligar para Suporte
                </button>
                <button className="flex items-center gap-2 text-accent hover:underline">
                  <Mail size={16} />
                  Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-8">
          {order.order_status === 0 && (
            <button 
              onClick={handleCancelOrder}
              className="btn btn-outline mr-4 text-red-600 border-red-600 hover:bg-red-50"
            >
              Cancelar Pedido
            </button>
          )}
          <Link to="/orders" className="btn btn-secondary">
            Voltar aos Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;