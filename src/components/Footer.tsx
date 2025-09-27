import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      console.log('Newsletter subscription:', { email, phone });
      setEmail('');
      setPhone('');
      // success toast
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // error toast
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Rodapé Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
          {/* Newsletter */}
          <div className="space-y-4">
          <img
                src="https://crm.sparktech.pt/assets/shopfcc/shopfcclogo.png"
                  alt="ShopFCC"
                className="w-40 h-30"
              />
            <h3 className="text-lg font-semibold text-gray-900">
              Fica por dentro + Ganha 15% Desconto
            </h3>
            <p className="text-gray-600 text-sm">
              Subscreve com o teu telefone e email para receber novidades e ofertas exclusivas da ShopFCC.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {isSubscribing ? 'A subscrever...' : 'Subscrever'}
              </button>
            </form>
            <p className="text-xs text-gray-500">
              Ao fornecer o teu telefone e email, aceitas receber mensagens e emails de marketing da ShopFCC.
            </p>
          </div>
  
          {/* Apoio ao Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Apoio ao Cliente
            </h3>
            <ul className="space-y-2">
              <li><Link to="/order-status" className="text-sm text-gray-600 hover:text-gray-900">Estado da Encomenda</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Informações de Envio</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-600 hover:text-gray-900">Trocas e Devoluções</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contacta-nos</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">Ajuda & Perguntas Frequentes</Link></li>
              <li><Link to="/account" className="text-sm text-gray-600 hover:text-gray-900">A Minha Conta</Link></li>
              <li><Link to="/gift-card" className="text-sm text-gray-600 hover:text-gray-900">Saldo Cartão Presente</Link></li>
            </ul>
          </div>
  
          {/* Sobre + Imagem */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Sobre Nós
            </h3>
            <p className="text-sm text-gray-600">
              A ShopFCC dedica-se a oferecer produtos capilares premium, feitos para realçar a beleza natural do teu cabelo. Acreditamos em qualidade, inovação e sustentabilidade.
            </p>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">Sobre a Marca</Link></li>
              <li><Link to="/student-discount" className="text-sm text-gray-600 hover:text-gray-900">Descontos para Estudantes</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900">Carreiras</Link></li>
            </ul>
            
          </div>
        </div>
      </div>
  
      {/* Rodapé Inferior */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-gray-900">
              SHOPFCC
            </Link>
  
            {/* Redes Sociais */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">YouTube</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">TikTok</a>
            </div>
  
            {/* Seletor de Idioma */}
            <select
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>
  
          {/* Links Legais */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
              <Link to="/terms" className="hover:text-gray-900">Termos de Utilização</Link>
              <Link to="/privacy" className="hover:text-gray-900">Política de Privacidade</Link>
              <Link to="/refund" className="hover:text-gray-900">Política de Reembolso</Link>
            </div>
              <p className="text-sm text-gray-500">© 2025 ShopFCC. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;