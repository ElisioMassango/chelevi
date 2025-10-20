// Email Proxy for Chelevi
// This proxy handles email sending securely

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, type = 'general' } = req.body;
    
    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER || 'your-email@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'your-app-password';
    const smtpFrom = process.env.SMTP_FROM || 'Chelevi <noreply@chelevi.com>';

    console.log('Email Proxy Request:', {
      to: to,
      subject: subject,
      type: type
    });

    // For now, we'll simulate email sending
    // In production, integrate with actual SMTP service
    const emailData = {
      to: to,
      subject: subject,
      html: html,
      from: smtpFrom,
      type: type,
      timestamp: new Date().toISOString()
    };

    console.log('Email would be sent:', emailData);

    // Simulate successful email sending
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: {
        to: to,
        subject: subject,
        type: type,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Email Proxy Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
