import React from "react";
import { Heart, Award, Users, Globe, Leaf, Shield } from "lucide-react";

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="text-secondary" size={32} />,
      title: "Elegância para Todos",
      description:
        "Acreditamos que todas as pessoas merecem sentir-se confiantes e com estilo no seu dia a dia.",
    },
    {
      icon: <Leaf className="text-secondary" size={32} />,
      title: "Materiais Responsáveis",
      description:
        "Selecionamos materiais de alta qualidade e parceiros que seguem boas práticas de produção.",
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: "Feitas para Durar",
      description:
        "Design pensado para uso real, com estrutura firme, acabamentos de detalhe e garantia de qualidade.",
    },
    {
      icon: <Award className="text-secondary" size={32} />,
      title: "Qualidade Premium",
      description:
        "Cada peça respeita padrões elevados de construção, conforto e acabamento.",
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: "Comunidade Primeiro",
      description:
        "Valorizamos a nossa comunidade em Moçambique e criamos peças que contam histórias reais.",
    },
    {
      icon: <Globe className="text-secondary" size={32} />,
      title: "Futuro Sustentável",
      description:
        "Evoluímos continuamente para soluções mais duráveis, eficientes e com menor impacto ambiental.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "O Início",
      description:
        "Nasce a CheLevi com o propósito de criar bolsas e acessórios premium, com identidade própria.",
    },
    {
      year: "2021",
      title: "Primeira Peça Icónica",
      description:
        "Lançamento da bolsa Edileyne, rapidamente assumida como assinatura da marca.",
    },
    {
      year: "2022",
      title: "Crescimento",
      description:
        "Expansão do portefólio e abertura do atelier para dominar todo o processo produtivo.",
    },
    {
      year: "2023",
      title: "Linha de Calçado",
      description:
        "Chegam os sapatos Siena: sofisticação, conforto e salto de 8 cm.",
    },
    {
      year: "2024",
      title: "Presença Digital",
      description:
        "Lançamento da loja online e apoio ao cliente via WhatsApp para um serviço mais próximo.",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Elegância que inspira confiança
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Na CheLevi, criar vai além do design: é sobre transmitir poder,
                identidade e conforto. Desde 2020, desenvolvemos bolsas e
                sapatos premium para mulheres que sabem o que querem.
              </p>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-sm text-text-secondary">
                    Clientes Felizes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">7+</div>
                  <div className="text-sm text-text-secondary">Peças</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-sm text-text-secondary">
                    Anos de Excelência
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG"
                alt="CheLevi Story"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              A Nossa História
            </h2>
            <div className="text-lg text-text-secondary leading-relaxed space-y-6">
              <p>
                A CheLevi nasceu do desejo de criar peças duráveis, com estética
                apurada e uma assinatura imediatamente reconhecível. O percurso
                começou com acessórios feitos à mão e evoluiu para bolsas
                icónicas e calçado premium.
              </p>
              <p>
                Dominamos cada etapa — da escolha dos materiais à confeção —
                para garantir estrutura, conforto e acabamentos impecáveis. Cada
                peça é testada para responder ao uso real e manter a elegância
                no dia a dia.
              </p>
              <p>
                Hoje, a CheLevi serve milhares de clientes e continua focada no
                essencial: criar peças que elevam a confiança e contam histórias
                de quem as usa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Os Nossos Valores
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Princípios que orientam cada coleção — do desenho ao serviço ao
              cliente.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              De um atelier apaixonado a uma marca de referência — os marcos que
              nos trouxeram até aqui.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary hidden lg:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-8">
                    {/* Year bubble */}
                    <div className="flex-shrink-0 w-16 h-16 bg-secondary rounded-full flex items-center justify-center font-bold text-text-primary">
                      {milestone.year}
                    </div>

                    <div className="flex-1 bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-text-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronta para descobrir a sua peça?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junta-te às milhares de clientes CheLevi. Explora a coleção e
            encontra a peça que fala por ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="btn bg-secondary hover:bg-accent text-text-primary font-semibold"
            >
              Comprar Agora
            </a>
            <a
              href="/contact"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-text-primary"
            >
              Falar Connosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
