import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
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
  
  const categories = [
    {
      title: "CABELOS",
      image: "https://crm.sparktech.pt/assets/shopfcc/shop1.jpg",
      link: "/products/shampoo"
    },
    {
      title: "MAQUIAGEM",
      image: "https://crm.sparktech.pt/assets/shopfcc/shop2.jpg",
      link: "/products/conditioner"
    },
    {
      title: "PELE",
      image: "https://crm.sparktech.pt/assets/shopfcc/shop3.jpg",
      link: "/products/treatment"
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

      {/* Shop by Category */}
      <section className="py-20 bg-primary">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-accent tracking-wide uppercase animate-slideUp">
            SHOP BY CATEGORY
          </h2>
          
          <div className="grid grid-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative h-96 overflow-hidden rounded-xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white tracking-widest uppercase group-hover:scale-110 transition-transform duration-300">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 tracking-wide lowercase">
              ShopFCC 
          </h2>
          <p className="text-center text-text-secondary mb-16 text-lg">
            Discover our latest collection of premium hair care products
          </p>
          
          <div className="grid grid-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-outline btn-lg uppercase tracking-widest">
              VIEW ALL PRODUCTS
            </Link>
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

      {/* Instagram Feed */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 uppercase tracking-wide">
            SHOP OUR IG
          </h2>
          
          <div className="grid grid-3 lg:grid-6 gap-4">
            {instagramPosts.map((post) => (
              <Link
                key={post.id}
                to={`/product/${post.productId}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ShoppingBag 
                    size={32} 
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com/shopfcc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg uppercase tracking-widest"
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