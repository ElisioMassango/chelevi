import React from 'react';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
  const t = useTranslation();
  
  return (
    <div className="terms-of-use-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="text-purple-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.terms.title}</h1>
          <p className="text-xl text-text-secondary">
            {t.terms.lastUpdated}
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Scale className="text-purple-600" size={24} />
              {t.terms.introduction}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.introText}
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <p className="text-sm text-yellow-800">
                  <strong>{t.terms.important}</strong> {t.terms.importantText}
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. {t.terms.acceptance}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.acceptanceText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>{t.terms.acceptanceList1}</li>
              <li>{t.terms.acceptanceList2}</li>
              <li>{t.terms.acceptanceList3}</li>
              <li>{t.terms.acceptanceList4}</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. {t.terms.accountRegistration}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">2.1. {t.terms.accountCreation}</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t.terms.accountCreationText}
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>{t.terms.accountList1}</li>
                  <li>{t.terms.accountList2}</li>
                  <li>{t.terms.accountList3}</li>
                  <li>{t.terms.accountList4}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">2.2. {t.terms.privacy}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.privacyText}{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    {t.footer.privacyPolicy}
                  </Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. {t.terms.products}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">3.1. {t.terms.availability}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.availabilityText}
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary mt-3">
                  <li>{t.terms.availabilityList1}</li>
                  <li>{t.terms.availabilityList2}</li>
                  <li>{t.terms.availabilityList3}</li>
                  <li>{t.terms.availabilityList4}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">3.2. {t.terms.prices}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.pricesText}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">3.3. {t.terms.productImages}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.productImagesText}
                </p>
              </div>
            </div>
          </section>

          {/* Orders and Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. {t.terms.orders}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">4.1. {t.terms.orderProcessing}</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t.terms.orderProcessingText}
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>{t.terms.orderList1}</li>
                  <li>{t.terms.orderList2}</li>
                  <li>{t.terms.orderList3}</li>
                  <li>{t.terms.orderList4}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">4.2. {t.terms.paymentMethods}</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t.terms.paymentMethodsText}
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">{t.terms.paymentMethod1}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">{t.terms.paymentMethod2}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">{t.terms.paymentMethod3}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">{t.terms.paymentMethod4}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">4.3. {t.terms.orderConfirmation}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.orderConfirmationText}
                </p>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. {t.terms.shipping}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.shippingText}{' '}
              <Link to="/shipping" className="text-primary hover:underline">
                {t.footer.shippingInfo}
              </Link>.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">{t.terms.shippingSummary}</h4>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>{t.terms.shippingList1}</li>
                <li>{t.terms.shippingList2}</li>
                <li>{t.terms.shippingList3}</li>
                <li>{t.terms.shippingList4}</li>
              </ul>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. {t.terms.returns}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">6.1. {t.terms.returnPolicy}</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  {t.terms.returnPolicyText}
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>{t.terms.returnList1}</li>
                  <li>{t.terms.returnList2}</li>
                  <li>{t.terms.returnList3}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">6.2. {t.terms.returnProcess}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t.terms.returnProcessText}{' '}
                  <Link to="/contact" className="text-primary hover:underline">
                    {t.contact.sendMessage}
                  </Link>{' '}
                  {t.terms.returnProcessText2}
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. {t.terms.intellectualProperty}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.intellectualPropertyText}
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 mt-0.5" size={20} />
                <p className="text-sm text-red-800">
                  <strong>{t.terms.prohibited}</strong> {t.terms.prohibitedText}
                </p>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. {t.terms.userConduct}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.userConductText}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">{t.terms.conductList1}</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">{t.terms.conductList2}</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">{t.terms.conductList3}</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">{t.terms.conductList4}</span>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. {t.terms.liability}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.terms.liabilityText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>{t.terms.liabilityList1}</li>
              <li>{t.terms.liabilityList2}</li>
              <li>{t.terms.liabilityList3}</li>
              <li>{t.terms.liabilityList4}</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. {t.terms.indemnification}</h2>
            <p className="text-text-secondary leading-relaxed">
              {t.terms.indemnificationText}
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. {t.terms.modifications}</h2>
            <p className="text-text-secondary leading-relaxed">
              {t.terms.modificationsText}
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. {t.terms.governingLaw}</h2>
            <p className="text-text-secondary leading-relaxed">
              {t.terms.governingLawText}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-blue-600" size={24} />
              {t.terms.contact}
            </h2>
            <p className="text-text-secondary mb-4">
              {t.terms.contactText}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-text-secondary">info@chelevi.com</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Telefone</p>
                  <p className="text-text-secondary">+258 85 2232423</p>
                </div>
                <div>
                  <p className="font-medium mb-1">WhatsApp</p>
                  <p className="text-text-secondary">+258 85 2232423</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Endereço</p>
                  <p className="text-text-secondary">Rua da Resistência n° 1550, R/C, Maputo</p>
                </div>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-0.5" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">{t.terms.acknowledgment}</h3>
                <p className="text-sm text-green-800">
                  {t.terms.acknowledgmentText}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;

