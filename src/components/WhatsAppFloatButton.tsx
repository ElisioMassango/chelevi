import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloatButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    // WhatsApp number for Naturelle Beauty
    const phoneNumber = '258852232423';
    const message = 'Olá! Gostaria de saber mais sobre os produtos da CheLevi.';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#6666668b] hover:bg-[#6666668b] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Contatar via WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:animate-pulse" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Fale connosco no WhatsApp
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-[#d497118b] animate-ping opacity-20"></div>
    </button>
  );
};

export default WhatsAppFloatButton;
