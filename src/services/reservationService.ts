import { emailService } from './emailService';
import { ownerNotificationService } from './ownerNotificationService';
import { whatsappService } from './whatsappService';
import { logger } from '../utils/logger';
import { formatPhoneForWhatsApp, validateWhatsAppNumber } from '../utils/phoneUtils';

export interface ReservationData {
  productId: number;
  productName: string;
  name: string;
  email: string;
  phone: string;
  quantity: number;
  country?: 'mocambique' | 'portugal';
}

export interface ReservationResponse {
  success: boolean;
  message?: string;
  reservationId?: number;
}

class ReservationService {
  // List of product IDs that are out of stock (can be moved to config later)
  private readonly OUT_OF_STOCK_IDS = [12]; // Add more IDs as needed

  /**
   * Check if a product is out of stock
   */
  isOutOfStock(productId: number): boolean {
    return this.OUT_OF_STOCK_IDS.includes(productId);
  }

  /**
   * Create a new reservation
   */
  async createReservation(data: ReservationData): Promise<ReservationResponse> {
    try {
      logger.userAction('Creating product reservation', { productId: data.productId });

      // Save reservation to Supabase via backend
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${backendUrl}/supabase/reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: data.productId,
            productName: data.productName,
            name: data.name,
            email: data.email,
            phone: data.phone,
            quantity: data.quantity,
            country: data.country || 'mocambique',
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to save reservation');
        }

        const result = await response.json();
        logger.userAction('Reservation saved to Supabase', { reservationId: result.reservationId });
      } catch (error) {
        logger.warn('Failed to save reservation to Supabase', { error });
        // Continue with notifications even if Supabase save fails
      }

      // Send notification to owner
      try {
        await ownerNotificationService.notifyNewReservation(
          data.productId,
          data.productName,
          data.name,
          data.email,
          data.phone,
          data.quantity,
          data.country || 'mocambique'
        );
      } catch (error) {
        logger.warn('Failed to send owner notification', { error });
      }

      // Send confirmation email to customer
      try {
        await emailService.sendEmail({
          to: data.email,
          subject: `Reserva Confirmada - ${data.productName}`,
          html: this.getReservationConfirmationEmail(data),
          type: 'reservation_confirmation'
        });
      } catch (error) {
        logger.warn('Failed to send confirmation email', { error });
      }

      // Send WhatsApp notification to customer
      if (data.phone && validateWhatsAppNumber(data.phone)) {
        try {
          const formattedPhone = formatPhoneForWhatsApp(data.phone);
          const message = `📦 *Reserva Confirmada!*\n\n` +
            `Olá ${data.name}! 👋\n\n` +
            `A sua reserva foi confirmada com sucesso:\n\n` +
            `🛍️ *Produto:* ${data.productName}\n` +
            `📊 *Quantidade:* ${data.quantity}\n` +
            `🌍 *País:* ${data.country === 'portugal' ? '🇵🇹 Portugal' : '🇲🇿 Moçambique'}\n\n` +
            `📋 *Próximos Passos:*\n` +
            `• Notificaremos quando o produto estiver disponível\n` +
            `• Enviaremos atualizações por WhatsApp e Email\n` +
            `• Entrega estimada após confirmação de disponibilidade\n\n` +
            `Obrigado por escolher a Chelevi! 💜`;
          
          await whatsappService.sendMessage({
            number: formattedPhone,
            text: message,
            delay: 1000,
            linkPreview: false,
          });
          
          logger.userAction('Reservation WhatsApp sent to customer', { 
            phone: formattedPhone, 
            productId: data.productId 
          });
        } catch (error) {
          logger.warn('Failed to send WhatsApp notification', { error, phone: data.phone });
        }
      } else if (data.phone) {
        logger.warn('Phone number format invalid for WhatsApp', { phone: data.phone });
      }

      logger.userAction('Reservation created successfully', { productId: data.productId });

      return {
        success: true,
        message: 'Reserva criada com sucesso!'
      };
    } catch (error) {
      logger.error('Error creating reservation', { error, productId: data.productId });
      return {
        success: false,
        message: 'Erro ao criar reserva. Tente novamente.'
      };
    }
  }

  /**
   * Get reservation confirmation email template
   */
  private getReservationConfirmationEmail(data: ReservationData): string {
    return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reserva Confirmada - CheLeVi</title>
</head>

<body style="margin:0; padding:0; background:#0e1117; font-family:'Segoe UI',sans-serif;">

  <div style="max-width:620px; margin:0 auto;">

    <!-- LOGO -->
    <div style="padding:45px 0 25px; text-align:center;">
      <img
        src="https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png"
        alt="CheLeVi"
        style="width:180px; height:auto; opacity:0.95;"
      />
    </div>

    <!-- HEADER -->
    <div style="
      background:linear-gradient(135deg,#12171f,#1b2433);
      padding:45px 35px;
      border-radius:20px 20px 0 0;
      text-align:center;
    ">
    <div style="color:#ffffff;">
  <h1 style=" color:#1e1e1e; margin:0; font-size:26px; font-weight:300; letter-spacing:1px;">
    Reserva Confirmada
  </h1>
  <p style=" color:#1e1e1e; margin-top:10px; font-size:15px;">
    CheLeVi — Moda, Estilo e Exclusividade
  </p>
</div>

    </div>

    <!-- CONTENT CARD -->
    <div style="background:#ffffff; padding:35px; border-radius:0 0 20px 20px;">

      <!-- ICON -->
      <div style="text-align:center; margin-bottom:25px;">
        <div style="
          width:80px;
          height:80px;
          background:#000;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          margin:0 auto 20px;
        ">
          <img src="https://chelevi.sparktechnology.cloud/chelevi/Logos/Monogram-bege-BLACK.png" alt="CheLeVi" style="width:100%; height:100%; object-fit:contain;">
        </div>

        <h2 style="color:#1e1e1e; margin:0 0 10px; font-size:22px; font-weight:500;">
          Reserva Confirmada!
        </h2>

        <p style="color:#7a7a7a; margin:0; font-size:15px;">
          Olá ${data.name}, recebemos a sua reserva com sucesso.
        </p>
      </div>

      <!-- RESERVATION DETAILS -->
      <h3 style="color:#1e1e1e; font-size:17px; margin:0 0 18px;">Detalhes da Reserva</h3>

      <div style="margin-bottom:12px;">
        <span style="color:#777; font-size:15px;">Produto:</span>
        <span style="color:#1e1e1e; font-weight:600; margin-left:10px;">
          ${data.productName}
        </span>
      </div>

      <div style="margin-bottom:12px;">
        <span style="color:#777; font-size:15px;">Quantidade:</span>
        <span style="color:#1e1e1e; font-weight:600; margin-left:10px;">
          ${data.quantity}
        </span>
      </div>

      <div style="margin-bottom:12px;">
        <span style="color:#777; font-size:15px;">País:</span>
        <span style="color:#1e1e1e; font-weight:600; margin-left:10px;">
          ${data.country === 'portugal' ? '🇵🇹 Portugal' : '🇲🇿 Moçambique'}
        </span>
      </div>

      <div style="margin-bottom:12px;">
        <span style="color:#777; font-size:15px;">Contacto:</span>
        <span style="color:#1e1e1e; font-weight:600; margin-left:10px;">
          ${data.phone}
        </span>
      </div>

      <!-- WARNING -->
      <div style="
        background:#fff8e6;
        border-left:4px solid #f7c948;
        padding:18px;
        border-radius:10px;
        margin-top:25px;
      ">
        <p style="color:#8a6c22; margin:0; font-size:14px; line-height:1.6;">
          <strong>Atenção:</strong> Assim que o produto estiver disponível,
          notificaremos por email e WhatsApp.  
          Mantenha-se atento — a CheLeVi entrará em contacto consigo.
        </p>
      </div>

      <p style="text-align:center; margin-top:30px; color:#7a7a7a; font-size:14px;">
        Obrigado por confiar na CheLeVi. ✨  
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

    `;
  }
}

export const reservationService = new ReservationService();

