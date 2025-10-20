# Guia de Deploy na Vercel - Chelevi

## 🚀 **Configuração de Deploy na Vercel**

### **1. Configurar Variáveis de Ambiente na Vercel**

Após fazer o deploy, você precisa configurar as variáveis de ambiente no dashboard da Vercel:

#### **Acesse o Dashboard da Vercel:**
1. Vá para [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto `chelevi`
4. Vá para **Settings** → **Environment Variables**

#### **Adicione as seguintes variáveis:**

##### **Variáveis do Frontend (VITE_):**
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

##### **Variáveis do Backend (para os proxies):**
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

### **2. Configuração Passo a Passo**

#### **Passo 1: Acessar Environment Variables**
1. No dashboard da Vercel, clique no seu projeto `chelevi`
2. Clique em **Settings** (no menu lateral)
3. Clique em **Environment Variables**

#### **Passo 2: Adicionar Variáveis**
Para cada variável:
1. Clique em **Add New**
2. Digite o **Name** (ex: `VITE_API_BASE_URL`)
3. Digite o **Value** (ex: `https://dashboard.sparktechnology.cloud/api`)
4. Selecione **Production**, **Preview** e **Development**
5. Clique em **Save**

#### **Passo 3: Redeploy**
Após adicionar todas as variáveis:
1. Vá para **Deployments**
2. Clique nos três pontos do último deployment
3. Clique em **Redeploy**

### **3. Verificação das Variáveis**

#### **Para verificar se as variáveis estão funcionando:**
1. Acesse sua aplicação deployada
2. Abra o **Developer Tools** (F12)
3. Vá para **Console**
4. Verifique se não há erros relacionados a variáveis de ambiente

### **4. Troubleshooting**

#### **Erro: "Environment Variable references Secret"**
- ✅ **Solução:** Removemos as referências a secrets do `vercel.json`
- ✅ **Ação:** Use variáveis de ambiente normais, não secrets

#### **Erro: "Variable not found"**
- ✅ **Solução:** Verifique se a variável foi adicionada corretamente
- ✅ **Ação:** Certifique-se de que o nome está exato (case-sensitive)

#### **Erro: "CORS"**
- ✅ **Solução:** Os proxies já têm CORS configurado
- ✅ **Ação:** Verifique se as URLs estão corretas

### **5. Estrutura Final do Projeto**

```
chelevi/
├── api/
│   ├── whatsapp-proxy.js    # Proxy para WhatsApp
│   └── email-proxy.js       # Proxy para Email
├── src/
│   ├── config/
│   │   └── environment.ts   # Configuração de ambiente
│   ├── services/
│   │   ├── whatsappService.ts
│   │   ├── emailService.ts
│   │   └── ownerNotificationService.ts
│   ├── components/
│   │   └── PhoneInput.tsx   # Validação de telefone
│   ├── utils/
│   │   └── phoneUtils.ts    # Utilitários de telefone
│   └── hooks/
│       └── useScrollToTop.ts # Scroll automático
├── vercel.json              # Configuração Vercel
└── env.example.txt          # Exemplo de variáveis
```

### **6. URLs dos Proxies**

Após o deploy, os proxies estarão disponíveis em:
- **WhatsApp Proxy:** `https://seu-dominio.vercel.app/api/whatsapp-proxy`
- **Email Proxy:** `https://seu-dominio.vercel.app/api/email-proxy`

### **7. Teste das Funcionalidades**

#### **Teste 1: Validação de Telefone**
1. Acesse `/checkout`
2. Digite um número de telefone
3. Verifique se a validação funciona

#### **Teste 2: WhatsApp Notifications**
1. Crie uma conta
2. Verifique se recebe notificação WhatsApp

#### **Teste 3: Email Notifications**
1. Faça um pedido
2. Verifique se recebe email de confirmação

#### **Teste 4: Scroll Automático**
1. Navegue entre páginas
2. Verifique se scroll vai ao topo

### **8. Monitoramento**

#### **Logs da Vercel:**
1. Vá para **Functions** no dashboard
2. Clique em `api/whatsapp-proxy` ou `api/email-proxy`
3. Veja os logs em tempo real

#### **Métricas:**
- **Performance:** Verifique se os proxies respondem rapidamente
- **Errors:** Monitore erros nos logs
- **Usage:** Acompanhe o uso das funções

### **9. Configuração de Produção**

#### **Domínio Personalizado:**
1. Vá para **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

#### **SSL/HTTPS:**
- ✅ **Automático:** A Vercel fornece SSL automaticamente
- ✅ **Verificação:** Certifique-se de que está usando HTTPS

### **10. Checklist Final**

- ✅ **Variáveis de ambiente** configuradas
- ✅ **Proxies** funcionando
- ✅ **Validações** de telefone ativas
- ✅ **Scroll automático** funcionando
- ✅ **Notificações** WhatsApp/Email ativas
- ✅ **Deploy** sem erros
- ✅ **Domínio** configurado (opcional)

### **🎉 Deploy Completo!**

Após seguir todos os passos, seu projeto Chelevi estará funcionando perfeitamente na Vercel com todas as funcionalidades implementadas!

### **📞 Suporte**

Se encontrar problemas:
1. Verifique os logs da Vercel
2. Confirme se todas as variáveis estão configuradas
3. Teste os proxies individualmente
4. Verifique se o Evolution API está funcionando
