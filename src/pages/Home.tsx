import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag, Play } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "NOVA LINHA",
      subtitle: "SHAMPOOS PREMIUM",
      description: "fórmulas inovadoras para cabelos mais fortes, brilhantes e saudáveis desde a primeira lavagem.",
      buttonText: "COMPRAR AGORA",
      image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit",
      link: "/products/shampoo"
    },
    {
      id: 2,
      title: "TRATAMENTO CAPILAR",
      subtitle: "NUTRIÇÃO PROFUNDA",
      description: "recupera a vitalidade do teu cabelo com máscaras e óleos nutritivos à base de argan e queratina.",
      buttonText: "DESCOBRIR MAIS",
      image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit",
      link: "/products/treatment"
    },
    {
      id: 3,
      title: "BELEZA NATURAL",
      subtitle: "COSMÉTICOS PARA PELE",
      description: "maquilhagem leve e skincare para realçar a tua beleza natural e proteger a pele todos os dias.",
      buttonText: "ENCONTRAR AGORA",
      image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      link: "/products/skincare"
    }
  ];
  
  const collections = [
    {
      id: 1,
      category: "Coleção",
      title: "Red Chelevi Legacy 2023",
      buttonText: "Compre agora",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      link: "/products/red-chelevi",
      size: "large"
    },
    {
      id: 2,
      category: "Tendências",
      title: "Couro de crocodilo",
      buttonText: "",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      link: "/products/crocodile-leather",
      size: "medium"
    },
    {
      id: 3,
      category: "Novidade",
      title: "Joias de Obsidiana",
      buttonText: "",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      link: "/products/obsidian-jewelry",
      size: "medium"
    },
    {
      id: 4,
      category: "Coleção",
      title: "Tecido de couro de Crocodilo do nilo",
      buttonText: "Compre agora",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      link: "/products/nile-crocodile",
      size: "hero"
    }
  ];
  
  const featuredProducts = [
    {
      id: 1,
      name: "Lip Butter",
      price: 450,
      originalPrice: 550,
      image: "https://kyliecosmetics.com/cdn/shop/files/KJC_LIP_25_PeachMango_Stylized_Open.jpg?crop=center&height=600&v=1752094667&width=600",
      secondImage: "https://kyliecosmetics.com/cdn/shop/files/KJS_LIB_25_LipMacro_PeachMango_01_WS_800x.jpg?v=1752094667",
      rating: 4.8,
      reviews: 245,
      badge: "NOVIDADE",
      colors: [],
      category: "cabelo"
    },
    {
      id: 2,
      name: "Condicionador Nutritivo com Argan",
      price: 1200,
      image: "https://fentybeauty.com/cdn/shop/files/FS_FALL25_T2PRODUCT_ECOMM_BODY-MILK_SALTED-CARAMEL_1200X1500_72DPI_900x1100.jpg?v=1754005575",
      secondImage: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FS689758_GLOBAL_FALL_24_INFOGRAPHICS_1200x1500_BUTTA_DROP_BODY_MILK_BANDA_Mariam_OP1.jpg?v=1754005575&width=2048",
      rating: 4.9,
      reviews: 128,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 3,
      name: "Gloss Bomb",
      price: 890,
      image: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FB_FALL24_T2PRODUCT_ECOMM_GBSTICK_BLACKRBERRY_OPEN_1200x1500_72DPI.jpg?v=1719531134&width=2048",
      secondImage: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FB_SMR24_T2BEAUTY_GB-STIX_BLACKRBERRY_PROFILTER-498_LEAH_1200X1500_72DPI_1.jpg?v=1719531134&width=2048",
      rating: 4.7,
      reviews: 89,
      badge: "FAVORITO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 4,
      name: "Pincel de Maquiagem",
      price: 650,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop4.jpg",  
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop2.jpg",
      rating: 4.6,
      reviews: 156,
      badge: "TOP",
      colors: [],
      category: "cabelo"
    },
    {
      id: 5,
      name: "Sérum Anti-Frizz",
      price: 750,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop1.jpg",
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop2.jpg",
      rating: 4.5,
      reviews: 203,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 6,
      name: "Kit Reconstrutor",
      price: 980,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop3.jpg",
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop4.jpg",
      rating: 4.9,
      reviews: 78,
      badge: "EDIÇÃO LIMITADA",
      colors: [],
      category: "cabelo"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Tutorial de Aplicação",
      thumbnail: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      duration: "2:30"
    },
    {
      id: 2,
      title: "Rotina Capilar Completa",
      thumbnail: "https://images.pexels.com/photos/3762806/pexels-photo-3762806.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      duration: "5:15"
    },
    {
      id: 3,
      title: "Antes e Depois",
      thumbnail: "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      duration: "3:45"
    }
  ];

  const instagramPosts = [
    {
      id: 1,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop1.jpg",
      productId: 1
    },
    {
      id: 2,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop2.jpg",
      productId: 2
    },
    {
      id: 3,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop3.jpg",
      productId: 3
    },
    {
      id: 4,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop4.jpg",
      productId: 4
    },
    {
      id: 5,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop5.jpg",
      productId: 2
    },
    {
      id: 6,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop1.jpg",
      productId: 1
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${slide.image})`
                }}
              >
                <div className="container h-full flex items-center">
                  <div className="max-w-lg text-white animate-fadeIn">
                    <p className="text-sm font-medium uppercase tracking-widest mb-4 opacity-90">
                      JUST DROPPED
                    </p>
                    <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-light mb-6 tracking-wide uppercase">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg mb-8 opacity-90 leading-relaxed">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.link}
                      className="btn btn-primary btn-lg uppercase tracking-widest font-bold hover:scale-105 transition-transform"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Collections Section - Replacing Shop by Category */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="collections-grid">
            {/* Large Featured Collection */}
            <Link
              to={collections[0].link}
              className="collections-item collections-large group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="absolute top-8 left-8 text-white">
                  <p className="text-sm font-medium mb-2 opacity-90">{collections[0].category}</p>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight max-w-xs">
                    {collections[0].title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                    <span>{collections[0].buttonText}</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Medium Collections */}
            <Link
              to={collections[1].link}
              className="collections-item collections-medium group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-medium mb-1 opacity-90">{collections[1].category}</p>
                  <h3 className="text-xl font-bold leading-tight">
                    {collections[1].title}
                  </h3>
                </div>
              </div>
            </Link>

            <Link
              to={collections[2].link}
              className="collections-item collections-medium group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-medium mb-1 opacity-90">{collections[2].category}</p>
                  <h3 className="text-xl font-bold leading-tight">
                    {collections[2].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Hero Collection */}
            <Link
              to={collections[3].link}
              className="collections-item collections-hero group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[3].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white max-w-md">
                  <p className="text-sm font-medium mb-2 opacity-90">{collections[3].category}</p>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                    {collections[3].title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                    <span>{collections[3].buttonText}</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Product Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
              Our Productions
            </h2>
            <p className="text-center text-text-secondary mb-8 text-lg">
              Descubra nossa mais recente coleção de produtos premium para cabelo
            </p>
          </div>
          
          {/* Responsive Product Grid */}
          <div className="relative">
            {/* Desktop: Horizontal Scroll */}
            <div className="hidden lg:flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth" id="products-scroll">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-none w-72 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {/* Mobile: Grid 2x2 */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Navigation Arrows - Desktop Only */}
            <button className="hidden lg:block"
              onClick={() => {
                const container = document.getElementById('products-scroll');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button className="hidden lg:block"
              onClick={() => {
                const container = document.getElementById('products-scroll');
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Scroll indicators - Desktop Only */}
            <div className="hidden lg:flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-outline btn-lg uppercase tracking-widest">
              VER TODOS OS PRODUTOS
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
              TUTORIALS & TIPS
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Learn how to get the most out of your ShopFCC products with our expert tutorials
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-text-primary ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dessert in a Mist Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Product Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 h-96 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Hair & Body Mist Collection"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-rose-400 uppercase tracking-wide">
                DESSERT IN A MIST
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  from deep and smooth to creamy, milky blends, there's a{' '}
                  <span className="font-semibold text-gray-800">hair & body mist</span>{' '}
                  for every taste bud.
                </p>
                
                <p className="leading-relaxed">
                  each delicious fragrance is infused with vanilla and formulated with glycerin 
                  for up to 24 hours of hydrated skin that doesn't feel sticky.
                </p>
              </div>

              <button className="btn btn-outline border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white px-8 py-3 rounded-none uppercase tracking-wider">
                shop now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Cosmic Universe */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="container">
          <div className="grid grid-2 gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-wide uppercase">
                THE
                <br />
                <span className="text-secondary">COSMIC UNIVERSE</span>
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                go on a cosmic journey this summer with our out of this world, captivating scents.
              </p>
              <Link
                to="/products/fragrance"
                className="btn btn-primary btn-lg uppercase tracking-widest"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://crm.sparktech.pt/assets/images/13.jpg"
                alt="Cosmic Universe Collection"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed - Bento Grid */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 uppercase tracking-wide text-rose-400">
            SHOP OUR IG
          </h2>
          
          {/* Instagram Bento Grid Layout */}
          <div className="bento-grid">
            {/* Large featured post */}
            <Link
              to={`/product/${instagramPosts[0].productId}`}
              className="bento-item bento-large group"
            >
              <img
                src={instagramPosts[0].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={32} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Medium posts */}
            <Link
              to={`/product/${instagramPosts[1].productId}`}
              className="bento-item bento-medium group"
            >
              <img
                src={instagramPosts[1].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[2].productId}`}
              className="bento-item bento-medium group"
            >
              <img
                src={instagramPosts[2].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Small posts */}
            <Link
              to={`/product/${instagramPosts[3].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[3].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[4].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[4].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[5].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[5].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Wide post */}
            <Link
              to={`/product/${instagramPosts[0].productId}`}
              className="bento-item bento-wide group"
            >
              <img
                src={instagramPosts[1].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Tall post */}
            <Link
              to={`/product/${instagramPosts[2].productId}`}
              className="bento-item bento-tall group"
            >
              <img
                src={instagramPosts[2].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={28} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com/shopfcc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg uppercase tracking-widest border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white"
            >
              FOLLOW @SHOPFCC
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;