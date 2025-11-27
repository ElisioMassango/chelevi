import { useState } from 'react';
import { apiService } from '../services/api';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';
import { emailService } from '../services/emailService';
import { whatsappService } from '../services/whatsappService';
import { ownerNotificationService } from '../services/ownerNotificationService';
import { formatPhoneForWhatsApp, validateWhatsAppNumber } from '../utils/phoneUtils';

export function useNewsletter() {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = async (email: string, phoneNumber?: string) => {
    try {
      setIsSubscribing(true);
      logger.userAction('Newsletter subscription attempt', { email, phoneNumber });
      
      // Subscribe via email API (if email provided)
      let response;
      if (email) {
        response = await apiService.subscribeNewsletter(email);
      } else {
        // If only phone number, create a mock success response
        response = { status: 1, message: 'Inscrição realizada com sucesso!' };
      }
      
      if (response.status === 1) {
        toastService.success('Inscrição na newsletter realizada com sucesso!');
        logger.userAction('Newsletter subscription successful', { email, phoneNumber });
        
        // Send welcome email to subscriber (if email provided)
        if (email) {
          try {
            await emailService.sendNewsletterWelcome(email);
            logger.userAction('Newsletter welcome email sent', { email });
          } catch (error) {
            logger.error('Failed to send newsletter welcome email', { error, email });
          }
        }
        
        // Send welcome WhatsApp message to subscriber (if phone number provided)
        if (phoneNumber && validateWhatsAppNumber(phoneNumber)) {
          try {
            const formattedPhone = formatPhoneForWhatsApp(phoneNumber);
            await whatsappService.sendNewsletterWelcome(email || 'Newsletter', formattedPhone);
            logger.userAction('Newsletter welcome WhatsApp sent', { phoneNumber });
          } catch (error) {
            logger.error('Failed to send newsletter welcome WhatsApp', { error, phoneNumber });
          }
        }
        
        // Notify owners about new subscription
        try {
          await ownerNotificationService.notifyNewsletterSubscription(email || phoneNumber || '');
          logger.userAction('Newsletter subscription notification sent to owners', { email, phoneNumber });
        } catch (error) {
          logger.error('Failed to notify owners about newsletter subscription', { error, email, phoneNumber });
        }
        
        return { success: true, message: response.message };
      } else {
        toastService.error(response.message);
        logger.warn('Newsletter subscription failed', { email, phoneNumber, error: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = 'Falha ao inscrever na newsletter. Tente novamente.';
      toastService.error(errorMessage);
      logger.error('Newsletter subscription error', { email, phoneNumber, error });
      return { success: false, message: errorMessage };
    } finally {
      setIsSubscribing(false);
    }
  };

  return {
    subscribe,
    isSubscribing,
  };
}
