import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, CreditCard, Smartphone, Loader2, Check, ChevronRight, ChevronLeft, Package, Tag, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { BillingInfo } from '../services/api';
import CheckoutLocationSelector from '../components/CheckoutLocationSelector';
import PhoneInput from '../components/PhoneInput';
import MpesaPhoneInput from '../components/MpesaPhoneInput';
import { validatePhoneNumber, validateWhatsAppNumber, formatPhoneForWhatsApp } from '../utils/phoneUtils';
import { useTranslation } from '../contexts/LanguageContext';
import { formatPriceWithCurrency } from '../utils/formatPrice';
import toast from 'react-hot-toast';
import { mpesaService } from '../services/mpesaService';

type Step = 1 | 2 | 3 | 4;

const Checkout: React.FC = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod] = useState<'mpesa'>('mpesa');
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
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
    billingCityName: '',
    billingPostalCode: '',
    billingCountry: '',
    billingState: '',
    billingCityId: '',
    // Shipping specific
    shippingAddress: '',
    shippingCity: '',
    shippingCityName: '',
    shippingPostalCode: '',
    shippingCountry: '',
    shippingState: '',
    shippingCityId: '',
    // Checkbox to use same address
    useSameAddress: true,
    // Delivery comment
    deliveryComment: '',
  });

  const { items, total, clearCart, cartData, applyCoupon } = useCart();
  const { user } = useAuth();

  // Validações de segurança
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, items, navigate]);

  // Auto-fill dos campos de contato quando logado
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => {
        const updated: any = { ...prev };
        if (!prev.email && user.email) updated.email = user.email;
        if (!prev.phone && user.phone) updated.phone = user.phone;
        if (!prev.firstName && (user.first_name || user.name)) {
          updated.firstName = user.first_name || user.name?.split(' ')[0] || prev.firstName;
        }
        if (!prev.lastName && (user.last_name || user.name)) {
          updated.lastName = user.last_name || (user.name?.split(' ').slice(1).join(' ')) || prev.lastName;
        }
        return updated;
      });
    }
  }, [user]);

  // Função para obter nome da cidade pelo ID
  const getCityNameById = (cityId: string): string => {
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
    return cityMap[cityId] || 'Maputo';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validação por etapa
  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && validateWhatsAppNumber(formData.phone));
      case 2:
        if (deliveryMethod === 'pickup') return true;
        return !!(formData.billingAddress && formData.billingCountry && formData.billingState && formData.billingCityId);
      case 3:
        return !!(formData.mpesaNumber && formData.mpesaNumber.trim() !== '');
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => (prev + 1) as Step);
        // Scroll to top when moving to next step
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      // Scroll to top when going back to previous step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      alert('Por favor, complete todas as etapas');
      return;
    }

    setIsProcessing(true);
    if (!user?.id) {
      alert(t.checkout.loginRequired);
      setIsProcessing(false);
      return;
    }
    
    try {
      console.log('📋 Form data before submission:', {
        billingCountry: formData.billingCountry,
        billingState: formData.billingState,
        billingCityId: formData.billingCityId,
        billingCityName: formData.billingCityName,
        billingAddress: formData.billingAddress,
        shippingCountry: formData.shippingCountry,
        shippingState: formData.shippingState,
        shippingCityId: formData.shippingCityId,
        shippingCityName: formData.shippingCityName,
        shippingAddress: formData.shippingAddress,
      });

      // Validate that city name is set, if not, show error
      if (!formData.billingCityName || formData.billingCityName.trim() === '') {
        alert('Por favor, selecione uma cidade no endereço de cobrança');
        setIsProcessing(false);
        return;
      }

      // Validate M-Pesa number
      if (!formData.mpesaNumber || formData.mpesaNumber.trim() === '') {
        alert('Por favor, digite o número M-Pesa');
        setIsProcessing(false);
        return;
      }

      // Format M-Pesa number: ensure it's 9 digits starting with 8
      const cleanMpesaNumber = formData.mpesaNumber.replace(/\D/g, '');
      if (cleanMpesaNumber.length !== 9 || !cleanMpesaNumber.startsWith('8')) {
        alert('Número M-Pesa inválido. Use o formato: 8X XXXXXXX');
        setIsProcessing(false);
        return;
      }

      // Calculate total amount
      const totalAmount = total;
      
      // Generate payment reference and transaction ID (shorter format, no hyphens)
      // Format: CHEL + random alphanumeric (max 20 chars for reference)
      const randomRef = Math.random().toString(36).substring(2, 10).toUpperCase();
      const randomTxn = Math.random().toString(36).substring(2, 12).toUpperCase();
      const paymentReference = `CHEL${randomRef}`.substring(0, 20);
      const transactionId = `CH${randomTxn}`.substring(0, 100);

      // Process M-Pesa payment FIRST
      console.log('💳 Processing M-Pesa payment before creating order...');
      toast.loading('Processando pagamento M-Pesa...', { id: 'mpesa-payment' });
      
      try {
        const paymentResult = await mpesaService.processPayment(
          cleanMpesaNumber, // Send as 9 digits (8X XXXXXXX)
          totalAmount,
          paymentReference,
          transactionId
        );

        console.log('💳 M-Pesa payment result:', paymentResult);

        // Check if payment was successful
        if (!paymentResult.success) {
          toast.error(paymentResult.message || 'Pagamento M-Pesa falhou. Tente novamente.', { id: 'mpesa-payment' });
          setIsProcessing(false);
          return;
        }

        toast.success('Pagamento M-Pesa processado com sucesso!', { id: 'mpesa-payment' });
      } catch (paymentError: any) {
        console.error('❌ M-Pesa payment error:', paymentError);
        const errorMessage = paymentError?.message || 'Erro ao processar pagamento M-Pesa. Tente novamente.';
        toast.error(errorMessage, { id: 'mpesa-payment' });
        setIsProcessing(false);
        return;
      }

      // Only create order if payment was successful
      console.log('✅ Payment successful, creating order...');
      toast.loading('Criando pedido...', { id: 'order-creation' });

      const billingInfo: BillingInfo = {
        billing_postecode: formData.billingPostalCode || formData.postalCode || '0000',
        email: formData.email || 'user@example.com',
        billing_city: formData.billingCityName, // Remove fallback to 'Maputo'
        lastname: formData.lastName || 'User',
        billing_company_name: '',
        billing_address: formData.billingAddress || formData.address || 'Endereço não informado',
        billing_user_telephone: formData.phone || '000000000',
        firstname: formData.firstName || 'User',
        billing_country: formData.billingCountry || formData.country || '150',
        billing_state: formData.billingState || formData.state || '1',
        delivery_city: formData.shippingCityName || formData.billingCityName, // Remove fallback to 'Maputo'
        delivery_state: formData.shippingState || formData.billingState || '1',
        delivery_postcode: formData.shippingPostalCode || formData.billingPostalCode || '0000',
        delivery_country: formData.shippingCountry || formData.billingCountry || '150',
        delivery_address: formData.shippingAddress || formData.billingAddress || 'Address',
      };

      console.log('📋 Billing info to be sent:', billingInfo);
      
      try {
        const result = await apiService.orderSave({
          paymentType: 'cod', // Always use COD for M-Pesa
          billingInfo,
          deliveryId: '1',
          couponInfo: cartData?.coupon_info || null,
          methodId: null,
          customerId: user.id.toString(),
        });

        toast.success('Pedido criado com sucesso!', { id: 'order-creation' });
        
        navigate('/checkout-success', {
          state: {
            orderId: result.data.order_id,
            orderData: {
              subTotal: parseFloat(result.data.subtotal),
              finalPrice: parseFloat(result.data.final_price),
              items: items,
              paymentType: 'cod', // Always use COD for M-Pesa
              billingInfo: result.data.billing_information,
              deliveryInfo: result.data.delivery_information,
              products: result.data.product,
              tax: result.data.tax,
              deliveryCharge: parseFloat(result.data.delivery_charge),
              couponInfo: result.data.coupon_info,
            },
          },
        });
      } catch (orderError: any) {
        console.error('❌ Order creation error:', orderError);
        toast.error('Erro ao criar pedido. Por favor, contacte o suporte.', { id: 'order-creation' });
        setIsProcessing(false);
        return;
      }
      
      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (error: any) {
      console.error('Order processing failed:', error);
      toast.error(error?.message || 'Erro ao processar pedido. Tente novamente.');
      setIsProcessing(false);
    }
  };

  // ALWAYS calculate subtotal from items to ensure accuracy, especially for variant products
  // The API sub_total may not include variant prices correctly
  const calculatedSubtotal = items.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return sum + itemTotal;
  }, 0);
  
  // Use calculated subtotal from items as primary source
  // Only fallback to API sub_total if calculatedSubtotal is 0 and we have no items
  const subtotal = calculatedSubtotal > 0 
    ? calculatedSubtotal
    : (cartData?.sub_total && typeof cartData.sub_total === 'number' && cartData.sub_total > 0)
      ? cartData.sub_total 
      : (cartData?.sub_total && parseFloat(cartData.sub_total.toString()) > 0)
        ? parseFloat(cartData.sub_total.toString())
        : total;
  
  // Calculate discount - try to get from coupon_info, or calculate from percentage
  let discount = 0;
  if (cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-') {
    if (cartData.coupon_info.coupon_discount_amount) {
      discount = parseFloat(cartData.coupon_info.coupon_discount_amount.toString());
    } else if (cartData.coupon_info.coupon_discount_type === 'percentage' && cartData.coupon_info.coupon_discount_number) {
      // Calculate discount from percentage if amount is not provided
      const discountPercent = parseFloat(cartData.coupon_info.coupon_discount_number.toString());
      discount = (subtotal * discountPercent) / 100;
    }
  }
  
  const shipping = 0;
  
  // Calculate final total - always calculate from subtotal and discount
  // This ensures the total is always correct even if API returns invalid final_price
  let finalTotal = subtotal - discount;
  
  // Only use final_price from API if it's valid, positive, and makes sense
  if (cartData?.final_price) {
    const parsedFinalPrice = parseFloat(cartData.final_price.toString());
    const calculatedTotal = subtotal - discount;
    
    // Only use API value if it's valid and close to our calculation
    if (!isNaN(parsedFinalPrice) && 
        parsedFinalPrice > 0 && 
        calculatedTotal > 0 &&
        Math.abs(parsedFinalPrice - calculatedTotal) < (calculatedTotal * 0.5)) {
      finalTotal = parsedFinalPrice;
    } else {
      finalTotal = calculatedTotal;
    }
  }
  
  // Final safety check - ensure finalTotal is never negative or zero when there are items
  if (finalTotal <= 0 && items.length > 0 && subtotal > 0) {
    finalTotal = subtotal - discount;
  }
  
  // Calculate grand total - always calculate from subtotal and discount
  // This ensures the total is always correct even if API returns invalid final_price
  let grandTotal = subtotal - discount + shipping;
  
  // Only use final_price from API if it's valid, positive, and makes sense
  // Ignore if it's 0 or very different from our calculation
  if (cartData?.final_price) {
    const parsedFinalPrice = parseFloat(cartData.final_price.toString());
    const calculatedTotal = subtotal - discount + shipping;
    
    // Only use API value if:
    // 1. It's a valid number
    // 2. It's positive
    // 3. It's close to our calculation (within reasonable range)
    // 4. Our calculated total is also positive
    if (!isNaN(parsedFinalPrice) && 
        parsedFinalPrice > 0 && 
        calculatedTotal > 0 &&
        Math.abs(parsedFinalPrice - calculatedTotal) < (calculatedTotal * 0.5)) { // Within 50% tolerance
      grandTotal = parsedFinalPrice;
    } else {
      // Always use our calculation if API value doesn't make sense
      grandTotal = calculatedTotal;
    }
  }
  
  // Final safety check - ensure grandTotal is never negative or zero when there are items
  if (grandTotal <= 0 && items.length > 0 && subtotal > 0) {
    grandTotal = subtotal - discount + shipping;
  }
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    try {
      await applyCoupon(couponCode.trim());
      setCouponCode('');
      toast.success('Cupom aplicado com sucesso!');
    } catch (error) {
      // Error is handled in applyCoupon
    } finally {
      setApplyingCoupon(false);
    }
  };

  const steps = [
    { number: 1, title: 'Contato', icon: Mail },
    { number: 2, title: 'Endereço', icon: MapPin },
    { number: 3, title: 'Pagamento', icon: CreditCard },
    { number: 4, title: 'Revisão', icon: Package },
  ];

  return (
    <div className="checkout-page py-8 md:py-12 bg-gray-50 min-h-screen">
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <Loader2 size={48} className="animate-spin text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.checkout.processing}</h3>
              <p className="text-text-secondary">
                {t.checkout.processingText}
              </p>
            </div>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{t.checkout.validatingPayment}</p>
              <p>{t.checkout.confirmingProducts}</p>
              <p>{t.checkout.processingTransaction}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="container max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">{t.checkout.title}</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-primary border-primary text-white'
                        : isActive
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`mt-2 text-xs md:text-sm font-medium text-center ${
                    isActive || isCompleted ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{t.checkout.contactInformation}</h2>
                        <p className="text-sm text-gray-500">Preencha suas informações de contato</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">{t.checkout.firstName} *</label>
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
                        <label className="form-label">{t.checkout.lastName} *</label>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">{t.checkout.email} *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <PhoneInput
                          value={formData.phone}
                          onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                          placeholder={t.checkout.phonePlaceholder}
                          required
                          whatsappOnly
                          label={t.checkout.phone}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Address */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{t.checkout.deliveryMethod}</h2>
                        <p className="text-sm text-gray-500">Escolha o método de entrega</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={deliveryMethod === 'delivery'}
                          onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                          className="mr-3"
                        />
                        <MapPin className="mr-3 text-primary" size={20} />
                        <div>
                          <div className="font-semibold">{t.checkout.delivery}</div>
                          <div className="text-sm text-text-secondary">{t.checkout.deliveryDescription}</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={deliveryMethod === 'pickup'}
                          onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                          className="mr-3"
                        />
                        <div className="mr-3 text-primary text-2xl">🏪</div>
                        <div>
                          <div className="font-semibold">{t.checkout.pickup}</div>
                          <div className="text-sm text-text-secondary">{t.checkout.pickupDescription}</div>
                        </div>
                      </label>
                    </div>

                    {deliveryMethod === 'delivery' && (
                      <div className="space-y-6 pt-6 border-t">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Endereço de Cobrança</h3>
                          <div className="space-y-4">
                            <div className="form-group">
                              <label className="form-label">Endereço de Cobrança *</label>
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
                              initialCountry={formData.billingCountry}
                              initialState={formData.billingState}
                              initialCity={formData.billingCityId}
                              onLocationChange={(location) => {
                                console.log('📍 Billing location changed:', location);
                                if (location.city) {
                                  // Use cityName from location if available, otherwise fallback to getCityNameById
                                  const cityName = location.cityName || getCityNameById(location.city);
                                  console.log('📍 Setting billing data:', {
                                    country: location.country,
                                    state: location.state,
                                    city: location.city,
                                    cityName: cityName
                                  });
                                  setFormData((prev) => ({
                                    ...prev,
                                    billingCountry: location.country,
                                    billingState: location.state,
                                    billingCityId: location.city,
                                    billingCityName: cityName,
                                  }));
                                }
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

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Endereço de Entrega</h3>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={formData.useSameAddress}
                                onChange={(e) => {
                                  setFormData((prev) => ({
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
                                <label className="form-label">Endereço de Entrega *</label>
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
                                initialCountry={formData.shippingCountry}
                                initialState={formData.shippingState}
                                initialCity={formData.shippingCityId}
                                onLocationChange={(location) => {
                                  console.log('📍 Shipping location changed:', location);
                                  if (location.city) {
                                    // Use cityName from location if available, otherwise fallback to getCityNameById
                                    const cityName = location.cityName || getCityNameById(location.city);
                                    console.log('📍 Setting shipping data:', {
                                      country: location.country,
                                      state: location.state,
                                      city: location.city,
                                      cityName: cityName
                                    });
                                    setFormData((prev) => ({
                                      ...prev,
                                      shippingCountry: location.country,
                                      shippingState: location.state,
                                      shippingCityId: location.city,
                                      shippingCityName: cityName,
                                    }));
                                  }
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
                          <div className="form-group mt-4">
                            <label className="form-label">Comentário de Entrega (Opcional)</label>
                            <textarea
                              name="deliveryComment"
                              value={formData.deliveryComment || ''}
                              onChange={handleTextareaChange}
                              className="form-textarea"
                              placeholder="Instruções especiais para entrega"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="text-primary" size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{t.checkout.paymentMethod}</h2>
                        <p className="text-sm text-gray-500">{t.checkout.mpesaPayment}</p>
                      </div>
                    </div>

                    {/* M-Pesa Payment Section */}
                    <div className="space-y-6">
                      {/* M-Pesa Logo */}
                      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-green-200">
                        <img 
                          src="https://newwaymoz.com/assets/images/backend/paymentmethod/692538ce2e6681764047054.png" 
                          alt="M-Pesa" 
                          className="h-16 object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center"><Smartphone class="text-green-600" size={48} /></div>';
                            }
                          }}
                        />
                      </div>

                      {/* M-Pesa Instructions */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 text-blue-900">
                          {t.checkout.mpesaInstructions || 'Instruções de Pagamento M-Pesa'}
                        </h3>
                        <ol className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start">
                            <span className="font-bold mr-2">1.</span>
                            <span>{t.checkout.mpesaStep1 || 'Digite o seu número de telefone M-Pesa abaixo (sem +258)'}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">2.</span>
                            <span>{t.checkout.mpesaStep2 || 'Clique no botão "Pagar com M-Pesa"'}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">3.</span>
                            <span>{t.checkout.mpesaStep3 || 'Verifique o seu telefone para o prompt M-Pesa'}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">4.</span>
                            <span>{t.checkout.mpesaStep4 || 'Digite o seu PIN M-Pesa para completar o pagamento'}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">5.</span>
                            <span>{t.checkout.mpesaStep5 || 'Aguarde a mensagem de confirmação'}</span>
                          </li>
                        </ol>
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm text-yellow-800">
                            <strong>📌 {t.checkout.mpesaNote || 'Nota: Você receberá um prompt no seu telefone para confirmar o pagamento. Certifique-se de que a sua conta M-Pesa tem saldo suficiente. Use apenas números de Moçambique (formato: 8X XXXXXXX).'}</strong>
                          </p>
                        </div>
                      </div>

                      {/* M-Pesa Phone Number Input */}
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <MpesaPhoneInput
                          value={formData.mpesaNumber}
                          onChange={(value) => setFormData(prev => ({ ...prev, mpesaNumber: value }))}
                          placeholder="8X XXXXXXX"
                          required
                          label={t.checkout.mpesaPhoneNumber}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="text-primary" size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Revisão do Pedido</h2>
                        <p className="text-sm text-gray-500">Revise suas informações antes de finalizar</p>
                      </div>
                    </div>

                    {/* Contact Info Review */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Mail size={18} /> Informações de Contato
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <p><span className="text-gray-500">Nome:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                        <p><span className="text-gray-500">Telefone:</span> {formData.phone}</p>
                      </div>
                    </div>

                    {/* Address Review */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin size={18} /> Endereço de Entrega
                      </h3>
                      <div className="text-sm space-y-1">
                        <p><span className="text-gray-500">Método:</span> {deliveryMethod === 'delivery' ? 'Entrega' : 'Retirada'}</p>
                        {deliveryMethod === 'delivery' && (
                          <>
                            <p><span className="text-gray-500">Endereço:</span> {formData.billingAddress}</p>
                            <p><span className="text-gray-500">Cidade:</span> {formData.billingCityName}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Payment Review */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard size={18} /> Método de Pagamento
                      </h3>
                      <div className="text-sm">
                        <p><span className="text-gray-500">Método:</span> M-Pesa</p>
                        {formData.mpesaNumber && (
                          <p><span className="text-gray-500">Número:</span> {formData.mpesaNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`btn btn-secondary flex items-center gap-2 ${
                      currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronLeft size={18} />
                    Anterior
                  </button>
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      Próximo
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          Finalizar Compra
                          <Check size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>
                
                {/* Coupon Section */}
                {!cartData?.coupon_info || !cartData.coupon_info.coupon_id || !cartData.coupon_info.coupon_code || cartData.coupon_info.coupon_code === '-' ? (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Código do Cupom
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          placeholder="Digite o código do cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={applyingCoupon}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon || !couponCode.trim()}
                        className="btn btn-secondary px-6 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {applyingCoupon ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          'Aplicar'
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-green-700 font-semibold text-sm">
                            Cupom Aplicado
                          </span>
                          {discount > 0 && (
                            <span className="text-green-600 font-bold text-lg">
                              -{formatPriceWithCurrency(discount)}
                            </span>
                          )}
                        </div>
                        <p className="text-green-600 text-sm font-medium mb-1">
                          {cartData.coupon_info.coupon_name}
                        </p>
                        <p className="text-green-500 text-xs mb-1">
                          Código: {cartData.coupon_info.coupon_code}
                        </p>
                        {cartData.coupon_info.coupon_discount_type === 'percentage' && cartData.coupon_info.coupon_discount_number && (
                          <p className="text-green-600 text-xs font-medium">
                            {cartData.coupon_info.coupon_discount_number}% OFF
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant || ''}`} className="flex gap-3">
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
                          <span className="text-sm text-text-secondary">Qty: {item.quantity}</span>
                          <span className="font-semibold text-sm">{formatPriceWithCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPriceWithCurrency(subtotal)}</span>
                  </div>
                  {cartData?.coupon_info && cartData.coupon_info.coupon_id > 0 && cartData.coupon_info.coupon_code && cartData.coupon_info.coupon_code !== '-' && discount > 0 && (
                    <div className="flex justify-between text-green-600 text-sm">
                      <span>Desconto ({cartData.coupon_info.coupon_name})</span>
                      <span>-{formatPriceWithCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>
                      {formatPriceWithCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-text-secondary text-center">
                    🔒 Suas informações são seguras
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
