import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { 
    items, 
    total, 
    loading, 
    error, 
    cartData, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    applyCoupon,
    refreshCart 
  } = useCart();

  // Show loading state
  if (loading) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Erro ao carregar carrinho</h1>
            <p className="text-text-secondary mb-8">{error}</p>
            <button 
              onClick={refreshCart}
              className="btn btn-primary"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page py-20 min-h-screen bg-gray-50">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Seu Carrinho está Vazio</h1>
            <p className="text-text-secondary mb-8 text-lg">
              Parece que você ainda não adicionou nenhum item ao seu carrinho.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-8 min-h-screen bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-accent hover:text-accent/70 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Carrinho de Compras</h1>
              <p className="text-text-secondary">{items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
          >
            Limpar Carrinho
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant || ''}`} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-text-secondary">
                            Variante: {item.variant}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Em estoque
                          </span>
                          <span className="text-xs text-text-secondary">
                            Entrega grátis
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[60px] text-center bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">
                          MT{(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <p className="text-sm text-text-secondary">
                            MT{item.price} cada
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Continue Comprando</h3>
                  <p className="text-text-secondary">Descubra mais produtos incríveis</p>
                </div>
                <Link to="/products" className="btn btn-outline">
                  Ver Produtos
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Resumo do Pedido</h2>

              {/* Benefits */}
              <div className="space-y-3 mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3 text-green-700">
                  <Truck size={20} />
                  <span className="text-sm font-medium">Entrega grátis</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <Shield size={20} />
                  <span className="text-sm font-medium">Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <Heart size={20} />
                  <span className="text-sm font-medium">Garantia de qualidade</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código do cupom"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    id="couponCode"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const couponInput = document.getElementById('couponCode') as HTMLInputElement;
                      if (couponInput?.value) {
                        applyCoupon(couponInput.value);
                      }
                    }}
                    className="btn btn-secondary px-6"
                  >
                    Aplicar
                  </button>
                </div>
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && (
                  <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-green-700 font-medium text-sm">
                          Cupom Aplicado: {cartData.coupon_info.coupon_name}
                        </span>
                        <p className="text-green-600 text-xs mt-1">
                          Código: {cartData.coupon_info.coupon_code}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 font-bold text-lg">
                          -MT{parseFloat(cartData.coupon_info.coupon_discount_amount).toFixed(2)}
                        </span>
                        <p className="text-green-600 text-xs">
                          {cartData.coupon_info.coupon_discount_type === 'percentage' 
                            ? `${cartData.coupon_info.coupon_discount_number}% OFF`
                            : 'Desconto Fixo'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                  <span>MT{cartData?.sub_total?.toFixed(2) || total.toFixed(2)}</span>
                </div>
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({cartData.coupon_info.coupon_name})</span>
                    <span>-MT{parseFloat(cartData.coupon_info.coupon_discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impostos</span>
                  <span>MT{cartData?.total_tax_price || (total * 0.17).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>MT{cartData?.final_price || (total * 1.17).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    Impostos incluídos
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="btn btn-primary w-full text-lg py-4"
                >
                  Finalizar Compra
                </Link>

                <Link
                  to="/products"
                  className="btn btn-outline w-full text-center block"
                >
                  Continuar Comprando
                </Link>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-text-secondary text-center">
                  🔒 Suas informações estão protegidas com criptografia SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;