import React from 'react';
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle, Info, Globe } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const ShippingInfo: React.FC = () => {
  const t = useTranslation();
  
  return (
    <>
      <SEO
        title="Informações de Envio - CheLevi | Entrega em Moçambique e Portugal"
        description="Informações sobre envio e entrega da CheLevi. Entregamos em Maputo, Moçambique e Portugal. Prazos e condições de envio."
        keywords="CheLevi, envio, entrega, shipping, Moçambique, Portugal, Maputo, prazos de entrega"
      />
      <div className="shipping-info-page py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.shippingInfo.title}</h1>
          <p className="text-xl text-text-secondary">
            {t.shippingInfo.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {/* Overview */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Package className="text-blue-600" size={24} />
                {t.shippingInfo.overview}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {t.shippingInfo.overviewText}
              </p>
            </div>
          </section>

          {/* Delivery Times */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Clock className="text-green-600" size={24} />
              {t.shippingInfo.deliveryTimes}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-green-200 bg-green-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="text-green-600" size={24} />
                  <h3 className="text-lg font-semibold">{t.shippingInfo.maputo}</h3>
                </div>
                <p className="text-text-secondary mb-2">
                  <strong className="text-green-700">{t.shippingInfo.maputoTime}</strong>
                </p>
                <p className="text-sm text-text-secondary">
                  {t.shippingInfo.maputoDescription}
                </p>
              </div>

              <div className="border border-blue-200 bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="text-blue-600" size={24} />
                  <h3 className="text-lg font-semibold">{t.shippingInfo.otherProvinces}</h3>
                </div>
                <p className="text-text-secondary mb-2">
                  <strong className="text-blue-700">{t.shippingInfo.otherProvincesTime}</strong>
                </p>
                <p className="text-sm text-text-secondary">
                  {t.shippingInfo.otherProvincesDescription}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>{t.shippingInfo.note}</strong> {t.shippingInfo.noteText}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Methods */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Truck className="text-purple-600" size={24} />
              Métodos de Envio
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 p-6 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Entrega Padrão</h3>
                    <p className="text-text-secondary mb-3">
                      Serviço de entrega confiável para todo o país. Rastreamento incluído.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Maputo: 1-2 dias
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Outras províncias: 3-5 dias
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Entrega Expressa</h3>
                    <p className="text-text-secondary mb-3">
                      Para quando precisa com urgência. Disponível apenas em Maputo.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Maputo: 24 horas
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Custo adicional aplicável
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg hover:border-green-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Levantamento na Loja</h3>
                    <p className="text-text-secondary mb-3">
                      Retire o seu pedido diretamente na nossa loja física. Grátis e sem espera.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Grátis
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Disponível em 24h após confirmação
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      <strong>Endereço:</strong> Rua da Resistência n° 1550, R/C, Maputo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Custos de Envio</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-text-secondary leading-relaxed mb-4">
                Os custos de envio são calculados automaticamente no checkout com base em:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Localização do endereço de entrega</li>
                <li>Peso e dimensões dos produtos</li>
                <li>Método de envio selecionado</li>
                <li>Valor total do pedido (alguns pedidos podem ter envio grátis)</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Maputo</h4>
                <p className="text-2xl font-bold text-primary mb-1">MT 150</p>
                <p className="text-sm text-text-secondary">Entrega padrão</p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Outras Províncias</h4>
                <p className="text-2xl font-bold text-primary mb-1">MT 300</p>
                <p className="text-sm text-text-secondary">Entrega padrão</p>
              </div>
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Envio Grátis</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">MT 0</p>
                <p className="text-sm text-text-secondary">Pedidos acima de MT 5.000</p>
              </div>
            </div>
          </section>

          {/* Order Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Package className="text-orange-600" size={24} />
              Rastreamento de Pedidos
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Como Rastrear o Seu Pedido</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                  <li>Após a confirmação do pedido, receberá um email com o número de rastreamento</li>
                  <li>Também receberá um link de rastreamento via WhatsApp</li>
                  <li>Aceda à sua conta e vá a "Os Meus Pedidos" para ver o estado atualizado</li>
                  <li>Use o número de rastreamento no website do transportador para atualizações em tempo real</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <CheckCircle className="text-green-600 inline mr-2" size={18} />
                  <span className="text-sm text-text-secondary">Notificações por WhatsApp</span>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <CheckCircle className="text-green-600 inline mr-2" size={18} />
                  <span className="text-sm text-text-secondary">Atualizações por Email</span>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <CheckCircle className="text-green-600 inline mr-2" size={18} />
                  <span className="text-sm text-text-secondary">Rastreamento Online 24/7</span>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <CheckCircle className="text-green-600 inline mr-2" size={18} />
                  <span className="text-sm text-text-secondary">Histórico na Sua Conta</span>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Processo de Entrega</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Confirmação do Pedido</h3>
                  <p className="text-text-secondary text-sm">
                    Após o pagamento ser confirmado, processaremos o seu pedido e enviaremos 
                    uma confirmação por email e WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Preparação e Embalagem</h3>
                  <p className="text-text-secondary text-sm">
                    Os seus produtos são cuidadosamente embalados para garantir que cheguem 
                    em perfeitas condições.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Envio</h3>
                  <p className="text-text-secondary text-sm">
                    O pedido é enviado através do nosso parceiro de confiança. Receberá 
                    informações de rastreamento imediatamente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Em Trânsito</h3>
                  <p className="text-text-secondary text-sm">
                    Acompanhe o progresso do seu pedido em tempo real através do link de 
                    rastreamento fornecido.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Entrega</h3>
                  <p className="text-text-secondary text-sm">
                    O seu pedido será entregue no endereço especificado. Você receberá 
                    uma notificação quando a entrega for concluída.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Globe className="text-indigo-600" size={24} />
              Envio Internacional
            </h2>
            
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
              <p className="text-text-secondary leading-relaxed mb-4">
                Atualmente enviamos para <strong>Portugal</strong>. Estamos a trabalhar para 
                expandir os nossos serviços de envio internacional para outros países em breve.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Portugal</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                    <li>Prazo de entrega: 7-14 dias úteis</li>
                    <li>Custo: Calculado no checkout</li>
                    <li>Rastreamento internacional incluído</li>
                    <li>Taxas alfandegárias podem aplicar-se</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Important Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Info className="text-amber-600" size={24} />
              Informações Importantes
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
                <h4 className="font-semibold mb-2">Endereço de Entrega</h4>
                <p className="text-sm text-text-secondary">
                  Certifique-se de que o endereço de entrega está completo e correto. 
                  Não nos responsabilizamos por atrasos ou perdas causadas por endereços incorretos.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <h4 className="font-semibold mb-2">Ausência no Momento da Entrega</h4>
                <p className="text-sm text-text-secondary">
                  Se não estiver presente, o transportador tentará novamente ou deixará 
                  um aviso. Contacte-nos se precisar reagendar a entrega.
                </p>
              </div>

              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <h4 className="font-semibold mb-2">Danos Durante o Transporte</h4>
                <p className="text-sm text-text-secondary">
                  Se receber um produto danificado, contacte-nos imediatamente com fotos. 
                  Substituiremos ou reembolsaremos o produto sem custos adicionais.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Dúvidas sobre Envio?</h2>
            <p className="text-text-secondary mb-4">
              Estamos aqui para ajudar. Contacte-nos através de:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-1">WhatsApp</p>
                <p className="text-text-secondary">+258 85 2232423</p>
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <p className="text-text-secondary">info@chelevi.com</p>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="/contact" 
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Formulário de Contacto
              </a>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
};

export default ShippingInfo;

