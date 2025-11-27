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
  NEW_ORDER: (userName: string, orderId: string, total: string, products: string, address: string, couponInfo?: any) => {
    let message = `🛍️ *NOVA ENCOMENDA RECEBIDA*\n\n` +
      `👤 *Cliente:* ${userName}\n` +
      `📦 *Pedido:* ${orderId}\n`;
    
    if (couponInfo && couponInfo.status) {
      message += `🎟️ *Cupom Usado:* ${couponInfo.code}\n` +
        `💰 *Desconto Aplicado:* -MT ${parseFloat(couponInfo.discount_amount || '0').toFixed(2)}`;
      if (couponInfo.discount_string) {
        message += ` (${couponInfo.discount_string})`;
      }
      message += `\n`;
    }
    
    message += `💰 *Total:* MT ${total}\n\n` +
      `🛍️ *Produtos:*\n${products}\n\n` +
      `📍 *Endereço de Entrega:*\n${address}\n\n` +
      `💬 *Para mais detalhes:*\n` +
      `• Email: info@chelevi.com\n` +
      `• WhatsApp: +258 85 22 32 423\n\n` +
      `✨ *Chelevi* - Sistema de Notificações`;
    
    return message;
  },

  // New contact form notification
  NEW_CONTACT: (userName: string, email: string, subject: string, message: string) => 
    `📧 *NOVA MENSAGEM DE CONTACTO*\n\n` +
    `👤 *Nome:* ${userName}\n` +
    `📧 *Email:* ${email}\n` +
    `📝 *Assunto:* ${subject}\n\n` +
    `💬 *Mensagem:*\n${message}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 85 22 32 423\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // New account notification
  NEW_ACCOUNT: (userName: string, email: string, phone: string) => 
    `👤 *NOVA CONTA CRIADA*\n\n` +
    `👤 *Nome:* ${userName}\n` +
    `📧 *Email:* ${email}\n` +
    `📱 *Telefone:* ${phone}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 85 22 32 423\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`,

  // Newsletter subscription notification
  NEWSLETTER_SUBSCRIPTION: (email: string) => 
    `📧 *NOVA SUBSCRIÇÃO DE NEWSLETTER*\n\n` +
    `📧 *Email:* ${email}\n\n` +
    `💬 *Para mais detalhes:*\n` +
    `• Email: info@chelevi.com\n` +
    `• WhatsApp: +258 85 22 32 423\n\n` +
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
    `• WhatsApp: +258 85 22 32 423\n\n` +
    `✨ *Chelevi* - Sistema de Notificações`
};

// Email templates for owners
const OWNER_EMAIL_TEMPLATES = {
  // New order email
  NEW_ORDER: (userName: string, orderId: string, total: string, products: string, address: string, couponInfo?: any) => `
 <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Encomenda – CheLevi</title>
</head>

<body style="margin:0; padding:0; background: #0e1117; font-family: 'Segoe UI', sans-serif;">

  <!-- Main Wrapper -->
  <div style="max-width: 620px; margin: 0 auto;">

    <!-- Header -->
    <div style="padding: 45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
           alt="CheLevi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, #12171f, #1b2433); padding: 45px 35px; border-radius: 22px 22px 0 0;">
      <h1 style="color:#1e1e1e; font-size:28px; margin:0; font-weight:300; letter-spacing:1px;">
        Nova Encomenda Recebida
      </h1>
      <p style="color:#1e1e1e; font-size:16px; margin-top:12px;">
        Uma nova compra foi efectuada no sistema CheLevi.
      </p>
    </div>

    <!-- Order Details Card -->
    <div style="background:#ffffff; padding: 35px; border-radius: 0 0 22px 22px;">

      <!-- Icon -->
      <div style="text-align:center; margin-bottom:28px;">
        <div style="
          width:80px;
          height:80px;
          background:#000;
          border-radius:50%;
          display:flex;
          justify-content:center;
          align-items:center;
          margin:0 auto;">
          <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLeVi" style="width:100%; height:100%; object-fit:contain;">
        </div>
      </div>

      <!-- Order Title -->
      <h2 style="font-size:22px; margin:0 0 20px; color:#1e1e1e; text-align:center; font-weight:500;">
        Detalhes da Encomenda
      </h2>

      <!-- Order Info -->
      <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:25px;">
        <tr>
          <td style="color:#777; font-size:15px;">Cliente:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600;">${userName}</td>
        </tr>
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Pedido:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600; padding-top:10px;">${orderId}</td>
        </tr>
        ${couponInfo && couponInfo.status ? `
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Cupom Usado:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600; padding-top:10px;">${couponInfo.code}</td>
        </tr>
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Desconto Aplicado:</td>
          <td style="text-align:right; color:#28a745; font-weight:600; padding-top:10px;">
            -MT ${parseFloat(couponInfo.discount_amount || '0').toFixed(2)} ${couponInfo.discount_string ? `(${couponInfo.discount_string})` : ''}
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Total:</td>
          <td style="text-align:right; color:#000; font-weight:700; padding-top:10px; font-size:18px;">
            MT ${total}
          </td>
        </tr>
      </table>

      <!-- Products -->
      <div style="border-top:1px solid #eee; padding-top:18px;">
        <span style="color:#777; font-size:15px;">Produtos:</span>
        <p style="color:#1e1e1e; font-size:15px; line-height:1.6; margin-top:8px;">
          ${products}
        </p>
      </div>

      <!-- Address -->
      <div style="background:#f5f7f8; padding:20px; border-radius:12px; margin-top:25px;">
        <h3 style="color:#1e1e1e; font-size:16px; margin:0 0 8px;">📍 Endereço de Entrega</h3>
        <p style="color:#1e1e1e; font-size:15px; margin:0; line-height:1.6;">
          ${address}
        </p>
      </div>

      <!-- Info -->
      <p style="text-align:center; color:#7a7a7a; margin-top:30px; font-size:13px;">
        Para mais detalhes, aceda ao painel administrativo.
      </p>

    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:30px 10px; color:#c9cdd4; font-size:13px;">
      © 2025 CheLevi — Todos os direitos reservados.
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
  <title>Nova Mensagem de Contacto - CheLevi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- Header -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
           alt="CheLevi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- Title Section -->
    <div style="background:linear-gradient(135deg,#12171f,#1b2433); padding:45px 35px; border-radius:20px 20px 0 0;">
      <h1 style="color:#1e1e1e; margin:0; font-size:26px; font-weight:300; letter-spacing:1px;">
        Nova Mensagem Recebida
      </h1>
      <p style="color:#1e1e1e; font-size:16px; margin-top:12px;">
        Um visitante enviou uma mensagem através do site CheLevi.
      </p>
    </div>

    <!-- Details Card -->
    <div style="background:#ffffff; padding:35px; border-radius:0 0 20px 20px;">

      <h2 style="font-size:20px; color:#1e1e1e; margin:0 0 25px; text-align:center; font-weight:500;">
        Detalhes da Mensagem
      </h2>

      <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:25px;">
        <tr>
          <td style="color:#777; font-size:15px;">Nome:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600;">${userName}</td>
        </tr>

        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Email:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600; padding-top:10px;">${email}</td>
        </tr>

        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Assunto:</td>
          <td style="text-align:right; color:#000; font-weight:600; padding-top:10px;">${subject}</td>
        </tr>
      </table>

      <!-- Message -->
      <div style="border-top:1px solid #eee; padding-top:18px;">
        <span style="color:#777; font-size:15px;">Mensagem:</span>
        <p style="color:#1e1e1e; margin-top:8px; font-size:15px; line-height:1.6;">
          ${message}
        </p>
      </div>

      <p style="text-align:center; color:#7a7a7a; margin-top:30px; font-size:13px;">
        Para mais detalhes, aceda ao painel administrativo.
      </p>

    </div>

    <!-- Footer -->
    <div style="padding:30px 10px; text-align:center; color:#c9cdd4; font-size:13px;">
      © 2025 CheLeVi — Todos os direitos reservados.
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
  async notifyNewOrder(userName: string, orderId: string, total: string, products: string, address: string, couponInfo?: any): Promise<void> {
    try {
      console.log('🚀 OwnerNotificationService.notifyNewOrder called with:', {
        userName,
        orderId,
        total,
        products: products.substring(0, 100) + '...',
        address,
        hasCoupon: !!couponInfo
      });
      
      const whatsappMessage = OWNER_MESSAGE_TEMPLATES.NEW_ORDER(
        userName, orderId, total, products, address, couponInfo
      );
      
      const emailHtml = OWNER_EMAIL_TEMPLATES.NEW_ORDER(
        userName, orderId, total, products, address, couponInfo
      );

      // Send notifications to all owners - don't fail if one fails
      const notificationPromises = [
        this.sendEmailToOwners('Nova Encomenda Recebida - Chelevi', emailHtml).catch((error) => {
          console.error('❌ Failed to send email to owners:', error);
          logger.error('Failed to send email to owners', { error, orderId });
        }),
        this.sendWhatsAppToOwners(whatsappMessage).catch((error) => {
          console.error('❌ Failed to send WhatsApp to owners:', error);
          logger.error('Failed to send WhatsApp to owners', { error, orderId });
        })
      ];

      await Promise.allSettled(notificationPromises);

      console.log('✅ Owner notification process completed');
      logger.userAction('Owner notification process completed for new order', { 
        userName, 
        orderId, 
        total 
      });
    } catch (error) {
      console.error('❌ Critical error in notifyNewOrder:', error);
      logger.error('Failed to notify owners about new order', { 
        error, 
        userName, 
        orderId 
      });
      // Don't throw - we don't want to break the order flow
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
