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

// Note: Proxies have been removed. All API calls now go through the backend API.
// Backend API should be running on http://localhost:3001

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), proxy: 'active' });
});

app.listen(PORT, () => {
  console.log(`🚀 Dev server on ${PORT}`);
  console.log(`📝 Note: API proxies have been removed.`);
  console.log(`📡 Backend API should be running on http://localhost:3001`);
  console.log(`🏥 Health:         http://localhost:${PORT}/api/health`);
});


