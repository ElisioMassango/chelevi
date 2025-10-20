import { useState } from 'react';
import { apiService } from '../services/api';
import { toastService } from '../utils/toast';
import { logger } from '../utils/logger';
import { emailService } from '../services/emailService';
import { whatsappService } from '../services/whatsappService';
import { ownerNotificationService } from '../services/ownerNotificationService';

export function useNewsletter() {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = async (email: string) => {
    try {
      setIsSubscribing(true);
      logger.userAction('Newsletter subscription attempt', { email });
      
      const response = await apiService.subscribeNewsletter(email);
      
      if (response.status === 1) {
        toastService.success('Inscrição na newsletter realizada com sucesso!');
        logger.userAction('Newsletter subscription successful', { email });
        
        // Send welcome email to subscriber
        try {
          await emailService.sendNewsletterWelcome(email);
          logger.userAction('Newsletter welcome email sent', { email });
        } catch (error) {
          logger.error('Failed to send newsletter welcome email', { error, email });
        }
        
        // Notify owners about new subscription
        try {
          await ownerNotificationService.notifyNewsletterSubscription(email);
          logger.userAction('Newsletter subscription notification sent to owners', { email });
        } catch (error) {
          logger.error('Failed to notify owners about newsletter subscription', { error, email });
        }
        
        return { success: true, message: response.message };
      } else {
        toastService.error(response.message);
        logger.warn('Newsletter subscription failed', { email, error: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = 'Falha ao inscrever na newsletter. Tente novamente.';
      toastService.error(errorMessage);
      logger.error('Newsletter subscription error', { email, error });
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
