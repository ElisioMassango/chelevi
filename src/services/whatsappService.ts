// WhatsApp Service for Chelevi
import { logger } from '../utils/logger';
import { env } from '../config/environment';

// WhatsApp message templates
const MESSAGE_TEMPLATES = {
  // Welcome message for new account
  WELCOME: (userName: string) => 
    `🎉 *Bem-vindo à Chelevi!*\n\n` +
    `Olá ${userName}! 👋\n\n` +
    `É um prazer tê-lo connosco na nossa família Chelevi. Agora tem acesso a:\n\n` +
    `✨ *Produtos exclusivos* da nossa coleção\n` +
    `🛍️ *Ofertas especiais* para membros\n` +
    `🚚 *Entrega rápida* em todo o país\n` +
    `💬 *Suporte personalizado* sempre disponível\n\n` +
    `Explore a nossa loja e descubra peças únicas que refletem o seu estilo.\n\n` +
    `*Código de desconto:* WELCOME10 (10% de desconto na primeira compra)\n\n` +
    `Bem-vindo à família Chelevi! 💜`,

  // Order confirmation
  ORDER_CONFIRMATION: (userName: string, orderId: string, total: string, products: string) => 
    `🛍️ *Encomenda Confirmada!*\n\n` +
    `Olá ${userName}! 👋\n\n` +
    `A sua encomenda foi recebida com sucesso:\n\n` +
    `📦 *Número da Encomenda:* ${orderId}\n` +
    `💰 *Total:* MT ${total}\n\n` +
    `🛍️ *Produtos:*\n${products}\n\n` +
    `📋 *Próximos Passos:*\n` +
    `• Processaremos a sua encomenda em 24h\n` +
    `• Enviaremos atualizações por WhatsApp\n` +
    `• Entrega estimada: 2-5 dias úteis\n\n` +
    `Obrigado por escolher a Chelevi! 💜`,

  // Contact form submission
  CONTACT_FORM: (userName: string, subject: string, message: string) => 
    `📧 *Nova Mensagem de Contacto*\n\n` +
    `👤 *Nome:* ${userName}\n` +
    `📝 *Assunto:* ${subject}\n` +
    `💬 *Mensagem:*\n${message}\n\n` +
    `Responderemos em breve! 💜`,

  // Newsletter subscription
  NEWSLETTER_WELCOME: (email: string) => 
    `📧 *Newsletter Chelevi*\n\n` +
    `Obrigado por se inscrever na nossa newsletter!\n\n` +
    `📧 *Email:* ${email}\n\n` +
    `Agora receberá:\n` +
    `✨ *Novidades* da coleção\n` +
    `🎉 *Ofertas exclusivas*\n` +
    `💡 *Dicas de estilo*\n` +
    `📅 *Eventos especiais*\n\n` +
    `Bem-vindo à família Chelevi! 💜`
};
//Teste
// Owner contact information
const OWNERS = [
  {
    name: 'Chelevi Team',
    email: 'elisiomassango12@gmail.com',
    phone: '+258845376645'
  }
];

class WhatsAppService {
  private baseUrl: string;
  private apiKey: string;
  private instance: string;

  constructor() {
    this.baseUrl = env.whatsapp.baseUrl;
    this.apiKey = env.whatsapp.apiKey;
    this.instance = env.whatsapp.instance;
  }

  // Send text message
  async sendMessage(data: {
    number: string;
    text: string;
    delay?: number;
    linkPreview?: boolean;
  }): Promise<any> {
    try {
      console.log('📱 Sending WhatsApp message:', {
        number: data.number,
        text: data.text.substring(0, 100) + '...',
        instance: this.instance
      });

      const response = await fetch(`${this.baseUrl}/message/sendText/${this.instance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.apiKey,
        },
        body: JSON.stringify({
          number: data.number,
          text: data.text,
          delay: data.delay || 1000,
          linkPreview: data.linkPreview || false,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      logger.userAction('WhatsApp message sent successfully', { 
        number: data.number, 
        messageLength: data.text.length 
      });
      
      return result;
    } catch (error) {
      logger.error('Failed to send WhatsApp message', { 
        error, 
        number: data.number 
      });
      throw error;
    }
  }

  // Send welcome message to new user
  async sendWelcomeMessage(userName: string, phoneNumber: string): Promise<void> {
    try {
      const message = MESSAGE_TEMPLATES.WELCOME(userName);
      await this.sendMessage({
        number: phoneNumber,
        text: message,
        delay: 1000,
        linkPreview: false,
      });
      
      logger.userAction('Welcome message sent to new user', { 
        userName, 
        phoneNumber 
      });
    } catch (error) {
      logger.error('Failed to send welcome message', { 
        error, 
        userName, 
        phoneNumber 
      });
      throw error;
    }
  }

  // Send order confirmation
  async sendOrderConfirmation(
    userName: string, 
    phoneNumber: string, 
    orderId: string, 
    total: string, 
    products: string
  ): Promise<void> {
    try {
      const message = MESSAGE_TEMPLATES.ORDER_CONFIRMATION(userName, orderId, total, products);
      await this.sendMessage({
        number: phoneNumber,
        text: message,
        delay: 1000,
        linkPreview: false,
      });
      
      logger.userAction('Order confirmation sent via WhatsApp', { 
        userName, 
        phoneNumber, 
        orderId 
      });
    } catch (error) {
      logger.error('Failed to send order confirmation', { 
        error, 
        userName, 
        phoneNumber, 
        orderId 
      });
      throw error;
    }
  }

  // Send contact form notification to owners
  async sendContactFormNotification(
    userName: string, 
    subject: string, 
    message: string
  ): Promise<void> {
    try {
      const notificationMessage = MESSAGE_TEMPLATES.CONTACT_FORM(userName, subject, message);
      
      // Send to all owners
      const promises = OWNERS.map(async (owner) => {
        try {
          await this.sendMessage({
            number: owner.phone,
            text: notificationMessage,
            delay: 1000,
            linkPreview: false,
          });
          
          logger.userAction('Contact form notification sent to owner', { 
            owner: owner.name, 
            phone: owner.phone 
          });
        } catch (error) {
          logger.error('Failed to send contact form notification to owner', { 
            error, 
            owner: owner.name, 
            phone: owner.phone 
          });
        }
      });

      await Promise.all(promises);
    } catch (error) {
      logger.error('Failed to send contact form notifications', { 
        error, 
        userName, 
        subject 
      });
      throw error;
    }
  }

  // Send newsletter welcome message
  async sendNewsletterWelcome(email: string, phoneNumber?: string): Promise<void> {
    try {
      if (phoneNumber) {
        const message = MESSAGE_TEMPLATES.NEWSLETTER_WELCOME(email);
        await this.sendMessage({
          number: phoneNumber,
          text: message,
          delay: 1000,
          linkPreview: false,
        });
        
        logger.userAction('Newsletter welcome message sent', { 
          email, 
          phoneNumber 
        });
      }
    } catch (error) {
      logger.error('Failed to send newsletter welcome message', { 
        error, 
        email, 
        phoneNumber 
      });
      throw error;
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/instance/connectionState/${this.instance}`, {
        method: 'GET',
        headers: {
          'apikey': this.apiKey,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      logger.info('WhatsApp connection test successful', { data });
      return true;
    } catch (error) {
      logger.error('WhatsApp connection test failed', { error });
      return false;
    }
  }
}

export const whatsappService = new WhatsAppService();
