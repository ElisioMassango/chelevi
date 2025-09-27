import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    mpesaNumber: ''
  });
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate order processing with loading
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('Processing order...', { formData, items, total });
      
      clearCart();
      navigate('/checkout-success');
    } catch (error) {
      console.error('Order processing failed:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = total;
  const tax = total * 0.17;
  const shipping = 0; // Free shipping
  const grandTotal = subtotal + tax + shipping;

  return (
    <div className="checkout-page py-12">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <Loader2 size={48} className="animate-spin text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Processando seu pedido...</h3>
              <p className="text-text-secondary">
                Estamos finalizando sua compra. Isso pode levar alguns segundos.
              </p>
            </div>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>✓ Validando informações de pagamento</p>
              <p>✓ Confirmando disponibilidade dos produtos</p>
              <p>⏳ Processando transação...</p>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Mail size={20} />
                  Contact Information
                </h2>
                
                <div className="grid grid-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sobrenome</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Endereço de Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      defaultValue={user?.email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Número de Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      defaultValue={user?.phone}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6">Método de Entrega</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                      className="mr-3"
                    />
                    <MapPin className="mr-3 text-accent" size={20} />
                    <div>
                      <div className="font-semibold">Entrega para Casa</div>
                      <div className="text-sm text-text-secondary">Entrega grátis dentro de Maputo</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                      className="mr-3"
                    />
                    <div className="mr-3 text-accent">🏪</div>
                    <div>
                      <div className="font-semibold">Retirada na Loja</div>
                      <div className="text-sm text-text-secondary">Retirada na loja</div>
                    </div>
                  </label>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-6 space-y-4">
                    <div className="form-group">
                      <label className="form-label">Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Endereço"
                        required
                      />
                    </div>
                    <div className="grid grid-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Cidade</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Código Postal</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                            📍 Você pode marcar sua localização exata no Google Maps para entrega precisa.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard size={20} />
                  Método de Pagamento
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'mpesa')}
                      className="mr-3"
                    />
                    <Smartphone className="mr-3 text-green-600" size={20} />
                    <div>
                      <div className="font-semibold">M-Pesa</div>
                      <div className="text-sm text-text-secondary">Pagar com M-Pesa</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                      className="mr-3"
                      disabled
                    />
                    <CreditCard className="mr-3 text-gray-400" size={20} />
                    <div>
                      <div className="font-semibold">Cartão de Crédito/Débito</div>
                      <div className="text-sm text-text-secondary">Em breve</div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="mt-6">
                    <div className="form-group">
                      <label className="form-label">Número de M-Pesa</label>
                      <input
                        type="tel"
                        name="mpesaNumber"
                        value={formData.mpesaNumber}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Número de M-Pesa"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant || ''}`} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        {item.variant && (
                          <p className="text-xs text-text-secondary">{item.variant}</p>
                        )}
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-text-secondary">Quantidade: {item.quantity}</span>
                          <span className="font-semibold">MT{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>MT{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-success">Grátis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imposto (17%)</span>
                    <span>MT{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>MT{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary w-full mt-6"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Processando...
                    </>
                  ) : (
                    'Colocar Pedido'
                  )}
                </button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-text-secondary text-center">
                      🔒 Suas informações de pagamento são seguras e criptografadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;