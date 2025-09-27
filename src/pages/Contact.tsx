import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contacte-nos</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Estamos aqui para ajudar! Entre em contato com nosso time de atendimento ao cliente para qualquer pergunta, preocupação ou feedback.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Tem perguntas sobre nossos produtos, precisa de ajuda com seu pedido ou quer saber mais sobre a ShopFCC? 
                Gostaríamos de ouvir de você! Nosso time de atendimento ao cliente está pronto para ajudá-lo.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <MapPin className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Visite Nossa Loja</h3>
                  <p className="text-text-secondary">
                    Avenida Julius Nyerere, 1234<br />
                    Maputo, Mozambique
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <Phone className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Ligue-nos</h3>
                  <p className="text-text-secondary">
                    +258 84 123 4567<br />
                    +258 87 765 4321
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <Mail className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Envie-nos um Email</h3>
                  <p className="text-text-secondary">
                    info@shopfcc.store<br />
                    support@shopfcc.store
                  </p>
                </div>    
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <MessageSquare className="text-secondary mt-1" size={24} />
                <div>
                      <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-text-secondary">
                    +258 84 123 4567<br />
                    Disponível 24/7 para suporte instantâneo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <Clock className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Horário de Atendimento</h3>
                  <div className="text-text-secondary">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Siga-nos</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                  📘
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                  📷
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                  🐦
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                  📺
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-2 gap-4">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Endereço de Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-2 gap-4">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Número de Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Assunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
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
                <label htmlFor="message" className="form-label">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={5}
                  placeholder="Por favor, descreva como podemos ajudá-lo..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send size={18} />
                    Enviar Mensagem
              </button>
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t text-center">    
              <p className="text-text-secondary mb-4">Precisa de assistência imediata?</p>  
              <button className="btn btn-secondary">
                Iniciar Chat ao Vivo
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Quanto tempo leva o envio?</h3>
                <p className="text-text-secondary">
                  Oferecemos entrega grátis dentro de Maputo, que normalmente leva 1-2 dias úteis. 
                  Para outras áreas em Moçambique, o envio leva 3-5 dias úteis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Qual é a sua política de retorno?</h3>
                <p className="text-text-secondary">
                  Aceitamos retornos dentro de 30 dias após a compra para produtos não abertos em condição original. 
                  Todos os retornos devem incluir o recibo original ou prova de compra.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Oferecemos envio internacional?</h3>
                <p className="text-text-secondary">
                  Atualmente, enviamos apenas para Moçambique. Estamos trabalhando para expandir nossas opções de envio 
                  para atender mais países no futuro próximo.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Como posso rastrear meu pedido?</h3>
                <p className="text-text-secondary">
                  Uma vez que seu pedido é enviado, você receberá um link de rastreamento via WhatsApp. Você também pode 
                  rastrear seu pedido entrando em sua conta e visualizando seu histórico de pedidos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Seus produtos são veganos?</h3>
                <p className="text-text-secondary">
                    Sim! Todos os produtos da ShopFCC são 100% veganos. 
                  Nunca testamos em animais e trabalhamos apenas com fornecedores que compartilham nossos valores.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Posso cancelar ou modificar meu pedido?</h3>
                <p className="text-text-secondary">
                  Você pode cancelar ou modificar seu pedido dentro de 1 hora após o pedido. Após isso, 
                  por favor, entre em contato com nosso time de atendimento ao cliente para assistência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;