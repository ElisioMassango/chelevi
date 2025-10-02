import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, CreditCard, Smartphone, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useShippingMethods, useOrderManagement } from '../hooks/useProducts';
import { BillingInfo } from '../services/api';
import CheckoutLocationSelector from '../components/CheckoutLocationSelector';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    mpesaNumber: '',
    country: '',
    state: '',
    cityId: '',
    // Billing specific
    billingAddress: '',
    billingCity: '',
    billingCityName: '', // Nome da cidade para billing
    billingPostalCode: '',
    billingCountry: '',
    billingState: '',
    billingCityId: '',
    // Shipping specific
    shippingAddress: '',
    shippingCity: '',
    shippingCityName: '', // Nome da cidade para shipping
    shippingPostalCode: '',
    shippingCountry: '',
    shippingState: '',
    shippingCityId: '',
    // Checkbox to use same address
    useSameAddress: true,
    // Delivery comment
    deliveryComment: ''
  });

  const { items, total, clearCart, cartData } = useCart();
  const { user } = useAuth();
  const { methods: shippingMethods, loading: shippingLoading } = useShippingMethods();
  const { placeOrder } = useOrderManagement();

  // Validações de segurança
  React.useEffect(() => {
    // Verificar se o usuário está logado
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Verificar se há produtos no carrinho
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, items, navigate]);

  // Auto-fill dos campos de contato quando logado
  React.useEffect(() => {
    if (user && !formData.email) { // Only auto-fill if not already filled
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        firstName: user.first_name || user.name?.split(' ')[0] || prev.firstName,
        lastName: user.last_name || user.name?.split(' ').slice(1).join(' ') || prev.lastName,
      }));
    }
  }, [user, formData.email]);

  // Função para obter nome da cidade pelo ID
  const getCityNameById = (cityId: string): string => {
    // Mapeamento básico de IDs para nomes de cidades
    const cityMap: { [key: string]: string } = {
      '4689': 'Maputo',
      '4690': 'Matola',
      '4700': 'Beira',
      '4701': 'Nampula',
      '4702': 'Chimoio',
      '4703': 'Nacala',
      '4704': 'Quelimane',
      '4705': 'Tete',
      '4706': 'Pemba',
      '4707': 'Lichinga',
      '4708': 'Inhambane',
      '4709': 'Xai-Xai',
      '4710': 'Gaza',
      '4711': 'Manica',
      '4712': 'Sofala',
      '4713': 'Zambézia',
      '4714': 'Cabo Delgado',
      '4715': 'Niassa',
      '4716': 'Tete',
      '4717': 'Manica',
      '4718': 'Sofala',
      '4719': 'Zambézia',
      '4720': 'Nampula',
    };
    return cityMap[cityId] || 'Maputo'; // Fallback para Maputo
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (!user?.id) {
      alert('Please login to place an order');
      return;
    }

    // Validate billing address
    if (!formData.billingCountry || !formData.billingState || !formData.billingCityId) {
      alert('Por favor, preencha o endereço de cobrança completamente');
      setIsProcessing(false);
      return;
    }

    // Validate billing address field
    if (!formData.billingAddress && !formData.address) {
      alert('Por favor, preencha o endereço de cobrança');
      setIsProcessing(false);
      return;
    }

    // Validate shipping address if not using same address
    if (!formData.useSameAddress) {
      if (!formData.shippingCountry || !formData.shippingState || !formData.shippingCityId) {
        alert('Por favor, preencha o endereço de entrega completamente');
        setIsProcessing(false);
        return;
      }
    }

    try {
      // Ensure all required fields are present
      const billingInfo: BillingInfo = {
        // Billing Information
        billing_postecode: formData.billingPostalCode || formData.postalCode || '0000',
        email: formData.email || 'user@example.com',
        billing_city: formData.billingCityName || 'Maputo', // NOME da cidade
        lastname: formData.lastName || 'User',
        billing_company_name: '',
        billing_address: formData.billingAddress || formData.address || 'Endereço não informado',
        billing_user_telephone: formData.phone || '000000000',
        firstname: formData.firstName || 'User',
        billing_country: formData.billingCountry || formData.country || '150', // ID do país
        billing_state: formData.billingState || formData.state || '1', // ID do estado
        
        // Delivery/Shipping Information
        delivery_city: formData.shippingCityName || formData.billingCityName || 'Maputo', // NOME da cidade
        delivery_state: formData.shippingState || formData.billingState || '1', // ID do estado
        delivery_postcode: formData.shippingPostalCode || formData.billingPostalCode || '0000',
        delivery_country: formData.shippingCountry || formData.billingCountry || '150', // ID do país
        delivery_address: formData.shippingAddress || formData.billingAddress || 'Address',
      };

      console.log('Billing Info:', billingInfo);

      const orderData = {
        paymentType: paymentMethod === 'mpesa' ? 'cod' : 'card',
        billingInfo,
        couponInfo: cartData?.coupon_info || {},
        deliveryComment: formData.deliveryComment || '', // Usar o comentário do formulário
        userId: user.id.toString(),
        customerId: user.id.toString(),
        paymentComment: formData.deliveryComment || '',
        deliveryId: selectedShippingMethod || '1',
        subTotal: cartData?.final_price ? parseFloat(cartData.final_price) : total,
        //couponCode: cartData?.coupon_code || '-',
      };

      console.log('Order Data:', orderData);
      console.log('Cart Data:', cartData);

      const result = await placeOrder(orderData);
      
      console.log('Order placed successfully:', result);
      
      // Navigate first, then clear cart
      navigate('/checkout-success', { 
        state: { 
          orderId: result.order_id,
          orderData: {
            subTotal: orderData.subTotal,
            items: items,
            paymentType: orderData.paymentType,
            billingInfo: orderData.billingInfo
          }
        } 
      });
      
      // Clear cart after navigation
      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('Failed to place order. Please try again.');
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
                      <div className="font-semibold">Levantar na Loja</div>
                      <div className="text-sm text-text-secondary">Levantar na loja</div>
                    </div>
                  </label>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-6 space-y-6">
                    {/* Billing Address Section */}
                    <div className="bg-white p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold mb-4">Endereço de Cobrança</h3>
                      <div className="space-y-4">
                        <div className="form-group">
                          <label className="form-label">Endereço de Cobrança</label>
                          <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Endereço de cobrança"
                            required
                          />
                        </div>
                        
                        <CheckoutLocationSelector
                          onLocationChange={(location) => {
                            // Buscar nome da cidade baseado no ID
                            const cityName = getCityNameById(location.city);
                            setFormData(prev => ({
                              ...prev,
                              billingCountry: location.country,
                              billingState: location.state,
                              billingCityId: location.city,
                              billingCityName: cityName,
                            }));
                          }}
                          showLabels={true}
                          required={true}
                        />

                        <div className="form-group">
                          <label className="form-label">Código Postal</label>
                          <input
                            type="text"
                            name="billingPostalCode"
                            value={formData.billingPostalCode}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Código postal (opcional)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address Section */}
                    <div className="bg-white p-6 rounded-lg border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Endereço de Entrega</h3>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.useSameAddress}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                useSameAddress: e.target.checked,
                                shippingAddress: e.target.checked ? prev.billingAddress : prev.shippingAddress,
                                shippingCountry: e.target.checked ? prev.billingCountry : prev.shippingCountry,
                                shippingState: e.target.checked ? prev.billingState : prev.shippingState,
                                shippingCityId: e.target.checked ? prev.billingCityId : prev.shippingCityId,
                                shippingCityName: e.target.checked ? prev.billingCityName : prev.shippingCityName,
                                shippingPostalCode: e.target.checked ? prev.billingPostalCode : prev.shippingPostalCode,
                              }));
                            }}
                            className="form-checkbox"
                          />
                          <span className="text-sm">Usar mesmo endereço de cobrança</span>
                        </label>
                      </div>
                      
                      {!formData.useSameAddress && (
                        <div className="space-y-4">
                          <div className="form-group">
                            <label className="form-label">Endereço de Entrega</label>
                            <input
                              type="text"
                              name="shippingAddress"
                              value={formData.shippingAddress}
                              onChange={handleInputChange}
                              className="form-input"
                              placeholder="Endereço de entrega"
                              required
                            />
                          </div>
                          
                          <CheckoutLocationSelector
                            onLocationChange={(location) => {
                              // Buscar nome da cidade baseado no ID
                              const cityName = getCityNameById(location.city);
                              setFormData(prev => ({
                                ...prev,
                                shippingCountry: location.country,
                                shippingState: location.state,
                                shippingCityId: location.city,
                                shippingCityName: cityName,
                              }));
                            }}
                            showLabels={true}
                            required={true}
                          />

                          <div className="form-group">
                            <label className="form-label">Código Postal</label>
                            <input
                              type="text"
                              name="shippingPostalCode"
                              value={formData.shippingPostalCode}
                              onChange={handleInputChange}
                              className="form-input"
                              placeholder="Código postal (opcional)"
                            />
                          </div>        
                        </div>
                      )}
                      
                      {formData.useSameAddress && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">
                            ✓ Usando o mesmo endereço de cobrança para entrega
                          </p>
                        </div>
                      )}
                        <div className="form-group">
                            <label className="form-label">Comentário de Entrega (Opcional)</label>
                            <textarea
                              name="deliveryComment"
                              value={formData.deliveryComment || ''}
                              onChange={handleTextareaChange}
                              className="form-textarea"
                              placeholder="Instruções especiais para entrega (ex: deixar na portaria, horário preferido, etc.)"
                              rows={3}
                            />
                          </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        📍 Você pode marcar sua localização exata no Google Maps para entrega precisa.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        🌍 Entregamos apenas para Moçambique e Portugal. Selecione seu país, província/distrito e cidade.
                      </p>
                    </div>

                    {/* Shipping Methods */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Métodos de Envio</h3>
                      {shippingLoading ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="animate-spin w-6 h-6 border-2 border-secondary border-t-transparent rounded-full"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {shippingMethods.map((method) => (
                            <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="shippingMethod"
                                value={method.id.toString()}
                                checked={selectedShippingMethod === method.id.toString()}
                                onChange={(e) => setSelectedShippingMethod(e.target.value)}
                                className="mr-3"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{method.method_name}</div>
                                <div className="text-sm text-text-secondary">
                                  Custo: MT{method.cost === '0' ? 'Grátis' : method.cost}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
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

                {/* Applied Coupon */}
                {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
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
                  
                  {/* Coupon Discount */}
                  {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto ({cartData.coupon_info.coupon_name})</span>
                      <span>-MT{parseFloat(cartData.coupon_info.coupon_discount_amount).toFixed(2)}</span>
                    </div>
                  )}
                  
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
                    <span>MT{cartData?.final_price ? parseFloat(cartData.final_price).toFixed(2) : grandTotal.toFixed(2)}</span>
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