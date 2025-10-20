// WhatsApp Proxy for Chelevi
// This proxy handles WhatsApp API calls securely

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
    const { path, ...body } = (req.body || {});
    
    // Support both styles:
    // 1) POST /api/whatsapp-proxy with { path: '/message/sendText/INSTANCE', ... }
    // 2) POST /api/whatsapp-proxy/message/sendText/INSTANCE with body {...}
    let resolvedPath = path;
    if (!resolvedPath) {
      const originalUrl = req.url || '';
      // Remove the prefix '/api/whatsapp-proxy'
      resolvedPath = originalUrl.replace(/^\/?api\/whatsapp-proxy/, '');
      if (!resolvedPath.startsWith('/')) {
        resolvedPath = `/${resolvedPath}`;
      }
    }
    
    // Validate required fields
    if (!resolvedPath || resolvedPath === '/' ) {
      return res.status(400).json({ error: 'Path is required' });
    }

    // Get API configuration from environment variables
    const evolutionApiUrl = process.env.EVOLUTION_API_URL || 'http://31.97.47.106:8080';
    const evolutionApiKey = process.env.EVOLUTION_API_KEY || 'F4109AF2899E-4319-B037-ED42DDDE93E9';
    const evolutionInstance = process.env.EVOLUTION_INSTANCE || 'Chelevi';

    // Construct the full URL
    const fullUrl = `${evolutionApiUrl}${resolvedPath}`;

    console.log('WhatsApp Proxy Request:', {
      url: fullUrl,
      path: resolvedPath,
      body: body
    });

    // Make request to Evolution API
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': evolutionApiKey,
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    console.log('WhatsApp Proxy Response:', {
      status: response.status,
      data: data
    });

    // Return the response
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('WhatsApp Proxy Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
