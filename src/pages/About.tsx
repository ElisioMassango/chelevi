import React from "react";
import { Heart, Award, Users, Globe, Leaf, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const t = useTranslation();
  
  const values = [
    {
      icon: <Heart className="text-secondary" size={32} />,
      title: t.about.value1Title,
      description: t.about.value1Description,
    },
    {
      icon: <Leaf className="text-secondary" size={32} />,
      title: t.about.value2Title,
      description: t.about.value2Description,
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: t.about.value3Title,
      description: t.about.value3Description,
    },
    {
      icon: <Award className="text-secondary" size={32} />,
      title: t.about.value4Title,
      description: t.about.value4Description,
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: t.about.value5Title,
      description: t.about.value5Description,
    },
    {
      icon: <Globe className="text-secondary" size={32} />,
      title: t.about.value6Title,
      description: t.about.value6Description,
    },
  ];

  const milestones = [
    {
      year: t.about.milestone1Year,
      title: t.about.milestone1Title,
      description: t.about.milestone1Description,
    },
    {
      year: t.about.milestone2Year,
      title: t.about.milestone2Title,
      description: t.about.milestone2Description,
    },
    {
      year: t.about.milestone3Year,
      title: t.about.milestone3Title,
      description: t.about.milestone3Description,
    },
    {
      year: t.about.milestone4Year,
      title: t.about.milestone4Title,
      description: t.about.milestone4Description,
    },
    {
      year: t.about.milestone5Year,
      title: t.about.milestone5Title,
      description: t.about.milestone5Description,
    },
    {
      year: t.about.milestone6Year,
      title: t.about.milestone6Title,
      description: t.about.milestone6Description,
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section - Modern & International */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG")`,
          }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Content - Mobile: Second, Desktop: First */}
            <div className="text-white space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="inline-block">
                <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-gray-300 mb-4 block">
                  {t.about.heroTitle.split(' ')[0]} {t.about.heroTitle.split(' ')[1]}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span className="block">{t.about.heroTitle}</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                {t.about.heroText}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-8 pt-4">
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-1">7+</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">{t.about.chapters}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-1">7</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                    {t.about.years}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t.about.ctaButton1}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Image - Mobile: First, Desktop: Second */}
            <div className="relative mt-8 lg:mt-0 order-1 lg:order-2">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img
                  src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG"
                  alt={t.about.imageAlt}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-3xl hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Modern Design */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
                {t.about.ourStory}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-700 mx-auto"></div>
            </div>
            <div className="prose prose-lg md:prose-xl max-w-none text-center">
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed md:leading-loose">
                {t.about.ourStoryText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Modern Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              {t.about.ourValues}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t.about.ourValuesText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 text-center">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Modern Design */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              {t.about.ourJourney}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              {t.about.ourJourneyText}
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-4">
            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-900 rounded-full border-4 border-white"></div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-bold text-gray-900 mb-2">{milestone.year}</div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
              {/* Timeline line */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-8">
                    {/* Year bubble */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                        {milestone.year}
                      </div>
                    </div>

                    <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
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

      {/* Call to Action - Modern */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
              {t.about.ctaTitle}
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-gray-300 leading-relaxed">
              {t.about.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                {t.about.ctaButton1}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                {t.about.ctaButton2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
