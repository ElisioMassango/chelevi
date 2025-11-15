// Owner Notification Service for Chelevi
import { logger } from '../utils/logger';
import { whatsappService } from './whatsappService';
import { emailService } from './emailService';

// Owner contact information
const OWNERS = [
  {
    name: 'Chelevi Team',
    email: 'elisiomassango12@gmail.com',
    phone: '+258845376645'
  }
];

// WhatsApp message templates for owners
const OWNER_MESSAGE_TEMPLATES = {
  // New order notification
  NEW_ORDER: (userName: string, orderId: string, total: string, products: string, address: string) => 
    `🛍️ *NOVA ENCOMENDA RECEBIDA*\n\n` +
    `👤 *Cliente:* ${userName}\n` +
    `📦 *Pedido:* ${orderId}\n` +
    `💰 *Total:* MT ${total}\n\n` +
    `🛍️ *Produtos:*\n${products}\n\n` +
    `📍 *Endereço de Entrega:*\n${address}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 84 12 34 567\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // New contact form notification
  NEW_CONTACT: (userName: string, email: string, subject: string, message: string) => 
    `📧 *NOVA MENSAGEM DE CONTACTO*\n\n` +
    `👤 *Nome:* ${userName}\n` +
    `📧 *Email:* ${email}\n` +
    `📝 *Assunto:* ${subject}\n\n` +
    `💬 *Mensagem:*\n${message}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 84 12 34 567\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // New account notification
  NEW_ACCOUNT: (userName: string, email: string, phone: string) => 
    `👤 *NOVA CONTA CRIADA*\n\n` +
    `👤 *Nome:* ${userName}\n` +
    `📧 *Email:* ${email}\n` +
    `📱 *Telefone:* ${phone}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 84 12 34 567\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // Newsletter subscription notification
  NEWSLETTER_SUBSCRIPTION: (email: string) => 
    `📧 *NOVA SUBSCRIÇÃO DE NEWSLETTER*\n\n` +
    `📧 *Email:* ${email}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 84 12 34 567\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // New reservation notification
  NEW_RESERVATION: (productId: number, productName: string, userName: string, email: string, phone: string, quantity: number, country: string) => 
    `📦 *NOVA RESERVA DE PRODUTO*\n\n` +
    `🛍️ *Produto:* ${productName}\n` +
    `🆔 *ID do Produto:* ${productId}\n\n` +
    `👤 *Cliente:*\n` +
    `• Nome: ${userName}\n` +
    `• Email: ${email}\n` +
    `• Telefone: ${phone}\n` +
    `• País: ${country === 'mocambique' ? '🇲🇿 Moçambique' : '🇵🇹 Portugal'}\n\n` +
    `📊 *Quantidade Desejada:* ${quantity}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 84 12 34 567\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`
};

// Email templates for owners
const OWNER_EMAIL_TEMPLATES = {
  // New order email
  NEW_ORDER: (userName: string, orderId: string, total: string, products: string, address: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Encomenda Recebida - Chelevi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Chelevi</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Sistema de Notificações</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 36px;">🛍️</span>
            </div>
            <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Nova Encomenda Recebida</h2>
            <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Uma nova encomenda foi realizada no sistema</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Detalhes da Encomenda</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #7f8c8d;">Cliente:</span>
              <span style="color: #2c3e50; font-weight: 600;">${userName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #7f8c8d;">Pedido:</span>
              <span style="color: #2c3e50; font-weight: 600;">${orderId}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="color: #7f8c8d;">Total:</span>
              <span style="color: #8B4E6F; font-weight: 600; font-size: 18px;">MT ${total}</span>
            </div>
            <div style="border-top: 1px solid #e9ecef; padding-top: 15px;">
              <span style="color: #7f8c8d; display: block; margin-bottom: 5px;">Produtos:</span>
              <p style="color: #2c3e50; margin: 0; line-height: 1.5;">${products}</p>
            </div>
          </div>
          
          <div style="background-color: #e8f5e8; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">📍 Endereço de Entrega</h3>
            <p style="color: #2c3e50; margin: 0; line-height: 1.5;">${address}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Para mais detalhes, acesse o painel administrativo ou entre em contato.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
          <p style="color: #ffffff; margin: 0; font-size: 14px;">
            © 2025 Chelevi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,

  // New contact form email
  NEW_CONTACT: (userName: string, email: string, subject: string, message: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Mensagem de Contacto - Chelevi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Chelevi</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Sistema de Notificações</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 36px;">📧</span>
            </div>
            <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Nova Mensagem de Contacto</h2>
            <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Uma nova mensagem foi enviada através do formulário de contacto</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Detalhes da Mensagem</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #7f8c8d;">Nome:</span>
              <span style="color: #2c3e50; font-weight: 600;">${userName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #7f8c8d;">Email:</span>
              <span style="color: #2c3e50; font-weight: 600;">${email}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span style="color: #7f8c8d;">Assunto:</span>
              <span style="color: #8B4E6F; font-weight: 600;">${subject}</span>
            </div>
            <div style="border-top: 1px solid #e9ecef; padding-top: 15px;">
              <span style="color: #7f8c8d; display: block; margin-bottom: 5px;">Mensagem:</span>
              <p style="color: #2c3e50; margin: 0; line-height: 1.5;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Para mais detalhes, acesse o painel administrativo ou entre em contato.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
          <p style="color: #ffffff; margin: 0; font-size: 14px;">
            © 2025 Chelevi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
};

class OwnerNotificationService {
  // Send WhatsApp message to all owners
  private async sendWhatsAppToOwners(message: string): Promise<void> {
    console.log('📱 sendWhatsAppToOwners called with message:', message.substring(0, 100) + '...');
    
    const promises = OWNERS.map(async (owner) => {
      try {
        console.log('📞 Sending WhatsApp to owner:', owner.name, owner.phone);
        
        await whatsappService.sendMessage({
          number: owner.phone,
          text: message,
          delay: 1000,
          linkPreview: false,
        });
        
        logger.userAction('Owner WhatsApp notification sent', { 
          owner: owner.name, 
          phone: owner.phone 
        });
      } catch (error) {
        logger.error('Failed to send WhatsApp to owner', { 
          error, 
          owner: owner.name, 
          phone: owner.phone 
        });
      }
    });
    
    await Promise.all(promises);
  }

  // Send email to all owners
  private async sendEmailToOwners(subject: string, html: string): Promise<void> {
    const promises = OWNERS.map(async (owner) => {
      try {
        await emailService.sendEmail({
          to: owner.email,
          subject: subject,
          html: html,
          type: 'owner_notification'
        });
        
        logger.userAction('Owner email notification sent', { 
          owner: owner.name, 
          email: owner.email 
        });
      } catch (error) {
        logger.error('Failed to send email to owner', { 
          error, 
          owner: owner.name, 
          email: owner.email 
        });
      }
    });
    
    await Promise.all(promises);
  }

  // Notify owners about new order
  async notifyNewOrder(userName: string, orderId: string, total: string, products: string, address: string): Promise<void> {
    try {
      console.log('🚀 OwnerNotificationService.notifyNewOrder called with:', {
        userName,
        orderId,
        total,
        products,
        address
      });
      
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEW_ORDER(
        userName, orderId, total, products, address
      );
      
      const emailHtml = OWNER_EMAIL_TEMPLATES.NEW_ORDER(
        userName, orderId, total, products, address
      );

      // Send notifications to all owners
      await Promise.all([
        this.sendWhatsAppToOwners(whatsappMessage),
        this.sendEmailToOwners('Nova Encomenda Recebida - Chelevi', emailHtml)
      ]);

      logger.userAction('Owner notification sent for new order', { 
        userName, 
        orderId, 
        total 
      });
    } catch (error) {
      logger.error('Failed to notify owners about new order', { 
        error, 
        userName, 
        orderId 
      });
    }
  }

  // Notify owners about new contact form
  async notifyNewContact(userName: string, email: string, subject: string, message: string): Promise<void> {
    try {
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEW_CONTACT(
        userName, email, subject, message
      );
      
      const emailHtml = OWNER_EMAIL_TEMPLATES.NEW_CONTACT(
        userName, email, subject, message
      );

      // Send notifications to all owners
      await Promise.all([
        this.sendWhatsAppToOwners(whatsappMessage),
        this.sendEmailToOwners('Nova Mensagem de Contacto - Chelevi', emailHtml)
      ]);

      logger.userAction('Owner notification sent for new contact', { 
        userName, 
        email, 
        subject 
      });
    } catch (error) {
      logger.error('Failed to notify owners about new contact', { 
        error, 
        userName, 
        email, 
        subject 
      });
    }
  }

  // Notify owners about new account
  async notifyNewAccount(userName: string, email: string, phone: string): Promise<void> {
    try {
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEW_ACCOUNT(
        userName, email, phone
      );

      // Send WhatsApp notification to owners
      await this.sendWhatsAppToOwners(whatsappMessage);

      logger.userAction('Owner notification sent for new account', { 
        userName, 
        email, 
        phone 
      });
    } catch (error) {
      logger.error('Failed to notify owners about new account', { 
        error, 
        userName, 
        email, 
        phone 
      });
    }
  }

  // Notify owners about newsletter subscription
  async notifyNewsletterSubscription(email: string): Promise<void> {
    try {
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEWSLETTER_SUBSCRIPTION(email);

      // Send WhatsApp notification to owners
      await this.sendWhatsAppToOwners(whatsappMessage);

      logger.userAction('Owner notification sent for newsletter subscription', { 
        email 
      });
    } catch (error) {
      logger.error('Failed to notify owners about newsletter subscription', { 
        error, 
        email 
      });
    }
  }

  // Notify owners about new reservation
  async notifyNewReservation(
    productId: number,
    productName: string,
    userName: string,
    email: string,
    phone: string,
    quantity: number,
    country: string = 'mocambique'
  ): Promise<void> {
    try {
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEW_RESERVATION(
        productId, productName, userName, email, phone, quantity, country
      );

      // Send WhatsApp notification to owners
      await this.sendWhatsAppToOwners(whatsappMessage);

      logger.userAction('Owner notification sent for new reservation', { 
        productId,
        productName,
        userName,
        email,
        quantity
      });
    } catch (error) {
      logger.error('Failed to notify owners about new reservation', { 
        error, 
        productId,
        productName,
        userName
      });
    }
  }
}

export const ownerNotificationService = new OwnerNotificationService();
