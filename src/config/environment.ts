// Environment Configuration for Chelevi
// Secure environment variable management

interface EnvironmentConfig {
  // API Configuration
  api: {
    baseUrl: string;
    storeSlug: string;
    themeId: string;
  };
  
  // Backend API Configuration
  backend: {
    baseUrl: string;
  };
  
  // WhatsApp Configuration
  whatsapp: {
    baseUrl: string;
    apiKey: string;
    instance: string;
  };
  
  // Email Configuration
  email: {
    baseUrl: string;
    apiKey: string;
  };
  
  // M-Pesa Configuration
  mpesa: {
    baseUrl: string;
  };
  
  // App Configuration
  app: {
    name: string;
    version: string;
    environment: string;
  };
  
  // Launch Countdown Configuration
  countdown: {
    enabled: boolean;
    launchDate: string;
    launchTime: string;
    timezone: string;
  };
}

// Secure environment variable getter
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
    return '';
  }
  
  return value || defaultValue || '';
}

// Environment configuration
export const env: EnvironmentConfig = {
  // API Configuration
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'https://dashboard.sparktechnology.cloud/api'),
    storeSlug: getEnvVar('VITE_STORE_SLUG', 'chelevi'),
    themeId: getEnvVar('VITE_THEME_ID', 'stylique'),
  },
  
  // Backend API Configuration
  backend: {
    baseUrl: getEnvVar('VITE_BACKEND_API_URL', 'http://localhost:3001/api'),
  },
  
  // WhatsApp Configuration
  whatsapp: {
    baseUrl: getEnvVar('VITE_WHATSAPP_API_URL', 'http://localhost:3001/api/whatsapp'),
    apiKey: getEnvVar('VITE_WHATSAPP_API_KEY', 'F4109AF2899E-4319-B037-ED42DDDE93E9'),
    instance: getEnvVar('VITE_WHATSAPP_INSTANCE', 'Chelevi'),
  },
  
  // Email Configuration
  email: {
    baseUrl: getEnvVar('VITE_EMAIL_API_URL', 'http://localhost:3001/api/email'),
    apiKey: getEnvVar('VITE_EMAIL_API_KEY', 'your-email-api-key'),
  },
  
  // M-Pesa Configuration
  mpesa: {
    baseUrl: getEnvVar('VITE_MPESA_API_URL', 'http://localhost:3001/api/mpesa'),
  },
  
  // App Configuration
  app: {
    name: getEnvVar('VITE_APP_NAME', 'Chelevi'),
    version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    environment: getEnvVar('VITE_APP_ENV', 'development'),
  },
  
  // Launch Countdown Configuration
  countdown: {
    enabled: getEnvVar('VITE_ENABLE_COUNTDOWN', 'true').toLowerCase() === 'true',
    launchDate: getEnvVar('VITE_LAUNCH_DATE', '2025-11-28'),
    launchTime: getEnvVar('VITE_LAUNCH_TIME', '18:00'),
    timezone: getEnvVar('VITE_LAUNCH_TIMEZONE', 'Africa/Maputo'),
  },
};

// Environment validation
export function validateEnvironment(): boolean {
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_STORE_SLUG',
    'VITE_THEME_ID',
  ];
  
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }
  
  return true;
}

// Development environment check
export const isDevelopment = env.app.environment === 'development';
export const isProduction = env.app.environment === 'production';

// Log environment info (only in development)
if (isDevelopment) {
  console.log('Environment Configuration:', {
    app: env.app,
    api: {
      baseUrl: env.api.baseUrl,
      storeSlug: env.api.storeSlug,
      themeId: env.api.themeId,
    },
    backend: {
      baseUrl: env.backend.baseUrl,
    },
    whatsapp: {
      baseUrl: env.whatsapp.baseUrl,
      instance: env.whatsapp.instance,
    },
    email: {
      baseUrl: env.email.baseUrl,
    },
    mpesa: {
      baseUrl: env.mpesa.baseUrl,
    },
  });
  
  // Warn if still using proxy URLs
  if (env.whatsapp.baseUrl.includes('whatsapp-proxy') || env.email.baseUrl.includes('email-proxy')) {
    console.warn('⚠️ WARNING: Services are still configured to use proxy URLs!');
    console.warn('Please update your .env file with:');
    console.warn('VITE_WHATSAPP_API_URL=http://localhost:3001/api/whatsapp');
    console.warn('VITE_EMAIL_API_URL=http://localhost:3001/api/email');
  }
}
