// NewsletterPopup de luxo com banner
import React, { useState, useEffect } from "react";
import { X, Mail, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsletter } from "../hooks/useNewsletter";
import { useTranslation } from "../contexts/LanguageContext";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { subscribe, isSubscribing } = useNewsletter();
  const t = useTranslation();

  useEffect(() => {
    const newsletterDismissed = localStorage.getItem("newsletter-popup-dismissed");
    const newsletterSubscribed = localStorage.getItem("newsletter-subscribed");

    if (!newsletterDismissed && !newsletterSubscribed) {
      const timer = setTimeout(() => setIsVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !acceptedTerms) return;

    const result = await subscribe(email.trim());

    if (result.success) {
      setIsSubscribed(true);
      localStorage.setItem("newsletter-subscribed", "true");
      localStorage.setItem("newsletter-subscribed-email", email.trim());
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("newsletter-popup-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none backdrop-blur-sm bg-black/30 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.25)] border border-gray-200 max-w-lg w-full pointer-events-auto relative overflow-hidden animate-slideUp">
        {/* Banner Superior */}
        <div className="h-32 w-full bg-gradient-to-r from-primary via-primary/90 to-accent relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-90 bg-[url('https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6392.JPG')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"></div>

        </div>

        {/* Botão Fechar */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-20"
          aria-label={t.newsletterPopup.close}
        >
          <X size={18} />
        </button>

        {/* Conteúdo */}
        <div className="relative p-8">
          {!isSubscribed ? (
            <>
              {/* Título */}
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                {t.newsletterPopup.title}
              </h3>
              <p className="text-center text-text-secondary mb-6 leading-relaxed">
                {t.newsletterPopup.description}
              </p>

              {/* Benefícios */}
             

              {/* Formulário */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletterPopup.emailPlaceholder}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    disabled={isSubscribing}
                  />
                </div>

                {/* Checkbox de Termos */}
                <div className="flex items-start gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter-terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="sr-only"
                      required
                    />
                    <label
                      htmlFor="newsletter-terms"
                      className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all ${
                        acceptedTerms
                          ? "bg-primary border-primary"
                          : "border-gray-300 hover:border-primary/50"
                      }`}
                    >
                      {acceptedTerms && (
                        <Check className="text-white" size={14} strokeWidth={3} />
                      )}
                    </label>
                  </div>
                  <label
                    htmlFor="newsletter-terms"
                    className="text-sm text-text-secondary cursor-pointer leading-relaxed"
                  >
                    {t.newsletterPopup.acceptTerms}{" "}
                    <Link
                      to="/terms"
                      className="text-primary hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.newsletterPopup.termsOfUse}
                    </Link>{" "}
                    {t.newsletterPopup.and}{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.newsletterPopup.privacyPolicy}
                    </Link>
                  </label>
                </div>

                {/* Botão de Inscrição */}
                <button
                  type="submit"
                  disabled={isSubscribing || !email.trim() || !acceptedTerms}
                  className="w-full text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
                  style={{
                    background: (isSubscribing || !email.trim() || !acceptedTerms) 
                      ? 'rgba(107, 114, 128, 0.5)' 
                      : 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)'
                  }}
                >
                  {/* Efeito de brilho no hover */}
                  {!(isSubscribing || !email.trim() || !acceptedTerms) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full relative z-10"></div>
                      <span className="relative z-10 text-white font-bold">{t.newsletterPopup.subscribing}</span>
                    </>
                  ) : (
                    <>
                      <Mail size={20} className="relative z-10 text-white" />
                      <span className="relative z-10 text-white font-bold">{t.newsletterPopup.subscribe}</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center text-text-secondary mt-3">
                {t.newsletterPopup.privacyNote}
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t.newsletterPopup.successTitle}
              </h3>
              <p className="text-text-secondary">
                {t.newsletterPopup.successMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
