// Newsletter Service for Admin
import { env } from '../config/environment';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at?: string;
  source: string;
  subscribed_ip?: string;
  last_email_sent_at?: string;
  total_emails_received: number;
  total_emails_opened: number;
  total_emails_clicked: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  html_content?: string;
  sent_at?: string;
  total_sent: number;
  total_failed: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSendResult {
  success: boolean;
  message: string;
  campaignId?: string;
  sent: number;
  failed: number;
  total: number;
  errors?: Array<{ email: string; error: string }>;
}

class NewsletterService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.backend.baseUrl || 'http://localhost:3001/api';
  }

  /**
   * Get all active newsletter subscribers
   */
  async getSubscribers(options?: { limit?: number; offset?: number }): Promise<NewsletterSubscriber[]> {
    try {
      const params = new URLSearchParams();
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.offset) params.append('offset', options.offset.toString());

      const url = `${this.baseUrl}/supabase/newsletter/subscribers${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.subscribers || [];
      } else {
        throw new Error(data.error || 'Failed to get subscribers');
      }
    } catch (error) {
      console.error('Error getting newsletter subscribers:', error);
      throw error;
    }
  }

  /**
   * Send newsletter to all active subscribers
   */
  async sendNewsletter(data: {
    subject: string;
    content: string;
    htmlContent?: string;
  }): Promise<NewsletterSendResult> {
    try {
      const response = await fetch(`${this.baseUrl}/supabase/newsletter/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: data.subject,
          content: data.content,
          htmlContent: data.htmlContent || data.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          message: result.message,
          campaignId: result.campaignId,
          sent: result.sent,
          failed: result.failed,
          total: result.total,
          errors: result.errors,
        };
      } else {
        throw new Error(result.error || 'Failed to send newsletter');
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      throw error;
    }
  }
}

export const newsletterService = new NewsletterService();

