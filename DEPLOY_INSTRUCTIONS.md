# Instruções de Deploy - Chelevi

## 🚨 **Problema Atual:**
```
An unexpected error happened when running this build. We have been notified of the problem.
```

## ✅ **Soluções Implementadas:**

### **1. Configurações Corrigidas:**
- ✅ **package.json** atualizado com nome correto
- ✅ **vercel.json** simplificado
- ✅ **vite.config.ts** otimizado
- ✅ **.vercelignore** criado

### **2. Arquivos de API Corrigidos:**
- ✅ **whatsapp-proxy.js** com variáveis de ambiente
- ✅ **email-proxy.js** com configuração adequada

## 🚀 **Passos para Deploy:**

### **Passo 1: Fazer Commit**
```bash
git add .
git commit -m "Fix Vercel deployment - optimized configuration"
git push origin main
```

### **Passo 2: Configurar Variáveis na Vercel**

#### **Acesse o Dashboard:**
1. Vá para [vercel.com](https://vercel.com)
2. Selecione o projeto `chelevi`
3. Vá para **Settings** → **Environment Variables**

#### **Adicione estas variáveis:**

**Frontend (VITE_):**
```
VITE_API_BASE_URL = https://dashboard.sparktechnology.cloud/api
VITE_STORE_SLUG = chelevi
VITE_THEME_ID = stylique
VITE_WHATSAPP_API_URL = /api/whatsapp-proxy
VITE_WHATSAPP_API_KEY = F4109AF2899E-4319-B037-ED42DDDE93E9
VITE_WHATSAPP_INSTANCE = Chelevi
VITE_EMAIL_API_URL = /api/email-proxy
VITE_EMAIL_API_KEY = your-email-api-key
VITE_APP_NAME = Chelevi
VITE_APP_VERSION = 1.0.0
VITE_APP_ENV = production
```

**Backend (para proxies):**
```
EVOLUTION_API_URL = http://31.97.47.106:8080
EVOLUTION_API_KEY = F4109AF2899E-4319-B037-ED42DDDE93E9
EVOLUTION_INSTANCE = Chelevi
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
SMTP_FROM = Chelevi <noreply@chelevi.com>
```

### **Passo 3: Redeploy**
1. Vá para **Deployments**
2. Clique nos três pontos do último deployment
3. Clique em **Redeploy**

### **Passo 4: Verificar**
1. Acesse **Functions** no dashboard
2. Verifique se `api/whatsapp-proxy` e `api/email-proxy` estão ativas
3. Teste a aplicação

## 🔧 **Configurações Implementadas:**

### **package.json:**
```json
{
  "name": "chelevi",
  "version": "1.0.0",
  "scripts": {
    "vercel-build": "vite build"
  }
}
```

### **vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/whatsapp-proxy.js": {
      "maxDuration": 30
    },
    "api/email-proxy.js": {
      "maxDuration": 30
    }
  }
}
```

### **vite.config.ts:**
```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    }
  }
});
```

## 🎯 **Resultado Esperado:**

Após seguir todos os passos:
- ✅ Build será concluído com sucesso
- ✅ Deploy será realizado sem erros
- ✅ Proxies funcionarão corretamente
- ✅ Aplicação estará acessível
- ✅ Todas as funcionalidades funcionarão

## 🔍 **Se o Problema Persistir:**

### **1. Verificar Logs:**
- Acesse **Functions** no dashboard
- Verifique logs de `api/whatsapp-proxy` e `api/email-proxy`
- Procure por erros específicos

### **2. Verificar Build Local:**
```bash
npm run build
```
- Deve completar sem erros
- Verifique se a pasta `dist` foi criada

### **3. Verificar Variáveis:**
- Confirme se todas as variáveis estão configuradas
- Verifique se os nomes estão exatos

### **4. Contatar Suporte:**
- Se o problema persistir, contate o suporte da Vercel
- Forneça os logs específicos do erro

## 🎉 **Deploy Deve Funcionar Agora!**

Todas as configurações foram otimizadas para resolver o problema de deploy na Vercel.
