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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Estamos aqui.</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Mais do que uma marca, somos uma confidente. Se uma dúvida a inquieta, se uma história precisa de ser partilhada, ou se simplesmente procura um conselho de estilo, a nossa linha está aberta. Para si.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Bloco de Apoio:</h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Tem perguntas sobre nossos produtos, precisa de ajuda com seu pedido ou quer saber mais sobre a CheLevi? 
                Gostaríamos de ouvir de si! A nossa equipa está pronta para ajudá-la.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <MapPin className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Visite-nos</h3>
                  <p className="text-text-secondary">
                  Rua da Resistência n° 1550, R/C. <br />
                    Maputo, Mozambique <br />
                    As portas estão abertas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <Phone className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Ligue-nos</h3>
                  <p>Uma conversa está à distância de uma chamada. </p>
                  <p className="text-text-secondary">
                  +258 85 2232423.<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <Mail className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">Envie-nos um Email</h3>
                  <p className="text-text-secondary">
                    info@cheLevivi.com<br />
                    support@cheLevi.com
                  </p>
                </div>    
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-lg border">
                <MessageSquare className="text-secondary mt-1" size={24} />
                <div>
                      <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-text-secondary">
                    +258 85 2232423.<br />
                    Disponível 24/7 para suporte instantâneo
                  </p>
                </div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Questões Frequentes (FAQ)</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
          A elegância reside na clareza. Aqui, reunimos as respostas para as suas questões, permitindo-lhe uma experiência tão fluida e serena quanto as nossas peças.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">•	Quanto tempo demora a entrega?</h3>
                <p className="text-text-secondary">
                Em Maputo, em apenas 1 a 2 dias. No resto do país, 3 a 5 dias. Sempre com a promessa de chegar com cuidado, como se fosse entregue por mãos amigas.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">•	Como posso acompanhar o meu pedido?</h3>
                <p className="text-text-secondary">
                Receberá um link de rastreio pelo WhatsApp e poderá acompanhar o seu pedido a qualquer momento na sua conta CheLevi.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">•	Qual é a vossa política de devolução?</h3>
                <p className="text-text-secondary">
                Aceitamos devoluções até 30 dias após a compra. Confiamos na qualidade das nossas criações, mas queremos que cada escolha sua seja feita com a mesma confiança e prazer de usar CheLevi.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Como posso rastrear meu pedido?</h3>
                <p className="text-text-secondary">
                  Uma vez que seu pedido é enviado, receberás um link de rastreamento via WhatsApp.Também podes 
                  rastrear o teu pedido entrando em teu conta e visualizando o teu histórico de pedidos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Enviam para fora de Moçambique?</h3>
                <p className="text-text-secondary">
                Sim, enviamos para Portugal. Em breve estaremos também noutros países, para que a CheLevi continue a aproximar-se de quem partilha o nosso olhar sobre a elegância
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