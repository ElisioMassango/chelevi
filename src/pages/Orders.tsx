import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, RotateCcw, Calendar} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCustomerOrders, useOrderManagement } from '../hooks/useProducts';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders, loading, error } = useCustomerOrders(user?.id?.toString() || '');
  const { cancelOrder, returnProduct } = useOrderManagement();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
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

  const handleCancelOrder = async (orderId: string) => {
    if (!user?.id) return;
    
    if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      try {
        await cancelOrder(orderId, user.id.toString());
        // Refresh orders list
        window.location.reload();
      } catch (error) {
        console.error('Failed to cancel order:', error);
        alert('Falha ao cancelar pedido. Tente novamente.');
      }
    }
  };

  const handleReturnProduct = async (productId: string, variantId: string, orderId: string) => {
    if (window.confirm('Tem certeza que deseja solicitar devolução deste produto?')) {
      try {
        await returnProduct({
          productId,
          variantId,
          orderId,
        });
        alert('Solicitação de devolução enviada com sucesso!');
      } catch (error) {
        console.error('Failed to return product:', error);
        alert('Falha ao solicitar devolução. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="orders-page py-12 min-h-screen bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page py-12 min-h-screen bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Erro ao carregar pedidos</h1>
            <p className="text-text-secondary mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page py-20 min-h-screen bg-gray-50">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package size={64} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Nenhum Pedido Encontrado</h1>
            <p className="text-text-secondary mb-8 text-lg">
              Você ainda não fez nenhum pedido.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Começar a Comprar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page py-8 min-h-screen bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Pedidos</h1>
          <p className="text-text-secondary">
            Acompanhe o status dos seus pedidos e gerencie suas compras
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border shadow-sm">
              {/* Order Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {order.order_id_string}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Pedido feito em {new Date(order.order_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-800">
                      MT{order.amount.toFixed(2)}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.delivered_status_string)}`}>
                      {order.delivered_status_string}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-text-secondary">
                      Data: {new Date(order.order_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {order.delivery_date && (
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-gray-400" />
                      <span className="text-text-secondary">
                        Entrega: {new Date(order.delivery_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary">
                      Pontos: {order.reward_points}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Ver Detalhes
                  </Link>
                  
                  {order.delivered_status === 0 && (
                    <button
                      onClick={() => handleCancelOrder(order.id.toString())}
                      className="btn btn-outline btn-sm text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Cancelar Pedido
                    </button>
                  )}
                  
                  {order.delivered_status === 1 && order.return_status === 0 && (
                    <button
                      onClick={() => handleReturnProduct('1', '0', order.id.toString())}
                      className="btn btn-outline btn-sm text-blue-600 border-blue-600 hover:bg-blue-50 inline-flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Solicitar Devolução
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {orders.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-sm" disabled>
                Anterior
              </button>
              <span className="px-4 py-2 text-sm text-text-secondary">
                Página 1 de 1
              </span>
              <button className="btn btn-outline btn-sm" disabled>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
