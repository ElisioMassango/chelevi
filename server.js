// Dev server for API routes parity with Naturelle
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// CORS for dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

// WhatsApp Proxy (dev)
app.all('/api/whatsapp-proxy/*', async (req, res) => {
  const EVOLUTION_API_BASE = process.env.EVOLUTION_API_URL || 'http://31.97.47.106:8080';
  const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'F4109AF2899E-4319-B037-ED42DDDE93E9';

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace('/api/whatsapp-proxy', '');
    const target = `${EVOLUTION_API_BASE}${path}${url.search}`;

    console.log('🔄 Proxying request to:', target);

    const response = await fetch(target, {
      method: req.method,
      headers: { 'Content-Type': 'application/json', 'apikey': EVOLUTION_API_KEY },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    console.log('✅ Proxy response:', response.status, response.statusText);
    res.status(response.status).send(data);
  } catch (err) {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// Email Proxy (dev simulator)
app.all('/api/email-proxy', async (req, res) => {
  try {
    console.log('📧 Email proxy (dev) payload:', req.body);
    res.json({ success: true, simulated: true, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('❌ Email proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), proxy: 'active' });
});

app.listen(PORT, () => {
  console.log(`🚀 Dev server on ${PORT}`);
  console.log(`📡 WhatsApp Proxy: http://localhost:${PORT}/api/whatsapp-proxy`);
  console.log(`📧 Email Proxy:    http://localhost:${PORT}/api/email-proxy`);
  console.log(`🏥 Health:         http://localhost:${PORT}/api/health`);
});


