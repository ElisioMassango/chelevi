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
    const { path, ...body } = req.body;
    
    // Validate required fields
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    // Get API configuration from environment variables
    const evolutionApiUrl = 'http://31.97.47.106:8080';
    const evolutionApiKey = 'F4109AF2899E-4319-B037-ED42DDDE93E9';
    const evolutionInstance = 'Chelevi';

    // Construct the full URL
    const fullUrl = `${evolutionApiUrl}${path}`;

    console.log('WhatsApp Proxy Request:', {
      url: fullUrl,
      path: path,
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
