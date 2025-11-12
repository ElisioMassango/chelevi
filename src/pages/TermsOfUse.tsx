import React from 'react';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="terms-of-use-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="text-purple-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Termos de Utilização</h1>
          <p className="text-xl text-text-secondary">
            Última atualização: Janeiro de 2025
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Scale className="text-purple-600" size={24} />
              Introdução
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Bem-vindo à Chelevi. Estes Termos de Utilização ("Termos") regem o seu acesso e uso do nosso 
              website, produtos e serviços. Ao aceder ou utilizar os nossos serviços, você concorda em 
              cumprir e estar vinculado a estes Termos.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Se não concordar com estes Termos, não deve utilizar os nossos serviços.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Ao criar uma conta, fazer uma compra ou utilizar qualquer um dos nossos serviços, você 
              confirma que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Leu e compreendeu estes Termos</li>
              <li>Concorda em cumprir todos os Termos e condições</li>
              <li>Tem pelo menos 18 anos de idade ou tem autorização parental</li>
              <li>É responsável por todas as atividades na sua conta</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Registo de Conta</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">2.1. Criação de Conta</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Para fazer compras e aceder a certas funcionalidades, pode ser necessário criar uma conta. 
                  Você concorda em:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Fornecer informações precisas, completas e atualizadas</li>
                  <li>Manter a segurança da sua palavra-passe</li>
                  <li>Notificar-nos imediatamente de qualquer uso não autorizado</li>
                  <li>Ser responsável por todas as atividades na sua conta</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">2.2. Privacidade</h3>
                <p className="text-text-secondary leading-relaxed">
                  O tratamento dos seus dados pessoais é regido pela nossa 
                  <a href="/privacy-policy" className="text-primary hover:underline ml-1">
                    Política de Privacidade
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Products and Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Produtos e Serviços</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">3.1. Disponibilidade</h3>
                <p className="text-text-secondary leading-relaxed">
                  Fazemos o nosso melhor para garantir que as informações sobre produtos, preços e 
                  disponibilidade sejam precisas. No entanto, reservamo-nos o direito de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary mt-3">
                  <li>Corrigir erros, imprecisões ou omissões</li>
                  <li>Alterar ou descontinuar produtos a qualquer momento</li>
                  <li>Limitar quantidades de produtos por pedido</li>
                  <li>Recusar ou cancelar pedidos a nosso critério</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">3.2. Preços</h3>
                <p className="text-text-secondary leading-relaxed">
                  Todos os preços são exibidos em Meticais (MT) e incluem IVA quando aplicável. 
                  Reservamo-nos o direito de alterar preços a qualquer momento, mas os preços aplicáveis 
                  serão os exibidos no momento do pedido.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">3.3. Imagens de Produtos</h3>
                <p className="text-text-secondary leading-relaxed">
                  Fazemos esforços para exibir cores e imagens dos produtos com precisão, mas não 
                  garantimos que as cores exibidas no seu ecrã sejam exatas.
                </p>
              </div>
            </div>
          </section>

          {/* Orders and Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Pedidos e Pagamento</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">4.1. Processamento de Pedidos</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Ao fazer um pedido, você:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Oferece comprar os produtos ao preço e condições indicados</li>
                  <li>Confirma que todas as informações fornecidas são precisas</li>
                  <li>Autoriza-nos a processar o pagamento</li>
                  <li>Reconhece que receberá confirmação por email e WhatsApp</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">4.2. Métodos de Pagamento</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Aceitamos os seguintes métodos de pagamento:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">Cartão de Crédito/Débito</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">Transferência Bancária</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">M-Pesa</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-600 inline mr-2" size={18} />
                    <span className="text-text-secondary">Pagamento na Entrega</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">4.3. Confirmação de Pedido</h3>
                <p className="text-text-secondary leading-relaxed">
                  A confirmação do pedido será enviada por email e WhatsApp após o processamento bem-sucedido 
                  do pagamento. O pedido só será considerado aceite após a confirmação.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Envio e Entrega</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Para informações detalhadas sobre envio e entrega, consulte a nossa página de 
              <a href="/shipping" className="text-primary hover:underline ml-1">
                Informações de Envio
              </a>.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Resumo:</h4>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Prazos de entrega: 1-2 dias em Maputo, 3-5 dias noutras províncias</li>
                <li>Os custos de envio são calculados no checkout</li>
                <li>Você receberá informações de rastreamento por WhatsApp</li>
                <li>É responsável por fornecer um endereço de entrega preciso</li>
              </ul>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Devoluções e Reembolsos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">6.1. Política de Devolução</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Aceitamos devoluções dentro de 30 dias após a compra, desde que:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  <li>Os produtos estejam em estado original, sem uso e com etiquetas</li>
                  <li>Tenha o recibo ou confirmação de compra</li>
                  <li>Os produtos não sejam itens personalizados ou íntimos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">6.2. Processo de Devolução</h3>
                <p className="text-text-secondary leading-relaxed">
                  Para iniciar uma devolução, contacte-nos através do nosso 
                  <a href="/contact" className="text-primary hover:underline ml-1">
                    formulário de contacto
                  </a> ou WhatsApp. 
                  Processaremos o reembolso após receber e inspecionar o produto devolvido.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Propriedade Intelectual</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Todo o conteúdo do nosso website, incluindo mas não limitado a textos, gráficos, logótipos, 
              imagens, software e compilações de dados, é propriedade da Chelevi ou dos seus fornecedores 
              de conteúdo e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 mt-0.5" size={20} />
                <p className="text-sm text-red-800">
                  <strong>Proibido:</strong> Reproduzir, distribuir, modificar ou criar trabalhos derivados 
                  do nosso conteúdo sem autorização prévia por escrito.
                </p>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Conduta do Utilizador</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Você concorda em NÃO:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">Usar o site para fins ilegais</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">Tentar aceder a áreas restritas</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">Interferir com a segurança do site</span>
              </div>
              <div className="border border-red-200 p-4 rounded-lg bg-red-50">
                <XCircle className="text-red-600 inline mr-2" size={18} />
                <span className="text-text-secondary text-sm">Transmitir vírus ou código malicioso</span>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Limitação de Responsabilidade</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Na medida máxima permitida por lei, a Chelevi não será responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
              <li>Perda de lucros, dados ou oportunidades de negócio</li>
              <li>Interrupções no serviço ou indisponibilidade do website</li>
              <li>Erros ou omissões no conteúdo</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Indemnização</h2>
            <p className="text-text-secondary leading-relaxed">
              Você concorda em indemnizar e isentar a Chelevi, seus funcionários, diretores e agentes 
              de qualquer reclamação, dano, obrigação, perda, responsabilidade, custo ou dívida, 
              incluindo honorários advocatícios, decorrentes do seu uso do website ou violação destes Termos.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Modificações dos Termos</h2>
            <p className="text-text-secondary leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão 
              em vigor imediatamente após a publicação. O uso continuado dos nossos serviços após as 
              modificações constitui aceitação dos Termos atualizados.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Lei Aplicável</h2>
            <p className="text-text-secondary leading-relaxed">
              Estes Termos são regidos pelas leis de Moçambique. Qualquer disputa será resolvida nos 
              tribunais competentes de Maputo, Moçambique.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-blue-600" size={24} />
              Contacto
            </h2>
            <p className="text-text-secondary mb-4">
              Se tiver questões sobre estes Termos de Utilização, contacte-nos:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-text-secondary">info@chelevi.com</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Telefone</p>
                  <p className="text-text-secondary">+258 85 2232423</p>
                </div>
                <div>
                  <p className="font-medium mb-1">WhatsApp</p>
                  <p className="text-text-secondary">+258 85 2232423</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Endereço</p>
                  <p className="text-text-secondary">Rua da Resistência n° 1550, R/C, Maputo</p>
                </div>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-0.5" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Aceitação dos Termos</h3>
                <p className="text-sm text-green-800">
                  Ao utilizar os nossos serviços, você confirma que leu, compreendeu e concorda em 
                  cumprir estes Termos de Utilização. Se não concordar com qualquer parte destes Termos, 
                  não deve utilizar os nossos serviços.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;

