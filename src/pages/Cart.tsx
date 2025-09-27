import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page py-20">
        <div className="container text-center">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant || ''}`} className="flex gap-4 p-6 bg-white rounded-lg border border-gray-200">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-sm text-text-secondary">
                          Variant: {item.variant}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-secondary hover:text-error transition-colors ml-4"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="font-bold text-text-primary">
                        MT{(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-sm text-text-secondary">
                          MT{item.price} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>MT{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>MT{(total * 0.17).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>MT{(total * 1.17).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn btn-primary w-full mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="btn btn-outline w-full text-center block"
              >
                Continue Shopping
              </Link>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="form-input flex-1"
                  />
                  <button className="btn btn-secondary">Apply</button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">We Accept</h3>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    MPESA
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded text-gray-600 text-xs flex items-center justify-center">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded text-gray-600 text-xs flex items-center justify-center">
                    MC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;