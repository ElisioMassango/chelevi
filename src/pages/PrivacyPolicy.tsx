import React from 'react';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  const t = useTranslation();
  
  return (
    <>
      <SEO
        title="Política de Privacidade - CheLevi"
        description="Conheça a Política de Privacidade da CheLevi. Saiba como protegemos e utilizamos os seus dados pessoais."
        keywords="CheLevi, política de privacidade, privacidade, proteção de dados, LGPD"
      />
      <div className="privacy-policy-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.privacy.title}</h1>
          <p className="text-xl text-text-secondary">
            {t.privacy.lastUpdated}
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Eye className="text-blue-600" size={24} />
              {t.privacy.introduction}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.privacy.introText}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t.privacy.introText2}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Users className="text-green-600" size={24} />
              {t.privacy.informationCollected}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">{t.privacy.personalInfo}</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>{t.privacy.personalInfoList1}</li>
                  <li>{t.privacy.personalInfoList2}</li>
                  <li>{t.privacy.personalInfoList3}</li>
                  <li>{t.privacy.personalInfoList4}</li>
                  <li>{t.privacy.personalInfoList5}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">{t.privacy.usageInfo}</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>{t.privacy.usageInfoList1}</li>
                  <li>{t.privacy.usageInfoList2}</li>
                  <li>{t.privacy.usageInfoList3}</li>
                  <li>{t.privacy.usageInfoList4}</li>
                  <li>{t.privacy.usageInfoList5}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Lock className="text-purple-600" size={24} />
              {t.privacy.howWeUse}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">{t.privacy.processingOrders}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>{t.privacy.processingList1}</li>
                  <li>{t.privacy.processingList2}</li>
                  <li>{t.privacy.processingList3}</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">{t.privacy.communication}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>{t.privacy.communicationList1}</li>
                  <li>{t.privacy.communicationList2}</li>
                  <li>{t.privacy.communicationList3}</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">{t.privacy.serviceImprovement}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>{t.privacy.improvementList1}</li>
                  <li>{t.privacy.improvementList2}</li>
                  <li>{t.privacy.improvementList3}</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">{t.privacy.security}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>{t.privacy.securityList1}</li>
                  <li>{t.privacy.securityList2}</li>
                  <li>{t.privacy.securityList3}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t.privacy.dataProtection}</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-text-secondary leading-relaxed mb-4">
                {t.privacy.dataProtectionText}
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>{t.privacy.dataProtectionList1}</li>
                <li>{t.privacy.dataProtectionList2}</li>
                <li>{t.privacy.dataProtectionList3}</li>
                <li>{t.privacy.dataProtectionList4}</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t.privacy.yourRights}</h2>
            <p className="text-text-secondary mb-4">
              {t.privacy.yourRightsText}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t.privacy.rightAccess}</h4>
                <p className="text-sm text-text-secondary">
                  {t.privacy.rightAccessText}
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t.privacy.rightCorrection}</h4>
                <p className="text-sm text-text-secondary">
                  {t.privacy.rightCorrectionText}
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t.privacy.rightDeletion}</h4>
                <p className="text-sm text-text-secondary">
                  {t.privacy.rightDeletionText}
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t.privacy.rightPortability}</h4>
                <p className="text-sm text-text-secondary">
                  {t.privacy.rightPortabilityText}
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t.privacy.cookies}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {t.privacy.cookiesText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-4">
              <li>{t.privacy.cookiesList1}</li>
              <li>{t.privacy.cookiesList2}</li>
              <li>{t.privacy.cookiesList3}</li>
              <li>{t.privacy.cookiesList4}</li>
            </ul>
            <p className="text-text-secondary">
              {t.privacy.cookiesControl}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Mail className="text-orange-600" size={24} />
              {t.privacy.contact}
            </h2>
            <p className="text-text-secondary mb-4">
              {t.privacy.contactText}
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-text-secondary">info@chelevi.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-text-secondary">+258 85 2232423</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
              <h2 className="text-2xl font-bold mb-4">{t.privacy.updates}</h2>
            <p className="text-text-secondary leading-relaxed">
              {t.privacy.updatesText}
            </p>
          </section>
        </div>
      </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;