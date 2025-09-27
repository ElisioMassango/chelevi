import React from 'react';
import { Heart, Award, Users, Globe, Leaf, Shield } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="text-secondary" size={32} />,
      title: "Beleza para Todos", 
      description: "Acreditamos que todos os seres humanos merecem se sentir bonitos e confiantes em sua própria pele."
    },
    {
      icon: <Leaf className="text-secondary" size={32} />,
      title: "Limpo e Natural",
      description: "Nossos produtos são formulados com ingredientes de alta qualidade, naturais e seguros e eficazes."
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: "Cruelty-Free",
      description: "Nunca testamos em animais e trabalhamos apenas com fornecedores que compartilham nossos valores éticos."
    },
    {
      icon: <Award className="text-secondary" size={32} />,
      title: "Qualidade Premium",
      description: "Cada produto atende aos nossos altos padrões de qualidade, desempenho e satisfação do cliente."
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: "Comunidade Primeiro",
      description: "Estamos comprometidos em apoiar e empoderar nossa comunidade local em Moçambique."
    },
    {
      icon: <Globe className="text-secondary" size={32} />,
      title: "Futuro Sustentável",
      description: "Estamos trabalhando para embalagens mais sustentáveis e práticas empresariais mais ecológicas."
    }
  ];

  const team = [
    {
      name: "Sofia Inácio",
      role: "Fundadora & CEO",
      image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Amante da beleza com mais de 10 anos na indústria de cosméticos."
    },
    {
      name: "Maria Santos",
      role: "Diretor de Desenvolvimento de Produtos",
      image: "https://images.pexels.com/photos/3762806/pexels-photo-3762806.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Especialista em química cosmética e sourcing de ingredientes naturais."
    },
    {
      name: "Ana Fernandes",
      role: "Diretor de Experiência do Cliente",
      image: "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Dedicada a garantir que cada cliente tenha uma experiência excepcional."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "SI Cosmetics was founded with a vision to bring premium beauty products to Mozambique."
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Launched our signature lip butter collection, which became an instant bestseller."
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded our product line to include face and eye cosmetics, fragrances, and skincare."
    },
    {
      year: "2023",
      title: "Community Impact",
      description: "Partnered with local suppliers and launched our community empowerment program."
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched our e-commerce platform and introduced WhatsApp-based customer service."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Empowering Beauty, Inspiring Confidence
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                At SI Cosmetics, we believe that beauty is not just about looking good – it's about feeling confident, 
                expressing your unique self, and embracing who you are. Since 2020, we've been dedicated to bringing 
                you premium cosmetics that celebrate your individual beauty.
              </p>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">50K+</div>
                  <div className="text-sm text-text-secondary">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">200+</div>
                  <div className="text-sm text-text-secondary">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">5</div>
                  <div className="text-sm text-text-secondary">Years Excellence</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                alt="SI Cosmetics Story"
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Story</h2>
            <div className="text-lg text-text-secondary leading-relaxed space-y-6">
              <p>
                SI Cosmetics began as a dream in 2020, born from a desire to make high-quality, premium beauty 
                products accessible to everyone in Mozambique. Our founder, Sofia Inácio, noticed a gap in the 
                market for cosmetics that were both luxurious and affordable, created with ingredients that 
                respect both your skin and the environment.
              </p>
              <p>
                What started as a small collection of lip products has grown into a comprehensive beauty brand 
                that spans cosmetics, skincare, and fragrances. Every product in our line is carefully curated 
                and tested to ensure it meets our high standards for quality, safety, and performance.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across Mozambique, and we're just getting 
                started. Our mission remains the same: to empower everyone to feel beautiful, confident, and 
                authentically themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              These core values guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">{value.description}</p>
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
              From a small startup to a trusted beauty brand – here are the key milestones in our story.
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
                      <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The passionate people behind SI Cosmetics, working every day to bring you the best in beauty.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-secondary font-medium mb-4">{member.role}</p>
                <p className="text-text-secondary leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-text-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Discover Your Beauty?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SI Cosmetics for their beauty needs. 
            Explore our collection and find your perfect products today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn bg-secondary hover:bg-accent text-text-primary font-semibold">
              Shop Now
            </a>
            <a href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-text-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;