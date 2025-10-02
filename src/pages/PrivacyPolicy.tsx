import React from 'react';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-xl text-text-secondary">
            Última atualização: Janeiro de 2024
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Eye className="text-blue-600" size={24} />
              Introdução
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              A CheLevi ("nós", "nosso" ou "empresa") está comprometida em proteger e respeitar sua privacidade. 
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações 
              quando você visita nosso site ou usa os nossos serviços.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Ao usar os nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Users className="text-green-600" size={24} />
              Informações que Coletamos
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Informações Pessoais</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone</li>
                  <li>Endereço de entrega</li>
                  <li>Informações de pagamento (processadas de forma segura)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Informações de Uso</h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e versão</li>
                  <li>Páginas visitadas no nosso site</li>
                  <li>Tempo gasto nas páginas</li>
                  <li>Dados de cookies e tecnologias similares</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Lock className="text-purple-600" size={24} />
              Como Usamos Suas Informações
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Processamento de Pedidos</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Enviar confirmações e atualizações</li>
                  <li>Gerir devoluções e reembolsos</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Comunicação</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>Responder às suas consultas</li>
                  <li>Enviar atualizações importantes</li>
                  <li>Marketing (com o seu consentimento)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Melhoria do Serviço</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>Analisar uso do site</li>
                  <li>Personalizar experiência</li>
                  <li>Desenvolver novos recursos</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Segurança</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                  <li>Prevenir fraudes</li>
                  <li>Proteger nossos sistemas</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Proteção de Dados</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-text-secondary leading-relaxed mb-4">
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Criptografia SSL/TLS para transmissão de dados</li>
                <li>Armazenamento seguro em servidores protegidos</li>
                <li>Acesso limitado apenas a funcionários autorizados</li>
                <li>Monitoramento regular de segurança</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Seus Direitos</h2>
            <p className="text-text-secondary mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Acesso</h4>
                <p className="text-sm text-text-secondary">
                  Solicitar informações sobre o tratamento de seus dados
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Correção</h4>
                <p className="text-sm text-text-secondary">
                  Corrigir dados incompletos, inexatos ou desatualizados
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Eliminação</h4>
                <p className="text-sm text-text-secondary">
                  Solicitar a exclusão de dados desnecessários ou excessivos
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Portabilidade</h4>
                <p className="text-sm text-text-secondary">
                  Solicitar a portabilidade de dados a outro fornecedor
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Usamos cookies e tecnologias similares para melhorar sua experiência em nosso site. 
              Os cookies nos ajudam a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-4">
              <li>Lembrar suas preferências</li>
              <li>Manter você logado</li>
              <li>Analisar como você usa nosso site</li>
              <li>Personalizar conteúdo e anúncios</li>
            </ul>
            <p className="text-text-secondary">
              Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Mail className="text-orange-600" size={24} />
              Entre em Contato
            </h2>
            <p className="text-text-secondary mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer seus direitos, 
              entre em contato conosco:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-text-secondary">info@chelevi.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-text-secondary">+258 85 2232423</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
              <h2 className="text-2xl font-bold mb-4">Atualizações desta Política</h2>
            <p className="text-text-secondary leading-relaxed">
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre 
              quaisquer mudanças publicando a nova Política de Privacidade nesta página e atualizando 
              a data de "última atualização" no topo desta política.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;