import React, { useState } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! How can we help you today?',
      isBot: true,
      timestamp: new Date(),  
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [userInfo, setUserInfo] = useState({ email: '', whatsapp: '' });
  const [showUserForm, setShowUserForm] = useState(true);

  const quickQuestions = [
    'Posso cancelar ou editar meu pedido?',
    'Iniciar um retorno',
    'Recomendações de Produtos',
    'Qual é a minha política de retorno?',
    'Rastrear e gerenciar meus pedidos',
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Obrigado por sua mensagem! Nosso time vai entrar em contato com você em breve. Se você precisar de assistência imediata, podemos conectar você com um agente ao vivo.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate appropriate response
    setTimeout(() => {
      let responseText = '';
      switch (question) {
        case 'Posso cancelar ou editar meu pedido?':
          responseText = 'Você pode cancelar ou editar seu pedido dentro de 1 hora após o pedido. Por favor, verifique o status do seu pedido em sua conta ou entre em contato conosco imediatamente para assistência.';
          break;
        case 'Iniciar um retorno':
          responseText = 'We offer 30-day returns on all unopened products. Please visit our Returns page or contact customer service to start your return process.';
          break;
        case 'Recomendações de Produtos':
          responseText = 'Estou feliz em ajudar você a encontrar os produtos perfeitos! Qual tipo de cosméticos você está procurando? Labios, rosto, olhos ou skincare?';
          break;
        case 'Qual é a minha política de retorno?':
          responseText = 'Our return policy allows returns within 30 days of purchase for unopened products. All items must be in original condition with receipt.';
          break;
        case 'Rastrear e gerenciar meus pedidos':
          responseText = 'Você pode rastrear seus pedidos entrando em sua conta ou usando o número de rastreamento enviado para o seu WhatsApp. Gostaria de que eu ajudasse você a encontrar seu pedido?';
          break;
        default:
          responseText = 'Obrigado por sua pergunta! Nosso time fornecerá informações detalhadas em breve.';
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.whatsapp) return;

    setShowUserForm(false);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Obrigado! Temos suas informações de contato. Como podemos ajudá-lo hoje?`,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, welcomeMessage]);
  };

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-secondary hover:bg-accent text-text-primary p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Bot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-secondary p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <User size={16} className="text-text-primary" />
                  </div>
              <div>
                    <h3 className="font-semibold text-text-primary">CheLevi</h3>
                <p className="text-xs text-text-secondary">Online agora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-primary hover:text-accent transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info Form */}
          {showUserForm && (
            <div className="p-4 bg-primary border-b">
              <form onSubmit={handleUserInfoSubmit} className="space-y-3">
                <p className="text-sm font-medium text-text-primary">
                  Por favor, forneça suas informações de contato para começar:
                </p>
                <input
                  type="email"
                  placeholder="Endereço de email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-secondary"
                  required
                />
                <input
                  type="tel"
                  placeholder="Número de WhatsApp"
                  value={userInfo.whatsapp}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-secondary"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-accent text-text-primary py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar Chat
                </button>
              </form>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-text-primary'
                      : 'bg-secondary text-text-primary'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {!showUserForm && messages.length <= 2 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-secondary">Perguntas Rápidas:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {!showUserForm && (
              <div className="bg-primary p-3 rounded-lg">
                <p className="text-sm font-medium text-text-primary mb-2">Precisa de mais ajuda?</p>
                <button className="text-sm text-accent hover:underline">
                  Conectar com um agente ao vivo
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          {!showUserForm && (
            <div className="p-4 border-t bg-gray-50 rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-secondary"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-secondary hover:bg-accent text-text-primary p-2 rounded-md transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;