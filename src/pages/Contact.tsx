import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare, Loader2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { emailService } from '../services/emailService';
import { ownerNotificationService } from '../services/ownerNotificationService';
import { toastService } from '../utils/toast';
import PhoneInput from '../components/PhoneInput';
import { validatePhoneNumber } from '../utils/phoneUtils';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Contact form submitted:', formData);
      
      // Validate phone number if provided
      if (formData.phone && !validatePhoneNumber(formData.phone)) {
        toastService.error(t.contact.error || 'Por favor, insira um número de telefone válido');
        setIsSubmitting(false);
        return;
      }
      
      // Send notifications to owners
      await ownerNotificationService.notifyNewContact(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );

      // Send confirmation to user via email (if email provided)
      if (formData.email) {
        try {
          await emailService.sendEmail({
            to: formData.email,
            subject: 'Mensagem Recebida - Chelevi',
            html: `
              <!DOCTYPE html>
              <html lang="pt-BR">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mensagem Recebida - Chelevi</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                  <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Chelevi</h1>
                    <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Mensagem Recebida</p>
                  </div>
                  
                  <div style="padding: 40px 30px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                      <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #ffffff; font-size: 36px;">✅</span>
                      </div>
                      <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Mensagem Recebida!</h2>
                      <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Olá ${formData.name}, recebemos a sua mensagem e responderemos em breve!</p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                      <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Resumo da sua mensagem:</h3>
                      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #7f8c8d;">Assunto:</span>
                        <span style="color: #2c3e50; font-weight: 600;">${formData.subject}</span>
                      </div>
                      <div style="border-top: 1px solid #e9ecef; padding-top: 15px;">
                        <span style="color: #7f8c8d; display: block; margin-bottom: 5px;">Mensagem:</span>
                        <p style="color: #2c3e50; margin: 0; line-height: 1.5;">${formData.message}</p>
                      </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                      <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
                        Obrigado por entrar em contacto connosco! 💜
                      </p>
                    </div>
                  </div>
                  
                  <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
                    <p style="color: #ffffff; margin: 0; font-size: 14px;">
                      © 2025 Chelevi. Todos os direitos reservados.
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
            type: 'contact_confirmation'
          });
        } catch (error) {
          console.error('Failed to send confirmation email:', error);
        }
      }

      toastService.success(t.contact.success);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send contact form:', error);
      toastService.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'Quanto tempo demora a entrega?',
      answer: 'Em Maputo, em apenas 1 a 2 dias. Em outras províncias do país, 3 a 5 dias. Sempre com a promessa de chegar com cuidado, como se fosse entregue por mãos amigas.'
    },
    {
      question: 'Como posso acompanhar o meu pedido?',
      answer: 'Receberá um link de rastreio pelo WhatsApp e poderá acompanhar o seu pedido a qualquer momento na sua conta CheLevi.'
    },
    {
      question: 'Qual é a vossa política de devolução?',
      answer: 'Aceitamos devoluções até 30 dias após a compra. Confiamos na qualidade das nossas criações, mas queremos que cada escolha sua seja feita com a mesma confiança e prazer de usar CheLevi.'
    },
    {
      question: 'Como posso rastrear meu pedido?',
      answer: 'Uma vez que seu pedido é enviado, receberás um link de rastreamento via WhatsApp. Também podes rastrear o teu pedido entrando em teu conta e visualizando o teu histórico de pedidos.'
    },
    {
      question: 'Enviam para fora de Moçambique?',
      answer: 'Sim, enviamos para Portugal. Em breve estaremos também noutros países, para que a CheLevi continue a aproximar-se de quem partilha o nosso olhar sobre a elegância.'
    }
  ];

  // SEO Structured Data for Contact Page
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacte-nos - CheLevi',
    description: t.contact.description || 'Entre em contacto com a CheLevi. Estamos aqui para ajudá-la.',
    url: 'https://chelevi.sparktechnology.cloud/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'CheLevi',
      telephone: '+258 85 2232423',
      email: 'info@chelevi.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua da Resistência n° 1550, R/C',
        addressLocality: 'Maputo',
        addressCountry: 'MZ'
      },
      openingHours: 'Mo-Sa 09:00-18:00',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+258 85 2232423',
        contactType: 'customer service',
        availableLanguage: ['Portuguese', 'English']
      }
    }
  };

  return (
    <>
      <SEO
        title="Contacte-nos - CheLevi | Estamos Aqui para Ajudá-la"
        description={t.contact.description || "Entre em contacto com a CheLevi. Estamos aqui para ajudá-la com qualquer dúvida ou questão. Visite-nos, ligue-nos ou envie-nos um email."}
        keywords="CheLevi, contacto, suporte, ajuda, Maputo, Moçambique, WhatsApp, email"
        image="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG"
        structuredData={contactStructuredData}
      />
      <div className="contact-page">
        {/* Hero Section - Modern */}
      <section className="relative py-8 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Image - Desktop */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          <img 
            src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG"
            alt="Contact CheLevi"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Mobile: Image First */}
        <div className="relative z-20 md:hidden">
          <div className="container px-4 mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG"
                alt="Contact CheLevi"
                className="w-full h-[250px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Text Content - Mobile: After Image, Desktop: Over Background */}
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-gray-400">
                {t.contact.subtitle}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-8 text-white leading-tight">
              {t.contact.title}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Contact Information - Mobile: Second, Desktop: First */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <HelpCircle size={28} className="text-gray-700" />
                  {t.contact.supportBlock}
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {t.contact.supportDescription}
                </p>
              </div>

              {/* Contact Methods - Modern Cards */}
              <div className="space-y-4">
                <div className="group bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{t.contact.visitUs}</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        Rua da Resistência n° 1550, R/C.<br />
                        Maputo, Mozambique<br />
                        <span className="text-gray-500 italic">As portas estão abertas.</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{t.contact.callUs}</h3>
                      <p className="text-sm text-gray-500 mb-2">Uma conversa está à distância de uma chamada.</p>
                      <a href="tel:+258852232423" className="text-base md:text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                        +258 85 2232423
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{t.contact.emailUs}</h3>
                      <div className="space-y-1">
                        <a href="mailto:info@chelevi.com" className="block text-sm md:text-base text-gray-600 hover:text-purple-600 transition-colors">
                          info@chelevi.com
                        </a>
                        <a href="mailto:suporte@chelevi.com" className="block text-sm md:text-base text-gray-600 hover:text-purple-600 transition-colors">
                          suporte@chelevi.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{t.contact.whatsapp}</h3>
                      <a href="https://wa.me/258852232423" target="_blank" rel="noopener noreferrer" className="block text-base md:text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors mb-1">
                        +258 85 2232423
                      </a>
                      <p className="text-sm text-gray-500">Disponível 24/7 para suporte instantâneo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Modern Design - Mobile: First, Desktop: Second */}
            <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 lg:p-10 rounded-2xl border-2 border-gray-100 shadow-lg order-1 lg:order-2">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                  <MessageSquare size={28} className="text-gray-700" />
                  {t.contact.sendMessage}
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Preencha o formulário abaixo e entraremos em contacto o mais breve possível.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="form-group">
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                      placeholder={t.contact.phone + ' (opcional)'}
                      label={t.contact.phone}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.contact.subject} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="product-inquiry">Inquérito de Produto</option>
                      <option value="order-support">Suporte de Pedido</option>
                      <option value="shipping">Pergunta de Envio</option>
                      <option value="return">Retornos e Trocas</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                    rows={6}
                    placeholder="Por favor, descreva como podemos ajudá-lo..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Alternative Contact */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">    
                <p className="text-sm md:text-base text-gray-600 mb-4">{t.contact.immediateAssistance}</p>  
                <a 
                  href="https://wa.me/258852232423" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <MessageSquare size={18} />
                  {t.contact.startLiveChat}
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section - Modern Accordion */}
          <div className="mt-16 md:mt-20 lg:mt-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 flex items-center justify-center gap-3">
                <HelpCircle size={32} className="text-gray-700" />
                {t.contact.faq}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                {t.contact.faqDescription}
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4 flex-1">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp size={20} className="text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 md:px-8 pb-5 md:pb-6">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Contact;