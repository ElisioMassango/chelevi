import { apiService } from './api';
import { emailService } from './emailService';
import { ownerNotificationService } from './ownerNotificationService';
import { whatsappService } from './whatsappService';
import { logger } from '../utils/logger';

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
  private readonly OUT_OF_STOCK_IDS = [9]; // Add more IDs as needed

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

      // Send notification to owner
      try {
        await ownerNotificationService.notifyNewReservation(
          data.productId,
          data.productName,
          data.name,
          data.email,
          data.phone,
          data.quantity
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

      // Send WhatsApp notification to customer (optional)
      try {
        const message = `Olá ${data.name}! Sua reserva para ${data.productName} (Quantidade: ${data.quantity}) foi confirmada. Você será notificado(a) assim que o produto estiver disponível. Obrigado!`;
        await whatsappService.sendMessage({
          number: data.phone,
          text: message,
          delay: 1000,
          linkPreview: false,
        });
      } catch (error) {
        logger.warn('Failed to send WhatsApp notification', { error });
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
        <title>Reserva Confirmada - Chelevi</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #8B4E6F 0%, #A5697A 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300;">Chelevi</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Reserva Confirmada</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B4E6F, #A5697A); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #ffffff; font-size: 36px;">✅</span>
              </div>
              <h2 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 24px;">Reserva Confirmada!</h2>
              <p style="color: #7f8c8d; margin: 0; font-size: 16px;">Olá ${data.name}, sua reserva foi confirmada com sucesso!</p>
            </div>
            
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">Detalhes da Reserva:</h3>
              <div style="margin-bottom: 10px;">
                <span style="color: #7f8c8d;">Produto:</span>
                <span style="color: #2c3e50; font-weight: 600; margin-left: 10px;">${data.productName}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="color: #7f8c8d;">Quantidade:</span>
                <span style="color: #2c3e50; font-weight: 600; margin-left: 10px;">${data.quantity}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span style="color: #7f8c8d;">Contato:</span>
                <span style="color: #2c3e50; font-weight: 600; margin-left: 10px;">${data.phone}</span>
              </div>
            </div>
            
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
              <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.5;">
                <strong>Importante:</strong> Você será notificado(a) assim que o produto estiver disponível. 
                Fique atento(a) ao seu email e WhatsApp!
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #7f8c8d; margin: 0; font-size: 14px;">
                Obrigado por escolher Chelevi! 💜
              </p>
            </div>
          </div>
          
          <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 14px;">
              © 2025 Chelevi. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const reservationService = new ReservationService();

