// Email Service for Chelevi
import { logger } from '../utils/logger';
import { env } from '../config/environment';
//i wnat logo in the emails
// Email templates
const EMAIL_TEMPLATES = {
  // Welcome email for new account
  WELCOME: (userName: string) => `
   <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo à CheLeVi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- LOGO -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHELEVI-PRETO.png"
           alt="CheLeVi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- HERO -->
    <div style="
      background:linear-gradient(135deg,#12171f,#1b2433);
      padding:45px 35px;
      border-radius:20px 20px 0 0;
      text-align:center;
    ">
      <div style="
        width:80px; height:80px;
        background:#000;
        border-radius:50%;
        margin:0 auto 25px;
        display:flex; align-items:center; justify-content:center;
      ">
        <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLeVi" style="width:100%; height:100%; object-fit:contain;">
      </div>

      <div style="color:#ffffff;">
        <h1 style="margin:0; font-size:28px; font-weight:300; letter-spacing:1px;">
          Bem-vindo à CheLeVi
        </h1>
        <p style="margin-top:12px; font-size:16px;">
          Olá ${userName}, é um privilégio tê-lo connosco.
        </p>
      </div>
    </div>

    <!-- CONTENT BLOCK -->
    <div style="background:#ffffff; padding:35px;">

      <h2 style="font-size:20px; color:#1e1e1e; margin:0 0 20px; font-weight:500;">
        A sua jornada começa agora
      </h2>

      <p style="color:#4a4a4a; font-size:15px; line-height:1.6; margin-bottom:25px;">
        A CheLeVi é um universo de elegância, carácter e identidade. Aqui, cada peça
        é muito mais do que moda — é uma afirmação de estilo e poder.
      </p>

      <div style="
        background:#f5f7f8;
        padding:25px;
        border-radius:16px;
        margin-bottom:30px;
      ">
        <h3 style="margin:0 0 15px; color:#1e1e1e; font-size:17px;">O que pode esperar:</h3>

        <ul style="padding-left:20px; margin:0; color:#1e1e1e; font-size:15px; line-height:1.7;">
          <li>✨ Acesso antecipado a novos lançamentos</li>
          <li>🛍️ Ofertas exclusivas para membros</li>
          <li>🚚 Entregas rápidas e seguras em todo Moçambique</li>
          <li>💬 Suporte Premium sempre disponível</li>
        </ul>
      </div>

      <!-- WELCOME OFFER -->
      <div style="
        background:#e8f5e8;
        border-left:4px solid #8B4E6F;
        padding:20px;
        border-radius:12px;
        text-align:center;
        margin-bottom:30px;
      ">
        <h3 style="margin:0 0 10px; color:#1e1e1e; font-size:18px;">🎁 Oferta de Boas-vindas</h3>

        <p style="color:#1e1e1e; font-size:16px; margin:0;">
          Use o código <strong>WELCOME10</strong> e receba  
          <strong style="color:#8B4E6F;">10% de desconto</strong> na sua primeira compra.
        </p>
      </div>

      <!-- BUTTON -->
      <div style="text-align:center; margin-top:20px;">
        <a href="https://chelevi.com"
           style="
             background:#000;
             color:#ffffff;
             text-decoration:none;
             padding:15px 32px;
             font-size:16px;
             border-radius:8px;
             display:inline-block;
             letter-spacing:0.5px;
           ">
          Explorar Coleção
        </a>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="padding:30px 10px; text-align:center;">
      <p style="color:#c9cdd4; font-size:13px; margin:0;">
        © 2025 CheLeVi — Todos os direitos reservados.
      </p>
    </div>

  </div>

</body>
</html>

  `,

  // Order confirmation email
  ORDER_CONFIRMATION: (userName: string, orderId: string, total: string, products: string, couponInfo?: any) => `
   <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Encomenda Confirmada - CheLeVi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- LOGO -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
           alt="CheLeVi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- HERO SECTION -->
    <div style="
      background:linear-gradient(135deg,#12171f,#1b2433);
      padding:45px 35px;
      border-radius:20px 20px 0 0;
      text-align:center;
    ">
      <div style="
        width:80px; height:80px;
        background:#000;
        border-radius:50%;
        margin:0 auto 25px;
        display:flex; align-items:center; justify-content:center;
      ">
        <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLeVi" style="width:100%; height:100%; object-fit:contain;">
      </div>

      <div >
        <h1 style="margin:0; font-size:28px; font-weight:300; letter-spacing:1px;">
          Encomenda Confirmada
        </h1>
        <p style="margin-top:12px; font-size:16px;">
          Olá ${userName}, recebemos a sua encomenda com sucesso.
        </p>
      </div>
    </div>

    <!-- ORDER DETAILS CARD -->
    <div style="background:#ffffff; padding:35px;">

      <h2 style="font-size:20px; color:#1e1e1e; margin:0 0 25px; font-weight:500; text-align:center;">
        Detalhes da Encomenda
      </h2>

      <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:25px;">
        <tr>
          <td style="color:#777; font-size:15px;">Número da Encomenda:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600;">${orderId}</td>
        </tr>
        ${couponInfo && couponInfo.status ? `
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Cupom Aplicado:</td>
          <td style="text-align:right; color:#1e1e1e; font-weight:600; padding-top:10px;">
            ${couponInfo.code}
          </td>
        </tr>
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Desconto:</td>
          <td style="text-align:right; color:#28a745; font-weight:600; padding-top:10px;">
            -MT ${parseFloat(couponInfo.discount_amount || '0').toFixed(2)} ${couponInfo.discount_string ? `(${couponInfo.discount_string})` : ''}
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="color:#777; font-size:15px; padding-top:10px;">Total:</td>
          <td style="text-align:right; color:#000; font-weight:700; font-size:18px; padding-top:10px;">
            MT ${total}
          </td>
        </tr>
      </table>

      <!-- PRODUCTS -->
      <div style="border-top:1px solid #eee; padding-top:18px;">
        <span style="color:#777; font-size:15px;">Produtos:</span>
        <p style="color:#1e1e1e; font-size:15px; line-height:1.6; margin-top:8px;">
          ${products}
        </p>
      </div>

      <!-- NEXT STEPS -->
      <div style="
        background:#f5f7f8;
        padding:22px;
        border-radius:14px;
        margin-top:28px;
      ">
        <h3 style="margin:0 0 12px; color:#1e1e1e; font-size:16px;">📋 Próximos Passos</h3>

        <ul style="padding-left:20px; margin:0; color:#1e1e1e; font-size:15px; line-height:1.7;">
          <li>Processaremos a sua encomenda nas próximas 24h.</li>
          <li>Receberá atualizações por WhatsApp e Email.</li>
          <li>Entrega estimada: 2–5 dias úteis.</li>
        </ul>
      </div>

      <p style="text-align:center; margin-top:30px; color:#7a7a7a; font-size:14px;">
        Obrigado por escolher a CheLeVi. ✨  
      </p>

    </div>

    <!-- FOOTER -->
    <div style="padding:30px 10px; text-align:center;">
      <p style="color:#c9cdd4; font-size:13px; margin:0;">
        © 2025 CheLeVi — Todos os direitos reservados.
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
  <title>Newsletter CheLeVi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- LOGO -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
           alt="CheLeVi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- HERO -->
    <div style="
      background:linear-gradient(135deg,#12171f,#1b2433);
      padding:45px 35px;
      border-radius:20px 20px 0 0;
      text-align:center;
    ">
      <div style="
        width:80px; height:80px;
        background:#000;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        margin:0 auto 25px;
      ">
        <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLeVi" style="width:100%; height:100%; object-fit:contain;">
      </div>

      <div style="color:#ffffff;">
        <h1 style="color:#1e1e1e; margin:0; font-size:28px; font-weight:300; letter-spacing:1px;">
          Bem-vindo à Newsletter CheLeVi
        </h1>
        <p style="color:#1e1e1e; margin-top:12px; font-size:16px;">
          Obrigado por juntar-se ao nosso universo de estilo, identidade e elegância.
        </p>
      </div>
    </div>

    <!-- CONTENT SECTION -->
    <div style="background:#ffffff; padding:35px;">

      <h2 style="font-size:20px; color:#1e1e1e; margin:0 0 20px; font-weight:500;">
        O que vai receber:
      </h2>

      <div style="
        background:#f5f7f8;
        padding:25px;
        border-radius:16px;
        margin-bottom:30px;
      ">
        <ul style="padding-left:20px; margin:0; color:#1e1e1e; font-size:15px; line-height:1.7;">
          <li>✨ Acesso antecipado aos novos lançamentos</li>
          <li>🎉 Ofertas exclusivas para membros</li>
          <li>💡 Inspiração e dicas de estilo CheLeVi</li>
          <li>📅 Eventos privados e campanhas especiais</li>
        </ul>
      </div>

      <p style="text-align:center; margin-top:30px; color:#7a7a7a; font-size:14px;">
        Obrigado por fazer parte da família CheLeVi.  
        <br>Juntos, definimos estilo. ✨
      </p>

    </div>

    <!-- FOOTER -->
    <div style="padding:30px 10px; text-align:center;">
      <p style="color:#c9cdd4; font-size:13px; margin:0;">
        © 2025 CheLeVi — Todos os direitos reservados.
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
    email: 'zeincanto13@gmail.com',
    phone: '+258 85 2232423'
  }
];

class EmailService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Force backend API URL if still using proxy
    let baseUrl = env.email.baseUrl;
    if (baseUrl.includes('email-proxy') || baseUrl.startsWith('/api/')) {
      console.warn('⚠️ Email Service: Detected proxy URL, forcing backend URL');
      baseUrl = env.backend.baseUrl + '/email';
    }
    
    this.baseUrl = baseUrl;
    this.apiKey = env.email.apiKey;
    
    // Debug: Log the base URL being used
    console.log('📧 Email Service initialized with baseUrl:', this.baseUrl);
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

      const url = `${this.baseUrl}/send`;
      console.log('📧 Email API Request URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.to,
          subject: data.subject,
          html: encodeURIComponent(data.html), // JSON.stringify already handles encoding
          type: data.type || 'general'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Email API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
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
    products: string,
    couponInfo?: any
  ): Promise<void> {
    try {
      const html = EMAIL_TEMPLATES.ORDER_CONFIRMATION(userName, orderId, total, products, couponInfo);
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
  <title>Nova Mensagem de Contacto - CheLeVi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- LOGO -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
           alt="CheLeVi"
           style="width:180px; height:auto; opacity:0.95;" />
    </div>

    <!-- HEADER DARK -->
    <div style="
      background:linear-gradient(135deg,#12171f,#1b2433);
      padding:45px 35px;
      border-radius:20px 20px 0 0;
      text-align:center;
    ">
      <h1 style="color:#1e1e1e; margin:0; font-size:26px; font-weight:300; letter-spacing:1px;">
        Nova Mensagem de Contacto
      </h1>
      <p style="color:#1e1e1e; margin-top:10px; font-size:15px;">
        CheLeVi — Moda, Identidade e Estilo
      </p>
    </div>

    <!-- CONTENT CARD -->
    <div style="background:#ffffff; padding:35px; border-radius:0 0 20px 20px;">

      <h2 style="
        font-size:20px;
        color:#1e1e1e;
        margin:0 0 25px;
        font-weight:500;
        text-align:center;
      ">
        Detalhes da Mensagem
      </h2>

      <!-- FIELDS -->
      <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
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

      <!-- MESSAGE -->
      <div style="border-top:1px solid #eee; padding-top:18px;">
        <span style="color:#777; font-size:15px;">Mensagem:</span>

        <p style="color:#1e1e1e; margin-top:8px; font-size:15px; line-height:1.6;">
          ${message}
        </p>
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
