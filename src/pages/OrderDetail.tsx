import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Truck } from 'lucide-react';
import { useOrderDetail, useOrderManagement } from '../hooks/useProducts';
import { useAuth } from '../contexts/AuthContext';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading, error } = useOrderDetail(orderId || '');
  const { cancelOrder, returnProduct } = useOrderManagement();
  const { user } = useAuth();

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

  const handleReturnProduct = async (productId: string, variantId: string) => {
    if (!orderId) return;
    
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
      <div className="order-detail-page py-12 min-h-screen bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-detail-page py-12 min-h-screen bg-gray-50">
        <div className="container">
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

  return (
    <div className="order-detail-page py-8 min-h-screen bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <Link to="/orders" className="inline-flex items-center gap-2 text-accent hover:text-accent/70 transition-colors mb-4">
            <ArrowLeft size={20} />
            Voltar aos Pedidos
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {order.order_id}
              </h1>
              <p className="text-text-secondary">
                Pedido feito em {new Date(order.order_date || '').toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                MT{parseFloat(order.final_price).toFixed(2)}
              </div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.order_status_text)}`}>
                {order.order_status_text}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package size={20} className="text-accent" />
                Produtos
              </h2>
              <div className="space-y-4">
                {order.product.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={product.image ? (product.image.startsWith('http') ? product.image : `https://dashboard.sparktechnology.cloud/${product.image}`) : '/placeholder-image.jpg'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{product.name}</h3>
                      <p className="text-sm text-text-secondary">
                        Quantidade: {product.qty}
                      </p>
                      {product.variant_name && (
                        <p className="text-sm text-text-secondary">
                          Variante: {product.variant_name}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        MT{parseFloat(product.final_price).toFixed(2)}
                      </div>
                      {product.return === 0 && order.order_status === 1 && (
                        <button
                          onClick={() => handleReturnProduct(product.product_id.toString(), product.variant_id.toString())}
                          className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                        >
                          Solicitar Devolução
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                Informações de Cobrança
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome</label>
                  <p className="text-gray-800">{order.billing_informations.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{order.billing_informations.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Telefone</label>
                  <p className="text-gray-800">{order.billing_informations.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cidade</label>
                  <p className="text-gray-800">{order.billing_informations.city}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Endereço</label>
                  <p className="text-gray-800">{order.billing_informations.address}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck size={20} className="text-accent" />
                Informações de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome</label>
                  <p className="text-gray-800">{order.delivery_informations.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{order.delivery_informations.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Telefone</label>
                  <p className="text-gray-800">{order.delivery_informations.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cidade</label>
                  <p className="text-gray-800">{order.delivery_informations.city}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Endereço</label>
                  <p className="text-gray-800">{order.delivery_informations.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Status do Pedido</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status_text)}`}>
                    {order.order_status_text}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pagamento</span>
                  <span className="text-sm font-medium text-green-600">{order.payment_status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Método de Pagamento</span>
                  <span className="text-sm font-medium">{order.paymnet_type}</span>
                </div>
                {order.delivery_date && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data de Entrega</span>
                    <span className="text-sm font-medium">
                      {new Date(order.delivery_date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">MT{parseFloat(order.sub_total).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taxa de Entrega</span>
                  <span className="text-sm font-medium">MT{parseFloat(order.delivered_charge).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Impostos</span>
                  <span className="text-sm font-medium">MT{parseFloat(order.tax_price).toFixed(2)}</span>
                </div>
                {order.coupon_info && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Desconto</span>
                    <span className="text-sm font-medium text-green-600">
                      -MT{parseFloat(order.coupon_info.coupon_discount_amount || '0').toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-lg text-gray-800">MT{parseFloat(order.final_price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Ações</h2>
              <div className="space-y-3">
                {order.order_status === 0 && (
                  <button
                    onClick={handleCancelOrder}
                    className="w-full btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Cancelar Pedido
                  </button>
                )}
                <Link
                  to="/orders"
                  className="w-full btn btn-secondary text-center"
                >
                  Voltar aos Pedidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
