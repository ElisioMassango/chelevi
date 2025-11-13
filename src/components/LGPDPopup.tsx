import React, { useState, useEffect } from 'react';
import { X, Shield, Cookie, Eye, Settings } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const LGPDPopup: React.FC = () => {
  const t = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined
    const lgpdConsent = localStorage.getItem('lgpd-consent');
    if (!lgpdConsent) {
      // Show popup after a short delay
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd-consent', 'accepted');
    localStorage.setItem('lgpd-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lgpd-consent', 'declined');
    localStorage.setItem('lgpd-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full pointer-events-auto animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.lgpd.title}</h3>
              <p className="text-sm text-text-secondary">{t.lgpd.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-secondary leading-relaxed mb-4">
            {t.lgpd.description}
          </p>

          {/* Cookie Categories */}
          {showDetails && (
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Cookie className="text-orange-500 mt-1" size={16} />
                <div>
                  <h4 className="font-semibold text-sm">{t.lgpd.essentialCookies}</h4>
                  <p className="text-xs text-text-secondary">
                    {t.lgpd.essentialDescription}
                  </p>
                  <div className="mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {t.lgpd.alwaysActive}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="text-blue-500 mt-1" size={16} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{t.lgpd.analyticalCookies}</h4>
                      <p className="text-xs text-text-secondary">
                        {t.lgpd.analyticalDescription}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Settings className="text-purple-500 mt-1" size={16} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{t.lgpd.marketingCookies}</h4>
                      <p className="text-xs text-text-secondary">
                        {t.lgpd.marketingDescription}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="w-full btn btn-primary"
            >
              {t.lgpd.acceptAll}
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={handleCustomize}
                className="flex-1 btn btn-outline text-sm"
              >
                {showDetails ? t.lgpd.hideDetails : t.lgpd.customize}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 btn btn-secondary text-sm"
              >
                {t.lgpd.essentialOnly}
              </button>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="mt-4 pt-4 border-t text-center">
            <a
              href="/privacy-policy"
              className="text-xs text-accent hover:underline"
            >
              {t.lgpd.readPrivacyPolicy}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGPDPopup;