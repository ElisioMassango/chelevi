// Environment Configuration for Chelevi
// Secure environment variable management

interface EnvironmentConfig {
  // API Configuration
  api: {
    baseUrl: string;
    storeSlug: string;
    themeId: string;
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
  
  // App Configuration
  app: {
    name: string;
    version: string;
    environment: string;
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
  
  // WhatsApp Configuration
  whatsapp: {
    baseUrl: getEnvVar('VITE_WHATSAPP_API_URL', '/api/whatsapp-proxy'),
    apiKey: getEnvVar('VITE_WHATSAPP_API_KEY', 'F4109AF2899E-4319-B037-ED42DDDE93E9'),
    instance: getEnvVar('VITE_WHATSAPP_INSTANCE', 'Chelevi'),
  },
  
  // Email Configuration
  email: {
    baseUrl: getEnvVar('VITE_EMAIL_API_URL', '/api/email-proxy'),
    apiKey: getEnvVar('VITE_EMAIL_API_KEY', 'your-email-api-key'),
  },
  
  // App Configuration
  app: {
    name: getEnvVar('VITE_APP_NAME', 'Chelevi'),
    version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    environment: getEnvVar('VITE_APP_ENV', 'development'),
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
    whatsapp: {
      baseUrl: env.whatsapp.baseUrl,
      instance: env.whatsapp.instance,
    },
    email: {
      baseUrl: env.email.baseUrl,
    },
  });
}
