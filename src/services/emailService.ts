// Email Service for Chelevi
import { logger } from '../utils/logger';
import { env } from '../config/environment';

// Email templates
const EMAIL_TEMPLATES = {
  // Welcome email for new account
  WELCOME: (userName: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo à Chelevi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 300;">Chelevi</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Moda & Estilo</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 36px;">🎉</span>
            </div>
            <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Bem-vindo à Chelevi!</h2>
            <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Olá ${userName}, é um prazer tê-lo connosco!</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">O que pode esperar:</h3>
            <ul style="color: #2c3e50; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">✨ Produtos exclusivos da nossa coleção</li>
              <li style="margin-bottom: 8px;">🛍️ Ofertas especiais para membros</li>
              <li style="margin-bottom: 8px;">🚚 Entrega rápida em todo o país</li>
              <li style="margin-bottom: 8px;">💬 Suporte personalizado sempre disponível</li>
            </ul>
          </div>
          
          <div style="background-color: #e8f5e8; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 18px;">🎁 Oferta de Boas-vindas</h3>
            <p style="color: #2c3e50; margin: 0; font-size: 16px; font-weight: 600;">
              Use o código <strong>WELCOME10</strong> para 10% de desconto na sua primeira compra!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://chelevi.com" style="display: inline-block; background: linear-gradient(135deg, #8B4E6F, #A5697A); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Explorar Loja
            </a>
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

  // Order confirmation email
  ORDER_CONFIRMATION: (userName: string, orderId: string, total: string, products: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Encomenda Confirmada - Chelevi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 300;">Chelevi</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Moda & Estilo</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 36px;">🛍️</span>
            </div>
            <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Encomenda Confirmada!</h2>
            <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Olá ${userName}, a sua encomenda foi recebida com sucesso!</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Detalhes da Encomenda</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #7f8c8d;">Número da Encomenda:</span>
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
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">📋 Próximos Passos</h3>
            <ul style="color: #2c3e50; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 5px;">Processaremos a sua encomenda em 24h</li>
              <li style="margin-bottom: 5px;">Enviaremos atualizações por WhatsApp</li>
              <li style="margin-bottom: 5px;">Entrega estimada: 2-5 dias úteis</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Obrigado por escolher a Chelevi! 💜
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

  // Newsletter subscription email
  NEWSLETTER_WELCOME: (email: string) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Newsletter Chelevi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 300;">Chelevi</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Newsletter</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #ffffff; font-size: 36px;">📧</span>
            </div>
            <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Bem-vindo à nossa Newsletter!</h2>
            <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Obrigado por se inscrever na nossa newsletter!</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">O que receberá:</h3>
            <ul style="color: #2c3e50; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">✨ Novidades da coleção</li>
              <li style="margin-bottom: 8px;">🎉 Ofertas exclusivas</li>
              <li style="margin-bottom: 8px;">💡 Dicas de estilo</li>
              <li style="margin-bottom: 8px;">📅 Eventos especiais</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
              Bem-vindo à família Chelevi! 💜
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

// Owner contact information
const OWNERS = [
  {
    name: 'Chelevi Team',
    email: 'info@chelevi.com',
    phone: '+258841234567'
  }
];

class EmailService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = env.email.baseUrl;
    this.apiKey = env.email.apiKey;
  }

  // Send email
  async sendEmail(data: {
    to: string;
    subject: string;
    html: string;
    type?: string;
  }): Promise<any> {
    try {
      console.log('📧 Sending email:', {
        to: data.to,
        subject: data.subject,
        type: data.type
      });

      const response = await fetch(`${this.baseUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.apiKey,
        },
        body: JSON.stringify({
          to: data.to,
          subject: data.subject,
          html: data.html,
          type: data.type || 'general'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      logger.userAction('Email sent successfully', { 
        to: data.to, 
        subject: data.subject 
      });
      
      return result;
    } catch (error) {
      logger.error('Failed to send email', { 
        error, 
        to: data.to, 
        subject: data.subject 
      });
      throw error;
    }
  }

  // Send welcome email to new user
  async sendWelcomeEmail(userName: string, email: string): Promise<void> {
    try {
      const html = EMAIL_TEMPLATES.WELCOME(userName);
      await this.sendEmail({
        to: email,
        subject: 'Bem-vindo à Chelevi! 🎉',
        html: html,
        type: 'welcome'
      });
      
      logger.userAction('Welcome email sent to new user', { 
        userName, 
        email 
      });
    } catch (error) {
      logger.error('Failed to send welcome email', { 
        error, 
        userName, 
        email 
      });
      throw error;
    }
  }

  // Send order confirmation email
  async sendOrderConfirmation(
    userName: string, 
    email: string, 
    orderId: string, 
    total: string, 
    products: string
  ): Promise<void> {
    try {
      const html = EMAIL_TEMPLATES.ORDER_CONFIRMATION(userName, orderId, total, products);
      await this.sendEmail({
        to: email,
        subject: `Encomenda Confirmada - ${orderId}`,
        html: html,
        type: 'order_confirmation'
      });
      
      logger.userAction('Order confirmation email sent', { 
        userName, 
        email, 
        orderId 
      });
    } catch (error) {
      logger.error('Failed to send order confirmation email', { 
        error, 
        userName, 
        email, 
        orderId 
      });
      throw error;
    }
  }

  // Send newsletter welcome email
  async sendNewsletterWelcome(email: string): Promise<void> {
    try {
      const html = EMAIL_TEMPLATES.NEWSLETTER_WELCOME(email);
      await this.sendEmail({
        to: email,
        subject: 'Bem-vindo à Newsletter Chelevi! 📧',
        html: html,
        type: 'newsletter'
      });
      
      logger.userAction('Newsletter welcome email sent', { 
        email 
      });
    } catch (error) {
      logger.error('Failed to send newsletter welcome email', { 
        error, 
        email 
      });
      throw error;
    }
  }

  // Send contact form notification to owners
  async sendContactFormNotification(
    userName: string, 
    email: string, 
    subject: string, 
    message: string
  ): Promise<void> {
    try {
      const notificationHtml = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova Mensagem de Contacto - Chelevi</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Nova Mensagem de Contacto</h1>
              <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Chelevi</p>
            </div>
            
            <div style="padding: 40px 30px;">
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
            </div>
          </div>
        </body>
        </html>
      `;

      // Send to all owners
      const promises = OWNERS.map(async (owner) => {
        try {
          await this.sendEmail({
            to: owner.email,
            subject: `Nova Mensagem de Contacto - ${subject}`,
            html: notificationHtml,
            type: 'contact_form'
          });
          
          logger.userAction('Contact form notification sent to owner', { 
            owner: owner.name, 
            email: owner.email 
          });
        } catch (error) {
          logger.error('Failed to send contact form notification to owner', { 
            error, 
            owner: owner.name, 
            email: owner.email 
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
}

export const emailService = new EmailService();
