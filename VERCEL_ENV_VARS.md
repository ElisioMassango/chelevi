# Variáveis de Ambiente para Vercel - Chelevi

## 🔧 **Configuração das Variáveis de Ambiente na Vercel**

### **📋 Lista Completa de Variáveis**

Copie e cole estas variáveis no dashboard da Vercel:

#### **1. Variáveis do Frontend (VITE_)**

```
VITE_API_BASE_URL
https://dashboard.sparktechnology.cloud/api

VITE_STORE_SLUG
chelevi

VITE_THEME_ID
stylique

VITE_WHATSAPP_API_URL
/api/whatsapp-proxy

VITE_WHATSAPP_API_KEY
F4109AF2899E-4319-B037-ED42DDDE93E9

VITE_WHATSAPP_INSTANCE
Chelevi

VITE_EMAIL_API_URL
/api/email-proxy

VITE_EMAIL_API_KEY
your-email-api-key

VITE_APP_NAME
Chelevi

VITE_APP_VERSION
1.0.0

VITE_APP_ENV
production
```

#### **2. Variáveis do Backend (para os proxies)**

```
EVOLUTION_API_URL
http://31.97.47.106:8080

EVOLUTION_API_KEY
F4109AF2899E-4319-B037-ED42DDDE93E9

EVOLUTION_INSTANCE
Chelevi

SMTP_HOST
smtp.gmail.com

SMTP_PORT
587

SMTP_USER
your-email@gmail.com

SMTP_PASS
your-app-password

SMTP_FROM
Chelevi <noreply@chelevi.com>
```

### **🚀 Passos para Configurar na Vercel**

#### **Passo 1: Acessar o Dashboard**
1. Vá para [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto `chelevi`

#### **Passo 2: Ir para Environment Variables**
1. Clique em **Settings** (menu lateral)
2. Clique em **Environment Variables**

#### **Passo 3: Adicionar Variáveis**
Para cada variável da lista acima:
1. Clique em **Add New**
2. Cole o **Name** (ex: `VITE_API_BASE_URL`)
3. Cole o **Value** (ex: `https://dashboard.sparktechnology.cloud/api`)
4. Selecione **Production**, **Preview** e **Development**
5. Clique em **Save**

#### **Passo 4: Redeploy**
1. Vá para **Deployments**
2. Clique nos três pontos do último deployment
3. Clique em **Redeploy**

### **✅ Verificação**

Após configurar todas as variáveis e fazer redeploy:
1. Acesse sua aplicação
2. Abra Developer Tools (F12)
3. Verifique se não há erros no console
4. Teste as funcionalidades de WhatsApp e Email

### **🔍 Troubleshooting**

#### **Erro: "Environment Variable references Secret"**
- ✅ **Corrigido:** Removemos as referências a secrets do `vercel.json`
- ✅ **Solução:** Use variáveis de ambiente normais

#### **Erro: "Variable not found"**
- ✅ **Verifique:** Se o nome da variável está exato
- ✅ **Confirme:** Se foi adicionada para Production, Preview e Development

#### **Erro: "CORS"**
- ✅ **Verificado:** Os proxies têm CORS configurado
- ✅ **Solução:** Verifique se as URLs estão corretas

### **📊 Monitoramento**

#### **Logs da Vercel:**
1. Vá para **Functions** no dashboard
2. Clique em `api/whatsapp-proxy` ou `api/email-proxy`
3. Veja os logs em tempo real

#### **Métricas:**
- **Performance:** Verifique se os proxies respondem rapidamente
- **Errors:** Monitore erros nos logs
- **Usage:** Acompanhe o uso das funções

### **🎉 Deploy Completo!**

Após seguir todos os passos, seu projeto Chelevi estará funcionando perfeitamente na Vercel!
