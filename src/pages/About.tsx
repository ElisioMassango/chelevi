import React from "react";
import { Heart, Award, Users, Globe, Leaf, Shield } from "lucide-react";

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="text-secondary" size={32} />,
      title: "Elegância Partilhada ",
      description:
        "A verdadeira sofisticação nasce quando cada pessoa se reconhece no próprio reflexo.",
    },
    {
      icon: <Leaf className="text-secondary" size={32} />,
      title: "Matérias de Consciência ",
      description:
        "Tecidos e couros escolhidos com rigor e ética, respeitando mãos, histórias e planeta.",
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: "Durabilidade Essencial",
      description:
        "Cada criação resiste ao tempo, não como moda passageira, mas como legado silencioso.",
    },
    {
      icon: <Award className="text-secondary" size={32} />,
      title: "Detalhe Supremo ",
      description:
        "O luxo reside nos gestos minuciosos, na perfeição quase invisível que transforma cada peça em obra.",
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: "Comunidade Viva ",
      description:
        "O pulsar da marca encontra-se na confiança de quem utiliza CheLevi, em histórias que dão voz ao estilo.",
    },
    {
      icon: <Globe className="text-secondary" size={32} />,
      title: "Sustentado",
      description:
        "A visão prolonga-se no amanhã, em escolhas que equilibram beleza e responsabilidade.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Primeiros passos",
      description:
        "Lançamento da primeira linha de acessórios: brincos e colares com assinatura artesanal.",
    },
    {
      year: "2020",
      title: "Estabelecimento físico",
      description:
        "Lançamento da bolsa Edileyne, rapidamente assumida como assinatura da marca.",
    },
    {
      year: "2021",
      title: "Internacionalização da identidade",
      description:
        "Participação no Fancy International Show com a coleção ROYALTY, apresentando ao mundo uma CheLevi elegante e ousada.",
    },
    {
      year: "2022",
      title: "Afirmação de estilo",
      description:
        "Participação na Maputo Fashion Week com a coleção ÁGUIA, traduzindo força e sofisticação africana.",
    },
    {
      year: "2023",
      title: "Evolução criativa",
      description:
        "Retorno ao Fancy International Show com a coleção AS I AM, celebrando autenticidade e reinvenção.",
    },
    {
      year: "2025",
      title: "Expansão e legado",
      description:
        "Lançamento das bolsas Edileyne e Liane, ícones de elegância moderna.Início da tão aguardada linha de calçado, aliando conforto, presença e identidade.",
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
              A Arquitetura da Confiança.
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              A confiança não se encontra. Constrói-se. Cada peça CheLevi é desenhada como uma afirmação dessa força interior. Criamos para a mulher que sabe que o seu estilo é a arquitetura visível da sua alma. Para ela, CheLevi não é adorno, É estrutura.
              </p>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-sm text-text-secondary">
                  Mais de 5 mil mulheres. Infinitas histórias.
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">7+</div>
                  <div className="text-sm text-text-secondary">Capítulos da nossa visão.</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-sm text-text-secondary">
                  Anos a escrever o próximo clássico.
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
              Tudo nasceu de um sonho: transformar acessórios em símbolos de confiança. 
              Hoje, esse sonho é a história partilhada com milhares de mulheres. 
              Continuamos, peça a peça, a contar essa história.
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
