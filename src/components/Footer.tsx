import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsletter } from '../hooks/useNewsletter';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { subscribe, isSubscribing } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    const result = await subscribe(email.trim());
    
    if (result.success) {
      setEmail('');
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
          src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
          alt="CheLevi"
          className="w-40"
        />
        <h3 className="text-lg font-semibold text-gray-900">
        Entre no Círculo Íntimo
        </h3>
        <p className="text-gray-600 text-sm">
        As melhores histórias são as que se contam em privado. Deixe o seu contacto ou e-mail e receba acesso antecipado às coleções, convites exclusivos da CheLevi.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            disabled={isSubscribing}
          />
          <button
            type="submit"
            disabled={isSubscribing || !email.trim()}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubscribing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                A subscrever...
              </span>
            ) : (
              'Subscrever'
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500">
          Ao enviar os teus dados, aceitas receber comunicações de marketing da CheLevi. Podes cancelar a qualquer momento.
        </p>
      </div>

      {/* Apoio ao Cliente */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Apoio ao Cliente</h3>
        <ul className="space-y-2">
          <li><Link to="/orders" className="text-sm text-gray-600 hover:text-gray-900">Estado da Encomenda</Link></li>
          <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Informações de Envio</Link></li>
          <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contacte-nos</Link></li>
          <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Termos de Utilização</Link></li>
        </ul>
      </div>

      {/* Sobre */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sobre Nós</h3>
        <p className="text-sm text-gray-600">
          A CheLevi cria bolsas e sapatos premium que combinam durabilidade, estética e funcionalidade. 
          Cada peça é pensada para mulheres que sabem o que querem.
        </p>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">Sobre a Marca</Link></li>
        </ul>
      </div>
    </div>
  </div>

  {/* Rodapé Inferior */}
  <div className="border-t border-gray-200 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo/Nome */}

        {/* Redes Sociais */}
        <div className="flex items-center space-x-4">
          <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-900">Instagram</a>
          <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900">Facebook</a>
          <a href="#" aria-label="TikTok" className="text-gray-600 hover:text-gray-900">TikTok</a>
        </div>

        {/* Seletor de Idioma */}
        <select
          className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
          aria-label="Selecionar idioma"
          defaultValue="pt"
        >
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Links Legais */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
          <Link to="/terms" className="hover:text-gray-900">Termos de Utilização</Link>
          <Link to="/privacy-policy" className="hover:text-gray-900">Política de Privacidade</Link>
          <Link to="/shipping" className="hover:text-gray-900">Informações de Envio</Link>
        </div>
        <p className="text-sm text-gray-500">© 2025 CheLevi. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</footer>

);
};

export default Footer;