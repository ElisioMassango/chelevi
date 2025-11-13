import React, { useState } from 'react';
import { X, Mail, Phone, Package, User, Check, Loader2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { reservationService } from '../services/reservationService';
import { toastService } from '../utils/toast';
import PhoneInput from './PhoneInput';

interface ReservationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productImage?: string;
}

const ReservationPopup: React.FC<ReservationPopupProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  productImage
}) => {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    country: 'mocambique' as 'mocambique' | 'portugal'
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toastService.error(t.reservation.acceptTermsRequired);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toastService.error(t.reservation.fillAllFields);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await reservationService.createReservation({
        productId,
        productName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
        country: formData.country
      });

      if (result.success) {
        setIsSuccess(true);
        toastService.success(t.reservation.success);
        
        // Reset form after 3 seconds and close
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', email: '', phone: '', quantity: 1, country: 'mocambique' });
          setAcceptedTerms(false);
          onClose();
        }, 3000);
      } else {
        toastService.error(result.message || t.reservation.error);
      }
    } catch (error) {
      console.error('Reservation error:', error);
      toastService.error(t.reservation.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none backdrop-blur-sm bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.25)] max-w-lg w-full pointer-events-auto relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition z-20"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <>
            {/* Header - Reduced Padding */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-center">
              <div className="w-20h-12g-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
              <Link to="/" className="flex flex-col items-center">
              <img src='https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png' alt="CheLevi" className="w-30 h-20" />
            </Link>
              </div>
              <h2 className="text-xl font-bold text-black mb-1">
                {t.reservation.title}
              </h2>
              <p className="text-black text-xs">
                {t.reservation.subtitle}
              </p>
            </div>

            {/* Product Info - Reduced Padding */}
            {productImage && (
              <div className="px-6 pt-4 pb-3">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{t.reservation.product}</p>
                    <p className="font-semibold text-sm text-gray-900">{productName}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form - Reduced Padding */}
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  {t.reservation.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  placeholder={t.reservation.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  {t.reservation.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  placeholder={t.reservation.emailPlaceholder}
                />
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe size={16} className="inline mr-2" />
                  {t.reservation.country} *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, country: 'mocambique' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      formData.country === 'mocambique'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🇲🇿 {t.reservation.mocambique}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, country: 'portugal' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      formData.country === 'portugal'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🇵🇹 {t.reservation.portugal}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  {t.reservation.phone} *
                </label>
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={t.reservation.phonePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Package size={16} className="inline mr-2" />
                  {t.reservation.quantity} *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="acceptTerms" className="text-xs text-gray-600 flex-1 leading-relaxed">
                  {t.reservation.acceptTerms}{' '}
                  <Link to="/terms-of-use" className="text-primary hover:underline font-semibold">
                    {t.reservation.termsOfUse}
                  </Link>
                  {' '}{t.reservation.and}{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">
                    {t.reservation.privacyPolicy}
                  </Link>
                </label>
              </div>

              {/* Submit Button - Improved Visibility */}
              <button
                type="submit"
                disabled={isSubmitting || !acceptedTerms}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-gray-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span className="text-white font-bold">{t.reservation.submitting}</span>
                  </>
                ) : (
                  <>
                    <Check size={18} className="text-white" />
                    <span className="text-white font-bold">{t.reservation.reserve}</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t.reservation.successTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.reservation.successMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationPopup;

