import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Check, Instagram, Facebook, MessageCircle, HelpCircle, Package, FileText, Shield, Truck, ArrowRight } from 'lucide-react';
import { useNewsletter } from '../hooks/useNewsletter';
import { useTranslation } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import PhoneInput from './PhoneInput';
import { validatePhoneNumber } from '../utils/phoneUtils';
import { toastService } from '../utils/toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subscriptionType, setSubscriptionType] = useState<'email' | 'whatsapp'>('email');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { subscribe, isSubscribing } = useNewsletter();
  const t = useTranslation();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      return;
    }

    if (subscriptionType === 'email' && !email.trim()) {
      return;
    }

    if (subscriptionType === 'whatsapp' && !whatsapp.trim()) {
      return;
    }

    // Validate WhatsApp number if WhatsApp subscription
    if (subscriptionType === 'whatsapp' && !validatePhoneNumber(whatsapp)) {
      toastService.error('Por favor, insira um número de WhatsApp válido');
      return;
    }

    // Subscribe via email or WhatsApp
    if (subscriptionType === 'email') {
      const result = await subscribe(email.trim());
      if (result.success) {
        setEmail('');
        setAcceptedTerms(false);
      }
    } else {
      // WhatsApp subscription
      const result = await subscribe('', whatsapp.trim());
      if (result.success) {
        setWhatsapp('');
        setAcceptedTerms(false);
      }
    }
  };
return (
<footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
  {/* Main Footer Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {/* Brand & Newsletter Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
            alt="CheLevi"
            className="w-32 md:w-40 h-auto"
          />
        </div>
        
        {/* Brand Description */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
          {t.footer.aboutDescription}
        </p>

        {/* Newsletter Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              {t.footer.joinCircle}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t.footer.newsletterDescription}
            </p>
          </div>
          {/* Subscription Type Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSubscriptionType('email')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                subscriptionType === 'email'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mail size={16} className="inline mr-2" />
              {t.footer.email}
            </button>
            <button
              type="button"
              onClick={() => setSubscriptionType('whatsapp')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                subscriptionType === 'whatsapp'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Phone size={16} className="inline mr-2" />
              {t.footer.whatsapp}
            </button>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            {subscriptionType === 'email' ? (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={subscriptionType === 'email'}
                  aria-label="Email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  disabled={isSubscribing}
                />
              </div>
            ) : (
              <PhoneInput
                value={whatsapp}
                onChange={setWhatsapp}
                placeholder={t.footer.whatsappPlaceholder}
                required={subscriptionType === 'whatsapp'}
                label=""
              />
            )}

            {/* Checkbox de Termos */}
            <div className="flex items-start gap-3">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  id="footer-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="sr-only"
                  required
                />
                <label
                  htmlFor="footer-terms"
                  className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all ${
                    acceptedTerms
                      ? "bg-gray-900 border-gray-900 shadow-sm"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {acceptedTerms && (
                    <Check className="text-white" size={12} strokeWidth={3} />
                  )}
                </label>
              </div>
              <label
                htmlFor="footer-terms"
                className="text-xs text-gray-600 cursor-pointer leading-relaxed flex-1"
              >
                {t.footer.acceptTerms}{" "}
                <Link
                  to="/terms"
                  className="text-gray-900 hover:underline font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.footer.termsOfUse}
                </Link>{" "}
                {t.footer.and}{" "}
                <Link
                  to="/privacy-policy"
                  className="text-gray-900 hover:underline font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.footer.privacyPolicy}
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubscribing || (subscriptionType === 'email' ? !email.trim() : !whatsapp.trim()) || !acceptedTerms}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              {isSubscribing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.footer.subscribing}
                </>
              ) : (
                <>
                  {subscriptionType === 'email' ? <Mail size={16} /> : <Phone size={16} />}
                  {t.footer.subscribe}
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t.footer.newsletterDisclaimer}
          </p>
        </div>
      </div>

      {/* Customer Support */}
      <div className="space-y-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle size={20} className="text-gray-700" />
          {t.footer.customerSupport}
        </h3>
        <ul className="space-y-3">
          <li>
            <Link 
              to="/orders" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Package size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              <span>{t.footer.orderStatus}</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/shipping" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Truck size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              <span>{t.footer.shippingInfo}</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <MessageCircle size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              <span>{t.footer.contactUs}</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/terms" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FileText size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              <span>{t.footer.termsOfUse}</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* About & Legal */}
      <div className="space-y-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <Shield size={20} className="text-gray-700" />
          {t.footer.aboutUs}
        </h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {t.footer.aboutDescription}
        </p>
        <ul className="space-y-3">
          <li>
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span>{t.footer.aboutBrand}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy-policy" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Shield size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              <span>{t.footer.privacyPolicy}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Bottom Footer */}
  <div className="border-t-2 border-gray-200 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Social Media & Language */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-800">
        {/* Social Media */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden md:block mr-2">Siga-nos:</span>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram" 
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Instagram size={18} className="text-white" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook" 
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Facebook size={18} className="text-white" />
          </a>
          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="TikTok" 
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <MessageCircle size={18} className="text-white" />
          </a>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 hidden md:block">Idioma:</span>
          <LanguageSelector />
        </div>
      </div>

      {/* Legal Links & Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-gray-400">
          <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-1">
            <FileText size={14} />
            <span>{t.footer.termsOfUse}</span>
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1">
            <Shield size={14} />
            <span>{t.footer.privacyPolicy}</span>
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link to="/shipping" className="hover:text-white transition-colors flex items-center gap-1">
            <Truck size={14} />
            <span>{t.footer.shipping}</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p className="text-sm text-gray-400 text-center md:text-right">
            {t.footer.allRightsReserved}
          </p>
          <span className="hidden md:inline text-gray-600">•</span>
          <p className="text-sm text-gray-400 text-center md:text-right">
            Desenvolvido por{' '}
            <a 
              href="https://sparktechh.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-medium"
            >
              SparkTech
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>

);
};

export default Footer;