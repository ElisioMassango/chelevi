// M-Pesa Service for Chelevi
import { logger } from '../utils/logger';
import { env } from '../config/environment';

class MpesaService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.mpesa.baseUrl;
  }

  /**
   * Process an M-Pesa payment
   * @param customerNumber - Customer phone number (e.g., "845376645")
   * @param amount - Payment amount (e.g., "1000")
   * @param reference - Payment reference (e.g., "ORDER-123")
   * @param transaction - Transaction ID (e.g., "TXN-456")
   * @returns Promise with payment result
   */
  async processPayment(
    customerNumber: string,
    amount: string | number,
    reference: string,
    transaction: string
  ): Promise<any> {
    try {
      // Convert amount to number if it's a string
      const amountNumber = typeof amount === 'string' ? parseFloat(amount) : amount;

      console.log('💳 Processing M-Pesa payment:', {
        customerNumber,
        amount: amountNumber,
        reference,
        transaction
      });

      const response = await fetch(`${this.baseUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerNumber,
          amount: 5, // Send as number, not string
          reference,
          transaction,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ M-Pesa payment processed', { status: response.status, result });
      logger.userAction('M-Pesa payment processed successfully', { 
        customerNumber, 
        amount,
        reference
      });
      
      return result;
    } catch (error) {
      logger.error('Failed to process M-Pesa payment', { 
        error, 
        customerNumber,
        amount,
        reference
      });
      throw error;
    }
  }
}

export const mpesaService = new MpesaService();



